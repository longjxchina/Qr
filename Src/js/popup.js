
!(function($){
    chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;        

        $("#qr").qrcode({
            width: width,
            height: width,
            color: '#3a3',            
            text: utf16to8(tablink)
        });  

        $("#qr canvas").width(width);
        $("#qr canvas").height(width);
    }); // end of chrome.tabs.getSelected(null,function(tab) {

    $("#btnGenerate").click(function(){
        var $content = $("#txtCstmContent");
        var contentVal = $.trim($content.val());

        if (contentVal.length == 0){
            $content.focus();
            $content.css("border-color", "red");
            return;
        }

        $content.css("border-color", "green");

        clearCanvas("qr");
        $("#qr").qrcode({
            width: width,
            height: width,
            color: '#3a3',
            text: utf16to8(contentVal)
        });

        $("#qr canvas").width(width);
        $("#qr canvas").height(width);
        $(".modal").modal("hide");
    }); // end of $("#btnGenerate").click(function(){

    window.width = 200;

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
})(jQuery); // end of !(function($){