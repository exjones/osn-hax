/*
OSN HAX Members
---------------
Shows a list of all the people in a conversation, 
regardless of which group membership brought them in.
*/
var MEMB = {

    convoId: null,
    offset:0,
    group:null,

    getGroupMembers:function(){
        if(MEMB.group===null){
            var e=$(".member-list-group-todo");
            if(e.length){
                MEMB.group=$(e[0]).attr("id").replace(/\-group/,"");
            }
            MEMB.offset=0;
        }
        if(MEMB.group!==null){
            window.OSNH.ajax({
                method:"GET",
                resource:"groups/"+MEMB.group+"/members?offset="+MEMB.offset+"&count=1000",
                callback:function(e){
                    var t=0;
                    for(var n=0;n<e.items.length;n++){
                        if(e.items[n].objectType=="waggle/user"){
                            if($("#"+e.items[n].id+"-user").length===0){
                                $("#"+MEMB.group+"-group").append('<div id="'+e.items[n].id+'-user">'+e.items[n].name+"</div>");
                                t++;
                            }
                        }
                        else{
                            if($("#"+e.items[n].id+"-group").length===0){
                                $("#"+MEMB.group+"-group").append('<div class="member-list-group-todo" id="'+e.items[n].id+'-group" style="padding-left:20px;"><h4>'+e.items[n].name+' (<span id="'+e.items[n].id+'-count">0</span>)</h4></div>');
                            }
                        }
                    }
                    var r=t+parseInt($("#member-list-count").html(),10);
                    $("#member-list-count").html(r);
                    MEMB.offset+=e.items.length;
                    $("#"+MEMB.group+"-count").html(""+MEMB.offset);
                    if(e.hasMore===false){
                        $("#"+MEMB.group+"-group").removeClass("member-list-group-todo");
                        MEMB.group=null;
                    }
                    if($(".member-list-group-todo").length){
                        MEMB.getGroupMembers();  
                    } 
                    else{
                        $("#loading-indicator").remove();
                    }
                }
            });
        }
        else{
            $("#loading-indicator").remove();
        }
    },
    
    getConvoMembers: function(){
        
        window.OSNH.ajax({
            method:"GET",
            resource:"conversations/"+MEMB.convoId+"/members?offset="+MEMB.offset+"&count=1000",
            callback: function(e){

                var t=0;
                for(var n=0;n<e.items.length;n++){
                    if(e.items[n].objectType=="waggle/user"){
                        if($("#"+e.items[n].id+"-user").length===0){
                            $("#member-list-items").append('<div id="'+e.items[n].id+'-user">'+e.items[n].name+"</div>");
                            t++;
                        }
                    }
                    else{
                        if($("#"+e.items[n].id+"-group").length===0){
                            $("#member-list-items").append('<div class="member-list-group-todo" id="'+e.items[n].id+'-group" style="padding-left:20px;"><h4>'+e.items[n].name+' (<span id="'+e.items[n].id+'-count">0</span>)</h4></div>');
                        }
                    }
                }
                var r=t+parseInt($("#member-list-count").html(),10);
                $("#member-list-count").html(r);
                MEMB.offset+=e.items.length;
                if(e.hasMore) {
                    MEMB.getConvoMembers();
                }
                else{
                    MEMB.getGroupMembers();
                }
            }
        });
    },
    
    start:function(evt){
    
        evt.preventDefault();
        
        MEMB.convoId = window.OSNH.getConversationId();
        if(MEMB.convoId === null) return;
        
        MEMB.offset = 0;
        MEMB.group = null;
    
        $("#member-list").remove();
        
        $("body").append('<div id="member-list"></div>');
        $("#member-list").css({"z-index":"1000",position:"fixed",top:"10%",left:"30%",width:"40%",height:"80%",background:"white",border:"1px solid black",padding:"10px",overflow:"auto"});
        $("#member-list").append('<div style="text-align:right;padding-right:20px;"><a id="member-list-close" href="#">x</a></div>');
        $("#member-list").append('<h3>Member List (<span id="member-list-count">0</span>)</h3>');
        $("#member-list").append('<div id="loading-indicator" style="color:darkRed;font-weight:bold;"><blink>Loading...</blink></div>');
        $("#member-list").append('<div id="member-list-items"></div>');
        $("#member-list-close").click(function(evt){
            $("#member-list").remove();
            evt.preventDefault();
        });

        MEMB.getConvoMembers();
    },
    
    register:function(){
        window.OSNH.addConversationMenuItem('OSNH_members','List Members',window.OSNH.members.start);
        window.OSNH.registerHashChangeListener('OSNH_members',function(){$("#member-list").remove();});
        
        window.OSNH.injectCSS([
            'blink {-webkit-animation: blink 1s step-end infinite;animation: blink 1s step-end infinite}',
            '@-webkit-keyframes blink {0% { opacity: 1.0 } 25% { opacity: 0.5 } 50% { opacity: 0.25 } 75% {opacity:0.5} 100% {opacity:1.0}}',
            '@keyframes blink {0% { opacity: 1.0 } 25% { opacity: 0.5 } 50% { opacity: 0 } 75% {opacity:0.5} 100% {opacity:1.0}}'
        ]);
    }
};

window.OSNH.members = MEMB;
window.OSNH.members.register();
