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
			<h2>Orientações para preenchimento do Relatório de Atividades Docentes (RIT)</h2>

			<h4 class="texto">1. A carga horária (C.H.) deve ser contabilizada em horas de 60 minutos.</h4>
			<h4 class="texto">2. A C.H deve constar o subtotal de horas obtidas para cada atividade registrada de acordo com o obtido na Tabela de Carga Horária docente.</h4>
			<h4 class="texto">3. Com exceção da carga horária de ensino dedicada a aulas (que serão acompanhadas através do sistema Acadêmico).</h4>
			<h4 class="texto">4. O RIT deve ser entregue às Direções ou Departamentos de Ensino em até 30 (trinta) dias após o final do semestre letivo anterior.</h4>
			<h4 class="texto">5. No caso de não apresentação do RIT no prazo, subentende-se que o docente realizou exclusivamente atividades de ensino no IFCE.</h4>
			<h4 class="texto">6. O RIT deve ser preenchido respeitando os critérios estabelecidos na Resolução de Carga Horária Docente do IFCE.</h4>

			<br>
			<center><a href="rit.php" class="btn btn-success botao">Preencher Relatório</a></center>
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