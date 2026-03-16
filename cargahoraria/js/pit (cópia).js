//Variáveis Globais
var total = 0;
var qtdCampos = 20;
var opcoes = '';

var nome = ['CH'];
var qtd = [0];

var selecoesUsuario = [];


//Atualiza o valor do total a cada alteração
function dados2(n) {
	var total = 0;
	var resultado = document.getElementById('total');
  var cargaHoraria = document.getElementById('cargaHoraria');
  nome = ['CH'];
  qtd = [0];

  //Soma o total de todos os campos
	for (var k = 1; k <= 46; k++) {
		var num = document.getElementById('q' + k).value;
		total += Number(num);
    //Preenche o vetor das seleções
		if(num != 0) {
      var verificacao = true;
      var posicao;
      for (var l = 0; l < nome.length; l++) {
        if(nome[l] == nomeSelecao(k)) {
          verificacao = false;
          posicao = l;
          break;
        }
      }
      if(verificacao) {
        nome.push(nomeSelecao(k));
        qtd.push(Number(num));
			}
      if(!verificacao) {
        qtd[l] += Number(num);
      }
    }
	}

	resultado.value = total; //campo total recebe o total

  //Altera a cor do total
	if(total>40) {
		resultado.style.color = "red";
		alert('Sua carga horária ultrapassa as 40hrs.');
	} else {
		resultado.style.color = "black";
	}
}

function dados(n) {
  var total = document.getElementById('total').value;
  var cargaHoraria = document.getElementById('cargaHoraria');
  nome = ['CH'];
  qtd = [0];

  //Soma o total de todos os campos
  for (var k = 1; k <= 46; k++) {
    //Preenche o vetor das seleções
    if(num != 0) {
      var verificacao = true;
      var posicao;
      for (var l = 0; l < nome.length; l++) {
        if(nome[l] == nomeSelecao(k)) {
          verificacao = false;
          posicao = l;
          break;
        }
      }
      if(verificacao) {
        nome.push(nomeSelecao(k));
        qtd.push(Number(num));
      }
      if(!verificacao) {
        qtd[l] += Number(num);
      }
    }
  }

  resultado.value = Number(total) + n; //campo total recebe o total

  //Altera a cor do total
  if(total>40) {
    resultado.style.color = "red";
    alert('Sua carga horária ultrapassa as 40hrs.');
  } else {
    resultado.style.color = "black";
  }
}


//Criação das divs
function carregaValores(){
  //Exclui os campos antigos
  for (var k = 1; k <= qtdCampos; k++) {
    $('#campo' + k + ' option').remove();
  }
  //Criação da variável opções
  opcoes = '<option selected value=""> </option>';
  for (var k = 1; k < nome.length; k++) {
    opcoes += '<option class="op' + k + '" value="' + nome[k] + '">' + nome[k] + '</option>';
  }
  //Criação dos campos
  for (var k = 1; k <= qtdCampos; k++) {
    $('#campo' + k).append(opcoes);
  } 

  dados();
  atualizaTabela();
}


// Atualiza a tabela das quantidades
function atualizaTabela(){
  for (var k = 1; k < 2*qtd.length; k++) {
    $('#qtd').remove();
  }
  
  for (var k = 1; k < nome.length; k++) {
    $('#nomeTabela').append('<th id="qtd"><center>' + nome[k] + '</center></th>');
    $('#qtdTabela').append('<th id="qtd"><center>' + qtd[k] + '</center></th>');
  }
}


//Fixar a seleção do usuário na div
function selecao(n){
  //Adiciona o campo selecionado
  selecoesUsuario.push(n);

  //Exclui os campos antigos e recria os novos
  for (var k = 1; k <= qtdCampos; k++) {
    var verificacao = true;
    for (var l = 0; l < selecoesUsuario.length; l++) {
      if(k == selecoesUsuario[l]) {
        verificacao = false;
        posicao = l;
        break;
      }
    }
    if(verificacao){
        $('#campo' + k + ' option').remove();
        $('#campo' + k).append(opcoes);
    }
  }

  //Reduz o total de horas
  var posicao;
  var nomeSelecionado = document.getElementById('campo' + n).value;
  for (var l = 0; l < nome.length; l++) {
    if (nomeSelecionado == nome[l]) {
      posicao = l;
      break;
    }
  }
  if(qtd[posicao] > 0) {
    qtd[posicao] -= 2;
    atualizaTabela();
  } else {
    document.getElementById('campo' + n).value = "";
  }
}


// Seleção do nome
function nomeSelecao(k) {
  if(k<=3) {
    return 'Aula';
  } else if(k<=5) {
    return 'Manutenção de Ensino';
  } else if(k<=6) {
    return 'Apoio de Ensino';
  } else if(k<=11) {
    return 'Orientação';
  } else if(k<=13) {
    return 'Extracurricular';
  } else if(k<=20) {
    return 'Pesquisa';
  } else if(k<=29) {
    return 'Extensão';
  } else if(k<=37) {
    return 'Gestão';
  } else if(k<=46) {
    return 'Comissões';
  }
}


/* ############################### CÁLCULOS DE HORAS ############################### */
function parte1() { // Aulas (q: 1-3)
  var A1 = document.getElementById('q1').value;
  var A2 = document.getElementById('q2').value;
  var A3 = document.getElementById('q3').value;
  if(A1 != 0 || A2 != 0 || A3 != 0)
    document.getElementById('q6').value = 2;
  else
    document.getElementById('q6').value = 0;
}

function parte8(n) { // Gestão (q: 30-37)
  for (var k = 30; k <= 37; k++) {
    if(k != n)
      document.getElementById('q' + k).value = 0;
  }
}