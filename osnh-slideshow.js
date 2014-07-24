/*
OSN HAX Slideshow
-----------------
Display a floating slideshow of all the pictures in a conversation.
Inspired by the Apple TV screen saver!
*/
var SLIDE = {
    
    imgs: [],
    tmr: null,
    
    getRandomInt: function(e,t){
        return Math.floor(Math.random()*(t-e+1))+e;
    },
    
    floatingImage: function(){
        
        this.url=SLIDE.imgs[SLIDE.getRandomInt(0,SLIDE.imgs.length-1)];
        
        var e=$("#osnb-slideshow").width();
        var t=$("#osnb-slideshow").height()+10;
        var n=Math.floor(e*Math.random());
        var r=document.createElement("img");
        
        r.setAttribute("data-top",t);
        r.setAttribute("data-left",n);
        r.setAttribute("data-margin","null");
        r.setAttribute("data-speed",Math.random());
        r.setAttribute("style","background:white;box-shadow:0 0 10px 1px black;min-width:200px;min-height:150px;max-width:640px;max-height:480px;position:fixed;top:"+t+"px;left:"+n+"px;");
        r.setAttribute("class","osnb-floating-image");
        r.setAttribute("src",this.url);
        $("#osnb-slideshow").append(r);
    },
    
    animateImages: function(e){
        
        $(".osnb-floating-image").each(function(t,n){
            if(n.complete){
                var r=$(n);var i=r.attr("data-margin");
                if(i=="null"){
                    i=Math.floor(-0.5*$(n).width())+"px";
                    r.css("margin-left",i);
                    r.attr("data-margin",i);
                    r.attr("data-height",r.height());
                }
                var s=parseFloat(r.attr("data-top"));
                s=s-e*0.05*(1+parseFloat(r.attr("data-speed"))*2);
                r.css("top",Math.floor(s)+"px");
                r.attr("data-top",s);
                if(s+10<parseFloat(r.attr("data-height"))*-1){
                    r.remove();
                }
            }
        });
        
        return $("#osnb-slideshow").length>0?true:false;
    },
        
    animLoop: function(e,t){
        
        function i(s){
            if(n!==false){
                requestAnimationFrame(i,t);
                n=e(s-r);
                r=s;
            }
        }
        
        var n,r=+(new Date());
        i(r);
    },
        
    hide:function(){
        if(SLIDE.tmr) clearInterval(SLIDE.tmr);
        SLIDE.imgs = [];
        $("#osnb-slideshow").remove();
    },
        
    show: function(){
            
        var e=document.createElement("div");
        e.setAttribute("id","osnb-slideshow");
        e.setAttribute("style","overflow:hidden;z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;background:black;");
        document.body.appendChild(e);
        $("#osnb-slideshow").click(SLIDE.hide);
        new SLIDE.floatingImage();
        SLIDE.tmr=setInterval(function(){
            if($(".osnb-floating-image").length<10){
                new SLIDE.floatingImage();
            }
        },1500);
        
        SLIDE.animLoop(SLIDE.animateImages,$("#osnb-slideshow")[0]);
    },
    
    getDocs: function(e){
        
        window.OSNH.ajax({
            method: 'GET',
            resource: e,
            callback:function(e){
                if(e&&e.documents){
                    for(var t=0;t<e.documents.length;t++){
                        var n=e.documents[t];
                        var r=n.name?n.name.match(/(^data_)|(.png$)|(.jpg$)|(.jpeg$)|(.gif$)/gi):null;
                        if(r&&r.length){
                            SLIDE.imgs.push(e.documents[t].downloadURL);
                        }
                    }
                }
                SLIDE.show();
            }
        });
    },
    
    start: function(){
            
        SLIDE.hide();
        
        SLIDE.convoId = window.location.hash;
        var st=SLIDE.convoId.indexOf("conversation:id=")+16;
        var en=SLIDE.convoId.indexOf("&",st);

        SLIDE.convoId=SLIDE.convoId.substring(st,en);
        
        window.OSNH.ajax({
            method:'GET',
            resource:'conversations/'+SLIDE.convoId,
            callback:function(e){
                SLIDE.getDocs(e.folderURL);
            }
        })
    }
};

// Insert item in More menu
// $('div.GE0BIW3BMS div.GE0BIW3BHS div.GE0BIW3BJS')
// and not .GE0BIW3BLS

window.OSNH.slide = SLIDE;
window.OSNH.slide.start();


