//========================================================
//========================================================
//===================== Bubble =======================
//========================================================
//========================================================
/// Check namespace existence
if( UIFactory === undefined )
{
  var UIFactory = {};
}

var Bubble_byid = {};
var Bubble_list = [];

var Bubble_bubbles_byid = {};
var Bubble_bubbles_list = [];

g_current_mapid = "";
var g_bubble_put = true;
var g_bubble_id = null;
var g_bubble_destid = null;

//==================================
UIFactory["Bubble"] = function(node,no)
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	var level1_bubble = new UIFactory.Bubble.bubble(this.node,1);
	Bubble_bubbles_list[no] = new Array();
	Bubble_bubbles_list[no].push(level1_bubble);
	Bubble_bubbles_byid[this.id] = level1_bubble;
	this.data = level1_bubble.data;

	var level2s = $("asmUnitStructure:has(metadata[semantictag*='bubble_level2'])",node);
	for ( var i = 0; i < level2s.length; i++) {
		var level2_bubble = new UIFactory.Bubble.bubble(level2s[i],2);
		Bubble_bubbles_list[no].push(level2_bubble);
		Bubble_bubbles_byid[level2_bubble.id] = level2_bubble;

		var level3s = $("asmUnitStructure:has(metadata[semantictag*='bubble_level3'])",level2s[i]);
		for ( var j = 0; j < level3s.length; j++) {
			var level3_bubble = new UIFactory.Bubble.bubble(level3s[j],3);
			Bubble_bubbles_list[no].push(level3_bubble);
			Bubble_bubbles_byid[level3_bubble.id] = level3_bubble;

			level2_bubble.data.children[j] = level3_bubble.data;			
		}
		this.data.children[i] = level2_bubble.data;
	}
};

//==================================
UIFactory["Bubble"].bubble = function(node,level)
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.level = level;
	this.bubble_label_node = node;
	this.bubble_description_nodeid = $("asmContext:has(metadata[semantictag='level"+level+"_description'])",node).attr("id");
	this.bubble_color_nodeid = $("asmContext:has(metadata[semantictag='level"+level+"_color'])",node).attr("id");
	this.bubble_amount_nodeid = $("asmContext:has(metadata[semantictag='level"+level+"_amount'])",node).attr("id");
	if (level==3)
		this.url_nodes = [];
		
	this.data = { id:'', label: '',amount:'',color:'',children:'', token:''};
	this.data.id = this.id;
	this.data.token = this.id;
//	this.data.label = UICom.structure["ui"][this.id].getLabel();
	this.data.label = UICom.structure["ui"][this.id].getLabel(null,"none");
	if (UICom.structure["ui"][this.bubble_color_nodeid].resource.type=="Color")
		this.data.color = UICom.structure["ui"][this.bubble_color_nodeid].resource.getValue();
	else
		this.data.color = UICom.structure["ui"][this.bubble_color_nodeid].resource.getView();
	this.data.amount = UICom.structure["ui"][this.bubble_amount_nodeid].resource.getView();
	this.data.children = new Array();
};

//==================================
UIFactory["Bubble"].bubble.prototype.displayView = function(destid,type,lang)
//==================================
{
	g_bubble_id = this.id;
	g_bubble_destid = destid;
	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type==null)
		type='detail';
	if (type=='detail') {
		if (g_userrole=='etudiant') {
			html += "<span  class='editbutton' onclick=\"javascript:Bubble_bubbles_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
			html += "<i class='fa fa-edit fa-2x'></i>";
			html += "</span>";
		}
		html += "<div class='bubble_label'>"+UICom.structure["ui"][this.id].getView()+"</div>";
		html += "<div class='bubble_decription'>"+UICom.structure["ui"][this.bubble_description_nodeid].resource.getView()+"</div>";
//		html += "<div class='bubble_amount'>"+UICom.structure["ui"][this.bubble_amount_nodeid].resource.getView()+"</div>";
//		html += "<div class='bubble_color'>"+UICom.structure["ui"][this.bubble_color_nodeid].resource.getView()+"</div>";
		var urls = $("asmContext:has(metadata[semantictag*='level"+this.level+"_url'])",this.node);
		for (var i=0;i<urls.length;i++){
			if (i==0)  // first one
				html += "<h4 class='title'>Liens</h4>" 
			var uuid = $(urls[i]).attr("id");
			html += "<div class='bubble_url'>"+UICom.structure["ui"][uuid].resource.getView()+"</div>";
			html += "</div>";
		}
	}
	var obj = $(html);
	$("#"+destid).append(obj);
};

//==================================
UIFactory["Bubble"].bubble.prototype.displayEditor = function(destid,type,lang) {
//==================================
	isbubbleput(true);

	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type==null)
		type='detail';
	if (type=='detail') {
		$("#"+destid).append($("<a class='btn btn-mini btn-vert editbutton' onclick=\"javascript:Bubble_bubbles_byid['"+this.id+"'].displayView('"+destid+"');updateBubbleTreeMap();\" data-title='éditer' rel='tooltip'>Quitter le mode d'édition et mettre à jour la carte</a>"));
		$("#"+destid).append($("<div class='control-group'><label class='control-label'>Libellé</label><div id='label_"+this.id+"' class='controls'></div></div>"));
		$("#label_"+this.id).append(UICom.structure.ui[this.id].getNodeLabelEditor());
		$("#"+destid).append($("<label class='inline'>Description</label>"));
		UICom.structure["ui"][this.bubble_description_nodeid].resource.displayEditor(destid,'x100');
		displayControlGroup_getEditor(destid,"Pondération","amount_"+this.id,this.bubble_amount_nodeid);
		displayControlGroup_getEditor(destid,"Couleur","color_"+this.id,this.bubble_color_nodeid);
		$(".pickcolor").colorpicker();
		$(".pick-a-color").pickAColor();
		//----------------- children ----------------------
		if (this.level<3) {
			//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
			var databack = false;
			var callback = "UIFactory.Bubble.reloadparse";
			var param2 = "'"+destid+"'";
			var param3 = "'"+this.id+"'";
			var param4 = "null";
			var level_plus = this.level+1;
			var js1 = "importBranch('"+this.id+"','IUT2composantes.IUT2-parts','bubble_level"+level_plus+"',"+databack+","+callback+","+param2+","+param3+","+param4+")";
			html += "<span class='btn' onclick=\""+js1+";\">Ajouter une bulle à '"+UICom.structure["ui"][this.id].getLabel('none')+"'</span>";

			var children = $("asmUnitStructure:has(metadata[semantictag*='bubble_level"+level_plus+"'])",this.node);
			for (var i=0;i<children.length;i++){
				var uuid = $(children[i]).attr("id");
//				var js2 = "Bubble_bubbles_byid['"+uuid+"'].displayEditor('"+destid+"')";
//				html += "<div class='bubble_label'><span style='cursor:pointer' onclick=\""+js2+"\">"+UICom.structure["ui"][uuid].getLabel()+"</span>";
				html += "<div class='bubble_label'><span>"+UICom.structure["ui"][uuid].getLabel()+"</span>";
				if (children.length>3) {
					var callback2 = "UIFactory.Bubble.reloadparse";
					var param2_2 = "'"+destid+"'";
					var param2_3 = "'"+this.id+"'";
					html += "<span  class='editbutton'  style='cursor:pointer' onclick=\"javascript: confirmDel('"+uuid+"','Bubble',null,null,'"+callback2+"',"+param2_2+","+param2_3+")\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
				}
				html += "</div>";
			}
			$("#"+destid).append($(html));
		}
		//----------------- competence ----------------------
		if (this.level==3) {
			//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
			var databack = false;
			var callback = "UIFactory.Bubble.reloadparse";
			var param2 = "'"+destid+"'";
			var param3 = "'"+this.id+"'";
			var param4 = "null";
			var js1 = "importBranch('"+this.id+"','IUT2composantes.IUT2-parts','level"+this.level+"_url',"+databack+","+callback+","+param2+","+param3+","+param4+")";
			html += "<div class='btn btn-mini' onclick=\""+js1+";\">Ajouter un lien</div>";

			var urls = $("asmContext:has(metadata[semantictag*='level"+this.level+"_url'])",this.node);
			for (var i=0;i<urls.length;i++){
				var uuid = $(urls[i]).attr("id");
				var callback2 = "UIFactory.Bubble.refreshedit";
				var param2_2 = "'"+destid+"'";
				var param2_3 = "'"+this.id+"'";
				html += "<div id='edit_"+uuid+"'>";
				html += "<span  class='editbutton'  style='cursor:pointer' onclick=\"javascript: confirmDel('"+uuid+"','Bubble',null,null,'"+callback2+"',"+param2_2+","+param2_3+")\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
				html += "</div>";
			}
			$("#"+destid).append($(html));
			for (var i=0;i<urls.length;i++){
				var uuid = $(urls[i]).attr("id");
				$("#edit_"+uuid).append(UICom.structure.ui[uuid].resource.getEditor('inline'));
			}
		}
	}
};

//==================================
UIFactory["Bubble"].remove = function(uuid,parentid,destid,callback,param1,param2)
//==================================
{
	$("#"+uuid,g_projet_current).remove();
	UICom.DeleteNode(uuid,callback,param1,param2);
};

//==================================
UIFactory["Bubble"].refreshedit = function(param1,param2) 
//==================================
{
	Bubble_bubbles_byid[param2].displayEditor(param1);
};

//==================================
UIFactory["Bubble"].parse = function(data) 
//==================================
{
	Bubble_byid = {};
	Bubble_list = [];

	Bubble_bubbles_byid = {};
	Bubble_bubbles_list = [];

	var niveau1s = $("asmUnitStructure:has(metadata[semantictag*='bubble_level1'])",data);
	if (niveau1s.length>0){
		for ( var i = 0; i < niveau1s.length; i++) {
			var uuid = $(niveau1s[i]).attr('id');
			Bubble_list[i] = Bubble_byid[uuid] = new UIFactory["Bubble"](niveau1s[i],i);
		}
	} else {
		var uuid = $(data).attr('id');
		Bubble_list[0] = Bubble_byid[uuid] = new UIFactory["Bubble"](data,0);		
	}
};

//==================================
UIFactory["Bubble"].reloadparse = function(param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + g_projetid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			g_projet_current = data;
			//------ carte ----------
			UIFactory["Bubble"].parse(data);
//			dataBubble = Bubble_list[0].data;
/*
			var niveau1s = $("asmUnitStructure:has(metadata[semantictag*='bubble_level1'])",data);
			for ( var i = 0; i < niveau1s.length; i++) {
				var uuid = $(niveau1s[i]).attr('id');
				Bubble_list[i] = Bubble_byid[uuid] = new UIFactory["Bubble"](niveau1s[i],i);
			}
			*/
			//-----------------------
			if (param2!=null){
				Bubble_bubbles_byid[param3].displayEditor(param2);
				isbubbleput(false);
				updateBubbleTreeMap();
				isbubbleput(true);
			}

		}
	});
};

//====================================
function isbubbleput(v)
//====================================
{
	g_bubble_put=v;
}

//====================================
function getIframeObj(id)
//====================================
{
	var el = document.getElementById(id);
	var obj_c = null; 
	if(el.contentWindow){
		obj_c = el.contentWindow;
	}else if(el.contentDocument){
	   obj_c = el.contentDocument;
	}
	return obj_c;
}

//====================================
function loadBubbleTreeMap()
//====================================
{
	var obj_c = getIframeObj("bubble_iframe"); 
	if (obj_c.map == null)
		obj_c.createBubbleTreeMap(g_current_mapid);
		/*
	var el = document.getElementById("bubble_iframe");
	if(el.contentWindow){
		if (el.contentWindow.map == null)
			el.contentWindow.createBubbleTreeMap(g_current_mapid);
	}else if(el.contentDocument){
		if (el.contentDocument.map == null)
			el.contentDocument.createBubbleTreeMap(g_current_mapid);
	}
		*/

}

//====================================
function updateBubbleTreeMap()
//====================================
{
	var obj_c = getIframeObj("bubble_iframe"); 
	obj_c.displayBubbleTreeMap(g_current_mapid);
/*
	var el = document.getElementById("bubble_iframe");
	if(el.contentWindow){
	   el.contentWindow.displayBubbleTreeMap(g_current_mapid);
	}else if(el.contentDocument){
	   el.contentDocument.displayBubbleTreeMap(g_current_mapid);
	}
	*/
}

