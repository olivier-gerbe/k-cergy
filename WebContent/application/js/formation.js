//========================================================
//========================================================
//===================== Formations =========================
//========================================================
//========================================================

var formations_byid = {};
var formations_list = [];

//==================================
UIFactory["Formation"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.semantictag = $("metadata",node).attr('semantictag');
	this.begin_nodeid = $("asmContext:has(metadata[semantictag='formation-begin'])",node).attr('id');
	this.end_nodeid = $("asmContext:has(metadata[semantictag='formation-end'])",node).attr('id');
	this.duration_nodeid = $("asmContext:has(metadata[semantictag='formation-duration'])",node).attr('id');
	this.secteur_pro_nodeid = $("asmContext:has(metadata[semantictag='secteur-pro'])",node).attr('id');
	this.description_nodeid = $("asmContext:has(metadata[semantictag='formation-description'])",node).attr('id');
	this.domaine_academique_nodeid = $("asmContext:has(metadata[semantictag='domaine-academique'])",node).attr('id');
	this.domaine_metier_nodeid = $("asmContext:has(metadata[semantictag='domaine-metier'])",node).attr('id');
	// ---------------------------------------
	this.name_nodeid  = $("asmContext:has(metadata[semantictag='name'])",node).attr('id');
	this.street_nodeid  = $("asmContext:has(metadata[semantictag='street'])",node).attr('id');
	this.town_nodeid  = $("asmContext:has(metadata[semantictag='town'])",node).attr('id');
	this.postalcode_nodeid  = $("asmContext:has(metadata[semantictag='postalcode'])",node).attr('id');
	this.country_nodeid  = $("asmContext:has(metadata[semantictag='country'])",node).attr('id');
	this.website_nodeid  = $("asmContext:has(metadata[semantictag='website'])",node).attr('id');
	this.logo_nodeid  = $("asmContext:has(metadata[semantictag='logo'])",node).attr('id');
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
UIFactory["Formation"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type==null || type=='cv') {
		html = "<div class='row formation'><div class='span3'>";
		html += "De <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " à <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.end_nodeid].resource.getView(destid+"_short_end") + "</span>";
		
		html += "</div><div class='span8'>";
		html += "<span id='"+destid+"_short_label' class='education_title'>"+UICom.structure["ui"][this.id].getView(destid+"_short_label") + "</span>";
		html += "<div class='organisme'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "</div></div>";
	}
	if (type==null || type=='short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;"
			+ "<a href='#' onclick=\"javascript:$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"');$('#tabs_histo li:eq(2) a').tab('show')\">"
			+ "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.id].getLabel(destid+"_short_label","span")
			+ "</a>";
	}
	if (type=='detail') {
		html += "<div class='panel panel-default alert alert-bleu alert-block' >";
		html += "<div class='panel-heading'>";
		html += "<h4 class='panel-title'>";
		//---------------------------------------------------------
		if (g_userrole=='etudiant') {
			html += "<span  class='editbutton' onclick=\"javascript: confirmDel('"+this.id+"','Formation')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
			html += "<span  class='editbutton' onclick=\"javascript:formations_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
			html += "<i class='fa fa-edit'></i>";
			html += "</span>";
		}
		html += "<span data-toggle='collapse' class='editbutton' data-parent='#"+parentid+"' href='#collapse"+this.id+"' onclick=\"toggleZoom('"+this.id+"')\">";
		html += "<i id='zoom_"+this.id+"' class='fa fa-search-plus'></i>";
		html += "</span>";
		//---------------------------------------------------------
		html += UICom.structure["ui"][this.id].getView()+" ("+UICom.structure["ui"][this.begin_nodeid].resource.getView()+" - "+UICom.structure["ui"][this.end_nodeid].resource.getView()+")";
		html += "</h4>";
		html += "</div>";
		html += "<div id='collapse"+this.id+"' class='panel-collapse collapse out'>";
		html += "<div class='panel-body'>";
		html += "<div class='row-fluid'>";
		html += "<div class='span6 attributs'>";
		html += "<div class='item'>Durée : <span class='value'>"+UICom.structure["ui"][this.duration_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Domaine académique : <span class='value'>"+UICom.structure["ui"][this.domaine_academique_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Domaine métiers : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Secteur professionnel : <span class='value'>"+UICom.structure["ui"][this.secteur_pro_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Description de la formation</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.description_nodeid].resource.getView()+"</span></div>";
		html += "</div><!-- span -->";
		html += "<div class='span6 organisme'>";
		html += "<div class='item'>Organisme :</div><br/>";
		html += "<div class='item libelle'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.logo_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.street_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.town_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.postalcode_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.country_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.website_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		html += "</div><!-- row -->";
		//----------------------------------------------------------------------------------------------------
		html += "<div class='row-fluid competences-titre'>";
		//-----------------------------------------------------------------------
		view_eval_competences = new Array();
		html += "<span class='span6'><h4>Compétences liées à cette formation</h4></span>";
		html += "</div>";
		html += "<div class='row-fluid'>";
		html += "<span class='span6'>";
		html += "<h5>Compétences métiers</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Formation',0);
		//---------------------------------------------
		var tableauActivitesMetierPPN = getTableauActivitesMetierPPN(this.comps_metiers_node,'activite','competence-metier');
		var tableauActivitesMetierFree = getTableauActivitesMetierFree(this.comps2_metiers_node,'dom-metier-ref','free-comp-metier');
		var tableauActivitesMetier = tableauActivitesMetierPPN.concat(tableauActivitesMetierFree);
		var tableauActivitesMetierTrie = tableauActivitesMetier.sort(sortOn1);
		html += getCompetencies3(tableauActivitesMetierTrie,false,'Formation',this.id,destid,0);
//		html += "<tr><td><hr></td></tr>"
//		html += getCompetencies2(this.comps_metiers_node,false,'Formation',this.id,destid,'activite','competence-metier',0);
//		html += getCompetencies2(this.comps2_metiers_node,false,'Formation',this.id,destid,'dom-metier-ref','free-comp-metier',0);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span6'>";
		html += "<h5>"+appStr['fr']['competencies-other']+"</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Formation',1);
		//---------------------------------------------
		html += getCompetencies2(this.comps_autres_node,false,'Formation',this.id,destid,'activite','competence-trans',1);
		html += getCompetencies2(this.comps2_autres_node2a,false,'Formation',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2b,false,'Formation',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2c,false,'Formation',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "</div>";
		//-----------------------------------------------------------------------
		html += getEvaluationCodes_bytypes(['','autoeval']);
		//----------------------------------------------------------------------------------------------------

		html += "</div><!-- class='panel-collapse collapse in'-->";
		html += "</div><!-- class=''panel ...'-->";
	}
	$("#"+destid).append(html);
	//------------------ evaluation----------------------------------------
	if ($('#scroll_'+this.id).hasVerticalScrollBar())  // si scrollbar décaler en-têtes évaluations
		$('#ethead_'+this.id).css('width','97%');
	getEvaluations_displayView(view_eval_competences);
	showHeaderEvaluationTable();
};
//==================================
UIFactory["Formation"].prototype.displayEditor = function(destid,type,lang)
//==================================
{
	var html = "";
	$("#"+destid).html(html);
	var parentid = $(this.node).parent().attr('id');
	var div = $("<div class='alert alert-bleu alert-block edition'></div>");
	$("#"+destid).append(div);
	if (this.semantictag.indexOf('IUT2')<0){
		html += "<a  class='btn btn-mini btn-bleu editbutton' onclick=\"javascript:formations_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
		html += "Quitter le mode édition";
		html += "</a>";
		$(div).append($(html));
	}
	$(div).append($("<label id='titre_"+this.id+"' class='inline titre'>Libellé de la formation </label>"));
	$("#titre_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());

	var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
	$(div).append($(row));

	$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getEditor("formA_"+this.id,"Année de début","debut_"+this.id,this.begin_nodeid);
	displayControlGroup_getEditor("formA_"+this.id,"Année de fin","fin_"+this.id,this.end_nodeid);
	displayControlGroup_getEditor("formA_"+this.id,"Durée","duration_"+this.id,this.duration_nodeid);
	displayControlGroup_displayEditor("formA_"+this.id,"Domaine académique","domaca_"+this.id,this.domaine_academique_nodeid,"select");
	displayControlGroup_displayEditor("formA_"+this.id,"Domaine métiers<span id='help-domaine-metier'></span>","dommet_"+this.id,this.domaine_metier_nodeid,"select");

	$("#formA_"+this.id).append($("<div class='control-group'><label class='control-label'>Description de la formation</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
	UICom.structure["ui"][this.description_nodeid].resource.displayEditor("formA_"+this.id,'x100');

	$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
	displayControlGroup_getEditor("formB_"+this.id,"Organisme","org_"+this.id,this.name_nodeid);
	displayControlGroup_displayEditor("formB_"+this.id,"Logo","logo_"+this.id,this.logo_nodeid);
	$("#formB_"+this.id).append(UICom.structure["ui"][this.website_nodeid].resource.getEditor('same-control-group'));
	$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Adresse</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
	displayControlGroup_getEditor("formB_"+this.id,"Rue","rue_"+this.id,this.street_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Ville","ville_"+this.id,this.town_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Code postal","code_"+this.id,this.postalcode_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Pays","pays_"+this.id,this.country_nodeid);
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
//	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cette formation","Formation","formations-detail_histo_","bleu","formations_byid",null,parentid);
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cette formation","Formation","formations-detail_histo_","bleu","formations_byid");
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
};

function editComp(id){
	$("#edit-window-body-content").remove();
	$("#edit-window-body").append($("<div id='edit-window-body-content'></div>"));
	UICom.structure["ui"][id].resource.displayEditor("edit-window-body-content","radio");
}

//==================================
UIFactory["Formation"].reloadparseone = function(uuid,destid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='formation-unit'])",data);
			formations_byid[uuid] = new UIFactory["Formation"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			formations_byid[uuid].displayEditor(destid);
			if (callback!=null)
				callback(param1,param2,param3,param4);
		}
	});
};

//==================================
UIFactory["Formation"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			UIFactory["Formation"].parse(data);
			if (uuid!=null)
				formations_byid[uuid].displayEditor(destid);
			else {
				Formations_Display('formations-short_histo','short');
				Formations_Display('formations-detail_histo','detail',parentid);
			}
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};

//==================================
UIFactory["Formation"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		formations_byid[parentid].displayEditor(destid);
	Formations_Display('formations-short_histo','short');
	Formations_Display('formations-detail_histo','detail',$("asmStructure:has(metadata[semantictag='formations'])", g_portfolio_current).attr('id'));
};

//==================================
UIFactory["Formation"].parse = function(data) 
//==================================
{
	formations_byid = {};
	formations_list = [];
	var units = $("asmUnit:has(metadata[semantictag*='formation-unit'])",data);
	var tableau = new Array();
	for ( var i = 0; i < units.length; i++) {
		var uuid = $(units[i]).attr('id');
		formations_byid[uuid] = new UIFactory["Formation"](units[i]);
		//------------------
		var date_fin = UICom.structure["ui"][$("asmContext:has(metadata[semantictag='formation-end'])",units[i]).attr('id')].resource.getView();
		tableau[i] = [date_fin,uuid];
	}
	var newTableau = tableau.sort(sortOn1Desc);
	for (var i=0; i<newTableau.length; i++){
		formations_list[i] = formations_byid[newTableau[i][1]];
	}
};

//==================================
UIFactory["Formation"].remove = function(uuid,parentid,destid)
//==================================
{
	UICom.DeleteNode(uuid);
	if(parentid!="undefined" && destid!="undefined"){
		$("#"+uuid,formations_byid[parentid].node).remove();
		formations_byid[uuid] = new UIFactory["Formation"](formations_byid[parentid].node);
		formations_byid[parentid].displayEditor(destid);
	} else {
		$("#"+uuid,g_portfolio_current).remove();
		UIFactory["Formation"].parse(g_portfolio_current);
		Formations_Display('formations-short_histo','short');
		Formations_Display('formations-detail_histo','detail',$("asmStructure:has(metadata[semantictag='formations'])", g_portfolio_current).attr('id'));
		Formations_Display('formations_cv','cv');
	}
	// Mises à jour des compétences
	displayCompetencesMetiers(g_portfolio_current);
	displayCompetencesTrans(g_portfolio_current);
	displayCompetencesAutres(g_portfolio_current);
};

//==================================
UIFactory["Formation"].prototype.get_data2send = function()
//==================================
{
	var str = "<Formation>";
	str += getCompetencies2send(this.node,['autoeval']);	
	str += "</Formation>";
//	alert(str);
	return str;
};

//==================================
function Formations_Display(destid,type,parentid) {
//==================================

	$("#"+destid).html("");
	if (type=='detail' || type=='short') {
		var html ="";
		if (type=='detail') {
			//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
			var databack = false;
			var callback = "UIFactory['Formation'].reloadparse";
			var param2 = "null";
			var param3 = "'"+destid+"'";
			var param4 = "'"+parentid+"'";
			html += "<div class='titre2'><span class='titre1'>Mes autres formations<span id='help-formation-label'></span></span>";
			if (g_userrole=='etudiant') {
				html += "<a class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2composantes.IUT2-parts','formation-unit',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
				html += "Ajouter une formation <i class='fa fa-plus-square'>";
				html += "</a></div>";
			}
		}
		html += "<div class='panel-group' id='accordion_"+destid+"'></div>";
		$("#"+destid).html(html);
		for ( var i = 0; i < formations_list.length; i++) {
			$("#accordion_"+destid).append($("<div id='"+destid+"_"+formations_list[i].id+"'></div>"));			
			formations_list[i].displayView(destid+"_"+formations_list[i].id,type,null,"accordion_"+destid);
		}
	}
	if (type=='cv') {
		for ( var i = 0; i < formations_list.length; i++) {
			var uuid = formations_list[i].id;
			$("#"+destid).append($("<div id='exp_"+uuid+"'></div>"));			
			formations_list[i].displayView("exp_"+uuid,'cv',null,"accordion_"+destid);
		}
	}

};

