
!(function($){
    window.background = null;
    window.fill = "#000";
    window.maxlength = 2900;

    window.clearCanvas = function(id){
        var qrCanvas = document.getElementById(id).firstChild;
        
        qrCanvas.remove();
    }

    window.utf16to8 = function (str) {
        var out, i, len, c;  
        out = "";  
        len = str.length;  
        for (i = 0; i < len; i++) {  
            c = str.charCodeAt(i);  
            if ((c >= 0x0001) && (c <= 0x007F)) {  
                out += str.charAt(i);  
            } else if (c > 0x07FF) {  
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
            } else {  
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
            }  
        }  
        return out;  
    } 

    window.checkContent = function(len){        
        if (len > maxlength){
            return false;
        }

        return true;
    }

    window.getSize = function(len){
        var size = 200;

        if (len > 400 && len < 500){
            size = 500;
        }

        if (len >= 500){
            size = 550;
        }

        return size;
    }

    chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;  
        var text = utf16to8(tablink);
        var len = text.length;
        var size = getSize(len);

        if (!checkContent(len)){
            alert("已超出" + (len - window.maxlength).toString() + "个字。（一个中文算3个字，一个英文算一个）");
            return;
        }

        $("#qr").qrcode({
            size: size,
            background: background,   
            fill: fill,         
            text: text
        }); 
    }); // end of chrome.tabs.getSelected(null,function(tab) {

    $("#txtCstmContent").attr("maxlength", maxlength);
    $("#btnGenerate").click(function(){
        var $content = $("#txtCstmContent");
        var contentVal = $.trim($content.val());

        if (contentVal.length == 0){
            $content.focus();
            $content.css("border-color", "red");
            return;
        }

        $content.css("border-color", "green");

        var text = utf16to8(contentVal);
        var len = text.length;
        var size = getSize(len);

        if (!checkContent(len)){
            alert("已超出" + (len - window.maxlength).toString() + "个字。（一个中文算3个字，一个英文算一个）");
            return;
        }

        clearCanvas("qr");

        $("#qr").qrcode({
            size: size,
            background: background,
            fill: fill,
            text: text
        });

        $(".modal").modal("hide");
    }); // end of $("#btnGenerate").click(function(){ 
})(jQuery); // end of !(function($){