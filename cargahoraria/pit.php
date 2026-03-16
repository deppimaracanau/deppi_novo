<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8">
  		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Relatório PIT</title>
		<link rel="icon" href="../favicon.ico">
    
    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/estilo.css" rel="stylesheet">
    <link href="../css/pit_ritCSS.css" rel="stylesheet">
    <link href="../css/BodyForm.css" rel="stylesheet">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../js/jquery.mask.min.js"/></script>

	</head>

	<body onload="regimeConfig()">
      <!-- ------------------- Barra de Navegação ------------------- -->
      <nav class="navbar navbar-default navbar-fixed-top barra">
        <div class="container">
          
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" 
                    data-toggle="collapse" data-target="#barra-navegacao">
              <span class="sr-only">Alternar Menu</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a href="../index.html" class="navbar-brand"><span class="logo">IFCE</span></a>
          </div>  

          <div class="collapse navbar-collapse" id="barra-navegacao">
	          <ul class="nav navbar-nav navbar-right">
	          	<li> <a href="../index.html">INÍCIO</a> </li>
	            <li> <a href="../PIT/orientacoesPIT.html">PIT</a> </li>
	            <li> <a href="../RIT/orientacoesRIT.html">RIT</a> </li>
	          </ul>
	       </div>       

        </div>
      </nav>

      <br><br><br><br><br>

	    <form method="post" target="_blank" action="relatorioPIT.php">
	  		<div class="container">
	  			
	        <br><hr/><br>

	        <div class="row">
	          <div class="col-sm-12">
	            <h3>Referente ao Semestre Letivo:</h3>
	            <input type="text" name="semestre" id="semestre" class="form-control" placeholder="xxxx.x">
	          </div>
	        </div>

	        <br><br><hr/><br>

	        <h1 class="page-header">IDENTIFICAÇÃO DO SERVIDOR</h1>

	        <div class="row">
	          <div class="col-sm-8">
	            Nome: 
	            <input type="text" name="nome" id="nome" class="form-control">
	          </div>
	          <div class="col-sm-4">
	            Matricula SIAPE:
	            <input type="text" name="siape" id="siape" class="form-control">
	          </div>
	        </div>
	        <div class="row">
	          <div class="col-sm-7">
	            Curso ou Departamento:
	            <input type="text" name="curso" id="curso" class="form-control">
	          </div>
	          <div class="col-sm-5">
	            Campus: 
	            <input type="text" value="Maracanaú" name="campus" id="campus" class="form-control">
	          </div>
	        </div>
	        <div class="row">
	          <div class="col-sm-4">
	            Fone:
	            <input type="tel" name="telefone" id="telefone" class="form-control" pattern="\([0-9]{2}\)[\s][0-9]{4}-[0-9]{4,5}">
				<script type="text/javascript">$('#telefone').mask('(00) 0000-00009');</script>
	          </div>
	          <div class="col-sm-8">
	            Email:
	            <input type="email" name="email" id="email" class="form-control">
	          </div>
	        </div>
	        <div class="row">
	          <div class="col-sm-6">
	            Tipo de vínculo:
	            <select class="form-control" name="vinculo" id="vinculo">
	              <option selected disabled>Selecione</option>
	              <option value="Efetivo">Efetivo</option>
      				  <option value="Substituto">Substituto</option>
      				  <option value="Temporário">Temporário</option>
      				  <option value="Colaboração Técnica">Colaboração Técnica</option>
	            </select>
	          </div>
	          <div class="col-sm-6">
	            Regime de Trabalho:
	            <select class="form-control" name="regime" onchange="regimeConfig()" id="regime">
	              <option selected disabled>Selecione</option>
	              <option value="40h D.E.">40h D.E.</option>
	              <option value="40h">40h</option>
	              <option value="20h">20h</option>
	            </select>
	          </div>
	        </div>
	        
	        <br><br><hr/><br>

	        <!-- Ficha de Atividades de Carga Horária -->
	        <h1 class="page-header">ATIVIDADES DOCENTES</h1>
	  			<h2>Atividades de Ensino</h2>

	  			<h3>AULAS EM FIC, TÉCNICO, ESPECIALIZAÇÃO TÉCNICA, GRADUAÇÃO E PÓS-GRADUAÇÃO</h3> <!-- PARTE 1 -->
	  			<table class="table table-striped">
	          <tr>
	            <th>Cursos Técnico e/ou Licenciaturas, com base na lei 11.892 de 29 de dezembro de 2008</th>
	            <th> <input type="number" min="0" max="20" class="entradaNum" onchange="dados(1)" name="q1" id="q1" placeholder="Max: 20" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t1" id="t1" /> </th>
	          </tr>
	          <tr>
	            <th>Cursos de Especialização Técnica, Graduação e Pós-graduação (lato sensu e stricto sensu)</th>
	            <th> <input type="number" min="0" max="20" class="entradaNum" onchange="dados(2)" name="q2" id="q2" placeholder="Max: 20" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t2" id="t2" /> </th>
	          </tr>
	          <tr>
	            <th>Cursos FIC (Observar o Art.7, §4º regulamentação da carga horária)</th>
	            <th> <input type="number" min="0" max="400" class="entradaNum" onchange="dados(3)" name="q3" id="q3" placeholder="Max: 400" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t3" id="t3" /> </th>
	          </tr>
	        </table>

	  			<h3>ATIVIDADES DE MANUTENÇÃO AO ENSINO (até 45% do regime de trabalho)</h3> <!-- PARTE 2 -->
	  			<table class="table table-striped">
	          <tr>
	            <th>Preparação + Planejamento</th>
	            <th><input type="text" readonly="true" class="totalNum" name="t4" id="t4" /> </th>
	          </tr>
	          <tr>
	            <th>Atendimento a Estudantes</th>
	            <th><input type="text" readonly="true" class="totalNum" name="t5" id="t5" /> </th>
	          </tr>
	        </table>

	  			<h3>ATIVIDADES DE APOIO AO ENSINO (2 horas)</h3> <!-- PARTE 3 -->
	  			<table class="table table-striped">
	          <tr>
	            <th>Participação nos encontros técnico-pedagógicos, reuniões com os diversos setores da gestão</th>
	            <th><input type="text" readonly="true" class="totalNum" name="t6" id="t6" /> </th>
	          </tr>
	        </table>			

	  			<h3>ATIVIDADES DE ORIENTAÇÃO (até 10 horas)</h3> <!-- PARTE 4 -->
	  			<table class="table table-striped">
	          <tr>
	            <th>Orientação de TCC graduação</th>
	            <th> <input type="number" min="0" max="6" class="entradaNum" onchange="dados(7)" name="q7" id="q7" placeholder="Max: 6" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t7" id="t7" /> </th>
	          </tr>
	          <tr>
	            <th>Orientação de Estágio Supervisionado (Supervisor-Orientador)</th>
	            <th> <input type="number" min="0" max="4" class="entradaNum" onchange="dados(8)" name="q8" id="q8" placeholder="Max: 4" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t8" id="t8" /> </th>
	          </tr>
	          <tr>
	            <th>Orientação de Estágio Supervisionado (Curso com regulamentação diferenciada em Conselho de Classe Profissional)</th>
	            <th> <input type="number" min="0" max="4" class="entradaNum" onchange="dados(9)" name="q9" id="q9" placeholder="Max: 4" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t9" id="t9" /> </th>
	          </tr>
	          <tr>
	            <th>Monitoria</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(10)" name="q10" id="q10" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t10" id="t10" /> </th>
	          </tr>
	          <tr>
	            <th>Programa Institucional de Bolsas de Iniciação à Docência (PIBID) ou outro programa voltado a Permanência e Êxito</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(11)" name="q11" id="q11" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t11" id="t11" /> </th>
	          </tr>
	        </table>		

	  			<h3>ATIVIDADES DE ENSINO EXTRACURRICULAR (até 25% do regime de trabalho)</h3> <!-- PARTE 5 -->
	  			<table class="table table-striped">
	          <tr>
	            <th>Responsável por Laboratório</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(12)" name="q12" id="q12" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t12" id="t12" /> </th>
	          </tr>
	          <tr>
	            <th>Projetos ou atividades complementares de ensino extracurriculares</th>
	            <th> <input type="number" min="0" max="2" class="entradaNum" onchange="dados(13)" name="q13" id="q13" placeholder="Max: 2" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t13" id="t13" /> </th>
	          </tr>
	        </table>

	  			<br><h2>ATIVIDADES DE PESQUISA APLICADA</h2> <!-- PARTE 6 -->

	  			<table class="table table-striped">
	          <tr>
	            <th>Coordenação de projeto de pesquisa aplicada, desenvolvimento cadastrado na PRPI com fomento IFCE ou sem recursos</th>
	            <th> <input type="number" min="0" max="3" class="entradaNum" onchange="dados(14)" name="q14" id="q14" placeholder="Max: 3" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t14" id="t14" /> </th>
	          </tr>
	          <tr>
	            <th>Coordenação de projeto de pesquisa aplicada, desenvolvimento cadastrado na PRPI com captação de recursos externos ao IFCE</th>
	            <th> <input type="number" min="0" max="2" class="entradaNum" onchange="dados(15)" name="q15" id="q15" placeholder="Max: 2" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t15" id="t15" /> </th>
	          </tr>
	          <tr>
	            <th>Participação na equipe de projeto de pesquisa aplicada, desenvolvimento, cadastrado na PRPI</th>
	            <th> <input type="number" min="0" max="2" class="entradaNum" onchange="dados(16)" name="q16" id="q16" placeholder="Max: 2" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t16" id="t16" /> </th>
	          </tr>
	          <tr>
	            <th>Orientação em especialização e Co-orientação em mestrado ou doutorado do IFCE ou em outra instituição de ensino superior com anuência do IFCE</th>
	            <th> <input type="number" min="0" max="4" class="entradaNum" onchange="dados(17)" name="q17" id="q17" placeholder="Max: 4" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t17" id="t17" /> </th>
	          </tr>
	          <tr>
	            <th>Bolsista produtividade PQ, DT do CNPq</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(18)" name="q18" id="q18" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t18" id="t18" /> </th>
	          </tr>
	          <tr>
	            <th>Participação em programa de Pós-graduação em nível de mestrado ou doutorado como docente COLABORADOR (do IFCE ou outra IES com anuência)</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(19)" name="q19" id="q19" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t19" id="t19" /> </th>
	          </tr>
	          <tr>
	            <th>Participação em programa de Pós-graduação em nível de mestrado ou doutorado como docente PERMANENTE (do IFCE ou outra IES com anuência)</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(20)" name="q20" id="q20" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t20" id="t20" /> </th>
	          </tr>
	        </table>

	  			<br><h2>ATIVIDADES DE EXTENSÃO</h2> <!-- PARTE 7 -->

	  			<table class="table table-striped">
	          <tr>
	            <th>Coordenação de projeto/programa de extensão cadastrado na PROEXT com fomento IFCE ou sem recursos</th>
	            <th> <input type="number" min="0" max="3" class="entradaNum" onchange="dados(21)" name="q21" id="q21" placeholder="Max: 3" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t21" id="t21" /> </th>
	          </tr>
	          <tr>
	            <th>Coordenação de projeto/programa de extensão cadastrado na PROEXT com captação de recursos externos ao IFCE</th>
	            <th> <input type="number" min="0" max="2" class="entradaNum" onchange="dados(22)" name="q22" id="q22" placeholder="Max: 2" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t22" id="t22" /> </th>
	          </tr>
	          <tr>
	            <th>Participação na equipe de projeto ou programa de extensão, cadastrado na PROEXT, exceto aula FIC</th>
	            <th> <input type="number" min="0" max="2" class="entradaNum" onchange="dados(23)" name="q23" id="q23" placeholder="Max: 2" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t23" id="t23" /> </th>
	          </tr>
	          <tr>
	            <th>Coordenação de incubadoras de empresas</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(24)" name="q24" id="q24" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t24" id="t24" /> </th>
	          </tr>
	          <tr>
	            <th>Coordenação dos NAPNEs ou NEABIs</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(25)" name="q25" id="q25" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t25" id="t25" /> </th>
	          </tr>
	          <tr>
	            <th>Participação em NAPNEs ou NEABIs</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(26)" name="q26" id="q26" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t26" id="t26" /> </th>
	          </tr>
	          <tr>
	            <th>Cursos FIC (Quantidade de horas por curso)</th>
	            <th> <input type="number" min="0" max="240" class="entradaNum" onchange="dados(27)" name="q27" id="q27" placeholder="Max: 240" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t27" id="t27" /> </th>
	          </tr>
	          <tr>
	            <th>Preparação + Planejamento dos cursos FIC</th>
	            <th> <input type="number" min="0" max="120" class="entradaNum" onchange="dados(28)" name="q28" id="q28" placeholder="Max: 120" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t28" id="t28" /> </th>
	          </tr>
	          <tr>
	            <th>Planejamento e organização de eventos de extensão</th>
	            <th> <input type="number" min="0" max="2" class="entradaNum" onchange="dados(29)" name="q29" id="q29" placeholder="Max: 2" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t29" id="t29" /> </th>
	          </tr>
	        </table>


	  			<br><h2>ATIVIDADES DE GESTÃO (Somente para os regimes de trabalho de 40h ou 40h com D.E.)</h2>

	  			<h3 id="gestaoTitulo">ATIVIDADES DE GESTÃO INSTITUCIONAL E ACADÊMICA</h3> <!-- PARTE 8 -->
	  			<table class="table table-striped" id="gestao">
	          <tr>
	            <th>Coordenador de Curso</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(30)" name="q30" id="q30" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t30" id="t30" /> </th>
	          </tr>
	          <tr>
	            <th>Coordenador de Setor</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(31)" name="q31" id="q31" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t31" id="t31" /> </th>
	          </tr>
	          <tr>
	            <th>Chefe de Departamento</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(32)" name="q32" id="q32" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t32" id="t32" /> </th>
	          </tr>
	          <tr>
	            <th>Diretores de Área/Setor</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(33)" name="q33" id="q33" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t33" id="t33" /> </th>
	          </tr>
	          <tr>
	            <th>Assessor da Reitoria</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(34)" name="q34" id="q34" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t34" id="t34" /> </th>
	          </tr>
	          <tr>
	            <th>Coordenador de Implantação de Campus</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(35)" name="q35" id="q35" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t35" id="t35" /> </th>
	          </tr>
	          <tr>
	            <th>Assistente de Pró-Reitoria ou Chefe de Gabinete de Campus</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(36)" name="q36" id="q36" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t36" id="t36" /> </th>
	          </tr>
	          <tr>
	            <th>Coordenador de programa institucional: ensino, pesquisa aplicada ou extensão</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(37)" name="q37" id="q37" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t37" id="t37" /> </th>
	          </tr>
	        </table>
	  			
	  			<h3>ATIVIDADES EM COMISSÕES OU DE FISCALIZAÇÃO</h3> <!-- PARTE 9 -->
	  			<table class="table table-striped">
	          <tr>
	            <th>Conselhos, comissões ou comitês permanentes institucionais</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(38)" name="q38" id="q38" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t38" id="t38" /> </th>
	          </tr>
	          <tr>
	            <th>Comissão Própria de Avaliação e Comissão Permanente de Pessoal Docente (Central)</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(39)" name="q39" id="q39" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t39" id="t39" /> </th>
	          </tr>
	          <tr>
	            <th>Comissão Própria de Avaliação e Comissão Permanente de Pessoal Docente (Local)</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(40)" name="q40" id="q40" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t40" id="t40" /> </th>
	          </tr>
	          <tr>
	            <th>Conselhos ou comitês permanentes externos</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(41)" name="q41" id="q41" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t41" id="t41" /> </th>
	          </tr>
	          <tr>
	            <th>Colegiado de Cursos</th>
	            <th> <input type="number" min="0" max="2" class="entradaNum" onchange="dados(42)" name="q42" id="q42" placeholder="Max: 2" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t42" id="t42" /> </th>
	          </tr>
	          <tr>
	            <th>Núcleo Docente Estruturante (NDE)</th>
	            <th> <input type="number" min="0" max="2" class="entradaNum" onchange="dados(43)" name="q43" id="q43" placeholder="Max: 2" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t43" id="t43" /> </th>
	          </tr>
	          <tr>
	            <th>Comissão de Processo Administrativo Disciplinar</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(44)" name="q44" id="q44" placeholder="Max: 1" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t44" id="t44" /> </th>
	          </tr>
	          <tr>
	            <th>Participação em Direção Sindical como titular</th>
	            <th> <input type="number" min="0" max="1" class="entradaNum" onchange="dados(45)" name="q45" id="q45"  placeholder="Max: 1"/> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t45" id="t45" /> </th>
	          </tr>
	          <tr>
	            <th>Fiscalização de contrato</th>
	            <th><input type="number" min="0" max="2" class="entradaNum" onchange="dados(46)" name="q46" id="q46" placeholder="Max: 2" /> </th>
	            <th><input type="text" readonly="true" class="totalNum" name="t46" id="t46" /> </th>
	          </tr>
	        </table>	

	        <!-- Total -->
	        <table class="table table-striped">
	          <tr>
	            <th><h3>Total</h3></th>
	            <th> <input type="text" readonly="true" class="saidaTotal" name="total" id="total" /> </th>
	          </tr>
	        </table>

	        <!-- Janela -->
	        <div class="modal fade" id="janela">
	          
	          <div class="modal-dialog modal-lg">
	            <div class="modal-content">
	              
	              <!-- cabecalho -->
	              <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal">
	                  <span>&times;</span>
	                </button>
	                <h2 class="modal-title">Horários da Semana</h2>
	              </div>

	              <!-- corpo -->
	              <div class="modal-body">
	                <table class="table table-striped">
	                  <tr id="nomeTabela">
	                    
	                  </tr>
	                  <tr id="qtdTabela">
	                    
	                  </tr>
	                </table>

	                <table class="table table-striped">
	                  <tr>
	                    <th></th>
	                    <th></th>
	                    <th>Segunda</th>
	                    <th>Terça</th>
	                    <th>Quarta</th>
	                    <th>Quinta</th>
	                    <th>Sexta</th>
	                  </tr>
	                  <tr>
	                    <th rowspan="4">Manhã</th>
	                    <th>A</th>
	                    <th> <select class="form-control" onchange="selecao(1)" onclick="guardaSelecaoDoMomento(1)" name="campo1" id="campo1"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(2)" onclick="guardaSelecaoDoMomento(2)" name="campo2" id="campo2"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(3)" onclick="guardaSelecaoDoMomento(3)" name="campo3" id="campo3"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(4)" onclick="guardaSelecaoDoMomento(4)" name="campo4" id="campo4"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(5)" onclick="guardaSelecaoDoMomento(5)" name="campo5" id="campo5"></select>  </th>
	                  </tr>
	                  <tr>  
	                    <th>B</th>
	                    <th> <select class="form-control" onchange="selecao(6)" onclick="guardaSelecaoDoMomento(6)" name="campo6" id="campo6"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(7)" onclick="guardaSelecaoDoMomento(7)" name="campo7" id="campo7"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(8)" onclick="guardaSelecaoDoMomento(8)" name="campo8" id="campo8"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(9)" onclick="guardaSelecaoDoMomento(9)" name="campo9" id="campo9"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(10)" onclick="guardaSelecaoDoMomento(10)" name="campo10" id="campo10"></select>  </th>
	                  </tr>
	                  <tr>  
	                    <th>C</th>
	                    <th> <select class="form-control" onchange="selecao(11)" onclick="guardaSelecaoDoMomento(11)" name="campo11" id="campo11"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(12)" onclick="guardaSelecaoDoMomento(12)" name="campo12" id="campo12"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(13)" onclick="guardaSelecaoDoMomento(13)" name="campo13" id="campo13"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(14)" onclick="guardaSelecaoDoMomento(14)" name="campo14" id="campo14"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(15)" onclick="guardaSelecaoDoMomento(15)" name="campo15" id="campo15"></select>  </th>
	                  </tr>
	                  <tr>  
	                    <th>D</th>
	                    <th> <select class="form-control" onchange="selecao(16)" onclick="guardaSelecaoDoMomento(16)" name="campo16" id="campo16"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(17)" onclick="guardaSelecaoDoMomento(17)" name="campo17" id="campo17"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(18)" onclick="guardaSelecaoDoMomento(18)" name="campo18" id="campo18"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(19)" onclick="guardaSelecaoDoMomento(19)" name="campo19" id="campo19"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(20)" onclick="guardaSelecaoDoMomento(20)" name="campo20" id="campo20"></select>  </th>
	                  </tr>
	                  <tr>
	                    <th rowspan="4">Tarde</th>
	                    <th>A</th>
	                    <th> <select class="form-control" onchange="selecao(21)" onclick="guardaSelecaoDoMomento(21)" name="campo21" id="campo21"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(22)" onclick="guardaSelecaoDoMomento(22)" name="campo22" id="campo22"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(23)" onclick="guardaSelecaoDoMomento(23)" name="campo23" id="campo23"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(24)" onclick="guardaSelecaoDoMomento(24)" name="campo24" id="campo24"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(25)" onclick="guardaSelecaoDoMomento(25)" name="campo25" id="campo25"></select>  </th>
	                  </tr>
	                  <tr>  
	                    <th>B</th>
	                    <th> <select class="form-control" onchange="selecao(26)" onclick="guardaSelecaoDoMomento(26)" name="campo26" id="campo26"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(27)" onclick="guardaSelecaoDoMomento(27)" name="campo27" id="campo27"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(28)" onclick="guardaSelecaoDoMomento(28)" name="campo28" id="campo28"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(29)" onclick="guardaSelecaoDoMomento(29)" name="campo29" id="campo29"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(30)" onclick="guardaSelecaoDoMomento(30)" name="campo30" id="campo30"></select>  </th>
	                  </tr>
	                  <tr>  
	                    <th>C</th>
	                    <th> <select class="form-control" onchange="selecao(31)" onclick="guardaSelecaoDoMomento(31)" name="campo31" id="campo31"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(32)" onclick="guardaSelecaoDoMomento(32)" name="campo32" id="campo32"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(33)" onclick="guardaSelecaoDoMomento(33)" name="campo33" id="campo33"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(34)" onclick="guardaSelecaoDoMomento(34)" name="campo34" id="campo34"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(35)" onclick="guardaSelecaoDoMomento(35)" name="campo35" id="campo35"></select>  </th>
	                  </tr>
	                  <tr>
	                    <th>D</th>
	                    <th> <select class="form-control" onchange="selecao(36)" onclick="guardaSelecaoDoMomento(36)" name="campo36" id="campo36"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(37)" onclick="guardaSelecaoDoMomento(37)" name="campo37" id="campo37"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(38)" onclick="guardaSelecaoDoMomento(38)" name="campo38" id="campo38"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(39)" onclick="guardaSelecaoDoMomento(39)" name="campo39" id="campo39"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(40)" onclick="guardaSelecaoDoMomento(40)" name="campo40" id="campo40"></select>  </th>
	                  </tr>
	                  <tr>
	                    <th rowspan="4">Noite</th>
	                    <th>A</th>
	                    <th> <select class="form-control" onchange="selecao(41)" onclick="guardaSelecaoDoMomento(41)" name="campo41" id="campo41"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(42)" onclick="guardaSelecaoDoMomento(42)" name="campo42" id="campo42"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(43)" onclick="guardaSelecaoDoMomento(43)" name="campo43" id="campo43"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(44)" onclick="guardaSelecaoDoMomento(44)" name="campo44" id="campo44"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(45)" onclick="guardaSelecaoDoMomento(45)" name="campo45" id="campo45"></select>  </th>
	                  </tr>
	                  <tr>  
	                    <th>B</th>
	                    <th> <select class="form-control" onchange="selecao(46)" onclick="guardaSelecaoDoMomento(46)" name="campo46" id="campo46"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(47)" onclick="guardaSelecaoDoMomento(47)" name="campo47" id="campo47"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(48)" onclick="guardaSelecaoDoMomento(48)" name="campo48" id="campo48"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(49)" onclick="guardaSelecaoDoMomento(49)" name="campo49" id="campo49"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(50)" onclick="guardaSelecaoDoMomento(50)" name="campo50" id="campo50"></select>  </th>
	                  </tr>
	                  <tr>  
	                    <th>C</th>
	                    <th> <select class="form-control" onchange="selecao(51)" onclick="guardaSelecaoDoMomento(51)" name="campo51" id="campo51"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(52)" onclick="guardaSelecaoDoMomento(52)" name="campo52" id="campo52"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(53)" onclick="guardaSelecaoDoMomento(53)" name="campo53" id="campo53"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(54)" onclick="guardaSelecaoDoMomento(54)" name="campo54" id="campo54"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(55)" onclick="guardaSelecaoDoMomento(55)" name="campo55" id="campo55"></select>  </th>
	                  </tr>
	                  <tr>
	                    <th>D</th>
	                    <th> <select class="form-control" onchange="selecao(56)" onclick="guardaSelecaoDoMomento(56)" name="campo56" id="campo56"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(57)" onclick="guardaSelecaoDoMomento(57)" name="campo57" id="campo57"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(58)" onclick="guardaSelecaoDoMomento(58)" name="campo58" id="campo58"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(59)" onclick="guardaSelecaoDoMomento(59)" name="campo59" id="campo59"></select>  </th>
	                    <th> <select class="form-control" onchange="selecao(60)" onclick="guardaSelecaoDoMomento(60)" name="campo60" id="campo60"></select>  </th>
	                  </tr>
	                </table>
	              </div>

	              <!-- rodape -->
	              <div class="modal-footer">
                  <div class="row">
                    <div class="col-xs-4">
                      <center> <button type="button" class="btn btn-default" data-dismiss="modal" style="padding:7px 15px 7px 15px;">Voltar</button> </center>
                    </div>

                    <div class="col-xs-4">
                      <center> <button type="submit" id="submeter" class="btn btn-success" style="padding:7px 15px 7px 15px;">Gerar Relatório</button> </center>
                    </div>

                    <div class="col-xs-4">
                      <center> <button type="button" class="btn btn-info" onclick="reiniciar()" style="padding:7px 15px 7px 15px;">Reiniciar</button> </center>
                    </div>
                  </div>

                  <script type="text/javascript">
              		  $(document).ready(function () {
						   $('input').keypress(function (e) {
						        var code = null;
						        code = (e.keyCode ? e.keyCode : e.which);                
						        return (code == 13) ? false : true;
						   });
						});  	
              	  </script>

	              </div>

	            </div>
	          </div>
	        </div>

	        <!-- Botões Página Principal-->
	        <br>
	        <div class="row">
	          <div class="col-xs-6">
	            <center> <a href="../index.html" class="btn btn-default botao">Voltar</a> </center>
	          </div>

	          <div class="col-xs-6">
	            <center> <button type="button" onclick="carregaValores();" class="btn btn-success botao" data-toggle="modal" data-target="#janela">Próximo</button> </center>
	          </div>
	        </div>

	        <br><br><br>

	  		</div> <!-- Fim do Container -->
	    </form>

        <!-- ------------------- Rodapé ------------------- -->
        <footer>
          <div class="container">
            <div class="row">
              <h5>DEPPI - Departamento de Extensão, Pesquisa, Pós-Graduação e Inovação</h5>
            </div>
          </div>
        </footer>



        <!-- ------------------------ Código JavaScript do Sistema ------------------------ -->
		<script type="text/javascript">
	    	//Variáveis Globais
			var qtdCampos = 60;
			var opcaoAtual;

			var nome = ['Aula', 'Planejamento', 'Atendimento ao Aluno', 'Apoio de Ensino', 'Orientação', 'Extracurricular', 'Pesquisa', 'Extensão', 'Gestão', 'Comissões'];
			var qtd; // Quantidades marcadas no formulário
			var qtdSelecionada; // Quantidades selecionadas no quadro

			var opcoes;
			var selecoesUsuario = [];

		    //Configuração do regime de trabalho
		    function regimeConfig() {
		        for (var k = 1; k <= 46; k++) // zera as quantidades
		          if(k != 4 && k != 5 && k != 6)
		          document.getElementById('q' + k).value = "";

		        dados(1); // zera os totais

		        if(document.getElementById('regime').value == "20h") {
		          $('#gestaoTitulo').addClass('hidden');
		          $('#gestao').addClass('hidden');

		          document.getElementById('q1').setAttribute('placeholder', 'Max: 12');
		          document.getElementById('q1').setAttribute('max', '12');

		          document.getElementById('q2').setAttribute('placeholder', 'Max: 12');
		          document.getElementById('q2').setAttribute('max', '12');

		          document.getElementById('q3').setAttribute('placeholder', 'Max: 200');
		          document.getElementById('q3').setAttribute('max', '200');

		          document.getElementById('q27').setAttribute('placeholder', 'Max: 200');
		          document.getElementById('q27').setAttribute('max', '200');

		          document.getElementById('q28').setAttribute('placeholder', 'Max: 100');
		          document.getElementById('q28').setAttribute('max', '100');
		          
		        } else {
		          $('#gestaoTitulo').removeClass('hidden');
		          $('#gestao').removeClass('hidden');

		          document.getElementById('q1').setAttribute('placeholder', 'Max: 20');
		          document.getElementById('q1').setAttribute('max', '20');

		          document.getElementById('q2').setAttribute('placeholder', 'Max: 20');
		          document.getElementById('q2').setAttribute('max', '20');

		          document.getElementById('q3').setAttribute('placeholder', 'Max: 400');
		          document.getElementById('q3').setAttribute('max', '400');

		          document.getElementById('q27').setAttribute('placeholder', 'Max: 240');
		          document.getElementById('q27').setAttribute('max', '240');

		          document.getElementById('q28').setAttribute('placeholder', 'Max: 120');
		          document.getElementById('q28').setAttribute('max', '120');
		        }
		    }

			//Atualiza o valor do total a cada alteração
			function dados(n) {

				// Zerar as opções da parte 8, pois somente um deve ser escolhido
				if(30 <= n && n <= 37)
					for (var k = 30; k <= 37; k++) {
						if(k != n)
							document.getElementById('q' + k).value = 0;
					}

				calcularTotais();
				carregarVetor();

				// Estabelece a carga máxima, mesmo que ultrapasse
				if(somaGeral() > 40)
					document.getElementById('total').value = 40;

				atualizaTabela();

				atualizacaoCamposSelecao();
			}

			// Calcular os totais
			function calcularTotais() {

			  	for (var k = 1; k <= 46; k++) {
				    var prod = 1;

				    if(k == 3 || k == 27 || k == 28) {
				      prod = 0.05;

				    } else if(k == 5) {
				      prod = 0.2;

				    } else if(k == 4) {
				      prod = 0.8;

				    } else if(k == 9 || k == 10 || k == 17) {
				      prod = 2;

				    } else if(k == 16 || k == 23 || k == 26 || k == 38) {
				      prod = 3;

				    } else if(k == 14 || k == 21 || k == 40 || k == 44 || k == 45) {
				      prod = 4;

				    } else if(k == 25) {
				      prod = 5;

				    } else if(k == 15 || k == 22) {
				      prod = 6;

				    } else if(k == 12 || k == 19 || k == 39) {
				      prod = 8;

				    } else if(k == 11) {
				      prod = 10;

				    } else if(k == 18 || k == 20 || k == 24) {
				      prod = 16;

				    } else if(30 <= k && k <= 37) {
				      prod = 18;
				    }

				    if(k != 4 && k != 5 && k != 6) {
				    	document.getElementById('t' + k).value = Number(document.getElementById('q' + k).value) * prod;
				    } else if(k==6) { // não precisa passar pelo 4 e 5 (repetitivo)
						var A1 = Number(document.getElementById('t1').value);
						var A2 = Number(document.getElementById('t2').value);
						var A3 = Number(document.getElementById('t3').value);

						// Limita a ser até 20
						var x = (A1 + A2 + A3) > 20 ? 20 : (A1 + A2 + A3);

						// Calculos do campo 4 e 5
		            	if(document.getElementById('regime').value == "20h") {
							
							document.getElementById('t5').value = Math.ceil(x * 0.2) > 2 ? 2 : Math.ceil(x * 0.2);

							var T6 = x - Number(document.getElementById('t5').value);
							T6 = Math.ceil(T6);

							if(T6>4)
								document.getElementById('t4').value = 4;
							else
								document.getElementById('t4').value = T6;

			            } else {

							document.getElementById('t5').value = Math.ceil(x * 0.2);

							var T6 = x - Number(document.getElementById('t5').value);
							T6 = Math.ceil(T6);

							if(T6>14)
								document.getElementById('t4').value = 14;
							else
								document.getElementById('t4').value = T6;
			            }

			            // cálculos do campo 6
		            	if(A1 != 0 || A2 != 0 || A3 != 0)
		               		document.getElementById('t6').value = 2;
		              	else
		                	document.getElementById('t6').value = 0;
					}
				}
			}

			// Horas Individuais no Vetor
			function carregarVetor() {
			  qtd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			  for (var k = 1; k <= 46; k++) {
			    var num = Number(document.getElementById('t' + k).value);
			    if(k<=3) {
			      qtd[0] += num;
			    } else if(k==4) {
			      qtd[1] += num;
			    } else if(k==5) {
			      qtd[2] += num;
			    } else if(k==6) {
			      qtd[3] += num;
			    } else if(k<=11) {
			      qtd[4] += num;
			    } else if(k<=13) {
			      qtd[5] += num;
			    } else if(k<=20) {
			      qtd[6] += num;
			    } else if(k<=29) {
			      qtd[7] += num;
			    } else if(k<=37) {
			      qtd[8] += num;
			    } else if(k<=46) {
			      qtd[9] += num;
			    }
			  }
			}

			// Soma Geral
			function somaGeral() {
			  var total = 0;
			  for (var k = 0; k < qtd.length; k++)
			    total += qtd[k];
			  document.getElementById('total').value = total;
			  return total;
			}

			// Atualiza a lista de opções para seleção
			function atualizacaoCamposSelecao() {
				for (var k = 1; k <= qtdCampos; k++) {
					if(document.getElementById('opVazio' + k) == null) {
						$('#campo' + k).append('<option id="opVazio' + k + '" selected value=""> </option>');
					}

					for (var j = 0; j < nome.length; j++) {
			    		if(qtd[j] != 0)
							if(document.getElementById(nome[j] + k) == null)
								$('#campo' + k).append('<option id="' + nome[j] + k + '" value="' + nome[j] + '">' + nome[j] + '</option>');
					}
				}
			}


			/* ################## Montagem da Tabela de Horários ################## */
			// Função do botão reiniciar os campos de seleção de horário
			function reiniciar() {
				qtdSelecionada = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			    for (var k = 1; k <= qtdCampos; k++)
				    $('#campo' + k).val('');
				atualizaTabela();
			}

			// Atualiza a tabela das quantidades
			function atualizaTabela(){
				contaSelecoes();
			    for (var k = 0; k < 3*qtd.length; k++) {
			   		$('#qtd').remove();
			    }
			  
			    for (var k = 0; k < nome.length; k++) {
				  	// Remove os campos que tem o nome onde a quantidade se tornou negativa
				  	var resultado = qtd[k] - qtdSelecionada[k];
				  	if(resultado < 0) {
				  		resultado = 0;
				  		for (var l = 1; l <= qtdCampos; l++) {
				  			if($('#campo' + l).val() == nome[k])
				  				$('#campo' + l).val('');
			    		}

			    		// Condição para remover da lista o que for igual a zero
			    		for (var l = 1; l <= qtdCampos; l++) {
							$('#' + nome[k] + l).remove();
						}
				  	}

				  	$('#nomeTabela').append('<th id="qtd"><center>' + nome[k] + '</center></th>');
				    $('#qtdTabela').append('<th id="qtd"><center>' + resultado + '</center></th>');
			    } 
			}


			//Fixar a seleção do usuário na div
			function selecao(n){
				var posicao;
				var nomeSelecionado = document.getElementById('campo' + n).value;

				for (var l = 0; l < nome.length; l++) {
					if (nomeSelecionado == nome[l]) {
						posicao = l;
						break;
					}
				}

				if(qtd[posicao] - qtdSelecionada[posicao] == 0) // Não permite colocar uma seleção que esteja com qtd vazia
					document.getElementById('campo' + n).value = "";
				
				atualizaTabela();
			}

			// Soma os valores das seleções
			function contaSelecoes() {
				qtdSelecionada = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			    for (var k = 1; k <= qtdCampos; k++) {
				    var nomeCampo = $('#campo' + k).val();
				    if(nomeCampo == nome[0]) {
				    	qtdSelecionada[0]++;
				    } else if(nomeCampo == nome[1]) {
				    	qtdSelecionada[1]++;
				    } else if(nomeCampo == nome[2]) {
				    	qtdSelecionada[2]++;
				    } else if(nomeCampo == nome[3]) {
				    	qtdSelecionada[3]++;
				    } else if(nomeCampo == nome[4]) {
				    	qtdSelecionada[4]++;
				    } else if(nomeCampo == nome[5]) {
				    	qtdSelecionada[5]++;
				    } else if(nomeCampo == nome[6]) {
				    	qtdSelecionada[6]++;
				    } else if(nomeCampo == nome[7]) {
				    	qtdSelecionada[7]++;
				    } else if(nomeCampo == nome[8]) {
				    	qtdSelecionada[8]++;
				    } else if(nomeCampo == nome[9]) {
				    	qtdSelecionada[9]++;
				    }
				  }
			}

			function guardaSelecaoDoMomento(n) {
				opcaoAtual = document.getElementById('campo' + n).value;
			}

		</script>

		<!-- Resgata Informações -->
	<script type="text/javascript">
		$(document).ready( function() {
			var info = "<?= $_COOKIE['semestre']; ?>"; $("#semestre").val(info);
			var info = "<?= $_COOKIE['nome']; ?>"; $("#nome").val(info);
			var info = "<?= $_COOKIE['siape']; ?>"; $("#siape").val(info);
			var info = "<?= $_COOKIE['curso']; ?>"; $("#curso").val(info);
			var info = "<?= $_COOKIE['campus']; ?>"; $("#campus").val(info);
			var info = "<?= $_COOKIE['telefone']; ?>"; $("#telefone").val(info);
			var info = "<?= $_COOKIE['email']; ?>"; $("#email").val(info);
			var info = "<?= $_COOKIE['vinculo']; ?>"; $("#vinculo").val(info);
			var info = "<?= $_COOKIE['regime']; ?>"; $("#regime").val(info);

        });
	</script>

	</body>
</html>