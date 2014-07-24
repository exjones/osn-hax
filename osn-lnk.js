/*
 *OSN LNK - Some OSN UI customizations for helping you get permalinks to places
 */

// Additional code, from other people, included here to save multiple file inclusions 

/*
By: Sam Deering
Make it safe to use console.log always with this handy little JavaScript code snippet. 
Console.log’s can break in Internet explorer and other browsers with console disabled, better safe then sorry!
http://www.jquery4u.com/snippets/safe-console-log/
*/
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

/*!
 * LZString - Compresses/encodes strings using an implementation of the LZW algorithm
 * http://pieroxy.net/blog/pages/lz-string/index.html 
 * This software is copyrighted to Pieroxy (2013) and all versions are currently licensed under the very popular WTFPL (http://www.wtfpl.net/).
 * v1.3.3
 */ 
var LZString={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_f:String.fromCharCode,compressToBase64:function(c){if(c==null){return""}var a="";var k,h,f,j,g,e,d;var b=0;c=this.compress(c);while(b<c.length*2){if(b%2==0){k=c.charCodeAt(b/2)>>8;h=c.charCodeAt(b/2)&255;if(b/2+1<c.length){f=c.charCodeAt(b/2+1)>>8}else{f=NaN}}else{k=c.charCodeAt((b-1)/2)&255;if((b+1)/2<c.length){h=c.charCodeAt((b+1)/2)>>8;f=c.charCodeAt((b+1)/2)&255}else{h=f=NaN}}b+=3;j=k>>2;g=((k&3)<<4)|(h>>4);e=((h&15)<<2)|(f>>6);d=f&63;if(isNaN(h)){e=d=64}else{if(isNaN(f)){d=64}}a=a+this._keyStr.charAt(j)+this._keyStr.charAt(g)+this._keyStr.charAt(e)+this._keyStr.charAt(d)}return a},decompressFromBase64:function(g){if(g==null){return""}var a="",d=0,e,o,m,k,n,l,j,h,b=0,c=this._f;g=g.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<g.length){n=this._keyStr.indexOf(g.charAt(b++));l=this._keyStr.indexOf(g.charAt(b++));j=this._keyStr.indexOf(g.charAt(b++));h=this._keyStr.indexOf(g.charAt(b++));o=(n<<2)|(l>>4);m=((l&15)<<4)|(j>>2);k=((j&3)<<6)|h;if(d%2==0){e=o<<8;if(j!=64){a+=c(e|m)}if(h!=64){e=k<<8}}else{a=a+c(e|o);if(j!=64){e=m<<8}if(h!=64){a+=c(e|k)}}d+=3}return this.decompress(a)},compressToUTF16:function(d){if(d==null){return""}var b="",e,j,h,a=0,g=this._f;d=this.compress(d);for(e=0;e<d.length;e++){j=d.charCodeAt(e);switch(a++){case 0:b+=g((j>>1)+32);h=(j&1)<<14;break;case 1:b+=g((h+(j>>2))+32);h=(j&3)<<13;break;case 2:b+=g((h+(j>>3))+32);h=(j&7)<<12;break;case 3:b+=g((h+(j>>4))+32);h=(j&15)<<11;break;case 4:b+=g((h+(j>>5))+32);h=(j&31)<<10;break;case 5:b+=g((h+(j>>6))+32);h=(j&63)<<9;break;case 6:b+=g((h+(j>>7))+32);h=(j&127)<<8;break;case 7:b+=g((h+(j>>8))+32);h=(j&255)<<7;break;case 8:b+=g((h+(j>>9))+32);h=(j&511)<<6;break;case 9:b+=g((h+(j>>10))+32);h=(j&1023)<<5;break;case 10:b+=g((h+(j>>11))+32);h=(j&2047)<<4;break;case 11:b+=g((h+(j>>12))+32);h=(j&4095)<<3;break;case 12:b+=g((h+(j>>13))+32);h=(j&8191)<<2;break;case 13:b+=g((h+(j>>14))+32);h=(j&16383)<<1;break;case 14:b+=g((h+(j>>15))+32,(j&32767)+32);a=0;break}}return b+g(h+32)},decompressFromUTF16:function(d){if(d==null){return""}var b="",h,j,a=0,e=0,g=this._f;while(e<d.length){j=d.charCodeAt(e)-32;switch(a++){case 0:h=j<<1;break;case 1:b+=g(h|(j>>14));h=(j&16383)<<2;break;case 2:b+=g(h|(j>>13));h=(j&8191)<<3;break;case 3:b+=g(h|(j>>12));h=(j&4095)<<4;break;case 4:b+=g(h|(j>>11));h=(j&2047)<<5;break;case 5:b+=g(h|(j>>10));h=(j&1023)<<6;break;case 6:b+=g(h|(j>>9));h=(j&511)<<7;break;case 7:b+=g(h|(j>>8));h=(j&255)<<8;break;case 8:b+=g(h|(j>>7));h=(j&127)<<9;break;case 9:b+=g(h|(j>>6));h=(j&63)<<10;break;case 10:b+=g(h|(j>>5));h=(j&31)<<11;break;case 11:b+=g(h|(j>>4));h=(j&15)<<12;break;case 12:b+=g(h|(j>>3));h=(j&7)<<13;break;case 13:b+=g(h|(j>>2));h=(j&3)<<14;break;case 14:b+=g(h|(j>>1));h=(j&1)<<15;break;case 15:b+=g(h|j);a=0;break}e++}return this.decompress(b)},compress:function(e){if(e==null){return""}var h,l,n={},m={},o="",c="",r="",d=2,g=3,b=2,q="",a=0,j=0,p,k=this._f;for(p=0;p<e.length;p+=1){o=e.charAt(p);if(!Object.prototype.hasOwnProperty.call(n,o)){n[o]=g++;m[o]=true}c=r+o;if(Object.prototype.hasOwnProperty.call(n,c)){r=c}else{if(Object.prototype.hasOwnProperty.call(m,r)){if(r.charCodeAt(0)<256){for(h=0;h<b;h++){a=(a<<1);if(j==15){j=0;q+=k(a);a=0}else{j++}}l=r.charCodeAt(0);for(h=0;h<8;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}else{l=1;for(h=0;h<b;h++){a=(a<<1)|l;if(j==15){j=0;q+=k(a);a=0}else{j++}l=0}l=r.charCodeAt(0);for(h=0;h<16;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}d--;if(d==0){d=Math.pow(2,b);b++}delete m[r]}else{l=n[r];for(h=0;h<b;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}d--;if(d==0){d=Math.pow(2,b);b++}n[c]=g++;r=String(o)}}if(r!==""){if(Object.prototype.hasOwnProperty.call(m,r)){if(r.charCodeAt(0)<256){for(h=0;h<b;h++){a=(a<<1);if(j==15){j=0;q+=k(a);a=0}else{j++}}l=r.charCodeAt(0);for(h=0;h<8;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}else{l=1;for(h=0;h<b;h++){a=(a<<1)|l;if(j==15){j=0;q+=k(a);a=0}else{j++}l=0}l=r.charCodeAt(0);for(h=0;h<16;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}d--;if(d==0){d=Math.pow(2,b);b++}delete m[r]}else{l=n[r];for(h=0;h<b;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}}d--;if(d==0){d=Math.pow(2,b);b++}}l=2;for(h=0;h<b;h++){a=(a<<1)|(l&1);if(j==15){j=0;q+=k(a);a=0}else{j++}l=l>>1}while(true){a=(a<<1);if(j==15){q+=k(a);break}else{j++}}return q},decompress:function(k){if(k==null){return""}var o=[],j,d=4,l=4,h=3,q="",t="",g,p,r,s,a,b,n,m=this._f,e={string:k,val:k.charCodeAt(0),position:32768,index:1};for(g=0;g<3;g+=1){o[g]=g}r=0;a=Math.pow(2,2);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}switch(j=r){case 0:r=0;a=Math.pow(2,8);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}n=m(r);break;case 1:r=0;a=Math.pow(2,16);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}n=m(r);break;case 2:return""}o[3]=n;p=t=n;while(true){r=0;a=Math.pow(2,h);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}switch(n=r){case 0:r=0;a=Math.pow(2,8);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}o[l++]=m(r);n=l-1;d--;break;case 1:r=0;a=Math.pow(2,16);b=1;while(b!=a){s=e.val&e.position;e.position>>=1;if(e.position==0){e.position=32768;e.val=e.string.charCodeAt(e.index++)}r|=(s>0?1:0)*b;b<<=1}o[l++]=m(r);n=l-1;d--;break;case 2:return t}if(d==0){d=Math.pow(2,h);h++}if(o[n]){q=o[n]}else{if(n===l){q=p+p.charAt(0)}else{return null}}t+=q;o[l++]=p+q.charAt(0);d--;p=q;if(d==0){d=Math.pow(2,h);h++}}}};
 
/*
 * zClip :: jQuery ZeroClipboard v1.1.1
 * http://steamdev.com/zclip
 *
 * Copyright 2011, SteamDev
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Wed Jun 01, 2011
 */
(function(a){a.fn.zclip=function(c){if(typeof c=="object"&&!c.length){var b=a.extend({path:"ZeroClipboard.swf",copy:null,beforeCopy:null,afterCopy:null,clickAfter:true,setHandCursor:true,setCSSEffects:true},c);return this.each(function(){var e=a(this);if(e.is(":visible")&&(typeof b.copy=="string"||a.isFunction(b.copy))){ZeroClipboard.setMoviePath(b.path);var d=new ZeroClipboard.Client();if(a.isFunction(b.copy)){e.bind("zClip_copy",b.copy)}if(a.isFunction(b.beforeCopy)){e.bind("zClip_beforeCopy",b.beforeCopy)}if(a.isFunction(b.afterCopy)){e.bind("zClip_afterCopy",b.afterCopy)}d.setHandCursor(b.setHandCursor);d.setCSSEffects(b.setCSSEffects);d.addEventListener("mouseOver",function(f){e.trigger("mouseenter")});d.addEventListener("mouseOut",function(f){e.trigger("mouseleave")});d.addEventListener("mouseDown",function(f){e.trigger("mousedown");if(!a.isFunction(b.copy)){d.setText(b.copy)}else{d.setText(e.triggerHandler("zClip_copy"))}if(a.isFunction(b.beforeCopy)){e.trigger("zClip_beforeCopy")}});d.addEventListener("complete",function(f,g){if(a.isFunction(b.afterCopy)){e.trigger("zClip_afterCopy")}else{if(g.length>500){g=g.substr(0,500)+"...\n\n("+(g.length-500)+" characters not shown)"}e.removeClass("hover");alert("Copied text to clipboard:\n\n "+g)}if(b.clickAfter){e.trigger("click")}});d.glue(e[0],e.parent()[0]);a(window).bind("load resize",function(){d.reposition()})}})}else{if(typeof c=="string"){return this.each(function(){var f=a(this);c=c.toLowerCase();var e=f.data("zclipId");var d=a("#"+e+".zclip");if(c=="remove"){d.remove();f.removeClass("active hover")}else{if(c=="hide"){d.hide();f.removeClass("active hover")}else{if(c=="show"){d.show()}}}})}}}})(jQuery);var ZeroClipboard={version:"1.0.7",clients:{},moviePath:"ZeroClipboard.swf",nextId:1,$:function(a){if(typeof(a)=="string"){a=document.getElementById(a)}if(!a.addClass){a.hide=function(){this.style.display="none"};a.show=function(){this.style.display=""};a.addClass=function(b){this.removeClass(b);this.className+=" "+b};a.removeClass=function(d){var e=this.className.split(/\s+/);var b=-1;for(var c=0;c<e.length;c++){if(e[c]==d){b=c;c=e.length}}if(b>-1){e.splice(b,1);this.className=e.join(" ")}return this};a.hasClass=function(b){return !!this.className.match(new RegExp("\\s*"+b+"\\s*"))}}return a},setMoviePath:function(a){this.moviePath=a},dispatch:function(d,b,c){var a=this.clients[d];if(a){a.receiveEvent(b,c)}},register:function(b,a){this.clients[b]=a},getDOMObjectPosition:function(c,a){var b={left:0,top:0,width:c.width?c.width:c.offsetWidth,height:c.height?c.height:c.offsetHeight};if(c&&(c!=a)){b.left+=c.offsetLeft;b.top+=c.offsetTop}return b},Client:function(a){this.handlers={};this.id=ZeroClipboard.nextId++;this.movieId="ZeroClipboardMovie_"+this.id;ZeroClipboard.register(this.id,this);if(a){this.glue(a)}}};ZeroClipboard.Client.prototype={id:0,ready:false,movie:null,clipText:"",handCursorEnabled:true,cssEffects:true,handlers:null,glue:function(d,b,e){this.domElement=ZeroClipboard.$(d);var f=99;if(this.domElement.style.zIndex){f=parseInt(this.domElement.style.zIndex,10)+1}if(typeof(b)=="string"){b=ZeroClipboard.$(b)}else{if(typeof(b)=="undefined"){b=document.getElementsByTagName("body")[0]}}var c=ZeroClipboard.getDOMObjectPosition(this.domElement,b);this.div=document.createElement("div");this.div.className="zclip";this.div.id="zclip-"+this.movieId;$(this.domElement).data("zclipId","zclip-"+this.movieId);var a=this.div.style;a.position="absolute";a.left=""+c.left+"px";a.top=""+c.top+"px";a.width=""+c.width+"px";a.height=""+c.height+"px";a.zIndex=f;if(typeof(e)=="object"){for(addedStyle in e){a[addedStyle]=e[addedStyle]}}b.appendChild(this.div);this.div.innerHTML=this.getHTML(c.width,c.height)},getHTML:function(d,a){var c="";var b="id="+this.id+"&width="+d+"&height="+a;if(navigator.userAgent.match(/MSIE/)){var e=location.href.match(/^https/i)?"https://":"http://";c+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+e+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+d+'" height="'+a+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+b+'"/><param name="wmode" value="transparent"/></object>'}else{c+='<embed id="'+this.movieId+'" src="'+ZeroClipboard.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+d+'" height="'+a+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+b+'" wmode="transparent" />'}return c},hide:function(){if(this.div){this.div.style.left="-2000px"}},show:function(){this.reposition()},destroy:function(){if(this.domElement&&this.div){this.hide();this.div.innerHTML="";var a=document.getElementsByTagName("body")[0];try{a.removeChild(this.div)}catch(b){}this.domElement=null;this.div=null}},reposition:function(c){if(c){this.domElement=ZeroClipboard.$(c);if(!this.domElement){this.hide()}}if(this.domElement&&this.div){var b=ZeroClipboard.getDOMObjectPosition(this.domElement);var a=this.div.style;a.left=""+b.left+"px";a.top=""+b.top+"px"}},setText:function(a){this.clipText=a;if(this.ready){this.movie.setText(a)}},addEventListener:function(a,b){a=a.toString().toLowerCase().replace(/^on/,"");if(!this.handlers[a]){this.handlers[a]=[]}this.handlers[a].push(b)},setHandCursor:function(a){this.handCursorEnabled=a;if(this.ready){this.movie.setHandCursor(a)}},setCSSEffects:function(a){this.cssEffects=!!a},receiveEvent:function(d,f){d=d.toString().toLowerCase().replace(/^on/,"");switch(d){case"load":this.movie=document.getElementById(this.movieId);if(!this.movie){var c=this;setTimeout(function(){c.receiveEvent("load",null)},1);return}if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){var c=this;setTimeout(function(){c.receiveEvent("load",null)},100);this.ready=true;return}this.ready=true;try{this.movie.setText(this.clipText)}catch(h){}try{this.movie.setHandCursor(this.handCursorEnabled)}catch(h){}break;case"mouseover":if(this.domElement&&this.cssEffects){this.domElement.addClass("hover");if(this.recoverActive){this.domElement.addClass("active")}}break;case"mouseout":if(this.domElement&&this.cssEffects){this.recoverActive=false;if(this.domElement.hasClass("active")){this.domElement.removeClass("active");this.recoverActive=true}this.domElement.removeClass("hover")}break;case"mousedown":if(this.domElement&&this.cssEffects){this.domElement.addClass("active")}break;case"mouseup":if(this.domElement&&this.cssEffects){this.domElement.removeClass("active");this.recoverActive=false}break}if(this.handlers[d]){for(var b=0,a=this.handlers[d].length;b<a;b++){var g=this.handlers[d][b];if(typeof(g)=="function"){g(this,f)}else{if((typeof(g)=="object")&&(g.length==2)){g[0][g[1]](this,f)}else{if(typeof(g)=="string"){window[g](this,f)}}}}}}};

/* 
Icons by Mark James
http://www.famfamfam.com/lab/icons/silk/

Images converted to Base64 here;
http://webcodertools.com/imagetobase64converter
*/

// Main code, by me

// Ensure we can safely be reloaded multiple times
if(typeof OLK != 'undefined' && OLK && typeof window.olk != 'undefined' && window.olk){
    window.olk.shutdown();
    window.olk = null;
}

OLK = function(){
    
    this.currentLocation = null;
    this.encodedLocation = null;
    this.permalink = null;
    this.okToShorten = true;
};

OLK.imgs = {
    "link_icon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gcYBzcCuCujAgAAACZpVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVAgb24gYSBNYWOV5F9bAAABD0lEQVQ4y5XToUsDUBAG8Lv5Fwy0KFgNRrWZTDIwiRoMNptgkQWD1a6YVkQQTFaDwWayWfwDXDBpES3+DL7BY2xue+XeO+7u++67dxETHDTGDazvh/5OexKkQKJZkrfxjU+00KhBhhVo4A43lX+nFNwdh8WCCgZZLKyO7B9dXGEGm4VVB4/9OvVT79FfwwlecFmhz9bT6B9LZmZExGlEfEXEc0TMR8RtaaeTmd3M/BkqIs4KUgvv2MIijmstBn6SQk95n+MVbWz0Rjeq94ciVGAdc7jA21DhqiIrFXpWflgalleLOF0S9jOzV+g6Iu4j4ulf9BI8hWV8FNSDYpvlW0+0dXsl+WjQgo1coklW/BdOr1YtHsmskQAAAABJRU5ErkJggg==",
    "copy_icon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJRSURBVBgZBcExiJZlHADw3/O+732enKYdQVeklWBeoSBFtmgNNrRcQ9DSFBQZDU4OEYSNbQUtCg5FEAUpDdXSUliBQRBEBBXeVuFZnvKd1/e9z/P/9/uVzATnX37wEfwCAICbpy6s7wUAACjnXnrgUbyFtV3Ld3vhjbO2rv8Alu465sOzr9veugUf4dKpC+sXAWDApWdeObNv+Z57/fPV+zJTm22BzHTiyD5LR0/KzLXPzr/3LC4CwID7l1fus/n7FTHetv7JO2QiXc8fpbTx83eWV4/tBgCAAbLORR11+w+LVmWmj9tpLUMEcPO3LeX401599/O8MVv59c/1vx67fG5te4Boo6ijGGfa7D+kNoQ3n1u1MQ0FkWlsYeiP+ODK5sN96a8++doXBweIOhOtkqEUMum7zo3b6Y+N1HVprOHWdvXUQzsdP7TX0qRb+TbbTx1EnYs618a5qE3UBvrC4sCkLyZ9sTjpXNvcduhOXnxijzrmgQFinMlxLmuIsZGpLaZSWOjJJPticehc/TdN/555fP8OC0NngKhzUZsYm6hBpMhUFH3XASVFJDt6pSv6vpcYIMcm503UJmojgABFEfrCZOiUTBFFKUUmA9SxamMTrYmxkURLBUNHVzqR9IUuMGHnQGYaIOdVjE22JmvISNCiYgAAAJGVKAZc3p5OT+zatyprE7WRicGsTrEXAADM6lSJrgx4++svP92NowBw7fDzFroD9iyOMulKUQpQ0Hd3iKzzkpkAAODkme+/6btykG6F3KIgQVFKZJvuWVrY+T+vNUkTODP9hQAAAABJRU5ErkJggg==",
    "up_arrow": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAICAYAAAAm06XyAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90IHgIPJS3a0toAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAQElEQVQY043MsQ0AMAjEQJz9d3YqpBTkBeWjc1U+0/MkqMbACVC1C25xQ4BS+QVI8BkL6JEJjzAF2MBfgC2cAhesVFLs6B52dgAAAABJRU5ErkJggg==",
    "add_link":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHMSURBVDjL3VK9S0JxFBWChvoHinap4UG6RIsihYMfiTboUFGhPVIbxAJFG5TEKM1U1CWENjEUigiyHBRnicrCwaIlXPqggldRnd6VkNqMti4cfvede875Xd57AgCCv0DwjwIkEkmn2Wxe8Pl8t8lkEm63+8pqtQ7w6OL7GnE0Iw1pfwSIxeJ2lUq1Eg6HUa/XUavVUCgU4PF4LlwuV7FarT4TVyqVQBrSkqcZIBKJRux2+32lUrk1GAx7SqXyzWQyIRKJwOl0gnriaJZKpa5IS57vG6x4vV4uGo2yGo2mQyqVPubzeZTLZRSLRWQyGRBHM9KQljzNAIZhZlmWvYvH4/M6nW5fJpO9yuVyaLXaBqgnjmakIS15mgF9fKnV6vNgMHiXTqdvstksEokEbDYbHA5How9t+mCLjX3MrGlg8Mreh+eYcDNAKBS28Sv2KxSKS6PR+GSxWDgeL3q9foLH0OzixItnawq7pzEcXecQOjBDH2IwYOkOtPStx/3D3PbJOrbPIqAKHJoQOmQpgGspQOUSYe90A99r5zhGAa39bYPWHm41Nw1/brJh9u9P/m4DXrg0GuhFMGds3EwnPbf8Dr5Clnk80Npf5zLxn1E7ljyteCJyAAAAAElFTkSuQmCC",
    "pack_link":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAM9SURBVDjLdZPrS1NhHMcPREH/QC96nxURWS+iktC8bEt3skHoi95EbYk5KStqdtPGLKcuczSELnYhK0bzhpfK5nSZed1MPZtzzpq3pnN5tOY2p+fbsxMEUj3wgx9fvr8Pz+X7UACof9VwPb1juC6l2l6T/N5WJdr9P99fgqPxyCYyrLLXpczPMg/xrbcQzOukH0P6xJLBl/Gb/wsYaUpdT4Zlw/Vi55RVi5XgNLilCSy6qhGYrIO79Tw+P4/92v/soNz6JGbjGoCjKVXgaDhi/tpxA4Hvn4m0BHAswr4ejBiOImAvRsitx6JNB2fdSVge7e/su7+X5gFk+LGjgeZ8jkr4vQPwjbVgrIsYP6hhe3MOrreZ8Nvvwm/NQ9D5CMsTesx1q8C8kKBHt+dF5LLCXNCNkLcPvgEtvL0qTJnOwlmbhs57MVieswB+BzD7FtwXHcBcBiYrER5VoUu7K0yRy2JXg+PAjyEsT9ZgwXoL/v48UgpM1op5DTONgPsBOJsCfmMcZhoOYoG5i87SnSxlqznMri4RwM8RAmEArxEBRg1/VyZm6sUIj2iA0RKE2kWYa9wHj0kET3Mq2P4SfNLsYCnGIGRXeIAdWCTbne8kkHcIO7VYaEtDyCwCa4zB3EchZoxJmG6Ix3StEN+7C9FRtI2lyPv+BpAjgO1CYOoNmqu10JQUoqKiAkUFl2AlRxltFKJIdZHXim/no+aBAibV1gVq8FV8iAt/Iy/nwrK3BRW66ygrK4PH44HL5UJbWxvuqHOhU8vhGGZ4rb29nfcoTx9YoQYq45pHjZexNGVC67uXuHpFAcvgIArz5aBpMWQyGbRaLXJzc/meFouRf/4ED7l08VyYIsnaQJIlI+FwKi8cw60CFQ8IjldCJEyA0WiExWKB2WyGwWCAICEOLcot7ghAqVQG/kSZJGtTzvHopuwzUi4CuHnjApISEyEQCCCRSPiK9Anxh1bTjh1tjQAyMjLm13yM7WRJUsVjpRp16PWrp6iqqkJ5eTlycnKgUCj4PqLp9XqfRqOZp2navgYQFRW1LjY2Njo5OfmLTHoqkC3PXM2Wn+GuZQhK09PTE7KyshZJBaRS6c+IJ+L9BchY24ysm0a5AAAAAElFTkSuQmCC"
};

OLK.prototype.startup = function(){
    OLK.log("Starting up OSN LNK extension...");
    
    // We are dependent upon HAX, for toolbar and shortcut support
    this.install();
    
    // Create the link-copying dialog anyway!
    $('body').append(
        '<div id="OLKDLG" style="position:fixed;z-index:200;border:1px solid black;padding:10px;background-color:white;box-shadow: 2px 2px 10px 0 gray;top:0;left:0;margin-top:0;margin-left:0;display:block;" title="Copy something, or Backspace to close">'+
          '<div style="position:relative;top:-20px;height:0;overflow:visible;"><img src="' + OLK.imgs.up_arrow + '" style="vertical-align:text-top;" /></div>'+
          '<div>'+
            '<span>Permalink:</span>'+
            '<input type="text" style="margin-left:5px;padding-left:5px;height:16px;width:20em;border:1px solid lightGray;color:gray;margin-right:5px;" readonly="readonly" spellcheck="false" autocomplete="off" id="olk-clipboard" value="Your permalink URL is..."/>'+
            '<span style="padding-right:5px;" class="olk-button" title="Pack link into a shortened URL"><a id="olk-shorten" href="#"><img src="'+OLK.imgs.pack_link+'" style="width:16px;height:16px;vertical-align:text-bottom;"/></a></span>'+
            '<span class="olk-button" title="Copy to clipboard"><img id="olk-copy" src="'+OLK.imgs.copy_icon+'" style="width:16px;height:16px;vertical-align:text-bottom;"/></span>'+
          '</div>'+
          '<div id="olk-message"></div>' +
        '</div>' 
    );
    $("#OLKDLG").hide();
    
    $("#OLKDLG").bind('copy',function(){
        setTimeout(function(){window.olk.showDialog(false);},250); 
    });
    
    $(window).bind('hashchange',function(){
        window.olk.showDialog(false,true); 
        window.olk.highlightLinkedPost();
    });
    
    $("#osn-lnk-css").remove();
    var css = document.createElement('style');
    css.setAttribute('type','text/css');
    css.setAttribute('id','osn-lnk-css');
    css.innerHTML = 
        ".ui-effects-transfer {border: 2px dotted black;z-index:220;}" +
        "#olk-message { font-size:8pt;font-weight:bold;color:darkRed;margin-top:5px;text-align:center;}"
    ;
    document.head.appendChild(css);
    
    $("a#olk-shorten").click(function(evt){
        window.olk.shortenLink();
        evt.preventDefault();
    })
};
            
OLK.prototype.shortenLink = function(){

    if(this.okToShorten){
        var val = $('input#olk-clipboard').val();
        if(val.indexOf("https://stbeehive.oracle.com/teamcollab/wiki/osn-hax:bounce?to=") != -1){

            // Load the shortened URL as JSON
            $.ajax({ 
                type: 'GET', 
                url: 'https://v.gd/create.php', 
                dataType: "json",
                timeout: 10000,
                data: {
                    "format":"json",
                    "url": val                
                }, 
                success: function(rc){
                    
                    if(rc && rc.shorturl){
                        window.olk.setPermalinkValue(rc.shorturl);
                    }
                    else{
                        OLK.msg("Weird shortener return data: "+JSON.stringify(rc));
                    }
                    
                    window.olk.enableShortener();
                },
                error: function(jqXHR, textStatus, errorThrown) { 
                    OLK.msg("Shortener issue: "+ textStatus + ((errorThrown && errorThrown != textStatus) ? " [" + errorThrown + "]" : ""));
                    
                    window.olk.enableShortener();
                }
            });
        
            // Can't shorten again until the previous request finishes
            this.okToShorten = false;
            $("a#olk-shorten").css({"opacity":"0.25"});
        }
    }
};

// Wait a few seconds before you can shorten a URL again, to comply with API usage limits
OLK.msg = function(txt){
    
    if(txt){
        $("#olk-message").show().text(txt);
        OLK.log(txt);
    }
    else{
        $("#olk-message").hide();
    }
};

OLK.prototype.enableShortener = function(){

    setTimeout(function(){
        $("a#olk-shorten").css({"opacity":"1.0"});
        window.olk.okToShorten = true;
    },2000);    
};

OLK.prototype.highlightLinkedPost = function(){

    var locn = window.location.href;
    var param = (locn.indexOf("&sid=") != -1) ? "&sid=" : (locn.indexOf("&messageId=") != -1) ? "&messageId=" : null;
    
    if(param){
        var id = locn.substring(locn.indexOf(param)+param.length);
        if(id.indexOf("&") != -1){
            id = id.substring(0,id.indexOf("&"));
        }
        if($('div[data-chat-id="'+id+'"]').length){
            $('div[data-chat-id="'+id+'"]').css({"background-color":"khaki","background-image":"none"});
        }
        else{
            setTimeout(function(){window.olk.highlightLinkedPost();},1000);
        }
    }
};

OLK.prototype.showDialog = function(show,immediate){

    if(show){
        
        OLK.msg();
        $("#OLKDLG").show();
        
        /* Add buttons to create permalinks to posts */
        $('div.osn-chat-text').prevAll().find('div.gwt-HTML.GE0BIW3BB5.GE0BIW3BJ4,div.gwt-HTML.GE0BIW3BB5').prepend('<div class="olk-permalink" style="display:inline-block;padding-right:10px;vertical-align:top;height:0;overflow:visible;"><a style="position:relative;" title="Generate a permalink to this message" href="#"><img src="'+OLK.imgs.add_link+'"/></a></div>');
        $('div.olk-permalink > a').click(function(evt){
            window.olk.createMessagePermalink(evt);
            evt.preventDefault();
        });
        
        $("#OLKDLG").css({"margin-left":"0","margin-top":"0"});
        $("#OLKDLG").position({
            my:        "left top",
            at:        "left bottom",
            of:        $('td[data-accelerator="Ctrl+Alt+P"]'),
            collision: "fit"
        });
        $("#OLKDLG").css({"margin-left":"-3px","margin-top":"3px"});
    
        $('img#olk-copy').zclip({
            path:'https://stbeehive.oracle.com/content/dav/st/osn-hax/js/ZeroClipboard.swf',
            copy:function(){return $('input#olk-clipboard').val();},
            afterCopy:function(){
                window.olk.showDialog(false);
            }
        });
        
        $('input#olk-clipboard').focus().select();
    }
    else{
        $('a#olk-copy').zclip('remove');
        
        if(immediate){
            $("#OLKDLG").hide();
        }
        else{
            $("#OLKDLG").fadeOut();
        }
        
        /* Remove the permalink buttons */
        $('div.olk-permalink').remove();
    }
};

OLK.prototype.createMessagePermalink = function(evt){

    var el = $(evt.target).parents('div[data-chat-id]')[0];
    var id = $(el).attr('data-chat-id');
    var locn = window.location.href;
    var param = 'messageId';
    
    if(locn.indexOf("#conversation:") != -1){
        param = "sid";
    }
    
    // Remove existing param
    var start = locn.indexOf("&"+param+"=");
    if(start != -1){
        var end = locn.indexOf("&",start+1);
        locn = locn.substring(0,start) + ((end != -1)?locn.substring(end):"");
    }
    // Add the new param
    locn = locn + "&"+param+"="+id;
    
    // Transfer the new link to the clipboard dialog
    $(el).effect( "transfer", { to: $( "#OLKDLG" ) }, 1000,function(){
        window.olk.setPermalinkValue(locn);
    });
};

OLK.prototype.setPermalinkValue = function(val){
    
    if(val.indexOf("https://osn-fusioncrm.oracle.com/osn/web/") != -1){
        this.currentLocation = val.replace("https://osn-fusioncrm.oracle.com/osn/web/","");
        this.encodedLocation = LZString.compressToBase64(this.currentLocation);
        this.permalink = "https://stbeehive.oracle.com/teamcollab/wiki/osn-hax:bounce?to=" + this.encodedLocation;
    }
    else{
        this.currentLocation = val;
        this.encodedLocation = val;
        this.permalink = val;
    }
    OLK.log("Current location is; " + this.currentLocation); 
    OLK.log("Current location permalink is; " + this.permalink);
        
    $('input#olk-clipboard').val(this.permalink);
    $('input#olk-clipboard').focus().select();
};

OLK.prototype.install = function(){
    if(typeof OSNH != 'undefined' && OSNH){
        OSNH.addToolbarButton(function(){window.olk.permalinkGenerator();},"Permalink generator","Ctrl+Alt+P",OLK.imgs.link_icon);
        
        Mousetrap.bindGlobal('backspace', function() {
            if($("#OLKDLG:visible").length){
                window.olk.showDialog(false);
            }
        });
        
        this.highlightLinkedPost();
    }
    else{
        OLK.log("HAX not available, for toolbar and shortcuts, waiting...");
        setTimeout(function(){window.olk.install();},1000);
    }  
};

OLK.prototype.permalinkGenerator = function(){
    
    if($("#OLKDLG:visible").length){
        this.showDialog(false);
    }
    else{
        OLK.log("Starting permalink generator");
        $('input#olk-clipboard').val('Your permalink is...');
        
        this.showDialog(true);
        $('body').effect("transfer",{to:$("#OLKDLG")},1000,function(){
            window.olk.setPermalinkValue(window.location.href);
        });
    }
};

OLK.prototype.shutdown = function(){
    
    this.showDialog(false,true);
    
    $("#OLKDLG").remove();
    
    if(typeof HAX != 'undefined' && HAX){
        HAX.removeToolbarButton("Ctrl+Alt+P");
    }
    OLK.log("Shut down OSN LNK extension.");
};

OLK.log = function(obj){console.log(obj);};

window.olk = new OLK();
window.olk.startup();
