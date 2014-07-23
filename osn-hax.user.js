// ==UserScript==
// @name        OSN HAX
// @namespace   com.oracle.osn.hax
// @description Hacks and modifications to enhance your Oracle Social Network user experience
// @include     https://osn-fusioncrm.oracle.com/osn/web/*
// @version     1.0
// @grant       none
// @run-at      document-start
// ==/UserScript==
function waitAndInstall(){
  var userName = document.getElementById('userName');
  if(userName === null){
    setTimeout(function(){waitAndInstall();},1000);
  }
  else{
    window.OSNH = {
        BASE_URLS: {
            'release':'https://stbeehive.oracle.com/content/dav/st/osn-hax/release/',
            'testing':'https://osn-hax.herokuapp.com/',
            'development':'https://c9.io/exjones/osn-hax/workspace/'
        },
        loadConfig:function(){
            var config = (typeof(window.localStorage) !== 'undefined') ? window.localStorage['OSNHAX_config'] : null;
            if(typeof(config) === 'undefined' || config === '') config = '{"channel":"release","components":null}';
            return JSON.parse(config);
        },
        saveConfig:function(obj){
            if(typeof(window.localStorage) !== 'undefined'){
                window.localStorage['OSNHAX_config'] = JSON.stringify(obj);
            }
        },
        log:function(msg){
            if(typeof(console) !== 'undefined' && typeof(console.log) !== 'undefined') console.log(msg);
        },
        injectScript:function(src){
            var el=document.createElement('script');
            el.type='text/javascript';
            el.src=src;
            document.body.appendChild(el);
        }
    };
    
    window.OSNH.config = window.OSNH.loadConfig();
    window.OSNH.saveConfig(window.OSNH.config);

    window.OSNH.log('Injecting OSN HAX bootstrap code from ' + window.OSNH.BASE_URLS[window.OSNH.config.channel]);
    window.OSNH.injectScript(window.OSNH.BASE_URLS[window.OSNH.config.channel] + 'osnh-bootstrap.js');
  }
}
// Don't run on frames or iframes 
if (window.top != window.self) return;
else waitAndInstall();
