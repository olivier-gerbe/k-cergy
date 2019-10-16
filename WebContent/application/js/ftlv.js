//==============================
function callRegister()
//==============================
{
	var ok = true;
	var useridentifier = $("#useridentifier").val();
	var firstname = $("#firstname").val();
	var lastname = $("#lastname").val();
	var password = $("#password").val();
	if (useridentifier==""){
		alert("email is required");
		ok =false;
	}
	if (lastname==""){
		alert("lastname is required");
		ok =false;
	}
	if (firstname==""){
		alert("firstname is required");
		ok =false;
	}
	if (ok) {
		var xml = "";
		xml +="<?xml version='1.0' encoding='UTF-8'?>";
		xml +="<users>";
		xml +="<user>";
		xml +="	<username>"+useridentifier+"</username>";
		xml +="	<lastname>"+lastname+"</lastname>";
		xml +="	<firstname>"+firstname+"</firstname>";
		xml +="	<email>"+useridentifier+"</email>";
		xml +="	<other>xlimited</other>";
		xml +="</user>";
		xml +="</users>";
		var url = "../../../"+serverFIL+"/register";
		$.ajax({
			async : false,
			type : "POST",
			contentType: "application/xml",
			dataType : "text",
			url : url,
			data : xml,
			success : function(data) {
				alert(karutaStr['fr']['created-password-sent']);
				window.location="indexFTLV.html";
			},
			error : function(jqxhr,textStatus) {
				alert("Une erreur s'est produite pendant l'inscription.");
			}
		});
	}
}

//==============================
function getInputs()
//==============================
{
	var html = "";
	html += "<input id='useridentifier' class='form-control' placeholder='"+karutaStr[LANG]['email']+"' type='text'>";
	html += "<input id='firstname' class='form-control' placeholder='"+karutaStr[LANG]['firstname']+"' type='text'>";
	html += "<input id='lastname' class='form-control' placeholder='"+karutaStr[LANG]['lastname']+"' type='text'>";
	html += "<br><button class='btn btn-large btn-primary' onclick='javascript:callSubmit()'>"+karutaStr[LANG]['create_account']+"</button>";
	return html;
}

//==================================
function callSubmit()
//==================================
{
	var username = document.getElementById("useridentifier").value;
	var password = document.getElementById("password").value;
	var data = "<credential><login>"+username+"</login><password>"+password+"</password></credential>";
	$.ajaxSetup({
		Accept: "application/xml",
		contentType: "application/xml"
		});
	$.ajax({
		type : "POST",
		dataType : "xml",
		url : "../../../../"+serverBCK+"/credential/login",
		data: data,
		success : function(data) {
			$.ajax({
				type : "GET",
				dataType : "xml",
				url : "../../../"+serverBCK+"/credential",
				data: "",
				success : function(data) {
					USER = new UIFactory["User"]($("user",data));
					displayImport();
					},
				error : function(jqxhr,textStatus) {
					alert("Erreur d'identification");
				}
			});
		},
		error : function(jqxhr,textStatus) {
			alert("Erreur d'identification");
		}
	});
}

//==================================
function callConnect()
//==================================
{
	var username = document.getElementById("useridentifier").value;
	var password = document.getElementById("password").value;
	var data = "<credential><login>"+username+"</login><password>"+password+"</password></credential>";
	$.ajax({
		Accept: "application/xml",
		contentType: "application/xml",
		type : "POST",
		dataType : "xml",
		url : "../../../../"+serverBCK+"/credential/login",
		data: data,
		success : function(data) {
			window.location='main.htm';
		},
		error : function(jqxhr,textStatus) {
			alert("Erreur d'identification");
		}
	});
}

//==================================
function displayConnection()
//==================================
{
	var html = "";
	html += "<h2><img id='connexion-img' src='../img/login.png'/>Vous connecter</h2>";
	html += "<h5>Connexion</h5>";
	html += "<input id='useridentifier' type='text' placeholder='Courriel'>";
	html += "<input id='password' type='password' placeholder='Mot de passe'>";
	html += "<button type='submit' onclick='javascript:callConnect()'>Envoyer</button>";
	html += "<h5>Création et Import</h5>";
	html += "<h6>Créez un compte si vous n'en avez pas et importez votre portfolio</h6>";
	html += "<button class='creer-importer-button' style='float:right' type='submit' onclick='displayConnectionImport()'>2 - Importer son portfolio</button>";
	html += "<button class='creer-importer-button' type='submit' onclick='displayRegister()'>1 - Créer son compte</button>";
	$("#display").html(html);
}

//==================================
function displayRegister()
//==================================
{
	var html = "";
	html += "<h2><img id='connexion-img' src='../img/login.png'/>Vous inscrire</h2>";
	html += "<h5><span class='libelle'>Courriel</span> <input id='useridentifier' type='text' placeholder='Courriel'></h5>";
	html += "<h5><span class='libelle'>Prénom</span> <input id='firstname' type='text' placeholder='Prénom'></h5>";
	html += "<h5><span class='libelle'>Nom</span> <input id='lastname' type='text' placeholder='Nom'></h5>";
	html += "<button id='register-button' type='submit' onclick='javascript:callRegister()'>Envoyer</button>";
	$("#display").html(html);
}

//==================================
function displayConnectionImport()
//==================================
{
	var html = "";
	html += "<h2><img id='connexion-img' src='../img/login.png'/>Importer votre portfolio</h2>";
	html += "<h5><img width='30px' class='num' src='../img/num1.png'/> identification</h5>";
	html += "<input id='useridentifier' type='text' placeholder='Courriel'>";
	html += "<input id='password' type='password' placeholder='Mot de passe'>";
	html += "<button type='submit' onclick='javascript:callSubmit()'>Envoyer</button>";
	$("#display").html(html);
}

//==================================
function displayImport()
//==================================
{
	var ok = false;
	// Vérification pas de portfolio
	var urlS = "../../../"+serverBCK+"/portfolios?active=1";
	$.ajax({
		async : false,
		Accept: "application/xml",
		contentType: "application/xml",
		type : "GET",
		dataType : "xml",
		url : urlS,
		success : function(data) {
			var portfolios = $("portfolio",data);
			if (portfolios.length==0)
				ok = true;
			else {
				alert("Vous avez déjà importé votre portfolio.");
				location.reload();
			}
		},
		error : function(jqxhr,textStatus) {
			alertHTML("Error : "+jqxhr.responseText);
		}
	});
	if (ok) {
		// Import portfolio
		var html = "";
		html += "<h2><img id='connexion-img' src='../img/login.png'/>Importer votre portfolio</h2>";
		html += "<h5><img width='30px' class='num' src='../img/num2.png'/> Import</h5>";
		html += "<form id='fileupload' action='../../../"+serverBCK+"/portfolios/zip'>";
		html += "	<input type='hidden' id='project' name='project' value='ftlv'>";
		html += "	<input type='hidden' id='instance' name='instance' value='true'>";
		html += "	<input type='file' id='uploadfile' name='uploadfile'>";
		html += "</form>";
		html += "<div id='loading' style='display:none'>Le traitement des composantes du portfolio peut prendre plusieurs minutes...<br/><img src='../img/loading30.gif'/><br/></div>"
		html += "<div id='log'></div>"
//			html += "<div id='progress'><div class='bar' style='height:20px;width: 0%;'></div></div>";
		$("#display").html(html);
		$("#fileupload").fileupload({
			progressall: function (e, data) {
			$("#loading").show();
//				$("#progress").css('border','1px solid lightgrey');
//				var progress = parseInt(data.loaded / data.total * 100, 10);
//				$('#progress .bar').css('width',progress + '%');
			$("#uploadfile").hide();
			},
			success : function(data) {
				$("#wait-window").hide();
				// load portfolios and rename it with  @@userid@@ in the code EX: ftlv.@@223@@-cv
				// départager de designer partager etudiant
				var urlS = "../../../"+serverBCK+"/portfolios?active=1";
				$.ajax({
					async : false,
					Accept: "application/xml",
					contentType: "application/xml",
					type : "GET",
					dataType : "xml",
					url : urlS,
					success : function(data) {
						var codePortfolio = "-portfolio";// + useridentifier;
						var codeProfile = "-profile";
						var codeCV = "-cv";
						var codeProjet = "-projet";
						var portfolios = $("portfolio",data);
						for ( var i=0;i<portfolios.length;i++)
						{
							var portfolioid = $(portfolios[i]).attr("id");
							var current_code = $("code:first",portfolios[i]).text();
							if (current_code.indexOf(codePortfolio)>-1) {
								var rootid = $("asmRoot",$(portfolios[i])).attr("id");
								rename(rootid,"portfolio");
								unshare_share(portfolioid,"portfolio");
							}
							if (current_code.indexOf(codeProfile)>-1) {
								var rootid = $("asmRoot",$(portfolios[i])).attr("id");
								var xml = "";
								xml +="<asmResource xsi_type='nodeRes'>";
								xml +="<code>ftlv.@@"+USER.id+"@@-profile</code>";
								for (var j=0; j<languages.length;j++){
									xml +="			<label lang='"+languages[j]+"'>@@"+USER.id+"@@-profile</label>";	
								}
								xml +="		</asmResource>";
								rename(rootid,"profile");
								unshare_share(portfolioid,"profile");
							}
							if (current_code.indexOf(codeCV)>-1) {
								var rootid = $("asmRoot",$(portfolios[i])).attr("id");
								var xml = "";
								xml +="<asmResource xsi_type='nodeRes'>";
								xml +="<code>ftlv.@@"+USER.id+"@@-cv</code>";
								for (var j=0; j<languages.length;j++){
									xml +="			<label lang='"+languages[j]+"'>@@"+USER.id+"@@-cv</label>";	
								}
								xml +="		</asmResource>";
								rename(rootid,"cv");
								unshare_share(portfolioid,"cv");
							}
							if (current_code.indexOf(codeProjet)>-1) {
								var rootid = $("asmRoot",$(portfolios[i])).attr("id");
								var xml = "";
								xml +="<asmResource xsi_type='nodeRes'>";
								xml +="<code>ftlv.@@"+USER.id+"@@-projet</code>";
								for (var j=0; j<languages.length;j++){
									xml +="			<label lang='"+languages[j]+"'>@@"+USER.id+"@@-projet</label>";	
								}
								xml +="		</asmResource>";
								rename(rootid,"projet");
								unshare_share(portfolioid,"projet");
							}
						}
					}
				});
				$("#loading").hide();
				var fin = "<hr style='color:#0099cc;background-color:#0099cc''/>Le portfolio a été importé.<br/><button type='submit' onclick=\"window.location='../..'\">Retour à l'accueil</button>";
				$("#log").append($(fin));
			},
			error : function(jqxhr,textStatus) {
				alertHTML("Error : "+jqxhr.responseText);
			}
		});
	}
}

//==================================
function rename(rootid,type)
//==================================
{
	var xml = "";
	xml +="<asmResource xsi_type='nodeRes'>";
	xml +="<code>ftlv.@@"+USER.id+"@@-"+type+"</code>";
	for (var j=0; j<languages.length;j++){
		xml +="			<label lang='"+languages[j]+"'>@@"+USER.id+"@@-"+type+"</label>";	
	}
	xml +="		</asmResource>";
	$.ajax({
		async : false,
		type : "PUT",
		contentType: "application/xml",
		dataType : "text",
		data : xml,
		url : "../../../"+serverBCK+"/nodes/node/"+ rootid+"/noderesource",
		success : function(data) {
			$("#log").append("<br>- Traitement ("+type+")");
		},
		error : function(data) {
			$("#log").append("<br>- ***<span class='danger'>ERROR</span> in resource update: ftlv.@@"+USER.id+"@@-"+type);
		}
	});
}

//==================================
function unshare_share(portfolioid,type)
//==================================
{
	var xml = "<users><user id='"+USER.id+"'/></users>";
	var groupid = "";
	var url = "";
	//---- get role groupid ----------
	url = "../../../"+serverBCK+"/rolerightsgroups?portfolio="+portfolioid+"&role=etudiant";
	$.ajax({
		async : false,
		type : "GET",
		contentType: "text/html",
		dataType : "text",
		url : url,
		success : function(data) {
			groupid = data;
			//---- share tree --------------
			var url = "../../../"+serverBCK+"/rolerightsgroups/rolerightsgroup/" + groupid + "/users";
			$.ajax({
				async : false,
				type : "POST",
				contentType: "application/xml",
				dataType : "xml",
				url : url,
				data : xml,
				success : function(data) {
					$("#log").append("<br>- tree shared");
				},
				error : function(jqxhr,textStatus) {
					$("#log").append("<br>- ***<span class='danger'>ERROR</span> in tree shared ("+type+")");
				}
			});
		}
	});
	//---- get role groupid ----------
	url = "../../../"+serverBCK+"/rolerightsgroups?portfolio="+portfolioid+"&role=designer";
	$.ajax({
		async : false,
		type : "GET",
		contentType: "text/html",
		dataType : "text",
		url : url,
		success : function(data) {
			groupid = data;
			//---- unshare tree --------------
			var url = "../../../"+serverBCK+"/rolerightsgroups/rolerightsgroup/" + groupid + "/users/user/"+USER.id;
			$.ajax({
				async :false,
				type : "DELETE",
				contentType: "application/xml",
				dataType : "xml",
				url : url,
				data : xml,
				success : function(data) {
					$("#log").append(" - tree unshared");
				},
				error : function(jqxhr,textStatus) {
					$("#log").append(" - ***<span class='danger'>ERROR</span> in tree unshared ("+type+")");
				}
			});
		}
	});
}

//==================================
function deletePortfolios()
//==================================
{
	var urlS = "../../../"+serverBCK+"/portfolios?active=1";
	$.ajax({
		async : false,
		Accept: "application/xml",
		contentType: "application/xml",
		type : "GET",
		dataType : "xml",
		url : urlS,
		success : function(data) {
			var portfolios = $("portfolio",data);
			for ( var i=0;i<portfolios.length;i++)
			{
				var portfolioid = $(portfolios[i]).attr("id");
				//---- get role groupid ----------
				var url = "../../../"+serverBCK+"/rolerightsgroups?portfolio="+portfolioid+"&role=designer";
				$.ajax({
					async : false,
					type : "GET",
					contentType: "text/html",
					dataType : "text",
					url : url,
					success : function(data) {
						groupid = data;
						//---- share tree as designer to be able to delete ---
						var url = "../../../"+serverBCK+"/rolerightsgroups/rolerightsgroup/" + groupid + "/users";
						var xml = "<users><user id='"+USER.id+"'/></users>";
						$.ajax({
							async : false,
							type : "POST",
							contentType: "application/xml",
							dataType : "xml",
							url : url,
							data : xml,
							success : function(data) {
							
							},
							error : function(jqxhr,textStatus) {
								alert("Une erreur s'est produite. Si cela persite, contactez l'administrateur.")
							}
						});
					}
				});
				//---- delete tree --------------
				var urlS = "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid;
				$.ajax({
					async : false,
					type : "DELETE",
					contentType: "application/xml",
					dataType : "xml",
					url : urlS,
					data : "",
					success : function(data) {
					}
				});
			}
			alert("Votre portfolio a été supprimé.");
			window.location="../..";
		},
		error : function(jqxhr,textStatus) {
			alert("Error : "+jqxhr.responseText);
		}
	});
}

//==================================
function confirmDeleteUser() 
//==================================
{
	var js_remove = "deleteUser()";
	document.getElementById('delete-window-body').innerHTML = karutaStr[LANG]["confirm-delete"];
	var buttons = "<button class='btn' onclick=\"javascript:$('#delete-window').modal('hide');\">" + karutaStr[LANG]["Cancel"] + "</button>";
	buttons += "<button class='btn btn-danger' onclick=\"javascript:"+js_remove+";$('#delete-window').modal('hide');\">" + karutaStr[LANG]["button-delete"] + "</button>";
	document.getElementById('delete-window-footer').innerHTML = buttons;
	$('#delete-window').modal('show');
};

//==================================
function deleteUser()
//==================================
{
	var ok = false;
	var urlS = "../../../"+serverBCK+"/portfolios?active=1";
	$.ajax({
		async : false,
		Accept: "application/xml",
		contentType: "application/xml",
		type : "GET",
		dataType : "xml",
		url : urlS,
		success : function(data) {
			nb = $("portfolio",data).length;
			if (nb>0)
				alert("Vous devez d'abord supprimé votre portfolio.");
			else {
				var userid = USER.id;
				var url = "../../../"+serverBCK+"/users/user/"+userid;
				$.ajax({
					async : false,
					type : "DELETE",
					dataType : 'text',
					url : url,
					success : function() {
						alert("votre compte a été supprimé.");
						location.reload();
					},
					error : function(jqxhr,textStatus) {
						alert("Une erreur s'est produite. Si cela persite, contactez l'administrateur.")
					}
				});	
			}
		},
		error : function(jqxhr,textStatus) {
			alert("Erreur : "+jqxhr.responseText+ " Si l'erreur persiste, contactez l'administrateur.");
		}
	});
}

//==================================
function displayConnectionDelete()
//==================================
{
	var html = "";
	html += "<h2><img id='connexion-img' src='../img/login.png'/>Supprimer votre compte</h2>";
	html += "<h5><img width='30px' class='num' src='../img/num1.png'/> identification</h5>";
	html += "<input id='useridentifier' type='text' placeholder='Courriel'>";
	html += "<input id='password' type='password' placeholder='Mot de passe'>";
	html += "<button type='submit' onclick='javascript:callSubmitForDelete()'>Envoyer</button>";
	$("#display").html(html);
}

//==================================
function callSubmitForDelete()
//==================================
{
	var username = document.getElementById("useridentifier").value;
	var password = document.getElementById("password").value;
	var data = "<credential><login>"+username+"</login><password>"+password+"</password></credential>";
	$.ajax({
		Accept: "application/xml",
		contentType: "application/xml",
		type : "POST",
		dataType : "xml",
		url : "../../../../"+serverBCK+"/credential/login",
		data: data,
		success : function(data) {
			$.ajax({
				type : "GET",
				dataType : "xml",
				url : "../../../"+serverBCK+"/credential",
				data: "",
				success : function(data) {
					USER = new UIFactory["User"]($("user",data));
					confirmDeleteUser();
					},
				error : function(jqxhr,textStatus) {
					alert("Erreur d'identification");
				}
			});
		},
		error : function(jqxhr,textStatus) {
			alert("Erreur d'identification");
		}
	});
}

