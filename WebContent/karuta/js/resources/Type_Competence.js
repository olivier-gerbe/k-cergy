
//==================================
function updateVariante(self)
//==================================
{				
	var groupcode = $(self).attr('code');
	var option = $("#langue").find("option:selected");
	var code = $(option).attr('code');
	var children = $("input[name='"+groupcode+"']");
	for ( var i = 0; i < children.length; i++) {
		$(children[i]).attr('variante',code);
	}
}

//==================================
function getCompetencyFramework(destid,refid,lang,edit)
//==================================
{
	if (edit==null || edit==undefined)
		edit = true;
	var html ="";
	//---------------------------------------------
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/competences?refid="+refid,
		success : function(data) {
			if (edit)
				displayCompetencySelect(data,destid,lang);
		}
	});
	//---------------------------------------------
	return html;
}


//==================================
function displayCompetencySelect(data,destid,lang)
//==================================
{
	if (lang==null)
		lang = LANG;
	var html = "";
	var referentielid = $("referentiel",data).attr('id');
	var groups = $("groupe",data);
	html += "<table>";
	for ( var i = 0; i < groups.length; i++) {
		var groupid = $(groups[i]).attr('id');
		var groupcode = $("code",groups[i]).text();
		var label = $("group-label[lang='"+LANG+"']",groups[i]).text();
		var html_group = "<tr><td><input type='checkbox' id='"+groupcode+"' onchange='javascript:toggleChildren(this);'></td>";
			html_group += "<td class='activite'>"+label;
			//---------------------------
			if (groupcode=='LG'){
				html_group += "<select id='langue' code='"+groupcode+"' onChange='updateVariante(this)'>";
				for (var lg=0;lg<g_langues.length;lg++)
					html_group += "<option code='"+g_langues[lg][0]+"' value='"+g_langues[lg][1]+"'>"+g_langues[lg][1];
				html_group += "</select>";
			}
			//---------------------------
			html_group += "</td></tr>";
			var competencies = $("competence",groups[i]);
			if (competencies.length>0) {
				html += html_group;
				html += "<tr><td></td><td><table>";
				for ( var j = 0; j < competencies.length; j++) {
					var competenceid = $(competencies[j]).attr('id');
					var code = $("code",competencies[j]).text();
					var label = $("competence-label[lang='"+LANG+"']",competencies[j]).text();
					if (code=='separator')
						html += "<tr><td colspan='2'>"+label+"</td></tr>";
					else
						html += "<tr><td><input groupid='"+groupid+"' refid='"+referentielid+"' type='checkbox' name='"+groupcode+"' objtype='competence' variante='' value='"+competenceid+"'></td><td class='competence'>"+label+"</td></tr>";
				}
				html += "</table></td></tr>";
			}
		}
	html += "</table>";
	$("#"+destid).html(html);
}

//==================================
function addNewCompetencies(nodeid,resource,callback)
//==================================
{
//	var username = USER.username_node.text();
//	var portfolioid = g_portfolioid;
//	var semantictag = UICom.structure.ui[nodeid].semantictag;
	var username = "mimi";
	var portfolioid = '987678987';
	var semantictag = 'mon-tag';
	var competencies = $("input[objtype='competence']:checked");
	var xml = "<competences>"
	for (var i=0;i<competencies.length;i++) {
		var competenceid = $(competencies[i]).attr('value');
		var referentielid = $(competencies[i]).attr('refid');
		var groupid = $(competencies[i]).attr('groupid');
		var variante = $(competencies[i]).attr('variante');
		xml += "<competence id='"+competenceid+"'>";
		xml += "<portfolio id='"+portfolioid+"'/>";
		xml += "<activite id='"+nodeid+"'>";
		xml += "	<semtag>"+semantictag+"</semtag>";
		xml += "</activite>";
		xml += "<username>"+username+"</username>";
		xml += "<variante>"+variante+"</variante>";
		xml += "<referentiel id='"+referentielid+"'/>";
		xml += "<groupe id='"+groupid+"'/>";
		//------- resource --------
		xml += resource;
		//------------------------
		xml += "</competence>";
	}
	xml += "</competences>";
	var urlS = "../../../"+serverBCK+"/competences";
	$('#activite-window').modal('hide');
	$.ajax({
		type : "POST",
		dataType : "xml",
		url : urlS,
		data : xml,
		success : function(data) {
			if (callback!=null)
				callback();
		}
	});
}

//==================================
function getCompetencies(destid,activiteid,typeref,condition,condition_type,lang)
//==================================
{
	if (lang==null)
		lang = LANG;
	//-----------------
	var urlS = "../../../"+serverBCK+"/competences?typeref="+typeref;	
	if (condition!="")
		urlS += "condition="+condition;
	if (condition_type!="")
		urlS += "condition_type="+condition_type;
	//---------------------------------------------
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : urlS,
		success : function(data) {
			displayCompetencies(destid,data,lang);
		}
	});
	//---------------------------------------------
	return html;
}

//==================================
function displayNewCompetencies(destid,data,edit,lang)
//==================================
{
	if (lang==null)
		lang = LANG;
	//------------
	var html ="";
	referentiels = $("referentiel",data);
	for (var i=0;i<referentiels.length;i++) {
		var domaine = $("domaine",referentiels[i]);
		if (domaine.length>0){
			var domaine_label = $("domaine-label[lang='"+lang+"']",domaine).text();
			html += "<div class='domaine'>"+ domaine_label + "</div>";
		}
		groupes = $("groupe",referentiels[i]);
		for (var j=0;j<groupes.length;j++) {
			var groupe_label = $("groupe-label[lang='"+lang+"']",groupes[j]).text();
			if (groupe_label!="")
				html += "<div class='groupe'>"+ groupe_label + "</div>";
			competences = $("competence",groupes[j]);
			for (var k=0;k<competences.length;k++) {
				var competence_label = $("competence-label[lang='"+lang+"']",competences[k]).text();
				html += "<div class='competence'>"+ competence_label + "</div>";
				var resource = $("ressource",competences[k]);
				var type = $(resource).attr("type");
				var uiressource = new UIFactory[type](resource)
				html += uiressource.getView();
			}
		}				
	}
	$("#"+destid).html(html);
}


