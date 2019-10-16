//var eval_qualites_perso = [];

evaltype_exp['Qualites_perso']= new Array();
evaltype_exp['Qualites_perso'][0]=['autoeval','entreprise2'];

//==================================
function getQualitesPerso(lang,pos,qualites_perso_node,edit,type,objid,destid,index_evaltype,eval_qualites_perso,view_eval_qualites_perso)
//==================================
{
	if (edit==null || edit==undefined)
		edit = false;
	var html ="";
	var index_evaltype =getIndex_evaltype(index_evaltype);
	var nb_evaltype =getNbEvalType(type,index_evaltype);
	//---------------------------------------------
	var items2evaluate = $("asmContext:has(metadata[semantictag*='qualite-personnelle'])",$(qualites_perso_node).parent());
	var pos_start=0;
	var pos_end=Math.floor((items2evaluate.length)/2);
	if (pos==0){
		pos_start=pos_end;
		pos_end=items2evaluate.length;		
	}
	for ( var j = pos_start; j < pos_end; j++) {
		var items2evaluate_id = $(items2evaluate[j]).attr('id');
		html += "  <tr><td class='item2evaluation'><strong style='margin-bottom:0px'><i class='fa fa-angle-right'></i> "+UICom.structure["ui"][items2evaluate_id].resource.getView(undefined,undefined,lang);
		html += "</strong>";
		for ( var k = 0; k < nb_evaltype; k++) {
			var evaltype = evaltype_exp[type][index_evaltype][k];
			var semtag = evaltypes[evaltype].semtag;
			var evalrole = evaltypes[evaltype].evalrole;
			var evaluation_node = $("asmContext:has(metadata[semantictag*='"+semtag+"'])",$(items2evaluate[j]).parent());
			var evaluation_nodeid = null;				
			if (evaluation_node.length>0){
				evaluation_nodeid = $(evaluation_node[0]).attr('id');				
				var writenode = ($(evaluation_node[0]).attr('write')=='Y')? true:false;
				if (writenode && edit && (evalrole.indexOf(g_userrole)>-1)) {
					eval_qualites_perso[eval_qualites_perso.length] = evaluation_nodeid;
					html += "</td><td class='evaluation_item evaluation_item_"+evaltype+"' id='eval_"+evaluation_nodeid+"'>";
				} else{
					view_eval_qualites_perso[view_eval_qualites_perso.length] = evaluation_nodeid;
					html += "</td><td class='evaluation_item evaluation_item_"+evaltype+"' id='view_eval_"+evaluation_nodeid+"'>";
//					html += "</td><td class='evaluation_item evaluation_item_"+evaltype+"'>";
//					html += UICom.structure["ui"][evaluation_nodeid].resource.getView();					
				}				
			} else {
				html += "</td><td class='evaluation_item evaluation_item_"+evaltype+"'>";				
			}
		}
		html += "</td></tr>";
	}
	//---------------------------------------------
	return html;
}

//==================================
function getSectionQualitesPerso(lang,id,destid,qualites_perso_node,eval_qualites_perso,view_eval_qualites_perso)
//==================================
{
	var html = "";
	var type='Qualites_perso';
	//----------------------------------------------------------------------------------------------------
	html  = "<div class='row-fluid qualites_perso-titre'>";
	html += "<span class='span6'><h4>"+appStr[languages[lang]]['personal-qualities']+"</h4></span>";
	html += "</div>";
	//-----------------------------------------------------------------------
	html += "<div class='row-fluid'>";
	//-----------------------------------------------------
	html += "<span class='span6'>";
	var edit = false;
//getEvalTableau_begin(pos,objid,destid,type,index_evaltype)
	html += getEvalTableau_begin_lang(lang,0,id,destid,type,0);
	html += getQualitesPerso(lang,0,qualites_perso_node,true,type,id,destid,0,eval_qualites_perso,view_eval_qualites_perso);
	html += getEvalTableau_end();
	html += "</span>";
	//-----------------------------------------------------------------------
	html += "<span class='span5'>";
	html += getEvalTableau_begin_lang(lang,1,id,destid,type,0);
	html += getQualitesPerso(lang,1,qualites_perso_node,true,type,id,destid,0,eval_qualites_perso,view_eval_qualites_perso);
	html += getEvalTableau_end();
	html += "</span>";
	//-----------------------------------------------------------------------
	html += "</div>";
	//----------------------------------------------------------------------------------------------------
	return html;
}

