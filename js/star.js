
document.getElementById("PrintStarDemoReceipt").addEventListener("click", PrintStarDemoReceipt);
document.getElementById("ConnectPrinter").addEventListener("click", ConnectPrinter);
document.getElementById("getPort").addEventListener("click", getPort);
document.getElementById("searchPrinter").addEventListener("click", searchPrinter);


document.getElementById("getFirmwareInfo").addEventListener("click", getFirmwareInfo);
document.getElementById("getPortName").addEventListener("click", getPortName);
document.getElementById("getPortSettings").addEventListener("click", getPortSettings);
document.getElementById("getStarIOVersion").addEventListener("click", getStarIOVersion);
document.getElementById("releasePort").addEventListener("click", releasePort);



function getPort(){
   var target=document.getElementById("TextField").value;
   if(target.length > 1 && target.charAt(0) == '[' && target.charAt(target.length-1) == ']') {
        target = target.slice(1, -1).split(',')[0];
    }
   document.getElementById("TextField").value=EloStarPrinterManager.getPort(target,"",10000);
}


function searchPrinter(){
    var target=document.getElementById("TextField").value;
   document.getElementById("TextField").value=EloStarPrinterManager.searchPrinter(target);
}

function getFirmwareInfo(){
      document.getElementById("TextField").value=EloStarPrinterManager.getFirmwareInformation();
}

function getPortName(){
         document.getElementById("TextField").value=EloStarPrinterManager.getPortName();
}

function getPortSettings(){
            document.getElementById("TextField").value=EloStarPrinterManager.getPortSettings();
}

function getStarIOVersion(){
          document.getElementById("TextField").value=EloStarPrinterManager.getStarIOVersion();
}

function releasePort(){
          document.getElementById("TextField").value=EloStarPrinterManager.releasePort();
}


function PrintStarDemoReceipt(){
   document.getElementById("TextField").value=EloStarPrinterManager.printStarDemoReceipt();
}

function ConnectPrinter(){
   document.getElementById("TextField").value=EloStarPrinterManager.ConnectPrinter();
}


