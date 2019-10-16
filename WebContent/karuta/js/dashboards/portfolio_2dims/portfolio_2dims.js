/* =======================================================
	Copyright 2014 - ePortfolium - Licensed under the
	Educational Community License, Version 2.0 (the "License"); you may
	not use this file except in compliance with the License. You may
	obtain a copy of the License at

	http://www.osedu.org/licenses/ECL-2.0

	Unless required by applicable law or agreed to in writing,
	software distributed under the License is distributed on an "AS IS"
	BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
	or implied. See the License for the specific language governing
	permissions and limitations under the License.
   ======================================================= */

//=============================================
function portfolio_2dimsBA(root,dest,langcode)
//=============================================
{
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	if (this.multilingual!=undefined && !this.multilingual)
		langcode = NONMULTILANGCODE;
	//---------------------
	//----------------- Bild Matrix ----------------------------------------
	var matrix = new Array();
	var dimAs = $("*:has(metadata[semantictag*='dimA'])",root);
	for ( var i = 0; i < dimAs.length; i++) {
		if (matrix[0]==undefined){
			matrix[0] = new Array();
			matrix[0][0] = "";
		}
		if (matrix[i+1]==undefined){
			matrix[i+1] = new Array();
		}
		matrix[i+1][0] = $(dimAs[i]).attr('id');
		var dimBs = $("*:has(metadata[semantictag*='dimB'])",dimAs[i]);
		for ( var j = 0; j < dimBs.length; j++) {
			matrix[0][j+1] = $(dimBs[j]).attr('id');
			var cells = $("*:has(metadata[semantictag*='cell-content'])",dimBs[j]);
			for ( var k = 0; k < cells.length; k++) {
				matrix[i+1][j+1] = $(cells[k]).attr('id');
			}
		}
	}
	//-------------------Display Matrix --------------------------------------
	for ( var i = 0; i < matrix.length-1; i++) {
		var uuid = matrix[i+1][0];
		displayElement(uuid,dest,langcode,false);
		//---------------------------------------------------------
		for ( var j = 0; j < matrix[0].length-1; j++) {
			var uuid3 = matrix[0][j+1];
			displayElement(uuid3,"free_"+uuid,langcode,true);
		}
	}
}

//=============================================
function displayElement(uuid,dest,langcode,draggable)
//=============================================
{
	//---------------------
	var style ="position:absolute;";
	var metadataepm = $(UICom.structure["ui"][uuid].metadataepm);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'top',true);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'left',true);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'width',true);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'height',true);
	style += "border:1px dashed lightgrey;"
	//---------------------
	var html = "";
	html += "<div id='free_"+uuid+"' uuid='"+uuid+"' draggable='yes' ";
	html += " style='"+style+"' >";
	html += "</div>";
	$("#"+dest).append($(html));
	//------------------------
	var node = UICom.structure["ui"][uuid].node;
	var displayTexts = $("asmContext:has(metadata[semantictag='displayText'])",node);
	var text_uuid = $($(displayTexts)[0]).attr("id");
	if (displayTexts.length>0 && UICom.structure["ui"][text_uuid].resource.getView()!="") {
		displayText(text_uuid,"free_"+uuid,langcode,draggable);
	} else {
		displayText(uuid,"free_"+uuid,langcode,false);
		displayText(text_uuid,"free_"+uuid,langcode,draggable);
	}
	//------------------------
	var displayImages = $("asmContext:has(metadata[semantictag='displayImage'])",node);
	var image_uuid = $($(displayImages)[0]).attr("id");
	if (displayImages.length>0 && UICom.structure["ui"][image_uuid].resource.fileid_node[langcode].text()!="") {
		displayImage(image_uuid,"free_"+uuid,langcode);
	}
	//-----------------------------
	$("#free_"+uuid).resizable({
		stop: function(){UIFactory["Node"].updateSize(this);}
	});
	$("#free_"+uuid).draggable({
		stop: function(){UIFactory["Node"].updatePosition(this);}
	});
}

//=============================================
function displayText(uuid,dest,langcode,draggable)
//=============================================
{
	var name = UICom.structure["ui"][uuid].asmtype;
	//----------------------------
	var metadataepm = $(UICom.structure["ui"][uuid].metadataepm);
	var style ="position:absolute;";
	if (draggable) {
		style += UIFactory["Node"].displayMetadataEpm(metadataepm,'top',true);
		style += UIFactory["Node"].displayMetadataEpm(metadataepm,'left',true);
		style += UIFactory["Node"].displayMetadataEpm(metadataepm,'width',true);
		style += UIFactory["Node"].displayMetadataEpm(metadataepm,'height',true);
		style += "border:1px dashed green;"
	}
	style += UIFactory["Node"].getOtherMetadataEpm(metadataepm,'othercss');
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'font-size',true);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'font-weight',false);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'font-style',false);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'color',false);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'text-align',false);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'margin-top',true);
	style += UIFactory["Node"].displayMetadataEpm(metadataepm,'background-color',false);
	//----------------------------
	var html = "";
	html += "<div id='displayText_"+uuid+"' uuid='"+uuid+"'";
	if (draggable){
		html += " draggable='yes' ";		
	}
	html += " style='"+style+"' ";
	html += ">";
	if (name=="asmContext"){
		html += UICom.structure["ui"][uuid].resource.getView(null,null,langcode);
		//------------------------
		var inline = false;
		var depth = "10";
		var edit = true;
		if (!inline || g_userrole=='designer') {
			html += "<div id='toolbar-"+uuid+"' style='visibility:hidden;z-index:10;'>";
			//-------------- buttons --------------------------
			html += "	<div id='buttons-"+uuid+"'>"+ UICom.structure["ui"][uuid].getButtons(null,null,null,inline,depth,edit)+"</div>";
			//------------------------------------------
			html += "</div>";
			//--------------------------------------------------
		}
	}
	else
		html += UICom.structure["ui"][uuid].getLabel();
	html += "</div>";
	//------------------------
	$("#"+dest).append($(html));
	//------------------------
	if (draggable){
		$("#displayText_"+uuid).draggable({
			stop: function(){UIFactory["Node"].updatePosition(this);}
		});
	}
	if (!inline &&  (USER.admin || g_userrole=='designer')) {
		//-------------------------------
		$("#displayText_"+uuid).mouseover(function(){
			$('#toolbar-'+uuid).css('visibility','visible');
		}
		);
		//-------------------------------
		$("#displayText_"+uuid).mouseout(function(){
			$('#toolbar-'+uuid).css('visibility','hidden');
		}
		);
	}

}

//=============================================
function displayImage(uuid,dest,langcode)
//=============================================
{
	var url = "../../../"+serverFIL+"/resources/resource/file/"+uuid+"?lang="+languages[langcode]+"&size=L";
	$('#'+dest).css("background-image","url('"+url+"')"); 
	$('#'+dest).css("background-size","cover");
}

