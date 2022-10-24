
document.getElementById("PrintStarDemoReceipt").addEventListener("click", PrintStarDemoReceipt);
document.getElementById("SearchStarPrinters").addEventListener("click", searchStarPrinters);
document.getElementById("ConnectPrinter").addEventListener("click", ConnectPrinter);


function PrintStarDemoReceipt(){
   document.getElementById("TextField").value=EloStarPrinterManager.printStarDemoReceipt();
}

function ConnectPrinter(){
   document.getElementById("TextField").value=EloStarPrinterManager.ConnectPrinter();
}

function searchStarPrinters(){
   document.getElementById("TextField").value=EloStarPrinterManager.searchStarPrinters("Bluetooth:");
}
