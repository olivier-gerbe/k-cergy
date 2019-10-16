/* =======================================================
	Copyright 2014 - ePortfolium - Licensed under the
	Educational Community License, Version 2.0 (the "License"); you may
	not use this file except in compliance with the License. You may
	obtain a copy of the License at

	http://opensource.org/licenses/ECL-2.0

	Unless required by applicable law or agreed to in writing,
	software distributed under the License is distributed on an "AS IS"
	BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
	or implied. See the License for the specific language governing
	permissions and limitations under the License.
   ======================================================= */

/// Check namespace existence
if( UIFactory === undefined )
{
  var UIFactory = {};
}

 var documentIcon = {};
 documentIcon['png'] = "<i class='icon-picture'></i>";
 documentIcon['gif'] = "<i class='icon-picture'></i>";
 documentIcon['jpg'] = "<i class='icon-picture'></i>";
 documentIcon['mp4'] = "<i class='icon-film'></i>";
 documentIcon['doc'] = "<i class='icon-file'></i>";
 documentIcon['docx'] = "<i class='icon-file'></i>";
 documentIcon['xls'] = "<i class='icon-file'></i>";
 documentIcon['xlsx'] = "<i class='icon-file'></i>";
 documentIcon['pdf'] = "<i class='icon-file'></i>";
 

 
/// Define our type
//==================================
UIFactory["Document"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.type = 'Document';
//	this.fileid_node = $("fileid",$("asmResource[xsi_type='Document']",node));
/*	if (this.fileid_node.length==0) {	//old version
		var fileid = createXmlElement("fileid");
		$("asmResource[xsi_type='Document']",node)[0].appendChild(fileid);
		this.fileid_node = $("fileid",$("asmResource[xsi_type='Image']",node));
	}*/
	this.filename_node = [];
	this.type_node = [];
	this.size_node = [];
	this.fileid_node = [];
	for (var i=0; i<languages.length;i++){
		this.filename_node[i] = $("filename[lang='"+languages[i]+"']",$("asmResource[xsi_type='Document']",node));
		this.type_node[i] = $("type[lang='"+languages[i]+"']",$("asmResource[xsi_type='Document']",node));
		this.size_node[i] = $("size[lang='"+languages[i]+"']",$("asmResource[xsi_type='Document']",node));
		this.fileid_node[i] = $("fileid[lang='"+languages[i]+"']",$("asmResource[xsi_type='Document']",node));
		//----------------------------
		if (this.filename_node[i].length==0) {
			var newfilename = createXmlElement("filename");
			$(newfilename).attr('lang', languages[i]);
			$("asmResource[xsi_type='Document']",node)[0].appendChild(newfilename);
			this.filename_node[i] = $("filename[lang='"+languages[i]+"']",$("asmResource[xsi_type='Document']",node));
		}
		//----------------------------
		if (this.type_node[i].length==0) {
			var newtype = createXmlElement("type");
			$(newtype).attr('lang', languages[i]);
			$("asmResource[xsi_type='Document']",node)[0].appendChild(newtype);
			this.type_node[i] = $("type[lang='"+languages[i]+"']",$("asmResource[xsi_type='Document']",node));
		}
		//----------------------------
		if (this.size_node[i].length==0) {
			var newsize = createXmlElement("size");
			$(newsize).attr('lang', languages[i]);
			$("asmResource[xsi_type='Document']",node)[0].appendChild(newsize);
			this.size_node[i] = $("size[lang='"+languages[i]+"']",$("asmResource[xsi_type='Document']",node));
		}
		//----------------------------
		if (this.fileid_node[i].length==0) {
			var newfileid = createXmlElement("fileid");
			$(newfileid).attr('lang', languages[i]);
			$("asmResource[xsi_type='Document']",node)[0].appendChild(newfileid);
			this.fileid_node[i] = $("fileid[lang='"+languages[i]+"']",$("asmResource[xsi_type='Document']",node));
		}
		//----------------------------
	}
	this.multilingual = ($("metadata",node).attr('multilingual-resource')=='Y') ? true : false;
	this.display = {};
};

 
/// Display
//==================================
UIFactory["Document"].prototype.getView = function(dest,type,langcode)
//==================================
{
	var documentIcon = {};
	documentIcon['.doc'] = "../img/word.gif";
	documentIcon['.docx'] = "../img/word.gif'";
	documentIcon['.xls'] = "../img/excel.gif";
	documentIcon['.xlsx'] = "../img/excel.gif";
	documentIcon['.ppt'] = "../img/powerpoint.gif";
	documentIcon['.pptx'] = "../img/powerpoint.gif";
	documentIcon['.pdf'] = "../img/adobe.gif";
	documentIcon['.txt'] = "../img/text.png";

	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	this.multilingual = ($("metadata",this.node).attr('multilingual-resource')=='Y') ? true : false;
	if (!this.multilingual)
		langcode = NONMULTILANGCODE;
	//---------------------
	if (dest!=null) {
		this.display[dest] = langcode;
	}
	//---------------------
	if (type==null)
		type = "standard";
	//---------------------
	var html = "";
	if (type=='standard'){
		if ($(this.filename_node[langcode]).text()!="")
			html =  "<a id='file_"+this.id+"' href='../../../"+serverFIL+"/resources/resource/file/"+this.id+"?lang="+languages[langcode]+"&timestamp=" + new Date().getTime()+"'><img src='../img/document-icon.png' width='25px'> "+$(this.filename_node[langcode]).text()+"</a>";
		else
			html =  "<img src='../img/document-icon.png' width='25px'>"+karutaStr[LANG]['no-document'];
	}
	if (type=='free-positioning'){
		if ($(this.filename_node[langcode]).text()!="") {
			var filename = $(this.filename_node[langcode]).text();
			var extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
			//alert(extension);
			html = "<a id='file_"+this.id+"' href='../../../"+serverFIL+"/resources/resource/file/"+this.id+"?lang="+languages[langcode]+"&timestamp=" + new Date().getTime()+"'><img src='"+documentIcon[extension]+"' width='100px'><p style='text-align:center;'>"+$(this.filename_node[langcode]).text()+"</p></a>";			
		} else
			html = "<img src='../img/document-icon.png' width='100px'><p style='text-align:center;'>"+karutaStr[LANG]['no-document']+"</p>";
	}
	if (type=='icon-url-label'){
		if ($(this.filename_node[langcode]).text()!=""){
			var filename = $(this.filename_node[langcode]).text();
			var extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
			html =  "<a id='file_"+this.id+"' href='../../../"+serverFIL+"/resources/resource/file/"+this.id+"?lang="+languages[langcode]+"&timestamp=" + new Date().getTime()+"'>"+$(this.filename_node[langcode]).text()+" <img src='"+documentIcon[extension]+"'/></a>"; 
		} else
			html =  "<img src='../img/document-icon.png' width='25px'>"+karutaStr[LANG]['no-document'];
	}
	if (type=='icon-url'){
		if ($(this.filename_node[langcode]).text()!=""){
			var filename = $(this.filename_node[langcode]).text();
			var extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
			html =  "<a id='file_"+this.id+"' href='../../../"+serverFIL+"/resources/resource/file/"+this.id+"?lang="+languages[langcode]+"&timestamp=" + new Date().getTime()+"'><img src='"+documentIcon[extension]+"'/></a>"; 
		} else
			html =  "<img src='../img/document-icon.png' width='25px'>";
	}
	if (type=='icon'){
		if ($(this.filename_node[langcode]).text()!=""){
			var filename = $(this.filename_node[langcode]).text();
			var extension = filename.substring(filename.lastIndexOf(".")+1);
			html =  documentIcon[extension]; 
		} else
			html =  "<img src='../img/document-icon.png' width='25px'>";

	}
	return html;
};

/// Editor
//==================================
UIFactory["Document"].update = function(data,uuid,langcode)
//==================================
{
	var itself = UICom.structure["ui"][uuid];  // context node
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	itself.resource.multilingual = ($("metadata",this.node).attr('multilingual-resource')=='Y') ? true : false;
	if (itself.resource.multilingual!=undefined && !itself.resource.multilingual)
		langcode = NONMULTILANGCODE;
	//---------------------
	var filename = data.files[0].name;
	var size = data.files[0].size;
	var type = data.files[0].type;
	$("#file_"+uuid+"_"+langcode).html(filename);
	$("#file__"+uuid+"_"+langcode).html(filename);
	var fileid = data.files[0].fileid;
	itself.resource.fileid_node[langcode].text(fileid);
	itself.resource.filename_node[langcode].text(filename);
	itself.resource.size_node[langcode].text(size);
	itself.resource.type_node[langcode].text(type);
	itself.resource.save();
};

//==================================
UIFactory["Document"].remove = function(uuid,langcode)
//==================================
{
	var itself = UICom.structure["ui"][uuid];  // context node
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	itself.resource.multilingual = ($("metadata",this.node).attr('multilingual-resource')=='Y') ? true : false;
	if (itself.resource.multilingual!=undefined && !itself.resource.multilingual)
		langcode = NONMULTILANGCODE;
	//---------------------
	var filename = "";
	var size = "";
	var type = "";
	$("#file_"+uuid+"_"+langcode).html(filename);
	$("#file__"+uuid+"_"+langcode).html(filename);
	var fileid = "";
	itself.resource.fileid_node[langcode].text(fileid);
	itself.resource.filename_node[langcode].text(filename);
	itself.resource.size_node[langcode].text(size);
	itself.resource.type_node[langcode].text(type);
	itself.resource.save();
};

//==================================
UIFactory["Document"].prototype.displayEditor = function(destid,type,langcode)
//==================================
{
	//---------------------
	if (langcode==null)
		langcode = LANGCODE;
	//---------------------
	this.multilingual = ($("metadata",this.node).attr('multilingual-resource')=='Y') ? true : false;
	if (!this.multilingual)
		langcode = NONMULTILANGCODE;
	//---------------------
	var html ="";
	var url = "../../../"+serverFIL+"/resources/resource/file/"+this.id+"?lang="+languages[langcode];
	html +=" <div id='divfileupload_"+this.id+langcode+"'>";
	html +=" <input id='fileupload_"+this.id+langcode+"' type='file' name='uploadfile' data-url='"+url+"'>";
	html += "</div>";
	html +=" <div id='progress_"+this.id+langcode+"'><div class='bar' style='width: 0%;'></div></div>";
	html +=  "<a id='file__"+this.id+"_"+langcode+"' href='../../../"+serverFIL+"/resources/resource/file/"+this.id+"?lang="+languages[langcode]+"&timestamp=" + new Date().getTime()+"'>"+$(this.filename_node[langcode]).text()+"</a>"; 
	html +=  " <button type='button' class='btn btn-mini bouton-supprimer-fichier' onclick=\"UIFactory.Document.remove('"+this.id+"',"+langcode+")\">"+karutaStr[LANG]['button-delete']+"</button>";
	$("#"+destid).append($(html));
	$("#fileupload_"+this.id+langcode).fileupload({
		progressall: function (e, data) {
			$("#progress_"+this.id+langcode).css('border','1px solid lightgrey');
			$("#divfileupload_"+this.id+langcode).html("<img src='../../karuta/img/ajax-loader.gif'>");
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress_'+this.id+langcode+' .bar').css('width',progress + '%');
		},
		done: function (e, data,uuid) {
			var uuid = data.url.substring(data.url.lastIndexOf('/')+1);
			uuid = uuid.substring(0,uuid.indexOf('?lang'));
			$("#divfileupload_"+this.id+langcode).html("Loaded");
			UIFactory["Document"].update(data.result,uuid,langcode);
		}
    });
};

//==================================
UIFactory["Document"].prototype.save = function()
//==================================
{
	UICom.UpdateResource(this.id,writeSaved);
	this.refresh();
};


//==================================
UIFactory["Document"].prototype.refresh = function()
//==================================
{
	for (dest in this.display) {
		$("#"+dest).html(this.getView(null,null,this.display[dest]));
	};

};
