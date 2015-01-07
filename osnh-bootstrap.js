/*
OSN HAX Bootstrap
-----------------
Create common general purpose functions, under the window.OSNH object.
Examine the config and install enabled modules.
*/
var OSNH = window.OSNH;

OSNH.log('Bootstrapping OSN HAX from the '+OSNH.config.channel+' channel.');

OSNH.VERSION = '1.0.0';

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
    "osnh-link":{
        name:"Permalink Generator",
        description:"An extension which helps you create permalinks to posts.",
        src:"osnh-link.js"
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
    "osn-tray":{
        name:"In Tray",
        description:"An in-tray for easier navigation of unread and flagged messages.",
        src:"osnh-tray.js"
    }
};

OSNH.injectCSS = function(arr){
    var css = document.createElement('style');
    css.setAttribute('type','text/css');
    css.innerHTML = (arr instanceof Array) ? arr.join('\n') : arr;
    document.head.appendChild(css);
};

OSNH.injectHTML = function(arr){

    if($('#osnh-html-injection-point').length <= 0){
        $('body').append('<div id="osnh-html-injection-point"></div>');
    }

    $('#osnh-html-injection-point').append((arr instanceof Array) ? arr.join('\n') : arr);
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

OSNH.addToolbarButton = function(func,hint,accel,icon,ext_id){
    
    var td = document.createElement("td");
    td.setAttribute("class","osnh-toolbar-button");
    
    if(typeof(ext_id) !== undefined){
        td.setAttribute('data-ext-id',ext_id);
    }
    
    var a = document.createElement("a");
    a.onclick = function(){func();return false;};
    a.href="#";
    a.title = hint;
    
    td.appendChild(a);
    
    var img = document.createElement("img");
    img.src = icon;
    
    a.appendChild(img);

    if(accel !== null){
        td.setAttribute("data-accelerator",accel);
        a.title = hint + " ("+accel+")";
        Mousetrap.bind(accel.toLowerCase(),function(){OSNH.log("Keyboard shortcut: " + accel);func();});
    }
    
    var els = $(OSNH.toolbar).find('td.osnh-toolbar-button');
    for(var e = 0;e < els.length - 1;e++){
        var ax = $(els[e]).attr('data-ext-id');
        var nx = $(els[e + 1]).attr('data-ext-id');
        if(ax < ext_id && nx > ext_id){
            $(els[e]).after(td);
            td = null;
            break;
        }
    }
    if(td !== null){
        OSNH.toolbar.getElementsByTagName("tr")[0].appendChild(td);
    } 
};

OSNH.install = function(){
    
    /*
    Hijack this plugin ;-) to hide the LastPass overlay, which appears when it can't 
    connect to the server from inside the firewall. And which can't be closed in Chrome.
    */
    $('iframe[id^="lpiframe"]').hide();
    
    OSNH.injectCSS("div#osnbMask{z-index:2;}");
    OSNH.createToolbar();
    OSNH.updateSettingsPage();
    
    if(OSNH.config.components === null){
        OSNH.log('No specific components enabled, loading everything.');
        for(var c in OSNH.components){
            OSNH.log('Installing component ' + OSNH.components[c].name);
            OSNH.injectScript(OSNH.components[c].src);
        }
    } 
    else{
        var loaded = {};
        for(var i = 0;i < OSNH.config.components.length;i++){
            var cmp = OSNH.config.components[i];
            if(!loaded[cmp]){
                loaded[cmp] = true;
                OSNH.log('Installing component ' + OSNH.components[cmp].name);
                OSNH.injectScript(OSNH.components[cmp].src);
            }
        }
    }
    
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
    
    // OSNH.log('OSNH ajax call to: ' + conf.resource);
    
    if(typeof(conf) != 'undefined'){
        $.ajax({
            type :conf.method,
            url: ((conf.resource.indexOf(OSNH.apiBase) == -1) ? OSNH.apiBase : '') +conf.resource,
            success:conf.callback,
        
            contentType:OSNH.contentType,
            beforeSend:OSNH.beforeSend,
            error:OSNH.ajaxError
        });
    }
    else conf.callback({});
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
            
            OSNH.convoMenu.sort(function(a,b){
                if(a.id < b.id) return -1;
                if(a.id > b.id) return 1;
                return 0;
            });
            
            for(var m = 0;m < OSNH.convoMenu.length;m++){
                
                // If there isn't already a menu item with this ID
                if($('#'+OSNH.convoMenu[m].id).length === 0){

                    OSNH.log("Adding menu item: " + OSNH.convoMenu[m].id + '=' + OSNH.convoMenu[m].text);
                
                    // Add it and bind its click
                    $(items[items.length-1]).after(
                        '<div class="GE0BIW3BJS"><a id="'+OSNH.convoMenu[m].id+'" class="gwt-Anchor GE0BIW3BKS" href="#" title="'+OSNH.convoMenu[m].text+'" style="text-overflow: ellipsis; white-space: nowrap;">'+OSNH.convoMenu[m].text+'</a></div>'
                    );
                    $('#'+OSNH.convoMenu[m].id).click(OSNH.convoMenu[m].callback);
                }
            }
        }
    }
};

OSNH.addConversationMenuItem = function(id,text,callback){
    
    if(typeof(OSNH.convoMenu) === 'undefined') OSNH.convoMenu = [];
    
    OSNH.convoMenu.push({
        id:id,
       text:text,
       callback:callback
    });
};

OSNH.informHashListeners = function(){

    // Inject, or update our settings page
    OSNH.updateSettingsPage();
    
    // Tell all the other listeners
    for(var h in OSNH.hashListeners){
        OSNH.hashListeners[h]();
    }    
};

OSNH.registerHashChangeListener = function(id,callback){
    
    if(typeof(OSNH.hashListeners) === 'undefined') OSNH.hashListeners = {};
    
    OSNH.hashListeners[id] = callback;
};

OSNH.updateSettingsPage = function(){
    
    if(window.location.hash !== null && window.location.hash.indexOf('#settings') != -1){
        OSNH.log('Updating settings page');
        if($('#osnh-settings-menu').length === 0){
            var items = $('div.GE0BIW3BEBC.GE0BIW3BO1B > ul:visible').not('.sidebar').find('li');
            $(items[items.length-1]).before('<li id="osnh-settings-menu" class="textNavItem"><a class="gwt-Anchor" href="#" title="Extensions">Extensions</a></li>');
        }
        
        $('#osnh-settings-menu').click(function(e){
            
            $('div.GE0BIW3BEBC.GE0BIW3BO1B > ul:visible').not('.sidebar').find('li').removeClass('selected');
            $('#osnh-settings-menu').addClass('selected');

            var extensionHtml = '<div class="GE0BIW3BLGC"><div class="gwt-Label">Enable these extensions:</div></div>';
            
            for(var c in OSNH.components){
                var isChecked = '';
                
                if(OSNH.config.components === null){
                    isChecked = 'checked=""';
                }
                else{
                    for(var i = 0;i < OSNH.config.components.length;i++){
                        if(c == OSNH.config.components[i]){
                            isChecked = 'checked=""';
                            break;
                        } 
                    }
                }
                
                extensionHtml += '<div class="GE0BIW3BEGC"><span class="gwt-CheckBox GE0BIW3BOFC"><input class="osnh-component" type="checkbox" value="'+c+'" id="'+c+'" tabindex="0" '+isChecked+'><label for="'+c+'">'+OSNH.components[c].name +' - '+OSNH.components[c].description+'</label></span></div>';
            }
            
            $('div.GE0BIW3BL1B > div').html(
                '<div class="GE0BIW3BHGC"><h1>Extensions: v'+OSNH.VERSION+'</h1></div>'+
                '<div class="gwt-HTML GE0BIW3BKGC"></div>'+
                '<div class="gwt-HTML GE0BIW3BFGC">You can change the channel from which you get your extensions. Unless you know what you\'re doing, set this to Release:</div>'+
                '<div class="GE0BIW3BIGC"><div class="gwt-HTML">Channel</div><select id="osnh-channel-select" class="gwt-ListBox GE0BIW3BGGC">'+
                '<option value="release"'+((OSNH.config.channel=='release')?' selected="selected"':'')+'>Release</option>'+
                '<option value="testing"'+((OSNH.config.channel=='testing')?' selected="selected"':'')+'>Testing</option>'+
                '<option value="development"'+((OSNH.config.channel=='development')?' selected="selected"':'')+'>Development</option>'+
                '</select>'+
                '</div>'+
                extensionHtml +
                '<div class="gwt-HTML GE0BIW3BKGC"></div>'+
                // '<div class="gwt-HTML GE0BIW3BFGC">Refresh your browser to have any changes take effect.</div>'+
                '<div class="gwt-HTML GE0BIW3BFGC"><a id="osnh_apply_changes" class="gwt-Anchor osn_button_primary osn_button_textOnly" href="#" title="Apply Changes">Apply Changes</a></div>'
            );
            
            $('.osnh-component').change(function(){
                OSNH.log('Changed checkbox:'+$(this).attr('id')+'='+$(this).is(':checked')); 
                
                var arr = {};
                $('.osnh-component').each(function(i,e){
                    var id = $(e).attr('id');
                    if($(e).is(':checked')) arr[id] = true;
                });
                
                OSNH.config.components = [];
                for(var cmp in arr){
                    OSNH.config.components.push(cmp);
                }
            });
            
            $('#osnh-channel-select').change(function(){
                OSNH.log('Changed channel:'+$(this).val()); 
                OSNH.config.channel = $(this).val();
            });
            
            $('#osnh_apply_changes').click(function(evt){
                OSNH.log('Saving config: ' + JSON.stringify(OSNH.config));
                OSNH.saveConfig(OSNH.config);
                setTimeout(function(){OSNH.log('Reloading location: '+window.location);window.location.reload();},1000);
                evt.preventDefault();
            });
            
            e.preventDefault(); 
        });
        
        $('#osnh-settings-menu').removeClass('selected');
    }
}

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

// *
// Temporary way to hack in the Share handler
// *

// Query string parsing, from; http://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
var queryDict = {};
location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = decodeURIComponent(item.split("=")[1])});
if((window.location+'').indexOf('https://socialnetwork.oracle.com/osn/web/?conversation=7165989&window=standalone&shareLink=') == 0 && queryDict['shareTitle'] && queryDict['shareLink']){
  
  console.log('Starting up sharing page');  
    
  $.ajax({url:'/osn/social/api/v1/connection',type:'GET',contentType:'application/json',success:function(data){
      
    var apiKey = window.Oracle.OSN.randomId; // data.apiRandomID;
    var avatarURL = data.user.scaledPictureURL;
    var wallURL = data.user.wallURL+'/messages'; // https://socialnetwork.oracle.com/osn/social/api/v1/conversations/1162983
    var shareTitle = queryDict['shareTitle'];
    var shareLink = queryDict['shareLink'];
      
    $('body').html(
      '<div style="background:url('+avatarURL+') no-repeat 5px 33px;">'+
        '<div style="font-size:12px;height:28px;color:white;background:#0572ce no-repeat 3px 1px url(data:image/png;base64,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);">'+
        '<div style="padding-top:6px;padding-left:35px;font-weight:bold;">Share to OSN</div>'+
        '</div>'+
        '<div style="padding:10px;padding-left:55px;">'+
        '<textarea id="osnShareText" rows="3" style="font-size:12px;width:100%;" placeholder="Say something about this..."></textarea>'+
        '<div style="border:1px #c9c9c9 dashed;margin-top:5px;padding:10px;">'+
          '<div style="color:#0572ce;font-size:14px;">'+shareTitle+'</div>'+
        '<div style="font-size:10px;margin-top:5px;">'+shareLink+'</div>'+
          '</div>'+
        '</div>'+
        '<div style="font-size:12px;height:32px;padding-top:5px;border-top:1px solid #c9c9c9;background:#eeeff0;width:100%;position:fixed;bottom:0;left:0;text-align:right;">'+
          '<a style="margin-right:5px;" class="gwt-Anchor osn_button_primary osn_button_textOnly" href="javascript:;" id="osnShareOK">Share</a>'+
          '<a style="margin-right:5px;" class="gwt-Anchor osn_button_secondary osn_button_textOnly" href="javascript:;" id="osnShareCancel">Cancel</a>'+
        '</div>'+
      '</div>'
    );
      
    $('#osnShareOK').click(function(){
      console.log('Share to OSN');
        
      $.ajax({
        url:wallURL,
        type:'POST',
        data:JSON.stringify({message:'<p>'+$('#osnShareText').val()+'</p><p><strong>'+shareTitle+'</strong></p><p><a href="'+shareLink+'">'+shareLink+'</a></p>'}),
        contentType:'application/json',
        beforeSend:function(e){
          e.setRequestHeader("X-Waggle-RandomID",apiKey);
        },
        success:function(data){
          window.close();
        }
      });
      
      
    });
      
    $('#osnShareCancel').click(function(){
      window.close();
    });
    
  }});
    
  document.title='Share to OSN';
}

