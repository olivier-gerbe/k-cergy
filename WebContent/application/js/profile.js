//========================================================
//========================================================
//===================== Profile =======================
//========================================================
//========================================================
var profiles_byid = {};
var profiles_list = [];

/// Check namespace existence
if( UIFactory === undefined )
{
  var UIFactory = {};
}

//==================================
UIFactory["Profile"] = function(node)
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.photo_nodeid = $("asmContext:has(metadata[semantictag='photo'])",node).attr('id');
	this.firstname_nodeid = $("asmContext:has(metadata[semantictag='firstname'])",node).attr('id');
	this.lastname_nodeid = $("asmContext:has(metadata[semantictag='lastname'])",node).attr('id');
	this.email_nodeid = $("asmContext:has(metadata[semantictag='email'])",node).attr('id');
	if (applitype=='FTLV'){
		$(UICom.structure["ui"][this.firstname_nodeid].resource.text_node[LANGCODE]).text(USER.firstname_node.text());
		$(UICom.structure["ui"][this.lastname_nodeid].resource.text_node[LANGCODE]).text(USER.lastname_node.text());
		$(UICom.structure["ui"][this.email_nodeid].resource.text_node[LANGCODE]).text(USER.email_node.text());
	}
	this.profil_inter_qs = $("asmContext:has(metadata[semantictag*='profil-inter-question-select'])",node);
	this.periode_nodeid = $($("asmContext:has(metadata[semantictag*='periode-sejours-etranger'])",node)[0]).attr('id');
	this.sejours_nodeid = $($("asmContext:has(metadata[semantictag*='total-sejours-etranger'])",node)[0]).attr('id');
	this.superviseur_nodeid = $($("asmContext:has(metadata[semantictag*='superviseur'])",node)[0]).attr('id');
	if (this.superviseur_nodeid!=undefined)
		this.superviseur = (UICom.structure["ui"][this.superviseur_nodeid].resource.getText()=='o') ? true : false;
};

//==================================
UIFactory["Profile"].prototype.displayView = function(destid,type,lang)
//==================================
{
//	var profile = $('iframe').contents();

	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type==null || type=='short') {
		var photo = UICom.structure["ui"][this.photo_nodeid].resource.getView(destid+"_short_photo");
		var firstname = UICom.structure["ui"][this.firstname_nodeid].resource.getView(destid+"_short_firstname");
		var lastname = UICom.structure["ui"][this.lastname_nodeid].resource.getView(destid+"_short_lastname");
		html += "<div class='row-fluid'>";
		html += "  <div class='span3'>";
		html += "    <span id='"+destid+"_short_photo' style='border-radius:50%'>"+photo+"</span> ";
		html += "  </div>";
		html += "  <div class='span9'>";
		html += "    <h3 class='media-heading' style='vertical-align:middle'>Bienvenue ";
		html += "      <span id='"+destid+"_short_firstname'>"+firstname+"</span> ";
		html += "      <span id='"+destid+"_short_lastname'>"+lastname+"</span> ";
		html += "      dans votre ePortfolio KARUTA IUT";
		html += "    </h3>";
		html += "  </div>";
		html += "</div>";
	}
	if (type==null || type=='photo') {
		var photo = UICom.structure["ui"][this.photo_nodeid].resource.getView(destid+"_short_photo");
		html += "<span id='"+destid+"_short_photo'>"+photo+"</span> ";
	}
	if (type==null || type=='lastname_firstname') {
		var firstname = UICom.structure["ui"][this.firstname_nodeid].resource.getView(destid+"_short_firstname");
		var lastname = UICom.structure["ui"][this.lastname_nodeid].resource.getView(destid+"_short_lastname");
		html += "<span id='"+destid+"_short_lastname' class='lastname'>"+lastname+"</span> ";
		html += "<span id='"+destid+"_short_firstname' class='lastname'>"+firstname+"</span> ";
	}
	if (type==null || type=='firstname_lastname') {
		var firstname = UICom.structure["ui"][this.firstname_nodeid].resource.getView(destid+"_short_firstname");
		var lastname = UICom.structure["ui"][this.lastname_nodeid].resource.getView(destid+"_short_lastname");
		html += "<span id='"+destid+"_short_firstname' class='lastname'>"+firstname+"</span> ";
		html += "<span id='"+destid+"_short_lastname' class='lastname'>"+lastname+"</span> ";
	}
	if (type=='detail') {
		html += "<div class='alert alert-block'>";
//		html += "<span  class='btn editbutton' onclick=\"javascript:profiles_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'><i class='icon-pencil'></i></span>";
		//-------------------------------
		var firstname = UICom.structure["ui"][this.firstname_nodeid].resource.getView(destid+"_detail_firstname");
		html += "<h4><span id='"+destid+"_detail_firstname'>"+firstname+"</span> "+UICom.structure["ui"][this.lastname_nodeid].resource.getView()+"</h4>";
		html += "<h5>"+UICom.structure["ui"][this.email._nodeid].resource.getView()+"</h5>";
		//-------------------------------
		html += "</div><!-- class='alert alert-orange alert-block'-->";
	}
	var obj = $(html);
	$("#"+destid).append(obj);
};
//==================================
UIFactory["Profile"].prototype.displayEditor = function(destid,type,lang) {
//==================================
	if (type==null || type!='FTLV') {
		var html = "";
		html += "<div class='row-fluid'>";
		html += "<div class='span7'>";
		html += "	<div id='profil-detail' class='media'>";
		html += "		<div class='profile alert alert-block'>";
		html += "			<div>Photo<span id='help-profil-photo'></span></div>";
		html += "			<div id='profil-photo'></div>";
		html += "			<br><br><label id='email_profil' class='inline'>Courriel<span id='help-profil-courriel'></span> : </label>";
		html += "		</div>";
		html += "	</div>";
		html += "</div>";
		//--------------------------------------
		html += "<div class='span4'>";
		html += "<div><button class='exporter' type='submit' ><a id='exporterPortfolios' href='export'><img src='../img/picto-export.png'> Exporter mon ePortfolio KIUT (zip)</a></button></div>";
		html += "</div>";
		//--------------------------------------
		html += "</div>";
		$("#"+destid).append($(html));
		UICom.structure["ui"][this.photo_nodeid].resource.displayEditor("profil-photo");
		$("#email_profil").append(UICom.structure["ui"][this.email_nodeid].resource.getEditor());
	}
	if (type=="FTLV"){
		var html = "";
		html += "<div id='profil-ftlv' class='row-fluid'>";
		//--------------------------------------
		html += "<div class='span7'>";
		html += "<h3>Vos informations de profil</h3>";
		html += "<p>Votre identifiant : <span id='username'></span></p>";
		html += "<div id='lastname'></div>";
		html += "<div id='firstname'></div>";
		html += "<p>Le courriel associé à votre compte : <span id='courriel'></span></p>";
		html += "<div id='profil-photo'></div>";
		html += "</div>";
		//--------------------------------------
		html += "<div class='span4'>";
		html += "<div><button class='exporter' type='submit' ><a id='exporterPortfolios' href='export'><img src='../img/picto-export.png'> Exporter mon ePortfolio KIUT (zip)</a></button></div>";
		html += "<div><button class='supprimer-portfolio' type='submit' ><img src='../img/picto-trash.png'><a id='supprimerPortfolios' href='#' onclick='javascritp:confirmDelFTLV()'>Supprimer mon portfolio</a></button></div>";
		html += "</div>";
		//--------------------------------------
		html += "</div>";
		$("#"+destid).append($(html));
		$("#username").html(USER.username_node.text());
		$("#lastname").html(UIFactory.User.getAttributeEditor(USER.id,"lastname",USER.lastname_node.text()));
		$("#firstname").html(UIFactory.User.getAttributeEditor(USER.id,"firstname",USER.firstname_node.text()));
		$("#courriel").html(USER.email_node.text());
		UICom.structure["ui"][this.photo_nodeid].resource.displayEditor("profil-photo");

	}
};


//==================================
UIFactory["Profile"].parse = function(data) 
//==================================
{
	profiles_byid = {};
	profiles_list = [];
	var elts = $("asmRoot:has(metadata[semantictag*='profile'])",data);
	for ( var i = 0; i < elts.length; i++) {
		profiles_byid[$(elts[i]).attr('id')] = new UIFactory["Profile"](elts[i]);
		profiles_list[i] = profiles_byid[$(elts[i]).attr('id')];
	}
};

//==================================
UIFactory["Profile"].refresh = function(parentid,destid) 
//==================================
{alert(parendid);
	if (parentid!=null)
		profiles_byid[parentid].displayEditor(destid);
	else {
		profiles_list[0].displayView('profile-short','short');
		profiles_list[0].displayEditor('profile-detail');
	}
};

//==================================
UIFactory["Profile"].reloadparse = function(uuid,destid,parentid) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			UIFactory["Profile"].parse(data);
			if (uuid!=null)
				profiles_byid[uuid].displayEditor(destid);
			else {
				Profiles_Display('profiles-short','short');
				Profiles_Display('profiles-detail','detail',parentid);
			}
		}
	});
};

//==================================
UIFactory["Profile"].prototype.get_data2send_csv = function()
//==================================
{
	var str = "";
	for (var i=0; i<this.profil_inter_qs.length;i++){
		tmp = $("value",$("asmResource[xsi_type='Get_Resource']",this.profil_inter_qs[i])).text();
		str += tmp+";";
	}
	str += getDataByTypeTag_csv("value",this.node,"periode-sejours-etranger");
	str += getDataByTypeTag_csv("text",this.node,"total-sejours-etranger");
	return str;
};

//==================================
UIFactory["Profile"].prototype.get_data2send_xml = function()
//==================================
{
	var str = "<Profile-inter>";
	for (var i=0; i<this.profil_inter_qs.length;i++){
		var uuid = $(this.profil_inter_qs[i]).attr("id");
		str += "<profil-inter-question>";
		var tmp = $("code",$("asmResource[xsi_type='nodeRes']",this.profil_inter_qs[i])).text();
		str += "<code>"+tmp+"</code>";
		tmp = $("value",$("asmResource[xsi_type='Get_Resource']",this.profil_inter_qs[i])).text();
		str += "<value>"+tmp+ "</value>";
		str += "</profil-inter-question>";
	}
	str += getDataByTypeTag_xml("periode-sejours-etranger","value",this.node,"periode-sejours-etranger");
	str += getDataByTypeTag_xml("total-sejours-etranger","text",this.node,"total-sejours-etranger");
	str += "</Profile-inter>";
//	alert(str);
	return str;
};


