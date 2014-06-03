
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
})(jQuery); // end of !(function($){