function getFooter() {
	var html = "";
	html += "<div class='container'>";
	html += "	<div style='font-size: 14px; text-align: center; margin-left: 25px;float:left;margin-top:0px'>";
    html += "<a target='_blank' href='https://service-ingenierie-pedagogique.u-cergy.fr'>";
	html += "           <img src='../img/logo_service.jpg' style='height:70px'>";
    html += "</a>";
	html += "			  &nbsp; |&nbsp;&nbsp;&nbsp;";
	//~ html += "			<a style='color: rgba(18, 151, 188, 0.8);' target='_blank' href='https://goo.gl/forms/sYro01q7HCzHuz0n1'>Votre avis &nbsp;</a>";
//	html += "			<a target='_blank' href='https://goo.gl/forms/sYro01q7HCzHuz0n1'>Votre avis &nbsp;</a>";
//	html += "			  &nbsp; |&nbsp;&nbsp;&nbsp;";
	//~ html += "			<a style='color: rgba(18, 151, 188, 0.8);' target='_blank' href='https://docs.google.com/document/d/1YRAMsuUwO5VtKca1Jo7mDJMyuxZ0Dnvc44TAB2weRa0/edit?usp=sharing'>Mentions légales</a>";
	html += "			<a target='_blank' href='https://docs.google.com/document/d/1YRAMsuUwO5VtKca1Jo7mDJMyuxZ0Dnvc44TAB2weRa0/edit?usp=sharing'>Mentions légales</a>";
	html += "			  &nbsp; &nbsp;&nbsp; |&nbsp; &nbsp;";
	//~ html += "			<a style='color: rgba(18, 151, 188, 0.8);' target='_blank' href='https://docs.google.com/document/d/1qhi7Uf_ZMsJpDNzfdvvy-Ii_bt4ztaBUansbjNQxumQ/edit'> Aide à l’utilisation</a>";
//	html += "			<a target='_blank' href='https://docs.google.com/document/d/1qhi7Uf_ZMsJpDNzfdvvy-Ii_bt4ztaBUansbjNQxumQ/edit'> Aide à l’utilisation</a>";
//	html += "			  &nbsp; &nbsp;&nbsp; |&nbsp; &nbsp;";
	//~ html += "			<a style='color: rgba(18, 151, 188, 0.8);' target='_blank' href='https://goo.gl/forms/FhBdi3VlvQIiPM6J2'> Contacter l’administrateur</a>";
//	html += "			<a target='_blank' href='https://goo.gl/forms/FhBdi3VlvQIiPM6J2'> Contacter l’administrateur</a>";
//	html += "			  &nbsp; |&nbsp;&nbsp;&nbsp;";
	html += "		</div>";
	html += "		<div style='text-align:center;color:white;'>";
	html += "			Basé sur <a target='_blank' href='http://karuta-france-portfolio.fr' rel='noopener'><img src='../img//logo-karuta-transp-minimini.png' width='100' height='21'></a>";
	html += "			et <img src='../img//iut2-et-K-IUT.jpg' width='250' height='42' style='margin:5px'>";
	//~ html += "			Développé par l'IUT2 Grenoble &amp; propulsé par <a target='_blank' href='http://karuta-france-portfolio.fr' rel='noopener'><img src='../img//logo-karuta-transp-minimini.png' width='100' height='21'></a>";
	html += "		</div>";
	html += "	</div>	<!-- .container -->";
	return html;
}

//------ EXEC BATCH AT USER CREATION ------------------
var g_execbatch = true;
var g_execbatchbuttonlabel1 = [];
	g_execbatchbuttonlabel1['fr'] = "Patience! Création de votre portfolio ...";
var g_json = {};

//=======================
function prepareBatch()
//=======================
{
	var today=new Date();
	var annee = today.getFullYear();
	var mois = today.getMonth() + 1;
	if (mois<10)
		mois = "0"+mois;
	// ---- global variables ---------
	g_json['model_code'] = "IUT2batch.autocreer-portfolios-sans-superviseur";
	g_json['portfolio_code'] = "IUT2portfolios.IUT2-portfolio";
	g_json['profile_code'] = "IUT2portfolios.IUT2-profile";
	g_json['cv_code'] = "IUT2portfolios.IUT2-cv";
	g_json['projet_code'] = "IUT2portfolios.IUT2-projet";
	g_json['diploma_begin'] = annee+"-"+mois;
	// ---- local variables ---------
	g_json['lines'] = [];
	g_json.lines[0] =
	{
		"etudiant_id" : USER.username,
		"etudiant_email" : USER.email,
		"etudiant_lastname" : USER.lastname,
		"etudiant_firstname" : USER.firstname,
	};
}//----------------------------------------------------
