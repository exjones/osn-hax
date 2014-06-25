// ==UserScript==
// @name        OSN LNK
// @namespace   com.oracle.osn.lnk
// @description A script to help with creating permalinks in Oracle Social Network
// @include     https://osn-fusioncrm.oracle.com/osn/web/*
// @version     0.1
// @grant       none
// @run-at      document-start
// ==/UserScript==
function waitAndInstall(){
  var userName = document.getElementById("userName");
  if(userName === null){
    setTimeout(function(){waitAndInstall();},1000);
  }
  else{
    var el=document.createElement("script");
    el.id="OSN_LNK.src";
    el.type="text/javascript";
    el.onload=function(){
      document.body.removeChild(document.getElementById("OSN_LNK.src"));
    };
    el.src="https://raw.githubusercontent.com/exjones/osn-hax/master/osn-lnk.js";
    document.body.appendChild(el);
  }
}
// Don't run on frames or iframes 
if (window.top != window.self) return;
else waitAndInstall();

