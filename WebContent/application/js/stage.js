		
//========================================================
//========================================================
//===================== STAGE ============================
//========================================================
//========================================================

var stages_byid = {};
var stages_list = [];

//==================================
UIFactory["Stage"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.begin_nodeid = $("asmContext:has(metadata[semantictag='date-begin'])",node).attr('id');
	this.duration_nodeid = $("asmContext:has(metadata[semantictag='duration'])",node).attr('id');
	this.secteur_pro_nodeid = $("asmContext:has(metadata[semantictag='secteur-pro'])",node).attr('id');
	this.secteur_environnement_nodeid = $("asmContext:has(metadata[semantictag='secteur-environnement'])",node).attr('id');
	this.school_nodeid = $("asmContext:has(metadata[semantictag='school'])",node).attr('id');
	this.cadre_nodeid = $("asmContext:has(metadata[semantictag='cadre-formation'])",node).attr('id');
	this.realizations_nodeid = $("asmContext:has(metadata[semantictag='job-realizations'])",node).attr('id');
	this.missions_nodeid = $("asmContext:has(metadata[semantictag='job-missions'])",node).attr('id');
	this.attestation_nodeid = $("asmContext:has(metadata[semantictag='attestation'])",node).attr('id');
	this.memoire_nodeid = $("asmContext:has(metadata[semantictag='memoire'])",node).attr('id');
	this.apport_nodeid = $("asmContext:has(metadata[semantictag='apport'])",node).attr('id');
	this.comp_attestation_nodeid = $("asmContext:has(metadata[semantictag='comp-attestation'])",node).attr('id');
	this.domaine_metier_nodeid = $("asmContext:has(metadata[semantictag='domaine-metier'])",node).attr('id');
	this.stage_entreprise_taille_nodeid = $("asmContext:has(metadata[semantictag='stage-entreprise-taille'])",node).attr('id');
	this.stage_entreprise_nat_nodeid = $("asmContext:has(metadata[semantictag='stage-entreprise-nat'])",node).attr('id');
	//------------------------
	this.formulaire_nodeid = $("asmContext:has(metadata[semantictag='formulaire'])",node).attr('id');
	//------------------------
	this.name_nodeid  = $("asmContext:has(metadata[semantictag='estb-name'])",node).attr('id');
	this.street_nodeid  = $("asmContext:has(metadata[semantictag='street'])",node).attr('id');
	this.town_nodeid  = $("asmContext:has(metadata[semantictag='town'])",node).attr('id');
	this.postalcode_nodeid  = $("asmContext:has(metadata[semantictag='postalcode'])",node).attr('id');
	this.country_nodeid  = $("asmContext:has(metadata[semantictag='country'])",node).attr('id');
	this.stage_lieu_nodeid = $("asmContext:has(metadata[semantictag='stage-lieu'])",node).attr('id');
	this.website_nodeid  = $("asmContext:has(metadata[semantictag='website'])",node).attr('id');
	this.logo_nodeid  = $("asmContext:has(metadata[semantictag='logo'])",node).attr('id');
	this.service_nodeid  = $("asmContext:has(metadata[semantictag='service'])",node).attr('id');

	this.referent_prenom_nodeid  = $("asmContext:has(metadata[semantictag='referent-prenom'])",node).attr('id');
	this.referent_nom_nodeid  = $("asmContext:has(metadata[semantictag='referent-nom'])",node).attr('id');
	this.referent_titre_nodeid  = $("asmContext:has(metadata[semantictag='referent-titre'])",node).attr('id');
	this.referent_email_nodeid  = $("asmContext:has(metadata[semantictag='referent-email'])",node).attr('id');
	this.referent_telephone_nodeid  = $("asmContext:has(metadata[semantictag='referent-telephone'])",node).attr('id');
	//---- contacts -------------------
	this.contacts = [];
	var contacts_sect = $("asmUnitStructure:has(metadata[semantictag='contact'])",node);
	for ( var i = 1; i < contacts_sect.length; i++) {
		this.contacts[i-1] = new UIFactory['Contact'](contacts_sect[i]);
	}
	// ---------------------------------------
	this.comp_traduction_nodeid = $("asmContext:has(metadata[semantictag='comp-traduction'])",node).attr('id');
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

	this.eval_competences = [];
	this.view_eval_competences = [];
	this.eval_qualites_perso = [];
	this.view_eval_qualites_perso = [];

	// ---------------------------------------
	this.qualites_perso_node = $("metadata[semantictag*='section-qualite_perso']",node).parent();
	this.comments_nodeid  = $("asmContext:has(metadata[semantictag='comments-tuteur'])",node).attr('id');
};

//==================================
UIFactory["Stage"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var lang_local = lang;
	if (lang==null) lang_local=0;
	var html = "";
	$("#"+destid).html(html);  // to empty html
	if (type==null || type=='cv') {
		html = "<div class='row stage'><div class='span3'>";
		html += " <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " - <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.duration_nodeid].resource.getView(destid+"_short_end") + "</span>";
		html += "</div><div class='span8'>";
		html += "<span id='"+destid+"_short_label' class='job_title'>"+UICom.structure["ui"][this.id].getView(destid+"_short_label") + "</span>";
		html += "<div class='organisme' id='"+destid+"_organisme'>"+UICom.structure["ui"][this.name_nodeid].resource.getView(destid+"_organisme")+"</div>";
		html += "<div id='"+destid+"_missions'>"+UICom.structure["ui"][this.missions_nodeid].resource.getView(destid+"_missions")+"</div>";
		html += "<div id='"+destid+"_realizations'>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView(destid+"_realizations")+"</div>";
		html += "</div></div>";
	}
	if (type==null || type=='short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;";
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
			html += "<span  class='editbutton' onclick=\"javascript: confirmDel('"+this.id+"','Stage')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
			html += "<span  class='editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
//			html += "<span  class='editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayEditor_demandeEval('"+destid+"');\" data-title='éditer' rel='tooltip'>";
			
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
		html += "<div class='item'>"+appStr[languages[lang_local]]['business-domain']+" : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
//		html += "<div class='item'>Secteur / Environnement : <span class='value'>"+UICom.structure["ui"][this.secteur_environnement_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>"+appStr[languages[lang_local]]['organism-provenance']+" : <span class='value'>"+UICom.structure["ui"][this.school_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>"+appStr[languages[lang_local]]['formation-context']+" : <span class='value'>"+UICom.structure["ui"][this.cadre_nodeid].resource.getView()+"</span></div>";
		if (UICom.structure["ui"][this.attestation_nodeid].resource.getView()!="")
		html += "<div class='item'>"+appStr[languages[lang_local]]['internship-attestation']+" : <span class='value'>"+UICom.structure["ui"][this.attestation_nodeid].resource.getView()+"</span></div>";
		if (UICom.structure["ui"][this.memoire_nodeid].resource.getView()!="")
		html += "<div class='item'>"+appStr[languages[lang_local]]['internship-dissertation']+" : <span class='value'>"+UICom.structure["ui"][this.memoire_nodeid].resource.getView()+"</span></div>";
		html += "<h6>"+appStr[languages[lang_local]]['main-tasks']+"</h6>";
		html += "<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>";
		html += "<h6>"+appStr[languages[lang_local]]['main-accomplishments']+"</h6>";
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		html += "<div class='span6 organisme attributs'>";//		html += "<div style='float:right'>"+UICom.structure["ui"][this.logo_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+appStr[languages[lang_local]]['employer']+"</div><br/>";
		html += "<div class='item libelle'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.logo_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.website_nodeid].resource.getView(null,'same')+"</div>";
		html += "<div class='item'>"+appStr[languages[lang_local]]['sector-environment']+" : <span class='value'>"+UICom.structure["ui"][this.secteur_environnement_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>"+appStr[languages[lang_local]]['enterprise-size']+" : <span class='value'>"+UICom.structure["ui"][this.stage_entreprise_taille_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>"+appStr[languages[lang_local]]['enterprise-nationality']+" : <span class='value'>"+UICom.structure["ui"][this.stage_entreprise_nat_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.service_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.street_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.town_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.postalcode_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.country_nodeid].resource.getView()+"</div>";
		if (UICom.structure["ui"][this.stage_lieu_nodeid].resource.getView()!="")
			html += "<div class='item'>"+appStr[languages[lang_local]]['international-internship']+"</div>";
		//------------------ Tuteur ------------------
		html += "<div class='titre-tuteur'>"+appStr[languages[lang_local]]['tutor-organism']+"</div>";
		html += "<div class='tutor'>"
		html += "	<div class='value'>"+UICom.structure["ui"][this.referent_prenom_nodeid].resource.getView();
		html += " "+UICom.structure["ui"][this.referent_nom_nodeid].resource.getView();
		if (UICom.structure["ui"][this.referent_titre_nodeid].resource.getView()!="")
			html += ", "+UICom.structure["ui"][this.referent_titre_nodeid].resource.getView();
		html += "	</div>";
		html += "	<div class='item'><a href='mailto:"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"'>"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"</a>";
		if (UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView()!="")
			html += " "+appStr[languages[lang_local]]['tel']+": "+UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView();
		html += "	</div>";
		html += "</div>";
		//---------------- Contacts ------------------
		if (this.contacts.length)
			html += "<div class='titre-contacts'>"+appStr[languages[lang_local]]['contact-organism']+"</div>";
		html += "<div class='contacts'>"
		for (var i=0; i<this.contacts.length; i++){
			html += "<div class='contact' id='"+this.contacts[i].id+"'></div>";
		}
		html += "</div><!-- contacts -->";
		//-----------------------------------
		if (UICom.structure["ui"][this.comp_attestation_nodeid].resource.getView()!="")
			html += "<div class='value' style='margin-top:10px;'>"+appStr[languages[lang_local]]['competency-certification']+" : <span class='value'>"+UICom.structure["ui"][this.comp_attestation_nodeid].resource.getView()+"</span></div>";
		if (UICom.structure["ui"][this.apport_nodeid].resource.getView().length>25){
			html += "<h6>"+appStr[languages[lang_local]]['contribution-project']+"</h6>";
			html += "<div>"+UICom.structure["ui"][this.apport_nodeid].resource.getView()+"</div>";
		}
		html += "</div><!-- span -->";
		html += "</div><!-- row -->";
		//----------------------------------------------------------------------------------------------------
		html += "<div class='row-fluid competences-titre'>";
		//-----------------------------------------------------------------------
		eval_competences = new Array();
		view_eval_competences = new Array();
		html += "<span class='span6'><h4>"+appStr[languages[lang_local]]['competencies-internship']+"</h4></span>";
		html += "</div>";
		if (this.comp_traduction_nodeid!=null) {
			html += "<div class='row-fluid'>";
			html += "<div class='span8 attributs'><div class='item'>"+appStr[languages[lang_local]]['competency-translation']+" : <span class='value'>"+UICom.structure["ui"][this.comp_traduction_nodeid].resource.getView()+"</span></div></div>";
			html += "</div>";		
		}
		html += "<div class='row-fluid'>";
		html += "<span class='span6'>";
		html += "<h5>"+appStr[languages[lang_local]]['competencies-business']+"</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Stage',0);
		//---------------------------------------------
		var tableauActivitesMetierPPN = getTableauActivitesMetierPPN(this.comps_metiers_node,'activite','competence-metier');
		var tableauActivitesMetierFree = getTableauActivitesMetierFree(this.comps2_metiers_node,'dom-metier-ref','free-comp-metier');
		var tableauActivitesMetier = tableauActivitesMetierPPN.concat(tableauActivitesMetierFree);
		var tableauActivitesMetierTrie = tableauActivitesMetier.sort(sortOn1);
		html += getCompetencies3(tableauActivitesMetierTrie,false,'Stage',this.id,destid,0);
//		html += getCompetencies2(this.comps_metiers_node,false,'Stage',this.id,destid,'activite','competence-metier',0);
//		html += getCompetencies2(this.comps2_metiers_node,false,'Stage',this.id,destid,'dom-metier-ref','free-comp-metier',0);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span6'>";
		html += "<h5>"+appStr[languages[lang_local]]['competencies-other']+"</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Stage',1);
		//---------------------------------------------
		html += getCompetencies2(this.comps_autres_node,false,'Stage',this.id,destid,'activite','competence-trans',1);
		html += getCompetencies2(this.comps2_autres_node2a,false,'Stage',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2b,false,'Stage',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2c,false,'Stage',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "</div>";
		//----------------------------------------------------------------------------------------------------
		html += "<div class='row-fluid qualites_perso-titre'>";
		//-----------------------------------------------------------------------
		this.eval_qualites_perso = new Array();
		this.view_eval_qualites_perso = new Array();
		html += "<span class='span6'><h4>"+appStr[languages[lang_local]]['personal-qualities']+"</h4></span>";
		html += "</div>";
		html += "<div class='row-fluid'>";
		html += "<span class='span6'>";
		html += getEvalTableau_begin(0,this.id,destid,'Qualites_perso',0);
		html += getQualitesPerso(lang_local,0,this.qualites_perso_node,false,'Qualites_perso',this.id,destid,0,this.eval_qualites_perso,this.view_eval_qualites_perso);
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span6'>";
		html += getEvalTableau_begin(1,this.id,destid,'Qualites_perso',0);
		html += getQualitesPerso(lang_local,1,this.qualites_perso_node,false,'Qualites_perso',this.id,destid,0,this.eval_qualites_perso,this.view_eval_qualites_perso);
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "</div>";
		//-----------------------------------------------------------------------
		html += getEvaluationCodes_bytypes(['entreprise','autoeval']);
		//-----------------------------------------------------------------------		
		html += "<div class='row-fluid'><span class='span10'>";
		html += "<h4 class='title text-noir'>"+appStr[languages[lang_local]]['comments-tutor']+"</h4>"
			html += "<div>"+UICom.structure["ui"][this.comments_nodeid].resource.getView()+"</div>";
		html += "</span></div>";
		//----------------------------------------------------------------------------------------------------
		html += "</div><!-- class='panel-collapse collapse in'-->";
		html += "</div><!-- class=''panel ...'-->";
	}
	var obj = $(html);
	$("#"+destid).append(obj);
	for (var i=0; i<this.contacts.length; i++){
		this.contacts[i].displayView(this.contacts[i].id,'detail',lang_local);
	}
	//------------------ evaluation----------------------------------------
	if ($('#scroll_'+this.id).hasVerticalScrollBar())  // si scrollbar décaler en-têtes évaluations
		$('#ethead_'+this.id).css('width','97%');
	getEvaluations_displayView(view_eval_competences);
	getEvaluations_displayView(this.view_eval_qualites_perso);
	showHeaderEvaluationTable();
};

//==================================
UIFactory["Stage"].prototype.displayEditor = function(destid,type,lang) {
//==================================
	appStr['fr']['creation']="Création ...";
	//---------
	appStr['en']['creation']="Creation ...";

	var lang_local = lang;
	if (lang==null || lang==undefined) lang_local=LANGCODE;
	$('#wait-window').hide();
	var html = "";
	$("#"+destid).html(html);
	var div = $("<div class='alert alert-vert alert-block edition'></div>");
	$("#"+destid).append(div);
	html += "<a class='btn btn-mini btn-vert editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
	html += appStr[languages[lang_local]]['quit-edition-mode'];
	html += "</a>";
	if (languages[lang_local]=='fr') {
		html += "<a class='editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayEditor('"+destid+"',null,1);$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
		html += "Complete the internship record in English<span id='help-fiche-english'></span> ";
		html += "<img src='../img/english-flag.gif'/>";
		html += "</a>";		
	} else {
		html += "<a class='editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayEditor('"+destid+"',null,0);$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
		html += "Saisir la fiche de stage en français<span id='help-fiche-french'></span> ";
		html += "<img src='../img/france.png'/>";
		html += "</a>";				
	}
	$(div).append($(html));
	if (g_userrole=='etudiant') {
		$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'>"+appStr[languages[lang_local]]['post-label']+" </label>"));
		$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());
		var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
		$(div).append($(row));

		$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
		$("#formA_"+this.id).append($("<hr></hr>"));
		displayControlGroup_getEditor("formA_"+this.id,appStr[languages[lang_local]]['year-start'],"debut_"+this.id,this.begin_nodeid);
		displayControlGroup_getEditor("formA_"+this.id,appStr[languages[lang_local]]['duration'],"fin_"+this.id,this.duration_nodeid);
		displayControlGroup_displayEditor("formA_"+this.id,appStr[languages[lang_local]]['business-domain'],"dommet_"+this.id,this.domaine_metier_nodeid,"select",null,lang_local);
//		displayControlGroup_displayEditor("formA_"+this.id,"Secteur / Environnement","senv_"+this.id,this.secteur_environnement_nodeid,"select");
		$("#formA_"+this.id).append($("<hr></hr>"));
		displayControlGroup_getEditor("formA_"+this.id,appStr[languages[lang_local]]['organism-provenance']+"<span id='help-organisme-accueil'></span>","school_"+this.id,this.school_nodeid);
		displayControlGroup_getEditor("formA_"+this.id,appStr[languages[lang_local]]['formation-context'],"statut_"+this.id,this.cadre_nodeid);
		displayControlGroup_displayEditor("formA_"+this.id,appStr[languages[lang_local]]['internship-attestation'],"attestation_"+this.id,this.attestation_nodeid);
		displayControlGroup_displayEditor("formA_"+this.id,appStr[languages[lang_local]]['internship-dissertation'],"memoire_"+this.id,this.memoire_nodeid);

		$("#formA_"+this.id).append($("<hr></hr>"));
		$("#formA_"+this.id).append($("<label class='inline'>"+appStr[languages[lang_local]]['main-tasks']+"<span id='help-missions'></span></label><p><i>"+appStr[languages[lang_local]]['main-tasks-ex']+"</i></p>"));
		UICom.structure["ui"][this.missions_nodeid].resource.displayEditor("formA_"+this.id,'x100');
		$("#formA_"+this.id).append($("<hr></hr>"));
		$("#formA_"+this.id).append($("<label class='inline'>"+appStr[languages[lang_local]]['main-accomplishments']+"<span id='help-realisations'></span></label><p><i>"+appStr[languages[lang_local]]['main-accomplishments-ex']+"</i></p>"));
		UICom.structure["ui"][this.realizations_nodeid].resource.displayEditor("formA_"+this.id,'x100');

		$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['employer'],"org_"+this.id,this.name_nodeid);
		displayControlGroup_displayEditor("formB_"+this.id,appStr[languages[lang_local]]['logo']+"<span id='help-organisme-logo'></span>","logo_"+this.id,this.logo_nodeid);
		$("#formB_"+this.id).append(UICom.structure["ui"][this.website_nodeid].resource.getEditor('same-control-group'));
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['service']+"<span id='help-service'></span>","service_"+this.id,this.service_nodeid);

		displayControlGroup_displayEditor("formB_"+this.id,appStr[languages[lang_local]]['sector-environment'],"senv_"+this.id,this.secteur_environnement_nodeid,"select",null,lang_local);
	//+
		displayControlGroup_displayEditor("formB_"+this.id,appStr[languages[lang_local]]['enterprise-size'],"entreprisetaille_"+this.id,this.stage_entreprise_taille_nodeid,"select",null,lang_local);
		displayControlGroup_displayEditor("formB_"+this.id,appStr[languages[lang_local]]['enterprise-nationality'],"entreprise_nat_"+this.id,this.stage_entreprise_nat_nodeid,"radio-inline",null,lang_local);
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>"+appStr[languages[lang_local]]['location-internship']+"</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));

		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['street'],"rue_"+this.id,this.street_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['city'],"ville_"+this.id,this.town_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['postal-code'],"code_"+this.id,this.postalcode_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['country'],"pays_"+this.id,this.country_nodeid);
	//+
		displayControlGroup_displayEditor("formB_"+this.id," ","stage_lieu_"+this.id,this.stage_lieu_nodeid,"check",null,lang_local);
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>"+appStr[languages[lang_local]]['tutor-enterprise']+"</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['firstname'],"refprenom"+this.id,this.referent_prenom_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['surname'],"refnom"+this.id,this.referent_nom_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['position'],"titre_"+this.id,this.referent_titre_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['email'],"email_"+this.id,this.referent_email_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,appStr[languages[lang_local]]['phone'],"tel_"+this.id,this.referent_telephone_nodeid);

		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>"+appStr[languages[lang_local]]['contact-enterprise']+"</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		for (var i=0; i<this.contacts.length; i++){
			this.contacts[i].displayEditor(this.id,"formB_"+this.id,'detail',lang_local);
			$("#formB_"+this.id).append($("<div class='controls'><hr style='margin-top:11px;'></div>"));
		}

		var parentid = $("asmUnitStructure:has(metadata[semantictag='internship-contact-section'])", this.node).attr('id');
		var databack = false;
		var callback = "UIFactory['Stage'].reloadparseone";
		var param2 = "'"+this.id+"'";
		var param3 = "'stages-detail_histo_"+this.id+"'";
		var param4 = "hideMessageBox";
		$("#formB_"+this.id).append($("<div style='margin-bottom:15px;padding-bottom:5px;'><a  class='editbutton' href=\"javascript:importBranch('"+parentid+"','IUT2composantes.IUT2-parts','contact',"+databack+","+callback+","+param2+","+param3+",null,null,null,null,"+lang+")\">"+appStr[languages[lang_local]]['add-contact-internship']+" <i class='fa fa-plus-square'></i></a></div>"));

		$("#formB_"+this.id).append($("<hr style='margin-top:15px;'></hr>"));
		$("#formB_"+this.id).append($("<label class='inline'>"+appStr[languages[lang_local]]['contribution-project']+"</label>"));
		UICom.structure["ui"][this.apport_nodeid].resource.displayEditor("formB_"+this.id,'x100');
	}
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,appStr[languages[lang_local]]['competencies-internship'],"Stage","stages-detail_histo_","vert","stages_byid",null,lang_local,this.comp_traduction_nodeid);
	//----------------------------------------------------------------------------------------------------
	this.eval_qualites_perso = new Array();
	this.view_eval_qualites_perso = new Array();
	html += getSectionQualitesPerso(lang_local,this.id,destid,this.qualites_perso_node,this.eval_qualites_perso,this.view_eval_qualites_perso);
	//-----------------------------------------------------------------------
	html += getEvaluationCodes_bytypes(['entreprise','autoeval'],lang_local);
	//----------------------------------------------------------------------------------------------------
	$(div).append($(html));
	if (this.comp_traduction_nodeid!=null) {
		if (g_userrole=='etudiant') {
			displayControlGroup_displayEditor("formCT_"+this.id,appStr[languages[lang_local]]['competency-translation'],"translation_"+this.id,this.comp_traduction_nodeid);
		} else {
			displayControlGroup_displayView("formCT_"+this.id,appStr[languages[lang_local]]['competency-translation'],"translation_"+this.id,this.comp_traduction_nodeid);			
		}
	}
	//------------------ evaluation----------------------------------------
	getEvaluations_display(view_eval_competences,eval_competences,lang_local);
	getEvaluations_display(this.view_eval_qualites_perso,this.eval_qualites_perso,lang_local);
	//-----------------------------------------------------------------------
	if (g_userrole=='tuteur') {
		html = "<div class='row-fluid'><span class='span10'><form id='formC_"+this.id+"' class='form-horizontal'></form></span></div>";
		$(div).append($(html));
		$("#formC_"+this.id).append($("<h4 class='title'>"+appStr[languages[lang_local]]['comments-tutor']+"</h4>"));
		UICom.structure["ui"][this.comments_nodeid].resource.displayEditor("formC_"+this.id,'x200');
	}
	if (g_userrole=='etudiant') {
		html = "<div class='row-fluid'>";
		html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
		html += appStr[languages[lang_local]]['quit-edition-mode'];
		html += "</a>";
		if (eval_competences.length>0 ||this.eval_qualites_perso.length>0) {
			html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].updateOwner();getEnvoiFormulaireStageBox('"+this.id+"','"+destid+"',eval_competences,"+lang_local+")\" data-title='formulaire' rel='tooltip'>";
			html += appStr[languages[lang_local]]['send-internship-eval-request'];
			html += "</a>";		
		}
	}
	html += "</div>";
	$(div).append($(html));
	if ($('#scroll_'+this.id).hasVerticalScrollBar())  // si scrollbar décaler en-têtes évaluations
		$('#ethead_'+this.id).css('width','97%');
	showHeaderEvaluationTable();
};

//==================================
UIFactory["Stage"].prototype.displayEditor_demandeEval= function(destid,type,lang) {
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
	$("#"+destid).html("");
	var div = $("<div class='alert alert-vert alert-block edition'></div>");
	$("#"+destid).append(div);
	$(div).append($(html));
	$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'></label>"));
	$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getView("#libelle_"+this.id));
	var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span5'></div><div id='B_"+this.id+"' class='span5'></div></div>";
	$(div).append($(row));

	$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
	$("#formA_"+this.id).append($("<hr></hr>"));

	displayControlGroup_getView("formA_"+this.id,appStr[languages[lang_local]]['year-start'],"debut_"+this.id,this.begin_nodeid);
	displayControlGroup_getView("formA_"+this.id,appStr[languages[lang_local]]['duration'],"fin_"+this.id,this.duration_nodeid);
	displayControlGroup_displayView("formA_"+this.id,appStr[languages[lang_local]]['business-domain'],"dommet_"+this.id,this.domaine_metier_nodeid,"select",null,lang_local);
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getView("formA_"+this.id,appStr[languages[lang_local]]['organism-provenance'],"school_"+this.id,this.school_nodeid);
	displayControlGroup_getView("formA_"+this.id,appStr[languages[lang_local]]['formation-context'],"statut_"+this.id,this.cadre_nodeid);
	if ($(UICom.structure["ui"][this.attestation_nodeid].resource.filename_node[LANGCODE]).text()!="")
		displayControlGroup_displayView("formA_"+this.id,appStr[languages[lang_local]]['internship-attestation'],"attestation_"+this.id,this.attestation_nodeid);
	if ($(UICom.structure["ui"][this.memoire_nodeid].resource.filename_node[LANGCODE]).text()!="")
		displayControlGroup_displayView("formA_"+this.id,appStr[languages[lang_local]]['internship-dissertation'],"memoire_"+this.id,this.memoire_nodeid);

	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>"+appStr[languages[lang_local]]['main-tasks']+"</label>"));
	$("#formA_"+this.id).append($("<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>"));
	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>"+appStr[languages[lang_local]]['main-accomplishments']+"</label>"));
	$("#formA_"+this.id).append($("<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>"));

	$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
	$("#formB_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getView("formB_"+this.id,appStr[languages[lang_local]]['employer'],"org_"+this.id,this.name_nodeid);
	if ($(UICom.structure["ui"][this.logo_nodeid].resource.filename_node[LANGCODE]).text()!="")
	displayControlGroup_displayView("formB_"+this.id,appStr[languages[lang_local]]['logo'],"logo_"+this.id,this.logo_nodeid);
	displayControlGroup_getView("formB_"+this.id,appStr[languages[lang_local]]['service'],"service_"+this.id,this.service_nodeid);
	if (UICom.structure["ui"][this.website_nodeid].resource.url_node[LANGCODE].text()!="")
		$("#formB_"+this.id).append(UICom.structure["ui"][this.website_nodeid].resource.getView(null,'same'));

	displayControlGroup_displayView("formB_"+this.id,appStr[languages[lang_local]]['sector-environment'],"senv_"+this.id,this.secteur_environnement_nodeid,"select",null,lang_local);
	displayControlGroup_displayView("formB_"+this.id,appStr[languages[lang_local]]['enterprise-size'],"entreprisetaille_"+this.id,this.stage_entreprise_taille_nodeid,"select",null,lang_local);
	displayControlGroup_displayView("formB_"+this.id,appStr[languages[lang_local]]['enterprise-nationality'],"entreprise_nat_"+this.id,this.stage_entreprise_nat_nodeid,"radio-inline",null,lang_local);
	$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>"+appStr[languages[lang_local]]['location-internship']+"</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));

	displayControlGroup_getView("formB_"+this.id,appStr[languages[lang_local]]['street'],"rue_"+this.id,this.street_nodeid);
	displayControlGroup_getView("formB_"+this.id,appStr[languages[lang_local]]['city'],"ville_"+this.id,this.town_nodeid);
	displayControlGroup_getView("formB_"+this.id,appStr[languages[lang_local]]['postal-code'],"code_"+this.id,this.postalcode_nodeid);
	displayControlGroup_getView("formB_"+this.id,appStr[languages[lang_local]]['country'],"pays_"+this.id,this.country_nodeid);

	if (UICom.structure["ui"][this.stage_lieu_nodeid].resource.getView()!="")
		$("#formB_"+this.id).append($("<div class='controls'>"+appStr[languages[lang_local]]['international-internship']+"</div>"));
	//------------------ Tuteur ------------------
	var html2 = "<div class='control-group'><label class='control-label'>"+appStr[languages[lang_local]]['tutor-enterprise']+"</label><div class='controls'><hr style='margin-top:11px;'></hr></div></div>";
	html2 += "<div class='control-group'>"
	html2 += "	<div class='controls'>"+UICom.structure["ui"][this.referent_prenom_nodeid].resource.getView();
	html2 += " "+UICom.structure["ui"][this.referent_nom_nodeid].resource.getView();
	if (UICom.structure["ui"][this.referent_titre_nodeid].resource.getView()!="")
		html2 += ", "+UICom.structure["ui"][this.referent_titre_nodeid].resource.getView();
	html2 += "	</div>";
	html2 += "</div>";
	html2 += "<div class='control-group'>"
	html2 += "	<div class='controls'><a href='mailto:"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"'>"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"</a>";
	if (UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView()!="")
		html2 += " "+appStr[languages[lang_local]]['tel']+": "+UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView();
	html2 += "	</div>";
	html2 += "</div>";
	//------------------ Contacts ------------------
	if (this.contacts.length>0) {
		html2 += "<div class='control-group'><label class='control-label'>"+appStr[languages[lang_local]]['contact-enterprise']+"</label><div class='controls'><hr style='margin-top:11px;'></hr></div></div>";
		html2 += "<div class='control-group'>";
		for (var i=0; i<this.contacts.length; i++){
			if (i>0)
				html2 += "<div class='controls'><hr style='margin-top:11px;'></hr></div>";
			html2 += "<div class='controls' id='"+this.contacts[i].id+"'></div>";
		}
		html2 += "</div>";		
	}
	var obj = $(html2);
	$("#formB_"+this.id).append(obj);
	for (var i=0; i<this.contacts.length; i++){
		this.contacts[i].displayView(this.contacts[i].id,'detail',lang_local);
	}
	$("#formB_"+this.id).append($("<hr style='margin-top:15px;'></hr>"));
	$("#formB_"+this.id).append($("<label class='inline'>"+appStr[languages[lang_local]]['contribution-project']+"</label>"));
	$("#formB_"+this.id).append($("<div>"+UICom.structure["ui"][this.apport_nodeid].resource.getView()+"</div>"));
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,appStr[languages[lang_local]]['competencies-internship'],"Stage","stages-detail_histo_","vert","stages_byid",null,lang_local,this.comp_traduction_nodeid);
	//----------------------------------------------------------------------------------------------------
	this.eval_qualites_perso = new Array();
	this.view_eval_qualites_perso = new Array();
	html += getSectionQualitesPerso(lang_local,this.id,destid,this.qualites_perso_node,this.eval_qualites_perso,this.view_eval_qualites_perso);
	//-----------------------------------------------------------------------
	html += getEvaluationCodes_bytypes(['entreprise','autoeval'],lang_local);
	//----------------------------------------------------------------------------------------------------
	$(div).append($(html));
	if (this.comp_traduction_nodeid!=null) {
		if ($(UICom.structure["ui"][this.comp_traduction_nodeid].resource.filename_node[LANGCODE]).text()!="")
			displayControlGroup_displayView("formCT_"+this.id,appStr[languages[lang_local]]['competency-translation'],"translation_"+this.id,this.comp_traduction_nodeid);			
	}
	//------------------ evaluation----------------------------------------
	getEvaluations_display(view_eval_competences,eval_competences,lang_local);
	getEvaluations_display(this.view_eval_qualites_perso,this.eval_qualites_perso,lang_local);
	//-----------------------------------------------------------------------
	var buttons_senEval ="";
	if (g_userrole=='tuteur') {
		html = "<div class='row-fluid'><span class='span10'><form id='formC_"+this.id+"' class='form-horizontal'></form></span></div>";
		$(div).append($(html));
		$("#formC_"+this.id).append($("<h4 class='title'>"+appStr[languages[lang_local]]['comments-tutor']+"</h4>"));
		if (submittednode && writenode) {
			UICom.structure["ui"][this.comments_nodeid].resource.displayEditor("formC_"+this.id,'x200');			
			html = "<div class='row-fluid'>";
//			html += "<a  class='btn btn-mini btn-danger editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
//			html += appStr[languages[lang_local]]['cancel'];
//			html += "</a>";
			if (eval_competences.length>0 ||this.eval_qualites_perso.length>0) {
				html += "<span id='sendEval1_"+this.id+"'>";
				buttons_senEval += "<a id='sendEval1_btn_"+this.id+"' class='btn btn-mini btn-vert editbutton' onclick=\"javascript:setMessageBox('"+appStr[languages[lang_local]]['sending']+"');showMessageBox();envoyerEvaluationStage('"+this.id+"','"+destid+"',"+lang_local+")\" data-title='formulaire' rel='tooltip'>";
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
};

//==================================
UIFactory["Stage"].reloadparseone = function(uuid,destid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='internship-unit'])",data);
			stages_byid[uuid] = new UIFactory["Stage"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			stages_byid[uuid].displayEditor(destid,null,param4);
			if (callback!=null)
				callback(param1,param2,param3,param4);
//			hideMessageBox();
		}
	});
};

//==================================
UIFactory["Stage"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			UIFactory["Stage"].parse(data);
			if (uuid!=null)
				stages_byid[uuid].displayEditor(destid);
			else {
				Stages_Display('stages-short_histo','short');
				Stages_Display('stages-detail_histo','detail',parentid);
				Stages_Display('stages_cv','cv');
			}
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};

//==================================
UIFactory["Stage"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		stages_byid[parentid].displayEditor(destid);
	else {
		Stages_Display('stages-short_histo','short');
		Stages_Display('stages-detail_histo','detail',$("asmStructure:has(metadata[semantictag='internships'])", g_portfolio_current).attr('id'));
		Stages_Display('stages_cv','cv');
}
};

//==================================
UIFactory["Stage"].parse = function(data) 
//==================================
{
	stages_byid = {};
	stages_list = [];
	var units = $("asmUnit:has(metadata[semantictag='internship-unit'])",data);
	var tableau = new Array();
	for ( var i = 0; i < units.length; i++) {
		var uuid = $(units[i]).attr('id');
		stages_byid[uuid] = new UIFactory["Stage"](units[i]);
		//------------------
		var date_debut = UICom.structure["ui"][$("asmContext:has(metadata[semantictag='date-begin'])",units[i]).attr('id')].resource.getView();
		tableau[i] = [date_debut,uuid];
	}
	var newTableau = tableau.sort(sortOn1Desc);
	for (var i=0; i<newTableau.length; i++){
		stages_list[i] = stages_byid[newTableau[i][1]];
	}
};

//==================================
UIFactory["Stage"].remove = function(uuid,parentid,destid)
//==================================
{
	UICom.DeleteNode(uuid);
	if(parentid!="undefined" && destid!="undefined"){
		$("#"+uuid,stages_byid[parentid].node).remove();
		stages_byid[uuid] = new UIFactory["Stage"](stages_byid[parentid].node); /// ???
		stages_byid[parentid].displayEditor(destid);
	} else {
		$("#"+uuid,g_portfolio_current).remove();
		UIFactory["Stage"].parse(g_portfolio_current);
		Stages_Display('stages-short_histo','short');
		Stages_Display('stages-detail_histo','detail',$("asmStructure:has(metadata[semantictag='internships'])", g_portfolio_current).attr('id'));
		Stages_Display('stages_cv','cv');
	}
	// Mises à jour des compétences
	displayCompetencesMetiers(g_portfolio_current);
	displayCompetencesTrans(g_portfolio_current);
	displayCompetencesAutres(g_portfolio_current);
};

//==================================
UIFactory["Stage"].prototype.updateOwner = function()
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
UIFactory["Stage"].prototype.get_data2send_csv = function()
//==================================
{
	var str = "###STAGE###;";
	str += getDataByTypeTag_csv("text",this.node,"estb-name");
	str += getDataByTypeTag_csv("text",this.node,"service");
	str += getDataByTypeTag_csv("url",this.node,"website");
	str += getDataByTypeTag_csv("value",this.node,"secteur-environnement");
	str += getDataByTypeTag_csv("value",this.node,"stage-entreprise-taille");
	str += getDataByTypeTag_csv("value",this.node,"stage-entreprise-nat");
	str += getDataByTypeTag_csv("text",this.node,"postalcode");
	str += getDataByTypeTag_csv("text",this.node,"town");
	str += getDataByTypeTag_csv("text",this.node,"country");
	str += getDataByTypeTag_csv("value",this.node,"stage-lieu");
	str += getDataByTypeTag_csv("text",this.node,"job-realizations");
	str += getDataByTypeTag_csv("text",this.node,"job-missions");
	str += getDataByTypeTag_csv("text",this.node,"apport");
	str += getQualitesPerso2send_csv(this.node);	
	str += getCompetencies2send_csv(this.node,['autoeval','progres_eval']);	
	var newresult = str.replace(/<[^>]*>/gi,"");  // retire toutes les balises html
	return newresult;
};

//==================================
UIFactory["Stage"].prototype.get_data2send_xml = function()
//==================================
{
	var str = "<Stage>";
	str += getDataByTypeTag_xml("organisme","text",this.node,"estb-name");
	str += getDataByTypeTag_xml("service","text",this.node,"service");
	str += getDataByTypeTag_xml("url","url",this.node,"website");
	str += getDataByTypeTag_xml("secteur","value",this.node,"secteur-environnement");
	str += getDataByTypeTag_xml("taille","value",this.node,"stage-entreprise-taille");
	str += getDataByTypeTag_xml("nationalite-entreprise","value",this.node,"stage-entreprise-nat");
	str += getDataByTypeTag_xml("code-postal","text",this.node,"postalcode");
	str += getDataByTypeTag_xml("ville","text",this.node,"town");
	str += getDataByTypeTag_xml("pays","text",this.node,"country");
	str += getDataByTypeTag_xml("stage-lieu","value",this.node,"stage-lieu");
	str += getDataByTypeTag_xml("job-realizations","text",this.node,"job-realizations");
	str += getDataByTypeTag_xml("job-missions","text",this.node,"job-missions");
	str += getDataByTypeTag_xml("apport","text",this.node,"apport");
	str += getQualitesPerso2send_xml(this.node);	
	str += getCompetencies2send_xml(this.node,['autoeval','progres_eval']);	
	str += "</Stage>";
	var regex = /<br>/gi;
	var newresult = str.replace(regex,"<br/>");
//	alert(newresult);
	return newresult;
};

//==================================
UIFactory["Stage"].reloadparseone_submitted = function(uuid,destid) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='internship-unit'])",data);
			stages_byid[uuid] = new UIFactory["Stage"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			stages_byid[uuid].displayView(destid+"_"+uuid,"detail",null,"accordion_"+destid);
		}
	});
};

//==================================
function Stages_Display(destid,type,parentid) {
//==================================
	$("#"+destid).html("");
	var html ="";
	if (type=='detail') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		var databack = false;
		var callback = "UIFactory['Stage'].reloadparse";
		var param2 = "null";
		var param3 = "'"+destid+"'";
		var param4 = "'"+parentid+"'";
		html += "<div class='titre2'><span class='titre1'>Stages</span><span id='help-stage-label'>";
		if (g_userrole=='etudiant') {
			html += "<a  class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2composantes.IUT2-parts','internship-unit',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
			html += "Ajouter un stage <i class='fa fa-plus-square'>";
			html += "</a></div>";
		}
	}
	if (type=='short' &&  stages_list.length>0)
		html += "<h5>Stage(s)</h5>";
	if (type=='detail' || type=='short') {
		html += "<div class='panel-group' id='accordion_"+destid+"'></div>";
		$("#"+destid).html(html);
		for ( var i = 0; i < stages_list.length; i++) {
			$("#accordion_"+destid).append($("<div id='"+destid+"_"+stages_list[i].id+"'></div>"));			
			stages_list[i].displayView(destid+"_"+stages_list[i].id,type,null,"accordion_"+destid);
		}
	}
	if (type=='cv') {
		for ( var i = 0; i < stages_list.length; i++) {
			var uuid = stages_list[i].id;
			$("#"+destid).append($("<div id='exp_"+uuid+"'></div>"));			
			stages_list[i].displayView("exp_"+uuid,'cv',null,"accordion_"+destid);
		}
	}
}

//==============================
function formulaireBox()
//==============================
{
	var html = "";
	html += "\n<!-- ==================== Formualaire box ============= -->";
	html += "\n<div id='formulaire-window' class='modal hide fade'>";
	html += "\n		<div id='formulaire-window-header' class='modal-header'>";
	html += "\n			Questionnaire";
	html += "\n		</div>";
	html += "\n		<div id='formulaire-window-body' class='modal-body'>";
	html += "\n		</div>";
	html += "\n		<div id='formulaire-window-footer' class='modal-footer'></div>";
	html += "\n	</div>";
	html += "\n<!-- ============================================== -->";
	return html;
}

//==================================
function createUserPortfolio(template,code,userid,role) {
//==================================
	var portfolioid = UIFactory["Portfolio"].instantiate_bycode(template,code);
	UIFactory["Portfolio"].shareUser(portfolioid,userid,role);
	UIFactory["Portfolio"].unshareUser(portfolioid,userid,'designer');
	return portfolioid;
}

//==================================
function remplirFormulaireStage(uuid) {
//==================================
	//---- test si formulaire existe ---
	if (UICom.structure["ui"][stages_byid[uuid].formulaire_nodeid].resource.getView()==''){
		var template = "IUT2-formulaire-stage";
		var code = USER.username_node.text()+"-formstage-"+uuid;
		// var portfolioid = execByNodeJS('createUserPortfolio',template,code,userid,role);
		var portfoliouuid = createUserPortfolio(template,code,USER.id,'etudiant');
		$(UICom.structure["ui"][stages_byid[uuid].formulaire_nodeid].resource.text_node[LANGCODE]).text(portfoliouuid);
		UICom.structure["ui"][stages_byid[uuid].formulaire_nodeid].resource.save();
	}
	//----------------------------------
	var formulaireid = UICom.structure["ui"][stages_byid[uuid].formulaire_nodeid].resource.getView();
	g_edit = true;
	g_display_type = 'standard';
	portfolioid = formulaireid;
	$("#formulaire-window-body").html("");
	$.ajaxSetup({async: false});
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + formulaireid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			UIFactory["Portfolio"].parse(data);
			UIFactory["Portfolio"].displayPortfolio('formulaire-window-body',g_display_type,LANGCODE,g_edit);
			$('a[data-toggle=tooltip]').tooltip({html:true});
		}
	});
	$.ajaxSetup({async: true});
	var buttons = "<span class='btn' onclick=\"javascript:portfolioid=g_portfolioid;$('#formulaire-window').modal('hide');\">" + karutaStr[LANG]["Close"] + "</span>";
	document.getElementById('formulaire-window-footer').innerHTML = buttons;
	$("#formulaire-window").modal('show');
}

//==================================
function getEnvoiFormulaireStageBox(uuid,destid,eval_competences,lang)
//==================================
{
	appStr['fr']['are-you-sure']="Une fois la demande envoyée, vous ne pourrez plus modifier la fiche de stage. Êtes-vous sûr de vouloir poursuivre ?";
	appStr['fr']['sending-question-user']="Vous désirez envoyer une demande de validation de vos compétences de stage à";
	appStr['fr']['sending-validation-request']="Vous désirez envoyer une demande de validation de vos compétences de stage.";
	appStr['fr']['tutor-contact-request']="Veuillez renseigner le nom et l'adresse mail du tuteur en entreprise.";
	appStr['fr']['sending']="Envoi ...";
	//---------
	appStr['en']['are-you-sure']="Once the request is sent you will no longuer able to modify your internship record. Are you sure you want to proceed?";
	appStr['en']['sending-question-user']="You are requesting skills validation for your internship to";
	appStr['en']['sending-validation-request']="You are requesting skills validation for your internship.";
	appStr['en']['tutor-contact-request']="Please specify the name and email address of the internship supervisor.";
	appStr['en']['sending']="Sending ...";

	var refnom = $($('#refnom'+uuid).children().eq(0)).val();
	var refprenom = $($('#refprenom'+uuid).children().eq(0)).val();
	var refemail = $($('#email_'+uuid).children().eq(0)).val();
	var html = "";
	var buttons = "";
	var js2 = "javascript:$('#alert-window').modal('hide')";
	if (refprenom!='' && refnom!='' && refemail!='') {
		html = "<div style='margin-bottom:5px'>"+appStr[languages[lang]]['sending-question-user'];
		html += "<div class='value'>"+refprenom+" "+refnom;
		html += "<br/>"+appStr[languages[lang]]['are-you-sure'];
		html += "</div>";		
		var js1 = "javascript:setMessageBox('"+appStr[languages[lang]]['sending']+"');showMessageBox();envoyerFormulaireStage('"+uuid+"','"+destid+"','"+refemail+"','tuteur',"+lang+")";
		buttons = " <span class='btn btn-mini btn-vert' onclick=\""+js1+";\">"+appStr[languages[lang]]['oksending']+"</span>";
		buttons += " <span class='btn btn-mini btn-red btn-danger' onclick=\""+js2+";\">"+appStr[languages[lang]]['cancelsending']+"</span>";
	} else{
		html = "<div style='margin-bottom:5px'>"+appStr[languages[lang]]['sending-validation-request'];
		html += "<br/>"+appStr[languages[lang]]['tutor-contact-request'];
		html += "</div>";		
		buttons = " <span class='btn btn-mini btn-red' onclick=\""+js2+";\">"+karutaStr[languages[lang]]['Close']+"</span>";
	}
	$("#alert-window-body").html($(html));
	// ------------------------------------
	$("#alert-window-footer").html($(buttons));

	$("#alert-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
	$("#alert-window").addClass('alert-vert');
	$("#alert-window").modal('show');
}

//==================================
function envoyerFormulaireStage(uuid,destid,email,role,lang) {
//==================================
	$('#alert-window').modal('hide');
//	submit(uuid);
	var url = window.location.href;
	var serverURL = url.substring(0,url.indexOf(appliname+"/")-1);
	var urlS = "../../../"+serverBCK+'/nodes/node/'+uuid+'/action/submit';
	$.ajax({
		type : "POST",
		dataType : "text",
		contentType: "application/xml",
		url : urlS,
		uuid : uuid,
		success : function (data){
			urlS = "../../../"+serverFIL+"/direct?uuid="+uuid+"&email="+email+"&sharerole=etudiant&role="+role+"&l=3&d=720&type=showtorole&showtorole="+role;
			$.ajax({
				type : "POST",
				dataType : "text",
				contentType: "application/xml",
				url : urlS,
				success : function (data){
					sendMail_Stage(serverURL,data,email,lang);
					UIFactory['Stage'].reloadparseone_submitted(uuid,'stages-detail_histo');
					hideMessageBox();
				},
				error : function(jqxhr,textStatus) {
//					alertHTML("Error in envoyerFormulaireStage "+textStatus+" : "+jqxhr.responseText);
				}
			});
		}
	});
}

//==================================
function sendMail_Stage(serverURL,encodeddata,email,lang) {
//==================================
	var url = serverURL+"/"+appliname+"/application/htm/demande-evaluation.htm?i="+encodeddata+"&amp;type=Stage&amp;lang="+languages[lang];
	var message_logo_url = serverURL+"/"+appliname + message_logo;
	var message ="&lt;img src='"+message_logo_url+"' style='width:300px;margin-bottom:4px;margin-top:30px;'&gt;";
	message += "&lt;br/&gt;"+appStr[languages[lang]]['hello']+",&lt;br/&gt;&lt;br/&gt;";
	message += appStr[languages[lang]]['request-evaluation-p1'];
	message += "&lt;br/&gt;";
	message +="&lt;a href='"+url+"' style='text-decoration: none;color:black;border-radius:4px;background-color:lightgrey'&gt;";
	message += url;
	message +="&lt;/a&gt;";
	message += "&lt;br/&gt;";
	message += appStr[languages[lang]]['request-evaluation-p2'];
	message += appStr[languages[lang]]['request-evaluation-p3'];

	var xml ="<node>";
	xml +="<sender>"+$(USER.email_node).text()+"</sender>";
	xml +="<recipient>"+email+"</recipient>";
	xml +="<subject>"+appStr[languages[lang]]['request-eval-internship']+"</subject>";
	xml +="<message>"+message+"</message>";
	xml +="</node>";
	$.ajax({
		type : "POST",
		contentType : "xml",
		url : "../../../"+serverFIL+"/mail",
		data: xml,
		success : function(data) {
			alertHTML(karutaStr[LANG]['email-sent']);
		},
		error : function(jqxhr,textStatus) {
			alertHTML("Error in sendMail_Stage "+textStatus+" : "+jqxhr.responseText);
		}
	});
}

//==================================
function envoyerEvaluationStage(uuid,destid,lang) {
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
			window.location.reload();
		}
	});
}

//==================================
function displayControlGroup_displayView(destid,label,controlsid,nodeid,type,classitem,lang) {
//==================================
	if (classitem==null)
		classitem="";
	$("#"+destid).append($("<div class='control-group'><label class='control-label "+classitem+"'>"+label+"</label><div id='"+controlsid+"' class='controls'></div></div>"));
	$("#"+controlsid).append(UICom.structure["ui"][nodeid].resource.getView(null,type,lang));
}

//==================================
function displayControlGroup_displayEditor(destid,label,controlsid,nodeid,type,classitem,lang) {
//==================================
	if (classitem==null)
		classitem="";
	$("#"+destid).append($("<div class='control-group'><label class='control-label "+classitem+"'>"+label+"</label><div id='"+controlsid+"' class='controls'></div></div>"));
	UICom.structure["ui"][nodeid].resource.displayEditor(controlsid,type,lang);
}

