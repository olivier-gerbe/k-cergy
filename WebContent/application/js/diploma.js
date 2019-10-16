//========================================================
//========================================================
//===================== Diplomes =========================
//========================================================
//========================================================

var diplomas_byid = {};
var diplomas_list = [];

//==================================
UIFactory["Diploma"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.semantictag = $("metadata",node).attr('semantictag');
	this.obtention_nodeid = $("asmContext:has(metadata[semantictag='diploma-obtention'])",node).attr('id');
	this.specialization_nodeid = $("asmContext:has(metadata[semantictag='specialization-label'])",node).attr('id');
	this.begin_nodeid = $("asmContext:has(metadata[semantictag='diploma-begin'])",node).attr('id');
	this.end_nodeid = $("asmContext:has(metadata[semantictag='diploma-end'])",node).attr('id');
	this.mention_nodeid = $("asmContext:has(metadata[semantictag='diploma-mention'])",node).attr('id');
	this.certification_nodeid = $("asmContext:has(metadata[semantictag='diploma-certification'])",node).attr('id');
	this.creditsECTS_nodeid = $("asmContext:has(metadata[semantictag='diploma-creditsECTS'])",node).attr('id');
	this.gradeLMD_nodeid = $("asmContext:has(metadata[semantictag='diploma-gradeLMD'])",node).attr('id');
	this.erasmus_nodeid = $("asmContext:has(metadata[semantictag='diploma-erasmus'])",node).attr('id');
	this.langue_nodeid = $("asmContext:has(metadata[semantictag='diploma-langue'])",node).attr('id');
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
	this.comps_iut2_node = $("metadata[semantictag*='comps-IUT2']",node).parent();
	this.comps_metiers_node = $("metadata[semantictag*='comps-metiers']",node).parent();
	this.comps2_metiers_node = $("metadata[semantictag*='comps2-metiers']",node).parent();
	this.comps_autres_node = $("metadata[semantictag*='comps-autres']",node).parent();
	this.comps2_autres_node2a = $("metadata[semantictag*='comps2a-autres']",node).parent();
	this.comps2_autres_node2b = $("metadata[semantictag*='comps2b-autres']",node).parent();
	this.comps2_autres_node2c = $("metadata[semantictag*='comps2c-autres']",node).parent();
};

//==================================
UIFactory["Diploma"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type==null || type=='cv') {
		html = "<div class='row diploma'><div class='span3'>";
		html += "De <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " à <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.end_nodeid].resource.getView(destid+"_short_end") + "</span>";
		
		html += "</div><div class='span8'>";
		html += "<span id='"+destid+"_short_label' class='education_title'>"+UICom.structure["ui"][this.id].getLabel(destid+"_short_label","span");
		if (UICom.structure["ui"][this.specialization_nodeid].resource.getView()!="")
			html += " - " + UICom.structure["ui"][this.specialization_nodeid].resource.getView();
		html += "</span>";
		html += "<div class='organisme'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "</div></div>";
	}
	if (type==null || type=='short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;"
			+ "<a href='#' onclick=\"javascript:$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"');$('#tabs_histo li:eq(1) a').tab('show')\">"
			+ "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.id].getLabel(destid+"_short_label","span")+"</span>";
		if (UICom.structure["ui"][this.specialization_nodeid].resource.getView()!="")
			html += " - " + "<span id='"+destid+"_specialization'>"+ UICom.structure["ui"][this.specialization_nodeid].resource.getView(destid+"_specialization")+"</span>";
		html += "</a>";
	}
	if (type=='detail') {
		html += "<div class='panel panel-default alert alert-orange alert-block' >";
		html += "<div class='panel-heading'>";
		html += "<h4 class='panel-title'>";
//		if (this.semantictag.indexOf('IUT2')<0 && g_userrole=='etudiant'){
			html += "<span  class='editbutton' onclick=\"javascript: confirmDel('"+this.id+"','Diploma')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
//		}
		if (g_userrole=='etudiant') {
			html += "<span  class='editbutton' onclick=\"javascript:diplomas_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
			html += "<i class='fa fa-edit'></i>";
			html += "</span>";
		}
		html += "<span data-toggle='collapse' class='editbutton' data-parent='#"+parentid+"' href='#collapse"+this.id+"' onclick=\"toggleZoom('"+this.id+"')\">";
		html += "<i id='zoom_"+this.id+"' class='fa fa-search-plus'></i>";
		html += "</span>";
		html += UICom.structure["ui"][this.id].getView()+" ("+UICom.structure["ui"][this.begin_nodeid].resource.getView()+" - "+UICom.structure["ui"][this.end_nodeid].resource.getView()+")";
		html += "</h4>";
		html += "</div>";
		html += "<div id='collapse"+this.id+"' class='panel-collapse collapse out'>";
		html += "<div class='panel-body'>";
		html += "<div class='row-fluid'>";
		html += "<div class='span6 attributs'>";
		html += "<div class='item'>Mention : <span class='value'>"+UICom.structure["ui"][this.mention_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Spécialité, option : <span class='value'>"+UICom.structure["ui"][this.specialization_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Domaine académique : <span class='value'>"+UICom.structure["ui"][this.domaine_academique_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Domaine métiers : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
		html += "<br/><div class='item'>Obtention : <span class='value'>"+UICom.structure["ui"][this.obtention_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Lien de certification : <span class='value'>"+UICom.structure["ui"][this.certification_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Nombre de crédits ECTS (LMD) : <span class='value'>"+UICom.structure["ui"][this.creditsECTS_nodeid].resource.getView()+"</span>  Grade LMD : <span class='value'>"+UICom.structure["ui"][this.gradeLMD_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Domaine ERASMUS : <span class='value'>"+UICom.structure["ui"][this.erasmus_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Langue : <span class='value'>"+UICom.structure["ui"][this.langue_nodeid].resource.getView()+"</span></div>";
		html += "</div><!-- span -->";
		html += "<div class='span6 organisme'>";
		html += "<div class='item'>Organisme :</div><br/>";
		html += "<div class='item libelle'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.logo_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.website_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.street_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.town_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.postalcode_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.country_nodeid].resource.getView()+"</div>";
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
		if (this.comps_iut2_node!=undefined && this.comps_iut2_node.length>0) { // diplome IUT2
			html += "Compétences venant du référentiel de vos formations acquises suite à la réussite de module de cours.";
			//---------------------------------------------
			html += getEvalTableau_begin(0,this.id,destid,'DiplomaIUT2',0);
			html += getCompetencies2(this.comps_iut2_node,false,'DiplomaIUT2',this.id,destid,'activite','competence-metier',0);
			html += getEvalTableau_end();
		}
		html += getEvalTableau_begin(1,this.id,destid,'Diploma',0);
		//---------------------------------------------
//		html += getCompetencies2(this.comps_iut2_node,false,'DiplomaIUT2',this.id,destid,'activite','competence-metier',0);
		var tableauActivitesMetierPPN = getTableauActivitesMetierPPN(this.comps_metiers_node,'activite','competence-metier');
		var tableauActivitesMetierFree = getTableauActivitesMetierFree(this.comps2_metiers_node,'dom-metier-ref','free-comp-metier');
		var tableauActivitesMetier = tableauActivitesMetierPPN.concat(tableauActivitesMetierFree);
		var tableauActivitesMetierTrie = tableauActivitesMetier.sort(sortOn1);
		html += getCompetencies3(tableauActivitesMetierTrie,false,'Diploma',this.id,destid,0);
//		html += getCompetencies2(this.comps_metiers_node,false,'Diploma',this.id,destid,'activite','competence-metier',0);
//		html += getCompetencies2(this.comps2_metiers_node,false,'Diploma',this.id,destid,'dom-metier-ref','free-comp-metier',0);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span6'>";
		html += "<h5>"+appStr['fr']['competencies-other']+"</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Diploma',1);
		//---------------------------------------------
		html += getCompetencies2(this.comps_autres_node,false,'Diploma',this.id,destid,'activite','competence-trans',1);
		html += getCompetencies2(this.comps2_autres_node2a,false,'Diploma',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2b,false,'Diploma',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2c,false,'Diploma',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "</div>";
		//-----------------------------------------------------------------------
		if (this.semantictag.indexOf('IUT2')<0)
			html += getEvaluationCodes_bytypes(['','autoeval']);
		else
			html += getEvaluationCodes_bytypes(['iut','autoeval']);
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
UIFactory["Diploma"].prototype.displayEditor = function(destid,type,lang)
//==================================
{
	var html = "";
	$("#"+destid).html("");
	var div = $("<div class='alert alert-orange alert-block edition'></div>");
	$("#"+destid).append(div);
	html += "<a  class='btn btn-mini btn-orange editbutton' onclick=\"javascript:diplomas_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
	html += "Quitter le mode édition";
	html += "</a>";
	$(div).append($(html));
	if (this.semantictag.indexOf('IUT2')<0){
		$(div).append($("<label id='titre_"+this.id+"' class='inline titre'>Libellé du diplôme </label>"));
		$("#titre_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());

		var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
		$(div).append($(row));
	
		$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
		$("#formA_"+this.id).append($("<hr></hr>"));
	
		displayControlGroup_displayEditor("formA_"+this.id,"Obtention","obtention_"+this.id,this.obtention_nodeid,"radio-inline");
		displayControlGroup_getEditor("formA_"+this.id,"Mention","mention_"+this.id,this.mention_nodeid);
		displayControlGroup_getEditor("formA_"+this.id,"Spécialité, option","specialization_"+this.id,this.specialization_nodeid);
		displayControlGroup_getEditor("formA_"+this.id,"Année de début","deb_"+this.id,this.begin_nodeid);
		displayControlGroup_getEditor("formA_"+this.id,"Année de fin","fin_"+this.id,this.end_nodeid);
		displayControlGroup_displayEditor("formA_"+this.id,"Domaine académique","domaca_"+this.id,this.domaine_academique_nodeid,"select");
		displayControlGroup_displayEditor("formA_"+this.id,"Domaine métiers<span id='help-domaine-metier'></span>","dommet_"+this.id,this.domaine_metier_nodeid,"select");
		displayControlGroup_getEditor("formA_"+this.id,"Lien de certification","certification_"+this.id,this.certification_nodeid);
		displayControlGroup_getEditor("formA_"+this.id,"Crédits ECTS","ects_"+this.id,this.creditsECTS_nodeid);
		displayControlGroup_displayEditor("formA_"+this.id,"Grade LMD","lmd_"+this.id,this.gradeLMD_nodeid,"radio-inline");
		displayControlGroup_displayEditor("formA_"+this.id,"Domaine ERASMUS","erasmus_"+this.id,this.erasmus_nodeid,"select");
		displayControlGroup_displayEditor("formA_"+this.id,"Langue","langue_"+this.id,this.langue_nodeid,"select");
	
		$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
		displayControlGroup_getEditor("formB_"+this.id,"Organisme","org_"+this.id,this.name_nodeid);
		displayControlGroup_displayEditor("formB_"+this.id,"Logo","logo_"+this.id,this.logo_nodeid);
		$("#formB_"+this.id).append(UICom.structure["ui"][this.website_nodeid].resource.getEditor('same-control-group'));
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Adresse</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		displayControlGroup_getEditor("formB_"+this.id,"Rue","rue_"+this.id,this.street_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Ville","ville_"+this.id,this.town_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Code postal","code_"+this.id,this.postalcode_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Pays","pays_"+this.id,this.country_nodeid);
	} else {
		html = "";
		html += "<h4 class='panel-title'>";
		html += UICom.structure["ui"][this.id].getView();
		html += "</h4>";
		html += "<div class='row-fluid'>";
		html += "<div class='span6 attributs'>";
		html += "<div class='item'>Année de début : <span class='value' id='begin_"+this.id+"'></span></div>";
		html += "<div class='item'>Année de fin : <span class='value' id='end_"+this.id+"'></span></div>";
		html += "<div class='item'>Mention : <span class='value'>"+UICom.structure["ui"][this.mention_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Spécialité, option : <span class='value' id='specialization_"+this.id+"'></span></div>";

		html += "<div class='item'>Domaine académique : <span class='value'>"+UICom.structure["ui"][this.domaine_academique_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Domaine métiers : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
		html += "<br/><div class='item'>Obtention : <span class='value' id='obtention_"+this.id+"'></span></div>";

		html += "<div class='item'>Lien de certification : <span class='value'>"+UICom.structure["ui"][this.certification_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Nombre de crédits ECTS (LMD) : <span class='value'>"+UICom.structure["ui"][this.creditsECTS_nodeid].resource.getView()+"</span>  Grade LMD : <span class='value'>"+UICom.structure["ui"][this.gradeLMD_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Domaine ERASMUS : <span class='value'>"+UICom.structure["ui"][this.erasmus_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Langue : <span class='value'>"+UICom.structure["ui"][this.langue_nodeid].resource.getView()+"</span></div>";
		html += "</div><!-- span -->";
		html += "<div class='span6 organisme'>";
		html += "<div class='item'>Organisme :</div><br/>";
		html += "<div class='item libelle'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.logo_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.website_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.street_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.town_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.postalcode_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.country_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		html += "</div><!-- row -->";
		$(div).append($(html));
		$("#specialization_"+this.id).append(UICom.structure["ui"][this.specialization_nodeid].resource.getEditor());
		UICom.structure["ui"][this.obtention_nodeid].resource.displayEditor("obtention_"+this.id,"radio-inline",lang);
		$("#begin_"+this.id).append(UICom.structure["ui"][this.begin_nodeid].resource.getEditor());
		$("#end_"+this.id).append(UICom.structure["ui"][this.end_nodeid].resource.getEditor());
	}
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cette formation","Diploma","diplomes-detail_histo_","orange","diplomas_byid",this.comps_iut2_node);
	//-----------------------------------------------------------------------
	if (this.semantictag.indexOf('IUT2')<0)
		html += getEvaluationCodes_bytypes(['','autoeval']);
	else
		html += getEvaluationCodes_bytypes(['iut','autoeval']);
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

//==================================
function editComp(id)
//==================================
{
	$("#edit-window-body-content").remove();
	$("#edit-window-body").append($("<div id='edit-window-body-content'></div>"));
	UICom.structure["ui"][id].resource.displayEditor("edit-window-body-content","radio");
}

//==================================
UIFactory["Diploma"].reloadparseone = function(uuid,destid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag*='diploma-unit'])",data);
			diplomas_byid[uuid] = new UIFactory["Diploma"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			diplomas_byid[uuid].displayEditor(destid);
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};

//==================================
UIFactory["Diploma"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			UIFactory["Diploma"].parse(data);
			if (uuid!=null)
				diplomas_byid[uuid].displayEditor(destid);
			else {
				Diplomas_Display('diplomes-short_histo','short');
				Diplomas_Display('diplomes-detail_histo','detail',parentid);
				Diplomas_Display('diplomes_cv','cv');
			}
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};

//==================================
UIFactory["Diploma"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		diplomas_byid[parentid].displayEditor(destid);
	else {
		Diplomas_Display('diplomes-short_histo','short');
		Diplomas_Display('diplomes-detail_histo','detail',$("asmStructure:has(metadata[semantictag='diplomas'])", g_portfolio_current).attr('id'));
		Diplomas_Display('diplomes_cv','cv');
	}
};

//==================================
UIFactory["Diploma"].parse = function(data) 
//==================================
{
	diplomas_byid = {};
	diplomas_list = [];
	var units = $("asmUnit:has(metadata[semantictag*='diploma-unit'])",data);
	var tableau = new Array();
	for ( var i = 0; i < units.length; i++) {
		var uuid = $(units[i]).attr('id');
		diplomas_byid[uuid] = new UIFactory["Diploma"](units[i]);
		//------------------
		var date_fin = UICom.structure["ui"][$("asmContext:has(metadata[semantictag='diploma-end'])",units[i]).attr('id')].resource.getView();
		tableau[i] = [date_fin,uuid];
	}
	var newTableau = tableau.sort(sortOn1Desc);
	for (var i=0; i<newTableau.length; i++){
		diplomas_list[i] = diplomas_byid[newTableau[i][1]];
	}
};

//==================================
UIFactory["Diploma"].remove = function(uuid,parentid,destid,callback,param1,param2)
//==================================
{
	UICom.DeleteNode(uuid);
	if(parentid!="undefined" && destid!="undefined"){
		$("#"+uuid,diplomas_byid[parentid].node).remove();
		diplomas_byid[uuid] = new UIFactory["Diploma"](diplomas_byid[parentid].node);
		diplomas_byid[parentid].displayEditor(destid);
	} else {
		$("#"+uuid,g_portfolio_current).remove();
		UIFactory["Diploma"].parse(g_portfolio_current);
		Diplomas_Display('diplomes-short_histo','short');
		Diplomas_Display('diplomes-detail_histo','detail',$("asmStructure:has(metadata[semantictag='diplomas'])", g_portfolio_current).attr('id'));
		Diplomas_Display('diplomes_cv','cv');
	}
	// Mises à jour des compétences
	displayCompetencesMetiers(g_portfolio_current);
	displayCompetencesTrans(g_portfolio_current);
	displayCompetencesAutres(g_portfolio_current);
};

//==================================
UIFactory["Diploma"].prototype.get_data2send = function()
//==================================
{
	var str = "<Diploma>";
	str += getCompetencies2send(this.node,['autoeval']);	
	str += "</Diploma>";
//	alert(str);
	return str;
};

//==================================
function Diplomas_Display(destid,type,parentid) {
//==================================

	$("#"+destid).html("");
	var html = "";
	if (type=='detail') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		var databack = false;
		var callback = "UIFactory['Diploma'].reloadparse";
		var param2 = "null";
		var param3 = "'"+destid+"'";
		var param4 = "'"+parentid+"'";
		html += "<div class='titre2'><span class='titre1'>Mes diplômes<span id='help-diploma-label'></span></span>";
		if (g_userrole=='etudiant') {
			html += "<a class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2composantes.IUT2-parts','diploma-unit',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
			html += "Ajouter un diplôme <i class='fa fa-plus-square'></i>";
			html += "</a>";
			html += menuListeDiplomes(parentid,databack,callback,param2,param3,param4);
			html += "</div>";
		}
	}
	if (type=='short' &&  diplomas_list.length>0){
		html += "<h5>Diplôme";
		if (diplomas_list.length>1)
			html+= "s"
		html += "</h5>";
	}
	if (type=='detail' || type=='short') {	
		html += "<div class='panel-group' id='accordion_"+destid+"'></div>";
		$("#"+destid).html(html);
		for ( var i = 0; i < diplomas_list.length; i++) {
			$("#accordion_"+destid).append($("<div id='"+destid+"_"+diplomas_list[i].id+"'></div>"));			
			diplomas_list[i].displayView(destid+"_"+diplomas_list[i].id,type,null,"accordion_"+destid);
		};
	}
	if (type=='cv') {
		for ( var i = 0; i < diplomas_list.length; i++) {
			var uuid = diplomas_list[i].id;
			$("#"+destid).append($("<div id='edu_"+uuid+"'></div>"));			
			diplomas_list[i].displayView("edu_"+uuid,'cv',null,"accordion_"+destid);
		}
	}
}

//==================================
UIFactory["Diploma"].prototype.competencies_display = function(destid,type,lang) 
//==================================
{
	var competency_parents = $("asmUnitStructure:has(metadata[semantictag='competence-acad_parent'])",data);
	for ( var i = 0; i < $(competency_parents).length; ++i) {
		var comp_evals = $("asmContext:has(metadata[semantictag='comp-acad_eval'])",competency_parents[i]);
		for ( var i = 0; i < $(comp_evals).length; ++i) {
			
		}
	}
};

//==================================
function getEditor(destid,uuid,type)
//==================================
{
	var view = $("#"+destid).attr("view");
	if (view == 'display') {
		$("#"+destid).attr("view","edit");
		$("#"+destid).html("");
		try {
			var html = UICom.structure["ui"][uuid].resource.getEditor(type);
			$("#"+destid).html(html);
		}
		catch(e) {
			UICom.structure["ui"][uuid].resource.displayEditor(destid);
		}
	} else {
		$("#"+destid).attr("view","display");
		var html = UICom.structure["ui"][uuid].resource.getView();
		$("#"+destid).html(html);
	}
}

//====================================
function menuListeDiplomes(parentid,databack,callback,param2,param3,param4)
//====================================
{
	// get list of diplomas
	var diplomes_iut = new Array();
	$.ajax({
		async : false,
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/code/IUT2diplomes.diplomes?resources=true",
		success : function(data) {
			var diplome_types = $("asmUnit:has(metadata[semantictag*='diplome-type'])",data);
			for (var i=0; i<diplome_types.length; i++){
				diplomes_iut[i] = new Array();
				diplomes_iut[i][0] = $("label[lang='fr']",$("asmResource[xsi_type='nodeRes']",diplome_types[i])[0]).text();
				diplomes_iut[i][1] = new Array();
				var diplome_items = $("asmContext:has(metadata[semantictag*='diplome-item'])",diplome_types[i]);
				for (var j=0; j<diplome_items.length; j++){
					var label = $("label[lang='fr']",$("asmResource[xsi_type='Item']",diplome_items[j])).text();
					var code = $("code",$("asmResource[xsi_type='Item']",diplome_items[j])).text();
					diplomes_iut[i][1][j] = {code:code,label:label};
				}
			}
		}
	});
	// build menu
	var menu = "";
	menu += "<span class='dropdown editbutton'>";
	menu += "	<a data-toggle='dropdown' class='dropdown-toggle editbutton' href='#'>Ajouter mon diplôme IUT <i class='fa fa-caret-square-o-down'></i></strong></a>";
	menu += "	<ul class='dropdown-menu pull-right'>";
	for (var i=0; i<diplomes_iut.length; i++){
		menu += "	<li class='nav-header'>" + diplomes_iut[i][0] + "</li>";
		for (var j=0; j<diplomes_iut[i][1].length; j++){
			menu += "	<li><a href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2diplomes."+diplomes_iut[i][1][j].code+"','diploma-unit-IUT2',"+databack+","+callback+","+param2+","+param3+","+param4+")\">" + diplomes_iut[i][1][j].code + " - " + diplomes_iut[i][1][j].label + "</a></li>";
		}
	}
	menu += "	</ul>";
	menu += "</span>";
	return menu
}

