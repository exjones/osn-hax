window.apiBase=window.location.pathname.substring(0,window.location.pathname.indexOf("/",1))+"/social/api/v1/";
window.convoId=window.location.hash;
var st=convoId.indexOf("conversation:id=")+16;
var en=convoId.indexOf("&",st);
window.offset=0;
window.group=null;
convoId=convoId.substring(st,en);
window.getGroupMembers=function(){
    if(window.group===null){
        var e=$(".member-list-group-todo");
        if(e.length){
            group=$(e[0]).attr("id").replace(/\-group/,"");
        }
        window.offset=0;
    }
    if(group!==null){
        $.ajax({
            type:"GET",
            url:apiBase+"groups/"+group+"/members?offset="+offset+"&count=1000",
            contentType:"application/json; charset=utf-8",
            success:function(e){
                var t=0;
                for(var n=0;n<e.items.length;n++){
                    if(e.items[n].objectType=="waggle/user"){
                        if($("#"+e.items[n].id+"-user").length==0){
                            $("#"+group+"-group").append('<div%20id="'+e.items[n].id+'-user">'+e.items[n].name+"</div>");
                            t++;
                        }
                    }
                    else{
                        if($("#"+e.items[n].id+"-group").length==0){
                            $("#"+group+"-group").append('<div%20class="member-list-group-todo"%20id="'+e.items[n].id+'-group"%20style="padding-left:20px;"><h4>'+e.items[n].name+'%20(<span%20id="'+e.items[n].id+'-count">0</span>)</h4></div>');
                        }
                    }
                }
                var r=t+parseInt($("#member-list-count").html());
                $("#member-list-count").html(r);
                offset+=e.items.length;
                $("#"+group+"-count").html(""+offset);
                if(e.hasMore==false){
                    $("#"+group+"-group").removeClass("member-list-group-todo");
                    group=null
                }
                if($(".member-list-group-todo").length) getGroupMembers();
            }
        });
    }
};
window.getConvoMembers=function(){
    $.ajax({
        type:"GET",
        url:apiBase+"conversations/"+convoId+"/members?offset="+offset+"&count=1000",
        contentType:"application/json;%20charset=utf-8",
        success:
        function(e){
            if(offset==0){
                $("#member-list").remove();
                $("body").append('<div%20id="member-list"></div>');
                $("#member-list").css({"z-index":"1000",position:"fixed",top:"10%",left:"30%",width:"40%",height:"80%",background:"white",border:"1px%20solid%20black",padding:"10px",overflow:"auto"});
                $("#member-list").append('<div%20style="text-align:right;padding-right:20px;"><a%20id="member-list-close"%20href="#">x</a></div><h3>Member%20List%20(<span%20id="member-list-count">0</span>)</h3><div%20id="member-list-items"></div>');
                $("#member-list-close").click(function(e){
                    $("#member-list").remove();
                    e.preventDefault();
                });
            }
            var t=0;
            for(var n=0;n<e.items.length;n++){
                if(e.items[n].objectType=="waggle/user"){
                    if($("#"+e.items[n].id+"-user").length==0){
                        $("#member-list-items").append('<div%20id="'+e.items[n].id+'-user">'+e.items[n].name+"</div>");
                        t++;
                    }
                }
                else{
                    if($("#"+e.items[n].id+"-group").length==0){
                        $("#member-list-items").append('<div%20class="member-list-group-todo"%20id="'+e.items[n].id+'-group"%20style="padding-left:20px;"><h4>'+e.items[n].name+'%20(<span%20id="'+e.items[n].id+'-count">0</span>)</h4></div>');
                    }
                }
            }
            var r=t+parseInt($("#member-list-count").html());
            $("#member-list-count").html(r);
            offset+=e.items.length;
            if(e.hasMore) getConvoMembers();
            else{
                getGroupMembers();
            }
        }
    });
};
getConvoMembers();
    