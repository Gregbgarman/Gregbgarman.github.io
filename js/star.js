
document.getElementById("PrintStarDemoReceipt").addEventListener("click", PrintStarDemoReceipt);
document.getElementById("ConnectPrinter").addEventListener("click", ConnectPrinter);


document.getElementById("getPort").addEventListener("click", getPort);
document.getElementById("SearchPrinter").addEventListener("click", searchPrinter);
function getPort(){
   document.getElementById("TextField").value=EloStarPrinterManager.getPort();
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


