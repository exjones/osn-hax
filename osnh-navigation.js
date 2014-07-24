/*
OSN HAX Navigation
------------------
Add toolbar buttons and shortcut keys to navigate unread messages in OSN
*/
var NAV = {
    
    imgs: {
        blue_dot: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARklEQVR42mNgGAVYAWvR+QS2onM7WIvOfYXQ5xNI0gzU+AOI/yPhH0QbArX5PzoGiRPpgnNfsRkAEqeXCygMA4pjYRSQDgCkIV6RL/9K3AAAAABJRU5ErkJggg==",
        unread_map: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAGCAYAAAAlvnXZAAAAV0lEQVQY031QWw4AMARzTr2jHYfb2IcsE8RHQzxaRSzmLOY45pAAJ2y1B2JRD/yBGiPXJpRIukomfTnaTCKpBZy/jMESmpCGneqZJyvLf6hegeUvkLl/AZMDJRdoZ8PRAAAAAElFTkSuQmCC",
        email_go: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKESURBVDjLpZO7axRhFMV/38zsy+xuEt2Q50bYgChGUBAVxUbRRlS0sxJsbP0HFAQJ1jYqtlqYTlARNZoiPlELCxVd0LgxwcnuxmT2MfPN97BIxAcIggcu91EcLudwhLWW/4HDf8I7feXZw/Sq3JZqEHc0QuUYCwaLNhZjLdpajFneV8oidBy3FquVd+Wy19PdWTx5eF0+iq1Ip9zf2MWfs1ju7Ui57UgPHDsfhY6/pEpSGXHt4RyVqqQZWaZrhkrdMPPNMLdo8ANLtWmJNczUJBduzrHQjJxcT3HEaUZapBIOg/157r70+daI6c0LEi4kXUHSEyQ96MoIakuS8amvdK3Os6YrBSCcVqgAKPVlGerNc+eFz0IQU8g6JD1IutCZFtQDyfiUT2FNntJgFrFintMM9bKaLpQGsvR0r+L6ZIV6IOlMC3JpQS2QnL99gHcLhygNZMl4v9jYbC9/IASoWJH2DMODXdx67jNTDZmphtx46hNbxVBhAxcnRkl6P5X1WpHGAlIqvtYDir05kskElx8c4c19jTQKqRUD3SNs6NtOEDY5e2MtV0+UwQq8VqSsNlb4tYBiT45MOgEWlJHs23gcbQ3aaAyW2cUKm4Z20ZBtDl4s0Ofcs16z/uVTJNXa9UMZkc04QjgaBwiVRFvDdO0DsVEoExPrmKUoYHNxN424xfOPu/FkY35676k73alcR4eXcoXnuTiuoL8YekorevPDKKPR1jC3+JnV2T5eVR7xrFyOE2/PPRF/C9PRSyUdSok0klBJRgobnR2l/bz4/JiJ93dfS8W22TEbiX9N4+g5Z37r8J7C5PuJl9Kwc3bMSoB/JiidEfPauIW20Ql/zKof9+9pyFaERzUY+QAAAABJRU5ErkJggg==",
        email_open: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKhSURBVDjLjZLNTxNBGIf37/Bf8CI3DxwQo8aPA3g1XDTxwAFIJMWIIiJCUCQaZT1ICQYCISWRbyMgHwUUpJXyIQVa+kFpoWVpu922u9vt7s+ZgRCJGJ3kyUxm5n3edyYvB4A7jZaR4IW2iTDaJyMwj4Zu/+3eqZsNlq1nlpkwfGEFoaiKoQUBzy2erv8S1HS6JocXIkjIBtQsoBEUzcDMzyiedLi8jR+3z5wqeDu4fY4fCqh2twSJBEsKEIpnGSmVyIhkM5QGPxxEXY+/8ITgVa//XvvELu63Lh9iXoKpZQnl7x0oe/cDxW9seNi2RNZ2lBI6rWFUdfp4JuAHA/rQwgF2SSYa/K9BJfR5I4sx1Hb7de61xelTMjrEVJZlpYNfO0nJVAY3B2R2VsLbIaU19M0GcLHC4uUqzStGgmyYWlaPBQcJFVFJZXM4JsO3J2HVG2NnhY+tKG5ewcaOiILGOYMr4x3kg3T02UVUmB3sEg2OEeJJIiKSvWga7mAChgEUNcyheSwOIalQAbi7TTYmWAnq6LeJaO53s+AYCRZTGQYVhoQ0ars20DoVxydnFgfSkeBW3TwTOPd0rIZ0fF4UUPnBieqO9RM8aHNi3iNj0pVlHAsKHs0ywXpYh8OvYuD7PpkVJvsdutc9G4F1U8FX75HgJRFcNllJp+lYDqgsO724tqv/IaDQCnpJghmXAiFBK5gHl1s6bqRIz445BKztqPAKBrz7BjwEF8FN2IqQdYRUSZ5p9ykYIK0e2JdQ8OKbweUUtXuikqLvCCkjntIgyhppZQ1JRQMVU9IEmZI5RBBl3bYRkfNNli3ubGHTRM6d3tj5stFMbsW4llc5peVXWbVL1VbtSs20drVuWrtGuF5/yI366czVp1+SeeU9fhr7C4feT2DQtSX8AAAAAElFTkSuQmCC",
        folder_page: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJCSURBVBgZBcFBi1VlGADg5/3Od+/cYWjUTYlRS43Zi1BGuGlVizZB0EJaFf2JNpHgPt1kBf2EXFlEZFFCUJsIsWmhI07iqOPM3HvPPed7e57ITAAAcO3mw1wOg2Fo4PbOo6NoGfuL4d7du4tv+r29yz9dfXsemQkAAK78cD8/vHDKw4Mm0DKtxqZ2fP3bE7/f2vn2wb2d9yoAAMA4psdH6c7DVEpaDc3+fPDG6XXnzxy3MS1vXf/u4LMCAACQ6IJZZdqFaRdm0+K/J3NnTnDx3DEb07WPCwAAAEQw6ahB7cKsFtt74eb20tN5mtSi3r5+9o/Z5tZWRAFASp8KoSsFiNRastaJErquk6iR5ZWXzn85iQgSkghu3NdACE0XTGsRmVoLESGTasiF1q8tH1wx9h1lU8Rzfrz1souvv6gWShQt6YLSMGW9kpmqVZRsvbGfypYOt3/29O8/XTrO7hcEEoEOHWZoH/xCC1XkrA1z+9t3rPZ2tNXCibPvq1sf2dzoZBZAyqQU/vn8nOVwIFqJalXU9eedvHAJjUypOXrwlf4ZKWQWhBTq5mtgWja1HPpqlZnjQr97DQloDudFP7BcsRpGi34wX/aOv/BYxbuf/Lp7bGOyXi1ltoFAJhptZXNtxXQpxwXtUBv35fDU7NSb/sWNy6+ehKrPDCOZ5Ej2si1pC5lzOR7J8UAO+3J8hgYAavatDkePtGFCFrKTOaGtybZBrmT2RE8ZjIsFAKi5WP61ffWd0xIBAAAASMT3tLwN8D9pITwp1Smo1gAAAABJRU5ErkJggg==",
        paste_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZPNS5RRFMZ/577v+L5jmlmNoBgE4iLIWkgxmTtx4R8QLXLRB1GYG4lAwlWkCH1sShcRuIgWYUQoBIUVgojLyowWLSRhSCNtchzn672nxYxT6hRBD/cuzuW5D+c5H6Kq/A9cgM6+0VtBTk4tJwM/kS7BspvDsAc7w4w8uXGyxwUIrHRev9AcqYlERMRFAS3+E1RBdSNWglyGs9eenwbyAsuJwIvsjUjX7QfU7duF51gC9cBUYYT8NYJjhM8fZ+nvuUg2EClaSKbBGJfGhv0cjLbiGAfVAMQFEYwIIgZjDCHHYO2WGmzY9DwfP1yRz/cv0KLJLQLZTIpsah1EULVYDbDWIICq4khALpNE1W7PQBW+xmN8W4qTtTmsBvxIL5IJ6pECp8ZbYX0tDmpKC3xZLCe0kPr1oBFUU0XyCmEWFnT7HNgC3zhlGMcr6TtITJBLvKK6+jtX7z/ElDV4cGJzBn9COv6MPZXTNDcfpX53I6/nnrL+ftKPdtfddAHUWgRYmp8rKRAKPabtSAeBCThc287Eh1GiTS3Mfxq75OZnLd+coYG+YvQ7rtzpJyQVdBw4B8DltnuMzw4DY74LsDNs4jaXqqotl3wLC4KFw+panLnYNG9jU/S2jzD44gx+vlYpF2CHZx6dH3h5LJnVJmtL7dJxf+bdtNdyqJXx2WHKxGXqzSTAkPzrOke76waBLqASWAWGZ+7Gen8CJf/dMYh8E3AAAAAASUVORK5CYII=",
        console_mode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGNSURBVDjLpVM9SwNBEJ297J1FQBtzjQj2dgppYiP4A1KZRoiFrYWt9rHyH6QUPBDTCimtLNSAnSB26YKg4EdMdsd5611cjwsIWRhmZ3f2zZuPVcxMsyx9fPF0NRfS2vM7lx2WtcQiJHvDRvZMluXMGNHstJH7+Wj09jHkOy1+tc3VxeC+P6TXT1sYZX2hT7cvS6lepv3zHUp2T8vXNw81dXT2yGwEGeERSbSVCC5qysYa+3vm9sJGmLFojceXJ9uklCqUIAic5G3IytahAAhqqVSiwWDwx6nogW9XKhWphaGAvC50Oh1qtVr/7oAdCwBQwjB00mg0qFqtUr1ed3YURZM7X7TWTqM2Gm3CASRJEur1etTtdp1DnrafFtJGMbVNGSBas9l0DrAzR6x8DdwASUB0RqNNGS2/gH7EInvCwMhkZTnlnX0GsP09tJER0BgMoAEAa1rETDIQvBkjBZeHMIjjuNB5Ggg0/oZWPGrHGwd7Fp9F2CAlgHKqf0aYXb6Y2mzE8d/IfrXVrN/5G81p6oa2mIEUAAAAAElFTkSuQmCC"
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
