		
//========================================================
//========================================================
//============ SITUATION APPRENTISSAGE ===================
//========================================================
//========================================================

var situations_byid = {};
var situations_list = [];

//==================================
UIFactory["SituApp"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	//------------------------
	this.begin_nodeid = $("asmContext:has(metadata[semantictag='date-begin'])",node).attr('id');
	this.duration_nodeid = $("asmContext:has(metadata[semantictag='duration'])",node).attr('id');
	this.description_nodeid = $("asmContext:has(metadata[semantictag='description'])",node).attr('id');
	this.domaine_metier_nodeid = $("asmContext:has(metadata[semantictag='domaine-metier'])",node).attr('id');
	//------------------------
	this.referent_prenom_nodeid  = $("asmContext:has(metadata[semantictag='referent-prenom'])",node).attr('id');
	this.referent_nom_nodeid  = $("asmContext:has(metadata[semantictag='referent-nom'])",node).attr('id');
	this.referent_email_nodeid  = $("asmContext:has(metadata[semantictag='referent-email'])",node).attr('id');
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
UIFactory["SituApp"].prototype.displayView = function(destid,type,lang,parentid)
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
		html += "<div>"+UICom.structure["ui"][this.description_nodeid].resource.getView()+"</div>";
		html += "</div></div>";
	}
	if (type==null || type=='short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;"
		html += "<a href='#' onclick=\"javascript:$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"');$('#tabs_histo li:eq(1) a').tab('show')\">";
		html += "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.id].getLabel(destid+"_short_label","span") + "</span>";
		html += ", <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " - <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.duration_nodeid].resource.getView(destid+"_short_end") + "</span>";
		html += "</a>";
	}
	if (type=='detail') {
		html += "<div class='panel panel-default alert alert-orange alert-block' >";
		html += "<div class='panel-heading'>";
		html += "<h4 class='panel-title'>";
		//---------------------------------------------------------
		var writenode = ($(this.node).attr('write')=='Y')? true:false;
		if (writenode && g_userrole=='etudiant') {
			html += "<span  class='editbutton' onclick=\"javascript: confirmDel('"+this.id+"','SituApp')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
			html += "<span  class='editbutton' onclick=\"javascript:situations_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
			html += "<i class='fa fa-edit'></i>";
			html += "</span>";
		}
		html += "<span data-toggle='collapse' class='editbutton' data-parent='#"+parentid+"' href='#collapse"+this.id+"' onclick=\"toggleZoom('"+this.id+"')\">";
		html += "<i id='zoom_"+this.id+"' class='fa fa-search-plus'></i>";
		html += "</span>";
		//---------------------------------------------------------
		html += UICom.structure["ui"][this.id].getView()+" ("+UICom.structure["ui"][this.begin_nodeid].resource.getView()+" - "+UICom.structure["ui"][this.duration_nodeid].resource.getView()+")";
		html += "</h4>";
		html += "</div>";// panel-heading
		html += "<div id='collapse"+this.id+"' class='panel-collapse collapse out'>";
		html += "<div class='panel-body'>";
		html += "<div class='row-fluid'>";
		html += "<div class='span6 attributs'>";
		html += "<div class='item'>Domaine métiers : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
		html += "<h6>Description</h6>"
		html += "<div>"+UICom.structure["ui"][this.description_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		//------------------ Tuteur ------------------
		html += "<div class='span6 attributs'>";
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
		html += getEvalTableau_begin(1,this.id,destid,'SituApp',0);
		//---------------------------------------------
		var tableauActivitesMetierPPN = getTableauActivitesMetierPPN(this.comps_metiers_node,'activite','competence-metier');
		var tableauActivitesMetierFree = getTableauActivitesMetierFree(this.comps2_metiers_node,'dom-metier-ref','free-comp-metier');
		var tableauActivitesMetier = tableauActivitesMetierPPN.concat(tableauActivitesMetierFree);
		var tableauActivitesMetierTrie = tableauActivitesMetier.sort(sortOn1);
		html += getCompetencies3(tableauActivitesMetierTrie,false,'SituApp',this.id,destid,0);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span6'>";
		html += "<h5>"+appStr['fr']['competencies-other']+"</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'SituApp',1);
		//---------------------------------------------
		html += getCompetencies2(this.comps_autres_node,false,'SituApp',this.id,destid,'activite','competence-trans',1);
		html += getCompetencies2(this.comps2_autres_node2a,false,'SituApp',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2b,false,'SituApp',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2c,false,'SituApp',this.id,destid,'dom-autre-ref','free-comp-autre',1);
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
UIFactory["SituApp"].prototype.displayEditor = function(destid,type,lang) {
//==================================
	var lang_local = 0; // fr
	var html = "";
	$("#"+destid).html(html);
	var div = "";
	if (this.referent_prenom_nodeid!=undefined)
		div = $("<div class='alert alert-orange alert-block edition'></div>");
	else
		div = $("<div class='alert alert-orange alert-block edition old-project'></div>");
	$("#"+destid).append(div);
	html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:situations_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
	html += "Quitter le mode édition";
	html += "</a>";
	$(div).append($(html));
	$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'>Intitulé de votre situation </label>"));
	$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());
	var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
	$(div).append($(row));

	$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getEditor("formA_"+this.id,"Année de début","debut_"+this.id,this.begin_nodeid);
	displayControlGroup_getEditor("formA_"+this.id,"Durée","fin_"+this.id,this.duration_nodeid);
	displayControlGroup_displayEditor("formA_"+this.id,"Domaine métiers<span id='help-domaine-metier'></span>","dommet_"+this.id,this.domaine_metier_nodeid,"select");
	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>Description de la situation, problème à résoudre, démarche,..</label>"));
	UICom.structure["ui"][this.description_nodeid].resource.displayEditor("formA_"+this.id,'x100');

	$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
	
	//------------------ Tuteur ------------------
	if (this.referent_prenom_nodeid!=undefined) {
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Évaluateur</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		displayControlGroup_getEditor("formB_"+this.id,"Prénom","refprenom"+this.id,this.referent_prenom_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Nom","refnom"+this.id,this.referent_nom_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Courriel","email_"+this.id,this.referent_email_nodeid);
	}
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cette action","SituApp","situations-detail_histo_","vert","situations_byid");
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
			html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:situations_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
			html += "Quitter le mode édition";
			html += "</a>";
			if (eval_competences.length>0) {
				html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:situations_byid['"+this.id+"'].updateOwner();getEnvoiFormulaireEvaluationBox('"+this.id+"','"+destid+"',eval_competences,"+lang_local+",'SituApp')\" data-title='formulaire' rel='tooltip'>";
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
UIFactory["SituApp"].reloadparseone = function(uuid,destid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='situation-unit'])",data);
			situations_byid[uuid] = new UIFactory["SituApp"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			situations_byid[uuid].displayEditor(destid);
			if (callback!=null)
				callback(param1,param2,param3,param4);
//			hideMessageBox();
		}
	});
};

//==================================
UIFactory["SituApp"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			UIFactory["SituApp"].parse(data);
			if (uuid!=null)
				situations_byid[uuid].displayEditor(destid);
			else {
				SituApps_Display('situations-short_histo','short');
				SituApps_Display('situations-detail_histo','detail',parentid);
				SituApps_Display('situations_cv','cv');
			}
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};

//==================================
UIFactory["SituApp"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		situations_byid[parentid].displayEditor(destid);
	else {
		SituApps_Display('situations-short_histo','short');
		SituApps_Display('situations-detail_histo','detail',$("asmStructure:has(metadata[semantictag='projects'])", g_portfolio_current).attr('id'));
		SituApps_Display('situations_cv','cv');
	}
};

//==================================
UIFactory["SituApp"].parse = function(data) 
//==================================
{
	//------------for backward compatibility----------------
	if ($("asmStructure:has(metadata[semantictag='situations'])", data).length==0) {
		var targetid = $("asmRoot", data).attr('id');
		var srcecode = "IUT2portfolios.IUT2-portfolio";
		var srcetag = "situations";
		importBranch(targetid,srcecode,srcetag);
	}
		
	//--------------------------------------------------
	situations_byid = {};
	situations_list = [];
	var units = $("asmUnit:has(metadata[semantictag='situation-unit'])",data);
	var tableau = new Array();
	for ( var i = 0; i < units.length; i++) {
		var uuid = $(units[i]).attr('id');
		situations_byid[uuid] = new UIFactory["SituApp"](units[i]);
		//------------------
		var date_debut = UICom.structure["ui"][$("asmContext:has(metadata[semantictag='date-begin'])",units[i]).attr('id')].resource.getView();
		tableau[i] = [date_debut,uuid];
	}
	var newTableau = tableau.sort(sortOn1Desc);
	for (var i=0; i<newTableau.length; i++){
		situations_list[i] = situations_byid[newTableau[i][1]];
	}
};

//==================================
UIFactory["SituApp"].remove = function(uuid,parentid,destid)
//==================================
{
	UICom.DeleteNode(uuid);
	if(parentid!="undefined" && destid!="undefined"){
		$("#"+uuid,situations_byid[parentid].node).remove();
		situations_byid[uuid] = new UIFactory["SituApp"](situations_byid[parentid].node);
		situations_byid[parentid].displayEditor(destid);
	} else {
		$("#"+uuid,g_portfolio_current).remove();
		UIFactory["SituApp"].parse(g_portfolio_current);
		SituApps_Display('situations-short_histo','short');
		SituApps_Display('situations-detail_histo','detail',$("asmStructure:has(metadata[semantictag='situations'])", g_portfolio_current).attr('id'));
		SituApps_Display('situations_cv','cv');
	}
	// Mises à jour des compétences
	displayCompetencesMetiers(g_portfolio_current);
	displayCompetencesTrans(g_portfolio_current);
	displayCompetencesAutres(g_portfolio_current);
};

//==================================
UIFactory["SituApp"].prototype.get_data2send = function()
//==================================
{
	var str = "<SituApp>";
	str += getCompetencies2send(this.node,['autoeval']);	
	str += "</SituApp>";
//	alert(str);
	return str;
};

//==================================
function SituApps_Display(destid,type,parentid) {
//==================================
	$("#"+destid).html("");
	var html ="";
	if (type=='detail') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		var databack = false;
		var callback = "UIFactory['SituApp'].reloadparse";
		var param2 = "null";
		var param3 = "'"+destid+"'";
		var param4 = "'"+parentid+"'";
		html += "<div class='titre2'><span class='titre1'>Mes situations d'apprentissage</span><span id='help-projet-etudiant-label'></span>";
		if (g_userrole=='etudiant') {
			html += "<a  class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2composantes.IUT2-parts','situation-unit',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
			html += "Ajouter une situation d'apprentissage <i class='fa fa-plus-square'>";
			html += "</a></div>";
		}
	}
	if (type=='short' &&  situations_list.length>0){
		html += "<h5>Situation";
		if (situations_list.length>1)
			html+= "s"
		html += " d'apprentissage</h5>";
		}
	if (type=='detail' || type=='short') {
		html += "<div class='panel-group' id='accordion_"+destid+"'></div>";
		$("#"+destid).html(html);
		for ( var i = 0; i < situations_list.length; i++) {
			$("#accordion_"+destid).append($("<div id='"+destid+"_"+situations_list[i].id+"'></div>"));			
			situations_list[i].displayView(destid+"_"+situations_list[i].id,type,null,"accordion_"+destid);
		}
	}
}

//==================================
function getEnvoiFormulaireEvaluationBox(uuid,destid,eval_competences,lang,type)
//==================================
{
	appStr['fr']['are-you-sure']="Une fois la demande envoyée, vous ne pourrez plus modifier cette fiche. Êtes-vous sûr de vouloir poursuivre ?";
	appStr['fr']['sending-question-user']="Vous désirez envoyer une demande de validation de vos compétences à";
	appStr['fr']['sending-validation-request']="Vous désirez envoyer une demande de validation de vos compétences.";
	appStr['fr']['tutor-contact-request']="Veuillez renseigner le nom et l'adresse mail de l'évaluateur.";
	appStr['fr']['sending']="Envoi ...";

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
		var js1 = "javascript:setMessageBox('"+appStr[languages[lang]]['sending']+"');showMessageBox();envoyerFormulaireEvaluation('"+uuid+"','"+destid+"','"+refemail+"','tuteur',"+lang+",'"+type+"')";
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

	$("#alert-window").removeClass('alert-bleu alert-orange alert-orange alert-violet');
	$("#alert-window").addClass('alert-orange');
	$("#alert-window").modal('show');
}

//==================================
function envoyerFormulaireEvaluation(uuid,destid,email,role,lang,type) {
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
					sendMail_Evaluation(serverURL,data,email,lang,type);
					if (type=='SituApp')
						UIFactory['SituApp'].reloadparseone_submitted(uuid,'situations-detail_histo');
					if (type=='Projet')
						UIFactory['Projet'].reloadparseone_submitted(uuid,'projets-detail_histo');
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
function sendMail_Evaluation(serverURL,encodeddata,email,lang,type) {
//==================================
	var url = serverURL+"/"+appliname+"/application/htm/demande-evaluation.htm?i="+encodeddata+"&amp;type="+type+"&amp;lang="+languages[lang];
	var message_logo_url = serverURL + "/"+appliname + message_logo;
	var message = "";
	message += "&lt;img src='"+message_logo_url+"' style='width:300px;margin-bottom:4px;margin-top:30px;'&gt;";
	message += "&lt;br/&gt;"+appStr[languages[lang]]['hello']+",&lt;br/&gt;&lt;br/&gt;";
	message += appStr[languages[lang]]['request-evaluation-p1'];//	message += "&lt;div style='margin:20px;'&gt;";
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
	xml +="<subject>"+appStr[languages[lang]]['request-evaluation']+"</subject>";
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
UIFactory["SituApp"].prototype.updateOwner = function()
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
UIFactory["SituApp"].reloadparseone_submitted = function(uuid,destid) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='situation-unit'])",data);
			situations_byid[uuid] = new UIFactory["SituApp"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data));
			situations_byid[uuid].displayView(destid+"_"+uuid,"detail",null,"accordion_"+destid);
		}
	});
};

//==================================
UIFactory["SituApp"].prototype.displayEditor_demandeEval= function(destid,type,lang) {
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
		div = $("<div class='alert alert-orange alert-block edition'></div>");
	else
		div = $("<div class='alert alert-orange alert-block edition old-project'></div>");
	$("#"+destid).append(div);
	$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'></label>"));
	$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getView());
	var row = "<div class='row-fluid'><div id='A_"+this.id+"' class='span6'></div><div id='B_"+this.id+"' class='span6'></div></div>";
	$(div).append($(row));

	$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
	$("#formA_"+this.id).append($("<hr></hr>"));
	displayControlGroup_getView("formA_"+this.id,"Année de début","debut_"+this.id,this.begin_nodeid);
	displayControlGroup_getView("formA_"+this.id,"Durée","fin_"+this.id,this.duration_nodeid);
	displayControlGroup_displayView("formA_"+this.id,"Domaine métiers<span id='help-domaine-metier'></span>","dommet_"+this.id,this.domaine_metier_nodeid,"select");
	$("#formA_"+this.id).append($("<hr></hr>"));
	$("#formA_"+this.id).append($("<label class='inline'>Description de la situation, problème à résoudre, démarche,..</label>"));
	UICom.structure["ui"][this.description_nodeid].resource.getView("formA_"+this.id,'x100');

	$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
	
	//------------------ Tuteur ------------------
	if (this.referent_prenom_nodeid!=undefined) {
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Évaluateur</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		displayControlGroup_getView("formB_"+this.id,"Prénom","refprenom"+this.id,this.referent_prenom_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Nom","refnom"+this.id,this.referent_nom_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Courriel","email_"+this.id,this.referent_email_nodeid);
	}
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à cette action","SituApp","situations-detail_histo_","vert","situations_byid");
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
};


