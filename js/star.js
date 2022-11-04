
document.getElementById("PrintStarDemoReceipt").addEventListener("click", PrintStarDemoReceipt);
document.getElementById("setPrinterPort").addEventListener("click", setPrinterPort);
document.getElementById("searchPrinter").addEventListener("click", searchPrinter);


document.getElementById("getFirmwareInfo").addEventListener("click", getFirmwareInfo);
document.getElementById("getPortName").addEventListener("click", getPortName);
document.getElementById("getPortSettings").addEventListener("click", getPortSettings);
document.getElementById("getStarIOVersion").addEventListener("click", getStarIOVersion);
document.getElementById("ClearOutput").addEventListener("click", ClearOutput);

document.getElementById("PrintStarDemoReceiptR").addEventListener("click", PrintDemoReceiptR);

document.getElementById("PrintStarDemoReceipt4").addEventListener("click", PrintDemoReceipt4);


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
       document.getElementById("SuccessField").value=false;
       return;
   }
   
    if (!EloStarPrinterManager.appendCodepage("CP998")){
       console.error("Error:Could not append codepage");
       document.getElementById("SuccessField").value=false;
       return;
   }
   
   if (!EloStarPrinterManager.appendInternational("USA")){
         console.error("Error:Could not append international");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.appendCharacterSpace(0)){
         console.error("Error:Could not append character space");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.appendAlignment("","Center")){
         console.error("Error:Could not append alignment");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   var StringData = "Star Clothing Boutique\n123 Star Road\nCity, State 12345\n\n";
   
   
   if (!EloStarPrinterManager.append(StringData)){
         console.error("Error:Could not append data");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.appendAlignment("","Left")){
         console.error("Error:Could not append alignment");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   
   StringData = "Date:MM/DD/YYYY    Time:HH:MM PM\n--------------------------------\n\n";
   
   if (!EloStarPrinterManager.append(StringData)){
         console.error("Error:Could not append data");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   StringData = "SKU         Description    Total\n" +
                        "300678566   PLAIN T-SHIRT  10.99\n" +
                        "300692003   BLACK DENIM    29.99\n" +
                        "300651148   BLUE DENIM     29.99\n" +
                        "300642980   STRIPED DRESS  49.99\n" +
                        "300638471   BLACK BOOTS    35.99\n" +
                        "\n" +
                        "Subtotal                  156.95\n" +
                        "Tax                         0.00\n" +
                        "--------------------------------\n"
   if (!EloStarPrinterManager.append(StringData)){
         console.error("Error:Could not append data");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   StringData= "Total     ";
   if (!EloStarPrinterManager.append(StringData)){
         console.error("Error:Could not append data");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   StringData = "   $156.95\n";
   if (!EloStarPrinterManager.appendMultiple(StringData,2,2)){
         console.error("Error:Could not append multiple");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   StringData = "--------------------------------\n" +
                        "\n" +
                        "Charge\n" +
                        "156.95\n" +
                        "Visa XXXX-XXXX-XXXX-0123\n" +
                        "\n";
   if (!EloStarPrinterManager.append(StringData)){
         console.error("Error:Could not append data");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   StringData = "Refunds and Exchanges\n";
   if (!EloStarPrinterManager.appendInvert(StringData)){
         console.error("Error:Could not append Invert");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   StringData= "Within ";
   if (!EloStarPrinterManager.append(StringData)){
         console.error("Error:Could not append data");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   StringData="30 days";
   if (!EloStarPrinterManager.appendUnderLine(StringData)){
         console.error("Error:Could not append underline");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   StringData = " with receipt\n" + "And tags attached\n" +
                        "\n";
   if (!EloStarPrinterManager.append(StringData)){
         console.error("Error:Could not append data");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.appendAlignment("","Center")){
         console.error("Error:Could not append alignment");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   
   if (!EloStarPrinterManager.appendBarcode("{BStar.","Code128","Mode2",40,true)){
         console.error("Error:Could not create barcode");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.appendCutPaper("PartialCutWithFeed")){
         console.error("Error:Could not append cut paper");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.endDocument()){
         console.error("Error:Could not end document");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   var Commands = EloStarPrinterManager.getCommands();
   document.getElementById("TextField").value=Commands.length;
   
   
   
   if (!EloStarPrinterManager.getPort("",10000)){
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.writePort(Commands,0,Commands.length)){
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.releasePort()){
    
      return;
   }
   
   
   document.getElementById("SuccessField").value=true;
   
}

function setPrinterPort(){
   var target=document.getElementById("TextField").value;
   if(target.length > 1 && target.charAt(0) == '[' && target.charAt(target.length-1) == ']') {
        target = target.slice(1, -1).split(',')[0];
    }   
   document.getElementById("SuccessField").value=EloStarPrinterManager.setPrinterPort(target);
}

function PrintDemoReceipt4(){
    if (!EloStarPrinterManager.beginDocument()){
       console.error("Error:Could not begin document");
       document.getElementById("SuccessField").value=false;
       return;
   }
   
    if (!EloStarPrinterManager.appendCodepage("CP998")){
       console.error("Error:Could not append codepage");
       document.getElementById("SuccessField").value=false;
       return;
   }
   
   if (!EloStarPrinterManager.appendInternational("USA")){
         console.error("Error:Could not append international");
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   
        if (!EloStarPrinterManager.appendAlignment("Center")){
            
           return;
        }
   
        EloStarPrinterManager.append("The Food Shack\n123 Rainbow Road\nKnoxville, TN 12312\n");
        EloStarPrinterManager.appendLineFeed("",1);
        EloStarPrinterManager.appendAlignment("Left");
        EloStarPrinterManager.append("Table 109\nGreg\n10:30AM    06/21/22\n---------------------------------\n");
        EloStarPrinterManager.appendAlignment("Guest No 1\n", "Center");
        EloStarPrinterManager.appendAlignment("Left");
        EloStarPrinterManager.append("1 ice cream sundae             4.50\n1 soda pop                     1.75\n1 french fries                 4.00\n");
        EloStarPrinterManager.appendAlignment("Guest No 2\n", "Center");
        EloStarPrinterManager.appendAlignment("1 cheese pizza                 5.00\n1 milkshake                    1.75\n\n---------------------------------\n","Left");
        EloStarPrinterManager.appendAlignment("Subtotal    17.00\nTax          1.20\n","Right");
        EloStarPrinterManager.appendAlignment("Right");
        EloStarPrinterManager.appendMultiple("Total    18.20\n\n",2,2);

        EloStarPrinterManager.appendAlignment("Let us know how we did!\nTake our survey within ", "Left");
        EloStarPrinterManager.appendUnderLine("10 days");
        EloStarPrinterManager.append(" and get entered\nto ");
        EloStarPrinterManager.appendInvert("win a prize!");

        EloStarPrinterManager.append(" Scan the Qr code below to start!\n\n");
        EloStarPrinterManager.appendQrCode("https://www.elotouch.com/", "No2", "Q", 5);
        EloStarPrinterManager.appendUnitFeed("",10);

        EloStarPrinterManager.appendCutPaper("PartialCutWithFeed");
        EloStarPrinterManager.endDocument();
   
        var Commands = EloStarPrinterManager.getCommands();
         document.getElementById("TextField").value=Commands.length;
   
   
   
   if (!EloStarPrinterManager.getPort("",10000)){
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.writePort(Commands,0,Commands.length)){
         document.getElementById("SuccessField").value=false;
         return;
   }
   
   if (!EloStarPrinterManager.releasePort()){
    
      return;
   }
   
   
   document.getElementById("SuccessField").value=true;

   
   
   
}


