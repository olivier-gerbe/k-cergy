//========================================================
//========================================================
//===================== EXPERIENCE =======================
//========================================================
//========================================================

var experiences_byid = {};
var experiences_list = [];

//==================================
UIFactory["Experience"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.begin_nodeid = $("asmContext:has(metadata[semantictag='date-begin'])",node).attr('id');
	this.end_nodeid = $("asmContext:has(metadata[semantictag='date-end'])",node).attr('id');
	this.secteur_pro_nodeid = $("asmContext:has(metadata[semantictag='secteur-pro'])",node).attr('id');
	this.secteur_environnement_nodeid = $("asmContext:has(metadata[semantictag='secteur-environnement'])",node).attr('id');
	this.categorie_nodeid = $("asmContext:has(metadata[semantictag='emploi-categorie'])",node).attr('id');
	this.statut_nodeid = $("asmContext:has(metadata[semantictag='emploi-statut'])",node).attr('id');
	this.realizations_nodeid = $("asmContext:has(metadata[semantictag='job-realizations'])",node).attr('id');
	this.missions_nodeid = $("asmContext:has(metadata[semantictag='job-missions'])",node).attr('id');
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
UIFactory["Experience"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // to empty html
	if (type==null || type=='cv') {
		html = "<div class='row experience_pro'><div class='span3'>";
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
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;"
		html += "<a href='#' onclick=\"javascript:$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"');$('#tabs_histo li:eq(3) a').tab('show')\">";
		html += "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.id].getLabel(destid+"_short_label","span") + "</span>";
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
			html += "<span  class='editbutton' onclick=\"javascript: confirmDel('"+this.id+"','Experience')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
			html += "<span  class='editbutton' onclick=\"javascript:experiences_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
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
		html += "<div class='item'>Domaine métiers<span id='help-emploi-1'></span> : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Secteur / Environnement<span id='help-emploi-2'></span> : <span class='value'>"+UICom.structure["ui"][this.secteur_environnement_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Catégorie<span id='help-emploi-3'></span> : <span class='value'>"+UICom.structure["ui"][this.categorie_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Statut<span id='help-emploi-4'></span> : <span class='value'>"+UICom.structure["ui"][this.statut_nodeid].resource.getView()+"</span></div>";
		html += "<h6>Principales missions<span id='help-emploi-5'></span></h6>";
		html += "<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>";
		html += "<h6>Principales réalisations<span id='help-emploi-6'></span></h6>";
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		html += "<div class='span6 organisme'>";
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
		html += "<br/><div class='item'>Référent dans l'organisme :</div>";

		html += "<div class='value'>"+UICom.structure["ui"][this.referent_prenom_nodeid].resource.getView();
		html += " "+UICom.structure["ui"][this.referent_nom_nodeid].resource.getView();
		if (UICom.structure["ui"][this.referent_titre_nodeid].resource.getView()!="")
			html += ", "+UICom.structure["ui"][this.referent_titre_nodeid].resource.getView();
		html += "</div>";
		html += "<div class='item'><a href='mailto:"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"'>"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"</a>";
		if (UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView()!="")
			html += " Tel: "+UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView();
		html += "</div>";

		html += "</div><!-- span -->";
		html += "</div><!-- row -->";
		//----------------------------------------------------------------------------------------------------
		html += "<div class='row-fluid competences-titre'>";
		//-----------------------------------------------------------------------
		view_eval_competences = new Array();
		html += "<span class='span6'><h4>Compétences liées à cet emploi</h4></span>";
		html += "</div>";
		html += "<div class='row-fluid'>";
		html += "<span class='span6'>";
		html += "<h5>Compétences métiers</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Experience',0);
		//---------------------------------------------
		var tableauActivitesMetierPPN = getTableauActivitesMetierPPN(this.comps_metiers_node,'activite','competence-metier');
		var tableauActivitesMetierFree = getTableauActivitesMetierFree(this.comps2_metiers_node,'dom-metier-ref','free-comp-metier');
		var tableauActivitesMetier = tableauActivitesMetierPPN.concat(tableauActivitesMetierFree);
		var tableauActivitesMetierTrie = tableauActivitesMetier.sort(sortOn1);
		html += getCompetencies3(tableauActivitesMetierTrie,false,'Experience',this.id,destid,0);
//		html += getCompetencies2(this.comps_metiers_node,false,'Experience',this.id,destid,'activite','competence-metier',0);
//		html += getCompetencies2(this.comps2_metiers_node,false,'Experience',this.id,destid,'dom-metier-ref','free-comp-metier',0);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span6'>";
		html += "<h5>"+appStr['fr']['competencies-other']+"</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Experience',1);
		//---------------------------------------------
		html += getCompetencies2(this.comps_autres_node,false,'Experience',this.id,destid,'activite','competence-trans',1);
		html += getCompetencies2(this.comps2_autres_node2a,false,'Experience',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2b,false,'Experience',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2c,false,'Experience',this.id,destid,'dom-autre-ref','free-comp-autre',1);
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
	var obj = $(html);
	$("#"+destid).append(obj);
	//------------------ evaluation----------------------------------------
	if ($('#scroll_'+this.id).hasVerticalScrollBar())  // si scrollbar décaler en-têtes évaluations
		$('#ethead_'+this.id).css('width','97%');
	getEvaluations_displayView(view_eval_competences);
	showHeaderEvaluationTable();
};

//==================================
UIFactory["Experience"].prototype.displayEditor = function(destid,type,lang)
//==================================
{
	var html = "";
	var div = $("<div class='alert alert-vert alert-block edition'></div>");
	$("#"+destid).html(div);
	html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:experiences_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
	html += "Quitter le mode édition";
	html += "</a>";
	$(div).append($(html));
	$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'>Libellé du poste </label>"));
	$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());
	var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
	$(div).append($(row));

	$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
	displayControlGroup_getEditor("formA_"+this.id,"Année de début","debut_"+this.id,this.begin_nodeid);
	displayControlGroup_getEditor("formA_"+this.id,"Année de fin","fin_"+this.id,this.end_nodeid);
	displayControlGroup_displayEditor("formA_"+this.id,"Domaine métiers<span id='help-domaine-metier'></span>","dommet_"+this.id,this.domaine_metier_nodeid,"select");
	displayControlGroup_displayEditor("formA_"+this.id,"Secteur / Environnement","senv_"+this.id,this.secteur_environnement_nodeid,"select");
	displayControlGroup_displayEditor("formA_"+this.id,"Catégorie<span id='help-emploi-categorie'></span>","cat_"+this.id,this.categorie_nodeid,"radio-inline");
	displayControlGroup_displayEditor("formA_"+this.id,"Statut<span id='help-emploi-statut'></span>","statut_"+this.id,this.statut_nodeid,"radio-inline");

	$("#formA_"+this.id).append($("<label class='inline'>Principales missions<span id='help-missions'></span></label><p><i>Formuler les principales missions qui vous ont été confiées (voir votre fiche de poste)</i></p>"));
	UICom.structure["ui"][this.missions_nodeid].resource.displayEditor("formA_"+this.id,'x100');
	$("#formA_"+this.id).append($("<label class='inline'>Principales réalisations<span id='help-realisations'></span></label><p><i>Préciser les réalisations concrètes qui vous ont permis de remplir vos missions (ex: étude comparative de solutions, réalisation d'un rapport d'audit, Réalisation d'un cahier des charges, etc.)</i></p>"));
	UICom.structure["ui"][this.realizations_nodeid].resource.displayEditor("formA_"+this.id,'x100');

	$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
	displayControlGroup_getEditor("formB_"+this.id,"Organisme<span id='help-emploi-organisme'></span>","org_"+this.id,this.name_nodeid);
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
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cet emploi","Experience","experiences-detail_histo_","vert","experiences_byid");
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

//==================================
UIFactory["Experience"].reloadparseone = function(uuid,destid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='job-unit'])",data);
			experiences_byid[uuid] = new UIFactory["Experience"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			experiences_byid[uuid].displayEditor(destid);
			if (callback!=null)
				callback(param1,param2,param3,param4);
		}
	});
};

//==================================
UIFactory["Experience"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			UIFactory["Experience"].parse(data);
			if (uuid!=null)
				experiences_byid[uuid].displayEditor(destid);
			else {
				Experiences_Display('experiences-short_histo','short');
				Experiences_Display('experiences-detail_histo','detail',parentid);
				Experiences_Display('experiences_cv','cv');
			}
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};


//==================================
UIFactory["Experience"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		experiences_byid[parentid].displayEditor(destid);
	else {
		Experiences_Display('experiences-short_histo','short');
		Experiences_Display('experiences-detail_histo','detail',$("asmStructure:has(metadata[semantictag='jobs'])", g_portfolio_current).attr('id'));
		Experiences_Display('experiences_cv','cv');
	}
};

//==================================
UIFactory["Experience"].parse = function(data) 
//==================================
{
	experiences_byid = {};
	experiences_list = [];
	var units = $("asmUnit:has(metadata[semantictag='job-unit'])",data);
	var tableau = new Array();
	for ( var i = 0; i < units.length; i++) {
		var uuid = $(units[i]).attr('id');
		experiences_byid[uuid] = new UIFactory["Experience"](units[i]);
		//------------------
		var date_fin = UICom.structure["ui"][$("asmContext:has(metadata[semantictag='date-end'])",units[i]).attr('id')].resource.getView();
		tableau[i] = [date_fin,uuid];
	}
	var newTableau = tableau.sort(sortOn1Desc);
	for (var i=0; i<newTableau.length; i++){
		experiences_list[i] = experiences_byid[newTableau[i][1]];
	}
};

//==================================
UIFactory["Experience"].remove = function(uuid,parentid,destid)
//==================================
{
	UICom.DeleteNode(uuid);
	if(parentid!="undefined" && destid!="undefined"){
		$("#"+uuid,experiences_byid[parentid].node).remove();
		experiences_byid[uuid] = new UIFactory["Experience"](experiences_byid[parentid].node);
		experiences_byid[parentid].displayEditor(destid);
	} else {
		$("#"+uuid,g_portfolio_current).remove();
		UIFactory["Experience"].parse(g_portfolio_current);
		Experiences_Display('experiences-short_histo','short');
		Experiences_Display('experiences-detail_histo','detail',$("asmStructure:has(metadata[semantictag='jobs'])", g_portfolio_current).attr('id'));
		Experiences_Display('experiences_cv','cv');
	}
	// Mises à jour des compétences
	displayCompetencesMetiers(g_portfolio_current);
	displayCompetencesTrans(g_portfolio_current);
	displayCompetencesAutres(g_portfolio_current);
};

//==================================
UIFactory["Experience"].prototype.get_data2send_csv = function()
//==================================
{
	var str = "###EXPERIENCE###;";
	str += getDataByTypeTag_csv("text",this.node,"estb-name");
	str += getDataByTypeTag_csv("text",this.node,"service");
	str += getDataByTypeTag_csv("url",this.node,"website");
	str += getDataByTypeTag_csv("value",this.node,"secteur-environnement");
	str += getDataByTypeTag_csv("text",this.node,"postalcode");
	str += getDataByTypeTag_csv("text",this.node,"town");
	str += getDataByTypeTag_csv("text",this.node,"country");
	str += getDataByTypeTag_csv("text",this.node,"job-realizations");
	str += getDataByTypeTag_csv("text",this.node,"job-missions");
	str += getQualitesPerso2send_csv(this.node);	
	str += getCompetencies2send_csv(this.node,['autoeval']);	
	var newresult = str.replace(/<[^>]*>/gi,"");  // retire toutes les balises html
	return newresult;
};

//==================================
UIFactory["Experience"].prototype.get_data2send_xml = function()
//==================================
{
	var str = "<Experience>";
	str += getDataByTypeTag_xml("organisme","text",this.node,"estb-name");
	str += getDataByTypeTag_xml("service","text",this.node,"service");
	str += getDataByTypeTag_xml("url","url",this.node,"website");
	str += getDataByTypeTag_xml("secteur","value",this.node,"secteur-environnement");
	str += getDataByTypeTag_xml("code-postal","text",this.node,"postalcode");
	str += getDataByTypeTag_xml("ville","text",this.node,"town");
	str += getDataByTypeTag_xml("pays","text",this.node,"country");
	str += getDataByTypeTag_xml("job-realizations","text",this.node,"job-realizations");
	str += getDataByTypeTag_xml("job-missions","text",this.node,"job-missions");
	str += getQualitesPerso2send_xml(this.node);	
	str += getCompetencies2send_xml(this.node,['autoeval']);	
	str += "</Experience>";
	var regex1 = /<br>/gi;
	var regex2 = /&nbsp;/gi;
	var regex3 = /&/gi;
	var newresult = str.replace(regex1," ").replace(regex2," ").replace(regex3," ");
//	alert(str);
	return newresult;
};

//==================================
function Experiences_Display(destid,type,parentid) {
//==================================
	$("#"+destid).html("");
	var html ="";
	if (type=='detail') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		var databack = false;
		var callback = "UIFactory['Experience'].reloadparse";
		var param2 = "null";
		var param3 = "'"+destid+"'";
		var param4 = "'"+parentid+"'";
		html += "<div class='titre2'><span class='titre1'>Emplois</span><span id='help-emploi-label'></span>";
		if (g_userrole=='etudiant') {
			html += "<a  class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2composantes.IUT2-parts','job-unit',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
			html += "Ajouter un emploi <i class='fa fa-plus-square'>";
			html += "</a></div>";
		}
	}
	if (type=='short' &&  experiences_list.length>0)
		html += "<h5>Emploi(s)</h5>";
	if (type=='detail' || type=='short') {
		html += "<div class='panel-group' id='accordion_"+destid+"'></div>";
		$("#"+destid).html(html);
		for ( var i = 0; i < experiences_list.length; i++) {
			$("#accordion_"+destid).append($("<div id='"+destid+"_"+experiences_list[i].id+"'></div>"));			
			experiences_list[i].displayView(destid+"_"+experiences_list[i].id,type,null,"accordion_"+destid);
		}
	}
	if (type=='cv') {
		for ( var i = 0; i < experiences_list.length; i++) {
			var uuid = experiences_list[i].id;
			$("#"+destid).append($("<div id='exp_"+uuid+"'></div>"));			
			experiences_list[i].displayView("exp_"+uuid,'cv',null,"accordion_"+destid);
		}
	}
}