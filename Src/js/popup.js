
!(function($){
    chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;        

        $("#qr").qrcode({
            width: 200,
            height: 200,
            color: '#3a3',
            text: tablink
        });    
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
            width: 200,
            height: 200,
            color: '#3a3',
            text: contentVal
        });

        $(".modal").modal("hide");
    }); // end of $("#btnGenerate").click(function(){

    window.clearCanvas = function(id){
        var qrCanvas = document.getElementById(id).firstChild;
        
        qrCanvas.remove();
    }
})(jQuery); // end of !(function($){