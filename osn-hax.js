if(typeof Mousetrap != "undefined" && Mousetrap) Mousetrap.reset();

/* mousetrap v1.3.2 craig.is/killing/mice */
(function(){function s(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)}function y(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return h[a.which]?h[a.which]:z[a.which]?z[a.which]:String.fromCharCode(a.which).toLowerCase()}function t(a,b){a=a||{};var c=!1,d;for(d in m)a[d]&&m[d]>b?c=!0:m[d]=0;c||(p=!1)}function A(a,b,c,d,g){var f,e,h=[],j=c.type;if(!l[a])return[];"keyup"==j&&u(a)&&(b=[a]);for(f=0;f<l[a].length;++f)if(e=
l[a][f],!(e.seq&&m[e.seq]!=e.level)&&j==e.action&&("keypress"==j&&!c.metaKey&&!c.ctrlKey||b.sort().join(",")===e.modifiers.sort().join(",")))d&&e.combo==g&&l[a].splice(f,1),h.push(e);return h}function v(a,b,c){if(!k.stopCallback(b,b.target||b.srcElement,c)&&!1===a(b,c))b.preventDefault&&b.preventDefault(),b.stopPropagation&&b.stopPropagation(),b.returnValue=!1,b.cancelBubble=!0}function w(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=y(a);if(b)if("keyup"==a.type&&x==b)x=!1;else{var c=[];
a.shiftKey&&c.push("shift");a.altKey&&c.push("alt");a.ctrlKey&&c.push("ctrl");a.metaKey&&c.push("meta");var c=A(b,c,a),d,g={},f=0,e=!1;for(d=0;d<c.length;++d)c[d].seq?(e=!0,f=Math.max(f,c[d].level),g[c[d].seq]=1,v(c[d].callback,a,c[d].combo)):!e&&!p&&v(c[d].callback,a,c[d].combo);a.type==p&&!u(b)&&t(g,f)}}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function B(a,b,c){if(!c){if(!q){q={};for(var d in h)95<d&&112>d||h.hasOwnProperty(d)&&(q[h[d]]=d)}c=q[a]?"keydown":"keypress"}"keypress"==
c&&b.length&&(c="keydown");return c}function C(a,b,c,d,g){r[a+":"+c]=b;a=a.replace(/\s+/g," ");var f=a.split(" "),e,h,j=[];if(1<f.length){var k=a,n=c;m[k]=0;n||(n=B(f[0],[]));a=function(){p=n;++m[k];clearTimeout(D);D=setTimeout(t,1E3)};c=function(a){v(b,a,k);"keyup"!==n&&(x=y(a));setTimeout(t,10)};for(d=0;d<f.length;++d)C(f[d],d<f.length-1?a:c,n,k,d)}else{h="+"===a?["+"]:a.split("+");for(f=0;f<h.length;++f)e=h[f],E[e]&&(e=E[e]),c&&("keypress"!=c&&F[e])&&(e=F[e],j.push("shift")),u(e)&&j.push(e);c=
B(e,j,c);l[e]||(l[e]=[]);A(e,j,{type:c},!d,a);l[e][d?"unshift":"push"]({callback:b,modifiers:j,action:c,seq:d,level:g,combo:a})}}for(var h={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},z={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},
F={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},E={option:"alt",command:"meta","return":"enter",escape:"esc"},q,l={},r={},m={},D,x=!1,p=!1,g=1;20>g;++g)h[111+g]="f"+g;for(g=0;9>=g;++g)h[g+96]=g;s(document,"keypress",w);s(document,"keydown",w);s(document,"keyup",w);var k={bind:function(a,b,c){a=a instanceof Array?a:[a];for(var d=0;d<a.length;++d)C(a[d],b,c);return this},unbind:function(a,b){return k.bind(a,
function(){},b)},trigger:function(a,b){if(r[a+":"+b])r[a+":"+b]({},a);return this},reset:function(){l={};r={};return this},stopCallback:function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.contentEditable&&"true"==b.contentEditable}};window.Mousetrap=k;"function"===typeof define&&define.amd&&define(k)})();

// Global bind Mousetrap extension
Mousetrap=function(a){var d={},e=a.stopCallback;a.stopCallback=function(b,c,a){return d[a]?!1:e(b,c,a)};a.bindGlobal=function(b,c,e){a.bind(b,c,e);if(b instanceof Array)for(c=0;c<b.length;c++)d[b[c]]=!0;else d[b]=!0};return a}(Mousetrap);

/* 
OSN user interface Javascript hacks 
Moved to Cloud9 for editing and GitHub for hosting
*/
if(typeof HAX != "undefined" && HAX) HAX.stop();
HAX = {
    imgs: {
        blue_dot: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARklEQVR42mNgGAVYAWvR+QS2onM7WIvOfYXQ5xNI0gzU+AOI/yPhH0QbArX5PzoGiRPpgnNfsRkAEqeXCygMA4pjYRSQDgCkIV6RL/9K3AAAAABJRU5ErkJggg==",
        unread_map: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAGCAYAAAAlvnXZAAAAV0lEQVQY031QWw4AMARzTr2jHYfb2IcsE8RHQzxaRSzmLOY45pAAJ2y1B2JRD/yBGiPXJpRIukomfTnaTCKpBZy/jMESmpCGneqZJyvLf6hegeUvkLl/AZMDJRdoZ8PRAAAAAElFTkSuQmCC",
        email_go: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKESURBVDjLpZO7axRhFMV/38zsy+xuEt2Q50bYgChGUBAVxUbRRlS0sxJsbP0HFAQJ1jYqtlqYTlARNZoiPlELCxVd0LgxwcnuxmT2MfPN97BIxAcIggcu91EcLudwhLWW/4HDf8I7feXZw/Sq3JZqEHc0QuUYCwaLNhZjLdpajFneV8oidBy3FquVd+Wy19PdWTx5eF0+iq1Ip9zf2MWfs1ju7Ui57UgPHDsfhY6/pEpSGXHt4RyVqqQZWaZrhkrdMPPNMLdo8ANLtWmJNczUJBduzrHQjJxcT3HEaUZapBIOg/157r70+daI6c0LEi4kXUHSEyQ96MoIakuS8amvdK3Os6YrBSCcVqgAKPVlGerNc+eFz0IQU8g6JD1IutCZFtQDyfiUT2FNntJgFrFintMM9bKaLpQGsvR0r+L6ZIV6IOlMC3JpQS2QnL99gHcLhygNZMl4v9jYbC9/IASoWJH2DMODXdx67jNTDZmphtx46hNbxVBhAxcnRkl6P5X1WpHGAlIqvtYDir05kskElx8c4c19jTQKqRUD3SNs6NtOEDY5e2MtV0+UwQq8VqSsNlb4tYBiT45MOgEWlJHs23gcbQ3aaAyW2cUKm4Z20ZBtDl4s0Ofcs16z/uVTJNXa9UMZkc04QjgaBwiVRFvDdO0DsVEoExPrmKUoYHNxN424xfOPu/FkY35676k73alcR4eXcoXnuTiuoL8YekorevPDKKPR1jC3+JnV2T5eVR7xrFyOE2/PPRF/C9PRSyUdSok0klBJRgobnR2l/bz4/JiJ93dfS8W22TEbiX9N4+g5Z37r8J7C5PuJl9Kwc3bMSoB/JiidEfPauIW20Ql/zKof9+9pyFaERzUY+QAAAABJRU5ErkJggg==",
        email_open: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKhSURBVDjLjZLNTxNBGIf37/Bf8CI3DxwQo8aPA3g1XDTxwAFIJMWIIiJCUCQaZT1ICQYCISWRbyMgHwUUpJXyIQVa+kFpoWVpu922u9vt7s+ZgRCJGJ3kyUxm5n3edyYvB4A7jZaR4IW2iTDaJyMwj4Zu/+3eqZsNlq1nlpkwfGEFoaiKoQUBzy2erv8S1HS6JocXIkjIBtQsoBEUzcDMzyiedLi8jR+3z5wqeDu4fY4fCqh2twSJBEsKEIpnGSmVyIhkM5QGPxxEXY+/8ITgVa//XvvELu63Lh9iXoKpZQnl7x0oe/cDxW9seNi2RNZ2lBI6rWFUdfp4JuAHA/rQwgF2SSYa/K9BJfR5I4sx1Hb7de61xelTMjrEVJZlpYNfO0nJVAY3B2R2VsLbIaU19M0GcLHC4uUqzStGgmyYWlaPBQcJFVFJZXM4JsO3J2HVG2NnhY+tKG5ewcaOiILGOYMr4x3kg3T02UVUmB3sEg2OEeJJIiKSvWga7mAChgEUNcyheSwOIalQAbi7TTYmWAnq6LeJaO53s+AYCRZTGQYVhoQ0ars20DoVxydnFgfSkeBW3TwTOPd0rIZ0fF4UUPnBieqO9RM8aHNi3iNj0pVlHAsKHs0ywXpYh8OvYuD7PpkVJvsdutc9G4F1U8FX75HgJRFcNllJp+lYDqgsO724tqv/IaDQCnpJghmXAiFBK5gHl1s6bqRIz445BKztqPAKBrz7BjwEF8FN2IqQdYRUSZ5p9ykYIK0e2JdQ8OKbweUUtXuikqLvCCkjntIgyhppZQ1JRQMVU9IEmZI5RBBl3bYRkfNNli3ubGHTRM6d3tj5stFMbsW4llc5peVXWbVL1VbtSs20drVuWrtGuF5/yI366czVp1+SeeU9fhr7C4feT2DQtSX8AAAAAElFTkSuQmCC",
        folder_page: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJCSURBVBgZBcFBi1VlGADg5/3Od+/cYWjUTYlRS43Zi1BGuGlVizZB0EJaFf2JNpHgPt1kBf2EXFlEZFFCUJsIsWmhI07iqOPM3HvPPed7e57ITAAAcO3mw1wOg2Fo4PbOo6NoGfuL4d7du4tv+r29yz9dfXsemQkAAK78cD8/vHDKw4Mm0DKtxqZ2fP3bE7/f2vn2wb2d9yoAAMA4psdH6c7DVEpaDc3+fPDG6XXnzxy3MS1vXf/u4LMCAACQ6IJZZdqFaRdm0+K/J3NnTnDx3DEb07WPCwAAAEQw6ahB7cKsFtt74eb20tN5mtSi3r5+9o/Z5tZWRAFASp8KoSsFiNRastaJErquk6iR5ZWXzn85iQgSkghu3NdACE0XTGsRmVoLESGTasiF1q8tH1wx9h1lU8Rzfrz1souvv6gWShQt6YLSMGW9kpmqVZRsvbGfypYOt3/29O8/XTrO7hcEEoEOHWZoH/xCC1XkrA1z+9t3rPZ2tNXCibPvq1sf2dzoZBZAyqQU/vn8nOVwIFqJalXU9eedvHAJjUypOXrwlf4ZKWQWhBTq5mtgWja1HPpqlZnjQr97DQloDudFP7BcsRpGi34wX/aOv/BYxbuf/Lp7bGOyXi1ltoFAJhptZXNtxXQpxwXtUBv35fDU7NSb/sWNy6+ehKrPDCOZ5Ej2si1pC5lzOR7J8UAO+3J8hgYAavatDkePtGFCFrKTOaGtybZBrmT2RE8ZjIsFAKi5WP61ffWd0xIBAAAASMT3tLwN8D9pITwp1Smo1gAAAABJRU5ErkJggg==",
        paste_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZPNS5RRFMZ/577v+L5jmlmNoBgE4iLIWkgxmTtx4R8QLXLRB1GYG4lAwlWkCH1sShcRuIgWYUQoBIUVgojLyowWLSRhSCNtchzn672nxYxT6hRBD/cuzuW5D+c5H6Kq/A9cgM6+0VtBTk4tJwM/kS7BspvDsAc7w4w8uXGyxwUIrHRev9AcqYlERMRFAS3+E1RBdSNWglyGs9eenwbyAsuJwIvsjUjX7QfU7duF51gC9cBUYYT8NYJjhM8fZ+nvuUg2EClaSKbBGJfGhv0cjLbiGAfVAMQFEYwIIgZjDCHHYO2WGmzY9DwfP1yRz/cv0KLJLQLZTIpsah1EULVYDbDWIICq4khALpNE1W7PQBW+xmN8W4qTtTmsBvxIL5IJ6pECp8ZbYX0tDmpKC3xZLCe0kPr1oBFUU0XyCmEWFnT7HNgC3zhlGMcr6TtITJBLvKK6+jtX7z/ElDV4cGJzBn9COv6MPZXTNDcfpX53I6/nnrL+ftKPdtfddAHUWgRYmp8rKRAKPabtSAeBCThc287Eh1GiTS3Mfxq75OZnLd+coYG+YvQ7rtzpJyQVdBw4B8DltnuMzw4DY74LsDNs4jaXqqotl3wLC4KFw+panLnYNG9jU/S2jzD44gx+vlYpF2CHZx6dH3h5LJnVJmtL7dJxf+bdtNdyqJXx2WHKxGXqzSTAkPzrOke76waBLqASWAWGZ+7Gen8CJf/dMYh8E3AAAAAASUVORK5CYII=",
        console_mode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGNSURBVDjLpVM9SwNBEJ297J1FQBtzjQj2dgppYiP4A1KZRoiFrYWt9rHyH6QUPBDTCimtLNSAnSB26YKg4EdMdsd5611cjwsIWRhmZ3f2zZuPVcxMsyx9fPF0NRfS2vM7lx2WtcQiJHvDRvZMluXMGNHstJH7+Wj09jHkOy1+tc3VxeC+P6TXT1sYZX2hT7cvS6lepv3zHUp2T8vXNw81dXT2yGwEGeERSbSVCC5qysYa+3vm9sJGmLFojceXJ9uklCqUIAic5G3IytahAAhqqVSiwWDwx6nogW9XKhWphaGAvC50Oh1qtVr/7oAdCwBQwjB00mg0qFqtUr1ed3YURZM7X7TWTqM2Gm3CASRJEur1etTtdp1DnrafFtJGMbVNGSBas9l0DrAzR6x8DdwASUB0RqNNGS2/gH7EInvCwMhkZTnlnX0GsP09tJER0BgMoAEAa1rETDIQvBkjBZeHMIjjuNB5Ggg0/oZWPGrHGwd7Fp9F2CAlgHKqf0aYXb6Y2mzE8d/IfrXVrN/5G81p6oa2mIEUAAAAAElFTkSuQmCC"
    },
    logging: true,
    log: function(){
        if(HAX.logging){
            if(typeof console != "undefined" && console && console.log){
                for(var a = 0;a < arguments.length;a++){
                    console.log(arguments[a]);
                }
            }
        }
    },
    toolbar: null,
    currentIdx: -1,
    mapAttempts: -1,
    lastImg: null,
    lastLocation: "",
    blueDotList: [],
    pasteCatcher: null
};
HAX.pasteImage = function(){

    if(HAX.pasteCatcher === null){
        HAX.pasteCatcher = document.createElement("div");  
        HAX.pasteCatcher.setAttribute("contenteditable", "true");
        HAX.pasteCatcher.setAttribute("style","display:none;position:fixed;top: 58px; left: 770px; z-index:100;background:lightGray;padding:5px;border:1px solid black;color:black;");
        HAX.pasteCatcher.addEventListener("paste", HAX.pasteHandler);
        HAX.pasteCatcher.addEventListener("keyup", function(evt){
            if(evt.keyCode==27){
                 HAX.pasteCatcher.style.display = "none";
            }
        });
        document.body.appendChild(HAX.pasteCatcher);
    } 
    
    HAX.pasteCatcher.innerHTML = "Hit Ctrl+V to paste your content...";
    HAX.pasteCatcher.style.display = "block";
    HAX.pasteCatcher.focus();
};
HAX.pasteHandler = function(evt){  
    
    if (evt.clipboardData) {
      // Get the items from the clipboard
      var items = evt.clipboardData.items;
      if (items) {
         // Loop through all items, looking for any kind of image
         for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
               // We need to represent the image as a file,
               var blob = items[i].getAsFile();
               // and use a URL or webkitURL (whichever is available to the browser)
               // to create a temporary URL to the object
               var URLObj = window.URL || window.webkitURL;
               var source = URLObj.createObjectURL(blob);
                
               // The URL can then be used as the source of an image
               HAX.createImage(source);
            }
         }
      }
   // If we can't handle clipboard data directly (Firefox), 
   // we need to read what was pasted from the contenteditable element
   } else {
      // This is a cheap trick to make sure we read the data
      // AFTER it has been inserted.
      setTimeout(HAX.checkInput, 250);
   }
};
HAX.checkInput = function() {
   // Store the pasted content in a variable
   var child = HAX.pasteCatcher.childNodes[0];
    
   if (child) {
      // If the user pastes an image, the src attribute
      // will represent the image as a base64 encoded string.
      if (child.tagName === "IMG") {
         child.setAttribute('crossOrigin','anonymous');
         HAX.createImage(child.src);
      }
   }
};
HAX.getInnerDoc = function(x){
    return x.document ||
           x.contentDocument ||
           x.contentWindow.document;
};
/* Creates a new image from a given source */
HAX.createImage = function (source) {
   var pastedImage = new Image();
   pastedImage.onload = function() {
      // You now have the image!
      var data = HAX.createDataUrl(pastedImage);
      if(data){
          var ed = document.getElementsByClassName("gwt-RichTextArea");
          if(ed.length){
              var doc = HAX.getInnerDoc(ed[0]);
              var img = doc.createElement("img");
              img.src = data;
              
              doc.body.focus();
              doc.body.appendChild(img);
          }
      }
      HAX.pasteCatcher.style.display = "none";
   }
   pastedImage.src = source;
};
HAX.createDataUrl = function(img){

    try {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");
    
        return dataURL;//.replace(/^data:image\/(png|jpg);base64,/, ""); 
    }
    catch(ex){
        HAX.log("Error creating data URL: " + ex);
    }
    return null;
};
HAX.gotoUnread = function(){
    HAX.log("HAX.gotoUnread();");
    window.location.hash='home:m=ALL_UNREAD';
};
HAX.markAndNext = function(){
    if(HAX.lastImg){
        HAX.log("HAX.markAndNext();");
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click",true,true,window,1,1,1,1,1,false,false,false,false,0,HAX.lastImg);
        HAX.lastImg.dispatchEvent(evt);
        
	if(HAX.blueDotList.length == 1){
            HAX.currentIdx = -1;
            HAX.mapAttempts = -1;
            HAX.lastImg = null;
            setTimeout(function(){
                if(confirm('No more unread messages. Go back to list of unread messages?')){
                    HAX.gotoUnread();
                }
            },1000);
	}
	else{
           HAX.currentIdx--;
           HAX.nextUnread();
        }
    }
    else HAX.nextUnread();
};
HAX.refreshBlueDotList = function(){ 

    if(HAX.lastLocation != window.location.hash){
        HAX.currentIdx = -1;
        HAX.mapAttempts = -1;
        HAX.lastImg = null;
        HAX.lastLocation = window.location.hash;
    }
    
    HAX.blueDotList = [];

    for(var i = 0;i<document.images.length;i++){
        var img = document.images[i];
        var bg = img.style.background;
        if(bg && bg.indexOf(HAX.imgs.blue_dot) != -1 && img.style.display == 'block'){
            HAX.blueDotList.push(img);
        }
    }

    // If we have a conversation map, make sure the unread messages count in there matches the number of blue dots we found
    var mapMatches = true;
    var mapArr = document.getElementsByClassName("MAP_REGION");
    var mapDiv = (mapArr && mapArr.length) ? mapArr[0] : null;
    if(mapDiv){
        var unreadBars = [];
	for(var k = 0;k < mapDiv.childNodes.length;k++){
            if(mapDiv.childNodes[k].firstChild.src == HAX.imgs.unread_map){
                unreadBars.push(mapDiv.childNodes[k]);
            }
        }
        HAX.log("Unread messages in map = " + unreadBars.length,"Unread dots found = " + HAX.blueDotList.length);
        if(unreadBars.length != HAX.blueDotList.length){
	    mapMatches = false;
        
            HAX.mapAttempts = 0;// ++; 
            if(HAX.mapAttempts < unreadBars.length){
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click",true,true,window,1,1,1,1,1,false,false,false,false,0,unreadBars[HAX.mapAttempts]);
                unreadBars[HAX.mapAttempts].dispatchEvent(evt);
            }

            window.setTimeout(HAX.refreshBlueDotList,1000);
        }
    }
    
    if(mapMatches){
        HAX.mapAttempts = -1;
        if(HAX.blueDotList.length > 0){
	    HAX.nextUnreadByImg();
        }	
    }
};
HAX.nextUnread = function(){
    HAX.refreshBlueDotList();
};
HAX.nextUnreadByImg = function(){
    HAX.log("HAX.nextUnread("+HAX.currentIdx+");");

    if(HAX.lastImg){
        HAX.lastImg.style.backgroundColor='transparent';
    }

    HAX.currentIdx++;
    if(HAX.currentIdx >= HAX.blueDotList.length){
        HAX.currentIdx = -1;
        HAX.mapAttempts = -1;
        HAX.lastImg = null;
        if(confirm('No more unread messages. Start again from the top?')){
            HAX.currentIdx = 0;
        }
    }

    if(HAX.currentIdx >= 0 && HAX.currentIdx < HAX.blueDotList.length){
        HAX.lastImg = HAX.blueDotList[HAX.currentIdx];
        HAX.lastImg.style.backgroundColor = 'lightGreen';
        HAX.lastImg.parentNode.scrollIntoView(false);        
    }
};
HAX.addToolbarButton = function(func,hint,accel,icon){
    
    var td = document.createElement("td");
    td.setAttribute("class","hax-toolbar-button");
    
    var a = document.createElement("a");
    a.onclick = function(){func();return false;};
    a.href="#";
    a.title = hint;
    
    td.appendChild(a);
    
    var img = document.createElement("img");
    img.src = icon;
    
    a.appendChild(img);
    
    HAX.toolbar.getElementsByTagName("tr")[0].appendChild(td);
    
    if(accel != null){
        td.setAttribute("data-accelerator",accel);
        a.title = hint + " ("+accel+")";
        Mousetrap.bind(accel.toLowerCase(),function(){HAX.log("Keyboard shortcut: " + accel);func();});
    }
};
HAX.removeToolbarButton = function(accel){
    Mousetrap.unbind(accel.toLowerCase());
    $('td[data-accelerator="'+accel+'"]').remove();
};
HAX.createToolbar = function(){
    HAX.destroyToolbar();
    HAX.toolbar = document.createElement("table");
    HAX.toolbar.setAttribute("id","HAX.toolbar");
    
    var head = document.getElementById("osn-header");
    if(head === null){
        HAX.toolbar.setAttribute("style","position:fixed;z-index:100;top:42px;left:10px;");
        document.body.appendChild(HAX.toolbar);
    }
    else{
        var tab = head.firstChild.getElementsByTagName("table");
        if(tab != null && tab.length > 0){
            
            //tab[0].setAttribute("style","display:inline-block;")
            HAX.toolbar.setAttribute("style","margin-left:15px;margin-top:1px;");//vertical-align:top;");//padding-top:4px;");
            var tr = tab[0].getElementsByTagName("tr")[0];
            var td = document.createElement("td");
            tr.appendChild(td);
            td.appendChild(HAX.toolbar);
            //tab[0].parentNode.appendChild(HAX.toolbar);
        }
        else {
            HAX.toolbar.setAttribute("style","position:fixed;z-index:100;top:42px;left:10px;");
            document.body.appendChild(HAX.toolbar);
        }
    }

    $(HAX.toolbar).append("<tbody><tr></tr></tbody>");

    HAX.addToolbarButton(HAX.gotoUnread,"Unread message list","Ctrl+Alt+U",HAX.imgs.folder_page);
    HAX.addToolbarButton(HAX.nextUnread,"Next unread message","Ctrl+Alt+N",HAX.imgs.email_go);
    HAX.addToolbarButton(HAX.markAndNext,"Mark read and next","Ctrl+Alt+M",HAX.imgs.email_open);
    // HAX.addToolbarButton(HAX.pasteImage,"Paste image from clipboard","Ctrl+Alt+P",HAX.imgs.paste_image);
    // HAX.addToolbarButton(HAX.initRetroMode,"Retro mode","Ctrl+Alt+R",HAX.imgs.console_mode);
};
HAX.retro_mode_styles = 
    "body {background-color:black;color:lime;font-family:Courier New;}" +
    ".editableField {border: 1px darkGreen solid;font-weight:bold;border-radius:0;}" +
    "#osn-banner div.osn-bottom-banner {background: cyan;z-index:900 !important}"+
    "a.gwt-Anchor.GE0BIW3BEN {color:black;font-weight:bold;}" +
    "a.gwt-Anchor.GE0BIW3BEN:hover {color:yellow;background-color:black;font-weight:bold;}" +
    "div#userName > a.GE0BIW3BDN > div.gwt-HTML {background-color:transparent;color:black;font-weight:bold;}"+
    "input.gwt-TextBox.GE0BIW3BAN {border:1px solid cyan;background-color:black;color:white !important;font-family:Courier New;}" +
    ".osn-chat-text,div.gwt-HTML.GE0BIW3BFCB {color:yellow !important;}"+
    ".GE0BIW3BH4 {background:none;border-bottom:2px solid darkGreen;background-color:green;}"+
    "div.GE0BIW3BJNC.osn-chat{background-color:darkGreen;}"+
    "div.GE0BIW3BO4 > img {display:none;}" +
    "div.GE0BIW3BO4 {background-color:green;width:10px;margin-left:20px;height:10px;}" +
    "div.GE0BIW3BA5 {border-bottom:2px solid darkGreen !important;}" +
    ".rte-sizer {border:0 !important;border-radius:0 !important;color: black !important;background-color:magenta !important;}"+
    "div.GE0BIW3BBQ.GE0BIW3BLEC {border:0;border-radius:0;background-color:blue;}"+
    ".gwt-Anchor.GE0BIW3BJQ.GE0BIW3BLQ.GE0BIW3BHQ.GE0BIW3BCR,.gwt-Anchor.osn_button_secondary.osn_button_imageOnly,.gwt-Anchor.osn_button_primary.osn_button_textOnly,button.gwt-Button.GE0BIW3BJQ "+
    "{border:black 1px solid !important;border-radius:0 !important;background-color:cyan !important;}"+
    ".GE0BIW3BB1C {border-radius:0;border:1px solid black;background-color:black;}"+
    "div.GE0BIW3BEMC.GE0BIW3BGMC {background-color: lime;border-bottom:4px solid black;}"+
    "div.GE0BIW3BBCC,div.GE0BIW3BHCC,div.GE0BIW3BCCC{display:none;}"+
    "div.GE0BIW3BKAC{border-bottom:4px solid black;}"+
    "div.GE0BIW3BEMC.GE0BIW3BGMC{height:1.5em;overflow:hidden;}"
;
HAX.retro_mode_inner_styles =
    "body {background-color:black;color:cyan;font-family:Courier New !important;}"
;
HAX.initRetroMode = function(){

    var css = document.getElementById('retro_mode_styles');
    if(css === undefined || css === null){
        css = document.createElement('style');
        css.setAttribute('type','text/css');
        css.setAttribute('id','retro_mode_styles');
        css.innerHTML = HAX.retro_mode_styles;
        document.head.appendChild(css);
        
        var ed = document.getElementsByClassName("gwt-RichTextArea");
          if(ed.length){
            var doc = HAX.getInnerDoc(ed[0]);
            var innerCss = doc.createElement("style");
            innerCss.setAttribute('type','text/css');
            innerCss.innerHTML = HAX.retro_mode_inner_styles;
            doc.head.appendChild(innerCss);
        }
        
        var scan = document.createElement('div');
        scan.setAttribute('style','opacity:0.1;z-index:100;position:fixed;pointer-events:none;top:0;left:0;width:100%;height:100%;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90HCgcRA3B2/QoAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAGUlEQVQI12NgIBUw/v//H6sEEwPVAOl2AABMjgYB6Tdh0wAAAABJRU5ErkJggg==);');
        document.body.appendChild(scan);
    }
};
HAX.destroyToolbar = function(){
    if(typeof HAX.toolbar != "undefined" && HAX.toolbar){
        Mousetrap.reset();
        HAX.toolbar.parentNode.removeChild(HAX.toolbar);
        HAX.toolbar = null;
    }
};
HAX.styling_hacks = 
    "div.GE0BIW3BBVC.GE0BIW3BGO > div.gwt-HTML {max-height:100px;overflow:auto;}" +
    "div.GE0BIW3BFYC.GE0BIW3BIIC > div:first-child {height:auto !important;}" +
    "div.GE0BIW3BFYC.GE0BIW3BBEC > div:first-child {height:auto !important;}" +
    "div.GE0BIW3BEBC.GE0BIW3BC2B {position: fixed;top: 65px;right: 253px;background-color: white;overflow:auto;height:auto;bottom:10px;z-index:0;border-left:none !important;} " +
    "@media (max-width:1245px) {div.GE0BIW3BEBC.GE0BIW3BC2B {right:5px;}}" +
    "div.GE0BIW3BP1B {background-color:white;z-index:1;border-right:1px solid #C5DBE7;}"+
    "td.hax-toolbar-button{padding:5px;padding-bottom:0;vertical-align:top;}"+
    "td.hax-toolbar-button:hover{background-color:#015aa5;}"+
    "div#osnbMask{z-index:2;}"

HAX.start = function(){
    var head = document.getElementById("osn-header");
    if(head === null){
        HAX.log("Waiting for OSN interface to initialise...");
        setTimeout(HAX.start,1000);
    }
    else{
        HAX.log("Starting OSN hacks...");
        HAX.createToolbar();
        
        // Styling hacks
        $("#styling_hacks").remove();
        
        var css = document.createElement('style');
        css.setAttribute('type','text/css');
        css.setAttribute('id','styling_hacks');
        css.innerHTML = HAX.styling_hacks;
        document.head.appendChild(css);
    }
};
HAX.stop = function(){
    HAX.destroyToolbar();
    HAX.log("Stopped OSN hacks...");
};
if(typeof HAX != "undefined" && HAX) HAX.start();

