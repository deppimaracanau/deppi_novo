import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PitData, RitData } from './pit-rit.service';

@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {

    constructor() { }

    async generatePitPdf(data: PitData) {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        try {
            doc.addImage('assets/cargahoraria/brasao.png', 'PNG', (pageWidth / 2) - 15, 10, 30, 30);
        } catch (e) {
            console.warn('Brasão image not found in assets. Make sure it was copied.');
        }

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('MINISTÉRIO DA EDUCAÇÃO', pageWidth / 2, 45, { align: 'center' });
        doc.text('SECRETARIA DE EDUCAÇÃO PROFISSIONAL E TECNOLÓGICA', pageWidth / 2, 50, { align: 'center' });
        doc.text('INSTITUTO FEDERAL DE EDUCAÇÃO CIÊNCIA E TECNOLOGIA DO CEARÁ', pageWidth / 2, 55, { align: 'center' });

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('PLANO DE TRABALHO DOCENTE (PIT)', pageWidth / 2, 65, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Referente ao Semestre Letivo: ${data.semestre || '____._'}`, 15, 75);

        // Identification table
        autoTable(doc, {
            startY: 80,
            head: [['IDENTIFICAÇÃO DO SERVIDOR', '']],
            body: [
                ['Nome:', data.identificacao.nome],
                ['Siape:', data.identificacao.siape],
                ['Curso:', data.identificacao.curso],
                ['Campus:', data.identificacao.campus],
                ['Telefone:', data.identificacao.telefone],
                ['Email:', data.identificacao.email],
                ['Vínculo:', data.identificacao.vinculo],
                ['Regime:', data.identificacao.regime]
            ],
            theme: 'plain',
            styles: { cellPadding: 1, fontSize: 9 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 }, 1: { cellWidth: 'auto' } },
            margin: { left: 15, right: 15 }
        });

        let currentY = (doc as any).lastAutoTable.finalY + 10;

        // Header ATIVIDADES DOCENTES
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('ATIVIDADES DOCENTES', 15, currentY);
        currentY += 5;

        // 1. ENSINO
        autoTable(doc, {
            startY: currentY,
            head: [['1. ATIVIDADES DE ENSINO', 'H']],
            body: [
                ['Aulas em cursos Técnico/Licenciaturas', data.atividades.ensino.aulas.t1],
                ['Aulas em Especialização/Graduação/Pós', data.atividades.ensino.aulas.t2],
                ['Aulas em cursos FIC', data.atividades.ensino.aulas.t3],
                ['Preparação + Planejamento (até 18h)', data.atividades.ensino.manutencao.t4],
                ['Atendimento a Estudantes', data.atividades.ensino.manutencao.t5],
                ['Apoio ao Ensino', data.atividades.ensino.apoio.t6],
                ['Orientação de TCC', data.atividades.ensino.orientacao.t7],
                ['Orientação de Estágio', data.atividades.ensino.orientacao.t8],
                ['Monitoria / PIBID / Programas de Êxito', data.atividades.ensino.orientacao.t11],
                ['Total Ensino', this.getCategoryTotal(data.atividades.ensino)]
            ],
            theme: 'grid',
            headStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0], fontStyle: 'bold' },
            styles: { fontSize: 8 },
            columnStyles: { 0: { cellWidth: pageWidth - 45 }, 1: { halign: 'center' } }
        });
        currentY = (doc as any).lastAutoTable.finalY + 5;

        // 2. PESQUISA
        autoTable(doc, {
            startY: currentY,
            head: [['2. ATIVIDADES DE PESQUISA', 'H']],
            body: [
                ['Coordenação de projetos de pesquisa/inovação', data.atividades.pesquisa.t14],
                ['Orientação de Mestrado/Doutorado', data.atividades.pesquisa.t17],
                ['Artigos científicos e Produção Intelectual', data.atividades.pesquisa.t18],
                ['Total Pesquisa', this.getCategoryTotal(data.atividades.pesquisa)]
            ],
            theme: 'grid',
            headStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0] },
            styles: { fontSize: 8 },
            columnStyles: { 0: { cellWidth: pageWidth - 45 }, 1: { halign: 'center' } }
        });
        currentY = (doc as any).lastAutoTable.finalY + 5;

        // 3. EXTENSÃO
        autoTable(doc, {
            startY: currentY,
            head: [['3. ATIVIDADES DE EXTENSÃO', 'H']],
            body: [
                ['Coordenação/Participação em projetos de Extensão', data.atividades.extensao.t21],
                ['Produção Técnica e Cultural', data.atividades.extensao.t23],
                ['Total Extensão', this.getCategoryTotal(data.atividades.extensao)]
            ],
            theme: 'grid',
            headStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0] },
            styles: { fontSize: 8 },
            columnStyles: { 0: { cellWidth: pageWidth - 45 }, 1: { halign: 'center' } }
        });

        // Final Total Row
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 5,
            body: [['TOTAL GERAL (Máximo 40h)', `${data.total}h`]],
            theme: 'grid',
            styles: { fontSize: 10, fontStyle: 'bold' },
            columnStyles: { 0: { cellWidth: pageWidth - 45 }, 1: { halign: 'center' } }
        });

        // Signatures
        currentY = (doc as any).lastAutoTable.finalY + 30;
        doc.setFontSize(9);
        doc.text('_________________________________', 30, currentY);
        doc.text('Professor(a)', 45, currentY + 5);

        doc.text('_________________________________', pageWidth - 100, currentY);
        doc.text('Departamento de Ensino', pageWidth - 85, currentY + 5);

        doc.save(`PIT_${data.identificacao.nome.replace(/\s/g, '_')}.pdf`);
    }

    async generateRitPdf(data: RitData) {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header (Same as PIT)
        try {
            doc.addImage('assets/cargahoraria/brasao.png', 'PNG', (pageWidth / 2) - 15, 10, 30, 30);
        } catch (e) { }

        doc.setFontSize(10);
        doc.text('INSTITUTO FEDERAL DO CEARÁ - CAMPUS MARACANAÚ', pageWidth / 2, 45, { align: 'center' });
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('RELATÓRIO INDIVIDUAL DE TRABALHO (RIT)', pageWidth / 2, 55, { align: 'center' });

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');

        // Identification
        autoTable(doc, {
            startY: 65,
            head: [['IDENTIFICAÇÃO', '']],
            body: [
                ['Servidor:', data.identificacao.nome],
                ['Siape:', data.identificacao.siape],
                ['Semestre:', data.semestre]
            ],
            theme: 'plain',
            styles: { fontSize: 9 }
        });

        // Reports
        const categories = [
            { label: 'ATIVIDADES DE ENSINO', data: data.relatorios.ensino },
            { label: 'PESQUISA APLICADA', data: data.relatorios.pesquisa },
            { label: 'ATIVIDADES DE EXTENSÃO', data: data.relatorios.extensao },
            { label: 'GESTÃO / COMISSÕES', data: data.relatorios.gestao },
            { label: 'CAPACITAÇÃO', data: data.relatorios.capacitacao }
        ];

        let currentY = (doc as any).lastAutoTable.finalY + 10;
        categories.forEach(cat => {
            if (currentY > 250) { doc.addPage(); currentY = 20; }
            doc.setFont('helvetica', 'bold');
            doc.text(cat.label, 15, currentY);
            currentY += 5;
            doc.setFont('helvetica', 'normal');
            const lines = doc.splitTextToSize(cat.data || 'Nada a relatar.', pageWidth - 30);
            doc.text(lines, 15, currentY);
            currentY += (lines.length * 5) + 8;
        });

        // Schedule Grid
        if (currentY > 180) { doc.addPage(); currentY = 20; }
        doc.setFont('helvetica', 'bold');
        doc.text('DISTRIBUIÇÃO DE CARGA HORÁRIA', 15, currentY);

        const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']; // Matching length
        const scheduleBody = data.horarios.map((row, i) => {
            const periodLabel = i < 4 ? 'Manhã' : i < 8 ? 'Tarde' : 'Noite';
            const slotLabel = String.fromCharCode(65 + (i % 4));
            return [`${periodLabel} ${slotLabel}`, ...row];
        });

        autoTable(doc, {
            startY: currentY + 5,
            head: [['Horário', 'SEG', 'TER', 'QUA', 'QUI', 'SEX']],
            body: scheduleBody,
            theme: 'grid',
            styles: { fontSize: 7, halign: 'center' },
            columnStyles: { 0: { fontStyle: 'bold', halign: 'left' } }
        });

        doc.save(`RIT_${data.identificacao.nome.replace(/\s/g, '_')}.pdf`);
    }

    private getCategoryTotal(category: any): number {
        let total = 0;
        for (const key in category) {
            if (typeof category[key] === 'object') total += this.getCategoryTotal(category[key]);
            else if (key.startsWith('t')) total += category[key];
        }
        return total;
    }
}
