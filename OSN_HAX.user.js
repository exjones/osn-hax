// ==UserScript==
// // @name        OSN HAX
// // @namespace   com.oracle.osn.hax
// // @description Hacks to modify and enhance the Oracle Social Network user interface
// // @include     https://osn-fusioncrm.oracle.com/osn/web/*
// // @version     1.6
// // @grant       none
// // @run-at      document-start
// // ==/UserScript==
function waitAndInstall(){
  var userName = document.getElementById("userName");
  if(userName === null){
    setTimeout(function(){waitAndInstall();},1000);
  }
  else{
    var el=document.createElement("script");
    el.id="OSN_HAX.src";
    el.type="text/javascript";
    el.onload=function(){
      document.body.removeChild(document.getElementById("OSN_HAX.src"));
    };
    el.src="osn-hax.js";
    document.body.appendChild(el);
  }
}
waitAndInstall();

