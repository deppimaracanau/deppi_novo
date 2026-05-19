#!/bin/bash
# ==============================================================================
# Script de Atualização e Recarregamento Automático - DEPPI
# ==============================================================================
# Este script verifica se há novas atualizações no Git ou se existem alterações 
# locais na pasta. Caso encontre mudanças, ele reconstrói os containers Docker.
# ==============================================================================

set -e

PROJECT_DIR="/home/deppi/deppi_novo"
cd "$PROJECT_DIR"

echo "🔄 [$(date)] Verificando alterações no repositório..."

# 1. Busca alterações remotas
git fetch origin main || true

LOCAL_HASH=$(git rev-parse HEAD)
REMOTE_HASH=$(git rev-parse origin/main) || REMOTE_HASH=$LOCAL_HASH
LOCAL_CHANGES=$(git status --porcelain)

# Verifica se precisa recarregar (novos commits remotos, alterações locais ou flag --force)
if [ "$LOCAL_HASH" != "$REMOTE_HASH" ] || [ ! -z "$LOCAL_CHANGES" ] || [ "$1" == "--force" ]; then
    echo "🆕 Alterações detectadas!"
    
    if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
        echo "📥 Baixando novos commits do Git..."
        git pull origin main
    fi

    if [ ! -z "$LOCAL_CHANGES" ]; then
        echo "📝 Alterações locais não commitadas detectadas no servidor:"
        echo "$LOCAL_CHANGES"
    fi

    echo "🐳 Reconstruindo containers com Docker Compose..."
    sudo docker compose up -d --build --force-recreate
    
    echo "🧹 Removendo imagens antigas para liberar espaço..."
    sudo docker system prune -f
    
    echo "✅ [$(date)] Atualização concluída com sucesso!"
else
    echo "✅ Nenhuma alteração detectada. O sistema já está atualizado ($LOCAL_HASH)."
fi
