<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Carga Horária Docente</title>

    <link rel="icon" href="favicon.ico">
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/estilo.css" rel="stylesheet">
    <link href="css/BodyIndex.css" rel="stylesheet">

    <script type="text/javascript" src="../js/jquery-3.3.1.js"></script>
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
          <a href="index.php" class="navbar-brand"><span class="logo">IFCE</span></a>
        </div>

        <div class="collapse navbar-collapse" id="barra-navegacao">
          <ul class="nav navbar-nav navbar-right">
            <li> <a href="#" data-toggle="modal" data-target="#janelaAjuda">AJUDA</a> </li>
          </ul>
        </div>   

      </div>
    </nav>

    <?php require_once('ajuda.php') ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
      $(document).ready(function(){
        $("a").on('click', function(event) {
          if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 800, function(){
        
            window.location.hash = hash;
            });
          } // End if
        });
      });

      $('.scrollSuave').click(function() {
        $('.navbar-collapse').collapse('hide');
      });
    </script>

    <!-- ------------------- Início ------------------- -->
    <div class="container capa" id="inicio">
      <div class="row">
        <div class="col-sm-8">
          <div class="titulo">
            Carga Horária Docente
          </div>
          <div  style="text-align: center;">
            <a href="PIT/orientacoesPIT.php" class="btn btn-success botao">Plano de Trabalho Docente</a>
            <a href="RIT/orientacoesRIT.php" class="btn btn-success botao">Relatório Individual de Trabalho</a>
          </div>
        </div>
      	
      </div>
    </div>

    
      <!-- ------------------- Rodapé ------------------- -->
      <footer class="rodape">
        <div class="container">
          <div class="row">
            <h5>DEPPI - Departamento de Extensão, Pesquisa, Pós-Graduação e Inovação</h5>
          </div>
        </div>
      </footer>

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
      <script src="bootstrap/js/bootstrap.min.js"></script>
  </body>
</html>
