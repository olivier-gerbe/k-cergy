//----------------------------------
var application_version = "3.0";
var application_date = "2019-09-20";
//----------------------------------
var appliname = 'k-iut';
var karutaname = 'k-iut';
	var applitype = 'KIUT';   // FTLV ou KIUT
//---------
var bckname = '';
var serverBCK_API = "../../../karuta-backend"+bckname+"/rest/api";
var serverBCK = "karuta-backend"+bckname+"/rest/api";
var serverFIL = "karuta-backend"+bckname;
var serverVER = "karuta-backend"+bckname;
//----ELGG-----
var elgg_installed = false;
var elgg_url_base = '';
var elgg_url_absolute = '';
var elgg_auth_cas = false;
var g_elgg_refreshing = 120000; // 120s 
//----------------------------------
var languages = [];
var languages_name = [];
languages [0] = 'fr';
languages_name ['fr'] = 'Français';
languages [1] = 'en';
languages_name ['en'] = 'English';
//----------------------------------
var NONMULTILANGCODE = 0;  // default language if non-multilingual
var LANGCODE = 0; //default value
var LANG = languages[LANGCODE]; //default value
//----------------------------------
var carte_metiers_url =  "";
var cas_url = "https://auth.u-cergy.fr";
var message_logo = "/application/img/logo-ucp-iut-noir.png";