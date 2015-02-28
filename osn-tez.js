if(typeof TEZ != "undefined") {
	TEZ.stop();
}
TEZ = {
	defaultSize: 50,
	tldDefaultSize: 106,
	init: function(){
		this.stop();
		this.interval = setInterval(function(){
			TEZ.scanForEditors();
		},1000);
	},
	stop:function(){
		if(this.interval) clearInterval(this.interval);
	},
	showAllEditors: function(show){

		var frameArr = document.getElementsByTagName("iframe");
		for(var i = 0;i < frameArr.length;i++){
    		if(frameArr[i].getAttribute("class") && frameArr[i].getAttribute("class").indexOf("gwt-RichTextArea") >= 0){
            	frameArr[i].style.visibility = (show)?"visible":"hidden";
            }
        }
	},
	scanForEditors: function(){
        /* Delete sizers if we're somewhere that they're not needed */
        if(window.location.hash.indexOf("m=DOCUMENTS") != -1 ||
           (window.location.hash.indexOf("#group:groupId") === 0 && window.location.hash.indexOf("m=CONVERSATIONS") != -1)){
            var sizers = document.getElementsByClassName('rte-sizer');
            for(var sz = 0;sz < sizers.length;sz++){
                sizers[sz].parentNode.removeChild(sizers[sz]);
                sizers[sz] = null;
            }
        }
        else{
    		var frameArr = document.getElementsByTagName("iframe");
    		for(var i = 0;i < frameArr.length;i++){
        		if(frameArr[i].getAttribute("class") &&  frameArr[i].getAttribute("class").indexOf("gwt-RichTextArea") >= 0){
            		var par = frameArr[i].parentNode;
    				/* Create a sizer for when you're editing a post */
    				if(par.firstChild.getAttribute("class") && par.firstChild.getAttribute("class").indexOf("gwt-HTML") >= 0){
    					if(frameArr[i].nextSibling.getAttribute("class") != 'rte-sizer'){
    						new TEZ.genericSizer({
                 				el: frameArr[i],
                 				cursor: 's-resize',
                 				border: '1px solid gray;margin-top:-6px;margin-bottom:5px;margin-right:-2px;',
                 				addSizer: function(div,el){
                 					el.parentNode.insertBefore(div,el.nextSibling);
    								el.setAttribute("style","margin-bottom:0;");
            					},
            					setSize: function(el,sz){
            						var lsz = (sz == null) ? TEZ.defaultSize : sz;
    								TEZ.defaultSize = lsz;
    					        	el.style.height = lsz + "px";
            					},
            					getSize: function(org,delta){
            						return Math.max(40,org + delta);
    							},
    							initSize: function(el){
    								var h = (el.style && el.style.height)?el.style.height.replace(/px/,""):'50';
    								return parseInt(h);
    							}
                 			});
    					}
    				}
    				/* Create a sizer for when you're replying to a post */
            		else if(par.getAttribute("class") === null){
            			//if(par.parentNode.nextSibling.getAttribute("class") != 'rte-sizer'){
                 		if(par.parentNode.lastChild.getAttribute("class") != 'rte-sizer'){
                     		new TEZ.genericSizer({
                 				el: par,
                 				cursor: 's-resize',
                 				border: '1px solid #B5B6B5;margin-left:-1px;margin-right:-1px;',
                 				//border: '1px solid #FF0000;border-top: none;',
                     			addSizer: function(div,el){
                 					// el.parentNode.parentNode.insertBefore(div,el.parentNode.nextSibling);
                                    el.parentNode.appendChild(div);
            					},
            					setSize: function(el,sz){
            						var lsz = (sz == null) ? TEZ.defaultSize : sz;
    								TEZ.defaultSize = lsz;
    					        	el.setAttribute("style","width: 100%; height: " + lsz + "px;");
            						el.parentNode.setAttribute("style","height:" + lsz +"px;margin-bottom:16px;");
            					},
            					getSize: function(org,delta){
            						return Math.max(40,org + delta);
    							},
    							initSize: function(el){
    								return parseInt(el.style.height.replace(/px/,""));
    							}
                 			});
                 		}
            		}
            		else {
            			var tld = frameArr[i].parentNode;
            			while(tld){
            				if(tld.getAttribute && 
            					    tld.getAttribute("tabindex") && 
            					    tld.getAttribute("tabindex") == '0'
            				){
    							/* Create the sizer for the bottom-aligned editor in a Conversation */
            					if(tld.parentNode.style && tld.parentNode.style.position == 'absolute'){
            					    if($('.gwt-Label.GE0BIW3BI2C').length == 0){ // Quick hack to stop the sizer loading if there's a conference in progress
                						if(tld.parentNode.parentNode.firstChild.getAttribute("class") != 'rte-sizer'){
                							new TEZ.genericSizer({
                								el: tld.parentNode.parentNode,
                								cursor: 'n-resize',
                								border: 'none;border-top:1px solid #B5B6B5',
                								addSizer: function(div,el){
                							    	el.firstChild.style.top = '13px';
        									    	el.insertBefore(div,el.firstChild);
        										},
        										setSize: function(el,sz){
        											var lsz = (sz == null) ? TEZ.tldDefaultSize : sz;
        											TEZ.tldDefaultSize = lsz;
        											el.style.height =  lsz + 'px';
        											el.nextSibling.style.bottom = lsz + 'px';
        											el.nextSibling.nextSibling.style.bottom = lsz + 'px';
        										},
        										getSize: function(org,delta){
        											return Math.max(100,org - delta);
        										},
        										initSize: function(el){
        											return parseInt(el.style.height.replace(/px/,""));
        										}
                							});
                						}
                						else{
                							this.checkForResizeHidden(tld.parentNode.parentNode);
                						}
            					    }
            						break;
            					}
    							/* Create the sizer for a top-aligned editor on a Wall */
            					else{ 
                                    if(window.location.hash.indexOf("#group:") == 0){
                                        /* Group wall */
                                        tld = tld.parentNode.parentNode;
                                        tld.firstChild.style.height = '100%';
                    					if(tld.parentNode.lastChild.getAttribute("class") != 'rte-sizer'){
        	        						new TEZ.genericSizer({
        	        							el:tld,
        	        							cursor: 's-resize',
                								border: '1px solid #B5B6B5;border-radius:3px;margin-top:4px;',
                                                addSizer: function(div,el){
        	        								el.parentNode.appendChild(div);
        										},
        										setSize: function(el,sz){
        											var lsz = (sz == null) ? TEZ.tldDefaultSize : sz;
        											TEZ.tldDefaultSize = lsz;
        											el.style.height =  lsz + 'px';
        										},
        										getSize: function(org,delta){
        											return Math.max(100,org + delta);
        										},
        										initSize: function(el){
        											return parseInt(el.style.height.replace(/px/,""));
        										}
        	        						});
        	        					}
                                    }
                                    else {
                					    /* Person or Collection wall */
                                        tld = tld.parentNode;
                						if(tld.parentNode.lastChild.getAttribute("class") != 'rte-sizer'){
                                            var extra = (window.location.hash.indexOf("#user:") == 0) ? "margin-right:5px;" : "";
        	        						new TEZ.genericSizer({
        	        							el:tld,
        	        							cursor: 's-resize',
                								border: '1px solid #B5B6B5;border-radius:3px;margin-top:2px;' + extra,
                                                addSizer: function(div,el){
        	        								el.parentNode.appendChild(div);
        										},
        										setSize: function(el,sz){
        											var lsz = (sz == null) ? TEZ.tldDefaultSize : sz;
        											TEZ.tldDefaultSize = lsz;
        											el.style.height =  lsz + 'px';
        										},
        										getSize: function(org,delta){
        											return Math.max(100,org + delta);
        										},
        										initSize: function(el){
        											return parseInt(el.style.height.replace(/px/,""));
        										}
        	        						});
        	        					}
                                    }
            						break;
            					}
            				}
            				tld = tld.parentNode;
            			}
            		}
            	}
        	}
        }
    },
    checkForResizeHidden: function(el){
    	if(el.firstChild.nextSibling.style.top == '0px'){
    		el.firstChild.nextSibling.style.top = '13px';
    		
    		el.style.height =  TEZ.tldDefaultSize + 'px';
			el.nextSibling.style.bottom = TEZ.tldDefaultSize + 'px';
			el.nextSibling.nextSibling.style.bottom = TEZ.tldDefaultSize + 'px';
    	}
    },
    genericSizer: function(cfg){
    	
    	this.cfg = cfg;
    	
    	this.div = document.createElement("div");
        this.div.setAttribute("class","rte-sizer");
    	this.div.innerHTML="::::::::::";
        this.div.setAttribute("style","text-align:center;font-weight:bold;font-size:8px;background-color:powderBlue;color:gray;cursor:"+this.cfg.cursor+";border:" + this.cfg.border +";");
        
        this.par = this.cfg.el;
        this.cfg.addSizer(this.div,this.par);
                 
		this.rteSize = 0;
        this.startPos = 0;
        
        this.cfg.setSize(this.par);
        
        var thiz = this;
         
        this.moveMouse = function(evt){
                 
        	var newSize = thiz.cfg.getSize(thiz.rteSize,evt.screenY - thiz.startPos);
			thiz.cfg.setSize(thiz.par,newSize);            
            
            evt.preventDefault();
        };
                 
        this.captureMouse = function(evt){
            
            thiz.startPos = evt.screenY;
            thiz.rteSize = thiz.cfg.initSize(thiz.par);
        
            TEZ.showAllEditors(false);
            
            document.addEventListener("mousemove",thiz.moveMouse,true);
            document.addEventListener("mouseup",thiz.releaseMouse,true);
            
            evt.preventDefault();
        };
                 
        this.releaseMouse = function(evt){
            
            TEZ.showAllEditors(true);
            
            document.removeEventListener("mousemove",thiz.moveMouse,true);
            document.removeEventListener("mouseup",thiz.releaseMouse,true);
            
            evt.preventDefault();
        };
                 
        this.div.addEventListener("mousedown",this.captureMouse,true);    
    }
}
TEZ.init();