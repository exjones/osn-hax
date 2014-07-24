/* 
Clipboard access hacked together from a variety of places, like;

http://joelb.me/blog/2011/code-snippet-accessing-clipboard-images-with-javascript/
http://strd6.com/2011/09/html5-javascript-pasting-image-data-in-chrome/
http://www.vettyofficer.com/2012/11/how-to-paste-image-from-clipboard-using.html
*/

/* 
Icons by Mark James
http://www.famfamfam.com/lab/icons/silk/
*/

/* 
Images converted to Base64 here;
http://webcodertools.com/imagetobase64converter
*/

/*
By: broofa [http://stackoverflow.com/users/109538/broofa]

An rfc4122 version 4 compliant GUID generator
*/
function guid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/*
By: Jeremy Banks
From: http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
*/
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 1024;

    function charCodeFromCharacter(c) {
        return c.charCodeAt(0);
    }

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = Array.prototype.map.call(slice, charCodeFromCharacter);
        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

/*
By: Ed Jones

An extension to OSN to allow for easier image upload/embed in messages
*/
console.log("Starting OSN-IMG...");

var OMG = function(){
    this.galleryId = null;
    this.offset = 0;
    this.count = 40;
    this.api = null;
    this.key = null;
    this.user = null;
    this.uploadDlg = null;
    this.uploadDlgShim = null;
    this.uploadData = null;
    this.uploadFile = null;
    this.documentList = null;
    this.currDoc = -1;
};

OMG.log = function(obj){console.log(obj);};
OMG.txt = function(obj){OMG.log(obj);$('#dlgStatus').text(obj);};

OMG.galleryPrefix = '# Public gallery for ';
OMG.editorClass = 'gwt-RichTextArea';
OMG.buttonClass = 'osn-img-btn';
OMG.buttonStyle = "background: no-repeat 50% 50% url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90IAQUQAdG2adkAAALiSURBVDjLfdTPi1ZVHAbwz3Pnbcb5ZY6iEypCRYsW1TIIiwLHFkarIIL+BjNp1cJVP6ioTGhbm6gQIiICfxQtA4mEkCAqKLVophKzGXNm3vf9tpgzk5B04XLuOfec5z7f53m+N/7vOnS6k4yAKm0ceGP/0OHPee2h/xyJgyc59vB/wQ6eGNON3COZaEDLGMGK5KzX963eiENvA+ypU1sxK7ni6NzP0u3GLsNhH+MN7IJki6pZXLwRYNbYnNyj6/bia1V9yX04jwkcxRZcwJd4D0uOzn1xY4ZPf9pTNYcxyR2YkGxW9SfulmzC5abhnapmdN2yQ6cfk6yq6uNWyXc43VM1gkUcV3UL+qpWsRv7Vc1gCZOYlhxQ9QLOt7Ol6hSexGhPMlR1Dc9JDqq62tam1kTJV/i2mXI7DkieUDUq+V3VOI5IzmHYU5Um+IKqP9CpmsQlvKrqbNO1VM1L7lf1DD7DR03jfsPR29ByreyL2NHMehZ/4ZhkGr9Kvlf1iuSD5vxiI7PoOiDoo3Czqu2SH/Ax3sZtbc90c/1RHMebhsPHJVMN5yboJOvx2SzZKYnkTBN8p2RZknZgVvKAZF5VX9fNYBnXJCsSXft6YbTRH2LXdc+LGDQWY219FJva+yWsrJfctXxVa6+0cabF5ISqgapqVYzhE1V7MK3qCn5DVI2q2tAw7R62cVZyWNXLkj72qRqTvNv0e1Ey29hvbnIM10xJqOphSbKsalyyXdUjkm2S53XdEYNBcC/eatHpJOOqLjUvBmuA/5Y82koetLUZPKhqr8FggGttX1qp423fFmxuwOk1B8dUnZG8pGpScrX18raWgmVVC82YSUlUrbae34Fzku3rDIO7VC2o+gUrzYRJ/NjacgRTze359n5K1WX81H4aq+ut18c3krkGMoutLexTLcwTLR5/NwOWcLXN57GAD1UNeqRPvYP3WymdpNuIypokafP1tVI1bIYOm8MDDP8BTNhWoiaIa90AAAAASUVORK5CYII=);";
OMG.uploadId = 'osn-img-dlg';
OMG.placeholder = 'data:image/jpeg;base64,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';
OMG.defaultDlgStatus =  'Browse images, paste from clipboard, or upload.';
OMG.styleHacks = 'div.GE0BIW3BFCB img,div.GE0BIW3BG4 img{height: auto;} #osn-paste-target img {width:0px;height:0px;visibility:hidden;display:none;}';
OMG.pasteTargetId = 'osn-paste-target';
OMG.pasteTargetContent = '';
OMG.pasteTargetBack = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZPNS5RRFMZ/577v+L5jmlmNoBgE4iLIWkgxmTtx4R8QLXLRB1GYG4lAwlWkCH1sShcRuIgWYUQoBIUVgojLyowWLSRhSCNtchzn672nxYxT6hRBD/cuzuW5D+c5H6Kq/A9cgM6+0VtBTk4tJwM/kS7BspvDsAc7w4w8uXGyxwUIrHRev9AcqYlERMRFAS3+E1RBdSNWglyGs9eenwbyAsuJwIvsjUjX7QfU7duF51gC9cBUYYT8NYJjhM8fZ+nvuUg2EClaSKbBGJfGhv0cjLbiGAfVAMQFEYwIIgZjDCHHYO2WGmzY9DwfP1yRz/cv0KLJLQLZTIpsah1EULVYDbDWIICq4khALpNE1W7PQBW+xmN8W4qTtTmsBvxIL5IJ6pECp8ZbYX0tDmpKC3xZLCe0kPr1oBFUU0XyCmEWFnT7HNgC3zhlGMcr6TtITJBLvKK6+jtX7z/ElDV4cGJzBn9COv6MPZXTNDcfpX53I6/nnrL+ftKPdtfddAHUWgRYmp8rKRAKPabtSAeBCThc287Eh1GiTS3Mfxq75OZnLd+coYG+YvQ7rtzpJyQVdBw4B8DltnuMzw4DY74LsDNs4jaXqqotl3wLC4KFw+panLnYNG9jU/S2jzD44gx+vlYpF2CHZx6dH3h5LJnVJmtL7dJxf+bdtNdyqJXx2WHKxGXqzSTAkPzrOke76waBLqASWAWGZ+7Gen8CJf/dMYh8E3AAAAAASUVORK5CYII=)";

OMG.prototype.ajax = function(obj){

    $.ajax({ 
        type: obj.method, 
        url: this.api + obj.resource, 
        data: (obj.method == 'GET' || typeof obj == 'string') ? obj.data : JSON.stringify(obj.data), 
        contentType:"application/json; charset=utf-8", 
        beforeSend: function (request){request.setRequestHeader("X-Waggle-RandomID", window.osn_img.key);},
        success: obj.success,
        error: function(jqXHR, textStatus, errorThrown) { 
            OMG.log("Ajax Error: "+ textStatus + ": " + errorThrown);
        }
    });
};

OMG.prototype.installjQueryUi = function(){
    
    var el=document.createElement("script");
    el.id="OSN_IMG.jQueryUi.src";
    el.type="text/javascript";
    el.onload=function(){
        
        try{
            window.osn_img.uploadDlg.draggable({containment:'#shim_'+OMG.uploadId});
        }
        catch(ex){
            console.log("Exception making dialog draggable: " + ex);
        }
        
        document.body.removeChild(document.getElementById("OSN_IMG.jQueryUi.src"));
    };
    el.src="https://stbeehive.oracle.com/content/dav/st/osn-hax/js/jquery-ui-1.10.3.custom.min.js";
    document.body.appendChild(el);
};

OMG.prototype.init = function(){
    
    this.api = /*window.location.origin + */ window.location.pathname.substring(0,window.location.pathname.indexOf('/',1)) + '/social/api/v1/';
    this.key = window.Oracle.OSN.randomId;
    
    OMG.log("Initializing OSNIMG with API at " + this.api);
    
    this.ajax({
        method:'GET',
        resource:'connections',
        success:function(data){
            if(data && data.user && data.user.name){

                window.osn_img.user = data.user.name;
                OMG.log("Connected as: " + window.osn_img.user);
                
                window.osn_img.scheduleCheck();
            }
        }
    });
    
    $('head').append('<style type="text/css">'+OMG.styleHacks+'</style>');
        
    $('body').prepend(
        '<div id="shim_'+OMG.uploadId+'" style="position:fixed;z-index:190;background-color:black;opacity:0.1;width:100%;height:100%;top:0;left:0"></div>'
    );
    
    $('body').append(
        '<div id="'+OMG.uploadId+'" style="position:absolute;z-index:200;border:1px solid black;padding:10px;background-color:white;box-shadow: 0 0 5px 1px orange;border-radius:10px;">'+
            '<div id="'+OMG.pasteTargetId+'" title="Paste an image here..." autocapitalize="off" autocorrect="off" autocomplete="off" contenteditable="true" style="border-top-right-radius:5px;border-top-left-radius:5px;overflow:hidden;color:transparent;font-size:0px;border: 1px solid black;width:100%;background:lightGray '+OMG.pasteTargetBack+' 50% 50% no-repeat;opacity:0.5;height:20px;margin-bottom:10px;">'+OMG.pasteTargetContent+'</div>' +
            '<form name="uploadForm" id="uploadForm">'+
                '<table>'+
                    '<tbody>'+
                        '<tr>'+
                            '<td align="left" style="width:5em;vertical-align:middle;"><a title="Previous gallery image" id="prevGalleryImg" class="gwt-Anchor GMD1YCMBHTC osn_button_primary osn_button_textOnly osn_button_ignoreShadow" href="javascript:;" onclick="window.osn_img.prevGalleryImg(); return false;" >&laquo;</a></td>' +
                            '<td align="center" style="vertical-align:middle;width:320px;height:200px;"><img id="uploadPreview" style="max-width: 320px; max-height: 200px;" src="'+OMG.placeholder+'" alt="Image Preview" /></td>'+
                            '<td align="right" style="width:5em;vertical-align:middle;"><a title="Next gallery image" id="nextGalleryImg" class="gwt-Anchor GMD1YCMBHTC osn_button_primary osn_button_textOnly osn_button_ignoreShadow" href="javascript:;" onclick="window.osn_img.nextGalleryImg(); return false;" >&raquo;</a></td>' +
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="3"><div id="dlgStatus" style="width:100%;overflow:hidden;">'+OMG.defaultDlgStatus+'</div></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="3"><input id="uploadImage" type="file" name="uploadImage" onchange="window.osn_img.previewImageFile();" /></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="3" align="right">'+
                                '<a id="insertButton" class="gwt-Anchor GMD1YCMBHTC osn_button_primary osn_button_textOnly osn_button_ignoreShadow" href="javascript:;" title="Upload and insert image">Insert</a>&nbsp;'+
                                '<a class="gwt-Anchor GMD1YCMBHTC osn_button_secondary osn_button_textOnly osn_button_ignoreShadow" href="javascript:;" onclick="window.osn_img.showUploadDlg(false); return false;" title="Cancel the upload">Cancel</a>'+
                            '</td>'+
                        '</tr>'+
                    '</tbody>'+
                '</table>'+
            '</form>'+
        '</div>'
    );
    
    this.uploadDlg = $($('#'+OMG.uploadId).get(0));
    this.uploadDlgShim = $($('#shim_'+OMG.uploadId).get(0));
    this.showUploadDlg(false);
    
    this.uploadDlgShim.click(function(){
        window.osn_img.showUploadDlg(false); 
    });
    
    // Seems to be already available!
    try{
        this.uploadDlg.draggable({containment:'#shim_'+OMG.uploadId});
    }
    catch(ex){
        console.log("Unable to make dialog draggable, trying to load jQueryUi");
        this.installjQueryUi();
    }
    
    this.uploadDlg.on('paste',function(evt){
        OMG.log("Caught paste event");
        window.osn_img.handlePaste(evt);
    });
};

OMG.prototype.handlePaste = function(evt){
    
    var readerLoaded = function(evt){
        // The URL can then be used as the source of an image
        window.osn_img.createPastedImage(evt.target.result);
    };
    var clipboardData = evt.clipboardData || evt.originalEvent.clipboardData;
    if (clipboardData && clipboardData.items) {
    
        // Get the items from the clipboard
        OMG.txt("Some clipboard data was pasted...");
            
        // Loop through all items, looking for any kind of image
        for(var i in clipboardData.items) {
            
            if (clipboardData.items[i].type && clipboardData.items[i].type.indexOf("image") !== -1) {
           
                // We need to represent the image as a file,
                OMG.txt("Waiting for file to be created from data...");
                window.osn_img.uploadFile = clipboardData.items[i].getAsFile();
                var reader = new FileReader();
                reader.onload = readerLoaded;
                reader.readAsDataURL(window.osn_img.uploadFile);
                    
                return;
            }
        }
        
        // If we get this far, we've pasted something weird
        OMG.txt("Pasted data wasn't an image?");
        $('#'+OMG.pasteTargetId).html("");
    }
    // If we can't handle clipboard data directly (Firefox),
    // we need to read what was pasted from the contenteditable element
    else {
        // This is a cheap trick to make sure we read the data
        // AFTER it has been inserted.
        OMG.txt("Paste had no clipboard data, checking for image...");
        setTimeout(function(){window.osn_img.checkForPastedImage();}, 250);
    }
};

/* Parse the input in the paste catcher element */
OMG.prototype.checkForPastedImage = function() {
   
    // Look for images in the paste target    
    var children = $('#'+OMG.pasteTargetId+' img');
 
    if (children.length) {
        OMG.txt("Found pasted image...");
        this.createPastedImage(children.attr('src'));
    }
    else{
        OMG.txt("Paste didn't create an image");
        $('#'+OMG.pasteTargetId).html("");
    } 
};
 
/* Creates a new image from a given source */
OMG.prototype.createPastedImage = function(source) {
    
    // Clear the paste target
    $('#'+OMG.pasteTargetId).html("");
    
    OMG.txt("Creating image from pasted data...");
    var pastedImage = new Image();
    pastedImage.onload = function() {
        // You now have the image!
        // May NOT be base64 data URL
        $("#uploadPreview").attr('src',pastedImage.src);
        
        // Save data to upload, if necessary
        OMG.txt("Previewing " + ((source.indexOf("data:") != -1) ? "pasted" : "linked") + " image, size " + pastedImage.naturalWidth + "x" + pastedImage.naturalHeight);
        window.osn_img.uploadData = (source.indexOf("data:") != -1) ? source.substring(5) : source; // Strip off the start "data:image/png;base64," bit if it's a data URL   
    };
    pastedImage.src = source;
};

OMG.prototype.showUploadDlg = function(show){
    
    if(show){
        this.uploadDlg.show();
        this.uploadDlgShim.show();
    }
    else{
        this.uploadDlg.hide();
        this.uploadDlgShim.hide();
    }
};

OMG.prototype.previewImageFile = function(){

    /*
    Mostly stolen from; 
    https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    */
    var oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

    oFReader.onload = function (oFREvent) {
        var img = $('#uploadPreview');
        img.load(function(evt){
            OMG.txt("Previewing uploaded image, size " + img[0].naturalWidth + "x" + img[0].naturalHeight);
            window.osn_img.uploadData = oFREvent.target.result.substring(5); // Strip off the start "data:image/png;base64," bit        
            window.osn_img.uploadFile = $("#uploadImage")[0].files[0];
            
            img.unbind('load');
        });
        $("#uploadPreview").attr('src',oFREvent.target.result);
    };

    if($("#uploadImage")[0].files.length === 0){
        return;
    }
    this.currDoc == -1;
    var oFile = $("#uploadImage")[0].files[0];
    if(rFilter.test(oFile.type)) {
        OMG.txt('New image: ' + oFile.name);
        oFReader.readAsDataURL(oFile);
    }
    else{
        OMG.txt('Please, choose a valid image file');
    }
};

OMG.prototype.updatePreviewImg = function(){

    var c = this.currDoc;
    var l = this.documentList;
    
    if(c >= 0 && c < l.length){
        OMG.txt("Loading preview...");
        var img = $('#uploadPreview');
        img.load(function(evt){
            OMG.txt((c + 1) + '/' + l.length + ": " + l[c].name + ", size " + img[0].naturalWidth + "x" + img[0].naturalHeight);
            img.unbind('load');
        });
        img.attr('src',l[c].downloadURL);
    }
};

OMG.prototype.prevGalleryImg = function(){
    
    this.uploadData = null;
    this.uploadFile = null;
    
    this.currDoc--;
    if(this.currDoc < 0) this.currDoc = this.documentList.length - 1;
    this.updatePreviewImg();
};

OMG.prototype.nextGalleryImg = function(){
    
    this.uploadData = null;
    this.uploadFile = null;
    
    this.currDoc++;
    if(this.currDoc >= this.documentList.length) this.currDoc = Math.min(0,this.documentList.length - 1);
    this.updatePreviewImg();
};

OMG.prototype.uploadImageFile = function(editor){
    
    // Gotta have some data to upload, and a gallery
    if(!this.uploadData || !this.galleryId) {
    
        // Use an existing image
        if(this.currDoc >= 0 && this.currDoc < this.documentList.length){
        
            OMG.txt("Inserting img tag for existing image");
            window.osn_img.insertImageTag(editor,this.documentList[this.currDoc].downloadURL);
        
            return;
        }
    
        OMG.txt('Please, choose an existing image, paste or upload a new one');
        
        return;
    }
    
    // Upload a new image if it's base64
    if(this.uploadData.indexOf("base64,") != -1){
        
        OMG.txt("Uploading image file to gallery...");
        
        if(!this.uploadFile){
            OMG.txt("No file to upload. Trying to reconstruct.");
            var mimeType = this.uploadData.split(';')[0];
            this.uploadFile = b64toBlob(this.uploadData.split(',')[1],mimeType,1024);
        }
        
        this.uploadFile.name = (this.uploadFile.name || 'data_'+guid()).replace(':','.');
        
        // Post the data to the gallery
        var fd = new FormData();    
        fd.append( this.uploadFile.name ,  this.uploadFile, this.uploadFile.name);
    
        $.ajax({
            url: this.api + 'documents/'+this.galleryId,
            data: fd,
            processData: false,
            contentType: false,
            beforeSend: function (request){request.setRequestHeader("X-Waggle-RandomID", window.osn_img.key);},
            type: 'POST',
            success: function(data){
                
                OMG.txt('Image uploaded, inserting img tag...');
                    
                window.osn_img.documentList.push(data[0]);
                window.osn_img.sortDocumentList();
                window.osn_img.insertImageTag(editor,data[0].downloadURL); 
            }
        });
    }
    // Otherwise, just insert an img
    else {
        OMG.txt("Inserting direct link to " + this.uploadData);
        this.insertImageTag(editor,this.uploadData);
    }
};

OMG.prototype.sortDocumentList = function(){
    
    if(!this.documentList || this.documentList.length === 0) return;
    
    this.documentList.sort(function(a,b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    });
};

OMG.prototype.insertImageTag = function(editor,url){

    var ed = $(editor);
    var body = ed.contents().find('body');
    
    if(body.length && url){    
        var img = new Image();
        $(img).load(function(){
            
            window.osn_img.showUploadDlg(false);
            
            // Set the focus to the body, pretend we clicked on it, and wait a bit to hope it removes the default message
            ed.focus();
            ed.trigger("click");
            
            setTimeout(function(){
                
                // Scale to max of 640x480 (for old times sake!) by default
                var w = img.width;
                var h = img.height;
                var s = Math.min( Math.min(1.0,640.0 / w) , Math.min(1.0,480.0 / h) );
                
                w = Math.round(w * s);
                h = Math.round(h * s);
                
                OMG.txt("Inserted image, size " + img.width + "x" + img.height + " ,scaled " + (Math.round(s * 100.0)) + "% = " + w + "x" + h);
                
                // Need a "visible" element to make it Postable
                // <span style="font-size:0px;">.</span>
                // was a clever way of doing that, but screwed up subsequent text entry!
                body.append('<img style="width:'+w+'px !important; height:'+h+'px !important;" src="'+ url +'" />.'); 
                
                // Try and force the edit control to enable the Post button, and move the cursor to the end
                setTimeout(function(){
                    var press = $.Event('keypress');
                    press.ctrlKey = false;
                    press.which = 35; // = End
                    ed.trigger(press);
                },250);
            },250);
        });
        img.src =  url;
    }
};

OMG.prototype.scheduleCheck = function(){
    setTimeout(function(){
        window.osn_img.checkForEditors();
    },1000);
};

OMG.prototype.checkForEditors = function(){
    
    // First make sure we have a gallery to upload stuff to
    if(!this.findGallery()) return;    
    
    // Then, for each editor...
    $('.'+OMG.editorClass).each(function(idx,el){ 
        $(el).parents().each(function(pidx,pel){ // ...for each parent...
            var btn = $(pel).find(':button').get(0); // ...find children which are buttons...
            if(btn){
                window.osn_img.installButton(el,btn); // ...and check to see if we need to install an Image button before it 
                return false;
            }    
        });
    });
    
    this.scheduleCheck();
};

OMG.prototype.installButton = function(editor,button){
    
    // If the button doesn't have our class
    if($(button).not('.'+OMG.buttonClass).length){
        OMG.log("Installing image button...");
        var id = guid();
        $(button).before('<button id="'+id+'" type="button" class="gwt-Button '+OMG.buttonClass+' GMD1YCMBLQ GMD1YCMBNQ GMD1YCMBER" style="'+OMG.buttonStyle+'" title="Insert Image">&nbsp;</button>&nbsp;');
        $('#'+id).click(function(evt){
            window.osn_img.insertImage(id,evt.pageX,evt.pageY,editor);    
        });
    }
};

OMG.prototype.insertImage = function(btn_id,x,y,editor){

    if(this.uploadDlg){
        
        // Make sure we have an editor to talk to
        try {
            var body = $(editor).contents().find('body');
        }
        catch(ex){
            OMG.log("Exception thrown checking for editor body. Re-finding editor.");
            
            var ed = null;
            $('#'+btn_id).parents().each(function(pidx,pel){ // For each parent of this button...
                ed = $(pel).find('.'+OMG.editorClass).get(0); // ...find children which are gwt-RichTextAreas
                if(ed){
                    editor = ed;
                    return false;
                }
            });
            
            if(!ed) {
                OMG.log("Bad: Still not able to find editor for this button. Bailing.");
                return;
            }
        }
        
        $("#uploadPreview").attr("src",OMG.placeholder);
        this.uploadData = null;
        this.uploadFile = null;
        this.currDoc = -1;
        
        $('#uploadForm')[0].reset();
        
        $("#insertButton").unbind("click").click(function(evt){
            window.osn_img.uploadImageFile(editor); 
            evt.preventDefault();
        });
        
        OMG.txt(OMG.defaultDlgStatus);
        $('#'+OMG.pasteTargetId).html(OMG.pasteTargetContent);
        
        this.uploadDlg.css({"top":(y-this.uploadDlg.outerHeight())+"px","left":x+"px"});
        this.showUploadDlg(true);
        
        $('#'+OMG.pasteTargetId).focus();
        $('#'+OMG.pasteTargetId).trigger('click');
    }
};

OMG.prototype.findGallery = function(){

    // Got a gallery and a list of documents in it? We're good to go.
    if(this.galleryId !== null && this.documentList !== null) return true;
    
    // Got a gallery, but no documents? Find them.
    if(this.galleryId !== null) {
        
        this.ajax({
            method: 'GET',
            resource: 'folders/' + this.galleryId,
            success:function(data){
                window.osn_img.documentList = data.documents;
                window.osn_img.sortDocumentList();
                window.osn_img.checkForEditors();
            }
        });
        
        return false;
    }
    
    this.ajax({
        method: 'GET',
        resource: 'conversations',
        data: {
            "offset": this.offset,
            "count":this.count,
            "filter" : JSON.stringify({
                "excludeClosed":true,
                "excludeOneOnOne":true,
                "excludeWalls":true,
                "includeDiscoverable":false,
                "sortField":"CONVERSATION_NAME"
            }),
        },
        success:function(data){
            window.osn_img.processConversationList(data);
        }
    });
    
    return false;
};

OMG.prototype.processConversationList = function(data){

    var thiz = this;
    
    if(data && data.items){
        $.each(data.items,function(key,value){
            OMG.log((key + thiz.offset) + "=" + value.name);
            
            if(value.name == OMG.galleryPrefix + thiz.user){
                
                if(value.createdByUserName == thiz.user){
                    thiz.galleryId = value.folderID;
                    OMG.log('Found gallery: ' + thiz.galleryId);
                
                    return false;
                }
                else{
                    OMG.log("Found a gallery with the right name, but it was created by " + value.createdByUserName);
                }
            }
        });
        
        if(this.galleryId === null){
            if(data.hasMore === false){
                this.offset = 0;
            
                this.ajax({
                    method: 'POST',
                    resource: 'conversations',
                    data: {
                        isDiscoverable: true,
                        name: OMG.galleryPrefix + this.user
                    },
                    success:function(data){
                        thiz.galleryId = data.folderID;
                        OMG.log('Created gallery: ' + thiz.galleryId);
                        
                        // Recheck for editors now we've created the gallery
                        thiz.checkForEditors();
                    }
                });
            }
            else {
                this.offset += this.count;
                
                // See if we can find the gallery conversation further down the list
                this.findGallery();
            }
        }
        else {
            // Recheck for editors with the gallery we found
            this.checkForEditors();
        }
    }
};

window.osn_img = new OMG();
window.osn_img.init();
