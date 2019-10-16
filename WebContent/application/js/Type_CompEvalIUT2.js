if( UIFactory === undefined )
{
  var UIFactory = {};
}

CompEvalIUT2_xml  = "<ressource type='CompEvalIUT2'><auto-eval><value>0</value></auto-eval><iut2-eval><value></value></iut2-eval><org-eval><value></value></org-eval></ressource>";

var CompEvalIUT2_options = {};
//------- auto ----------
CompEvalIUT2_options['auto'] = {};
CompEvalIUT2_options['auto']['fr'] = new Array();

CompEvalIUT2_options['auto']['fr'][0] = "";
CompEvalIUT2_options['auto']['fr'][1] = "Grand débutant"
CompEvalIUT2_options['auto']['fr'][2] = "Débutant";
CompEvalIUT2_options['auto']['fr'][3] = "Ok";
CompEvalIUT2_options['auto']['fr'][4] = "Bon";
CompEvalIUT2_options['auto']['fr'][5] = "Au top!";


//==================================
UIFactory["CompEvalIUT2"] = function(ressource)
//==================================
{
	this.resource = ressource;
	this.type = 'CompEvalIUT2';
	//--------------------------
	this.auto_eval_value_node = $("value",$("auto-eval",ressource));
	this.iut2_eval_value_node = $("value",$("iut2-eval",ressource));
	this.org_eval_value_node = $("value",$("org-eval",ressource));
	//--------------------------
	this.display = {};
};

//==================================
UIFactory["CompEvalIUT2"].prototype.getView = function(dest,langcode)
//==================================
{
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	if (dest!=null) {
		this.display[dest] = langcode;
	}
	var html ="";
	var auto_value = +$(this.auto_eval_value_node).text();
	html += "<span class='auto-eval auto-eval"+auto_value+"'>"+CompEvalIUT2_options['auto'][lang][0]+"</span>";
//	html += "<span class='iut2-eval iut2-eval"+$(this.iut2_eval_value_node).text()+"'>"+$(this.iut2_eval_label_node[langcode]).text()+"</span>";
//	html += "<span class='org-eval org-eval"+$(this.org_eval_value_node).text()+"'>"+$(this.org_eval_label_node[langcode]).text()+"</span>";
//	return html;
};

//==================================
UIFactory["CompEvalIUT2"].getEvalEditor = function(type,value_node,itself,langcode,disabled)
//==================================
// type = auto-iut2-org
{
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	var html = "";
	//---------------------
	html += "<select>";
	for (var i=0;i<CompEvalIUT2_options.length;i++){
		html += "<option value='"+i+"'>"+CompEvalIUT2_options[type][i]+"</option>";
	}
	html += "</select>";
	//---------------------
	var obj = $(html);
	$(obj).change(function (){
		UIFactory["CompEvalIUT2"].update(obj,value_node,itself,langcode);
	});
	return obj;
};

//==================================
UIFactory["CompEvalIUT2"].update = function(select,value_node,itself,langcode)
//==================================
{
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
		var option = $(select).find("option:selected");
		var value = $(option).attr('value');
		$(value_node).text(value);
		itself.save();
};


//==================================
UIFactory["CompEvalIUT2"].prototype.getEvalEditor = function(type,langcode,disabled)
//==================================
// type = auto-iut2-org
{
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	var self = this;
	var html = "<span class='comp-eval-iut2'></span>";
	var editor = $(html);
	//------------ iut2 ----------
	var iut2 = null;
	if (type.indexOf("iut2")) {
		iut2 = UIFactory["CompEvalIUT2"].getEvalEditor('iut2',this.iut2_eval_value_node,self);
	} else {
		iut2 = $("<span class='iut2-eval "+auto-eval+$(this.iut2_eval_value_node).text()+"'>"+$(this.iut2_eval_label_node[langcode]).text()+"</span>");
	}
	$(editor).append(iut2);
	
	if (type.indexOf("auto")) {
		html += UIFactory["CompEvalIUT2"].getEvalEditor('auto',self);
	} else {
		html += "<span class='auto-eval "+auto-eval+$(this.auto_eval_value_node).text()+"'>"+$(this.auto_eval_label_node[langcode]).text()+"</span>";
	}
	if (type.indexOf("org")) {
		html += UIFactory["CompEvalIUT2"].getEvalEditor('org',self);
	} else {
		html += "<span class='org-eval "+org-eval+$(this.org_eval_value_node).text()+"'>"+$(thisgoro_eval_label_node[langcode]).text()+"</span>";
	}
}

//==================================
UIFactory["CompEvalIUT2"].prototype.save = function()
//==================================
{
	var data = xml2string(this.resource);
	var urlS = "../../../"+serverBCK+"/competences";
	$.ajax({
		type : "PUT",
		dataType : "xml",
		contentType: "application/xml",
		url : urlS,
		data : data,
		success : function (data){
		},
		error : function(jqxhr,textStatus) {
			alert("Error in CompEvalIUT2.save : "+jqxhr.responseText);
		}
	});
	this.refresh();
};

//==================================
UIFactory["CompEvalIUT2"].prototype.refresh = function()
//==================================
{
	for (dest in this.display) {
		$("#"+dest).html(this.getView(null,null,this.display[dest]));
	};

};

