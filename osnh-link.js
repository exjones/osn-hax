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
    "link_icon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAKBmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgIHhtbG5zOnBsdXNfMV89Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgIHhtcFJpZ2h0czpNYXJrZWQ9IlRydWUiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMTEtMDEtMjVUMTM6NTU6MzUrMDE6MDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDE4RUI5NjY4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDE4RUI5NjY4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpEMThFQjk2NjgyMjhFMDExOTg5Q0MwQTFBRDAyQjVDMiI+CiAgIDx4bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1Ob25Db21tZXJjaWFsIGxpY2Vuc2U8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPGRjOmNyZWF0b3I+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpPkdlbnRsZWZhY2UgY3VzdG9tIHRvb2xiYXIgaWNvbnMgZGVzaWduPC9yZGY6bGk+CiAgICA8L3JkZjpTZXE+CiAgIDwvZGM6Y3JlYXRvcj4KICAgPGRjOmRlc2NyaXB0aW9uPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5XaXJlZnJhbWUgbW9ubyB0b29sYmFyIGljb25zPC9yZGY6bGk+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6ZGVzY3JpcHRpb24+CiAgIDxkYzpzdWJqZWN0PgogICAgPHJkZjpCYWc+CiAgICAgPHJkZjpsaT5jdXN0b20gaWNvbiBkZXNpZ248L3JkZjpsaT4KICAgICA8cmRmOmxpPnRvb2xiYXIgaWNvbnM8L3JkZjpsaT4KICAgICA8cmRmOmxpPmN1c3RvbSBpY29uczwvcmRmOmxpPgogICAgIDxyZGY6bGk+aW50ZXJmYWNlIGRlc2lnbjwvcmRmOmxpPgogICAgIDxyZGY6bGk+dWkgZGVzaWduPC9yZGY6bGk+CiAgICAgPHJkZjpsaT5ndWkgZGVzaWduPC9yZGY6bGk+CiAgICAgPHJkZjpsaT50YXNrYmFyIGljb25zPC9yZGY6bGk+CiAgICA8L3JkZjpCYWc+CiAgIDwvZGM6c3ViamVjdD4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1Ob25Db21tZXJjaWFsIGxpY2Vuc2U8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxJcHRjNHhtcENvcmU6Q3JlYXRvckNvbnRhY3RJbmZvCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSJodHRwOi8vd3d3LmdlbnRsZWZhY2UuY29tIi8+CiAgIDxwbHVzXzFfOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgcGx1c18xXzpJbWFnZUNyZWF0b3JOYW1lPSJnZW50bGVmYWNlLmNvbSIvPgogICAgPC9yZGY6U2VxPgogICA8L3BsdXNfMV86SW1hZ2VDcmVhdG9yPgogICA8cGx1c18xXzpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgcGx1c18xXzpDb3B5cmlnaHRPd25lck5hbWU9ImdlbnRsZWZhY2UuY29tIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwvcGx1c18xXzpDb3B5cmlnaHRPd25lcj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6RDE4RUI5NjY4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgICAgIHN0RXZ0OndoZW49IjIwMTEtMDEtMjVUMTM6NTU6MzUrMDE6MDAiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii9tZXRhZGF0YSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+D34V1gAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA8dEVYdEFMVFRhZwBUaGlzIGlzIHRoZSBpY29uIGZyb20gR2VudGxlZmFjZS5jb20gZnJlZSBpY29ucyBzZXQuINhr6MQAAABEdEVYdENvcHlyaWdodABDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVze92woAAAAEVpVFh0RGVzY3JpcHRpb24AAAAAAFRoaXMgaXMgdGhlIGljb24gZnJvbSBHZW50bGVmYWNlLmNvbSBmcmVlIGljb25zIHNldC4gvBH4GgAAAEhpVFh0Q29weXJpZ2h0AAAAAABDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVzWILLBQAAAWhJREFUeNqMU92NgkAQBuOzDyaSEF4wNqAVSAlXAlvB5So4LMEKoBO5DmjAyJsxhGAICQjq3jdm10yMqJN87O58M7PzsxjGB3K9XgNAMgTGp9J1XXg+n+UjSP/W+XQ6hYAktG0bAF/ARuuA/kzquvYASWiaxn/gNpobvKjbA2gVSDmuqmrOuLXijGFfgMvlQkukjjv6lGW5GI1GCbh7MJM7FUXhmabpqWMMuMC9WeCmUkqP6Vb3AHmehzDQtUYw/MOZd1pAZzBdNB6PxS1AlmWk9NUtPzA8PtxMzkttQ86TyUTcuMPhQKP4ZbfEcNjxm4GUl2ZZVqzJITqpnVe2bUf7/X5OqbKASzi74J7OfEDdVkhIAcMEQRfAlPRYfTWRpzLQ8wS+tdJxnASzp3cQKi7uC2CmaRogTV1GjP0aKc91X7CPXNcVvQHos91uQ9ZhLtFsNhOv/pfbUyYjpLli5Rzp/M6Z5F+AAQCu1iVOPeGk+AAAAABJRU5ErkJggg==",
    "copy_icon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94HGBAWGae4yvgAAAC3SURBVDjLzdMhbkJBFIXhD3ipaqG6SUUXg6gCA7tAEQwNQbEMBAmSIBo20A2Q+nqChbQeM1Xc96aA6TUzOWfmv/dkMrW74RY+cO+8NpiqqCKtrcB7Rwd1THKARuDtk95NkLcqQBF4y3TxCe0cIJpggFnaj6+JsMAnHgJvjVEOcMRjoK/QS/GGOUCk75LeR70KUKbPUcMzXqteoUz/ig78oPnHCcIOLxdEyI74vwDFrYDvkp/6W4cT7joWLxN1Xr4AAAAASUVORK5CYII=",
    "up_arrow": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAICAYAAAAm06XyAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90IHgIPJS3a0toAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAQElEQVQY043MsQ0AMAjEQJz9d3YqpBTkBeWjc1U+0/MkqMbACVC1C25xQ4BS+QVI8BkL6JEJjzAF2MBfgC2cAhesVFLs6B52dgAAAABJRU5ErkJggg==",
    "add_link":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94HGBAcFVThblkAAAE8SURBVDjLjdNBK2ZxFAbwn/eVL2E+gbJQyDAxX4AkFgqrd0qRQlGGUrIgelkRViyIBWuLqWmQmmk2InuULfkANufWf/G6r1u3+5zn+Z/n3nPuOTV10/994hrFjyTexTbUfiJ5Cd0VDOuxUM1gGT2Bt3CPYTSjF895Bq3oCzyH08C/sI8WjBdyDNpQxE/8RUOiHYRWzPuCGpyhgN/BdeMuzIqVmvg13gzX+IK1RH/FACYj3kwNyugPfIInrCf6NNoT7gTlzGAznGERL9hIkifRkZw5xlRWwgwGQ5jAFf4lyRN4jLsc+mUm1mI28CqO0Jg1COP4hgesVOp0IfsduA3uBt/RFPpQPFUzGEv4G3TGvBdxkWewEoe6cB6jO4+d4A/x58NhiW3cw0gFfR+lvGXJaivF4mTlvEVcqraq776VO5Tc+0NXAAAAAElFTkSuQmCC",
    "pack_link":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94HGBAaFpuymGUAAAD3SURBVDjLzdO9SkNBEAXgL95gqZb+IIiVhQ8hYhfUQlsVHyAE9CksrMROBJWUFiqkDGIdrG8piD/p1CewmYXLJblRbBw4zczZ3bNzZmrjh4/+EvUh+VlsYB3TeMcdbvFaJNZKClbj4ErFo/dxUbeoYBc7mPmB6rXAG67GIpmjh+wX6CFPF7Qj2cIR+qGujH7UW8Fvpy9k2A7kOMUztgLXgXnsY6nsQtGNZRzjC+dYxAHOMFFuSHLhpaJpc1X1+oh5GDUvij2oiuz/Kkhz0EBniPeG5DtoJMJDYAHNGO3JAQo+cYkTPA1aphRT2MReLFgXF7jBR5H4DRaSLp4RfpA2AAAAAElFTkSuQmCC"
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
    
    window.OSNH.registerHashChangeListener('OSNH_link',function(){
        window.olk.showDialog(false,true); 
        window.olk.highlightLinkedPost();
    });
    
    window.OSNH.injectCSS([ 
        ".ui-effects-transfer {border: 2px dotted black;z-index:220;}",
        "#olk-message { font-size:8pt;font-weight:bold;color:darkRed;margin-top:5px;text-align:center;}"
    ]);
    
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
