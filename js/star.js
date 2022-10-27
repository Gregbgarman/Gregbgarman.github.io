
document.getElementById("PrintStarDemoReceipt").addEventListener("click", PrintStarDemoReceipt);
document.getElementById("ConnectPrinter").addEventListener("click", ConnectPrinter);
document.getElementById("getPort").addEventListener("click", getPort);
document.getElementById("searchPrinter").addEventListener("click", searchPrinter);


function getPort(){
   var target=document.getElementById("TextField").value;
   if(target.length > 1 && target.charAt(0) == '[' && target.charAt(target.length-1) == ']') {
        target = target.slice(1, -1).split(',')[0];
    }
   document.getElementById("TextField").value=EloStarPrinterManager.getPort(target,"",10000);
}


function searchPrinter(){
   document.getElementById("TextField").value=EloStarPrinterManager.searchPrinter("USB:");
}





function PrintStarDemoReceipt(){
   document.getElementById("TextField").value=EloStarPrinterManager.printStarDemoReceipt();
}

function ConnectPrinter(){
   document.getElementById("TextField").value=EloStarPrinterManager.ConnectPrinter();
}


