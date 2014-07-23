/*
OSN HAX Bootstrap
-----------------
Create common general purpose functions, under the window.OSNH object.
Examine the config and install enabled modules.
*/
var OSNH = window.OSNH;

OSNH.log('Bootstrapping OSN HAX from the '+OSNH.config.channel+' channel.');

OSNH.components = {
    "osn-hax":{
        name:"osn-hax",
        description:"Unread message navigation and various styling tweaks.",
        src:"osn-hax.js"
    },
    "osn-lnk":{
        name:"osn-lnk",
        description:"An extension which helps you create permalinks to posts.",
        src:"osn-lnk.js"
    },
    "osn-img":{
        name:"osn-img",
        description:"An extension to OSN to allow easier image uploads and inserts into posts.",
        src:"osn-img.js"
    },
    "osn-tez":{
        name:"osn-tez",
        description:"A Text Editor resiZer hack.",
        src:"osn-tez.js"
    }
};

OSNH.install = function(){
    
    if(OSNH.config.components === null){
        OSNH.log('No specific components enabled, loading everything.');
        for(var c in OSNH.components){
            OSNH.log('Installing component ' + OSNH.components[c].name);
            OSNH.injectScript(OSNH.components[c].src);
        }
    } 
    else{
        for(var i = 0;i < OSNH.config.length;i++){
            OSNH.log('Installing component ' + OSNH.components[OSNH.config[i]].name);
            OSNH.injectScript(OSNH.components[OSNH.config[i]].src);
        }
    }
};

OSNH.install();
