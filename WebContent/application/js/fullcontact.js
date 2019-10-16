//========================================================
//========================================================
//===================== FullContact =======================
//========================================================
//========================================================
/// Check namespace existence
if( UIFactory === undefined )
{
  var UIFactory = {};
}

//==================================
UIFactory["FullContact"] = function(node)
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.prenom_nodeid  = $("asmContext:has(metadata[semantictag='contact-prenom'])",node).attr('id');
	this.nom_nodeid  = $("asmContext:has(metadata[semantictag='contact-nom'])",node).attr('id');
	this.titre_nodeid  = $("asmContext:has(metadata[semantictag='contact-titre'])",node).attr('id');
	this.email_nodeid  = $("asmContext:has(metadata[semantictag='contact-email'])",node).attr('id');
	this.telephone_nodeid  = $("asmContext:has(metadata[semantictag='contact-telephone'])",node).attr('id');
	this.name_nodeid  = $("asmContext:has(metadata[semantictag='estb-name'])",node).attr('id');
	this.service_nodeid  = $("asmContext:has(metadata[semantictag='service'])",node).attr('id');
	this.street_nodeid  = $("asmContext:has(metadata[semantictag='street'])",node).attr('id');
	this.town_nodeid  = $("asmContext:has(metadata[semantictag='town'])",node).attr('id');
	this.postalcode_nodeid  = $("asmContext:has(metadata[semantictag='postalcode'])",node).attr('id');
	this.country_nodeid  = $("asmContext:has(metadata[semantictag='country'])",node).attr('id');
	this.stage_lieu_nodeid = $("asmContext:has(metadata[semantictag='stage-lieu'])",node).attr('id');
	this.website_nodeid  = $("asmContext:has(metadata[semantictag='website'])",node).attr('id');
};

//==================================
UIFactory["FullContact"].prototype.displayView = function(destid,type,lang)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type=='detail') {
		html += "<div class='value'>"+UICom.structure["ui"][this.prenom_nodeid].resource.getView();
		html += " "+UICom.structure["ui"][this.nom_nodeid].resource.getView();
		if (UICom.structure["ui"][this.titre_nodeid].resource.getView()!="")
			html += ", "+UICom.structure["ui"][this.titre_nodeid].resource.getView();
		html += "</div>";
		html += "<div class='item'><a href='mailto:"+UICom.structure["ui"][this.email_nodeid].resource.getView()+"'>"+UICom.structure["ui"][this.email_nodeid].resource.getView()+"</a>";
		if (UICom.structure["ui"][this.telephone_nodeid].resource.getView()!="")
			html += " Tel: "+UICom.structure["ui"][this.telephone_nodeid].resource.getView();
		html += "</div>";
		html += "<div class='item'>Organisme :</div><br/>";
		html += "<div class='item libelle'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		
		html += "<div class='item'>"+UICom.structure["ui"][this.service_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.street_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.town_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.postalcode_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.country_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.website_nodeid].resource.getView(null,'same')+"</div>";
	}
	var obj = $(html);
	$("#"+destid).append(obj);
};

//==================================
UIFactory["FullContact"].prototype.displayEditor = function(objid,destid,type,del,lang) {
//==================================
	if (del) {
		var html = "<div class='control-group'><label class='control-label'>Contact</label>";
//		html += "   <span onclick=\"confirmDel('"+this.id+"','Projet','"+objid+"','projets-detail')\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
		html += "   <span onclick=\"confirmDel('"+this.id+"','FullContact','"+objid+"','projets-detail_histo_"+objid+"','UIFactory.Projet.reloadparseone','"+objid+"','projets-detail_histo_"+objid+"')\" data-title='"+karutaStr[LANG]["button-delete"]+"' rel='tooltip'>";
		html += "     <i class='fa fa-trash-o'></i>";
		html += "   </span></div>";
		$("#"+destid).append($(html));		
	}
	displayControlGroup_getEditor(destid,"Prénom","prenom"+this.id,this.prenom_nodeid);
	displayControlGroup_getEditor(destid,"Nom","nom"+this.id,this.nom_nodeid);
	displayControlGroup_getEditor(destid,"Fonction","titre_"+this.id,this.titre_nodeid);
	displayControlGroup_getEditor(destid,"Courriel","email_"+this.id,this.email_nodeid);
	displayControlGroup_getEditor(destid,"Téléphone","tel_"+this.id,this.telephone_nodeid);
	displayControlGroup_getEditor(destid,"Organisme","org_"+this.id,this.name_nodeid);
	displayControlGroup_getEditor(destid,"Service","service_"+this.id,this.service_nodeid);
	displayControlGroup_getEditor(destid,"Adresse","rue_"+this.id,this.street_nodeid);
	displayControlGroup_getEditor(destid,"Code postal","code_"+this.id,this.postalcode_nodeid);
	displayControlGroup_getEditor(destid,"Ville","ville_"+this.id,this.town_nodeid);
	displayControlGroup_getEditor(destid,"Pays","pays_"+this.id,this.country_nodeid);
	$("#"+destid).append(UICom.structure["ui"][this.website_nodeid].resource.getEditor('same-control-group'));
};

//==================================
UIFactory["FullContact"].remove = function(uuid,parentid,destid,callback,param1,param2)
//==================================
{
	$('#wait-window').show();
	UICom.DeleteNode(uuid,callback,param1,param2);
}

