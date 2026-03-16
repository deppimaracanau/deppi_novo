<?php
  
  // Estabelece os cookies
  setcookie("nome", $_POST['nome'], time() + (86400 * 30), "/");
  setcookie("siape", $_POST['siape'], time() + (86400 * 30), "/");
  setcookie("curso", $_POST['curso'], time() + (86400 * 30), "/");
  setcookie("campus", $_POST['campus'], time() + (86400 * 30), "/");
  setcookie("telefone", $_POST['telefone'], time() + (86400 * 30), "/");
  setcookie("email", $_POST['email'], time() + (86400 * 30), "/");
  setcookie("vinculo", $_POST['vinculo'], time() + (86400 * 30), "/");
  setcookie("regime", $_POST['regime'], time() + (86400 * 30), "/");

  setcookie("campoTexto1", $_POST['campoTexto1'], time() + (86400 * 30), "/");
  setcookie("campoTexto2", $_POST['campoTexto2'], time() + (86400 * 30), "/");
  setcookie("campoTexto3", $_POST['campoTexto3'], time() + (86400 * 30), "/");
  setcookie("campoTexto4", $_POST['campoTexto4'], time() + (86400 * 30), "/");
  setcookie("campoTexto5", $_POST['campoTexto5'], time() + (86400 * 30), "/");

  setcookie("campo1", $_POST['campo1'], time() + (86400 * 30), "/");


  require_once ('../vendor/autoload.php');
  

    $html .= '
    	<div class="container" id="rit">

    		<h3><img src="../imagens/brasao.png" width="70"></h3>
    		<h3>MINISTÉRIO DA EDUCAÇÃO</h3>
    		<h3>SECRETARIA DE EDUCAÇÃO PROFISSIONAL E TECNOLÓGICA INSTITUTO FEDERAL DE EDUCAÇÃO CIÊNCIA E TECNOLOGIA DO CEARÁ</h3>
    		<h3>RELATÓRIO INDIVIDUAL DE TRABALHO (RIT)</h3>
	    	

			<br><hr/><br>

			<table class="tabelaDados">
	    		<tr>
	    			<th>Referente ao Semestre Letivo: </tr>
	    			<th class="celula2">' . $_POST['semestre'] . '</tr>
	    		</tr>
	    	</table>

	    	<h3 class= "page-header">IDENTIFICAÇÃO DO SERVIDOR</h3>

			<table class="tabelaDados">
	    		<tr>
	    			<th class="celula1">Nome: </tr>
	    			<th class="celula2">' . $_POST['nome'] . '</tr>
	    			<th class="celula1">Matrícula: </tr>
	    			<th class="celula2">' . $_POST['siape'] . '</tr>
	    		</tr>
	    		
	    		<tr>
	    			<th class="celula1">Curso: </tr>
	    			<th class="celula2">' . $_POST['curso'] . '</tr>
	    			<th class="celula1">Campus: </tr>
	    			<th class="celula2">' . $_POST['campus'] . '</tr>
	    		</tr>
	   
	    		<tr>
	    			<th class="celula1">Telefone: </tr>
	    			<th class="celula2">' . $_POST['telefone'] . '</tr>
	    			<th class="celula1">Email: </tr>
	    			<th class="celula2">' . $_POST['email'] . '</tr>
	    		</tr>
	    		
	    		<tr>
	    			<th class="celula1">Vínculo: </tr>
	    			<th class="celula2">' . $_POST['vinculo'] . '</tr>
	    			<th class="celula1">Regime: </tr>
	    			<th class="celula2">' . $_POST['regime'] . '</tr>
	    		</tr>
	    		
	    	</table>

			<br><hr/><br>
	';

    $html .= '
			<h3 class= "page-header">ATIVIDADES DOCENTES DESENVOLVIDAS NO SEMESTRE LETIVO</h3>
			<h4>ATIVIDADES DE ENSINO</h4>
			<p class="descricao">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Listar disciplinas ministradas, orientações de alunos concluídas no decorrer do semestre ou em andamento, horários disponibilizados para o atendimento ao aluno, e demais atividades de ensino descritas no Plano de Trabalho Docente.</p>
			<fieldset class="caixaRelatorio">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . $_POST['campoTexto1'] . '</fieldset>

			<h4>ATIVIDADES DE PESQUISA APLICADA</h4>
			<p class="descricao">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Relatar o andamento dos projetos e demais atividades de pesquisa aplicada listadas no Plano de Trabalho Docente. No caso de projetos, indicar o cronograma de execução (prazos atuais) e as atividades desenvolvidas no decorrer do semestre.</p>
			<fieldset class="caixaRelatorio">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . $_POST['campoTexto2'] . '</fieldset>

			<br><br>

			<h4>ATIVIDADES DE EXTENSÃO</h4>
			<p class="descricao">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Relatar o andamento dos projetos e demais atividades de extensão listadas no Plano de Trabalho Docente. No caso de projetos ou programas, indicar o cronograma de execução (prazos atuais) e as atividades desenvolvidas no decorrer do semestre.</p>
			<fieldset class="caixaRelatorio">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . $_POST['campoTexto3'] . '</fieldset>

			<h4>ATIVIDADES DE GESTÃO</h4>
			<p class="descricao">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Descrever as principais atividades desenvolvidas na gestão institucional do IFCE de acordo com a função; ou atividades em comissões/fiscalizações realizadas no decorrer do semestre de acordo com o Plano de Trabalho Docente.</p>
			<fieldset class="caixaRelatorio">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . $_POST['campoTexto4'] . '</fieldset>

			<br><br>

			<h4>ATIVIDADES DE CAPACITAÇÃO</h4>
			<p class="descricao">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Descrever o andamento das atividades de capacitação realizada e seu cronograma atual.</p>
			<fieldset class="caixaRelatorio">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . $_POST['campoTexto5'] . '</fieldset>
		</div>

		<br><br>
	';

	$html .= '
		<h2>DISTRIBUIÇÃO DE CARGA HORÁRIA DO DOCENTE <br> NO SEMESTRE ANTERIOR</h2>
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
            <th rowspan="4" style="width:70px">Manhã</th>
            <th>A</th>
            <th class="celulaQuadro"> ' . $_POST['campo1'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo2'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo3'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo4'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo5'] . '  </th>
          </tr>
          <tr>  
            <th>B</th>
            <th class="celulaQuadro"> ' . $_POST['campo6'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo7'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo8'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo9'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo10'] . '  </th>
          </tr>
          <tr>
            <th>C</th>
            <th class="celulaQuadro"> ' . $_POST['campo11'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo12'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo13'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo14'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo15'] . ' </th>
          </tr>
          <tr>
            <th>D</th>
            <th class="celulaQuadro"> ' . $_POST['campo16'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo17'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo18'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo19'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo20'] . ' </th>
          </tr>
          <tr><th></th><th></th><th></th><th></th><th></th><th></th>
            </tr>
          <tr>
            <th rowspan="4" style="width:70px">Tarde</th>
            <th>A</th>
            <th class="celulaQuadro"> ' . $_POST['campo21'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo22'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo23'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo24'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo25'] . '  </th>
          </tr>
          <tr>  
            <th>B</th>
            <th class="celulaQuadro"> ' . $_POST['campo26'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo27'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo28'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo29'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo30'] . '  </th>
          </tr>
          <tr>
            <th>C</th>
            <th class="celulaQuadro"> ' . $_POST['campo31'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo32'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo33'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo34'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo35'] . ' </th>
          </tr>
          <tr>
            <th>D</th>
            <th class="celulaQuadro"> ' . $_POST['campo36'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo37'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo38'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo39'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo40'] . ' </th>
          </tr>
          <tr><th></th><th></th><th></th><th></th><th></th><th></th>
            </tr>
          <tr>
            <th rowspan="4" style="width:70px">Noite</th>
            <th>A</th>
            <th class="celulaQuadro"> ' . $_POST['campo41'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo42'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo43'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo44'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo45'] . '  </th>
          </tr>
          <tr>  
            <th>B</th>
            <th class="celulaQuadro"> ' . $_POST['campo46'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo47'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo48'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo49'] . '  </th>
            <th class="celulaQuadro"> ' . $_POST['campo50'] . '  </th>
          </tr>
          <tr>
            <th>C</th>
            <th class="celulaQuadro"> ' . $_POST['campo51'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo52'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo53'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo54'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo55'] . ' </th>
          </tr>
          <tr>
            <th>D</th>
            <th class="celulaQuadro"> ' . $_POST['campo56'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo57'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo58'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo59'] . ' </th>
            <th class="celulaQuadro"> ' . $_POST['campo60'] . ' </th>
          </tr>
        </table>
	';

  /*
	$html .= '
    <br><br><hr/><br><br><br>

		<fieldset class="caixa1">
			<h4>Parecer da Coordenação:</h4>
		</fieldset>

		<br><br>

		<fieldset class="caixa2">
			<h4>Professor (a)</h4>
		</fieldset>

		<fieldset class="caixa2">
			<h4>Coord. de Curso</h4>
		</fieldset>

		<fieldset class="caixa2">
			<h4>Chefe de Depto./ Diretor de Ensino</h4>
		</fieldset>

		<br><br><br>

		<h5>_________________________________, _________ de ________________________ de _______________</h5>
	';
  */

  ob_clean();//Limpa o buffer de saída

  $mpdf = new \Mpdf\Mpdf(['tempDir' => '../vendor/mpdf/mpdf/tmp/mpdf']); 
  
	$mpdf->SetDisplayMode('fullpage');

	$css = file_get_contents("../css/Relatorio.css");
	$mpdf->WriteHTML($css,1);

	$mpdf->WriteHTML($html);
	$mpdf->Output('relatorioRIT.pdf', 'I');//'D'

	exit;
	
?>
