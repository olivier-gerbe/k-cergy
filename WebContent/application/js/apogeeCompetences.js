/* =======================================================
	Copyright 2015 - ePortfolium - Licensed under the
	Educational Community License, Version 2.0 (the "License"); you may
	not use this file except in compliance with the License. You may
	obtain a copy of the License at

	http://opensource.org/licenses/ECL-2.0

	Unless required by applicable law or agreed to in writing,
	software distributed under the License is distributed on an "AS IS"
	BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
	or implied. See the License for the specific language governing
	permissions and limitations under the License.
   ======================================================= */

var tableCompetences = {};
var tableModules = {};

//==================================
function processApogeeCompetences()
//==================================
{
	var ppn_code = $("#model_code").val();
	var file_code = $("#file_code").val();
	var username = $("#username").val();
	if (ppn_code=="")
		ppn_code = g_json.ppn;
	$("#log").append("<p>PPN : "+ppn_code+"</p>");
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/code/"+ppn_code,
		success : function(data) {
			var portfolioid = $("portfolio",data).attr("id");
			//-------------portfolio référentiel ----------------------
			$.ajax({
				type : "GET",
				dataType : "xml",
				url : "../../../"+serverBCK+"/portfolios/portfolio/"+portfolioid+"?resources=true",
				success : function(data) {
					UICom.parseStructure(data);
					var activities = $("asmUnit:has(metadata[semantictag='activite'])",data);
					for ( var i = 0; i < activities.length; i++) {
						var uuid = $(activities[i]).attr('id');
						var code = UICom.structure["ui"][uuid].getCode();
						tableCompetences[code] = new Array();
						tableModules[code] = new Array();
						tableModules[code][0] = "0";
						var competences = $("asmUnitStructure:has(metadata[semantictag='competence-metier'])",activities[i]);
						for ( var j = 0; j < competences.length; j++) {
							var uuid = $(competences[j]).attr('id');
							tableCompetences[code][j] = UICom.structure["ui"][uuid].getCode();
						}
						var modules = $("asmContext:has(metadata[semantictag='module-groupe'])",activities[i]);
						for ( var j = 0; j < modules.length; j++) {
							var uuid = $(modules[j]).attr('id');
							tableModules[code][j+1] = [UICom.structure["ui"][uuid].getCode(),0];
						}
					}
					//----------------------------------
					if (username!="")
						traiterEtudiant(username);
					else {
						for (var i=0; i<g_json.lines.length; i++) {
							traiterEtudiant(g_json.lines[i].username);
						}
					}
					//-----------------------------------
				}
			});
		}
	});

}


//==================================
function traiterEtudiant(username)
//==================================
{
	$("#log").append("<p>Étudiant : "+username+"</p>");
	var urlS = "../../../"+serverBCK+"/apogee/notes/"+username;
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : urlS,
		success : function(data) {
			g_xmlDoc = data;
			var resultats = $("resultat:has(CodNel:contains('MATI'))",data);
			for ( var k = 0; k < resultats.length; k++) {
				var codElp = $("CodElp",resultats[k]).text();
				var notElp = $("NotElp",resultats[k]).text();											
				for ( var l in tableModules) {
					for ( var m = 0; m < tableModules[l].length; m++) {
						if (codElp == tableModules[l][m][0]){
							tableModules[l][m][1] = notElp;
							break;
						}
					}								
				}								
			}
			//---- calcul des moyennes
			for ( var i in tableModules) {
				var sum = 0;
				for ( var j = 1; j < tableModules[i].length; j++) {
					sum += parseFloat(tableModules[i][j][1]);
				}
				tableModules[i][0] = sum/tableModules[i].length;
			}
			//--------------------------
			majCompetences(username);
		}
	 });

}

//==================================
function majCompetences(username)
//==================================
{
	// ---- get portfolio
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/code/"+username+"IUT2-portfolio",
		success : function(data) {
			var portfolioid = $("portfolio",data).attr("id");
			//-------------portfolio de l'étudiant ----------------------
			$.ajax({
				type : "GET",
				dataType : "xml",
				url : "../../../"+serverBCK+"/portfolios/portfolio/"+portfolioid+"?resources=true",
				success : function(data) {
					UICom.parseStructure(data);				
					var diplomas = $("asmUnit:has(metadata[semantictag='diploma-unit IUT2'])",data);
					var comps_IUT2s = $("asmUnitStructure:has(metadata[semantictag='comps-IUT2'])",diplomas[0]); // premier diplôme IUT2
					var activi_parents = $("asmUnitStructure:has(metadata[semantictag='activi-parent'])",comps_IUT2s[1]);
					for ( var i = 0; i < activi_parents.length; i++) {
						var uuidActivity = $($("asmContext:has(metadata[semantictag='activite'])",activi_parents[i])[0]).attr('id');
						var code = UICom.structure["ui"][uuidActivity].resource.getValue();
						if (tableModules[code]==undefined)
							alert(code+" inexistant dans le référentiel");
						else if (tableModules[code][0] >= 10) {
							//alert(code+" - "+tableModules[code][0]);
							var eval_iut2s = $("asmContext:has(metadata[semantictag='eval-iut2'])",activi_parents[i]);
							for ( var j = 0; j < eval_iut2s.length; j++) {
								var uuideval = $(eval_iut2s[j]).attr('id');
								// mise à jour et sauvegarde
								$(UICom.structure["ui"][uuideval].resource.value_node).text("Y2");
								UICom.structure["ui"][uuideval].resource.save();
							}
						}
					}
				}
			});
		}
	});
}



