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
	</head>

	<body>
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
	          <a href="../index.php" class="navbar-brand"><span class="logo">IFCE</span></a>
	        </div>   
	        <div class="collapse navbar-collapse" id="barra-navegacao">
	          <ul class="nav navbar-nav navbar-right">
	          	<li> <a href="../index.php">INÍCIO</a> </li>
	            <li> <a href="../PIT/orientacoesPIT.php">PIT</a> </li>
	            <li> <a href="../RIT/orientacoesRIT.php">RIT</a> </li>
	            <li> <a href="#" data-toggle="modal" data-target="#janelaAjuda">AJUDA</a> </li>
	          </ul>
	        </div>      

	      </div>
	    </nav>

	    <?php require_once('../ajuda.php') ?>

	    <br><br><br><br><br>

		<div class="container">
			<h2>Orientações para preenchimento do Plano de Trabalho Docente (PIT):</h2>
			
			<h4 class="texto">1. A carga horária (C.H.) deve ser contabilizada em horas de 60minutos;</h4>
			<h4 class="texto">2. A C.H deve constar o subtotal de horas obtidas para cada atividade registrada de acordo com o obtido na Tabela de Carga Horária docente;</h4>
			<h4 class="texto">3. Com exceção da carga horária de ensino dedicada a aulas (que serão acompanhadas através do sistema Acadêmico), todas as demais atividades deverão ser comprovadas através de documentos anexados a este PIT;</h4>
			<h4 class="texto">4. O PIT deve ser entregue às Direções ou Departamentos de Ensino em até trinta dias antes do início da elaboração dos calendários para o semestre subsequente;</h4>
			<h4 class="texto">5. No caso de não apresentação do PIT no prazo, subentende-se que o docente realiza exclusivamente atividades de ensino no IFCE;</h4>
			<h4 class="texto">6. As atividades de apoio ao ensino serão fixas em 2 (duas) horas já preenchidas no PIT;</h4>
			<h4 class="texto">7. Os projetos de pesquisa aplicada ou extensão deverão contemplar: contendo título de cada projeto a ser desenvolvido e, ainda, horário, carga horária, resumo da descrição de cada atividade do projeto, participantes, cronograma e resultados esperados, anexados na forma de documentos comprobatórios a este PIT;</h4>
			<h4 class="texto">8. O PIT deve ser preenchido respeitando os critérios estabelecidos na Resolução de Carga Horária Docente do IFCE.</h4>

			<br>
			<center><a href="pit.php" class="btn btn-success botao">Preencher Relatório</a></center>
			<br><br><br>
		</div> <!-- Fim Container -->

		<!-- ------------------- Rodapé ------------------- -->
	      <footer class="rodape">
	        <div class="container">
	          <div class="row">
	            <h5>DEPPI - Departamento de Extensão, Pesquisa, Pós-Graduação e Inovação</h5>
	          </div>
	        </div>
	      </footer>
	</body>
</html>