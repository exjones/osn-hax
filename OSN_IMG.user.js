// ==UserScript==
// @name        OSN IMG
// @namespace   com.oracle.osn.img
// @description A script to allow easier embedding of images in Oracle Social Network posts
// @include     https://osn-fusioncrm.oracle.com/osn/web/*
// @version     0.5
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
    el.id="OSN_IMG.src";
    el.type="text/javascript";
    el.onload=function(){
      document.body.removeChild(document.getElementById("OSN_IMG.src"));
    };
    el.src="https://osn-hax.herokuapp.com/osn-img.js";
    document.body.appendChild(el);
  }
}
// Don't run on frames or iframes 
if (window.top != window.self) return;
else waitAndInstall();

