//========================================================
//========================================================
//===================== Contact =======================
//========================================================
//========================================================
/// Check namespace existence
if( UIFactory === undefined )
{
  var UIFactory = {};
}

//==================================
UIFactory["Contact"] = function(node)
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.prenom_nodeid  = $("asmContext:has(metadata[semantictag='contact-prenom'])",node).attr('id');
	this.nom_nodeid  = $("asmContext:has(metadata[semantictag='contact-nom'])",node).attr('id');
	this.titre_nodeid  = $("asmContext:has(metadata[semantictag='contact-titre'])",node).attr('id');
	this.email_nodeid  = $("asmContext:has(metadata[semantictag='contact-email'])",node).attr('id');
	this.telephone_nodeid  = $("asmContext:has(metadata[semantictag='contact-telephone'])",node).attr('id');
};

//==================================
UIFactory["Contact"].prototype.displayView = function(destid,type,lang)
//==================================
{
	var lang_local = lang;
	if (lang==null) lang_local=LANGCODE;
	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type=='detail') {
		html += "	<div class='value'>"+UICom.structure["ui"][this.prenom_nodeid].resource.getView();
		html += " "+UICom.structure["ui"][this.nom_nodeid].resource.getView();
		
		if (UICom.structure["ui"][this.titre_nodeid].resource.getView()!="")
			html += ", "+UICom.structure["ui"][this.titre_nodeid].resource.getView();
		html += "	</div>";
		html += "	<div class='item'><a href='mailto:"+UICom.structure["ui"][this.email_nodeid].resource.getView()+"'>"+UICom.structure["ui"][this.email_nodeid].resource.getView()+"</a>";
		if (UICom.structure["ui"][this.telephone_nodeid].resource.getView()!="")
			html += " "+appStr[languages[lang_local]]['tel']+": "+UICom.structure["ui"][this.telephone_nodeid].resource.getView();
		html += "	</div>";
	}
	var obj = $(html);
	$("#"+destid).append(obj);
};
//==================================
UIFactory["Contact"].prototype.displayEditor = function(objid,destid,type,lang) {
//==================================
	var lang_local = lang;
	if (lang==null) lang_local=LANGCODE;
//	var callback = "UIFactory['Stage'].reloadparse";
//	var param1 = "'"+objid+"'";
//	var param2 = "'stages-detail'";
	var html = "<div class='control-group'><label class='control-label'>Contact</label>";
//	html += "   <span onclick=\"confirmDel('"+this.id+"','Contact','"+objid+"','"+destid+"')\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
//	html += "   <span onclick=\"confirmDel('"+this.id+"','Stage','"+objid+"','stages-detail',"+callback+","+param1+","+param2+")\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
	html += "   <span onclick=\"confirmDel('"+this.id+"','Contact','"+objid+"','stages-detail_histo_"+objid+"','UIFactory.Stage.reloadparseone','"+objid+"','stages-detail_histo_"+objid+"')\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
	html += "     <i class='fa fa-trash-o'></i>";
	html += "   </span></div>";
	$("#"+destid).append($(html));
	displayControlGroup_getEditor(destid,appStr[languages[lang_local]]['firstname'],"prenom"+this.id,this.prenom_nodeid);
	displayControlGroup_getEditor(destid,appStr[languages[lang_local]]['surname'],"nom"+this.id,this.nom_nodeid);
	displayControlGroup_getEditor(destid,appStr[languages[lang_local]]['position'],"titre_"+this.id,this.titre_nodeid);
	displayControlGroup_getEditor(destid,appStr[languages[lang_local]]['email'],"email_"+this.id,this.email_nodeid);
	displayControlGroup_getEditor(destid,appStr[languages[lang_local]]['phone'],"tel_"+this.id,this.telephone_nodeid);
};

//==================================
UIFactory["Contact"].remove = function(uuid,parentid,destid,callback,param1,param2)
//==================================
{
	$('#wait-window').show();
	UICom.DeleteNode(uuid,callback,param1,param2);
}