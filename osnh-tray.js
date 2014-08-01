/*
OSN TRAY
========
An in-tray for easier navigation of unread and flagged messages.
*/    
var TRAY = {
    imgs: {
        mailbox: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94HHxUGHAYM1nQAAAH3SURBVFjD7ZcxaxVBEMd/+3KZoBFBYmWKiGih5SqCgrXYWAQCQuwECwtFpvYbuDFVLLUTBW208hNYyH4ARYwSxeJBkkZ0I56F+8Lm8e5xd+zlWTiwsMzu7X92Zv6zc4YKEfXvgOmK5cPB2TkySDFmbQEQOpYeE5ZxBlTdvtwvA2aBQ+kIzhrAdOoSUT9WL+pLUV/mOrtIF4OzAEdFvQJXgFNxj8Tbp4f9rIn7C3gPvAIcsJlg/XXnQCHqV4E7o04ZGND29ok8DM7e2s2BBPxtFXgDGRi3BpwHDsY8m0rGbVE/tRuCCP4MOJsB/BtwOji7PYY5v/fkgKi/ACxlAP8RnD0m6p+L+sWa333qAfcycNsA10X9A2CxZphKYLoAzuTgdnD2hah/E5y9W0HBeeAJcCmq1oGlXubK9kXUrwwBz4j6x8BGBN8BbgRnTwDXjKj/CByv4TYzYr6HpglFd4CbwBxwP9m2EpxVUX8A+A6sFw1iPGo+LCeBp5FRjxL9a2A5ONuP1XCmq9fwQ3D2HHAV2AI+AxeDs5eBfvRU7X6gTSIOpi+Ds0fS+j8M3Gk/kIJVAU+6IQmdhKDhQ1VOuiUzgMmdhI0rau4QNPVomcuAtm1av4hlMzS5aEU8QwsDNk2uTG8T/3/+x+S/AfsibWj4dUTGz7Y14A+r5qdGajFOHgAAAABJRU5ErkJggg==",
        busy: "data:image/gif;base64,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",
        person: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAvUlEQVQ4y2P4//8/A6WYYXAZwlp0DhmbAfETIP4PxBVochgYlyEnoQaA8Dcg5iTHkA9IhoCwHFRcBYi7gLgFiEUJGfIczRBpqPhGJLEuQoZMQ1J8Hkn8MJL4UkKGMCApDkQSW4QkXkHIEFBA/kR3NhDbIxmCM0xAmsPRYgeEtwCxHxA7QWPrP9TLQuiGeAPxKzTN6PgqVN0fKB8UiyrIhpwnYAAMF6GpnYxsyAEgPkMELoWGE4y/axBmQEoxAKZ4lUv/eBrtAAAAAElFTkSuQmCC",
        flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94IARM7Oojy0PgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACGElEQVQ4y5WTX0hTYRjGn/ecs2Mbo7VhoK0/BEkYC4clUhJ0M7LwKhIESeomiOjirEYFEUiKoWh44YUgGAaBuyi8qLCFdhEi5RmU1hTBSFi1zENuS7fOn7ebJUtWtufye5/vx8fzfC+wiZi5npkDf5tLecbtAFwALuSOpgH4R2eTQVEgMPNNImrfCKDc5etLaaMjmTExMPkNAOArt+PD8k90jSXgdoiIXq2ExyHWEtGrPwDM7ExnrVRVVwweh4g38bWCT22p8WCgac89WzA6DMsyjd6aCAAIRJR2lgg32k/tgFMWUb3TURAw9FrDk1jyXIPPNQJBHIQy4QEAAQCI6E5TtftRqVNClddeELDLLeNg2Ra8/ZSRieC1UUn3ega5HAJLaeNZXe8cvC4ZzYfdqNvrRHxFRyKl42SlCz3jCXSOJdahlmU10IbKQiPT3zu7X3zF+KUKHO+bf76/VDZMpvqnsRVoq2a+eVG3+BgV6H3o/IOPZ33ldjQf2ta6u/VdC4PjxLivG/pLSRC9TGKZSZnHuHtUK/Rxjiz/MLiibYbff1njYVXrkxR1Ao1hEf8rZg5F5pJc2zPLWcPifW0zYUlRQyhGzNx/MbzIt0c/s7aqd9iC0QVcnjxQDMCfyph8ZnCBDdPirdfUE7agOoXGsFwMJMDMD38vk01R+yVl6la+R/gXgIgiRHSaiCIAoGeTVwDyFxXoZvoFTTryX8mSrK0AAAAASUVORK5CYII=",
        convo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAgElEQVR42mNgoBrIPSfKUnR+HWvRuW9A/J8I/A2kHqQPbgZL4bnVRGpGwSB9cEOAAj/JMQSkD9mQ/+TiUUPwG/KB8tgpPLeITEOWIlJs4RUhoMAKElwEUrcCpA9nLsCaMkNXMZOUlSg2ANkQsAH1V9jIytRgA0C5lFwDwLmaRAMAoKuVhOxa4yIAAAAASUVORK5CYII="
    },
    
    expanded: false,
    
    start:function(){
        
        window.OSNH.log('Starting Tray extension');
        
        window.OSNH.injectCSS([
            '#osnh-tray-tab{margin-left:-1px;position:fixed;left:0;top:50%;width:40px;height:64px;margin-top:-32px;border:1px solid gainsboro;z-index:100;',
            'background:url('+TRAY.imgs.mailbox+') white 50% 50% no-repeat;border-left:none;}',
            '#osnh-tray-panel{-moz-box-sizing: border-box; -webkit-box-sizing: border-box;box-sizing:border-box;padding:5px;position:fixed;left:-200px;top:0;width:200px;height:100%;border-right:1px solid gainsboro;z-index:99;background-color:white;}',
            '.osnh-tray-item{overflow:hidden;padding-left:20px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid gainsboro;}',
            '.osnh-type-person{background:url('+TRAY.imgs.person+') 0 0 no-repeat;}',
            '.osnh-type-flag{background:url('+TRAY.imgs.flag+') 0 0 no-repeat;}',
            '.osnh-type-convo{background:url('+TRAY.imgs.convo+') 0 0 no-repeat;}',
            '.osnh-tray-badge{padding: 0 3px 1px 3px;float:right;background-color: #0572ce;border: 1px solid #0572ce;border-radius: 3px;color: #fff !important;font-weight: bold;}',
            '.osnh-tray-item > a:hover{text-decoration:underline;}',
            '#osnh-tray-total{position:absolute;top:-0.6em;left:32px;padding: 0 3px 1px 3px;background-color: #0572ce;border: 1px solid #0572ce;border-radius: 3px;color: #fff !important;font-weight: bold;}',
        ]);

        window.OSNH.injectHTML([
            '<div id="osnh-tray-tab"><div id="osnh-tray-total">?</div><img id="osnh-tray-busy" src="'+TRAY.imgs.busy+'" style="margin-left:8px;margin-top:20px;width:24px;height:24px;"/></div>',
            '<div id="osnh-tray-panel">',
                '<div id="osnh-tray-content"></div>',
            '</div>'
        ]);
        
        $('#osnh-tray-tab').mouseenter(TRAY.showSidebar);
        $('#osnh-tray-panel').mouseleave(TRAY.hideSidebar);
        
        TRAY.getUnreadMessages(0);
    },
    
    hideSidebar:function(){
        if(TRAY.expanded){
            $('#osnh-tray-tab').animate({
                left:"0"
            },200,'swing',function(){TRAY.expanded = false;});
            $('#osnh-tray-panel').animate({
                left:"-200px"
            },200,'swing');
        }
    },
    
    showSidebar:function(){
        if(!TRAY.expanded){
            $('#osnh-tray-tab').animate({
                left:"200px"
            },200,'swing',function(){TRAY.expanded = true;});
            $('#osnh-tray-panel').animate({
                left:"0px"
            },200,'swing');
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
                
                for(var c = 0;c < obj.items.length;c++){
                    TRAY.unreadList.push(obj.items[c]);
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

                for(var c = 0;c < obj.items.length;c++){
                    TRAY.unreadList.push(obj.items[c]);
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

                for(var c = 0;c < obj.items.length;c++){
                    TRAY.unreadList.push(obj.items[c]);
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
    
    postProcessUnreadDisplay: function(){
    
        for(var m = 0;m < TRAY.unreadList.length;m++){
            if(typeof(TRAY.unreadList[m].postProcessed) === 'undefined'){
            
                if(TRAY.unreadList[m].objectType == 'waggle/conversation-followup'){
                    window.OSNH.ajax({
                        method:'GET',
                        resource:TRAY.unreadList[m].messageURL,
                        callback:function(obj){
                            var it = TRAY.unreadList[m];
                            
                            TRAY.unreadList[m].postProcessed = true;
                            TRAY.unreadList[m].name = it.createdByUserDisplayName+' - '+obj.plainText.substring(0,50) ;
                            if(obj.plainText.length > 50){
                                TRAY.unreadList[m].name += '&hellip;';
                            }
                            TRAY.unreadList[m].modifiedDate = obj.modifiedDate;
                            
                            TRAY.unreadList[m].hashValue = 'conversation:id='+TRAY.idFromEnd(it.conversationURL)+'&sid='+TRAY.idFromEnd(it.messageURL)+'&m=MESSAGES';
                            TRAY.unreadList[m].itemType = 'flag';
                            
                            TRAY.postProcessUnreadDisplay();
                        }
                    });
                }   
                else if(TRAY.unreadList[m].objectType == 'waggle/wall'){
                    TRAY.unreadList[m].postProcessed = true;
                    TRAY.unreadList[m].name = 'Wall of ' + TRAY.unreadList[m].name;
                            
                    TRAY.unreadList[m].hashValue = 'user:userId='+TRAY.idFromEnd(TRAY.unreadList[m].modifiedByURL)+'&m=WALL';
                    TRAY.unreadList[m].itemType = 'person';
                            
                    setTimeout(TRAY.postProcessUnreadDisplay,1);
                }
                else if(TRAY.unreadList[m].objectType == 'waggle/conversation'){
                    TRAY.unreadList[m].postProcessed = true;
                            
                    TRAY.unreadList[m].hashValue = 'conversation:id='+TRAY.idFromEnd(TRAY.unreadList[m].url)+'&m=NOT_SET';
                    TRAY.unreadList[m].itemType = 'convo';
                            
                    setTimeout(TRAY.postProcessUnreadDisplay,1);
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
    
    refreshUnreadDisplay: function(){
    
            $('#osnh-tray-busy').hide();
            $('#osnh-tray-content').html('');
            
            TRAY.unreadList.sort(function(a,b){
                if(a.modifiedDate < b.modifiedDate) return -1;
                else if(a.modifiedDate > b.modifiedDate) return 1;
                else return 0;
            });
            
            var title = window.document.title;
            if(title.indexOf(']') != -1){
                title = title.substring(title.indexOf(']')+2);
            }
            
            if(TRAY.unreadList.length === 0){
                $('#osnh-tray-total').hide();
                $('#osnh-tray-content').append('<div class="osnh-tray-item">No unread messages</div>');
            }
            else{
                var total = 0;
                
                for(var m = 0;m < TRAY.unreadList.length;m++){
                    var it = TRAY.unreadList[m];
                    var badge = '';
                    
                    if(typeof(it.nUnread) !== 'undefined'){
                        badge='<div class="osnh-tray-badge">'+it.nUnread+'</div>';
                        total += it.nUnread;
                    }
                    else total++;
                    
                    $('#osnh-tray-content').append('<div class="osnh-tray-item osnh-type-'+it.itemType+'">'+badge+'<a href="#'+it.hashValue+'">'+it.name+'</a></div>'); 
                }
                
                $('#osnh-tray-total').html(total);
                $('#osnh-tray-total').show();
                
                title = '[' + total + '] ' + title;
            }
            
            window.document.title = title;
            
            setTimeout(function(){
                TRAY.getUnreadMessages(0);
            },10000);
    }
};

window.OSNH.tray = TRAY;
window.OSNH.tray.start();