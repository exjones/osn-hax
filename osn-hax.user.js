// ==UserScript==
// @name        OSN HAX
// @namespace   com.oracle.osn.hax
// @description Hacks and modifications to enhance your Oracle Social Network user experience
// @include     https://osn-fusioncrm.oracle.com/osn/web/*
// @version     1.0
// @grant       none
// @run-at      document-start
// ==/UserScript==
/*
 * --------------------------------------------
 * Monochrome icons courtesy of gentleface;
 * http://www.gentleface.com/free_icon_set.html
 * --------------------------------------------
 *
 */
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
            'development':'https://osn-hax-c9-exjones.c9.io/'
        },
        loadConfig:function(){
            var config = (typeof(window.localStorage) !== 'undefined') ? window.localStorage['OSNHAX_config'] : null;
            if(typeof(config) === 'undefined' || config === null || config === '') config = '{"channel":"release","components":null}';
            return JSON.parse(config);
        },
        saveConfig:function(obj){
            if(typeof(window.localStorage) !== 'undefined'){
                window.localStorage['OSNHAX_config'] = JSON.stringify(obj);
            }
        },
        log:function(msg){
            if(typeof(console) !== 'undefined' && console && typeof(console.debug) !== 'undefined'){
                for(var a = 0;a < arguments.length;a++){
                    console.debug(arguments[a]);
                }
            }

        },
        injectScript:function(src){
            
            var el=document.createElement('script');
            el.type='text/javascript';
            
            if(src.indexOf('http') == -1) src = window.OSNH.BASE_URLS[window.OSNH.config.channel] + src;
            el.src=src;
            document.body.appendChild(el);
        }
    };
    
    window.OSNH.config = window.OSNH.loadConfig();
    window.OSNH.saveConfig(window.OSNH.config);

    window.OSNH.log('Injecting OSN HAX bootstrap code from ' + window.OSNH.BASE_URLS[window.OSNH.config.channel]);
    window.OSNH.injectScript('osnh-bootstrap.js');
  }
}
// Don't run on frames or iframes 
if (window.top != window.self) return;
else waitAndInstall();
