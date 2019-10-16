/* =======================================================
	Copyright 2014 - ePortfolium - Licensed under the
	Educational Community License, Version 2.0 (the "License"); you may
	not use this file except in compliance with the License. You may
	obtain a copy of the License at

	http://www.osedu.org/licenses/ECL-2.0

	Unless required by applicable law or agreed to in writing,
	software distributed under the License is distributed on an "AS IS"
	BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
	or implied. See the License for the specific language governing
	permissions and limitations under the License.
   ======================================================= */
var scedu_text = new Array();
scedu_text['en'] = new Array();
scedu_text['fr'] = new Array();
//-------------------------
scedu_text['fr']['competence-statement'] = "Énoncé de la compétence";
scedu_text['en']['competence-statement'] = "Statement of the competence";
scedu_text['fr']['component-evidence'] = "Composante et exemples de manifestations";
scedu_text['en']['component-evidence'] = "Component and examples of observable evidence";
scedu_text['fr']['goto-component'] = "Allez à la page de la composante";
scedu_text['en']['goto-component'] = "Go to the page of the component";

//=============================================
function scedu_autoevaluation(root)
//=============================================
{
	var html = "";
	var competencies = $("asmStructure:has(metadata[semantictag*='competence-structure'])",root);
	for ( var i = 0; i < competencies.length; i++) {
		var competencyid = $(competencies[i]).attr('id');
		var competency_texteid = $("*:has(metadata[semantictag*='competence-texte'])",competencies[i]).attr('id');
		var competency_texte = UICom.structure["ui"][competency_texteid].resource.getView();
		if (i%2==0)
			html += "<div class='row'>";
		html += "<div class='span4'>";
		html += "<div class='rounded-border'>";
		html += "	<label class='synthese-competence-label'>";
		html +=  " <a href='#'  data-toggle='popover' title='"+scedu_text[LANG]['competence-statement']+"' class='popinfo' data-content=\""+competency_texte+"\"><i class='icon-info-sign'></i></a> ";
		html += UICom.structure["ui"][competencyid].getLabel(null,'span');
		html += "	</label>";
		html += "</div>";
		var composantes = $("asmUnit:has(metadata[semantictag*='composante-unit'])",competencies[i]);
		for ( var j = 0; j < composantes.length; j++) {
			var composanteid = $(composantes[j]).attr('id');
			var composante_texteid = $("asmContext:has(metadata[semantictag*='composante-ref'])",composantes[j]).attr('id');
			var composante_texte = UICom.structure["ui"][composante_texteid].resource.getView()+"<hr>";
			var manifestations = $("asmContext:has(metadata[semantictag*='manifestation-exemple'])",composantes[j]);
			for (var k=0; k<manifestations.length;k++){
				var manifestationid = $(manifestations[k]).attr('id');
				composante_texte += "<p>"+UICom.structure["ui"][manifestationid].resource.getView()+"</p>";
			}
			html += "<table id='"+composanteid+"'>";			
			html += "	<tr   class='manifestation'>";			
			html += "		<td class='composante'>";
			html += "			<div id='"+composanteid+"-composante' style='display:none' semantictag='composante-ref'>";
			html += "				<span style='display:none' name='value'>";
			html += UICom.structure["ui"][composanteid].getLabel(null,'span');
			html += "				</span>";
			html += "			</div>";
			html +=  " 			<a href='#'  data-toggle='popover' data-container='body' placement='bottom' title='"+scedu_text[LANG]['component-evidence']+"' class='popinfo' data-content=\""+composante_texte+"\"><i class='icon-info-sign'></i></a> ";
			html += "			<a id='showpage-"+composanteid+"' onClick=\"javascript:displayPage('"+composanteid+"',100,'standard','0',true)\" href='#' title='"+scedu_text[LANG]['goto-component']+"'>";
			html += "				<span >";
			html += UICom.structure["ui"][composanteid].getLabel(null,'span');
			html += "				</span>";
			html += "			</a>";
			html += "</td>";
			var autoevaluations = $("asmUnitStructure:has(metadata[semantictag*='autoevaluation'])",composantes[j]);
			html += "<td class='evaluations'>";
			var evaluation_node = $("asmUnitStructure:has(value:contains('E1@'))",autoevaluations);
			var valueid = $("asmContext:has(metadata[semantictag*='atteinte'])",evaluation_node).attr('id');
			var value = UICom.structure["ui"][valueid].resource.getView();
			html += value+"</td>";
			html += "<td class='evaluations'>";
			evaluation_node = $("asmUnitStructure:has(value:contains('E2@'))",autoevaluations);
			valueid = $("asmContext:has(metadata[semantictag*='atteinte'])",evaluation_node).attr('id');
			value = UICom.structure["ui"][valueid].resource.getView();
			html += value+"</td>";
			html += "<td class='evaluations'>";
			evaluation_node = $("asmUnitStructure:has(value:contains('E3@'))",autoevaluations);
			valueid = $("asmContext:has(metadata[semantictag*='atteinte'])",evaluation_node).attr('id');
			value = UICom.structure["ui"][valueid].resource.getView();
			html += value+"</td>";
			html += "<td class='plan-action'>";
			html += "</td>";
			html += "</tr>";
			html += "</table>";
		}
		html += "</div> <!--class='span5'-->";
		if (i%2==1)
			html += "</div> <!--class='row'-->";
	}
	return html;
}