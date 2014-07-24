/*
OSN HAX Bootstrap
-----------------
Create common general purpose functions, under the window.OSNH object.
Examine the config and install enabled modules.
*/
var OSNH = window.OSNH;

OSNH.log('Bootstrapping OSN HAX from the '+OSNH.config.channel+' channel.');

OSNH.components = {
    "osnh-styling":{
        name:"Styling Tweaks",
        description:"Various styling tweaks to the OSN interface, via injected CSS.",
        src:"osnh-styling.js"
    },
    "osnh-navigation":{
        name:"Message Navigation",
        description:"Easier ways to navigate unread messages.",
        src:"osnh-navigation.js"
    },
    "osnh-slideshow":{
        name:"Image Slideshow",
        description:"Display a floating slideshow of all the pictures in a conversation. Inspired by the Apple TV screen saver!",
        src:"osnh-slideshow.js"
    },
    "osnh-members":{
        name:"List Members",
        description:"Shows a list of all the people in a conversation, regardless of which group membership brought them in.",
        src:"osnh-members.js"
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
    },
    "osn-lnk":{
        name:"osn-lnk",
        description:"An extension which helps you create permalinks to posts.",
        src:"osn-lnk.js"
    }
};

OSNH.injectCSS = function(arr){
    var css = document.createElement('style');
    css.setAttribute('type','text/css');
    css.innerHTML = (arr instanceof Array) ? arr.join('\n') : arr;
    document.head.appendChild(css);
};

OSNH.createToolbar = function(){

    window.OSNH.injectCSS([
        "td.osnh-toolbar-button{padding:5px;padding-bottom:0;vertical-align:top;}",
        "td.osnh-toolbar-button:hover{background-color:#015aa5;}",
        "#osnh-toolbar{margin-left:15px;margin-top:1px;}"
    ]);
    
    OSNH.toolbar = document.createElement("table");
    OSNH.toolbar.setAttribute("id","osnh-toolbar");
    
    var head = document.getElementById("osn-header");
    var tab = head.firstChild.getElementsByTagName("table");
    if(tab !== null && tab.length > 0){
            
        var tr = tab[0].getElementsByTagName("tr")[0];
        var td = document.createElement("td");
        tr.appendChild(td);
        td.appendChild(OSNH.toolbar);
    }

    $(OSNH.toolbar).append("<tbody><tr></tr></tbody>");
};

OSNH.addToolbarButton = function(func,hint,accel,icon){
    
    var td = document.createElement("td");
    td.setAttribute("class","osnh-toolbar-button");
    
    var a = document.createElement("a");
    a.onclick = function(){func();return false;};
    a.href="#";
    a.title = hint;
    
    td.appendChild(a);
    
    var img = document.createElement("img");
    img.src = icon;
    
    a.appendChild(img);
    
    OSNH.toolbar.getElementsByTagName("tr")[0].appendChild(td);
    
    if(accel !== null){
        td.setAttribute("data-accelerator",accel);
        a.title = hint + " ("+accel+")";
        Mousetrap.bind(accel.toLowerCase(),function(){OSNH.log("Keyboard shortcut: " + accel);func();});
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
    
    OSNH.injectCSS("div#osnbMask{z-index:2;}");
    OSNH.createToolbar();
    
    setInterval(OSNH.injectConvoMenu,500);
    
    $(window).on('hashchange',OSNH.informHashListeners);
};

OSNH.apiBase = window.location.pathname.substring(0,window.location.pathname.indexOf('/',1))+'/social/api/v1/';
    
OSNH.contentType = 'application/json; charset=utf-8';

OSNH.beforeSend = function(e){
    e.setRequestHeader("X-Waggle-RandomID",window.Oracle.OSN.randomId);
};
                
OSNH.ajaxError = function(e,t,n){
    OSNH.log(t+n);
};                

OSNH.ajax = function(conf){
    
    $.ajax({
        type :conf.method,
        url: ((conf.resource.indexOf(OSNH.apiBase) == -1) ? OSNH.apiBase : '') +conf.resource,
        success:conf.callback,
        
        contentType:OSNH.contentType,
        beforeSend:OSNH.beforeSend,
        error:OSNH.ajaxError
    });
};

OSNH.getConversationId = function(){
    
    var id = window.location.hash;
    var st = id.indexOf('conversation:id=');
    if(st == -1) return null;
    
    st+=16;
    var en=id.indexOf("&",st);
    
    return id.substring(st,en);
};

OSNH.injectConvoMenu = function(){

    // Not a conversation
    if(window.location.href.indexOf('conversation:id=') == -1) return;

    // Find the More menu
    var popup = $('div.GE0BIW3BMS:visible');
    if(popup.length){
        
        // This is the More menu in the header
        if($(popup).find('.GE0BIW3BGN').length !== 0) return;
        
        // Find the items in it that aren't in the system menu
        var items = $(popup).find('div.GE0BIW3BHS div.GE0BIW3BJS').not('.GE0BIW3BLS');
        if(items.length){
            for(var m in OSNH.convoMenu){
                
                // If there isn't already a menu item with this ID
                if($('#'+m).length === 0){

                    OSNH.log("Adding menu item: " + m + '=' + OSNH.convoMenu[m].text);
                
                    // Add it and bind its click
                    $(items[items.length-1]).after(
                        '<div class="GE0BIW3BJS"><a id="'+m+'" class="gwt-Anchor GE0BIW3BKS" href="#" title="'+OSNH.convoMenu[m].text+'" style="text-overflow: ellipsis; white-space: nowrap;">'+OSNH.convoMenu[m].text+'</a></div>'
                    );
                    $('#'+m).click(OSNH.convoMenu[m].callback);
                }
            }
        }
    }
};

OSNH.addConversationMenuItem = function(id,text,callback){
    
    if(typeof(OSNH.convoMenu) === 'undefined') OSNH.convoMenu = {};
    
    OSNH.convoMenu[id] = {
       text:text,
       callback:callback
    };
};

OSNH.informHashListeners = function(){

    for(var h in OSNH.hashListeners){
        OSNH.hashListeners[h]();
    }    
};

OSNH.registerHashChangeListener = function(id,callback){
    
    if(typeof(OSNH.hashListeners) === 'undefined') OSNH.hashListeners = {};
    
    OSNH.hashListeners[id] = callback;
};

OSNH.install();

// 
// Extras and plugins, embedded here for simplicity
// ================================================
//

/* 
mousetrap 
v1.3.2 
craig.is/killing/mice 
*/
if(typeof Mousetrap != "undefined" && Mousetrap) Mousetrap.reset();
(function(){function s(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)}function y(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return h[a.which]?h[a.which]:z[a.which]?z[a.which]:String.fromCharCode(a.which).toLowerCase()}function t(a,b){a=a||{};var c=!1,d;for(d in m)a[d]&&m[d]>b?c=!0:m[d]=0;c||(p=!1)}function A(a,b,c,d,g){var f,e,h=[],j=c.type;if(!l[a])return[];"keyup"==j&&u(a)&&(b=[a]);for(f=0;f<l[a].length;++f)if(e=
l[a][f],!(e.seq&&m[e.seq]!=e.level)&&j==e.action&&("keypress"==j&&!c.metaKey&&!c.ctrlKey||b.sort().join(",")===e.modifiers.sort().join(",")))d&&e.combo==g&&l[a].splice(f,1),h.push(e);return h}function v(a,b,c){if(!k.stopCallback(b,b.target||b.srcElement,c)&&!1===a(b,c))b.preventDefault&&b.preventDefault(),b.stopPropagation&&b.stopPropagation(),b.returnValue=!1,b.cancelBubble=!0}function w(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=y(a);if(b)if("keyup"==a.type&&x==b)x=!1;else{var c=[];
a.shiftKey&&c.push("shift");a.altKey&&c.push("alt");a.ctrlKey&&c.push("ctrl");a.metaKey&&c.push("meta");var c=A(b,c,a),d,g={},f=0,e=!1;for(d=0;d<c.length;++d)c[d].seq?(e=!0,f=Math.max(f,c[d].level),g[c[d].seq]=1,v(c[d].callback,a,c[d].combo)):!e&&!p&&v(c[d].callback,a,c[d].combo);a.type==p&&!u(b)&&t(g,f)}}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function B(a,b,c){if(!c){if(!q){q={};for(var d in h)95<d&&112>d||h.hasOwnProperty(d)&&(q[h[d]]=d)}c=q[a]?"keydown":"keypress"}"keypress"==
c&&b.length&&(c="keydown");return c}function C(a,b,c,d,g){r[a+":"+c]=b;a=a.replace(/\s+/g," ");var f=a.split(" "),e,h,j=[];if(1<f.length){var k=a,n=c;m[k]=0;n||(n=B(f[0],[]));a=function(){p=n;++m[k];clearTimeout(D);D=setTimeout(t,1E3)};c=function(a){v(b,a,k);"keyup"!==n&&(x=y(a));setTimeout(t,10)};for(d=0;d<f.length;++d)C(f[d],d<f.length-1?a:c,n,k,d)}else{h="+"===a?["+"]:a.split("+");for(f=0;f<h.length;++f)e=h[f],E[e]&&(e=E[e]),c&&("keypress"!=c&&F[e])&&(e=F[e],j.push("shift")),u(e)&&j.push(e);c=
B(e,j,c);l[e]||(l[e]=[]);A(e,j,{type:c},!d,a);l[e][d?"unshift":"push"]({callback:b,modifiers:j,action:c,seq:d,level:g,combo:a})}}for(var h={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},z={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},
F={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},E={option:"alt",command:"meta","return":"enter",escape:"esc"},q,l={},r={},m={},D,x=!1,p=!1,g=1;20>g;++g)h[111+g]="f"+g;for(g=0;9>=g;++g)h[g+96]=g;s(document,"keypress",w);s(document,"keydown",w);s(document,"keyup",w);var k={bind:function(a,b,c){a=a instanceof Array?a:[a];for(var d=0;d<a.length;++d)C(a[d],b,c);return this},unbind:function(a,b){return k.bind(a,
function(){},b)},trigger:function(a,b){if(r[a+":"+b])r[a+":"+b]({},a);return this},reset:function(){l={};r={};return this},stopCallback:function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.contentEditable&&"true"==b.contentEditable}};window.Mousetrap=k;"function"===typeof define&&define.amd&&define(k)})();
Mousetrap=function(a){var d={},e=a.stopCallback;a.stopCallback=function(b,c,a){return d[a]?!1:e(b,c,a)};a.bindGlobal=function(b,c,e){a.bind(b,c,e);if(b instanceof Array)for(c=0;c<b.length;c++)d[b[c]]=!0;else d[b]=!0};return a}(Mousetrap);

/*
By: Sam Deering
Make it safe to use console.log always with this handy little JavaScript code snippet. 
Console.log’s can break in Internet explorer and other browsers with console disabled, better safe then sorry!
http://www.jquery4u.com/snippets/safe-console-log/
*/
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());
