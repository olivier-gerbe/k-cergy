		
//========================================================
//========================================================
//===================== CV ============================
//========================================================
//========================================================

var g_cv = null;

//==================================
UIFactory["CV"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.root_nodeid = $("asmRoot",node).attr('id');
	this.adresse_nodeid = $("asmContext:has(metadata[semantictag='address'])",node).attr('id');
	this.phone_nodeid = $("asmContext:has(metadata[semantictag='phone'])",node).attr('id');
	this.email_nodeid = $("asmContext:has(metadata[semantictag='email'])",node).attr('id');
	this.website_nodeid = $("asmContext:has(metadata[semantictag='website'])",node).attr('id');
	this.sex_nodeid = $("asmContext:has(metadata[semantictag='sex'])",node).attr('id');
	this.birthday_nodeid = $("asmContext:has(metadata[semantictag='birthday'])",node).attr('id');
	this.citizenship_nodeid = $("asmContext:has(metadata[semantictag='citizenship'])",node).attr('id');
	this.driver_license_nodeid = $("asmContext:has(metadata[semantictag='driver_license'])",node).attr('id');
	this.researched_job_nodeid = $("asmContext:has(metadata[semantictag='researched_job'])",node).attr('id');
	this.list_cvs_nodeid = $("asmUnit:has(metadata[semantictag='list_cvs'])",node).attr('id');
	this.interest_nodeid = $("asmContext:has(metadata[semantictag='interest'])",node).attr('id');
	//---- social networks -------------------
	this.socialnetwork_nodeid = [];
	var socialnetworks = $("asmContext:has(metadata[semantictag='socialnetwork'])",node);
	for ( var i = 0; i < socialnetworks.length; i++) {
		this.socialnetwork_nodeid[i] = $(socialnetworks[i]).attr('id');
	}
	//---- cv files -------------------
	this.cvfiles = [];
	var cvs = $("asmContext:has(metadata[semantictag='cvfile'])",node);
	for ( var i = 0; i < cvs.length; i++) {
		this.cvfiles[i] = $(cvs[i]).attr('id');
	}
	//---------------------------------
};

//==================================
UIFactory["CV"].prototype.displayView = function(destid,type,lang)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // to empty html
};


//==================================
UIFactory["CV"].prototype.displayEditor = function(destid,type,lang) {
//==================================
	var html = "<div id='cv-head'></div><div class='row'><div id='info1' class='span3'>Informations personnelles</div><form id='info2' class='span8'><div id='profile-nom'></div></form></div>";
	$("#"+destid).html(html);
	html = "<img src='../../application/img/europass.jpg' width='100px'/>";
	var js1 = "setMessageBox('Création ...');showMessageBox();UIFactory.CV.createCV('application/pdf','"+g_portfolioid+"','"+g_profileid+"','"+g_cvid+"')";
	var js2 = "setMessageBox('Création ...');showMessageBox();UIFactory.CV.createCV('application/rtf','"+g_portfolioid+"','"+g_profileid+"','"+g_cvid+"')";
	if (g_userrole=='etudiant') {
		html += "<a  class='btn btn-mini btn-bleu editbutton' onclick=\""+js1+"\" data-title='éditer' rel='tooltip'>";
		html += "Créer un fichier pdf";
		html += "</a>";
		html += "<a  class='btn btn-mini btn-bleu editbutton' onclick=\""+js2+"\" data-title='éditer' rel='tooltip'>";
		html += "Créer un fichier rtf (Word)";
		html += "</a>";
	}
	$("#cv-head").append($(html));
	profiles_list[0].displayView('profile-nom','lastname_firstname');
	$("#info1").append($("<div id='profile-photo'></div>"));
	profiles_list[0].displayView('profile-photo','photo');
	//---------------------------------------
	$("#info2").append($("<div id='address' class='inline'></div>"));
	if (g_userrole=='etudiant') {
		$("#address").append(UICom.structure["ui"][this.adresse_nodeid].resource.getEditor());
	} else {
		$("#address").append(UICom.structure["ui"][this.adresse_nodeid].resource.getEditor(null,null,true));
	}
	$("#address").append($("<span class='cv-help'> Saississez votre adresse ...</span>"));
	//---------------------------------------
	$("#info2").append($("<div id='phone' class='inline'></div>"));
	if (g_userrole=='etudiant') {
		$("#phone").append(UICom.structure["ui"][this.phone_nodeid].resource.getEditor());
	} else {
		$("#phone").append(UICom.structure["ui"][this.phone_nodeid].resource.getEditor(null,null,true));
	}
	$("#phone").append($("<span class='cv-help'> Saississez votre téléphone ...</span>"));
	//---------------------------------------
	$("#info2").append($("<div id='email' class='inline'></div>"));
	if (g_userrole=='etudiant') {
		$("#email").append(UICom.structure["ui"][this.email_nodeid].resource.getEditor());
	} else {
		$("#email").append(UICom.structure["ui"][this.email_nodeid].resource.getEditor(null,null,true));
	}
	$("#email").append($("<span class='cv-help'> Saississez votre courriel ...</span>"));
	//---------------------------------------
	$("#info2").append($("<div id='website' class='inline'></div>"));
	if (g_userrole=='etudiant') {
		$("#website").append(UICom.structure["ui"][this.website_nodeid].resource.getEditor());
	} else {
		$("#website").append(UICom.structure["ui"][this.website_nodeid].resource.getEditor(null,null,true));
	}
	$("#website").append($("<span class='cv-help'> Si vous avez un site web  ...</span>"));
	//---------------------------------------
	$("#info2").append($("<h5>Principaux réseaux sociaux</h5>"));
	for ( var i = 0; i < this.socialnetwork_nodeid.length; i++) {
		$("#info2").append($("<div id='socialnetwork"+i+"' class='inline'></div>"));
		if (g_userrole=='etudiant') {
			$("#socialnetwork"+i).append(UICom.structure["ui"][this.socialnetwork_nodeid[i]].resource.getEditor('inline-same-nolabel'));
		} else {
			$("#socialnetwork"+i).append(UICom.structure["ui"][this.socialnetwork_nodeid[i]].resource.getEditor('inline-same-nolabel',null,true));
		}
	}
	//---------------------------------------
	$("#info2").append($("<div id='cv_divers' class='inline'></div>"));
	$("#cv_divers").append($("<span class='cv-attr'> Sexe </span><span id='cv-sex'></span>"));
	if (g_userrole=='etudiant')
		UICom.structure["ui"][this.sex_nodeid].resource.displayEditor("cv-sex","radio-inline");
	else
		UICom.structure["ui"][this.sex_nodeid].resource.displayEditor("cv-sex","radio-inline",null,true);
	//---------------------------------------
	$("#cv_divers").append($("<span class='cv-attr'> Date de naissance </span><span id='cv-birthday'></span>"));
	if (g_userrole=='etudiant')
		$("#cv-birthday").append(UICom.structure["ui"][this.birthday_nodeid].resource.getEditor());
	else
		$("#cv-birthday").append(UICom.structure["ui"][this.birthday_nodeid].resource.getEditor(null,null,true));
	$('input[name="datepicker"]').datepicker({format: 'yyyy/mm/dd',language: LANG,startView:2});
	//---------------------------------------
	$("#cv_divers").append($("<span class='cv-attr'> Nationalité </span><span id='cv-citizenship'></span>"));
	if (g_userrole=='etudiant')
		$("#cv-citizenship").append(UICom.structure["ui"][this.citizenship_nodeid].resource.getEditor());
	else
		$("#cv-citizenship").append(UICom.structure["ui"][this.citizenship_nodeid].resource.getEditor(null,null,true));
	//---------------------------------------
	$("#cv_divers").append($("<span class='cv-attr'> Permis de conduire </span><span id='cv-driver_license'></span>"));
	if (g_userrole=='etudiant')
		$("#cv-driver_license").append(UICom.structure["ui"][this.driver_license_nodeid].resource.getEditor());
	else
		$("#cv-driver_license").append(UICom.structure["ui"][this.driver_license_nodeid].resource.getEditor(null,null,true));
	//----------------------------------------Poste, emploi visé------------------------------
	html = "<div class='row'><div id='emploi1' class='span3'>Poste, emploi visé</div><form id='emploi2' class='span8'><div id='cv-researched_job'></div></form></div>";
	$("#"+destid).append($(html));
	if (g_userrole=='etudiant')
		UICom.structure["ui"][this.researched_job_nodeid].resource.displayEditor("cv-researched_job");
	else
		UICom.structure["ui"][this.researched_job_nodeid].resource.displayEditor("cv-researched_job",null,null,true);
	//----------------------------------------Intérêts------------------------------
	html = "<div class='row'><div id='interet1' class='span3'>Intérêts</div><form id='interet1' class='span8'><div id='cv-interest'></div></form></div>";
	$("#"+destid).append($(html));
	if (g_userrole=='etudiant')
		UICom.structure["ui"][this.interest_nodeid].resource.displayEditor("cv-interest");
	else
		UICom.structure["ui"][this.interest_nodeid].resource.displayEditor("cv-interest",null,null,true);
	//------------------------------------Expériences professionnelles----------------------------------
	html = "<div class='row'><div id='experience_pro' class='span3'>Expériences professionnelles</div><div id='experience_pro2' class='span8'><div id='experience_pro_line'></div></div></div>";
	html += "<div id='experiences_cv'></div><div id='stages_cv'></div><div id='alternances_cv'></div><div id='projets_cv'></div>";
	$("#"+destid).append($(html));
	Experiences_Display('experiences_cv','cv');
	Stages_Display('stages_cv','cv');
	Alternances_Display('alternances_cv','cv');
	Projets_Display('projets_cv','cv');
	//------------------------------------Expériences personnelles----------------------------------
	html = "<div class='row'><div id='experience_perso' class='span3'>Expériences personnelles</div><div id='experience_perso2' class='span8'><div id='experience_perso_line'></div></div></div>";
	html += "<div id='experiences_perso_cv'></div>";
	$("#"+destid).append($(html));
	ExperiencePersos_Display('experiences_perso_cv','cv');
	//-----------------------------------Éducation et Formation-----------------------------------
	html  = "<div class='row'><div id='education' class='span3'>Éducation et Formation</div><div class='span8'><div id='education_line'></div></div></div>";
	html += "<div id='diplomes_cv'></div><div id='formations_cv'></div>";
	$("#"+destid).append($(html));
	Diplomas_Display('diplomes_cv','cv');
	Formations_Display('formations_cv','cv');
	//-----------------------------------Compétences-----------------------------------
	html =  "<div class='row'><div id='competencies' class='span3'>Compétences</div><div id='competencies_line' class='span8'></div></div>";
	html += "<div class='row mother-tongue'><div class='span3'>Langue maternelle</div><div id='mother-tongue' class='span8'><div class='title'>"+UICom.structure["ui"][g_mother_tongueid].resource.getView("mother_tongue","span")+"</div></div></div>";
	html += "<div class='row other-tongue' id='other-tongue'";
	if (langues_list.length==0)
		html += " style='display:none'";
	html += "><div class='span3'>Autre(s) langue(s)</div><div id='langues-detail_cv' class='span8'></div></div>";
	html += "<div class='row competencies-detail'><div class='span3'>Compétences métiers</div><div id='metiers-detail_cv' class='span8'></div></div>";
	html += "<div class='row competencies-detail'";
	if (g_htmlDetail2.length<35)
		html += " style='display:none'";
	html += "><div class='span3'>Compétences transversales</div><div id='autres-detail1_cv' class='span8'></div></div>";
	html += "<div class='row competencies-detail'";
	if (g_htmlDetail3.length<35)
		html += " style='display:none'";
	html += "><div class='span3'>Compétences personnelles</div><div id='autres-detail2_cv' class='span8'></div></div>";
	$("#"+destid).append($(html));
	//---------------------
	if (langues_list.length>0)
		Langues_Display('langues-detail_cv','cv');
	$("#metiers-detail_cv").html(g_htmlDetail4);
	$("#autres-detail1_cv").html(g_htmlDetail2);
	$("#autres-detail2_cv").html(g_htmlDetail3);
	//----------------------------------------------------------------------
};

//==================================
UIFactory["CV"].createCV = function(type,portfolioid,profileid,cvid)
//==================================
{
	//--------- create document ---------
	var destid = g_cv.list_cvs_nodeid;
	var srcecode = "IUT2composantes.IUT2-parts";
	var srcetag = "cvfile";
	var databack = true;
	var callback = UIFactory.CV.printCV;
	var param2 = type;
	var param3 = portfolioid;
	var param4 = profileid;
	var param5 = cvid;
	importBranch(destid,srcecode,srcetag,databack,callback,param2,param3,param4,param5);
};

//==================================
UIFactory["CV"].printCV = function(data,typecv,portfolioid,profileid,cvid)
//==================================
{
	$("#wait-window").show();
	var url = window.location.href;
	var serverURL = url.substring(0,url.lastIndexOf(appliname)-1);
	var documentid = data;
	var url ="../../../"+serverFIL+"/xsl?portfolioids="+portfolioid+";"+cvid+";"+profileid;
	url += "&xsl="+appliname+"/application/xsl/iut-cv-a.xsl";
	url += "&parameters=lang:fr;url:"+serverURL+"/"+serverFIL+";url-appli:"+serverURL;
	url += "&documentid="+documentid;
	url += "&format="+typecv;
	$.ajax({
		dataType: "json",
		type : "GET",
		url : url,
		success : function(data) {
			var size = data.files[0].size;
			var type = data.files[0].type;
			var fileid = data.files[0].fileid;
			var date = new Date();
			var xml ="<asmResource  xsi_type='Document'>";
			var extension = (typecv=='application/pdf') ? ".pdf" : ".rtf";
			xml += "<filename lang='fr'>Cv-"+date+extension+"</filename>";
			xml += "<size lang='fr'>"+size+"</size>";
			xml += "<type lang='fr'>"+type+"</type>";
			xml += "<fileid lang='fr'>"+fileid+"</fileid>";
			xml += "</asmResource>";
			$.ajax({
				type : "PUT",
				dataType : "text",
				contentType: "application/xml",
				url : "../../../"+serverBCK+"/resources/resource/" + documentid,
				data : xml,
				success : function(data) {
					$("#wait-window").hide();
					setMessageBox('Consulter la liste des cvs.');
					$.ajax({
						type : "GET",
						dataType : "xml",
						url : "../../../"+serverBCK+"/portfolios/portfolio/"+g_cvid+"?resources=true",
						success : function(data) {
							UICom.parseStructure(data,'cvs');
							UIFactory["CV"].parse(data);
							cvs_Display('list_cvs_short','short');
							g_cv.displayEditor('list_cvs_detail','detail');
							setTimeout(function(){ hideMessageBox(); }, 2000);
						}
					});
				},
				error : function(jqxhr,textStatus) {
					alert("createCV "+textStatus+" : "+jqxhr.responseText);
				}
			});
		}
	 });
};


//==================================
UIFactory["CV"].parse = function(data) 
//==================================
{
	g_cv = new UIFactory["CV"](data);
};

//==================================
UIFactory["CV"].remove = function(uuid)
//==================================
{
	UICom.DeleteNode(uuid);
	for ( var i = g_cv.cvfiles.length-1; i >=0; i--) {
	    if(g_cv.cvfiles[i] === uuid) {
	    	g_cv.cvfiles.splice(i, 1);
	    };
	}
	cvs_Display('list_cvs_short','short');
};

//==================================
function cvs_Display(destid,type,langcode) {
//==================================
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	$("#"+destid).html("");
	var html ="";
	if (g_cv.cvfiles.length==0) {
		html += "Aucun CV";
	} else {
		html += "<div class='cvs' id='cvs_"+destid+"'></div>";
	}
	$("#"+destid).html(html);
	for ( var i = 0; i < g_cv.cvfiles.length; i++) {
		var div = "<div class='cv' id='cv_"+destid+"_"+i+"'></div>";
		$("#cvs_"+destid).append($(div));
		$("#cv_"+destid+"_"+i).append($(UICom.structure["ui"][g_cv.cvfiles[i]].resource.getView()));
		if (g_userrole=='etudiant')
			html = " <span onclick=\"javascript:confirmDel('"+g_cv.cvfiles[i]+"','CV',null,null,'window.reload')\" data-title='supprimer' rel='tooltip'> <i class='fa fa-trash-o'></i></span>";
		else
			html = "";
		$("#cv_"+destid+"_"+i).append($(html));
	}
}

