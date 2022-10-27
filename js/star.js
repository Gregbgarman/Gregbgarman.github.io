
document.getElementById("PrintStarDemoReceipt").addEventListener("click", PrintStarDemoReceipt);
document.getElementById("ConnectPrinter").addEventListener("click", ConnectPrinter);
document.getElementById("getPort").addEventListener("click", getPort);
document.getElementById("searchPrinter").addEventListener("click", searchPrinter);


function getPort(){
   var target=document.getElementById("TextField").value;
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


