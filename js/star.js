
document.getElementById("PrintStarDemoReceipt").addEventListener("click", PrintStarDemoReceipt);
document.getElementById("setPrinterPort").addEventListener("click", setPrinterPort);
document.getElementById("searchPrinter").addEventListener("click", searchPrinter);


document.getElementById("getFirmwareInfo").addEventListener("click", getFirmwareInfo);
document.getElementById("getPortName").addEventListener("click", getPortName);
document.getElementById("getPortSettings").addEventListener("click", getPortSettings);
document.getElementById("getStarIOVersion").addEventListener("click", getStarIOVersion);
document.getElementById("releasePort").addEventListener("click", releasePort);
document.getElementById("ClearOutput").addEventListener("click", ClearOutput);

function ClearOutput(){
   document.getElementById("TextField").value="bingo";
   document.getElementById("SuccessField").value=' ';

}

function searchPrinter(){
    var target=document.getElementById("TextField").value;
   document.getElementById("TextField").value=EloStarPrinterManager.searchPrinter(target);
}

function getFirmwareInfo(){
      var ObtainedPort=EloStarPrinterManager.getPort("",10000);
      if (ObtainedPort == true){
          document.getElementById("TextField").value=EloStarPrinterManager.getFirmwareInformation();
          document.getElementById("SuccessField").value=EloStarPrinterManager.releasePort();
      }
      else{
          document.getElementById("SuccessField").value="Error";
      }
      
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
          document.getElementById("SuccessField").value=EloStarPrinterManager.releasePort();
}


function PrintStarDemoReceipt(){
   document.getElementById("TextField").value=EloStarPrinterManager.printStarDemoReceipt();
}

function setPrinterPort(){
   var target=document.getElementById("TextField").value;
   if(target.length > 1 && target.charAt(0) == '[' && target.charAt(target.length-1) == ']') {
        target = target.slice(1, -1).split(',')[0];
    }   
   document.getElementById("SuccessField").value=EloStarPrinterManager.setPrinterPort(target);
}


