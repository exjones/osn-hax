/*
OSN TRAY
========
An in-tray for easier navigation of unread and flagged messages.
*/    
var TRAY = {
    imgs: {
        mailbox: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94IDhIxJaa0T+YAAADoSURBVDjLpZIxjgIxDEVfsmEaGgqkLbhFbgLiCltRzgFA2+cAW1DRgqCg4wxE2pqWioZtaCINs41HGo2iSRC/ie3I3/a3FS0UpQ/AQ9xRcFaRgOn4A2DEqyhKH4vVOTlKjDHwA8wAgrMqQXACFsDFABPgCtSJRufB2V1Mg40k9wn2BWxjo2rAZsj0C3zIVobAEbgBUx2p/pT5n+0YUBWlP8iaD8HZT2CvI9V05yU4e5YiXrpYN8Qmd9XBWYDvlg2gTeadLIFV5KtSRenvqevrO2kjqsbQiFv1HZXqabvO6UDzJlIEfymCf9sTSEE7PSEiAAAAAElFTkSuQmCC",
        busy: "data:image/gif;base64,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",
        person: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAvUlEQVQ4y2P4//8/A6WYYXAZwlp0DhmbAfETIP4PxBVochgYlyEnoQaA8Dcg5iTHkA9IhoCwHFRcBYi7gLgFiEUJGfIczRBpqPhGJLEuQoZMQ1J8Hkn8MJL4UkKGMCApDkQSW4QkXkHIEFBA/kR3NhDbIxmCM0xAmsPRYgeEtwCxHxA7QWPrP9TLQuiGeAPxKzTN6PgqVN0fKB8UiyrIhpwnYAAMF6GpnYxsyAEgPkMELoWGE4y/axBmQEoxAKZ4lUv/eBrtAAAAAElFTkSuQmCC",
        fyi_flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94IFQAEANc7/pcAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB/ElEQVQ4y7WSTUhUYRSGn3Ovd3J+0qkhsdQgyYZgWjQuooKEUMKxFi2ENgXSalq0sKJMAoMKxZA20iKohbiIFintzAraGEYqRuTs+sMwHXFm0LTLndPmKrdpXLTorM4573cevu89H/xDqGqzqjZ7eyWbHKwEyoDzgABvgUMvZjKXXP2GiNzCFQuHr/7I2d25VYfB8QUUOFgT5MviGr0js5T7TV5fjhH2m0dEZEwKhstyq06moe8DO0IWk1+Xiz6ltT5C/5k9AyJyzvAKIpLdWmpe6zhRRallEK8JFgU8eZdmdCZzVlUTRqEoIj2t9ZGn2wIlxKoCGPI3oCrsY3+lH+D9Zm43zedsjd+e1pP9H3VoKq2f06v6KpXRwfF5XVy2VVU7/jDRap+oA7qBRiBzYKc/kzy8PTY0tchwMoppSC1QB1QDwyKS3gBY7RNR4A0QBrJABZAO+AyrZV/Id7Q2yIWGyisicrfwtuse3HGHcfc/CwRXfuV9K3nh0dg8qbmfvarathmg0dPrAlrWi5FUdq3n9G4uPv6E7ehDVa0oBvCGBSysF7aj9vFo+YPYrgD3Xn4HSBYDjHrXDBzz1CPA/Zunqpn+toKT1y5VNQsBncCSm4eBiJsvAZ0iMhnaYiYG2vY+Mw1JiIiz8W88a4y6Zja5refAdbsvnuJ/xm8XYriouBK5SgAAAABJRU5ErkJggg==",
        reply_flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94IFQADJKR5jIEAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABuElEQVQ4y72TPWhTYRSGn5PblibRthKVYujQSSpZbAuCPwiClaqLQ8FBBRWEzlZrBzdLFUEUzKCCi9bFQREnsSouQsUfItqIIKhgxWui8dKamty+Ljdwjb1UF8943u95Od/5gX8ISf2S+sO5hoiH7UALcBAw4DGwbiJfOhzox83sBIFYDw9/9ionvbLP+OQXBKztSPK+OMfpOx9pjTs8HMrQFnfWm9kjq4NbvLJf2nzmJSuWNPLsw8yCXxnoSZHd3XnFzPbFwoKZfV/a7Bwb2ZamuTFGd0dyQYPrTwrczZf2StoeqxfN7NRAT+rGskQDmXSCmP1pkG5roqs9DvAiqttbXa+i7tGcdmandPN5Qe8KZd1/XdL4pKviTEWSRqKmtTEwOXo7V9SO81Oq+vOS1CmpT9IBSakoeBPghSq5OnjtrbIPpiVpaLE9qcEKGWz4OltV71hO+U+zkrT/b2ABP4CnwCHf949M5L+p79wr/azOS9LKMFibwnKgKZSfA9YAFxzHSW5Z3XopsyrB2XvTAINRVewKQIVyXcBF13V7vXJVey6/qTXUWczkt9UAnOCQbtUfU5TJ/4tf2UTdJawBdTYAAAAASUVORK5CYII=",
        urgent_flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94IFQADML6jWPwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB00lEQVQ4y72TP2gTcRTHv++S9A+NiSUFazkQl8MYbDsISrWgSIUKUkIWHRSqiw6FQkpth24dtAi26BDbbnUIqLQGDDioNCIOTtKh6KYVTtIktslhejTJ1+UOjmsScPGN7/u+H37vy+8B/1Akh0kOO3veBoPdAAIAbgMQAJ8BnDEz7+OWPiMis7BEt/leLbd9v2aUUH6eBED4TvWh+nMLxpNHkEMBdL1+CyUQHBCRT+IyB2gYu7mrQ1BCIexvfKm7SvtIDMG5+RURuak4BREpit8/5R+fgLS1wdfbXxdQfvUS5vq7GySvKG5RRB60j8RWlcOd8IUjgHJgBJ6jPfBqJwBgo1HaQ9XcNrMXzzJ/PcpyOsXK1g/ufVjnnxdJVn8XSHK6rlnX1PMWZLL8Js38tShZqZDkcZKXSd4iGWpkHtQ1teR4ybOd+BiN5QRJTjT9JLZZ11Q6AOequzvMXhrg/revJDl6IDPbDCANwG/19wBsAkh0b34Pmh8zc8bCQ4SSa4DXe0REsjbAjrgLQIsDbAI4CeDpr/CxjtbBC0u+cARG4jEA3G20QlTXVNO5gq6pYV1TF2vF4umaUWLhzqgdqKcpxNUTXVM91iGl3MdUF4L/WX8Bkbzn9D14kP0AAAAASUVORK5CYII=",
        convo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAgElEQVR42mNgoBrIPSfKUnR+HWvRuW9A/J8I/A2kHqQPbgZL4bnVRGpGwSB9cEOAAj/JMQSkD9mQ/+TiUUPwG/KB8tgpPLeITEOWIlJs4RUhoMAKElwEUrcCpA9nLsCaMkNXMZOUlSg2ANkQsAH1V9jIytRgA0C5lFwDwLmaRAMAoKuVhOxa4yIAAAAASUVORK5CYII=",
        group: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAABIElEQVR42mNgGAXEg6wrPKxF504C8X8g3kWUHrbCs4EgTSxF59dBDDifADUAjDlKLioyFB7jZCk8txrIP8NWfC4EwxCgxAGYBpbCsx4sxecqkA1hKT5jw1Jy1glJ7CRBQ1iLz6YhG8Kef1Gdpfi8K5LYGUxDCs/mgCTZis49B3kH7KXic+fBYoVnt4AVAb0DkodYdL4U0xCozWBD4AafnwkWKz7bheTih2CXFJ/PR+guP8PPUnRuI9SJr0D+Bglz5J2RAxp8Ayr+FhaQoLABqYNauB2knwHkLJg/2YrOhrMVntFlLTy3CMj/gxwmMFcC5ZLZi875IcIP6C0g4xJU4DY0bXxD14yO2QvPqiDpu4QaLgXnDQgZAAno81HDOJsBAECo9eBT2z9xAAAAAElFTkSuQmCC",
        collec: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASBJREFUeNpi+v//PwMlmImBQsDCVnwexlYE4p1ArIwkD7PgLxAzA/FtIHYH4vsgwV+9higuqETTDAL/kDSD2KpAXMKAxQaQxmQgvghVjIxZgJgRygY5NwOIldANKIfSs6H0DyD+j4S/Q8Wno6kHGyAFtR0E1kJpDqitMMwJFd8ANTAFiMVhBsRA6YVA/AqI90P9/R+JBuEDQPwaiOdBDYuHGVAIFZgGpR2h/j0AlT8EdYUDVH4mVLwAZoAYNIRPI9nmDMQtUPEmIHZCkjsDNUiSARrCMIP+QWmQs2uQXMIAdQ0DkhpY2gAbgKz5H9S5dlDbYJrQ0wYTzHAWNAVMaAkHOarR2f9gAvuQJP6hacYFQPIHQQxGUI6iBFCcGwECDADukXZCZWxIOQAAAABJRU5ErkJggg==",
        oneone: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAx0lEQVR42mNgwANYis/ZsRadOw7Ef3Dg4yA1DHgNKTr3BI8BYAxSg9cQQgbA8NAx5CERhjxE1VV/hQ0U2uz5F9UhsXPWHV/gguRAatBtPgJTwF541heb19iKznXgc7o+qk1nZ6EbgtcAiKKzFqiGnF+MLA80oImBICg/ww/U/BZuSOG5DAZyAFvh2TDsIU6KIUVnY6CG/AQGrApJmsEZrfjcAqDmD0jh8pm1+PxKjCjEEStzCWey8/WEDPlGRKq8QI388QGfGQAoWTBIU0tyEQAAAABJRU5ErkJggg=="
    },
    
    expanded: false,
    starCache: {},
    lastOpenedTotal: -1,
    lastTotal: -1, 
                
    start:function(){
        
        window.OSNH.log('Starting Tray extension');
        
        window.OSNH.injectCSS([
            '#osnh-tray-tab{margin-right:-1px;position:fixed;right:0;top:5px;width:24px;height:44px;border:1px solid gainsboro;z-index:100;',
            'background:url('+TRAY.imgs.mailbox+') white 50% 4px no-repeat;border-right:solid 1px white;}',
            '#osnh-tray-panel{overflow:auto;-moz-box-sizing: border-box; -webkit-box-sizing: border-box;box-sizing:border-box;padding:5px;position:fixed;right:-250px;top:0;width:250px;height:100%;border-left:1px solid gainsboro;z-index:99;background-color:white;}',
            '.osnh-tray-item{overflow:hidden;padding-left:20px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid gainsboro;}',
            '.osnh-type-person{background:url('+TRAY.imgs.person+') 0 0 no-repeat;}',
            '.osnh-type-fyi-flag{background:url('+TRAY.imgs.fyi_flag+') 0 0 no-repeat;}',
            '.osnh-type-reply-flag{background:url('+TRAY.imgs.reply_flag+') 0 0 no-repeat;}',
            '.osnh-type-urgent-flag{background:url('+TRAY.imgs.urgent_flag+') 0 0 no-repeat;}',
            '.osnh-type-convo{background:url('+TRAY.imgs.convo+') 0 0 no-repeat;}',
            '.osnh-type-group{background:url('+TRAY.imgs.group+') 0 0 no-repeat;}',
            '.osnh-type-collec{background:url('+TRAY.imgs.collec+') 0 0 no-repeat;}',
            '.osnh-type-oneone{background:url('+TRAY.imgs.oneone+') 0 0 no-repeat;}',
            '.osnh-starred{background-color:lemonChiffon;}',
            '.osnh-tray-badge{padding: 0 3px 1px 3px;float:right;background-color: #0572ce;border: 1px solid #0572ce;border-radius: 3px;color: #fff !important;font-weight: bold;}',
            '.osnh-tray-item > a:hover{text-decoration:underline;}',
            //'#osnh-tray-total{position:absolute;top:-0.6em;left:32px;padding: 0 3px 1px 3px;background-color: #0572ce;border: 1px solid #0572ce;border-radius: 3px;color: #fff !important;font-weight: bold;}',
            '#osnh-tray-total{text-align:center;}',
        ]);

        window.OSNH.injectHTML([
            '<div id="osnh-tray-tab"><div style="width:24px;height:24px;"><img id="osnh-tray-busy" src="'+TRAY.imgs.busy+'" style="margin-top:0;width:24px;height:24px;"/></div><div style="color:gray;" id="osnh-tray-total">?</div></div>',
            '<div id="osnh-tray-panel">',
                '<div id="osnh-tray-content"></div>',
            '</div>'
        ]);
        
        $('#osnh-tray-tab').mouseenter(TRAY.showSidebar);
        $('#osnh-tray-panel').mouseleave(TRAY.hideSidebar);
        
        TRAY.cacheStars(0);
    },
    
    cacheStars: function(offs){

        window.OSNH.ajax({
            method:'GET',
            resource:'stars?offset='+offs+'&count=100',
            callback:function(obj){
                
                if(typeof(obj.items) !== 'undefined'){
                    for(var c = 0;c < obj.items.length;c++){
                        TRAY.starCache[obj.items[c].url] = true;
                    }
                }
                
                if(obj.hasMore){
                    TRAY.cacheStars(offs + obj.items.length);
                }
                else{
                    TRAY.getUnreadMessages(0);    
                }
            }
        });
    },
    
    hideSidebar:function(){
        if(TRAY.expanded){
            $('#osnh-tray-tab').animate({
                right:"0"
            },200,'swing',function(){TRAY.expanded = false;});
            $('#osnh-tray-panel').animate({
                right:"-250px"
            },200,'swing');
        }
    },
    
    showSidebar:function(){
        if(!TRAY.expanded){
            $('#osnh-tray-tab').animate({
                right:"250px"
            },200,'swing',function(){TRAY.expanded = true;});
            $('#osnh-tray-panel').animate({
                right:"0px"
            },200,'swing');
            
            TRAY.lastOpenedTotal = TRAY.lastTotal;
            
            TRAY.adjustTitle($('#osnh-tray-total').html().replace('*',''));
        }
    },
    
    getUnreadMessages: function(offs){
    
        if(offs === 0) {
            if(TRAY.getting) {
                window.OSNH.log('In the middle of getting unread messages. Aborting new attempt.');
                return;
            }
            TRAY.unreadList = [];
            $('#osnh-tray-busy').show();
            TRAY.getting = true;
        }
        
        var filter = {
            excludeClosed:true,
            excludeFullyRead:true,
            excludeMembered:false,
            excludeMuted:true,
            excludeOneOnOne:false,
            excludeOpen:false,
            excludeWalls:false,
            includeDisabled:false,
            includeDiscoverable:false,
            includeEnabled:true
        };
        
        window.OSNH.ajax({
            method:'GET',
            resource:'conversations?offset='+offs+'&count=100&filter='+encodeURIComponent(JSON.stringify(filter)),
            callback:function(obj){
                
                if(typeof(obj.items) !== 'undefined'){
                    for(var c = 0;c < obj.items.length;c++){
                        TRAY.unreadList.push(obj.items[c]);
                    }
                }
                
                if(obj.hasMore){
                    TRAY.getUnreadMessages(offs + obj.items.length);
                }
                else{
                    TRAY.getFlags(0);
                }
            }
        });
    },
    
    getFlags: function(offs){
        
        var filter = {
            excludeSelfAssigned:false,
            includeAssignee:true,
            includeAssigner:false,
            includeClosed:false,
            includeNoReply:true,
            includeOpen:true,
            includeRead:true,
            includeReply:true,
            includeUnread:true
        };
        
        window.OSNH.ajax({
            method:'GET',
            resource:'followups?offset='+offs+'&count=100&filter='+encodeURIComponent(JSON.stringify(filter)),
            callback:function(obj){

                if(typeof(obj.items) != 'undefined'){
                    for(var c = 0;c < obj.items.length;c++){
                        TRAY.unreadList.push(obj.items[c]);
                    }
                }
                
                if(obj.hasMore){
                    TRAY.getFlags(offs + obj.items.length);
                }
                else{
                    TRAY.getUnreadCollections(0);
                }
            }
        });
    },
    
    getUnreadCollections: function(offs){

        var filter = {
            excludeClosed:true,
            excludeFullyRead:true,
            excludeMembered:false,
            excludeMuted:true,
            excludeOpen:false,
            includeDiscoverable:false
        };
        
        window.OSNH.ajax({
            method:'GET',
            resource:'collections?offset='+offs+'&count=100&filter='+encodeURIComponent(JSON.stringify(filter)),
            callback:function(obj){

                if(typeof(obj.items) != 'undefined'){
                    for(var c = 0;c < obj.items.length;c++){
                        TRAY.unreadList.push(obj.items[c]);
                    }
                }
                
                if(obj.hasMore){
                    TRAY.getUnreadCollections(offs + obj.items.length);
                }
                else{
                    TRAY.getting = false;
                    TRAY.postProcessUnreadDisplay();
                }
            }
        });
    },
    
    idFromEnd: function(url){
        var en = url.lastIndexOf('/');
        if(en == -1) return '';
        
        return url.substring(en+1);
    },
   
    truncString: function(str,len){
        
        var lstr = '';
        
        if(str){
            lstr = str.substring(0,70);
            if(lstr.length > 70){
                lstr += '&hellip;';
            }
        }
        return lstr;            
    },
    
    postProcessUnreadDisplay: function(){
    
        for(var m = 0;m < TRAY.unreadList.length;m++){
            if(typeof(TRAY.unreadList[m].postProcessed) === 'undefined'){
            
                TRAY.unreadList[m].isStarred = false;
                if(TRAY.starCache[TRAY.unreadList[m].url]) TRAY.unreadList[m].isStarred = true;
                    
                if(TRAY.unreadList[m].objectType == 'waggle/conversation-followup'){
                    
                    if(typeof(TRAY.unreadList[m].messageURL) === 'undefined'){
                        window.OSNH.log('No messageURL in followup');
                        window.OSNH.log(JSON.stringify(TRAY.unreadList[m]));
                    }
                    
                    window.OSNH.ajax({
                        method:'GET',
                        resource:TRAY.unreadList[m].messageURL,
                        callback:function(obj){
                            var it = TRAY.unreadList[m];
                            
                            if(TRAY.starCache[it.url]) TRAY.unreadList[m].isStarred = true;
                            
                            TRAY.unreadList[m].name = TRAY.truncString(it.createdByUserDisplayName+' - '+obj.plainText,70);
                            TRAY.unreadList[m].modifiedDate = obj.modifiedDate;
                            
                            if(it.followupType == 'FOR_YOUR_INFORMATION') {
                                TRAY.unreadList[m].itemType = 'fyi-flag';
                                TRAY.unreadList[m].itemHint = 'Flag - For Your Information';
                            }
                            else if(it.followupType == 'PLEASE_REPLY'){
                                TRAY.unreadList[m].itemType = 'reply-flag';
                                TRAY.unreadList[m].itemHint = 'Flag - Please Reply';
                            }
                            else if(it.followupType == 'PLEASE_REPLY_URGENT'){
                                TRAY.unreadList[m].itemType = 'urgent-flag';
                                TRAY.unreadList[m].itemHint = 'Flag - Urgent, Please Reply!';
                            }
                            
                            if(obj.collectionURL){
                                TRAY.unreadList[m].hashValue = 'ExtensionPlace:id='+TRAY.idFromEnd(obj.collectionURL)+'&m=MESSAGES';
                                // TRAY.unreadList[m].itemType = 'collec';
                                // TRAY.unreadList[m].itemHint = 'Collection Wall';
                                TRAY.unreadList[m].postProcessed = true;
                                TRAY.postProcessUnreadDisplay();
                            } 
                            else {
                                if(typeof(obj.conversationURL) === 'undefined'){
                                    window.OSNH.log('No conversationURL, and I really need one, guessing at something.');
                                    window.OSNH.log(JSON.stringify(obj));
                                    
                                    TRAY.unreadList[m].postProcessed = true;
                                    TRAY.unreadList[m].hashValue = 'conversation:id='+obj.id;
                                    TRAY.postProcessUnreadDisplay();
                                }
                                else {
                                    window.OSNH.ajax({
                                        method:'GET',
                                        resource:obj.conversationURL,
                                        callback:function(cnv){
                                        
                                            if(TRAY.starCache[cnv.url]) TRAY.unreadList[m].isStarred = true;
                                    
                                            if(cnv.objectType == 'waggle/wall'){
                                            
                                                TRAY.getWallLinkFromConvo(m,cnv.membersURL,TRAY.idFromEnd(it.messageURL),0);
                                            }
                                            else if(cnv.objectType == 'waggle/wall-group'){
                                                
                                                window.OSNH.ajax({
                                                    method:'GET',
                                                    resource:cnv.membersURL+'?offset=0&count=1',
                                                    callback:function(grp){
                                                        if(TRAY.starCache[grp.url]) TRAY.unreadList[m].isStarred = true;
                                    
                                                        TRAY.unreadList[m].postProcessed = true;
                                                        TRAY.unreadList[m].hashValue = 'group:groupId='+grp.items[0].id+'&messageId='+TRAY.idFromEnd(it.messageURL)+'&m=WALL';
                                                        TRAY.postProcessUnreadDisplay();
                                                    }
                                                });
                                            }
                                            else{
                                                
                                                TRAY.unreadList[m].postProcessed = true;
                                                TRAY.unreadList[m].hashValue = 'conversation:id='+TRAY.idFromEnd(it.conversationURL)+'&sid='+TRAY.idFromEnd(it.messageURL)+'&m=MESSAGES';
                                                TRAY.postProcessUnreadDisplay();
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                }   
                else if(TRAY.unreadList[m].objectType == 'waggle/wall'){
                    
                    TRAY.unreadList[m].name = TRAY.unreadList[m].name + "'s Wall";
                    TRAY.unreadList[m].itemType = 'person';
                    TRAY.unreadList[m].itemHint = "User's Wall";

                    TRAY.getWallLinkFromConvo(m,TRAY.unreadList[m].membersURL,null,0);
                }
                else if(TRAY.unreadList[m].objectType == 'waggle/conversation'){
                    TRAY.unreadList[m].postProcessed = true;
                    
                    if(TRAY.unreadList[m].url.indexOf('/collections/') != -1){
                        TRAY.unreadList[m].hashValue = 'ExtensionPlace:id='+TRAY.unreadList[m].id+'&m=MESSAGES';
                        TRAY.unreadList[m].itemType = 'collec';
                        TRAY.unreadList[m].itemHint = 'Collection Wall';
                    }   
                    else{
                        TRAY.unreadList[m].hashValue = 'conversation:id='+TRAY.idFromEnd(TRAY.unreadList[m].url)+'&m=NOT_SET';
                        TRAY.unreadList[m].itemType = 'convo';
                        TRAY.unreadList[m].itemHint = 'Conversation';
                    }
                    
                    setTimeout(TRAY.postProcessUnreadDisplay,1);
                }
                else if(TRAY.unreadList[m].objectType == 'waggle/one-on-one'){
                    TRAY.unreadList[m].postProcessed = true;
                    
                    TRAY.unreadList[m].hashValue = 'conversation:id='+TRAY.unreadList[m].id+'&m=NOT_SET';
                    TRAY.unreadList[m].itemType = 'oneone';
                    TRAY.unreadList[m].itemHint = 'One On One Conversation';
                    
                    setTimeout(TRAY.postProcessUnreadDisplay,1);
                }
                else if(TRAY.unreadList[m].objectType == 'waggle/wall-group'){
                    
                    window.OSNH.ajax({
                        method:'GET',
                        resource:TRAY.unreadList[m].membersURL+'?offset=0&count=1',
                        callback:function(obj){
                            var it = TRAY.unreadList[m];
                
                            TRAY.unreadList[m].postProcessed = true;
                            
                            TRAY.unreadList[m].hashValue = 'group:groupId='+obj.items[0].id+'&m=WALL';
                            TRAY.unreadList[m].itemType = 'group';
                            TRAY.unreadList[m].itemHint = 'Group Wall';
                            
                            TRAY.postProcessUnreadDisplay();
                        }
                    });
                }
                else{
                    TRAY.unreadList[m].postProcessed = true;
                    setTimeout(TRAY.postProcessUnreadDisplay,1);
                }
                
                return;
            }
        }    
        
        TRAY.refreshUnreadDisplay();
    },
    
    getWallLinkFromConvo: function(listOffs,membersURL,messageId,offs){
                                        
        window.OSNH.ajax({
            method:'GET',
            resource:membersURL+'?offset='+offs+'&count=100',
            callback:function(obj){

                if(typeof(obj.items) != 'undefined'){
                    for(var c = 0;c < obj.items.length;c++){
                        if(obj.items[c].role == 'HOST'){
                            TRAY.unreadList[listOffs].postProcessed = true;
                            TRAY.unreadList[listOffs].hashValue = 'user:userId='+TRAY.idFromEnd(obj.items[c].url)+(messageId !== null ? '&messageId='+messageId : '')+'&m=WALL';
                            setTimeout(TRAY.postProcessUnreadDisplay,1);
                            return;
                        }
                    }
                }
                
                if(obj.hasMore){
                    TRAY.getWallLinkFromConvo(listOffs,membersURL,messageId,offs + obj.items.length);
                }
                else{
                    TRAY.postProcessUnreadDisplay();
                }
            }
        });                                        
    },
    
    refreshUnreadDisplay: function(){
    
            $('#osnh-tray-busy').hide();
            $('#osnh-tray-content').html('');
            
            TRAY.unreadList.sort(function(a,b){
                if(a.modifiedDate < b.modifiedDate) return -1;
                else if(a.modifiedDate > b.modifiedDate) return 1;
                else return 0;
            });
            
            if(TRAY.unreadList.length === 0){
                // $('#osnh-tray-total').hide();
                $('#osnh-tray-content').append('<div class="osnh-tray-item">Your in tray is empty.</div>');
                TRAY.adjustTitle(0);    
            }
            else{
                var unsure = false;
                var total = 0;
                
                for(var m = 0;m < TRAY.unreadList.length;m++){
                    var it = TRAY.unreadList[m];
                    var badge = '';
                    
                    if(typeof(it.nUnread) !== 'undefined'){
                        
                        if(it.nUnread < 0){
                            badge='<div class="osnh-tray-badge">?</div>';
                            total++;
                            unsure = true;
                        }
                        else{
                            badge='<div class="osnh-tray-badge">'+it.nUnread+'</div>';
                            total++;//= it.nUnread;    
                        }
                        
                    }
                    else total++;
                    
                    $('#osnh-tray-content').append('<div class="osnh-tray-item osnh-type-'+it.itemType+(it.isStarred?' osnh-starred':'')+'" title="'+it.itemHint+'">'+badge+'<a href="#'+it.hashValue+'">'+it.name+'</a></div>'); 
                }
                
                TRAY.lastTotal = total;
                if(unsure) total = ''+total+'?';
                // if(total > TRAY.lastOpenedTotal) total = '*'+total;
            
                TRAY.adjustTitle(total);    
            }
            
            setTimeout(function(){
                TRAY.getUnreadMessages(0);
            },10000);
    },
    
    adjustTitle: function(msg){
            
        var title = window.document.title;
        if(title.indexOf(']') != -1){
            title = title.substring(title.indexOf(']')+2);
        }
            
        $('#osnh-tray-total').html(msg);
        // $('#osnh-tray-total').show();
                
        title = '[' + msg + '] ' + title;
        window.document.title = title;
    }
};

window.OSNH.tray = TRAY;
window.OSNH.tray.start();