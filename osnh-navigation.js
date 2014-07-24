/*
OSN HAX Navigation
------------------
Add toolbar buttons and shortcut keys to navigate unread messages in OSN
*/
var NAV = {
    
    imgs: {
        blue_dot: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARklEQVR42mNgGAVYAWvR+QS2onM7WIvOfYXQ5xNI0gzU+AOI/yPhH0QbArX5PzoGiRPpgnNfsRkAEqeXCygMA4pjYRSQDgCkIV6RL/9K3AAAAABJRU5ErkJggg==",
        unread_map: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAGCAYAAAAlvnXZAAAAV0lEQVQY031QWw4AMARzTr2jHYfb2IcsE8RHQzxaRSzmLOY45pAAJ2y1B2JRD/yBGiPXJpRIukomfTnaTCKpBZy/jMESmpCGneqZJyvLf6hegeUvkLl/AZMDJRdoZ8PRAAAAAElFTkSuQmCC",
        folder_page: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gcYBzYbxVs6gwAAACZpVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVAgb24gYSBNYWOV5F9bAAABEUlEQVQ4y52TTUrEUBCEv0oCg+MoCu48hzfwMq7ceB4v4Ancigt3MiAyrnQYdKGgoKKOJCkX9oMsJnliwaOTfp3q6p/INn2QhG0k9ccwANsF0JfBkpDtEXAELIECaCLgVNJVJgGyvQ08r7ifA4fAOtB2/BVwB1wCXxVQA6/AJBScAG/xvL+CeBT9OU8yxran/sWx7Vvn0YQ9KELBPNhLYCN8zcBZRvx7FY5E0HaIhiZUhp2mri/CMUk1ZlCEXRSxJPfAC7ADjDPZHZN4AL4T02M4NjvsOVwDdQr+iF1Y+8OHSd0MqKt4eQLOgD1gK6bQhzZKvZDUKHahjM7uRhltRkUJ3Ej6ZOhvzME2ScG/CCTxA42rk6jAWWW/AAAAAElFTkSuQmCC",
        email_open: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gcYBzE5X3rtoAAAACZpVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVAgb24gYSBNYWOV5F9bAAABGElEQVQ4y42SsS4FURCGv+GuxmtQqLWqS0Ki9SQkCg+g8gIegZLiKhRCI9F4BVqFkCy7d+/1K8zIcZxN9k9OZuecf/7Z888xeiBpCRh5OjOzaYm3kBUhKdJtoPa1Uzgvdq08Xug/JinnT1ePJmlV0kxSWxCIvbWk5qfQk2MnzNWPL48n0TSUbiR9aDhqSQ+piS/ANcNxBzynPkjSraT9Ad2P/I+VCzSSXiVteP7pxrV+Jklj5zQhEAaGWgdUwCawAsx9fxF4Aq4SDmZmo+xuMeNl4DQ7G2cc8isEdrORpd9bKbEkcOj36wrmde7LQZ/AmaTHxLASGuech0C8g3fgzY0zYNqzzDm183+nsA7sAe3Ah1QBl2Z2/w2y2fwWJS6kRwAAAABJRU5ErkJggg==",
        email_go: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gcYBzEC7nEEhAAAACZpVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVAgb24gYSBNYWOV5F9bAAABIElEQVQ4y6XTv0qcURAF8N/3RRDBwiabJqxVGhFJEDZF2sh2voFPoKXkCez0EdImELCxEiUvkBRpLFNJmuQBdAX/nBSZD9ZFjKsDl7kX5pw759w7PDGaJPDskfjrGTRYxmhK8BxOmiTrRbJf+SERbOCsRR+f8KakPGQN8BGLbTG2OMH7TttdeisP8aMwOoKm2vqKbfycILnGL3zAUdX+k5tkK8kot6Of5MvY+SDJ0kTNKMlWe0ere9XJfN24U44fY3eyeGbi/B2v8QovsYobLBTJEN/w1ph53bP8wecxI+fwHC9qDys4xO/CkGQzyUWSQZKr/D+ukqwlOU+y2aKHd9Va5/h9S/mxhl6TpC29s1P+xEucdsPUTgEeJ7l56jT7C0cdtina3Za6AAAAAElFTkSuQmCC"
    },
    currentIdx: -1,
    mapAttempts: -1,
    lastImg: null,
    lastLocation: "",
    blueDotList: [],

    gotoUnread: function(){
        window.location.hash='home:m=ALL_UNREAD';
    },
    
    markAndNext: function(){
    
        if(NAV.lastImg){
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click",true,true,window,1,1,1,1,1,false,false,false,false,0,NAV.lastImg);
            NAV.lastImg.dispatchEvent(evt);
        
            if(NAV.blueDotList.length == 1){
                NAV.currentIdx = -1;
                NAV.mapAttempts = -1;
                NAV.lastImg = null;
                setTimeout(function(){
                    if(confirm('No more unread messages. Go back to list of unread messages?')){
                        NAV.gotoUnread();
                    }
                },1000);
            }
            else{
               NAV.currentIdx--;
               NAV.nextUnread();
            }
        }
        else NAV.nextUnread();
    },
    
    refreshBlueDotList: function(){ 

        if(NAV.lastLocation != window.location.hash){
            NAV.currentIdx = -1;
            NAV.mapAttempts = -1;
            NAV.lastImg = null;
            NAV.lastLocation = window.location.hash;
        }
    
        NAV.blueDotList = [];

        for(var i = 0;i<document.images.length;i++){
            var img = document.images[i];
            var bg = img.style.background;
            if(bg && bg.indexOf(NAV.imgs.blue_dot) != -1 && img.style.display == 'block'){
                NAV.blueDotList.push(img);
            }
        }

        // If we have a conversation map, make sure the unread messages count in there matches the number of blue dots we found
        var mapMatches = true;
        var mapArr = document.getElementsByClassName("MAP_REGION");
        var mapDiv = (mapArr && mapArr.length) ? mapArr[0] : null;
        if(mapDiv){
            var unreadBars = [];
            for(var k = 0;k < mapDiv.childNodes.length;k++){
                if(mapDiv.childNodes[k].firstChild.src == NAV.imgs.unread_map){
                    unreadBars.push(mapDiv.childNodes[k]);
                }
            }
            window.OSNH.log("Unread messages in map = " + unreadBars.length,"Unread dots found = " + NAV.blueDotList.length);
            if(unreadBars.length != NAV.blueDotList.length){
                mapMatches = false;

                NAV.mapAttempts = 0;// ++; 
                if(NAV.mapAttempts < unreadBars.length){
                    var evt = document.createEvent("MouseEvents");
                    evt.initMouseEvent("click",true,true,window,1,1,1,1,1,false,false,false,false,0,unreadBars[NAV.mapAttempts]);
                    unreadBars[NAV.mapAttempts].dispatchEvent(evt);
                }

                window.setTimeout(NAV.refreshBlueDotList,1000);
            }  
        }
    
        if(mapMatches){
            NAV.mapAttempts = -1;
            if(NAV.blueDotList.length > 0){
                NAV.nextUnreadByImg();
            }	
        }
    },
    
    nextUnread: function(){
        NAV.refreshBlueDotList();
    },
    
    nextUnreadByImg: function(){
        window.OSNH.log("HAX.nextUnread("+NAV.currentIdx+");");

        if(NAV.lastImg){
            NAV.lastImg.style.backgroundColor='transparent';
        }

        NAV.currentIdx++;
        if(NAV.currentIdx >= NAV.blueDotList.length){
            NAV.currentIdx = -1;
            NAV.mapAttempts = -1;
            NAV.lastImg = null;
            if(confirm('No more unread messages. Start again from the top?')){
                NAV.currentIdx = 0;
            }
        }

        if(NAV.currentIdx >= 0 && NAV.currentIdx < NAV.blueDotList.length){
            NAV.lastImg = NAV.blueDotList[NAV.currentIdx];
            NAV.lastImg.style.backgroundColor = 'lightGreen';
            NAV.lastImg.parentNode.scrollIntoView(false);        
        }
    },

    start: function(){

        window.OSNH.addToolbarButton(NAV.gotoUnread,"Unread message list","Ctrl+Alt+U",NAV.imgs.folder_page);
        window.OSNH.addToolbarButton(NAV.nextUnread,"Next unread message","Ctrl+Alt+N",NAV.imgs.email_go);
        window.OSNH.addToolbarButton(NAV.markAndNext,"Mark read and next","Ctrl+Alt+M",NAV.imgs.email_open);
    }
};
window.OSNH.nav = NAV;
window.OSNH.nav.start();
