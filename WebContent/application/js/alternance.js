		
//========================================================
//========================================================
//===================== Alternance ============================
//========================================================
//========================================================

var alternances_byid = {};
var alternances_list = [];

//==================================
UIFactory["Alternance"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.begin_nodeid = $("asmContext:has(metadata[semantictag='date-begin'])",node).attr('id');
	this.end_nodeid = $("asmContext:has(metadata[semantictag='date-end'])",node).attr('id');
	this.secteur_pro_nodeid = $("asmContext:has(metadata[semantictag='secteur-pro'])",node).attr('id');
	this.secteur_environnement_nodeid = $("asmContext:has(metadata[semantictag='secteur-environnement'])",node).attr('id');
	this.school_nodeid = $("asmContext:has(metadata[semantictag='school'])",node).attr('id');
	this.cadre_nodeid = $("asmContext:has(metadata[semantictag='cadre-formation'])",node).attr('id');
	this.realizations_nodeid = $("asmContext:has(metadata[semantictag='job-realizations'])",node).attr('id');
	this.missions_nodeid = $("asmContext:has(metadata[semantictag='job-missions'])",node).attr('id');
	this.type_contrat_nodeid = $("asmContext:has(metadata[semantictag='type-contrat'])",node).attr('id');
	this.apport_nodeid = $("asmContext:has(metadata[semantictag='apport'])",node).attr('id');
	this.comp_attestation_nodeid = $("asmContext:has(metadata[semantictag='comp-attestation'])",node).attr('id');
	this.domaine_metier_nodeid = $("asmContext:has(metadata[semantictag='domaine-metier'])",node).attr('id');
	//------------------------
	this.name_nodeid  = $("asmContext:has(metadata[semantictag='estb-name'])",node).attr('id');
	this.street_nodeid  = $("asmContext:has(metadata[semantictag='street'])",node).attr('id');
	this.town_nodeid  = $("asmContext:has(metadata[semantictag='town'])",node).attr('id');
	this.postalcode_nodeid  = $("asmContext:has(metadata[semantictag='postalcode'])",node).attr('id');
	this.country_nodeid  = $("asmContext:has(metadata[semantictag='country'])",node).attr('id');
	this.website_nodeid  = $("asmContext:has(metadata[semantictag='website'])",node).attr('id');
	this.logo_nodeid  = $("asmContext:has(metadata[semantictag='logo'])",node).attr('id');
	this.service_nodeid  = $("asmContext:has(metadata[semantictag='service'])",node).attr('id');
	this.referent_prenom_nodeid  = $("asmContext:has(metadata[semantictag='referent-prenom'])",node).attr('id');
	this.referent_nom_nodeid  = $("asmContext:has(metadata[semantictag='referent-nom'])",node).attr('id');
	this.referent_titre_nodeid  = $("asmContext:has(metadata[semantictag='referent-titre'])",node).attr('id');
	this.referent_email_nodeid  = $("asmContext:has(metadata[semantictag='referent-email'])",node).attr('id');
	this.referent_telephone_nodeid  = $("asmContext:has(metadata[semantictag='referent-telephone'])",node).attr('id');
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
UIFactory["Alternance"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // to empty html
	if (type==null || type=='cv') {
		html = "<div class='row alternance'><div class='span3'>";
		html += "De <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " à <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.end_nodeid].resource.getView(destid+"_short_end") + "</span>";
		
		html += "</div><div class='span8'>";
		html += "<span id='"+destid+"_short_label' class='job_title'>"+UICom.structure["ui"][this.id].getView(destid+"_short_label") + "</span>";
		html += "<div class='organisme'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>";
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div></div>";
	}
	if (type==null || type=='short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;";
		html += "<a href='#' onclick=\"javascript:$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"');$('#tabs_histo li:eq(3) a').tab('show')\">";
		html += "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.id].getLabel(destid+"_short_label") + "</span>";
		html += ", <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " - <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.end_nodeid].resource.getView(destid+"_short_end") + "</span>";
		html += ", <span id='"+destid+"_short_name'>"+UICom.structure["ui"][this.name_nodeid].resource.getView(destid+"_short_name") + "</span>";
		html += "</a>";
	}
	if (type=='detail') {
		html += "<div class='panel panel-default alert alert-vert alert-block' >";
		html += "<div class='panel-heading'>";
		html += "<h4 class='panel-title'>";
		//---------------------------------------------------------
		if (g_userrole=='etudiant') {
			html += "<span  class='editbutton' onclick=\"javascript: confirmDel('"+this.id+"','Alternance')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
			html += "<span  class='editbutton' onclick=\"javascript:alternances_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
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
		html += "<div class='item'>Domaine métiers : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Secteur / Environnement : <span class='value'>"+UICom.structure["ui"][this.secteur_environnement_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'><span class='value'>"+UICom.structure["ui"][this.type_contrat_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Organisme de provenance : <span class='value'>"+UICom.structure["ui"][this.school_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Dans le cadre de la formation : <span class='value'>"+UICom.structure["ui"][this.cadre_nodeid].resource.getView()+"</span></div>";
		html += "<h6>Principales missions</h6>"
		html += "<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>";
		html += "<h6>Principales réalisations</h6>"
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		html += "<div class='span6 organisme attributs'>";
//		html += "<div style='float:right'>"+UICom.structure["ui"][this.logo_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>Organisme employeur :</div><br/>";
		html += "<div class='item libelle'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.logo_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.website_nodeid].resource.getView(null,'same')+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.service_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.street_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.town_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.postalcode_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.country_nodeid].resource.getView()+"</div>";
		html += "<br/><div class='item'>Tuteur dans l'organisme :</div>";

		html += "<div class='value'>"+UICom.structure["ui"][this.referent_prenom_nodeid].resource.getView();
		html += " "+UICom.structure["ui"][this.referent_nom_nodeid].resource.getView();
		if (UICom.structure["ui"][this.referent_titre_nodeid].resource.getView()!="")
			html += ", "+UICom.structure["ui"][this.referent_titre_nodeid].resource.getView();
		html += "</div>";
		html += "<div class='item'><a href='mailto:"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"'>"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"</a>";
		if (UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView()!="")
			html += " Tel: "+UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView();
		html += "</div>";
		if (UICom.structure["ui"][this.comp_attestation_nodeid].resource.getView()!="")
			html += "<div class='value' style='margin-top:10px;'>Attestation de certification de compétences par l'organisme : <span class='value'>"+UICom.structure["ui"][this.comp_attestation_nodeid].resource.getView()+"</span></div>";
		if (UICom.structure["ui"][this.apport_nodeid].resource.getView().length>25){
			html += "<h6>Apport de cette expérience dans mon projet personnel professionel</h6>"
			html += "<div>"+UICom.structure["ui"][this.apport_nodeid].resource.getView()+"</div>";
		}
		html += "</div><!-- span -->";
		html += "</div><!-- row -->";
		//----------------------------------------------------------------------------------------------------
		html += "<div class='row-fluid competences-titre'>";
		//-----------------------------------------------------------------------
		view_eval_competences = new Array();
		html += "<span class='span6'><h4>Compétences liées à cette alternance</h4></span>";
		html += "</div>";
		html += "<div class='row-fluid'>";
		html += "<span class='span6'>";
		html += "<h5>Compétences métiers</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Alternance',0);
		//---------------------------------------------
		var tableauActivitesMetierPPN = getTableauActivitesMetierPPN(this.comps_metiers_node,'activite','competence-metier');
		var tableauActivitesMetierFree = getTableauActivitesMetierFree(this.comps2_metiers_node,'dom-metier-ref','free-comp-metier');
		var tableauActivitesMetier = tableauActivitesMetierPPN.concat(tableauActivitesMetierFree);
		var tableauActivitesMetierTrie = tableauActivitesMetier.sort(sortOn1);
		html += getCompetencies3(tableauActivitesMetierTrie,false,'Alternance',this.id,destid,0);
//		html += getCompetencies2(this.comps_metiers_node,false,'Alternance',this.id,destid,'activite','competence-metier',0);
//		html += getCompetencies2(this.comps2_metiers_node,false,'Alternance',this.id,destid,'dom-metier-ref','free-comp-metier',0);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span6'>";
		html += "<h5>"+appStr['fr']['competencies-other']+"</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Alternance',1);
		//---------------------------------------------
		html += getCompetencies2(this.comps_autres_node,false,'Alternance',this.id,destid,'activite','competence-trans',1);
		html += getCompetencies2(this.comps2_autres_node2a,false,'Alternance',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2b,false,'Alternance',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2c,false,'Alternance',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "</div>";
		//-----------------------------------------------------------------------
		html += getEvaluationCodes_bytypes(['org','autoeval']);
		//----------------------------------------------------------------------------------------------------
		html += "</div><!-- class='panel-collapse collapse in'-->";
		html += "</div><!-- class=''panel ...'-->";
	}
	var obj = $(html);
	$("#"+destid).append(obj);
	getEvaluations_displayView(view_eval_competences);
	showHeaderEvaluationTable();
};
//==================================
UIFactory["Alternance"].prototype.displayEditor = function(destid,type,lang) {
//==================================
	var html = "";
	$("#"+destid).html("");
	var div = $("<div class='alert alert-vert alert-block edition'></div>");
	$("#"+destid).append(div);
	html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:alternances_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
	html += "Quitter le mode édition";
	html += "</a>";
	$(div).append($(html));
	$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'>Libellé du poste </label>"));
	$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());

	var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
	$(div).append($(row));

	$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getEditor("formA_"+this.id,"Année de début","debut_"+this.id,this.begin_nodeid);
	displayControlGroup_getEditor("formA_"+this.id,"Année de fin","fin_"+this.id,this.end_nodeid);
	displayControlGroup_displayEditor("formA_"+this.id,"Domaine métiers<span id='help-domaine-metier'></span>","dommet_"+this.id,this.domaine_metier_nodeid,"select");
	displayControlGroup_displayEditor("formA_"+this.id,"Secteur / Environnement","senv_"+this.id,this.secteur_environnement_nodeid,"select");
	displayControlGroup_displayEditor("formA_"+this.id,"Type de contrat","typecontrat_"+this.id,this.type_contrat_nodeid,"radio");
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getEditor("formA_"+this.id,"Organisme de formation<span id='help-organisme-formation'></span>","school_"+this.id,this.school_nodeid);
	displayControlGroup_getEditor("formA_"+this.id,"Dans le cadre de la formation<span id='help-cadre-formation'></span>","statut_"+this.id,this.cadre_nodeid);

	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>Principales missions<span id='help-missions'></span></label><p><i>Formuler les principales missions qui vous ont été confiées</i></p>"));
	UICom.structure["ui"][this.missions_nodeid].resource.displayEditor("formA_"+this.id,'x100');
	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>Principales réalisations<span id='help-realisations'></span></label><p><i>Préciser les réalisations concrètes qui vous ont permis de remplir vos missions (ex: étude comparative de solutions, rapport d'audit, réalisation d'un cahier des charges, etc.)</i></p>"));
	UICom.structure["ui"][this.realizations_nodeid].resource.displayEditor("formA_"+this.id,'x100');

	$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
	displayControlGroup_getEditor("formB_"+this.id,"Organisme d'accueil<span id='help-organisme-accueil'></span>","org_"+this.id,this.name_nodeid);
	displayControlGroup_displayEditor("formB_"+this.id,"Logo<span id='help-organisme-logo'></span>","logo_"+this.id,this.logo_nodeid);
	$("#formB_"+this.id).append(UICom.structure["ui"][this.website_nodeid].resource.getEditor('same-control-group'));
	displayControlGroup_getEditor("formB_"+this.id,"Service<span id='help-service'></span>","service_"+this.id,this.service_nodeid);
	$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Adresse</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
	displayControlGroup_getEditor("formB_"+this.id,"Rue","rue_"+this.id,this.street_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Ville","ville_"+this.id,this.town_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Code postal","code_"+this.id,this.postalcode_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Pays","pays_"+this.id,this.country_nodeid);
	$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Référent</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
	displayControlGroup_getEditor("formB_"+this.id,"Prénom","refprenom"+this.id,this.referent_prenom_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Nom","refnom"+this.id,this.referent_nom_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Fonction","titre_"+this.id,this.referent_titre_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Courriel","email_"+this.id,this.referent_email_nodeid);
	displayControlGroup_getEditor("formB_"+this.id,"Téléphone","tel_"+this.id,this.referent_telephone_nodeid);
	$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'> </label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
	displayControlGroup_displayEditor("formB_"+this.id,"Attestation de certification de compétences par l'organisme","comp-attestation_"+this.id,this.comp_attestation_nodeid,null,'comp-attestation');
	$("#formB_"+this.id).append($("<hr style='margin-top:15px;'></hr>"));
	$("#formB_"+this.id).append($("<label class='inline'>Apport de cette expérience dans mon projet personnel professionel</label>"));
	UICom.structure["ui"][this.apport_nodeid].resource.displayEditor("formB_"+this.id,'x100');
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cette alternance","Alternance","alternances-detail_histo_","vert","alternances_byid");
	//-----------------------------------------------------------------------
	html += getEvaluationCodes_bytypes(['org','autoeval']);
	//----------------------------------------------------------------------------------------------------
	$(div).append($(html));
	//------------------ evaluation----------------------------------------
	getEvaluations_display(view_eval_competences,eval_competences);
	showHeaderEvaluationTable();
	//------------------ bulles d'information----------------------------------------
	UIFactory.Help.displayAll()
};

//==================================
UIFactory["Alternance"].reloadparseone = function(uuid,destid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='alternance-unit'])",data);
			alternances_byid[uuid] = new UIFactory["Alternance"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			alternances_byid[uuid].displayEditor(destid);
			if (callback!=null)
				callback(param1,param2,param3,param4);
		}
	});
};

//==================================
UIFactory["Alternance"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			UIFactory["Alternance"].parse(data);
			if (uuid!=null)
				alternances_byid[uuid].displayEditor(destid);
			else {
				Alternances_Display('alternances-short_histo','short');
				Alternances_Display('alternances-detail_histo','detail',parentid);
				Alternances_Display('alternances_cv','cv');
			}
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};

//==================================
UIFactory["Alternance"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		alternances_byid[parentid].displayEditor(destid);
	else {
		Alternances_Display('alternances-short_histo','short');
		Alternances_Display('alternances-detail_histo','detail',$("asmStructure:has(metadata[semantictag='alternances'])", g_portfolio_current).attr('id'));
		Alternances_Display('alternances_cv','cv');
	}
};

//==================================
UIFactory["Alternance"].parse = function(data) 
//==================================
{
	alternances_byid = {};
	alternances_list = [];
	var units = $("asmUnit:has(metadata[semantictag='alternance-unit'])",data);
	var tableau = new Array();
	for ( var i = 0; i < units.length; i++) {
		var uuid = $(units[i]).attr('id');
		alternances_byid[uuid] = new UIFactory["Alternance"](units[i]);
		//------------------
		var date_fin = UICom.structure["ui"][$("asmContext:has(metadata[semantictag='date-end'])",units[i]).attr('id')].resource.getView();
		tableau[i] = [date_fin,uuid];
	}
	var newTableau = tableau.sort(sortOn1Desc);
	for (var i=0; i<newTableau.length; i++){
		alternances_list[i] = alternances_byid[newTableau[i][1]];
	}
};

//==================================
UIFactory["Alternance"].remove = function(uuid,parentid,destid)
//==================================
{
	UICom.DeleteNode(uuid);
	if(parentid!="undefined" && destid!="undefined"){
		$("#"+uuid,alternances_byid[parentid].node).remove();
		alternances_byid[uuid] = new UIFactory["Alternance"](alternances_byid[parentid].node);
		alternances_byid[parentid].displayEditor(destid);
	} else {
		$("#"+uuid,g_portfolio_current).remove();
		UIFactory["Alternance"].parse(g_portfolio_current);
		Alternances_Display('alternances-short_histo','short');
		Alternances_Display('alternances-detail_histo','detail',$("asmStructure:has(metadata[semantictag='alternances'])", g_portfolio_current).attr('id'));
		Alternances_Display('alternances_cv','cv');
	}
};

//==================================
UIFactory["Alternance"].prototype.get_data2send = function()
//==================================
{
	var str = "<Alternance>";
	str += getCompetencies2send(this.node,['autoeval']);	
	str += "</Alternance>";
//	alert(str);
	return str;
};

//==================================
function Alternances_Display(destid,type,parentid) {
//==================================
	$("#"+destid).html("");
	var html ="";
	if (type=='detail') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		var databack = false;
		var callback = "UIFactory['Alternance'].reloadparse";
		var param2 = "null";
		var param3 = "'"+destid+"'";
		var param4 = "'"+parentid+"'";
		html += "<div class='titre2'><span class='titre1'>Alternances</span><span id='help-alternance-label'></span>";
		if (g_userrole=='etudiant') {
			html += "<a  class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2composantes.IUT2-parts','alternance-unit',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
			html += "Ajouter une alternance <i class='fa fa-plus-square'>";
			html += "</a></div>";
		}
	}
	if (type=='short' &&  alternances_list.length>0)
		html += "<h5>Alternance(s)</h5>";
	if (type=='detail' || type=='short') {
		html += "<div class='panel-group' id='accordion_"+destid+"'></div>";
		$("#"+destid).html(html);
		for ( var i = 0; i < alternances_list.length; i++) {
			$("#accordion_"+destid).append($("<div id='"+destid+"_"+alternances_list[i].id+"'></div>"));			
			alternances_list[i].displayView(destid+"_"+alternances_list[i].id,type,null,"accordion_"+destid);
		}
	}
	if (type=='cv') {
		for ( var i = 0; i < alternances_list.length; i++) {
			var uuid = alternances_list[i].id;
			$("#"+destid).append($("<div id='exp_"+uuid+"'></div>"));			
			alternances_list[i].displayView("exp_"+uuid,'cv',null,"accordion_"+destid);
		}
	}
}

