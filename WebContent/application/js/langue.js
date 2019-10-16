//========================================================
//========================================================
//===================== Langues =========================
//========================================================
//========================================================

var langues_byid = {};
var langues_list = [];

//==================================
UIFactory["Langue"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.semantictag = $("metadata",node).attr('semantictag');
	this.language_nodeid = $("asmContext:has(metadata[semantictag='ForeignLanguage'])",node).attr('id');
	this.listening_nodeid = $("asmContext:has(metadata[semantictag='Listening'])",node).attr('id');
	this.reading_nodeid = $("asmContext:has(metadata[semantictag='Reading'])",node).attr('id');
	this.spokenInteraction_nodeid = $("asmContext:has(metadata[semantictag='SpokenInteraction'])",node).attr('id');
	this.spokenProduction_nodeid = $("asmContext:has(metadata[semantictag='SpokenProduction'])",node).attr('id');
	this.writing_nodeid = $("asmContext:has(metadata[semantictag='Writing'])",node).attr('id');
};

//==================================
UIFactory["Langue"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type==null || type=='short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;";
		html += "<a href='#' onclick=\"javascript:$('#tabs_histo li:eq(5) a').tab('show')\">";
		html += "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.language_nodeid].resource.getView(destid+"_short_label","span")+"</span>";
		html += "</a>";
	}
	if (type=='comp-short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;";
		html += "<a href='#' onclick=\"javascript:$('#tabs_comp li:eq(4) a').tab('show')\">";
		html += "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.language_nodeid].resource.getView(destid+"_short_label","span")+"</span>";
		html += "</a>";
	}
	if (type=='detail' || type=='cv' || type=='comp') {
		//---------------------------------------------------------
		html +="<td class='langue' id='"+type+"_language_"+this.id+"'>"+UICom.structure["ui"][this.language_nodeid].resource.getView(type+"_language_"+this.id,"span")+"</td>";
		html +="<td class='bordure' id='"+type+"_listening_"+this.id+"'>"+UICom.structure["ui"][this.listening_nodeid].resource.getValue(type+"_listening_"+this.id)+"</td>";
		html +="<td class='bordure' id='"+type+"_reading_"+this.id+"'>"+UICom.structure["ui"][this.reading_nodeid].resource.getValue(type+"_reading_"+this.id)+"</td>";
		html +="<td class='bordure' id='"+type+"_spokenInteraction_"+this.id+"'>"+UICom.structure["ui"][this.spokenInteraction_nodeid].resource.getValue(type+"_spokenInteraction_"+this.id)+"</td>";
		html +="<td class='bordure' id='"+type+"_spokenProduction_"+this.id+"'>"+UICom.structure["ui"][this.spokenProduction_nodeid].resource.getValue(type+"_spokenProduction_"+this.id)+"</td>";
		html +="<td class='bordure' id='"+type+"_writing_"+this.id+"'>"+UICom.structure["ui"][this.writing_nodeid].resource.getValue(type+"_writing_"+this.id)+"</td>";
		if (g_userrole=='etudiant' && type=='detail') {
			html +="<td style='text-align:left'>";
			html += "&nbsp;&nbsp;<span onclick=\"javascript: confirmDel('"+this.id+"','Langue')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
			html += " <span onclick=\"javascript:langues_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
			html += "<i class='fa fa-edit'></i>";
			html += "</span>";
			html +="</td>";
		}
		//---------------------------------------------------------
	}
	var obj = $(html);
	$("#"+destid).append(obj);
};
//==================================
UIFactory["Langue"].prototype.displayEditor = function(destid,type,lang)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // on vide html
		//---------------------------------------------------------
		html +="<td id='language_edit'></td>";
		html +="<td class='bordure'><span id='listening_"+this.id+"_edit'>"+UICom.structure["ui"][this.listening_nodeid].resource.getValue("listening_"+this.id+"_edit")+"</span>";
		html += " <a  class='btn btn-mini' onclick=\"javascript:UIFactory.Langue.editSkill('listening_edit','"+this.listening_nodeid+"','Écouter')\" data-title='éditer' rel='tooltip'>";
		html += "Choisir";
		html += "</a>";
		html +="</td>";
		html +="<td class='bordure'><span id='reading_"+this.id+"_edit'>"+UICom.structure["ui"][this.reading_nodeid].resource.getValue("reading_"+this.id+"_edit")+"</span>";
		html += " <a  class='btn btn-mini' onclick=\"javascript:UIFactory.Langue.editSkill('reading_edit','"+this.reading_nodeid+"','Lire')\" data-title='éditer' rel='tooltip'>";
		html += "Choisir";
		html += "</a>";
		html +="</td>";
		html +="<td class='bordure'><span id='spokenInteraction_"+this.id+"_edit'>"+UICom.structure["ui"][this.spokenInteraction_nodeid].resource.getValue("spokenInteraction_"+this.id+"_edit")+"</span>";
		html += " <a  class='btn btn-mini' onclick=\"javascript:UIFactory.Langue.editSkill('spokenInteraction_edit','"+this.spokenInteraction_nodeid+"','Prendre part à une conversation')\" data-title='éditer' rel='tooltip'>";
		html += "Choisir";
		html += "</a>";
		html +="</td>";
		html +="<td class='bordure'><span id='spokenProduction_"+this.id+"_edit'>"+UICom.structure["ui"][this.spokenProduction_nodeid].resource.getValue("spokenProduction_"+this.id+"_edit")+"</span>";
		html += " <a  class='btn btn-mini' onclick=\"javascript:UIFactory.Langue.editSkill('spokenProduction_edit','"+this.spokenProduction_nodeid+"','S&amp;#39;exprimer oralement en continu')\" data-title='éditer' rel='tooltip'>";
		html += "Choisir";
		html += "</a>";
		html +="</td>";
		html +="<td class='bordure'><span id='writing_"+this.id+"_edit'>"+UICom.structure["ui"][this.writing_nodeid].resource.getValue("writing_"+this.id+"_edit")+"</span>";
		html += " <a  class='btn btn-mini' onclick=\"javascript:UIFactory.Langue.editSkill('writing_edit','"+this.writing_nodeid+"','Écrire')\" data-title='éditer' rel='tooltip'>";
		html += "Choisir";
		html += "</a>";
		html +="</td>";
		html +="<td style='text-align:left'>";
		html += "<a  class='btn btn-mini editbutton' onclick=\"javascript:langues_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
		html += "Quitter le mode édition";
		html += "</a>";
		html +="</td>";
		//---------------------------------------------------------
	var obj = $(html);
	$("#"+destid).append(obj);
	UICom.structure["ui"][this.language_nodeid].resource.displayEditor("language_edit");
};


//==================================
UIFactory["Langue"].editSkill = function(destid,uuid,title)
//==================================
{
	$("#langue-window-header").html("<h4>"+title+"</h4>");
	$("#langue-window-body").html("<div id='"+destid+"'></div>");
	UICom.structure["ui"][uuid].resource.displayEditor(destid,"radio");
	$("#langue-window").modal("show");
};

//==================================
UIFactory["Langue"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + parentid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			UIFactory["Langue"].parse(data);
			Langues_Display('langues-short_histo','short');
			Langues_Display('langues-detail_histo','detail',parentid,g_mother_tongueid);
			Langues_Display('langues-short_comp','short');
			Langues_Display('langues-detail_comp','comp');
			Langues_Display('langues-detail_cv','cv');
			if (callback!=null)
				callback(param1,param2,param3,param4);
		}
	});
};

//==================================
UIFactory["Langue"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		langues_byid[parentid].displayEditor(destid);
	Langues_Display('langues-short_histo','short');
	Langues_Display('langues-detail_histo','detail',parentid,g_mother_tongueid);
	Langues_Display('langues-short_comp','short');
	Langues_Display('langues-detail_comp','comp');
	Langues_Display('langues-detail_cv','cv');
};

//==================================
UIFactory["Langue"].parse = function(data) 
//==================================
{
	langues_byid = {};
	langues_list = [];
	var items = $("asmUnitStructure:has(metadata[semantictag='europass_language'])",data);
	for ( var i = 0; i < items.length; i++) {
		langues_byid[$(items[i]).attr('id')] = new UIFactory["Langue"](items[i]);
		langues_list[i] = langues_byid[$(items[i]).attr('id')];
	}
};

//==================================
UIFactory["Langue"].remove = function(uuid)
//==================================
{
	$.ajaxSetup({async: false});
	UICom.DeleteNode(uuid);
	var parentid = $("asmUnit:has(metadata[semantictag='langues-unit'])", g_portfolio_current).attr('id');
	UIFactory["Langue"].reloadparse(null,null,parentid);
	$.ajaxSetup({async: true});
};

//==================================
UIFactory["Langue"].displayMothertongue = function(uuid)
//==================================
{
	$("#mother_tongue").html("");
	var html = UICom.structure["ui"][uuid].resource.getView("mother_tongue","span");
	if (g_userrole=='etudiant') {
		html += " <span onclick=\"javascript:UIFactory.Langue.editMothertongue('"+g_mother_tongueid+"');\" data-title='éditer' rel='tooltip'>";
		html += "<i class='fa fa-edit'></i>";
		html += "</span>";
	}
	$("#mother_tongue").html(html);
};

//==================================
UIFactory["Langue"].editMothertongue = function(uuid)
//==================================
{
	$("#mother_tongue").html("");
	UICom.structure["ui"][uuid].resource.displayEditor("mother_tongue");
	var html = "<a  class='btn btn-mini btn-editmothertongue' style='margin-left:5px' onclick=\"UIFactory.Langue.displayMothertongue('"+uuid+"');\">";
	html += "Quitter le mode édition";
	html += "</a>";
	$("#mother_tongue").append($(html));
};

//==================================
UIFactory["Langue"].prototype.get_data2send_csv = function()
//==================================
{
	var str = "";
	str += getDataByTypeTag_csv("value",this.node,"ForeignLanguage");
	str += getDataByTypeTag_csv("value",this.node,"Listening");
	str += getDataByTypeTag_csv("value",this.node,"Reading");
	str += getDataByTypeTag_csv("value",this.node,"SpokenInteraction");
	str += getDataByTypeTag_csv("value",this.node,"SpokenProduction");
	str += getDataByTypeTag_csv("value",this.node,"Writing");
	return str;
};

//==================================
UIFactory["Langue"].prototype.get_data2send_xml = function()
//==================================
{
	var str = "<langue>";
	str += getDataByTypeTag_xml("code","value",this.node,"ForeignLanguage");
	str += getDataByTypeTag_xml("Listening","value",this.node,"Listening");
	str += getDataByTypeTag_xml("Reading","value",this.node,"Reading");
	str += getDataByTypeTag_xml("SpokenInteraction","value",this.node,"SpokenInteraction");
	str += getDataByTypeTag_xml("SpokenProduction","value",this.node,"SpokenProduction");
	str += getDataByTypeTag_xml("Writing","value",this.node,"Writing");
	str += "</langue>";
//	alert(str);
	return str;
};

//==================================
function data2send_langues_csv() {
//==================================
	var str = "";
	str += $(UICom.structure["ui"][g_mother_tongueid].resource.value_node).text()+";"
	str += data2send_csv(langues_list);
	return str;
}

//==================================
function data2send_langues_xml() {
//==================================
	var str = "<Langues>";
	str += "<langue-maternelle>"+$(UICom.structure["ui"][g_mother_tongueid].resource.value_node).text()+"</langue-maternelle>"
	str += data2send_xml("langues-europass",langues_list);
	str += "</Langues>";
	return str;
}

//==================================
function Langues_Display(destid,type,parentid)
//==================================
{
	$("#"+destid).html("");
	var html ="";
	if (type=='detail') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		var databack = false;
		var callback = "UIFactory['Langue'].reloadparse";
		var param2 = "null";
		var param3 = "'"+destid+"'";
		var param4 = "'"+parentid+"'";
		html += "<div class='titre2'><span class='titre1'>Mes langues maternelle et etrangères<span id='help-langues-label'></span></span>";
		if (g_userrole=='etudiant') {
			html += "<a class='editbutton' href=\"javascript:importBranch('"+parentid+"','IUT2composantes.IUT2-parts','europass_language',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
			html += "Ajouter une langue étrangère <i class='fa fa-plus-square'></i>";
			html += "</a>";
		}
		html += "</div>";
		html += "<h5>Langue maternelle : ";
		html += "<span class='langue' id='mother_tongue'>"+UICom.structure["ui"][g_mother_tongueid].resource.getView("mother_tongue","span");
		if (g_userrole=='etudiant') {
			html += " <span onclick=\"javascript:UIFactory.Langue.editMothertongue('"+g_mother_tongueid+"');\" data-title='éditer' rel='tooltip'>";
			html += "<i class='fa fa-edit'></i>";
			html += "</span>";
		}
		html +="</span>";
		html +="</h5>";
		html += "<h5>Langue étrangère(s) ";
		html +="</h5>";
		html += "<table id='"+destid+"europass_table' class='europass_table'>";
		html += "<tr class='en-tete'><td> </td><td class='bordure' colspan='2'>COMPRENDRE</td><td class='bordure' colspan='2'>PARLER</td><td class='bordure'>ÉCRIRE</td></tr>";
		html += "<tr class='en-tete'><td> </td><td class='bordure'>Écouter</td><td class='bordure'>Lire</td><td class='bordure'>Prendre part à une conversation</td><td class='bordure'>S'exprimer oralement en continu</td><td class='bordure'> </td></tr>";
		html += "</table>";
		$("#"+destid).html(html);
		for ( var i = 0; i < langues_list.length; i++) {
				$("#"+destid+"europass_table").append($("<tr id='"+destid+"_"+langues_list[i].id+"'></tr>"));			
				langues_list[i].displayView(destid+"_"+langues_list[i].id,type,null,"accordion_"+destid);
		}
	}
	if (type=='short' || type=='comp-short') {
		for ( var i = 0; i < langues_list.length; i++) {
			$("#"+destid).append($("<div id='"+destid+"_"+langues_list[i].id+"'></div>"));			
			langues_list[i].displayView(destid+"_"+langues_list[i].id,type,null,"accordion_"+destid);
		}
	}
	if (type=='cv') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		if (type=='cv' && langues_list.length>0)
			$("#other-tongue").show();
		if (type=='cv' && langues_list.length==0)
			$("#other-tongue").hide();
		html += "<table id='"+destid+"europass_table' class='europass_table'>";
		html += "<tr class='en-tete'><td> </td><td class='bordure' colspan='2'>COMPRENDRE</td><td class='bordure' colspan='2'>PARLER</td><td class='bordure'>ÉCRIRE</td></tr>";
		html += "<tr class='en-tete'><td> </td><td class='bordure'>Écouter</td><td class='bordure'>Lire</td><td class='bordure'>Prendre part à une conversation</td><td class='bordure'>S'exprimer oralement en continu</td><td class='bordure'> </td></tr>";
		html += "</table>";
		$("#"+destid).html(html);
		for ( var i = 0; i < langues_list.length; i++) {
				$("#"+destid+"europass_table").append($("<tr id='"+destid+"_"+langues_list[i].id+"'></tr>"));			
				langues_list[i].displayView(destid+"_"+langues_list[i].id,type,null,"accordion_"+destid);
		}
	}
	if (type=='comp') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		html += "<h5>Langue maternelle : ";
		html += "<span class='langue' id='mother_tongue'>"+UICom.structure["ui"][g_mother_tongueid].resource.getView("mother_tongue","span");
		html +="</span>";
		html +="</h5>";
		html += "<h5>Langue étrangère(s) ";
		html +="</h5>";
		html += "<table id='"+destid+"europass_table' class='europass_table'>";
		html += "<tr class='en-tete'><td> </td><td class='bordure' colspan='2'>COMPRENDRE</td><td class='bordure' colspan='2'>PARLER</td><td class='bordure'>ÉCRIRE</td></tr>";
		html += "<tr class='en-tete'><td> </td><td class='bordure'>Écouter</td><td class='bordure'>Lire</td><td class='bordure'>Prendre part à une conversation</td><td class='bordure'>S'exprimer oralement en continu</td><td class='bordure'> </td></tr>";
		html += "</table>";
		$("#"+destid).html(html);
		for ( var i = 0; i < langues_list.length; i++) {
				$("#"+destid+"europass_table").append($("<tr id='"+destid+"_"+langues_list[i].id+"'></tr>"));			
				langues_list[i].displayView(destid+"_"+langues_list[i].id,type,null,"accordion_"+destid);
		}
	}

}


