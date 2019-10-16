//========================================================
//========================================================
//===================== FEEDBACK =========================
//========================================================
//========================================================

var feedbacks_byid = {};
var feedbacks_list = {};

//==================================
UIFactory["Feedback"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.semantictag = $("metadata",node).attr('semantictag');
	this.question_nodeid = $("asmContext:has(metadata[semantictag*='question'])",node).attr('id');
	this.reponse_nodeid = $("asmContext:has(metadata[semantictag*='reponse'])",node).attr('id');
};

//==================================
UIFactory["Feedback"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var question = UICom.structure["ui"][this.question_nodeid].resource.getValues();
	var reponse = UICom.structure["ui"][this.reponse_nodeid].resource.getValues();
	var html = "";
	html += "<div class='feedback'>";
	html += "<div class='question-date'>Envoyée le "+question.date+"</div>";
	html += "<div class='question-texte'>"+question.text+"</div>";
	if (reponse.date!=''){
		html += "<div class='reponse-date'>Réponse le "+reponse.date+"</div>";
		html += "<div class='reponse-texte'>"+reponse.text+"</div>";		
	}
	html += "</div><!-- class='feedback' -->";
	$("#"+destid).append(html);
};

//==================================
UIFactory["Feedback"].displayQuestionEditor = function(destid,type,langcode,parentid)
//==================================
{
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	var html = "";
	$("#"+destid).html(html);  // on vide html
	html += "<textarea id='question_edit' style='height:200px;width:96%'></textarea>";
	if (g_userrole=='etudiant'){
		html += "<div style='float:right;margin-right:2px;'><a class='btn btn-mini btn-info' onclick=\"javascript:UIFactory.Feedback.createDemande('"+parentid+"')\" data-title='Éditer' rel='tooltip'>";
		html += "Envoyer la demande de feedback</i>";
		html += "</a></div>";
	}
	$("#"+destid).append($(html));
	$("#question_edit").wysihtml5({size:'mini','image': false,'font-styles': false,locale:languages[langcode]});
};

//==================================
UIFactory["Feedback"].displayReponseEditor = function(destid,type,langcode,feeedbackid,nom,prenom,uuid)
//==================================
{
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	var html = "";
	$("#"+destid+"-body").html(html);  // on vide html
	var question_uuid = feedbacks_byid[feeedbackid].question_nodeid;
	var question = UICom.structure["ui"][question_uuid].resource.getValues();
	html += "<div class='question-date'>"+prenom+" "+nom+" a écrit le "+question.date+"</div>";
	html += "<div class='question-texte'>"+question.text+"</div>";
	html += "<h4>Votre réponse</h4>";
	html += "<textarea id='reponse_edit' style='height:200px;width:96%'></textarea>";
	html += "<div style='float:right;margin-right:2px;'><a class='btn btn-mini btn-info' onclick=\"javascript:UIFactory.Feedback.updateReponse('"+feeedbackid+"',null,'"+uuid+"','"+nom+"','"+prenom+"')\" data-title='Éditer' rel='tooltip'>";
	html += "Envoyer votre réponse</i>";
	html += "</a></div>";
	html += "<div style='float:right;margin-right:2px;'><a class='btn btn-mini btn-danger' onclick=\"$('#feedback-window').modal('hide');\" data-title='Éditer' rel='tooltip'>";
	html += "Annuler</i>";
	html += "</a></div>";
	$("#"+destid+"-body").append($(html));
	$("#reponse_edit").wysihtml5({size:'mini','image': false,'font-styles': false,locale:languages[langcode]});
};


//==================================
UIFactory["Feedback"].reloadparse = function(parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			UIFactory["Feedback"].parse(data);
			if (callback!=null)
				callback(param1,param2,param3,param4);
		}
	});
};

//==================================
UIFactory["Feedback"].refresh = function(parentid,destid) 
//==================================
{
	UIFactory["Feedback"].displayAll('feedbacks','detail');
};

//==================================
UIFactory["Feedback"].parse = function(data,portfolioid) 
//==================================
{
	var questions_answers = $("asmUnitStructure:has(metadata[semantictag='questions_answers'])",data);
	var items = $("asmUnitStructure:has(metadata[semantictag='demande'])",questions_answers[0]);
	var tableau = new Array();
	feedbacks_list[portfolioid] = new Array();
	for ( var i = 0; i < items.length; i++) {
		var uuid = $(items[i]).attr('id');
		feedbacks_byid[uuid] = new UIFactory["Feedback"](items[i]);
		//------------------
		var date_fin = UICom.structure["ui"][$("asmContext:has(metadata[semantictag*='question'])",items[i]).attr('id')].resource.getView();
		tableau[i] = [date_fin,uuid];
	}
	var newTableau = tableau; //.sort(sortOn1Desc);
	for (var i=0; i<newTableau.length; i++){
		feedbacks_list[portfolioid][i] = feedbacks_byid[newTableau[i][1]];
	}
};

//==================================
UIFactory["Feedback"].createDemande = function(parentid) 
//==================================
{
	var srcecode = "IUT2composantes.IUT2-parts";
	var srcetag = "demande";
	//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
	var databack = true;
	var callback = UIFactory['Feedback'].loadQuestion;
	var param2 = parentid;
	importBranch(parentid,srcecode,srcetag,databack,callback,param2);
};

//==================================
UIFactory["Feedback"].loadQuestion = function(data,parentid) 
//==================================
{
	var param1 = data; // uuid of the new demande
	var param2 = parentid;
	UIFactory['Feedback'].reloadparse(parentid,UIFactory["Feedback"].updateQuestion,param1,param2);
};

//==================================
UIFactory["Feedback"].updateQuestion = function(uuid,parentid,langcode) 
//==================================
{
	var question_uuid = feedbacks_byid[uuid].question_nodeid;
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	var author = USER.firstname_node.text()+" "+USER.lastname_node.text();
	$(UICom.structure["ui"][question_uuid].resource.author_node).html(author);
	var value = $.trim($("#question_edit").val());
	$(UICom.structure["ui"][question_uuid].resource.text_node[langcode]).html($.parseHTML(value));
//	var date = new Date().toLocaleDateString();
	var dateobj = new Date();
	var date = dateobj.getDate() + '/' +  (dateobj.getMonth() + 1) + '/' + dateobj.getFullYear();
	$(UICom.structure["ui"][question_uuid].resource.date_node).html(date);
	UICom.structure["ui"][question_uuid].resource.save();
	UIFactory["Feedback"].displayAll('feedbacks','detail');
	UIFactory["Feedback"].displayQuestionEditor('demande','detail',null,parentid);
	alert("Votre demande a été transmise au superviseur ("+supervisor_email+").");
};

//==================================
UIFactory["Feedback"].updateReponse = function(feedbackid,langcode,uuid,nom,prenom) 
//==================================
{
	var reponse_uuid = feedbacks_byid[feedbackid].reponse_nodeid;
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	var author = USER.firstname_node.text()+" "+USER.lastname_node.text();
	$(UICom.structure["ui"][reponse_uuid].resource.author_node).html(author);
	var value = $.trim($("#reponse_edit").val());
	$(UICom.structure["ui"][reponse_uuid].resource.text_node[langcode]).html($.parseHTML(value));
//	var date = new Date().toLocaleDateString();
	var dateobj = new Date();
	var date = dateobj.getDate() + '/' +  (dateobj.getMonth() + 1) + '/' + dateobj.getFullYear();
	$(UICom.structure["ui"][reponse_uuid].resource.date_node).html(date);
	UICom.structure["ui"][reponse_uuid].resource.save();
	UIFactory["Feedback"].displaySuivi(uuid,feedbackid,nom,prenom);
	$('#feedback-window').modal('hide');
	alert("La réponse a été envoyée à l'étudiant.");
};

//==================================
UIFactory["Feedback"].displaySuivi = function(uuid,feedbackid,nom,prenom) 
//==================================
{
	var html = "";
	$("#demande_"+uuid).html(html);
	$("#date_"+uuid).html(html);
	var suivi = false;
	var reponse_uuid = feedbacks_byid[feedbackid].reponse_nodeid;
	var reponse_date = $(UICom.structure["ui"][reponse_uuid].resource.date_node).text();
	if (reponse_date=='') {
		var question_uuid = feedbacks_byid[feedbackid].question_nodeid;
		var question_date = $(UICom.structure["ui"][question_uuid].resource.date_node).text();
		html = "<a href='#' data-toggle='modal' data-target='#feedback-window' onclick=\"javascript:UIFactory.Feedback.displayReponseEditor('feedback-window',null,null,'"+feedbackid+"','"+nom+"','"+prenom+"','"+uuid+"')\" data-title='Répondre'>";
		html += "Afficher et répondre à la demande de feedback</a>";
		$("#demande_"+uuid).html(html);
		$("#date_"+uuid).html("envoyée le "+question_date);
		suivi = true;
	}
	return suivi;
};

//==================================
UIFactory["Feedback"].displayAll = function(destid,type,portfolioid) {
//==================================

	$("#"+destid).html("");
	var html ="";
	if (type=='detail') {
		html += "<div id='feedback_"+destid+"'></div>";
		$("#"+destid).html(html);
		for ( var i = 0; i < feedbacks_list[portfolioid].length; i++) {
			$("#feedback_"+destid).append($("<div id='"+destid+"_"+feedbacks_list[portfolioid][i].id+"'></div>"));			
			feedbacks_list[portfolioid][i].displayView(destid+"_"+feedbacks_list[portfolioid][i].id,type,null,"feedback_"+destid);
		}
	}
};

