<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Estabelece os cookies
setcookie("nome", $_POST['nome'], time() + (86400 * 30), "/");
setcookie("siape", $_POST['siape'], time() + (86400 * 30), "/");
setcookie("curso", $_POST['curso'], time() + (86400 * 30), "/");
setcookie("campus", $_POST['campus'], time() + (86400 * 30), "/");
setcookie("telefone", $_POST['telefone'], time() + (86400 * 30), "/");
setcookie("email", $_POST['email'], time() + (86400 * 30), "/");
setcookie("vinculo", $_POST['vinculo'], time() + (86400 * 30), "/");
setcookie("regime", $_POST['regime'], time() + (86400 * 30), "/");

require_once('../vendor/autoload.php');

// Cabeçalho
$html .= '
    	<div class="container" id="rit">

    		<h3><img src="../imagens/brasao.png" width="70"></h3>
    		<h3>MINISTÉRIO DA EDUCAÇÃO</h3>
    		<h3>SECRETARIA DE EDUCAÇÃO PROFISSIONAL E TECNOLÓGICA INSTITUTO FEDERAL DE EDUCAÇÃO CIÊNCIA E TECNOLOGIA DO CEARÁ</h3>
    		<h3>PLANO DE TRABALHO DOCENTE (PIT)</h3>
	    	

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

			<br><hr/><br>';

// Corpo
$html .= '
			<h2>ATIVIDADES DOCENTES</h2>
			<h3>ATIVIDADES DE ENSINO</h3>

			<h4>Aulas em FIC, Técnico, Especialização Técnica, Graduação e Pós-graduação</h4> <!-- PARTE 1 -->
			<table>
		        <tr>
		          <th class="opcoes">Cursos Técnico e/ou Licenciaturas, com base na lei 11.892 de 29 de dezembro de 2008</th>
		          <th class="quant"> ' . $_POST['t1'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Cursos de Especialização Técnica, Graduação, Graduação Tecnológica, Graduação Licenciatura e Pós-Graduação lato sensu</th>
		          <th class="quant"> ' . $_POST['t2'] . ' </th>
		        </tr>
				<tr>
				<th class="opcoes">Cursos FIC (Observar o Art.7, §4º regulamentação da carga horária)</th>
				<th class="quant"> ' . $_POST['t3'] . ' </th>
			  </tr>
	        </table>
	        
	        <h4>ATIVIDADES DE MANUTENÇÃO AO ENSINO (até 18 horas)</h4> <!-- PARTE 2 -->
			<table>
		        <tr>
		          <th class="opcoes">Preparação + Planejamento</th>
		          <th class="quant"> ' . $_POST['t4'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Atendimento a Estudantes</th>
		          <th class="quant"> ' . $_POST['t5'] . ' </th>
		        </tr>
		    
	        </table>
	        
	        <h4>ATIVIDADES DE APOIO AO ENSINO (2 horas)</h4> <!-- PARTE 3 -->
			<table>
		        <tr>
		          <th class="opcoes">Orientação de TCC de graduação</th>
		          <th class="quant"> ' . $_POST['t7'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Orientação de Estágio Supervisionado (Supervisor/Orientador)</th>
		          <th class="quant"> ' . $_POST['t8'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Orientação de Estágio Supervisionado (curso com regulamentação diferenciada em Conselho de Classe Profissional)</th>
		          <th class="quant"> ' . $_POST['t9'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Monitoria</th>
		          <th class="quant"> ' . $_POST['t10'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Programa Institucional de Bolsas de Iniciação à Docência (PIBID) ou outro programa voltado a permanência e ao êxito estudantis</th>
		          <th class="quant"> ' . $_POST['t11'] . ' </th>
		        </tr>		       
	        </table>


			<h4>ATIVIDADES DE ENSINO EXTRACURRICULAR (até 25% do regime de trabalho)</h4> <!-- PARTE 3 -->
			<table>
		        <tr>
		          <th class="opcoes">Responsável por Laboratório</th>
		          <th class="quant"> ' . $_POST['t12'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Projetos ou atividades complementares de ensino extracurriculares</th>
		          <th class="quant"> ' . $_POST['t13'] . ' </th>
		        </tr>     
	        </table>
	        
	        <h3>ATIVIDADES DE PESQUISA</h3>

	        <h4>Projetos de Pesquisa</h4> <!-- PARTE 4 -->
			<table>
				<tr>
				<th class="opcoes">Coordenação de projeto de pesquisa aplicada, desenvolvimento ou inovação cadastrado na PRPI com fomento IFCE ou sem recursos</th>
				<th class="quant"> ' . $_POST['t14'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Coordenação de projeto de pesquisa aplicada, desenvolvimento ou inovação cadastrado na PRPI com captação de recursos externos ao IFCE de agências oficiais de fomento e fundações de apoio a pesquisa</th>
				<th class="quant"> ' . $_POST['t15'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Participação na equipe de projeto de pesquisa aplicada, desenvolvimento ou inovação, cadastrado na PRPI</th>
				<th class="quant"> ' . $_POST['t16'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Orientação ou coorientação em cursos de especialização, mestrado ou doutorado, no IFCE ou em outra instituição de ensino superior com anuência do IFCE</th>
				<th class="quant"> ' . $_POST['t17'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Bolsista produtividade do IFCE ou agências oficiais de fomento</th>
				<th class="quant"> ' . $_POST['t18'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Participação em programa de pós-graduação, em nível de mestrado ou doutorado, como docente COLABORADOR (do IFCE ou outra IES com anuência do IFCE)</th>
				<th class="quant"> ' . $_POST['t19'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Participação em programa de pós-graduação, em nível de mestrado ou doutorado, como docente PERMANENTE (do IFCE ou outra IES com anuência do IFCE)</th>
				<th class="quant"> ' . $_POST['t20'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Coordenação ou participação em equipe de projeto de pesquisa aplicada, desenvolvimento ou inovação cadastrado na PRPI com fomento externo proveniente de parcerias ou convênios com empresas privadas</th>
				<th class="quant"> ' . $_POST['t47'] . ' </th>
				<tr>
				<th class="opcoes">Líder de Grupo de Pesquisa devidamente homologado pela PRPI</th>
				<th class="quant"> ' . $_POST['t48'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Exercício da função de Editor(a)-chefe em periódico científico do IFCE</th>
				<th class="quant"> ' . $_POST['t49'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Revisor de Periódicos ou Eventos Científicos</th>
				<th class="quant"> ' . $_POST['t50'] . ' </th>
				</tr>
				<tr>
				<th class="opcoes">Coordenação de comitê de ética em pesquisa do IFCE</th>
				<th class="quant"> ' . $_POST['t51'] . ' </th>
				</tr>
				</tr>
				<tr>
				<th class="opcoes">Participação como membro relator de comitê de ética em pesquisa do IFCE</th>
				<th class="quant"> ' . $_POST['t52'] . ' </th>
				</tr>
				</tr>
	        </table>
	        
	        <h4>Produção Científica</h4> <!-- PARTE 5 -->
			<table>
		        <tr>
		          <th class="opcoes">Artigos em Periódicos</th>
		          <th class="quant"> ' . $_POST['t22'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Artigos em Anais de Eventos</th>
		          <th class="quant"> ' . $_POST['t23'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Capítulos de Livros</th>
		          <th class="quant"> ' . $_POST['t24'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Livros</th>
		          <th class="quant"> ' . $_POST['t25'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Participação em Congressos e Eventos</th>
		          <th class="quant"> ' . $_POST['t26'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Orientação de Pesquisa (Iniciação Científica)</th>
		          <th class="quant"> ' . $_POST['t27'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Orientação de Pesquisa (Mestrado)</th>
		          <th class="quant"> ' . $_POST['t28'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Orientação de Pesquisa (Doutorado)</th>
		          <th class="quant"> ' . $_POST['t29'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Outras Atividades de Pesquisa</th>
		          <th class="quant"> ' . $_POST['t30'] . ' </th>
		        </tr>
	        </table>
	        
	        <h3>ATIVIDADES DE EXTENSÃO</h3>

	        <h4>Projetos de Extensão</h4> <!-- PARTE 6 -->
			<table>
		        <tr>
		          <th class="opcoes">Coordenação de Projeto de Extensão</th>
		          <th class="quant"> ' . $_POST['t21'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Participação em Projeto de Extensão</th>
		          <th class="quant"> ' . $_POST['t22'] . ' </th>
		        </tr>
	        </table>
	        
	        <h4>Produção Técnica e Cultural</h4> <!-- PARTE 7 -->
			<table>
		        <tr>
		          <th class="opcoes">Desenvolvimento de Material Didático e/ou Instrucional</th>
		          <th class="quant"> ' . $_POST['t23'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Produção de Recursos Educacionais Abertos (REA)</th>
		          <th class="quant"> ' . $_POST['t24'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Desenvolvimento de Software Educacional</th>
		          <th class="quant"> ' . $_POST['t25'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Desenvolvimento de Aplicativos</th>
		          <th class="quant"> ' . $_POST['t26'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Elaboração de Projetos de Extensão</th>
		          <th class="quant"> ' . $_POST['t27'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Participação em Eventos de Extensão</th>
		          <th class="quant"> ' . $_POST['t28'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Outras Atividades de Extensão</th>
		          <th class="quant"> ' . $_POST['t29'] . ' </th>
		        </tr>
	        </table>
			<br>
			<br>
			<br>
			<br>
	        
	        <h3>ATIVIDADES DE GESTÃO</h3>

	        <h4>Coordenação e Chefia</h4> <!-- PARTE 8 -->
			<table>
		        <tr>
		          <th class="opcoes">Coordenador de Curso</th>
		          <th class="quant"> ' . $_POST['t30'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Coordenador de Setor</th>
		          <th class="quant"> ' . $_POST['t31'] . ' </th>
		        </tr>
				<tr>
					<th class="opcoes">Chefe de Departamento</th>
					<th class="quant"> ' . $_POST['t32'] . ' </th>
				</tr>
				<tr>
					<th class="opcoes">Diretores de Área/Setor</th>
					<th class="quant"> ' . $_POST['t33'] . ' </th>
				</tr>
				<tr>
					<th class="opcoes">Assessor da Reitoria</th>
					<th class="quant"> ' . $_POST['t34'] . ' </th>
				</tr>
				<tr>
					<th class="opcoes">Coordenador de Implantação de Campus</th>
					<th class="quant"> ' . $_POST['t35'] . ' </th>
				</tr>
				<tr>
					<th class="opcoes">Assistente de Pró-Reitoria ou Chefe de Gabinete de Campus</th>
					<th class="quant"> ' . $_POST['t36'] . ' </th>
				</tr>
				<tr>
					<th class="opcoes">Coordenador de programa institucional: ensino, pesquisa aplicada ou extensão</th>
					<th class="quant"> ' . $_POST['t37'] . ' </th>
				</tr>
	        </table>';

$html .= '
			<h4>Atividades em Comissões ou de Fiscalização</h4> <!-- PARTE 9 -->
			<table class="table table-striped">
		        <tr>
		          <th class="opcoes">Conselhos, comissões ou comitês permanentes institucionais</th>
		          <th class="quant"> ' . $_POST['t38'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Comissão Própria de Avaliação e Comissão Permanente de Pessoal Docente (Central)</th>
		          <th class="quant"> ' . $_POST['t39'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Comissão Própria de Avaliação e Comissão Permanente de Pessoal Docente (Local)</th>
		          <th class="quant"> ' . $_POST['t40'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Conselhos ou comitês permanentes externos</th>
		          <th class="quant"> ' . $_POST['t41'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Colegiado de Cursos</th>
		          <th class="quant"> ' . $_POST['t42'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Núcleo Docente Estruturante (NDE)</th>
		          <th class="quant"> ' . $_POST['t43'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Comissão de Processo Administrativo Disciplinar</th>
		          <th class="quant"> ' . $_POST['t44'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Participação em Direção Sindical como titular</th>
		          <th class="quant"> ' . $_POST['t45'] . ' </th>
		        </tr>
		        <tr>
		          <th class="opcoes">Fiscalização de contrato</th>
		          <th class="quant"> ' . $_POST['t46'] . ' </th>
		        </tr>
		    </table>	

		    <!-- Total -->
		    <table class="table table-striped">
		        <tr>
			        <th class="totalCSS"><h3>Total</h3></th>
			        <th class="quant"> <textfield> ' . $_POST['total'] . ' </textfield> </th>
		        </tr>
		    </table> 	
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>';
$html .= '
    		<h2>DISTRIBUIÇÃO DE CARGA <br>HORÁRIA DO DOCENTE NO SEMESTRE</h2>
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
            </table> ';




/* Rodapé
$html .= '
		<br><br><hr/><br><br>
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
	</div>
';

*/



ob_clean(); //Limpa o buffer de saída 

$mpdf = new \Mpdf\Mpdf(['tempDir' => '../vendor/mpdf/mpdf/tmp/mpdf']);
$mpdf = new \Mpdf\Mpdf();
$mpdf->SetDisplayMode('fullpage');

$css = file_get_contents("../css/Relatorio.css");
$mpdf->WriteHTML($css, 1);

$mpdf->WriteHTML($html);
$mpdf->Output('relatorioPIT.pdf', 'I'); //'D'

exit;

?>
