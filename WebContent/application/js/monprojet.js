		
//========================================================
//========================================================
//===================== MONPROJET ========================
//========================================================
//========================================================

var MonProjet = null;

//==================================
UIFactory["MonProjet"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	// ---------------------------------------
	this.node = node;
	this.description_nodeid = $("asmContext:has(metadata[semantictag='projet_description_text'])",node).attr('id');
	// ---------------------------------------
	this.comps_metiers_node = $("metadata[semantictag*='comps-metiers']",node).parent();
	this.comps_trans_node = $("metadata[semantictag*='comps-trans']",node).parent();
	this.comps_autres_node = $("metadata[semantictag*='comps-autres']",node).parent();
};

//==================================
UIFactory["MonProjet"].displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // to empty html
	//----------------------------------------------
	if (type=='description') {
		html += "<h4 class='panel-title'>";
		html += "Description de mon projet";
		if (g_userrole=='etudiant') {
			html += "<span  class='editbutton' onclick=\"javascript:UIFactory.MonProjet.displayEditor('"+destid+"','description');\" data-title='éditer' rel='tooltip'>";
			html += "<i class='fa fa-edit'></i>";
			html += "</span>";
		}
		html += "</h4>";
		//---------------------------------------------------------
		html += "<div class='mon_projet_description'>";
		html += UICom.structure["ui"][MonProjet.description_nodeid].resource.getView();
		html += "</div>";
	}
	//----------------------------------------------
	var edit_comp = false;
	if (g_userrole=='etudiant') {
		edit_comp = true;
	}
	if (type=='projet_metiers') {
		html = getPrefCompetencesMetiers(MonProjet.comps_metiers_node,edit_comp);
	}
	if (type=='projet_trans') {
		html = getPrefCompetencesTrans(MonProjet.comps_trans_node,edit_comp);
	}
	if (type=='projet_autres') {
		html = getPrefCompetencesAutres(MonProjet.comps_autres_node,edit_comp);
	}
	//----------------------------------------------
	var obj = $(html);
	$("#"+destid).append(obj);
//	for (var i=0; i<eval_competences.length;i++){
//		UICom.structure["ui"][eval_competences[i]].resource.displayEditor("eval_"+eval_competences[i],null,null,null,true);
//	}
};
//==================================
UIFactory["MonProjet"].displayEditor = function(destid,type,lang) {
//==================================
	var html = "";
	$("#"+destid).html(html);
	if (type=='description') {
		html += "<h4 class='panel-title'>";
		html += "Description de mon projet";
		if (g_userrole=='etudiant') {
			html += "<a  class='btn btn-mini editbutton' onclick=\"javascript:UIFactory.MonProjet.displayView('"+destid+"','description');\">";
			html += "Quitter le mode édition";
			html += "</a>";
		}
		html += "</h4>";
		html += "<div class='mon_projet_description' id='mon_projet_description'></div>";
		var obj = $(html);
		$("#"+destid).append(obj);
		UICom.structure["ui"][MonProjet.description_nodeid].resource.displayEditor("mon_projet_description");
	}
};

//==================================
UIFactory["MonProjet"].addCompetenceMetier = function() 
//==================================
{
		var color = "vert";
		var html = "";
		// ------------------------------------
		objtype_competencies_node = MonProjet.comps_metiers_node;
		objtype_to_add_competencies = "MonProjet";
		var js1 = "addCompetencies2('"+g_projetid+"','activite','competence-metier')";
		var js2 = "javascript:$('#activite-window').modal('hide')";
		var header = "<span class='btn btn-mini btn-"+color+"' onclick=\""+js1+";\">Ajouter les compétences sélectionnées</span>&nbsp;";
		header += " <span class='btn btn-mini btn-"+color+"' onclick=\""+js2+";\">"+karutaStr[LANG]['Close']+"</span>&nbsp;";
		$("#activite-window-header").html($(header));
		// ------------------------------------
		$("#activite-window-body").html(getSelectorPrefCompetencesMetiers(g_portfolio_current));
		// ------------------------------------

		$("#activite-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
		$("#activite-window").addClass('alert-'+color);
		$("#activite-window").modal('show');
};

//==================================
UIFactory["MonProjet"].addCompetenceTrans = function() 
//==================================
{
		var color = "bleu";
		var html = "";
		// ------------------------------------
		objtype_competencies_node = MonProjet.comps_trans_node;
		objtype_to_add_competencies = "MonProjet";
		var js1 = "addCompetencies2('"+g_projetid+"','activite','competence-trans')";
		var js2 = "javascript:$('#activite-window').modal('hide')";
		var header = "<span class='btn btn-mini btn-"+color+"' onclick=\""+js1+";\">Ajouter les compétences sélectionnées</span>&nbsp;";
		header += " <span class='btn btn-mini btn-"+color+"' onclick=\""+js2+";\">"+karutaStr[LANG]['Close']+"</span>&nbsp;";
		$("#activite-window-header").html($(header));
		// ------------------------------------
		$("#activite-window-body").html(getSelectorPrefCompetencesTrans(g_portfolio_current));
		// ------------------------------------

		$("#activite-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
		$("#activite-window").addClass('alert-'+color);
		$("#activite-window").modal('show');
};

//==================================
UIFactory["MonProjet"].addCompetenceAutres = function() 
//==================================
{
		var color = "violet";
		var html = "";
		// ------------------------------------
		objtype_competencies_node = MonProjet.comps_autres_node;
		objtype_to_add_competencies = "MonProjet";
		var js1 = "addCompetencies2('"+g_projetid+"','activite','free-comp-autre')";
		var js2 = "javascript:$('#activite-window').modal('hide')";
		var header = "<span class='btn btn-mini btn-"+color+"' onclick=\""+js1+";\">Ajouter les compétences sélectionnées</span>&nbsp;";
		header += " <span class='btn btn-mini btn-"+color+"' onclick=\""+js2+";\">"+karutaStr[LANG]['Close']+"</span>&nbsp;";
		$("#activite-window-header").html($(header));
		// ------------------------------------
		$("#activite-window-body").html(getSelectorPrefCompetencesAutres(g_portfolio_current));
		// ------------------------------------

		$("#activite-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
		$("#activite-window").addClass('alert-'+color);
		$("#activite-window").modal('show');
};


//==================================
UIFactory["MonProjet"].parse = function(data) 
//==================================
{
	MonProjet = new UIFactory["MonProjet"](data);
};

//==================================
UIFactory["MonProjet"].reloadparseone = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + g_projetid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			UIFactory["MonProjet"].parse(data);
			UIFactory["MonProjet"].displayView('projet_metiers','projet_metiers');						
			UIFactory["MonProjet"].displayView('projet_trans','projet_trans');						
			UIFactory["MonProjet"].displayView('projet_autres','projet_autres');						
			$("#added-window").modal('hide');
			$("#activite-window").modal('hide');
		}
	});
};

//==================================
UIFactory["MonProjet"].remove = function(uuid,parentid,destid,callback,param1,param2)
//==================================
{
	UICom.DeleteNode(uuid);
	$("#"+uuid,MonProjet.node).remove();
	UIFactory["MonProjet"].parse(MonProjet.node);
	UIFactory["MonProjet"].displayView('projet_metiers','projet_metiers');						
	UIFactory["MonProjet"].displayView('projet_trans','projet_trans');						
	UIFactory["MonProjet"].displayView('projet_autres','projet_autres');						
};

//==================================================================
//==================================================================
//==================================================================
//==================================================================

//==================================
function getSelectorPrefCompetencesMetiers(data)
//==================================
{
	var tableau = null;
	g_htmlDetail1 = "";
	//-----------------------------------------------
	tableau = searchCompetencies(data,'domaine-metier','activite','competence-metier');
	g_htmlDetail1 += getDetailCompetencies(tableau,1,'projet');
	//-----------------------------------------------
	tableau = searchFreeCompetencies(data,'dom-metier-ref','dom-metier-ref','free-comp-metier');
	g_htmlDetail1 += getDetailCompetencies(tableau,2,'projet');
	//----------------------------
	return g_htmlDetail1;
}

//==================================
function getSelectorPrefCompetencesTrans(data)
//==================================
{
	var tableau = null;
	var html = "";
	var monprojet = true;
	eval_competences = new Array();
	//-----------------------------------------------
	tableau = searchCompetencies(data,null,'activite','competence-trans',monprojet);
	html += getDetailCompetencies(tableau,3,'projet');
	//-----------------------------------------------
	comps2_objs = $("metadata[semantictag*='comps2a-autres']",data).parent();
	tableau = searchCompetencies(comps2_objs,null,'dom-autre-ref','free-comp-autre',monprojet);
	html += getDetailCompetencies(tableau,4,'projet');
	//-----------------------------------------------
	comps2_objs = $("metadata[semantictag*='comps2b-autres']",data).parent();
	tableau = searchCompetencies(comps2_objs,null,'dom-autre-ref','free-comp-autre',monprojet);
	html += getDetailCompetencies(tableau,5,'projet');
	//-----------------------------------------------
	return html;
}

//==================================
function getSelectorPrefCompetencesAutres(data)
//==================================
{
	var tableau = null;
	var html = "";
	var monprojet = true;
	eval_competences = new Array();
	//-----------------------------------------------
	comps2_objs = $("metadata[semantictag*='comps2c-autres']",data).parent();
	tableau = searchCompetencies(comps2_objs,null,'dom-autre-ref','free-comp-autre',monprojet);
	html += getDetailCompetencies(tableau,6,'projet');
	//-----------------------------------------------
	return html;
}

//==================================
function getPrefCompetencesMetiers(data,edit)
//==================================
{
	var tableau = null;
	var html = "";
	var monprojet = true;
	eval_competences = new Array();
	//-----------------------------------------------
	tableau = searchCompetencies(data, null,'activite','competence-metier',monprojet);
	html += getDetailCompetencies(tableau,1,null,edit,'MonProjet',g_projetid,'projet_metiers',monprojet);
	return html;
}

//==================================
function getPrefCompetencesTrans(data,edit)
//==================================
{
	var tableau = null;
	var html = "";
	var monprojet = true;
	eval_competences = new Array();
	//-----------------------------------------------
	tableau = searchCompetencies(data,null,'activite','competence-trans',monprojet);
	html += getDetailCompetencies(tableau,3,null,edit,'MonProjet',g_projetid,'projet_trans');
	//-----------------------------------------------
	return html;
}

//==================================
function getPrefCompetencesAutres(data,edit)
//==================================
{
	var tableau = null;
	var html = "";
	var monprojet = true;
	eval_competences = new Array();
	//-----------------------------------------------
	tableau = searchCompetencies(data,null,'activite','free-comp-autre',monprojet);
	html += getDetailCompetencies(tableau,6,null,edit,'MonProjet',g_projetid,'projet_autres');
	//-----------------------------------------------
	return html;
}

