<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8">
  		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Relatório RIT</title>
		<link rel="icon" href="../favicon.ico">

	    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet">
	    <link href="../css/estilo.css" rel="stylesheet">
	    <link href="../css/pit_ritCSS.css" rel="stylesheet">
	    <link href="../css/BodyForm.css" rel="stylesheet">

	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	    <script src="../bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="../js/jquery.mask.min.js"/></script>
		
	</head>

	<body onload="criarOpcoes()">
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

		<form method="post" target="_blank" action="relatorioRIT.php">
			<div class="container" id="rit">
				<br><hr/><br>

				<div class="row">
					<div class="col-sm-12">
						<h3>Referente ao Semestre Letivo:</h3>
						<input type="text" name="semestre" id="semestre" class="form-control" placeholder="xxxx.x">
					</div>
				</div>

				<br><br><hr/><br>

				<h1 class= "page-header">IDENTIFICAÇÃO DO SERVIDOR</h1>

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
						<input type="text"  value="Maracanaú" name="campus" id="campus" class="form-control">
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
						<select class="form-control" name="regime" id="regime">
							<option selected disabled>Selecione</option>
							<option value="40h D.E.">40h D.E.</option>
				            <option value="40h">40h</option>
				            <option value="20h">20h</option>
						</select>
					</div>
				</div>
				
				<br><br><hr/><br>

				<h1 class= "page-header">ATIVIDADES DOCENTES DESENVOLVIDAS NO SEMESTRE LETIVO</h1>
				<h2>ATIVIDADES DE ENSINO</h2>
				<h4 class="texto">Listar disciplinas ministradas, orientações de alunos concluídas no decorrer do semestre ou em andamento, horários disponibilizados para o atendimento ao aluno, e demais atividades de ensino descritas no Plano de Trabalho Docente.</h4>
				<textarea class="caixaRelatorio" name="campoTexto1" id="campoTexto1"></textarea>

				<h2>ATIVIDADES DE PESQUISA APLICADA</h2>
				<h4 class="texto">Relatar o andamento dos projetos e demais atividades de pesquisa aplicada listadas no Plano de Trabalho Docente. No caso de projetos, indicar o cronograma de execução (prazos atuais) e as atividades desenvolvidas no decorrer do semestre.</h4>
				<textarea class="caixaRelatorio" name="campoTexto2" id="campoTexto2"></textarea>

				<h2>ATIVIDADES DE EXTENSÃO</h2>
				<h4 class="texto">Relatar o andamento dos projetos e demais atividades de extensão listadas no Plano de Trabalho Docente. No caso de projetos ou programas, indicar o cronograma de execução (prazos atuais) e as atividades desenvolvidas no decorrer do semestre.</h4>
				<textarea class="caixaRelatorio" name="campoTexto3" id="campoTexto3"></textarea>

				<h2>ATIVIDADES DE GESTÃO</h2>
				<h4 class="texto">Descrever as principais atividades desenvolvidas na gestão institucional do IFCE de acordo com a função; ou atividades em comissões/fiscalizações realizadas no decorrer do semestre de acordo com o Plano de Trabalho Docente.</h4>
				<textarea class="caixaRelatorio" name="campoTexto4" id="campoTexto4"></textarea>

				<h2>ATIVIDADES DE CAPACITAÇÃO</h2>
				<h4 class="texto">Descrever o andamento das atividades de capacitação realizada e seu cronograma atual.</h4>
				<textarea class="caixaRelatorio" name="campoTexto5" id="campoTexto5"></textarea>

				<br><br><br><hr/><br>

				<h1 class= "page-header">DISTRIBUIÇÃO DE CARGA HORÁRIA DO DOCENTE NO SEMESTRE ANTERIOR</h1>
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
                    <th> <select class="form-control" onchange="selecao(1)" name="campo1" id="campo1"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(2)" name="campo2" id="campo2"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(3)" name="campo3" id="campo3"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(4)" name="campo4" id="campo4"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(5)" name="campo5" id="campo5"></select>  </th>
                  </tr>
                  <tr>  
                    <th>B</th>
                    <th> <select class="form-control" onchange="selecao(6)" name="campo6" id="campo6"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(7)" name="campo7" id="campo7"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(8)" name="campo8" id="campo8"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(9)" name="campo9" id="campo9"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(10)" name="campo10" id="campo10"></select>  </th>
                  </tr>
                  <tr>  
                    <th>C</th>
                    <th> <select class="form-control" onchange="selecao(11)" name="campo11" id="campo11"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(12)" name="campo12" id="campo12"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(13)" name="campo13" id="campo13"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(14)" name="campo14" id="campo14"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(15)" name="campo15" id="campo15"></select>  </th>
                  </tr>
                  <tr>  
                    <th>D</th>
                    <th> <select class="form-control" onchange="selecao(16)" name="campo16" id="campo16"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(17)" name="campo17" id="campo17"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(18)" name="campo18" id="campo18"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(19)" name="campo19" id="campo19"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(20)" name="campo20" id="campo20"></select>  </th>
                  </tr>
                  <tr>
                    <th rowspan="4">Tarde</th>
                    <th>A</th>
                    <th> <select class="form-control" onchange="selecao(21)" name="campo21" id="campo21"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(22)" name="campo22" id="campo22"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(23)" name="campo23" id="campo23"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(24)" name="campo24" id="campo24"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(25)" name="campo25" id="campo25"></select>  </th>
                  </tr>
                  <tr>  
                    <th>B</th>
                    <th> <select class="form-control" onchange="selecao(26)" name="campo26" id="campo26"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(27)" name="campo27" id="campo27"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(28)" name="campo28" id="campo28"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(29)" name="campo29" id="campo29"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(30)" name="campo30" id="campo30"></select>  </th>
                  </tr>
                  <tr>  
                    <th>C</th>
                    <th> <select class="form-control" onchange="selecao(31)" name="campo31" id="campo31"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(32)" name="campo32" id="campo32"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(33)" name="campo33" id="campo33"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(34)" name="campo34" id="campo34"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(35)" name="campo35" id="campo35"></select>  </th>
                  </tr>
                  <tr>
                    <th>D</th>
                    <th> <select class="form-control" onchange="selecao(36)" name="campo36" id="campo36"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(37)" name="campo37" id="campo37"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(38)" name="campo38" id="campo38"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(39)" name="campo39" id="campo39"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(40)" name="campo40" id="campo40"></select>  </th>
                  </tr>
                  <tr>
                    <th rowspan="4">Noite</th>
                    <th>A</th>
                    <th> <select class="form-control" onchange="selecao(41)" name="campo41" id="campo41"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(42)" name="campo42" id="campo42"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(43)" name="campo43" id="campo43"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(44)" name="campo44" id="campo44"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(45)" name="campo45" id="campo45"></select>  </th>
                  </tr>
                  <tr>  
                    <th>B</th>
                    <th> <select class="form-control" onchange="selecao(46)" name="campo46" id="campo46"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(47)" name="campo47" id="campo47"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(48)" name="campo48" id="campo48"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(49)" name="campo49" id="campo49"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(50)" name="campo50" id="campo50"></select>  </th>
                  </tr>
                  <tr>  
                    <th>C</th>
                    <th> <select class="form-control" onchange="selecao(51)" name="campo51" id="campo51"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(52)" name="campo52" id="campo52"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(53)" name="campo53" id="campo53"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(54)" name="campo54" id="campo54"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(55)" name="campo55" id="campo55"></select>  </th>
                  </tr>
                  <tr>
                    <th>D</th>
                    <th> <select class="form-control" onchange="selecao(56)" name="campo56" id="campo56"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(57)" name="campo57" id="campo57"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(58)" name="campo58" id="campo58"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(59)" name="campo59" id="campo59"></select>  </th>
                    <th> <select class="form-control" onchange="selecao(60)" name="campo60" id="campo60"></select>  </th>
                  </tr>
                </table>

				<div class="row"> <br>
		          <div class="col-xs-6">
		            <center> <a href="../index.html" class="btn btn-default botao">Voltar</a> </center>
		          </div>

		          <div class="col-xs-6">
		            <center> <button type="submit" class="btn btn-success botao">Gerar Relatório</button> </center>
		          </div>
		        </div>

				<br><br><br>

			</div> <!-- Fim Container -->
		</form>

		<!-- ------------------- Rodapé ------------------- -->
	      <footer>
	        <div class="container">
	          <div class="row">
	            <h5>DEPPI - Departamento de Extensão, Pesquisa, Pós-Graduação e Inovação</h5>
	          </div>
	        </div>
	      </footer>
	</body>

	<script type="text/javascript">
		var opcoes = '';
		var qtdCampos = 60;
		var nome = ['Aula', 'Planejamento', 'Atendimento ao Aluno', 'Apoio de Ensino', 'Orientação', 'Extracurricular', 'Pesquisa', 'Extensão', 'Gestão', 'Comissões'];

		//Criação da variável opções
		function gerarLista() {
			opcoes = '<option selected value=""> </option>';
			for (var k = 0; k < nome.length; k++)
			  	opcoes += '<option value="' + nome[k] + '">' + nome[k] + '</option>';
		}

		// Cria as opções nos campos
		function criarOpcoes() {
			gerarLista();

			for (var k = 1; k <= qtdCampos; k++)
				$('#campo' + k).append(opcoes);
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

			var info = "<?= $_COOKIE['campoTexto1']; ?>"; $("#campoTexto1").val(info);
			var info = "<?= $_COOKIE['campoTexto2']; ?>"; $("#campoTexto2").val(info);
			var info = "<?= $_COOKIE['campoTexto3']; ?>"; $("#campoTexto3").val(info);
			var info = "<?= $_COOKIE['campoTexto4']; ?>"; $("#campoTexto4").val(info);
			var info = "<?= $_COOKIE['campoTexto5']; ?>"; $("#campoTexto5").val(info);
			
        });
	</script>
</html>