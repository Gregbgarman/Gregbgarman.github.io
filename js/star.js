
document.getElementById("PrintStarDemoReceipt").addEventListener("click", PrintStarDemoReceipt);
document.getElementById("setPrinterPort").addEventListener("click", setPrinterPort);
document.getElementById("searchPrinter").addEventListener("click", searchPrinter);


document.getElementById("getFirmwareInfo").addEventListener("click", getFirmwareInfo);
document.getElementById("getPortName").addEventListener("click", getPortName);
document.getElementById("getPortSettings").addEventListener("click", getPortSettings);
document.getElementById("getStarIOVersion").addEventListener("click", getStarIOVersion);
document.getElementById("ClearOutput").addEventListener("click", ClearOutput);

document.getElementById("PrintStarDemoReceiptR").addEventListener("click", PrintDemoReceiptR);

function PrintDemoReceiptR(){
   
}


function ClearOutput(){
   var blank = "";
   document.getElementById("TextField").value=blank;
   document.getElementById("SuccessField").value=blank;

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
   if (!EloStarPrinterManager.beginDocument()){
       console.error("Error:Could not begin document");
       return;
   }
   
    if (!EloStarPrinterManager.appendCodePage("CP998")){
       console.error("Error:Could not append codepage");
       return;
   }
   
   if (!EloStarPrinterManager.appendInternational("USA")){
         console.error("Error:Could not append international");
          return;
   }
   
   if (!EloStarPrinterManager.appendCharacterSpace(0)){
         console.error("Error:Could not append character space");
          return;
   }
   
   if (!EloStarPrinterManager.appendAlignment("","Center")){
         console.error("Error:Could not append alignment");
          return;
   }
   
   var StringData = "
   
   
    if (!EloStarPrinterManager.append("","Center")){
         console.error("Error:Could not append alignment");
          return;
   }
   
   
}

function setPrinterPort(){
   var target=document.getElementById("TextField").value;
   if(target.length > 1 && target.charAt(0) == '[' && target.charAt(target.length-1) == ']') {
        target = target.slice(1, -1).split(',')[0];
    }   
   document.getElementById("SuccessField").value=EloStarPrinterManager.setPrinterPort(target);
}


