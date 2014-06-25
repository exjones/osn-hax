// ==UserScript==
// @name        OSN TEZ
// @namespace   com.oracle.osn.tez
// @description A script to allow resizing of edit boxes in Oracle Social Network
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
    el.id="OSN_TEZ.src";
    el.type="text/javascript";
    el.onload=function(){
      document.body.removeChild(document.getElementById("OSN_TEZ.src"));
    };
    el.src="https://osn-hax.herokuapp.com/osn-tez.js";
    document.body.appendChild(el);
  }
}
// Don't run on frames or iframes 
if (window.top != window.self) return;
else waitAndInstall();

