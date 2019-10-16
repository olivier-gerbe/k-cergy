		
//========================================================
//========================================================
//===================== PROJET ============================
//========================================================
//========================================================

var projets_byid = {};
var projets_list = [];

//==================================
UIFactory["Projet"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.begin_nodeid = $("asmContext:has(metadata[semantictag='date-begin'])",node).attr('id');
	this.duration_nodeid = $("asmContext:has(metadata[semantictag='duration'])",node).attr('id');
	this.school_nodeid = $("asmContext:has(metadata[semantictag='school'])",node).attr('id');
	this.cadre_nodeid = $("asmContext:has(metadata[semantictag='cadre-formation'])",node).attr('id');
	this.realizations_nodeid = $("asmContext:has(metadata[semantictag='project-realizations'])",node).attr('id');
	this.missions_nodeid = $("asmContext:has(metadata[semantictag='project-missions'])",node).attr('id');
	this.attestation_nodeid = $("asmContext:has(metadata[semantictag='attestation'])",node).attr('id');
	this.rapport_nodeid = $("asmContext:has(metadata[semantictag='rapport'])",node).attr('id');
	this.apport_nodeid = $("asmContext:has(metadata[semantictag='apport'])",node).attr('id');
	this.domaine_metier_nodeid = $("asmContext:has(metadata[semantictag='domaine-metier'])",node).attr('id');
	//------------------------
	this.name_nodeid  = $("asmContext:has(metadata[semantictag='estb-name'])",node).attr('id');
	this.street_nodeid  = $("asmContext:has(metadata[semantictag='street'])",node).attr('id');
	this.town_nodeid  = $("asmContext:has(metadata[semantictag='town'])",node).attr('id');
	this.postalcode_nodeid  = $("asmContext:has(metadata[semantictag='postalcode'])",node).attr('id');
	this.country_nodeid  = $("asmContext:has(metadata[semantictag='country'])",node).attr('id');
	this.stage_lieu_nodeid = $("asmContext:has(metadata[semantictag='projet-lieu'])",node).attr('id');
	this.website_nodeid  = $("asmContext:has(metadata[semantictag='website'])",node).attr('id');
	this.logo_nodeid  = $("asmContext:has(metadata[semantictag='logo'])",node).attr('id');
	this.service_nodeid  = $("asmContext:has(metadata[semantictag='service'])",node).attr('id');
	//------------------------
	this.referent_prenom_nodeid  = $("asmContext:has(metadata[semantictag='referent-prenom'])",node).attr('id');
	this.referent_nom_nodeid  = $("asmContext:has(metadata[semantictag='referent-nom'])",node).attr('id');
	this.referent_email_nodeid  = $("asmContext:has(metadata[semantictag='referent-email'])",node).attr('id');

	//---- contacts -------------------
	this.contacts = [];
	var contacts_sect = $("asmUnitStructure:has(metadata[semantictag='project-contact'])",node);
	this.contacts[0] = new UIFactory['FullContact'](contacts_sect[1]);
	contacts_sect = $("asmUnitStructure:has(metadata[semantictag='fullcontact'])",node);
	for ( var i = 1; i < contacts_sect.length; i++) {
		this.contacts[i] = new UIFactory['FullContact'](contacts_sect[i]);
	}
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
	// ---------------------------------------
	this.comments_nodeid  = $("asmContext:has(metadata[semantictag='comments-tuteur'])",node).attr('id');

};

//==================================
UIFactory["Projet"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // to empty html
	if (type==null || type=='cv') {
		html = "<div class='row stage'><div class='span3'>";
		html += " <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " - <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.duration_nodeid].resource.getView(destid+"_short_end") + "</span>";
		
		html += "</div><div class='span8'>";
		html += "<span id='"+destid+"_short_label' class='job_title'>"+UICom.structure["ui"][this.id].getView(destid+"_short_label") + "</span>";
		html += "<div class='organisme'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>";
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div></div>";
	}
	if (type==null || type=='short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;"
		html += "<a href='#' onclick=\"javascript:$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"');$('#tabs_histo li:eq(3) a').tab('show')\">";
		html += "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.id].getLabel(destid+"_short_label","span") + "</span>";
		html += ", <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " - <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.duration_nodeid].resource.getView(destid+"_short_end") + "</span>";
		html += ", <span id='"+destid+"_short_name'>"+UICom.structure["ui"][this.name_nodeid].resource.getView(destid+"_short_name") + "</span>";
		html += "</a>";
	}
	if (type=='detail') {
		html += "<div class='panel panel-default alert alert-vert alert-block' >";
		html += "<div class='panel-heading'>";
		html += "<h4 class='panel-title'>";
		//---------------------------------------------------------
		var writenode = ($(this.node).attr('write')=='Y')? true:false;
		if (writenode && g_userrole=='etudiant') {
			html += "<span  class='editbutton' onclick=\"javascript: confirmDel('"+this.id+"','Projet')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
			html += "<span  class='editbutton' onclick=\"javascript:projets_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
			html += "<i class='fa fa-edit'></i>";
			html += "</span>";
		}
		html += "<span data-toggle='collapse' class='editbutton' data-parent='#"+parentid+"' href='#collapse"+this.id+"' onclick=\"toggleZoom('"+this.id+"')\">";
		html += "<i id='zoom_"+this.id+"' class='fa fa-search-plus'></i>";
		html += "</span>";
		//---------------------------------------------------------
		html += UICom.structure["ui"][this.id].getView()+" ("+UICom.structure["ui"][this.begin_nodeid].resource.getView()+" - "+UICom.structure["ui"][this.duration_nodeid].resource.getView()+")";
		html += "</h4>";
		html += "</div>";
		html += "<div id='collapse"+this.id+"' class='panel-collapse collapse out'>";
		html += "<div class='panel-body'>";
		html += "<div class='row-fluid'>";
		html += "<div class='span6 attributs'>";
		html += "<div class='item'>Domaine métiers : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Organisme de formation : <span class='value'>"+UICom.structure["ui"][this.school_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Dans le cadre de la formation : <span class='value'>"+UICom.structure["ui"][this.cadre_nodeid].resource.getView()+"</span></div>";
		if (UICom.structure["ui"][this.rapport_nodeid].resource.getView()!="")
		html += "<div class='item'>Rapport : <span class='value'>"+UICom.structure["ui"][this.rapport_nodeid].resource.getView()+"</span></div>";
		html += "<h6>Principales missions</h6>"
		html += "<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>";
		html += "<h6>Principales réalisations</h6>"
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		html += "<div class='span6 organisme attributs'>";
		html += "<h5>Contacts professionnels des organisations avec lesquelles vous avez collaboré</h5>"
		html += "<div class='item'>(commenditaires, partenaires, fournisseurs, ...)</div><br/>";
		//------------------ Tuteur ------------------
		if (this.referent_prenom_nodeid!=undefined) {
			html += "<div class='titre-tuteur'>Évaluateur</div>";
			html += "<div class='tutor'>"
			html += "	<div class='value'>"+UICom.structure["ui"][this.referent_prenom_nodeid].resource.getView();
			html += " "+UICom.structure["ui"][this.referent_nom_nodeid].resource.getView();
			html += "	</div>";
			html += "	<div class='item'><a href='mailto:"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"'>"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"</a>";
			html += "	</div>";
			html += "</div>";
		}
		//---------------- Contacts ------------------
		if (this.contacts.length)
			html += "<div class='titre-contacts'>Contact(s) :</div>";
		html += "<div class='contacts'>"
		for (var i=0; i<this.contacts.length; i++){
			html += "<div class='contact' id='"+this.contacts[i].id+"'></div>";
		}
		html += "</div><!-- contacts -->";
		//-----------------------------------
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
		html += "<span class='span6'><h4>Compétences liées à cette action</h4></span>";
		html += "</div>";
		html += "<div class='row-fluid'>";
		html += "<span class='span6'>";
		html += "<h5>Compétences métiers</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Projet',0);
		//---------------------------------------------
		var tableauActivitesMetierPPN = getTableauActivitesMetierPPN(this.comps_metiers_node,'activite','competence-metier');
		var tableauActivitesMetierFree = getTableauActivitesMetierFree(this.comps2_metiers_node,'dom-metier-ref','free-comp-metier');
		var tableauActivitesMetier = tableauActivitesMetierPPN.concat(tableauActivitesMetierFree);
		var tableauActivitesMetierTrie = tableauActivitesMetier.sort(sortOn1);
		html += getCompetencies3(tableauActivitesMetierTrie,false,'Projet',this.id,destid,0);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span6'>";
		html += "<h5>"+appStr['fr']['competencies-other']+"</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Projet',1);
		//---------------------------------------------
		html += getCompetencies2(this.comps_autres_node,false,'Projet',this.id,destid,'activite','competence-trans',1);
		html += getCompetencies2(this.comps2_autres_node2a,false,'Projet',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2b,false,'Projet',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2c,false,'Projet',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "</div>";
		//-----------------------------------------------------------------------
		html += getEvaluationCodes_bytypes(['evaluateur','autoeval']);
		//-----------------------------------------------------------------------		
		if (UICom.structure["ui"][this.comments_nodeid]!=undefined) {
			html += "<div class='row-fluid'><span class='span10'>";
			html += "<h4 class='title text-noir'>Commentaire(s), remarques du tuteur en entreprise</h4>"
			html += "<div>"+UICom.structure["ui"][this.comments_nodeid].resource.getView()+"</div>";
			html += "</span></div>";
		}	
		//----------------------------------------------------------------------------------------------------
		html += "</div><!-- class='panel-collapse collapse in'-->";
		html += "</div><!-- class=''panel ...'-->";
	}
	var obj = $(html);
	$("#"+destid).append(obj);
	//--------------------------------------------------
	for (var i=0; i<this.contacts.length; i++){
		this.contacts[i].displayView(this.contacts[i].id,'detail');
	}
	//------------------ evaluation----------------------------------------
	if ($('#scroll_'+this.id).hasVerticalScrollBar())  // si scrollbar décaler en-têtes évaluations
		$('#ethead_'+this.id).css('width','97%');
	getEvaluations_displayView(view_eval_competences);
	showHeaderEvaluationTable();
};
//==================================
UIFactory["Projet"].prototype.displayEditor = function(destid,type,lang) {
//==================================
	var lang_local = 0; // fr
	var html = "";
	$("#"+destid).html(html);
	var div = "";
	if (this.referent_prenom_nodeid!=undefined)
		div = $("<div class='alert alert-vert alert-block edition'></div>");
	else
		div = $("<div class='alert alert-vert alert-block edition old-project'></div>");
	$("#"+destid).append(div);
	html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:projets_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
	html += "Quitter le mode édition";
	html += "</a>";
	$(div).append($(html));
	$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'>Votre rôle dans l'action </label>"));
	$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());
	var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
	$(div).append($(row));

	$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getEditor("formA_"+this.id,"Année de début","debut_"+this.id,this.begin_nodeid);
	displayControlGroup_getEditor("formA_"+this.id,"Durée","fin_"+this.id,this.duration_nodeid);
	displayControlGroup_displayEditor("formA_"+this.id,"Domaine métiers<span id='help-domaine-metier'></span>","dommet_"+this.id,this.domaine_metier_nodeid,"select");
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getEditor("formA_"+this.id,"Organisme de formation<span id='help-organisme-formation'></span>","school_"+this.id,this.school_nodeid);
	displayControlGroup_getEditor("formA_"+this.id,"Dans le cadre de la formation","statut_"+this.id,this.cadre_nodeid);
	displayControlGroup_displayEditor("formA_"+this.id,"Rapport","rapport_"+this.id,this.rapport_nodeid);

	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>Principales missions</label><p><i>Formuler les principales missions que vous avez menées</i></p>"));
	UICom.structure["ui"][this.missions_nodeid].resource.displayEditor("formA_"+this.id,'x100');
	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>Principales réalisations</label><p><i>Préciser les réalisations concrètes liées à cette action (ex: étude comparative de solutions, rapport d'audit, cahier des charges, etc.)</i></p>"));
	UICom.structure["ui"][this.realizations_nodeid].resource.displayEditor("formA_"+this.id,'x100');

	$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
	
	//------------------ Tuteur ------------------
	if (this.referent_prenom_nodeid!=undefined) {
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Évaluateur</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		displayControlGroup_getEditor("formB_"+this.id,"Prénom","refprenom"+this.id,this.referent_prenom_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Nom","refnom"+this.id,this.referent_nom_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Courriel","email_"+this.id,this.referent_email_nodeid);
	}
	//------------------ Contacts ---------------------------------
	$("#formB_"+this.id).append($("<h5>Contacts professionnels des organisations avec lesquels vous avez collaboré</h5>"));
	$("#formB_"+this.id).append($("<div class='item'>(commenditaires, partenaires, fournisseurs, ...)</div><br/>"));
	$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Contact </label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
	this.contacts[0].displayEditor(this.id,"formB_"+this.id,'detail',false);
	for (var i=1; i<this.contacts.length; i++){
		$("#formB_"+this.id).append($("<div class='controls'><hr style='margin-top:11px;'></div>"));
		this.contacts[i].displayEditor(this.id,"formB_"+this.id,'detail',true);
	}
	

	//+ autre contact

	if (g_userrole=='etudiant') {
		var parentid = $("asmUnitStructure:has(metadata[semantictag='project-contacts-section'])", this.node).attr('id');
		var databack = false;
		var callback = "UIFactory['Projet'].reloadparseone";
		var param2 = "'"+this.id+"'";
		var param3 = "'projets-detail_histo_"+this.id+"'";
		var param4 = "hideMessageBox";
		$("#formB_"+this.id).append($("<div style='margin-bottom:15px;padding-bottom:5px;'><a  class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2composantes.IUT2-parts','fullcontact',"+databack+","+callback+","+param2+","+param3+","+param4+")\">Ajouter un contact lié à cette action <i class='fa fa-plus-square'></i></a></div>"));
	}

	$("#formB_"+this.id).append($("<hr style='margin-top:15px;'></hr>"));
	$("#formB_"+this.id).append($("<label class='inline'>Apport de cette expérience dans mon projet personnel professionel</label>"));
	UICom.structure["ui"][this.apport_nodeid].resource.displayEditor("formB_"+this.id,'x100');
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cette action","Projet","projets-detail_histo_","vert","projets_byid");
	//-----------------------------------------------------------------------
	if (this.referent_prenom_nodeid!=undefined)
		html += getEvaluationCodes_bytypes(['evaluateur','autoeval']);
	else
		html += getEvaluationCodes_bytypes(['autoeval']);
	//----------------------------------------------------------------------------------------------------
	$(div).append($(html));
	//------------------ evaluation----------------------------------------
	getEvaluations_display(view_eval_competences,eval_competences);
	//---------------------------------------------------------------------
	if (this.referent_prenom_nodeid!=undefined) {
		if (g_userrole=='tuteur') {
			html = "<div class='row-fluid'><span class='span10'><form id='formC_"+this.id+"' class='form-horizontal'></form></span></div>";
			$(div).append($(html));
			$("#formC_"+this.id).append($("<h4 class='title'>"+appStr[languages[lang_local]]['comments-tutor']+"</h4>"));
			UICom.structure["ui"][this.comments_nodeid].resource.displayEditor("formC_"+this.id,'x200');
		}
		if (g_userrole=='etudiant') {
			html = "<div class='row-fluid'>";
			html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:projets_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
			html += "Quitter le mode édition";
			html += "</a>";
			if (eval_competences.length>0) {
				html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:projets_byid['"+this.id+"'].updateOwner();getEnvoiFormulaireEvaluationBox('"+this.id+"','"+destid+"',eval_competences,"+lang_local+",'Projet')\" data-title='formulaire' rel='tooltip'>";
				html += "Envoyer la demande d'évaluation à l'évaluateur";
				html += "</a>";		
			}
		}
		html += "</div>";
		$(div).append($(html));
	}
	if ($('#scroll_'+this.id).hasVerticalScrollBar())  // si scrollbar décaler en-têtes évaluations
		$('#ethead_'+this.id).css('width','97%');
	showHeaderEvaluationTable();
	//------------------ bulles d'information----------------------------------------
	UIFactory.Help.displayAll()
};

//==================================
UIFactory["Projet"].reloadparseone = function(uuid,destid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='project-unit'])",data);
			projets_byid[uuid] = new UIFactory["Projet"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			projets_byid[uuid].displayEditor(destid);
			if (callback!=null)
				callback(param1,param2,param3,param4);
//			hideMessageBox();
		}
	});
};

//==================================
UIFactory["Projet"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			UIFactory["Projet"].parse(data);
			if (uuid!=null)
				projets_byid[uuid].displayEditor(destid);
			else {
				Projets_Display('projets-short_histo','short');
				Projets_Display('projets-detail_histo','detail',parentid);
				Projets_Display('projets_cv','cv');
			}
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};

//==================================
UIFactory["Projet"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		projets_byid[parentid].displayEditor(destid);
	else {
		Projets_Display('projets-short_histo','short');
		Projets_Display('projets-detail_histo','detail',$("asmStructure:has(metadata[semantictag='projects'])", g_portfolio_current).attr('id'));
		Projets_Display('projets_cv','cv');
	}
};

//==================================
UIFactory["Projet"].parse = function(data) 
//==================================
{
	projets_byid = {};
	projets_list = [];
	var units = $("asmUnit:has(metadata[semantictag='project-unit'])",data);
	var tableau = new Array();
	for ( var i = 0; i < units.length; i++) {
		var uuid = $(units[i]).attr('id');
		projets_byid[uuid] = new UIFactory["Projet"](units[i]);
		//------------------
		var date_debut = UICom.structure["ui"][$("asmContext:has(metadata[semantictag='date-begin'])",units[i]).attr('id')].resource.getView();
		tableau[i] = [date_debut,uuid];
	}
	var newTableau = tableau.sort(sortOn1Desc);
	for (var i=0; i<newTableau.length; i++){
		projets_list[i] = projets_byid[newTableau[i][1]];
	}
};

//==================================
UIFactory["Projet"].remove = function(uuid,parentid,destid)
//==================================
{
	UICom.DeleteNode(uuid);
	if(parentid!="undefined" && destid!="undefined"){
		$("#"+uuid,projets_byid[parentid].node).remove();
		projets_byid[uuid] = new UIFactory["Projet"](projets_byid[parentid].node);
		projets_byid[parentid].displayEditor(destid);
	} else {
		$("#"+uuid,g_portfolio_current).remove();
		UIFactory["Projet"].parse(g_portfolio_current);
		Projets_Display('projets-short_histo','short');
		Projets_Display('projets-detail_histo','detail',$("asmStructure:has(metadata[semantictag='projects'])", g_portfolio_current).attr('id'));
		Projets_Display('projets_cv','cv');
	}
	// Mises à jour des compétences
	displayCompetencesMetiers(g_portfolio_current);
	displayCompetencesTrans(g_portfolio_current);
	displayCompetencesAutres(g_portfolio_current);
};

//==================================
UIFactory["Projet"].prototype.get_data2send = function()
//==================================
{
	var str = "<Projet>";
	str += getCompetencies2send(this.node,['autoeval']);	
	str += "</Projet>";
//	alert(str);
	return str;
};

//==================================
function Projets_Display(destid,type,parentid) {
//==================================
	$("#"+destid).html("");
	var html ="";
	if (type=='detail') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		var databack = false;
		var callback = "UIFactory['Projet'].reloadparse";
		var param2 = "null";
		var param3 = "'"+destid+"'";
		var param4 = "'"+parentid+"'";
		html += "<div class='titre2'><span class='titre1'>Actions étudiantes</span><span id='help-projet-etudiant-label'></span>";
		if (g_userrole=='etudiant') {
			html += "<a  class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2composantes.IUT2-parts','project-unit',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
			html += "Ajouter une action étudiante <i class='fa fa-plus-square'>";
			html += "</a></div>";
		}
	}
	if (type=='short' &&  projets_list.length>0)
		html += "<h5>Actions étudiantes</h5>";
	if (type=='detail' || type=='short') {
		html += "<div class='panel-group' id='accordion_"+destid+"'></div>";
		$("#"+destid).html(html);
		for ( var i = 0; i < projets_list.length; i++) {
			$("#accordion_"+destid).append($("<div id='"+destid+"_"+projets_list[i].id+"'></div>"));			
			projets_list[i].displayView(destid+"_"+projets_list[i].id,type,null,"accordion_"+destid);
		}
	}
	if (type=='cv') {
		for ( var i = 0; i < projets_list.length; i++) {
			var uuid = projets_list[i].id;
			$("#"+destid).append($("<div id='exp_"+uuid+"'></div>"));			
			projets_list[i].displayView("exp_"+uuid,'cv',null,"accordion_"+destid);
		}
	}
}

//==================================
UIFactory["Projet"].prototype.updateOwner = function()
//==================================
{
	var nodeid  = $("asmContext:has(metadata[semantictag='nom-etudiant'])",this.node).attr('id');
	var xml = "<asmResource xsi_type='Field'>";
	xml += "<text lang='fr'>"+USER.firstname_node.text()+" "+USER.lastname_node.text()+"</text>";
	xml += "<text lang='en'>"+USER.firstname_node.text()+" "+USER.lastname_node.text()+"</text>";
	xml += "</asmResource>";
	$.ajax({
		type : "PUT",
		contentType: "application/xml",
		dataType : "text",
		data : xml,
		url : "../../../"+serverBCK+"/resources/resource/" + nodeid,
		success : function() {
		}
	});
};

//==================================
UIFactory["Projet"].reloadparseone_submitted = function(uuid,destid) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='project-unit'])",data);
			projets_byid[uuid] = new UIFactory["Projet"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			projets_byid[uuid].displayView(destid+"_"+uuid,"detail",null,"accordion_"+destid);
		}
	});
};

//==================================
UIFactory["Projet"].prototype.displayEditor_demandeEval= function(destid,type,lang) {
//==================================
	appStr['fr']['sending']="Envoi ...";
	//---------
	appStr['en']['sending']="Sending ...";

	var writenode = ($("asmContext:has(metadata[semantictag='comments-tuteur'])",this.node).attr('write')=='Y')? true:false;
	if (writenode)
		$("#alert-window").modal('show');
	var lang_local = lang;
	if (lang==null) lang_local=LANGCODE;
	var submittednode = ($("metadata-wad",this.node).attr('submitted')=='Y')? true:false;
	var html = "";
	$("#"+destid).html(html);
	var div = "";
	if (this.referent_prenom_nodeid!=undefined)
		div = $("<div class='alert alert-vert alert-block edition'></div>");
	else
		div = $("<div class='alert alert-vert alert-block edition old-project'></div>");
	$("#"+destid).append(div);
	$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'>Rôle dans l'action : </label>"));
	$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getLabel());
	var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
	$(div).append($(row));

	$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getView("formA_"+this.id,"Année de début","debut_"+this.id,this.begin_nodeid);
	displayControlGroup_getView("formA_"+this.id,"Durée","fin_"+this.id,this.duration_nodeid);
	displayControlGroup_displayView("formA_"+this.id,"Domaine métiers<span id='help-domaine-metier'></span>","dommet_"+this.id,this.domaine_metier_nodeid,"select");
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getView("formA_"+this.id,"Organisme de formation<span id='help-organisme-formation'></span>","school_"+this.id,this.school_nodeid);
	displayControlGroup_getView("formA_"+this.id,"Dans le cadre de la formation","statut_"+this.id,this.cadre_nodeid);
	displayControlGroup_getView("formA_"+this.id,"Rapport","rapport_"+this.id,this.rapport_nodeid);

	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>Principales missions</label></p>"));
	var mission = "<div>"+UICom.structure.ui[this.missions_nodeid].resource.getView()+"</div>";
	$("#formA_"+this.id).append($(mission));
	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>Principales réalisations</label>"));
	$("#formA_"+this.id).append($("<div>"+UICom.structure.ui[this.realizations_nodeid].resource.getView()+"</div>"));
	$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
	
	//------------------ Tuteur ------------------
	if (this.referent_prenom_nodeid!=undefined) {
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Évaluateur</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		displayControlGroup_getView("formB_"+this.id,"Prénom","refprenom"+this.id,this.referent_prenom_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Nom","refnom"+this.id,this.referent_nom_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Courriel","email_"+this.id,this.referent_email_nodeid);
	}
	//---------------- Contacts ------------------
	if (this.contacts.length)
		var html = "<div class='titre-contacts'>Contact(s) :</div>";
	html += "<div class='contacts'>"
	for (var i=0; i<this.contacts.length; i++){
		html += "<div class='contact' id='"+this.contacts[i].id+"'></div>";
	}
	html += "</div><!-- contacts -->";
	//-----------------------------------
	var obj = $(html);
	$("#formB_"+this.id).append(obj);
	//--------------------------------------------------
	for (var i=0; i<this.contacts.length; i++){
		this.contacts[i].displayView(this.contacts[i].id,'detail');
	}

	//+ autre contact

	$("#formB_"+this.id).append($("<hr style='margin-top:15px;'></hr>"));
	$("#formB_"+this.id).append($("<label class='inline'>Apport de cette expérience dans mon projet personnel professionel</label>"));
	$("#formB_"+this.id).append($("<div>"+UICom.structure.ui[this.apport_nodeid].resource.getView()+"</div>"));
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cette action","Projet","projets-detail_histo_","vert","projets_byid");
	//-----------------------------------------------------------------------
	if (this.referent_prenom_nodeid!=undefined)
		html += getEvaluationCodes_bytypes(['evaluateur','autoeval']);
	else
		html += getEvaluationCodes_bytypes(['autoeval']);
	//----------------------------------------------------------------------------------------------------
	$(div).append($(html));
	//------------------ evaluation----------------------------------------
	getEvaluations_display(view_eval_competences,eval_competences);
	//---------------------------------------------------------------------
	if ($('#scroll_'+this.id).hasVerticalScrollBar())  // si scrollbar décaler en-têtes évaluations
		$('#ethead_'+this.id).css('width','97%');
	var buttons_senEval ="";
	if (g_userrole=='tuteur') {
		html = "<div class='row-fluid'><span class='span10'><form id='formC_"+this.id+"' class='form-horizontal'></form></span></div>";
		$(div).append($(html));
		$("#formC_"+this.id).append($("<h4 class='title'>"+appStr[languages[lang_local]]['comments-evaluateur']+"</h4>"));
		if (submittednode && writenode) {
			UICom.structure["ui"][this.comments_nodeid].resource.displayEditor("formC_"+this.id,'x200');			
			html = "<div class='row-fluid'>";
			if (eval_competences.length>0 ||this.eval_qualites_perso.length>0) {
				html += "<span id='sendEval1_"+this.id+"'>";
				buttons_senEval += "<a id='sendEval1_btn_"+this.id+"' class='btn btn-mini btn-vert editbutton' onclick=\"javascript:setMessageBox('"+appStr[languages[lang_local]]['sending']+"');showMessageBox();envoyerEvaluation('"+this.id+"','"+destid+"',"+lang_local+")\" data-title='formulaire' rel='tooltip'>";
				buttons_senEval += appStr[languages[lang_local]]['send-eval'];
				buttons_senEval += "</a>";		
				html += buttons_senEval;
				html += "</span>";
				$("#sendEval2_"+this.id).append(buttons_senEval);
			}
			html += "</div>";
			$(div).append($(html));
		} else{
			$("#formC_"+this.id).append($("<div>"+UICom.structure["ui"][this.comments_nodeid].resource.getView()+"</div>"));
		}			
	}
	showHeaderEvaluationTable();
	//--------------------------------------------------------------------------
	
};

//==================================
function envoyerEvaluation(uuid,destid,lang,type) {
//==================================
	for (var i=1; i<=2; i++){
		$("#sendEval"+i+"_"+uuid+" > a").attr('disabled',true);
		$("#sendEval"+i+"_"+uuid+" > a").attr('onclick','');
	}
	var urlS = "../../../"+serverBCK+'/nodes/node/'+uuid+'/action/submit';
	$.ajax({
		type : "POST",
		dataType : "text",
		contentType: "application/xml",
		url : urlS,
		uuid : uuid,
		success : function (data){
			$.ajax({
				type : "GET",
				dataType : "xml",
				url : "../../../"+serverBCK+"/nodes/node/" + g_uuid,
				success : function(data) {
					window.location.reload();
				}
			});
		}
	});
}

