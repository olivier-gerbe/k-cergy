//========================================================
//========================================================
//===================== ExperiencePersos =========================
//========================================================
//========================================================

var experience_persos_byid = {};
var experience_persos_list = [];

//==================================
UIFactory["ExperiencePerso"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.semantictag = $("metadata",node).attr('semantictag');
	this.contexte_nodeid = $("asmContext:has(metadata[semantictag='contexte-activite'])",node).attr('id');
	this.realizations_nodeid = $("asmContext:has(metadata[semantictag='realizations'])",node).attr('id');
	this.apport_nodeid = $("asmContext:has(metadata[semantictag='apport'])",node).attr('id');
	this.domaine_metier_nodeid = $("asmContext:has(metadata[semantictag='domaine-metier'])",node).attr('id');
	// ---------------------------------------
	this.ppn_nodeid = $("asmContext:has(metadata[semantictag*='DUT-PPN'])",node).attr('id');
	this.ref_nodeid = $("asmContext:has(metadata[semantictag*='IUT2-referentiel'])",node).attr('id');
	this.dom_nodeid = $("asmContext:has(metadata[semantictag*='domaine-comps'])",node).attr('id');
	this.dom2a_nodeid = $("asmContext:has(metadata[semantictag*='dom2a-autres'])",node).attr('id');
	this.dom2b_nodeid = $("asmContext:has(metadata[semantictag*='dom2b-autres'])",node).attr('id');
	this.dom2c_nodeid = $("asmContext:has(metadata[semantictag*='dom2c-autres'])",node).attr('id');
	// ---------------------------------------
	this.comps_metiers_node = $("metadata[semantictag*='comps-metiers']",node).parent();
	this.comps2_metiers_node = $("metadata[semantictag*='comps2-metiers']",node).parent();
	this.comps_autres_node = $("metadata[semantictag*='comps-autres']",node).parent();
	this.comps2_autres_node2a = $("metadata[semantictag*='comps2a-autres']",node).parent();
	this.comps2_autres_node2b = $("metadata[semantictag*='comps2b-autres']",node).parent();
	this.comps2_autres_node2c = $("metadata[semantictag*='comps2c-autres']",node).parent();
};

//==================================
UIFactory["ExperiencePerso"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type==null || type=='short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;"
		html += "<a href='#' onclick=\"javascript:$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"');$('#tabs_histo li:eq(4) a').tab('show')\">";
		html += "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.id].getLabel(destid+"_short_label","span")+"</span>";
		html += "</a>";
	}
	if (type=='cv') {
		html = "<div class='row experience_perso'><div class='span3'>";
		html += "</div><div class='span8'>";
		html += "<span id='"+destid+"_short_label' class='job_title'>"+UICom.structure["ui"][this.id].getView(destid+"_short_label") + "</span>";
		html += "<div>"+UICom.structure["ui"][this.contexte_nodeid].resource.getView()+"</div>";
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div></div>";
	}
	if (type=='detail') {
		html += "<div class='panel panel-default alert alert-violet alert-block' >";
		html += "<div class='panel-heading'>";
		html += "<h4 class='panel-title'>";
		//---------------------------------------------------------
		if (g_userrole=='etudiant') {
			html += "<span  class='editbutton' onclick=\"javascript: confirmDel('"+this.id+"','ExperiencePerso')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
			html += "<span  class='editbutton' onclick=\"javascript:experience_persos_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
			html += "<i class='fa fa-edit'></i>";
			html += "</span>";
		}
		html += "<span data-toggle='collapse' class='editbutton' data-parent='#"+parentid+"' href='#collapse"+this.id+"' onclick=\"toggleZoom('"+this.id+"')\">";
		html += "<i id='zoom_"+this.id+"' class='fa fa-search-plus'></i>";
		html += "</span>";
		//---------------------------------------------------------
		html += UICom.structure["ui"][this.id].getView();
		html += "</h4>";
		html += "</div>";
		html += "<div id='collapse"+this.id+"' class='panel-collapse collapse out'>";
		html += "<div class='panel-body'>";
		html += "<div class='row-fluid'>";
		html += "<div class='span6 attributs'>";
		html += "<div class='item'>Domaine métiers : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
		html += "<h6>Contexte et activité</h6>";
		html += "<div>"+UICom.structure["ui"][this.contexte_nodeid].resource.getView()+"</div>";
		html += "<h6>Principales réalisations ou activité</h6>";
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		html += "<div class='span6'>";
		//---------------------------------------
		html += "<h6>Apport de cette expérience dans mon projet personnel professionel</h6>";
		html += "<div>"+UICom.structure["ui"][this.apport_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		html += "</div><!-- row -->";
		//----------------------------------------------------------------------------------------------------
		html += "<div class='row-fluid competences-titre'>";
		//-----------------------------------------------------------------------
		view_eval_competences = new Array();
		html += "<span class='span6'><h4>Compétences liées à cette expérience</h4></span>";
		html += "</div>";
		html += "<div class='row-fluid'>";
		html += "<span class='span6'>";
		html += "<h5>Compétences métiers</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'ExperiencePerso',0);
		//---------------------------------------------
		var tableauActivitesMetierPPN = getTableauActivitesMetierPPN(this.comps_metiers_node,'activite','competence-metier');
		var tableauActivitesMetierFree = getTableauActivitesMetierFree(this.comps2_metiers_node,'dom-metier-ref','free-comp-metier');
		var tableauActivitesMetier = tableauActivitesMetierPPN.concat(tableauActivitesMetierFree);
		var tableauActivitesMetierTrie = tableauActivitesMetier.sort(sortOn1);
		html += getCompetencies3(tableauActivitesMetierTrie,false,'ExperiencePerso',this.id,destid,0);
//		html += getCompetencies2(this.comps_metiers_node,false,'ExperiencePerso',this.id,destid,'activite','competence-metier',0);
//		html += getCompetencies2(this.comps2_metiers_node,false,'ExperiencePerso',this.id,destid,'dom-metier-ref','free-comp-metier',0);
		html += getEvalTableau_end();
		//---------------------------------------------
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span6'>";
		html += "<h5>"+appStr['fr']['competencies-other']+"</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'ExperiencePerso',1);
		//---------------------------------------------
		html += getCompetencies2(this.comps_autres_node,false,'ExperiencePerso',this.id,destid,'activite','competence-trans',1);
		html += getCompetencies2(this.comps2_autres_node2a,false,'ExperiencePerso',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2b,false,'ExperiencePerso',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2c,false,'ExperiencePerso',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "</div>";
		//-----------------------------------------------------------------------
		html += getEvaluationCodes_bytypes(['','autoeval']);
		//----------------------------------------------------------------------------------------------------
		html += "</div><!-- class='panel-collapse collapse in'-->";
		html += "</div><!-- class='panel ...'-->";
	}
	var obj = $(html);
	$("#"+destid).append(obj);
	//------------------ evaluation----------------------------------------
	if ($('#scroll_'+this.id).hasVerticalScrollBar())  // si scrollbar décaler en-têtes évaluations
		$('#ethead_'+this.id).css('width','97%');
	getEvaluations_displayView(view_eval_competences);
	showHeaderEvaluationTable();
};
//==================================
UIFactory["ExperiencePerso"].prototype.displayEditor = function(destid,type,lang)
//==================================
{
	var html = "";
	$("#"+destid).html("");
	var div = $("<div class='alert alert-violet alert-block edition'></div>");
	$("#"+destid).append(div);
	html += "<a  class='btn btn-mini btn-violet editbutton' onclick=\"javascript:experience_persos_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
	html += "Quitter le mode édition";
	html += "</a>";
	$(div).append($(html));
	$(div).append($("<label id='titre_"+this.id+"' class='inline titre'>Libellé de l'expérience</label>"));
	$("#titre_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());

	var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
	$(div).append($(row));

	$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_displayEditor("formA_"+this.id,"Domaine métiers<span id='help-domaine-metier'></span>","dommet_"+this.id,this.domaine_metier_nodeid,"select");

	$("#formA_"+this.id).append($("<label class='inline'>Contexte et activité</label>"));
	UICom.structure["ui"][this.contexte_nodeid].resource.displayEditor("formA_"+this.id,'x100');
	$("#formA_"+this.id).append($("<label class='inline'>Principales réalisations ou activité</label>"));
	UICom.structure["ui"][this.realizations_nodeid].resource.displayEditor("formA_"+this.id,'x100');

	$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
	//---------------------------------------
	$("#formB_"+this.id).append($("<label class='inline'>Apport de cette expérience dans mon projet personnel professionel</label>"));
	UICom.structure["ui"][this.apport_nodeid].resource.displayEditor("formB_"+this.id,'x100');
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cette expérience","ExperiencePerso","exp-persos-detail_histo_","violet","experience_persos_byid");
	//-----------------------------------------------------------------------
	html += getEvaluationCodes_bytypes(['','autoeval']);
	//----------------------------------------------------------------------------------------------------
	$(div).append($(html));
	//------------------ evaluation----------------------------------------
	if ($('#scroll_'+this.id).hasVerticalScrollBar())  // si scrollbar décaler en-têtes évaluations
		$('#ethead_'+this.id).css('width','97%');
	getEvaluations_display(view_eval_competences,eval_competences);
	showHeaderEvaluationTable();
	//------------------ bulles d'information----------------------------------------
	UIFactory.Help.displayAll()
}
//==================================
function reload_comps(expid,destid)
//==================================
{
	UIFactory['ExperiencePerso'].reloadparse(expid,destid);
}

//==================================
UIFactory["ExperiencePerso"].reloadparseone = function(uuid,destid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='experience_perso-unit'])",data);
			experience_persos_byid[uuid] = new UIFactory["ExperiencePerso"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			experience_persos_byid[uuid].displayEditor(destid);
			if (callback!=null)
				callback(param1,param2,param3,param4);
		}
	});
};

//==================================
UIFactory["ExperiencePerso"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			UIFactory["ExperiencePerso"].parse(data);
			if (uuid!=null)
				experience_persos_byid[uuid].displayEditor(destid);
			else {
				ExperiencePersos_Display('exp-persos-short_histo','short');
				ExperiencePersos_Display('exp-persos-detail_histo','detail',parentid);
			}
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};

//==================================
UIFactory["ExperiencePerso"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		experience_persos_byid[parentid].displayEditor(destid);
	else {
		ExperiencePersos_Display('exp-persos-short_histo','short');
		ExperiencePersos_Display('exp-persos-detail_histo','detail',$("asmStructure:has(metadata[semantictag='experience_persos'])", g_portfolio_current).attr('id'));
	}
};

//==================================
UIFactory["ExperiencePerso"].parse = function(data) 
//==================================
{
	experience_persos_byid = {};
	experience_persos_list = [];
	var units = $("asmUnit:has(metadata[semantictag='experience_perso-unit'])",data);
	for ( var i = 0; i < units.length; i++) {
		experience_persos_byid[$(units[i]).attr('id')] = new UIFactory["ExperiencePerso"](units[i]);
		experience_persos_list[i] = experience_persos_byid[$(units[i]).attr('id')];
	}
};

//==================================
UIFactory["ExperiencePerso"].remove = function(uuid,parentid,destid)
//==================================
{
	UICom.DeleteNode(uuid);
	if(parentid!="undefined" && destid!="undefined"){
		$("#"+uuid,experience_persos_byid[parentid].node).remove();
		experience_persos_byid[uuid] = new UIFactory["ExperiencePerso"](experience_persos_byid[parentid].node);
		experience_persos_byid[parentid].displayEditor(destid);
	} else {
		$("#"+uuid,g_portfolio_current).remove();
		UIFactory["ExperiencePerso"].parse(g_portfolio_current);
		ExperiencePersos_Display('exp-persos-short_histo','short');
		ExperiencePersos_Display('exp-persos-detail_histo','detail',$("asmStructure:has(metadata[semantictag='experiences-persos'])", g_portfolio_current).attr('id'));
	}
	// Mises à jour des compétences
	displayCompetencesMetiers(g_portfolio_current);
	displayCompetencesTrans(g_portfolio_current);
	displayCompetencesAutres(g_portfolio_current);
};

//==================================
UIFactory["ExperiencePerso"].prototype.get_data2send = function()
//==================================
{
	var str = "<ExperiencePerso>";
	str += getCompetencies2send(this.node,['autoeval']);	
	str += "</ExperiencePerso>";
//	alert(str);
	return str;
};

//==================================
function ExperiencePersos_Display(destid,type,parentid)
//==================================
{
	$("#"+destid).html("");
	var html ="";
	if (type=='detail') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		var databack = false;
		var callback = "UIFactory['ExperiencePerso'].reloadparse";
		var param2 = "null";
		var param3 = "'"+destid+"'";
		var param4 = "'"+parentid+"'";
		html += "<div class='titre2'><span class='titre1'>Mes expériences personnelles<span id='help-exp-perso-label'></span></span>";
		if (g_userrole=='etudiant') {
			html += "<a class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2composantes.IUT2-parts','experience_perso-unit',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
			html += "Ajouter une expérience <i class='fa fa-plus-square'>";
			html += "</a></div>";
		}
	}
	$("#"+destid).html(html);
	for ( var i = 0; i < experience_persos_list.length; i++) {
			$("#"+destid).append($("<div id='"+destid+"_"+experience_persos_list[i].id+"'></div>"));			
			experience_persos_list[i].displayView(destid+"_"+experience_persos_list[i].id,type,null,"accordion_"+destid);
	}
}


