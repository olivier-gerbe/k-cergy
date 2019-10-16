//========================================================
//========================================================
//===================== HELP =========================
//========================================================
//========================================================

var helps_byid = {};
var helps_bycode = {};
var helps_list = [];

//==================================
UIFactory["Help"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.code = $($("code",node)[0]).text();
};

//==================================
UIFactory["Help"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // on vide html
}

//==================================
UIFactory["Help"].displayAll = function()
//==================================
{
	for ( var i = 0; i < helps_list.length; i++) {
		var code = helps_list[i].code;
		var help_text = UICom.structure["ui"][helps_list[i].id].resource.getView();
		var help = "<sup><i class='help-iut2 fa fa-info-circle' aria-hidden='true'></i></sup>";
		$("#"+code).html(help);
		var pop = $("#"+code).popover({ 
		    placement : 'bottom',
		    container : 'body',
		    title:karutaStr[LANG]['help-label'],
		    html : true,
		    trigger:'click hover',
		    content: help_text,
		});
	}
}

//==================================
UIFactory["Help"].parse = function(data) 
//==================================
{
	helps_byid = {};
	helps_list = [];
	var helps = $("asmContext:has(metadata[semantictag='help'])",data);
	var tableau = new Array();
	for ( var i = 0; i < helps.length; i++) {
		var uuid = $(helps[i]).attr('id');
		helps_byid[uuid] = new UIFactory["Help"](helps[i]);
		if (UICom.structure["ui"][uuid].resource.getView()!='') {
			helps_list[helps_list.length] = helps_byid[uuid];
			var code = UICom.structure["ui"][uuid].getCode();
			helps_bycode[code] = helps_byid[uuid];
		}
	}
};
