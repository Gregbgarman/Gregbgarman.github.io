let StarPrinterPort=""

document.getElementById("queryStarPrinterList").addEventListener("click", queryStarPrinterList)
document.getElementById("setStarPrinter").addEventListener("click", setStarPrinter)
document.getElementById("printStarBarcode").addEventListener("click", printStarBarcode)
document.getElementById("printStarDemoReceipt1").addEventListener("click", printStarDemoReceipt1)
document.getElementById("printStarDemoReceipt2").addEventListener("click", printStarDemoReceipt2)
document.getElementById("printStarImage").addEventListener("click", printStarImage)
document.getElementById("checkStarPrinterPaper").addEventListener("click", checkStarPrinterPaper)
document.getElementById("checkStarPrinterOnline").addEventListener("click",checkStarPrinterOnline)
document.getElementById("checkStarFirmware").addEventListener("click", checkStarFirmware)
document.getElementById("checkStarModelName").addEventListener("click", checkStarModelName)
document.getElementById("forgetStarPrinter").addEventListener("click", forgetStarPrinter)

function queryStarPrinterList(){   
   let target=document.getElementById("textField").value
   target+=":"
   document.getElementById("textField").value=EloStarPrinterManager.searchPrinter(target)
}

function setStarPrinter(){
   let target=document.getElementById("textField").value
   if(target.length > 1 && target.charAt(0) == '[' && target.charAt(target.length-1) == ']') {
        StarPrinterPort = target.slice(1, -1).split(',')[0]
    }   
   document.getElementById("textField").value=true
}


function printStarBarcode(){
    if (StarPrinterPort === ""){
        return  
    }
   
    EloStarPrinterManager.beginDocument(StarPrinterPort)
    EloStarPrinterManager.appendAlignment("","Center")
    EloStarPrinterManager.appendBarcode("01234596326", "UPCE", "Mode1", 40, true)
    EloStarPrinterManger.appendBarcode("09521596326", "UPCE", "Mode2", 50, true)
    EloStarPrinterManager.appendQrCode("https://www.elotouch.com/", "No2", "Q", 5)
    EloStarPrinterManager.appendUnitFeed("",10)
    EloStarPrinterManager.appendCutPaper("PartialCutWithFeed")
    EloStarPrinterManager.endDocument()
    
   let ReceiptData = EloStarPrinterManager.getCommands() 
   printReceiptData(ReceiptData)
}

function printStarDemoReceipt1(){
    let ReceiptData = getReceipt1Data()
    if (ReceiptData === false){
         return  
    }
    printReceiptData(ReceiptData)
}

function printStarDemoReceipt2(){
    let ReceiptData = getReceipt2Data()
    if (ReceiptData === false){
         return  
    }
    printReceiptData(ReceiptData)
}

function printStarImage(){

}

function checkStarPrinterPaper(){
   
}

function checkStarPrinterOnline(){
   
}

function checkStarFirmware(){
   
}

function checkStarModelName(){
   
   
}

function forgetStarPrinter(){
   
}

function printReceiptData(ReceiptData){
   
   let ActivePort_Key = EloStarPrinterManager.getPort(StarPrinterPort,"",10000)
   document.getElementById("textField").value=ActivePort_Key
   
   let PrinterStatus_Key = EloStarPrinterManager.beginCheckedBlock(ActivePort_Key)
   
   if (EloStarPrinterManager.offlineStatus(PrinterStatus_Key) === 1){
        document.getElementById("textField").value="offline status fail"
        return
   }
   
   if (!EloStarPrinterManager.writePort(ActivePort_Key,ReceiptData,0,ReceiptData.length)){
      document.getElementById("textField").value="write port fail"
      return
   }
   
   if (!EloStarPrinterManager.setEndCheckedBlockTimeoutMillis(ActivePort_Key,30000)){
      document.getElementById("textField").value="setendchkmillis fail"
      return
   }
   
   PrinterStatus_Key = EloStarPrinterManager.endCheckedBlock(ActivePort_Key)
   if (EloStarPrinterManager.offlineStatus(PrinterStatus_Key) === 1 || EloStarPrinterManager.receiptPaperEmptyStatus(PrinterStatus_Key) === 1 ||
       EloStarPrinterManager.coverOpenStatus(PrinterStatus_Key) === 1){
       document.getElementById("textField").value="final check fail"
       return  
   }
   
   if (!EloStarPrinterManager.releasePort(ActivePort_Key)){
      document.getElementById("textField").value="release fail"
      return
   }
   document.getElementById("textField").value="print success"   
}

function getReceipt2Data(){
        EloStarPrinterManager.beginDocument(StarPrinterPort)
        EloStarPrinterManager.appendCodepage("CP998");
        EloStarPrinterManager.appendInternational("USA");
        EloStarPrinterManager.appendAlignment("","Center");
        EloStarPrinterManager.appendLineFeed("",1);
        EloStarPrinterManager.append("THE STORE 123 (555) 555 5555\nSTORE DIRECTOR John Smith\n\n7/01/07 16:58 6153 05 0191 134\nST# 21 OP# 001 TE# 01 TR# 747\n------------------------------\n");
        EloStarPrinterManager.append("400 OHEIDA 3PK SPRINGF  9.99 R\n410 3 CUP BLK TEAPOT    9.99 R\n445 EMERIL GRIDDLE/PAN 17.99 R\n438 CANDYMAKER ASSORT   4.99 R\n474 TRIPOD              8.99 R\n433 BLK LOGO PRNTED ZO  7.99 R\n458 AQUA MICROTERRY SC  6.99 R\n493 30L BLK FF DRESS   16.99 R\n407 LEVITATING DESKTOP  7.99 R\n441 **Blue Overprint P  2.99 R\n476 REPOSE 4PCPM CHOC   5.49 R\n476 REPOSE 4PCPM CHOC   5.49 R\n461 WESTGATE BLACK 25  59.99 R\n------------------------------\n");
        EloStarPrinterManager.append("SUBTOTAL                160.38\nSUBTOTAL                160.38\n");
        EloStarPrinterManager.appendMultiple("TOTAL    174.81\n", 2, 2);
        EloStarPrinterManager.appendLineFeed("",2);
        EloStarPrinterManager.append("CASH                    200.00\nCHANGE                   25.19\n------------------------------\n");
        EloStarPrinterManager.append("Purchased item total number\nSign Up and Save !\nWith Preferred Saving Card\n");
        EloStarPrinterManager.appendLineFeed("",2);

        EloStarPrinterManager.appendBarcode("86340975318", "UPCE", "Mode1", 40, true);
        EloStarPrinterManager.appendUnitFeed("",32);

        EloStarPrinterManager.appendCutPaper("PartialCutWithFeed");
        EloStarPrinterManager.endDocument();

        let Commands = EloStarPrinterManager.getCommands();
        return Commands
}

function getReceipt1Data(){
    if (!EloStarPrinterManager.beginDocument(StarPrinterPort)){
       console.error("Error:Could not begin document")      
       return false
   }
   
    if (!EloStarPrinterManager.appendCodepage("CP998")){
       console.error("Error:Could not append codepage")
       return false;
   }
   
   if (!EloStarPrinterManager.appendInternational("USA")){
         console.error("Error:Could not append international")        
         return false
   }
   
   
   if (!EloStarPrinterManager.appendAlignment("","Center")){
          console.error("Error:Could not append international")
          return false
    }
   
        EloStarPrinterManager.append("The Food Shack\n123 Rainbow Road\nKnoxville, TN 12312\n");
        EloStarPrinterManager.appendLineFeed("",1);
        EloStarPrinterManager.appendAlignment("","Left");
        EloStarPrinterManager.append("Table 109\nGreg\n10:30AM    06/21/22\n---------------------------------\n");
        EloStarPrinterManager.appendAlignment("Guest No 1\n", "Center");
        EloStarPrinterManager.appendAlignment("","Left");
        EloStarPrinterManager.append("1 ice cream sundae             4.50\n1 soda pop                     1.75\n1 french fries                 4.00\n");
        EloStarPrinterManager.appendAlignment("Guest No 2\n", "Center");
        EloStarPrinterManager.appendAlignment("1 cheese pizza                 5.00\n1 milkshake                    1.75\n\n---------------------------------\n","Left");
        EloStarPrinterManager.appendAlignment("Subtotal    17.00\nTax          1.20\n","Right");
        EloStarPrinterManager.appendAlignment("","Right");
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
   
        let Commands = EloStarPrinterManager.getCommands();
        return Commands
    
}



/*
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

function setPrinterPort(){
   var target=document.getElementById("TextField").value;
   if(target.length > 1 && target.charAt(0) == '[' && target.charAt(target.length-1) == ']') {
        StarPrinterPort = target.slice(1, -1).split(',')[0];
    }   
   document.getElementById("SuccessField").value=StarPrinterPort
}


function PrintStarDemoReceipt(){
   ClearOutput();
   
   
   EloStarPrinterManager.beginDocument(StarPrinterPort);
    
   
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
   
   let Commands = EloStarPrinterManager.getCommands();
   document.getElementById("TextField").value=Commands.length;
   
   
   let ActivePort_Key = EloStarPrinterManager.getPort(StarPrinterPort,"",10000)
   document.getElementById("TextField").value=ActivePort_Key;
   
   
   
   let PrinterStatus_Key = EloStarPrinterManager.beginCheckedBlock(ActivePort_Key)
   if (EloStarPrinterManager.offlineStatus(PrinterStatus_Key) === 1){
        document.getElementById("TextField").value=false;
        document.getElementById("SuccessField").value="offline status fail";
   }
   
   if (!EloStarPrinterManager.writePort(ActivePort_Key,Commands,0,Commands.length)){
      document.getElementById("SuccessField").value="write port fail";
      return
   }
   
   if (!EloStarPrinterManager.setEndCheckedBlockTimeoutMillis(ActivePort_Key,30000)){
      document.getElementById("SuccessField").value="setendchkmillis fail";
      return
   }
   
   PrinterStatus_Key = EloStarPrinterManager.endCheckedBlock(ActivePort_Key)
   if (EloStarPrinterManager.offlineStatus(PrinterStatus_Key) === 1 || EloStarPrinterManager.receiptPaperEmptyStatus(PrinterStatus_Key) === 1 ||
       EloStarPrinterManager.coverOpenStatus(PrinterStatus_Key) === 1){
       document.getElementById("SuccessField").value="final check fail";
       return  
   }
   
   if (!EloStarPrinterManager.releasePort(ActivePort_Key)){
      document.getElementById("SuccessField").value="release fail";
      return;
   }
   
   
   document.getElementById("SuccessField").value="print success";
   
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
   
   
        if (!EloStarPrinterManager.appendAlignment("","Center")){
            
           return;
        }
   
        EloStarPrinterManager.append("The Food Shack\n123 Rainbow Road\nKnoxville, TN 12312\n");
        EloStarPrinterManager.appendLineFeed("",1);
        EloStarPrinterManager.appendAlignment("","Left");
        EloStarPrinterManager.append("Table 109\nGreg\n10:30AM    06/21/22\n---------------------------------\n");
        EloStarPrinterManager.appendAlignment("Guest No 1\n", "Center");
        EloStarPrinterManager.appendAlignment("","Left");
        EloStarPrinterManager.append("1 ice cream sundae             4.50\n1 soda pop                     1.75\n1 french fries                 4.00\n");
        EloStarPrinterManager.appendAlignment("Guest No 2\n", "Center");
        EloStarPrinterManager.appendAlignment("1 cheese pizza                 5.00\n1 milkshake                    1.75\n\n---------------------------------\n","Left");
        EloStarPrinterManager.appendAlignment("Subtotal    17.00\nTax          1.20\n","Right");
        EloStarPrinterManager.appendAlignment("","Right");
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

function PrintDemoReceipt3(){
   
        EloStarPrinterManager.beginDocument()
        EloStarPrinterManager.appendCodepage("CP998");
        EloStarPrinterManager.appendInternational("USA");
        EloStarPrinterManager.appendAlignment("","Center");
        EloStarPrinterManager.appendLineFeed("",1);
        EloStarPrinterManager.append("THE STORE 123 (555) 555 5555\nSTORE DIRECTOR John Smith\n\n7/01/07 16:58 6153 05 0191 134\nST# 21 OP# 001 TE# 01 TR# 747\n------------------------------\n");
        EloStarPrinterManager.append("400 OHEIDA 3PK SPRINGF  9.99 R\n410 3 CUP BLK TEAPOT    9.99 R\n445 EMERIL GRIDDLE/PAN 17.99 R\n438 CANDYMAKER ASSORT   4.99 R\n474 TRIPOD              8.99 R\n433 BLK LOGO PRNTED ZO  7.99 R\n458 AQUA MICROTERRY SC  6.99 R\n493 30L BLK FF DRESS   16.99 R\n407 LEVITATING DESKTOP  7.99 R\n441 **Blue Overprint P  2.99 R\n476 REPOSE 4PCPM CHOC   5.49 R\n476 REPOSE 4PCPM CHOC   5.49 R\n461 WESTGATE BLACK 25  59.99 R\n------------------------------\n");
        EloStarPrinterManager.append("SUBTOTAL                160.38\nSUBTOTAL                160.38\n");
        EloStarPrinterManager.appendMultiple("TOTAL    174.81\n", 2, 2);
        EloStarPrinterManager.appendLineFeed("",2);
        EloStarPrinterManager.append("CASH                    200.00\nCHANGE                   25.19\n------------------------------\n");
        EloStarPrinterManager.append("Purchased item total number\nSign Up and Save !\nWith Preferred Saving Card\n");
        EloStarPrinterManager.appendLineFeed("",2);

        EloStarPrinterManager.appendBarcode("86340975318", "UPCA", "Mode1", 40, true);
        EloStarPrinterManager.appendUnitFeed("",32);

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


function printimage() {
    var image = new Uint8Array([-119, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 1, 44, 0, 0, 0, -19, 8, 2, 0, 0, 0, -118, -36, -33, -121, 0, 0, 0, 1, 115, 82, 71, 66, 0, -82, -50, 28, -23, 0, 0, 0, 3, 115, 66, 73, 84, 8, 8, 8, -37, -31, 79, -32, 0, 0, 32, 0, 73, 68, 65, 84, 120, -100, -19, 93, 89, 119, 27, 71, 118, -82, 94, 1, 16, 32, 0, 2, 92, 68, -118, -69, -60, 77, 34, 37, -39, -95, 70, -106, 70, -78, -106, -15, -94, 57, -50, -79, -99, -59, 73, 94, 114, -26, 33, 63, 98, 94, -14, 23, -14, 31, 114, 78, -14, 50, 57, -15, -15, 108, -14, 88, 113, 108, 121, 98, -53, -94, 68, 75, -108, 40, 89, 27, 119, 113, 7, 23, 108, -60, -34, -115, -50, -61, 53, -18, 20, -69, 1, 16, 34, 27, 104, 64, -86, -17, 65, 7, 2, 27, 85, -43, -43, -9, -69, 91, -35, -86, -26, -2, -19, -33, -2, -115, 48, 20, 5, -57, 113, -102, -90, -31, 103, -8, -32, 114, -71, -34, 125, -9, -35, 67, -121, 14, -39, 108, 54, -35, -59, 69, -102, -126, 118, -32, 95, -114, -29, 56, -114, 91, 91, 91, -5, -41, 127, -3, -41, 71, -113, 30, -59, -29, 113, -6, 26, 99, -125, -70, -17, 15, 8, 81, 20, 51, -103, -116, -37, -19, -2, -11, -81, 127, 125, -6, -12, -23, -42, -42, 86, 69, 81, 120, -98, -25, 121, 30, 58, -30, 121, -34, -60, -18, 24, -118, 64, 52, -9, -47, -66, -86, 48, -50, -110, -106, -61, 62, 126, 14, -84, -42, 52, 77, 85, -43, 100, 50, 25, -119, 68, -74, -74, -74, 34, -111, 8, -16, -83, 50, 79, 68, 16, 4, 85, 85, 85, 85, -115, -59, 98, -23, 116, 90, -45, 52, 100, 123, 113, 61, -62, 96, 58, -60, 108, 54, 107, -11, 24, -86, 23, 69, 88, 81, 58, 3, 11, -75, -100, -51, 102, 85, 85, 77, -89, -45, 64, -62, 96, 48, 72, -101, -36, 114, 3, 110, -115, -29, -72, 88, 44, -106, -55, 100, 72, -50, 50, 87, -90, 119, 6, 26, -94, -43, 3, -88, 106, -48, -10, -127, -10, 72, 53, 10, -91, 55, 69, 118, 27, 25, -98, -25, 5, 65, 16, 69, 81, 16, 4, -16, -3, 56, -114, 3, 111, -48, -24, -3, -22, -58, 112, 112, -32, 120, -96, 119, -70, 35, -29, 80, 25, -54, 10, 70, -62, 61, 0, 60, -92, -91, 127, 127, 50, 74, -109, -103, 118, -4, -128, 0, 104, -123, 116, -60, 46, -97, 97, -124, 30, -79, 119, 66, -35, 23, 61, 66, -122, 10, 64, 100, -45, 93, 10, 116, -77, -124, -66, 92, -119, -77, -89, 51, -89, 121, 13, 44, -39, -99, -74, 41, 55, 104, -6, 21, 26, 27, 67, 101, -64, 44, -31, 75, -29, -128, 50, 74, -1, 28, -62, 66, 85, 85, -77, -39, -84, -47, -28, -106, 21, -112, 11, -128, -82, -31, 51, 26, 100, -106, -85, -85, 48, 24, 9, 75, 66, -95, 32, -19, 101, 127, -114, 64, 91, -86, 115, 71, 43, -58, 1, -116, 66, 11, -39, 115, 22, 25, 86, 12, 108, -119, -30, -91, 113, 64, -121, -115, -74, 120, 24, -104, 97, 106, -92, 98, -113, 3, 72, -56, 22, 3, -85, 1, -52, 18, -66, 28, 14, 30, 50, -47, -87, 23, -12, 6, 1, 21, 118, 71, 97, -95, 18, 93, 98, 77, -45, -116, -127, 34, 67, 5, -64, 72, 88, 9, -24, -84, 28, -99, 29, 53, -2, -87, 50, 60, -60, -11, 97, 99, 40, -56, 28, -47, 10, -125, 101, 71, 75, 66, -34, -104, 112, 31, 70, 3, 12, 41, -2, 10, 29, 81, 93, -77, -92, 82, 126, 41, -19, 15, -45, 93, 51, -87, -88, 36, -104, 37, -84, 40, 10, -91, 64, 42, -71, 56, 1, -64, -86, 0, -38, 44, -29, -97, 42, 54, 12, 6, -62, 72, 104, 45, -86, -57, -32, 28, 48, -3, -53, 112, 16, 48, -99, -57, -64, 96, 49, 24, 9, 25, 24, 44, 6, 35, 33, 3, -125, -59, 96, 36, 100, 96, -80, 24, -116, -124, 12, 12, 22, -125, -111, -112, -127, -63, 98, 48, 18, 50, 48, 88, 12, 70, 66, 6, 6, -117, -63, 72, -56, -64, 96, 49, 24, 9, 95, 14, -107, -81, 47, 99, 120, -27, -63, -54, -42, -10, 0, 30, -21, -92, -5, 30, 118, 30, -79, 34, 47, -122, -125, -125, 109, -22, -35, 27, -12, 6, 92, -110, -85, -82, -124, 42, 103, -84, -127, 102, 108, 100, -40, 55, 24, 9, -9, -128, 110, -17, 31, -14, 13, 118, 33, -32, -39, 48, -106, -114, -111, -95, -74, 33, -118, 34, -13, 72, -117, -127, 118, 71, -127, 117, -124, 50, -125, -124, 109, -4, 97, 56, 48, -104, 37, -36, 3, -12, 126, 115, 58, 56, -28, 121, 30, -114, -124, 96, 102, -112, -31, -128, 16, 37, 73, -78, 122, 12, -43, 14, 60, -3, 1, 73, 40, -118, 34, -68, 7, -122, -67, 68, -128, -31, -32, 16, -121, -121, -121, -83, 30, 67, -11, 2, -114, 66, -126, 3, 32, -24, 47, 9, 33, 118, -69, -35, -19, 118, -53, -78, 108, -35, -24, 24, 94, 17, -120, 3, 3, 3, 86, -113, -95, 122, 1, 65, -96, 49, -7, -103, -51, 102, 121, -98, -81, -81, -81, 103, 17, 53, -61, -63, 33, -74, -75, -75, 89, 61, -122, -38, 0, 125, 6, 25, -112, 83, 16, 4, -62, -50, 38, 99, 56, 48, 88, 98, 102, 15, 96, -44, 7, 126, 41, -66, -61, 8, 29, 84, -106, -101, 97, 56, 32, -40, -111, -121, -59, 64, 19, -52, -8, 2, 35, -74, 76, -49, 96, 10, -52, 33, -95, -50, -100, 26, -37, -52, 123, -72, 45, 94, 102, -4, 121, -95, -105, 55, -108, -40, -5, -98, 93, -108, -46, -84, -18, 2, -35, 122, 32, -14, -109, -111, -48, 68, 20, -15, -53, 116, -13, 76, 95, 89, -24, 17, -28, -107, -94, -46, -49, -107, 43, 114, -91, -71, -121, -45, -103, -74, -48, -116, -27, 35, 69, 46, 40, -91, 5, 19, -57, 83, -4, -81, 7, -15, -61, -71, -36, -117, 92, -10, -35, 2, 67, 33, -108, -2, 104, -10, 20, -71, 90, -127, -103, -55, 61, -38, 91, -45, -43, 91, 18, -61, -63, -46, -12, 92, 23, -70, -122, -122, 110, -83, -36, 120, 100, 53, 125, 37, -35, 84, 41, 63, 41, 114, 71, -91, 92, -58, 112, 64, 20, -41, -35, 116, 50, -52, 120, 90, 57, -3, 95, 90, -16, -14, -74, -122, 47, -127, 35, 84, 76, -127, -33, -24, -4, 38, 44, 12, 46, -59, -22, 30, 4, -90, -111, -48, 56, 23, 123, 30, -25, -82, -101, -81, -30, -73, -121, 118, 82, 51, -68, -43, -88, -108, 95, 17, 66, 32, -103, -55, 80, -99, -56, -5, 64, 117, -62, -109, 87, 96, 56, -61, 123, -108, -117, 120, -89, -70, 22, 10, -23, 104, 98, 80, -6, -40, 114, 85, -109, 80, -89, 45, -14, -34, 18, 29, 86, -27, -43, 97, -102, -90, 33, 85, -16, 27, 44, -101, -34, 7, -117, -116, -65, -94, -37, 124, -39, -42, 24, -54, -121, -68, -113, 67, -57, -106, -30, 33, 0, -72, -90, -12, 75, -26, 116, -14, -125, 15, 29, 18, -35, -12, 55, 121, -69, -50, -5, 39, -102, -100, 102, -87, -11, -78, 88, -62, 66, 23, 24, -115, 59, -128, -74, -2, -32, 114, -112, -35, 106, -81, -120, 47, 74, -73, -97, 55, -128, 46, -28, 24, 51, 84, 15, 116, 126, 32, 49, 60, 56, -99, -69, 104, -68, -128, -20, 118, 50, 117, 45, -29, -59, 121, 77, -21, -98, -10, -125, 110, 42, -81, -7, 61, 32, -10, 79, -62, 61, -3, -52, 34, 127, -46, 25, 122, -124, 110, 30, 117, -118, 16, -93, 112, -48, 118, -123, 30, 3, -95, 92, 86, 100, 53, -22, 72, -74, -23, -95, 10, -111, 87, 47, -93, -88, -24, 94, 92, 85, 68, -124, 56, -114, -93, 55, -105, -23, -28, 71, -53, -59, 38, -94, 40, 34, -117, 116, 60, 52, -66, -83, 21, 59, -62, 63, 21, -30, -4, -66, -107, 123, 89, -86, -82, -116, 110, 61, -51, 43, -93, 35, 74, -14, -35, 0, 125, 123, -70, -41, -54, -30, -3, 3, -63, 104, 94, -63, -37, 54, 85, 85, -107, 36, -119, -93, 94, -6, -59, 80, -27, -48, -119, -127, 113, 65, 72, 85, 85, 66, -59, 23, 58, -126, 33, 49, 96, -97, 39, -2, 80, 71, 24, -6, -73, -123, 52, 56, 54, -85, 19, 84, -99, -118, 55, -17, -42, -9, 69, -62, -46, 109, -96, -47, 3, -52, 102, -77, -118, -94, -92, 114, 72, 83, -56, 100, 50, -118, -94, -64, -69, 99, 105, -69, 7, 51, 43, 8, -126, 40, -118, -16, -63, 102, -77, 73, -110, 36, -53, -78, -51, 102, -77, -39, 108, 14, -121, 67, -110, 36, 81, 20, 5, 65, -128, -119, -53, 27, 7, 18, 67, -2, 86, 55, -107, -52, 77, -83, 18, -96, -55, -94, -97, 23, -19, 7, -94, -86, -51, 100, 50, -87, 84, 42, -103, 76, 38, -109, -55, 76, 38, 3, -1, 85, 20, 5, -60, 12, -33, 64, 12, -51, -94, 1, 0, 81, -127, -83, 48, 0, 89, -106, 37, 73, -62, -49, 116, 73, -80, -47, 48, 66, -27, 112, 33, -77, -79, 15, 41, 50, -33, 18, 98, 54, 18, -122, -85, -28, 0, 51, -110, 78, -89, 99, -79, 88, 56, 28, -34, -39, -39, -119, 70, -93, -15, 120, 60, 30, -113, -57, 98, -79, 88, 44, -106, 72, 36, -128, -106, -12, 75, -92, 9, 33, 48, 107, -64, 58, -8, -32, 114, -71, -22, -22, -22, -22, -22, -22, -36, 110, 119, 125, 125, 125, 125, 125, -67, -53, -27, -78, -37, -19, 14, -121, 3, -82, 65, -46, -62, 116, -109, -36, -111, 48, -60, -32, -52, -108, 98, -109, 25, 42, 0, -38, -50, -48, -113, 30, 60, 76, -107, 2, 48, 13, -72, 7, -62, 19, -119, 68, 34, -111, 72, 60, 30, 79, 36, 18, 59, 59, 59, -56, -58, 76, 38, 3, -30, 4, 28, 6, -26, -128, 18, -105, 101, -39, 110, -73, -69, 92, 46, -105, -53, -27, 116, 58, 65, -100, 92, 46, -105, -57, -29, -127, -1, 18, 66, 68, 81, 4, 114, -126, 56, -63, 96, -48, -77, 53, 81, 78, -52, 33, 33, 14, 11, 110, 18, -26, 113, 103, 103, 103, 107, 107, 107, 117, 117, -11, -59, -117, 23, 27, 27, 27, -127, 64, 96, 109, 109, 45, 28, 14, 71, -93, -47, 80, 40, 4, -108, -61, 85, 7, 90, 111, 21, 10, -105, 113, 30, -7, 28, -64, 0, 74, -110, 84, 87, 87, -25, -15, 120, -4, 126, -1, -95, 67, -121, 26, 26, 26, 124, 62, 95, 87, 87, 87, 115, 115, 115, 75, 75, 75, 83, 83, 19, -22, 54, -115, 74, -4, 48, -78, 85, 27, 52, -22, -72, 16, -76, 69, -39, 108, 54, 20, 10, 5, -125, -63, 64, 32, -80, -80, -80, -80, -71, -71, -71, -71, -71, -71, -78, -78, -78, -67, -67, 29, 10, -123, -30, -15, 56, 40, -18, 76, 38, 67, -21, 110, 109, 55, -96, 41, 124, -18, 40, 66, -96, -81, -47, -43, -126, -19, 105, -11, -11, -11, 32, 75, 77, 77, 77, 109, 109, 109, -19, -19, -19, 45, 45, 45, 45, 45, 45, 126, -65, 31, 8, -119, -19, 19, -109, -92, -56, 52, 75, -88, -86, 42, -80, 110, 101, 101, 37, 16, 8, 4, 2, -127, -51, -51, -51, -19, -19, 109, -8, 55, 18, -119, 68, -93, -47, 112, 56, -100, 76, 38, 65, -121, 1, -21, -24, 16, -15, 101, 21, 12, 29, 76, 75, -110, 100, -73, -37, -99, 78, -89, -37, -19, 6, -107, -26, -9, -5, -67, 94, 47, -48, -46, -25, -13, 53, 54, 54, -74, -74, -74, 54, 53, 53, -7, -3, 126, -69, -35, -50, -27, 82, -75, 102, -35, 62, -61, 1, -127, 50, -99, -55, 100, 80, -112, 54, 55, 55, 3, -127, -64, -6, -6, 122, 48, 24, 12, 6, -125, 91, 91, 91, -47, 104, 116, 103, 103, 39, 28, 14, -125, -21, 4, -36, 123, 41, 74, -24, 18, 60, 116, -41, 60, -49, -125, 71, 10, 70, -46, -19, 118, 123, -67, 94, -81, -41, -21, -15, 120, 124, 62, 95, 107, 107, 107, 99, 99, 99, 115, 115, 115, 115, 115, 115, 99, 99, -93, -33, -17, -73, -39, 108, -90, -111, 48, 111, -116, 103, 76, -2, -24, 0, 119, 14, 22, 63, -103, 76, 70, 34, -111, -75, -75, -75, -23, -23, -23, -55, -55, -55, -25, -49, -97, 79, 79, 79, 111, 108, 108, -60, 98, -79, 84, 42, -107, -9, -25, 121, -71, -57, -19, -34, -99, -112, 119, 72, -12, 95, -63, -112, -126, 9, 77, 38, -109, -95, 80, 104, 121, 121, -7, 47, -9, 38, -118, 118, -69, -35, -25, -13, -75, -75, -75, -11, -10, -10, -114, -116, -116, -12, -9, -9, -9, -11, -11, 1, 15, 69, 81, 116, 56, 28, 24, -87, -29, -109, 40, -110, -17, 50, -2, 73, -89, 101, 95, 91, -20, 57, 15, -12, 5, -58, 39, -85, 105, 90, 50, -103, -124, -44, 64, 56, 28, 94, 94, 94, 126, -2, -4, -7, -61, -121, 15, 103, 102, 102, 102, 103, 103, -117, 11, 18, 54, -117, -114, -110, -47, -109, -46, 93, 9, -55, 27, -80, -100, -8, 91, 112, -57, 20, 69, -119, -59, 98, -12, -107, 112, -115, 44, -53, -83, -83, -83, -99, -99, -99, 125, 125, 125, -61, -61, -61, -67, -67, -67, 61, 61, 61, 62, -97, -49, -31, 112, -40, -19, 118, 89, -106, -115, 105, -43, -68, 93, -25, -99, 16, -67, 37, -44, -39, 7, 48, -18, -104, -25, 64, -97, 24, 62, -92, 82, -87, -71, -71, -71, 103, -49, -98, -35, -65, 127, -1, -2, -3, -5, -21, -21, -21, -31, 112, 56, 18, -119, 36, 18, 9, -80, 117, 120, -109, 96, -3, 21, 69, -95, -121, -104, -9, -13, -2, -54, 71, 117, 30, 38, 124, -56, 102, -77, -15, 120, 60, -99, 78, 7, -125, -63, -39, -39, -39, 111, -65, -3, -74, -66, -66, -66, -87, -87, 105, 100, 100, -28, -40, -79, 99, -61, -61, -61, -125, -125, -125, 110, -73, 27, 19, -42, 16, 112, -45, -121, 56, -27, 13, -66, 117, 121, 51, 102, 81, 1, -118, -94, -48, 110, 100, 41, 23, 35, 103, -110, -55, -28, -44, -44, -44, -77, 103, -49, 38, 39, 39, 31, 60, 120, -80, -70, -70, -70, -67, -67, 13, 1, 11, 100, 92, -14, 110, -83, -90, 93, 77, -8, -84, -117, -4, -13, -126, -29, 56, 72, -76, -22, 126, 107, -68, 12, -102, 2, -58, -90, -45, -23, -107, -107, -107, -83, -83, -83, -89, 79, -97, 126, -13, -51, 55, 78, -89, -45, -25, -13, 29, 59, 118, -20, -8, -15, -29, 39, 79, -98, 68, 65, 34, -124, 64, 4, -117, 66, -123, -94, 101, 92, -39, 71, -55, 17, 113, 16, -70, 13, 114, -96, 24, 72, 110, 121, 4, -4, 96, -120, -9, 18, -119, -60, -117, 23, 47, 94, -68, 120, 49, 51, 51, -13, -4, -7, -13, -123, -123, -123, -123, -123, -123, -27, -27, -27, -99, -99, 29, -120, -125, 9, -75, -88, 66, 79, 16, -55, -25, 12, -108, 3, -88, 11, 97, -6, 20, 69, 73, 36, 18, 112, -113, 11, 11, 11, 43, 43, 43, 15, 31, 62, -68, 117, -21, -42, -111, 35, 71, -114, 28, 57, -46, -41, -41, -41, -37, -37, 91, 95, 95, 15, -57, -19, -64, -19, -29, -22, 34, -74, 73, -53, 13, -35, -41, -21, -52, 64, 93, -60, 101, -12, 98, 104, -47, -126, -119, 5, -73, 5, 36, 59, 30, -113, -125, -16, 76, 77, 77, 61, 125, -6, 116, 113, 113, 113, 105, 105, 105, 105, 105, 9, -110, 43, -36, -18, 115, 125, -116, -117, 22, -123, -122, -76, -25, -104, 75, -68, 53, -35, 109, -126, -95, -114, 70, -93, -37, -37, -37, -112, -35, 89, 94, 94, -2, -15, -57, 31, -57, -57, -57, -5, -6, -6, 122, 122, 122, 122, 123, 123, 123, 123, 123, 93, 46, 23, -98, -37, 68, 91, 5, -93, -9, -117, -102, 69, -92, -17, -109, 80, -74, -114, 16, 2, -109, -123, 13, -87, -86, -102, 74, -91, 118, 118, 118, -42, -41, -41, 111, -33, -66, 61, 62, 62, 126, -5, -10, -19, -123, -123, -123, 88, 44, -122, -45, 74, -37, 119, 52, -27, -124, -78, 111, 121, -67, -111, -125, -61, -24, -127, 24, -87, 2, -73, 29, -117, -59, -90, -90, -90, -90, -90, -90, 4, 65, 104, 108, 108, 28, 25, 25, 121, -5, -19, -73, -49, -99, 59, -41, -43, -43, -43, -44, -44, 4, 110, 42, 49, 60, 42, -16, 94, 32, 124, -89, 123, 100, -64, 121, -128, -4, -95, 81, -106, -64, -65, 64, 15, 34, -101, -51, -126, 101, -117, -57, -29, -21, -21, -21, 55, 111, -34, -68, 125, -5, -10, -40, -40, -40, -62, -62, 66, 50, -103, 36, -108, -16, 16, 3, 19, 72, 101, -89, 61, -81, -123, 36, -71, -6, 56, 69, 81, -90, -89, -89, 103, 102, 102, 110, -33, -66, -35, -46, -46, 50, 52, 52, -12, -42, 91, 111, 93, -72, 112, -95, -69, -69, 27, 4, 9, 38, -124, 80, -18, -82, -74, -69, -20, 25, 27, 23, -75, 92, -10, 22, 123, 69, 119, 75, -106, -27, 76, 38, -109, 72, 36, 32, -109, -95, 40, -54, 15, 63, -4, -16, -3, -9, -33, -1, -33, -1, -3, -33, -117, 23, 47, -74, -73, -73, -61, -31, 112, 58, -99, 38, -124, -120, -94, 104, 116, 53, -23, 37, -102, -54, 3, -17, 11, -18, 8, -84, 58, -6, 75, -16, -27, -10, -10, -10, -99, 59, 119, -98, 61, 123, -10, -37, -33, -2, -10, -28, -55, -109, -105, 47, 95, 126, -17, -67, -9, 26, 27, 27, 53, 67, -103, 34, -52, -122, 70, -91, -17, -24, -104, -10, 117, 54, -122, 70, 3, -107, -55, 100, 32, -15, 72, -88, 0, 12, 43, 40, 68, 81, 76, 38, -109, -73, 111, -33, -66, 117, -21, -42, 119, -33, 125, 55, 55, 55, 23, 12, 6, -63, -12, -47, 10, 14, -97, 23, -2, 91, 61, 90, 15, 45, 13, 56, -122, -87, 84, 106, 117, 117, 53, 20, 10, 61, 126, -4, -8, -6, -11, -21, -93, -93, -93, 87, -82, 92, 25, 29, 29, -11, -5, -3, 16, 43, -94, 59, -96, -19, 118, -104, -111, -91, -94, 81, 123, -47, 94, -84, 32, 8, -86, -86, 110, 110, 110, 46, 44, 44, 76, 78, 78, -34, -68, 121, -13, -15, -29, -57, 83, 83, 83, -79, 88, 44, -109, -55, -96, 56, -22, 2, -71, -68, 42, 68, -41, 81, 5, -96, 115, 0, 0, -12, 50, 38, 100, 116, 119, 118, 118, 2, -127, 64, 48, 24, 92, 91, 91, -101, -103, -103, 57, 121, -14, -28, -119, 19, 39, -38, -38, -38, 100, 89, -58, -93, 126, -63, -113, -30, -88, -126, 12, 12, 59, -77, -39, -20, 107, 123, -36, 19, 78, 2, 10, 25, -83, -65, 48, -5, 77, 114, 79, 127, 99, 99, 99, 102, 102, 102, 98, 98, -30, -10, -19, -37, 79, -98, 60, -103, -98, -98, -114, 70, -93, 112, 25, 41, 26, -86, 84, 15, 3, 17, 26, -75, 65, 7, -22, 76, -30, -15, -8, -10, -10, -10, -10, -10, -10, -46, -46, -46, -93, 71, -113, 78, -100, 56, 113, -30, -60, -119, -106, -106, 22, 72, -94, -94, -40, -48, -97, -95, -99, -65, -28, 36, 8, 85, 19, -124, 43, 33, 32, -90, 79, -98, 60, -7, -10, -37, 111, -81, 95, -65, -2, -32, -63, -125, -99, -99, 29, 122, 40, -104, 104, 34, 69, 39, -111, -18, -69, -110, 48, 122, -107, -76, -70, -95, -19, -28, -117, 23, 47, -106, -106, -106, -18, -35, -69, 119, -31, -62, -123, 100, 50, 121, -26, -52, -103, -58, -58, 70, -52, 65, -61, 81, -65, -32, -114, -22, -114, 63, 100, 39, -31, 107, 84, -127, -82, -90, 105, -70, 37, 89, 81, 20, 97, -122, 35, -111, -56, -113, 63, -2, -8, -11, -41, 95, 95, -69, 118, 109, 102, 102, 38, 22, -117, -23, -110, -109, -76, 42, -81, 76, -18, -96, 8, 74, 49, -65, 24, -44, -95, -22, -119, -57, -29, -49, -98, 61, -101, -101, -101, 123, -12, -24, -47, -7, -13, -25, 51, -103, -52, -87, 83, -89, 90, 90, 90, -100, 78, 103, -111, -36, -46, 46, -97, -127, -114, 35, 65, -20, 102, 103, 103, -65, -5, -18, -69, -49, 62, -5, -20, -7, -13, -25, -21, -21, -21, -15, 120, 60, -81, -23, -61, 22, 105, -75, -89, -69, -103, 10, -49, 102, -111, 73, -60, -71, 64, -121, 25, -45, 116, -111, 72, -28, -101, 111, -66, 121, -2, -4, -7, -43, -85, 87, -33, 121, -25, -99, 75, -105, 46, 97, -11, 48, 24, 70, 72, -49, -32, 68, 65, 54, -11, 117, 102, 32, -39, 93, 79, -81, 81, 85, 93, 116, 116, 61, 63, 63, -1, -25, 63, -1, -7, -45, 79, 63, 125, -2, -4, 121, 32, 16, 72, 38, -109, 28, -57, 73, -110, -124, 81, 12, -99, 83, 64, -24, 52, 38, -24, -6, -54, 96, 79, 113, -91, -29, 17, -48, 50, -56, 70, 77, -45, 22, 23, 23, -1, -8, -57, 63, 62, 120, -16, -32, -67, -9, -34, 123, -9, -35, 119, 47, 95, -66, 12, 41, 18, 85, 85, -47, 11, 69, -33, 74, -92, 45, 35, -55, -39, 64, -114, -29, 18, -119, -60, -35, -69, 119, -65, -1, -2, -5, -81, -65, -2, -6, -2, -3, -5, -63, 96, 80, 81, 20, -108, 57, 36, 85, -95, 89, -61, -127, -102, 55, 45, -5, 4, -102, 59, -4, -122, 118, 12, -24, 121, -28, 56, 14, 50, 96, -15, 120, -4, 79, 127, -6, 83, 48, 24, 12, -123, 66, -25, -49, -97, -9, -7, 124, 120, -29, 70, 101, 86, 13, -9, 104, 21, 116, -86, 22, 63, 107, -71, -60, 30, -57, 113, -87, 84, -22, -50, -99, 59, 55, 111, -34, -4, -6, -21, -81, 39, 39, 39, -93, -47, -88, 70, 37, -18, -23, 2, 20, -35, 51, -94, 93, 21, 82, 125, 30, 41, -34, -123, -47, -49, 36, -124, -92, -45, -23, -51, -51, 77, -72, -39, 112, 56, 28, 12, 6, -49, -98, 61, -21, -9, -5, 97, -23, -126, -53, -83, 94, 0, 68, -76, -110, -40, 98, 54, -101, 77, 38, -109, -53, -53, -53, 95, 124, -15, -59, -115, 27, 55, -18, -35, -69, 7, -31, 31, -95, -40, 111, -107, 125, 43, 29, 58, -90, -23, 14, 35, -47, 69, 47, -12, -98, 125, -98, -25, 51, -103, -52, -93, 71, -113, -74, -73, -73, 55, 54, 54, -68, 94, -17, -48, -48, 80, 67, 67, -125, 44, -53, -88, -61, -24, 46, -104, 47, 74, 40, -63, 32, 84, 82, 20, -46, -23, 43, 43, 43, 127, -8, -61, 31, 110, -36, -72, 113, -1, -2, 125, 66, 8, -108, 25, 98, -107, 34, -72, -9, -72, 110, 78, 67, -9, -20, -86, 80, -46, -24, -100, -65, 46, 65, 5, -77, -111, 74, -91, 30, 61, 122, -76, -75, -75, -75, -74, -74, -26, 114, -71, 78, -100, 56, -47, -36, -36, 76, 114, -109, -122, 63, 17, 105, 25, -62, 52, -61, -61, -121, 15, 127, -13, -101, -33, 92, -65, 126, 125, 121, 121, 25, 86, 108, -72, -35, 94, -69, -114, -3, 26, -107, 123, -91, 97, 116, 74, -51, -97, -119, 2, -128, 59, 4, 81, -64, 47, 113, -78, 112, -93, -122, -47, -84, -95, 107, -79, -71, -71, -7, -3, -9, -33, 39, 18, -119, 15, 63, -4, -16, -109, 79, 62, -127, -67, 81, 21, 27, 127, -83, 64, -89, -125, 104, 42, 74, -110, 52, 54, 54, -10, -97, -1, -7, -97, -33, 124, -13, 77, 32, 16, 64, -25, 19, -24, -121, -118, -49, -24, -104, -32, -45, -95, -101, -27, 10, 4, 65, -42, -126, -26, 14, 126, -96, -59, 94, 81, -108, -11, -11, -11, 91, -73, 110, -91, -45, -23, -113, 63, -2, -8, 31, -2, -31, 31, -22, -22, -22, 32, -13, 2, -82, -91, 32, 8, 34, -67, -122, 3, -50, -61, -83, 91, -73, -66, -8, -30, -117, 47, -65, -4, 114, 105, 105, 41, 30, -113, 99, -117, 121, 125, 15, -99, 55, -85, 27, -100, -15, -73, 21, 67, 33, -57, 88, -9, -67, 46, 18, 70, -29, 6, -11, 61, -63, 96, -16, -18, -35, -69, -80, -55, -27, -22, -43, -85, -51, -51, -51, 116, 73, -115, -74, -69, 116, -26, -11, -124, -47, 17, 5, -83, -105, 72, 36, -18, -36, -71, -13, -7, -25, -97, -33, -72, 113, 99, 101, 101, 37, -99, 78, -45, -22, 15, -89, -99, -106, -97, -68, -113, -52, 66, 17, 42, 17, -24, 81, -109, -35, -79, 15, -118, 83, 58, -99, -34, -38, -38, -6, -31, -121, 31, 96, 39, 16, 44, -125, 17, 42, -73, -4, -105, -20, -88, 32, 8, -118, -94, 108, 108, 108, 92, -69, 118, -19, -85, -81, -66, 122, -6, -12, 41, -44, -104, -21, -106, -5, -72, -36, 42, 60, -19, 33, 84, -95, 32, 26, -57, -116, -50, 54, 125, -103, 110, -28, -12, 35, 7, -43, -69, -71, -71, 121, -25, -50, 29, 69, 81, 122, 123, 123, 101, 89, -10, 122, -67, 58, -31, -88, -62, 123, -81, 36, 112, 54, 48, 78, -127, -27, -8, -75, -75, -75, -33, -1, -2, -9, 55, 110, -36, -104, -99, -99, -27, 118, -89, -63, 104, -59, -89, -19, 94, -27, -94, 103, -107, -10, -83, 42, -49, -64, -105, -14, -35, -16, 50, -102, -112, -12, 109, 42, -118, 18, 8, 4, 110, -35, -70, -107, -55, 100, 64, -112, -32, 69, 38, 63, 5, -58, 36, 39, -93, 28, -57, -51, -50, -50, -2, -31, 15, 127, -8, -97, -1, -7, -97, -87, -87, 41, 48, 5, -58, 124, -108, -106, 111, 21, -34, -24, -78, -25, 117, -30, 117, -7, 125, 90, 124, -15, 79, 70, -1, -48, -104, -127, -44, 125, -58, -57, -49, 23, -40, 68, -81, -27, -86, 117, -13, 58, -52, 121, -97, 52, -18, 97, 35, -124, -124, 66, -95, 7, 15, 30, -4, -5, -65, -1, -5, -51, -101, 55, 97, -31, 20, -85, 76, 95, 115, 6, -110, -36, 82, 4, -83, -38, 120, -98, -97, -99, -99, -3, -35, -17, 126, -9, -43, 87, 95, -51, -50, -50, -46, -43, 17, -12, -81, -16, 27, -93, 102, -60, 47, -115, -49, 11, -97, 114, -34, 48, -116, -49, 109, -4, 51, -114, -109, -93, 74, 14, -13, -6, 47, -36, -18, -67, -32, 37, 70, -95, 104, -7, 1, 88, 47, -115, 127, -59, -49, -94, 40, -122, -61, -31, 123, -9, -18, -3, -57, 127, -4, -57, -83, 91, -73, 112, 109, -103, -125, 2, 110, -120, -126, 18, -119, -60, -60, -60, -60, -17, 126, -9, -69, -71, -71, -71, 88, 44, 86, 72, -96, 15, 2, -38, 82, -21, -122, 88, -56, -83, -51, -21, 12, 67, -91, -126, -79, 12, 23, 127, -107, 55, 64, -35, 31, 56, -114, 83, 85, 53, 28, 14, -33, -70, 117, -85, -79, -79, -79, -73, -73, -73, -69, -69, -37, -23, 116, 22, 25, -13, 107, 5, 90, -39, 115, -71, 101, -98, -119, -119, -119, -33, -1, -2, -9, -117, -117, -117, -119, 68, -62, -60, 103, 65, 12, -113, -101, 54, -65, 72, -23, 66, -125, -44, 61, 47, -70, -84, 18, -54, -95, -54, -73, 4, -126, -86, 42, 20, 10, 125, -5, -19, -73, 126, -65, -65, -65, -65, -65, -83, -83, -51, 110, -73, -1, 37, -68, 73, -91, 82, 11, 11, 11, -9, -18, -35, -69, 121, -13, 102, 52, 26, -43, -35, -80, 89, -56, 82, 39, 86, -28, -3, 83, -95, -20, -114, 49, 90, -64, -40, 76, 119, 37, 41, -96, -25, 14, 8, 69, 81, -26, -25, -25, 97, -51, 6, -74, -70, 104, -69, 97, 110, 119, -75, 5, -116, 80, -32, -28, -124, 23, 47, 94, 76, 76, 76, -116, -115, -115, -63, 68, -103, -98, 77, -47, -123, 12, -76, 36, -28, 125, 28, -56, 64, -29, 15, -71, 92, 37, 6, 68, 94, 101, 77, -4, -128, -1, -88, 40, -54, -44, -44, -44, -35, -69, 119, 127, -8, -31, -121, 112, 56, -4, 83, 73, 22, 120, 86, -87, 84, -22, -77, -49, 62, -69, 121, -13, 38, 86, -81, 99, -15, -98, -71, 103, -26, -94, 29, 51, 18, -122, 118, 75, 56, -22, -3, 71, -12, 111, -31, -65, -112, 100, -125, 37, 23, -8, -109, -79, -112, -59, -60, 49, 107, -71, -99, 102, 79, -97, 62, -67, 118, -19, -38, -38, -38, 90, 42, -107, -62, -102, -84, -41, -100, -127, 8, -40, 117, 30, 10, -123, 62, -3, -12, -45, -101, 55, 111, -30, 113, 65, 101, -19, 84, 23, -25, 115, -69, -73, -71, 96, 9, -85, -106, -37, -83, -49, 83, 103, -123, -95, 91, -53, 113, 28, -20, 102, -28, -14, -19, -110, 49, 101, -124, -124, 74, -68, -85, -86, -6, -16, -31, -61, -1, -6, -81, -1, 10, 6, -125, -16, 13, 79, 8, -119, 68, 34, 115, 115, 115, 99, 99, 99, -77, -77, -77, -123, -52, -117, 89, -56, -101, -14, -30, -87, 67, 43, -24, -53, -56, 110, 47, 20, 63, -64, -110, -99, 110, -123, -109, -28, -45, 121, 7, 7, 42, 87, 65, 16, 34, -111, -56, -45, -89, 79, -17, -34, -67, -69, -72, -72, -88, 43, 34, 101, -32, 56, 46, 22, -117, -51, -49, -49, -33, -66, 125, 123, 110, 110, 14, 107, 27, -52, -19, 2, 62, -16, -44, 14, 90, -99, 66, 7, -66, -31, -106, 14, 122, 3, 29, -98, 124, 65, 118, 11, 9, 29, 124, -106, 91, -91, -62, 32, -73, -73, -73, 127, -4, -15, -57, -5, -9, -17, -81, -83, -83, -3, -108, 90, 8, 4, 2, 79, -98, 60, -103, -103, -103, -127, -115, 82, -12, -43, 121, -125, 102, 83, -122, 66, 127, -58, 36, 7, -108, -116, -61, -23, 76, -16, 1, -22, -18, 81, -121, -63, 28, -63, -110, 29, 110, -16, 35, -122, -45, -105, -51, 5, -22, 81, -56, 30, -113, -115, -115, 77, 79, 79, -21, -106, 118, 76, -17, -76, -74, 0, 83, -79, -75, -75, 5, -126, 20, 12, 6, -47, -111, 41, -57, -28, -96, -14, 37, -69, 77, 13, 77, 66, 16, 42, 65, 16, 100, 89, -122, 67, -122, 64, -88, 80, -112, 10, 85, -22, -108, -61, -22, -48, -61, -122, 106, -112, -51, -51, 77, -40, 9, -56, -13, -68, -56, 113, -36, -12, -12, -12, -115, 27, 55, -94, -47, 40, -67, -76, -83, 81, 123, 49, 77, 28, 16, -36, -92, 36, 73, 80, -121, 73, 12, -23, 53, -73, -37, 45, 73, 18, -52, 29, 112, 15, -74, 83, -63, 1, 7, 112, 89, 34, -111, -96, -53, 6, 80, -73, -31, -42, 53, -45, 21, 7, -52, 76, 54, -101, 77, 36, 18, -33, 125, -9, -35, -64, -64, -64, 47, 127, -7, 75, 115, -69, -88, 81, 32, 1, -78, -39, -20, -52, -52, -52, 87, 95, 125, 21, -117, -59, 52, 77, -61, 42, 43, -45, -5, 34, -69, 43, -89, -31, 27, -38, 96, 64, -12, 101, -73, -37, -31, -76, 33, -102, 117, -103, 76, 38, -103, 76, 70, -93, 81, -52, -4, 3, 81, 117, 37, -84, -26, -54, 60, -12, -114, 7, -96, -127, 58, 72, -89, -45, -33, 127, -1, -3, -87, 83, -89, -50, -99, 59, 39, -62, -18, -26, -55, -55, 73, 8, -93, 105, 119, 81, 43, -80, 83, 105, -33, -96, 31, 24, 124, -122, -111, -119, -94, -40, -45, -45, -45, -35, -35, -35, -45, -45, -29, -13, -7, -100, 78, -89, -61, -31, -64, -112, 15, -26, 46, 22, -117, -63, -7, 81, -53, -53, -53, -113, 31, 63, -122, 45, 48, 70, 53, 102, 122, -112, -58, 81, -107, -112, -124, 16, 69, 81, -106, -106, -106, -26, -26, -26, 86, 86, 86, 26, 27, 27, 37, 73, -46, 109, 125, 126, -35, -128, 115, -98, 76, 38, 95, -68, 120, 113, -17, -34, -67, -99, -99, 29, -48, -9, -96, 100, 77, -121, 46, -94, -63, 111, 56, -114, -85, -85, -85, -21, -23, -23, 105, 111, 111, 111, 111, 111, 111, 109, 109, 117, -71, 92, -80, -93, -113, -49, -99, 14, 1, -69, -46, -73, -73, -73, -41, -42, -42, -26, -25, -25, -89, -90, -90, 118, 118, 118, 116, -18, -88, -79, -3, -125, 0, 29, 52, -108, 85, 96, 83, 58, -99, 94, 88, 88, -104, -97, -97, 95, 89, 89, 17, -73, -73, -73, -105, -105, -105, -23, 125, -51, -70, 1, -103, -98, 53, -46, 114, -71, 96, -104, 29, 73, -110, 124, 62, -33, -39, -77, 103, -49, -97, 63, -1, -42, 91, 111, 121, 60, 30, -73, -37, -19, 114, -71, -72, -36, -127, -109, -32, 33, -89, -45, -23, -71, -71, 57, -40, -115, -106, -55, 100, -64, 121, -90, 35, 114, 108, -36, -60, -95, -110, 124, 113, 102, 44, 22, 91, 91, 91, -101, -99, -99, 5, -93, 13, -26, -41, -36, 78, 107, 8, 40, 88, -47, 104, 116, 117, 117, 117, 97, 97, 1, -118, 99, 32, 104, 55, -35, 37, 49, 90, 5, 52, -119, 14, -121, -93, -83, -83, -19, -19, -73, -33, 30, 29, 29, 61, 117, -22, 84, 111, 111, -81, -61, -31, -128, 107, -48, 11, 69, 18, 78, 77, 77, -115, -115, -115, 101, -77, -39, -23, -23, -23, 112, 56, -84, -69, 29, 19, 119, 108, 96, 44, -109, 78, -89, 105, 109, -98, -51, 102, -125, -63, -32, -14, -14, -14, -52, -52, -116, -8, -12, -23, -45, -91, -91, -91, 72, 36, 2, 55, 67, -37, 104, 48, 53, 38, -50, 35, 45, -48, -48, -99, -94, 40, -125, -125, -125, -17, -65, -1, -2, -33, -1, -3, -33, 119, 119, 119, 67, 25, 1, -82, -73, 98, 80, 1, 30, 108, 119, 119, 119, 107, 107, -21, -79, 99, -57, -114, 28, 57, -14, -39, 103, -97, 125, -6, -23, -89, 24, 27, -32, -22, -71, 110, -125, -1, -63, -111, -51, -99, -76, 15, 69, 69, -94, 40, 102, 50, -103, 64, 32, -16, -29, -113, 63, 14, 12, 12, -96, -73, -13, -38, 2, -56, -106, 76, 38, 103, 102, 102, 86, 87, 87, 33, 80, 7, -25, -123, -108, -63, -69, 35, 5, 10, 15, 37, 73, -22, -17, -17, 127, -9, -35, 119, 63, -7, -28, -109, -50, -50, 78, -121, -61, -31, 112, 56, -24, 2, 67, -48, -26, -78, 44, -61, -15, -66, 77, 77, 77, 125, 125, 125, 93, 93, 93, -65, -7, -51, 111, -2, -9, 127, -1, 23, -49, 104, 2, -85, 104, -18, -126, 33, 70, 94, 40, -1, 40, -76, 75, 75, 75, 119, -17, -34, 21, 103, 102, 102, 54, 55, 55, -95, -106, -108, 80, 97, 27, -19, 127, -101, 56, 32, -70, 11, 66, -120, -53, -27, 26, 25, 25, -7, -16, -61, 15, 7, 7, 7, 93, 46, 23, 33, -6, 100, 35, 122, 26, 60, -49, -37, -19, 118, 56, -12, -2, -4, -7, -13, -85, -85, -85, 19, 19, 19, -85, -85, -85, -87, 84, 10, 93, -120, -68, 53, 22, 38, 2, 85, 82, 40, 20, -102, -99, -99, 69, -33, -95, 124, 61, 86, 63, 96, -62, 21, 69, 89, 92, 92, 12, 4, 2, -58, 104, -51, 68, -24, 28, 69, -100, 121, -114, -29, 96, -113, -62, 71, 31, 125, 52, 48, 48, -32, 116, 58, 117, -50, 42, 71, -27, -49, 33, -49, 7, -126, 116, -15, -30, 69, 56, 46, 112, 115, 115, 19, 12, 120, -103, 18, 51, -70, 93, 4, 36, -89, 26, 54, 54, 54, -98, 60, 121, -62, -65, 120, -15, 2, -52, 49, 38, 24, 9, -27, 49, -106, 67, -121, 113, 84, -94, -71, -79, -79, -15, -40, -79, 99, 103, -50, -100, -87, -81, -81, 39, 123, -79, 8, 83, 47, 29, 29, 29, 112, -38, 92, 93, 93, -99, 70, 109, -21, 46, 83, -59, 3, -19, -51, -125, 74, -117, 70, -93, 80, -108, -84, -53, -47, -107, 85, 5, 84, 39, -48, 116, -84, -83, -83, -63, -62, 23, -70, 39, 101, -99, 19, 110, -9, 106, 59, 28, 64, 120, -10, -20, 89, 40, 102, 34, -122, -84, 41, -67, -6, 5, -65, 18, 69, -15, -56, -111, 35, -61, -61, -61, 3, 3, 3, -110, 36, -107, 111, -100, -124, 18, 15, 93, -52, 25, 10, -123, -26, -26, -26, -8, -71, -71, -71, 72, 36, -126, -57, 36, -30, -127, 31, -92, 12, -15, 21, -55, 17, 9, 38, 66, -106, -27, -127, -127, -127, -61, -121, 15, -93, -105, 111, 92, -96, -89, 111, -122, -53, 21, 7, 106, -102, 118, -24, -48, -95, 55, -33, 124, -45, 110, -73, 107, -122, 101, -97, 50, -127, -10, 37, 18, -119, 68, 32, 16, 40, 83, -30, -95, -74, 0, 81, 64, 54, -101, 93, 95, 95, 15, -123, 66, 92, 110, -115, -50, -72, 77, -20, -32, -48, 9, 49, -42, 48, -37, 108, -74, -29, -57, -113, 119, 116, 116, -48, -126, 94, 68, -106, 8, -27, -93, 118, 116, 116, -100, 62, 125, -38, -27, 114, -103, 27, 121, -47, 29, -47, -103, 11, -38, 13, 20, 69, 49, 22, -117, 45, 47, 47, -117, -95, 80, 40, -103, 76, -22, -52, 55, 41, -13, -86, 37, -88, 37, 73, -110, -102, -101, -101, -67, 94, 47, 60, 69, 84, 81, 121, 39, 78, -93, 106, -46, 9, 33, -11, -11, -11, -83, -83, -83, -78, 44, 87, 108, -52, -12, 72, 96, -9, 61, 28, -35, -9, -102, -57, -124, 0, 77, -45, 96, 13, -87, 2, -86, -112, -10, 45, -63, -127, 20, 4, -95, -91, -91, 5, 54, -72, -24, 4, -55, -24, -69, -46, -19, 16, 66, -36, 110, 55, 8, 82, -7, -68, 104, -124, -74, 59, 123, -81, 105, 90, 42, -107, -118, 70, -93, 124, 34, -111, -64, 19, 123, 43, 6, 62, -121, -6, -6, -6, -70, -70, 58, -12, -127, 113, 106, -118, -125, -29, 56, -69, -35, -18, -15, 120, 116, -91, 5, -27, 29, 116, 14, -32, -108, -62, -85, 127, -116, -53, 36, -81, 39, -78, -71, -41, 111, 17, 42, -90, 40, -33, -76, -96, -57, -117, 53, 30, 30, -113, 7, 94, -91, -12, 82, -115, 64, -94, -63, -27, 114, -127, -11, 46, -109, 62, -91, 37, -109, -98, 19, 72, 95, -91, 82, 41, 30, -34, -25, 70, 95, -83, 115, -90, -53, 49, 44, -110, -93, 28, -68, -65, -123, -68, 100, 78, 69, -45, 52, -101, -51, -26, 118, -69, -51, -83, 107, 45, -34, -93, 113, -6, -14, 110, -11, 122, -35, -128, 50, 3, 39, -99, -109, 50, -89, -57, -16, 65, -48, 1, 39, -49, -13, 64, -62, -105, -19, -105, -29, 56, -101, -51, -26, 116, 58, -23, 60, 42, -87, 84, -78, 77, -45, 52, 120, 87, -89, 72, -17, 108, -48, 41, -80, -14, 89, 103, -68, 91, -88, 74, -37, 71, 11, -112, 110, -90, -61, -41, 74, -102, 35, 109, -9, 59, -12, 42, -42, 111, 117, -126, -53, 85, -43, -45, 101, 76, -27, -21, -114, 118, -25, 72, 78, -101, 67, 125, -43, 75, -11, 11, 50, 35, 8, 2, 84, 65, -106, 35, -120, 37, 123, 77, -123, -122, -101, 122, 1, -107, -12, -24, -116, -58, 86, 23, -77, -18, 9, -99, -13, 80, -18, -59, 9, -70, 95, -8, -64, 92, 80, 29, -24, 71, 64, 11, 82, 89, -123, -118, -18, 113, -33, 29, -15, 5, 78, 93, 40, 31, 112, -76, -48, -81, 126, -41, 66, 101, -6, -58, 30, -47, -98, -48, -37, 76, 74, 105, 7, 28, 66, -51, 112, 48, 94, 5, 84, 9, 6, 36, 101, -19, -91, 70, 97, 122, -67, 49, -115, 34, -87, 78, -80, -61, 47, 21, -44, -47, 76, -96, -65, 41, -45, -109, -91, 91, -90, 19, 75, 123, -20, -122, 52, 29, 58, -86, 64, 82, 84, -73, -39, -92, -12, -90, -16, -40, 111, 29, -79, -51, 5, 35, 91, 113, -64, 51, 45, 50, 75, 21, 112, 77, 57, -114, 43, 125, -17, -94, 81, -50, -23, -116, -96, -114, -106, 21, 0, -57, 113, -59, 52, 71, 5, -122, 66, -49, -56, 75, -7, 3, 121, -21, 18, 43, -96, 74, -24, 46, 42, 28, -120, 86, 39, -116, 2, 93, -79, -66, 16, -36, 1, -10, -36, -23, 30, 98, -59, 124, 28, -70, -33, 93, 73, 17, -114, 122, -119, 116, 89, 37, 12, 93, 112, -72, -25, 108, -18, -32, -12, -46, -17, 31, 75, -29, -53, -19, -54, 23, -102, 4, 70, -65, -68, -48, 118, -65, -115, -80, -36, -77, -108, -51, -99, -47, 6, 123, 5, 75, -4, -107, 46, -75, 67, -5, -91, -27, 75, 46, 20, 105, 54, -1, 43, 47, 43, -26, -105, 98, -91, -114, -106, -53, 53, -105, -8, 115, -114, -29, -24, -29, 45, 16, -27, 83, 99, 70, -97, -66, -84, -35, -43, 28, -116, 65, 65, -7, -84, -118, -79, 20, 6, -10, -96, -106, -98, -43, 43, 20, -59, -104, 46, -7, -91, -52, -128, -88, -101, -87, -78, -46, -49, 56, 32, 48, 104, 63, -27, -120, 74, -34, -107, -89, -27, -10, 34, 18, 74, -103, -111, 50, 108, 6, 43, 14, -58, 64, 82, 96, 18, -54, 20, 95, -47, 13, -22, 26, 71, -73, -88, -12, 70, -72, 92, -79, -92, 113, -100, 101, -75, -31, -58, -58, 69, -6, 72, -42, 10, 24, 64, -8, -128, 22, 15, 122, -57, -67, 103, 37, 122, 20, -72, 71, 83, -25, 87, -112, 50, -20, -7, 64, 24, 39, -121, 121, -92, 36, 31, 9, -15, 17, -104, 94, -55, 96, 124, -54, -40, 59, 84, 125, -107, -66, 15, 16, -13, 73, 121, 53, -123, -119, 79, -74, -72, -40, -4, 100, 126, -32, 63, 21, 86, -22, -58, 92, -19, 75, 57, 18, -8, 91, 70, 3, 6, -64, -66, -123, -95, -14, -23, 80, 35, 88, -15, 49, 3, -125, -59, 96, 36, 100, 96, -80, 24, -116, -124, 12, 12, 22, -125, -111, -112, -127, -63, 98, 48, 18, 50, 48, 88, 12, 70, 66, 6, 6, -117, -63, 72, -56, -64, 96, 49, 24, 9, 25, 24, 44, 6, 35, 33, 3, -125, -59, 96, 36, 100, 96, -80, 24, -116, -124, 12, 12, 22, -125, -111, -112, -127, -63, 98, 48, 18, 50, 48, 88, 12, 70, 66, 6, 6, -117, -63, 72, -56, -64, 96, 49, 24, 9, 25, 24, 44, 6, 35, 33, 3, -125, -59, 96, 36, 100, 96, -80, 24, -116, -124, 12, 12, 22, -125, -111, -112, -127, -63, 98, 48, 18, 50, 48, 88, -116, 26, 35, 33, 59, 94, -115, -31, -43, 67, -115, -111, -112, 48, 30, 50, -68, 114, -88, 61, 18, 50, 48, -68, 98, 96, 36, 100, 96, -80, 24, 53, 70, 66, -10, -6, 7, -122, 87, 15, 53, 67, 66, -35, 107, 28, 25, 24, 94, 25, -44, 12, 9, 25, 24, 94, 85, 48, 18, 50, 48, 88, -116, -102, 33, 33, -3, -110, 106, -85, -57, -62, -64, 96, 38, -60, -67, 47, -79, 2, 58, -90, 25, 95, -111, -53, -64, -16, -54, -96, 102, 44, 33, 3, -61, -85, -118, 106, 36, 97, -95, -105, -101, 50, 119, -108, -31, -107, -124, -59, 36, -92, -33, -68, 91, 10, 116, 47, 22, 47, -61, -120, 24, 24, 42, 13, 11, 98, 66, 46, 7, 66, -120, 32, 8, -8, -2, -6, 18, 127, 8, -97, 5, 65, -112, 36, 9, 94, 94, 15, -17, -81, 47, -41, 112, 25, 24, -54, -116, -118, -110, 80, 16, 4, 77, -45, -78, -39, -84, -86, -86, 28, -57, 9, -126, -112, 74, -91, -30, -15, 120, 44, 22, -53, 102, -77, 28, -57, -107, 72, 72, -114, -29, -94, -47, 104, 56, 28, 38, -69, -33, 119, 79, 127, 102, 96, -88, 21, 84, -102, -124, -39, 28, -128, -112, -127, 64, 96, 126, 126, -34, -29, -15, 0, 45, 121, -98, 47, -123, 69, -126, 32, 108, 108, 108, -52, -52, -52, -92, -45, 105, -98, -25, 21, 69, 33, -108, -99, 100, 60, 100, -88, 45, 84, -108, -124, -103, 76, 6, 24, 34, 8, 2, 33, 36, 20, 10, -3, -15, -113, 127, -68, 117, -21, -106, -41, -21, 77, -91, 82, 28, -57, -119, -94, -88, -86, -22, -98, 44, -30, 56, 78, 81, -108, 120, 60, -66, -78, -78, 2, 124, -122, 95, -63, 15, -103, -125, -54, 80, 91, -80, 102, -99, 16, -40, -94, 40, 74, 32, 16, -40, -34, -34, -106, 36, 41, -109, -55, 16, 66, 120, -98, 47, -123, 60, -32, -75, 102, -77, 89, -8, 85, -34, -58, 25, 24, 106, 5, 21, 37, 33, -70, -117, 16, 1, -126, -67, -54, 100, 50, -86, -86, -86, -86, -86, -69, -84, 8, -48, -83, -123, 43, -127, -73, -12, -126, 62, -29, 33, 67, 13, -95, -94, 36, -44, 113, 3, -41, -3, 84, 85, -123, 60, 39, 6, 120, -59, -127, 46, 43, -99, -119, -47, -83, 94, 48, 30, 50, -44, 10, 44, 32, 33, -99, 62, -127, 76, 12, -38, 46, -80, 105, -91, -60, -124, 64, 90, 58, 47, 74, 119, -63, 24, -56, 80, 67, -80, 32, 38, -44, 52, 13, 57, 3, 36, -92, -45, 42, -91, 0, 73, -88, 40, 10, 77, 108, -62, -24, -57, 80, -125, -80, -84, -128, 27, -20, 24, 58, -106, -72, 66, 88, 74, 98, 6, 3, 66, -92, 28, 29, 22, -78, -20, 40, 67, 109, -63, -30, -78, -75, -68, 81, -30, -98, 64, -121, 22, -20, 33, -3, 37, 97, -119, 25, -122, 90, 67, 69, 73, -88, 115, 26, -23, 44, 40, 24, -73, -46, 73, 72, 27, 61, -78, -69, 20, -114, 48, -89, -108, -95, -90, 96, 89, 118, -12, 32, 60, 65, 87, 19, 23, 54, 42, 108, -3, -40, 105, 55, 12, 38, -94, 26, -73, 50, -43, 10, -104, -67, 101, 48, 5, -116, -124, 12, 12, 22, -125, -111, 112, 63, -64, 53, 18, -85, 7, -62, -16, 42, -128, -111, -112, -127, -63, 98, 48, 18, 50, 48, 88, 12, 70, -62, -3, 0, 106, -48, -39, -126, 36, -125, 41, -88, 34, 18, 86, 127, -120, 101, 28, 97, -11, -113, -103, -95, -6, 81, 21, -25, -114, 26, -85, 94, -86, 16, -116, -127, 12, 101, 66, 85, -112, -112, 70, 21, 74, 54, 84, -100, 27, 55, 106, 48, 95, -108, -63, 20, 88, 79, 66, 29, -21, -24, 61, 22, -106, -61, -72, 89, 17, -72, -105, -91, 96, -35, -24, 24, 94, 17, 88, 76, 66, 89, -106, -85, 124, -63, -115, 62, -73, -122, -28, 72, 40, -53, -78, 44, -53, -43, 60, 108, -122, 26, -126, 53, -57, 91, -64, 54, 66, 81, 20, 59, 58, 58, -22, -21, -21, -19, 118, 59, 33, 68, -73, 79, -73, 74, 64, -109, 16, 15, -26, -112, 101, -71, -67, -67, -35, -27, 114, -107, 126, 104, 42, 3, 67, 33, 88, 118, -48, 19, -49, -13, -11, -11, -11, -93, -93, -93, -57, -113, 31, -17, -20, -20, 4, 105, -82, 66, -37, -110, 119, -45, 48, 12, -2, -48, -95, 67, -94, 40, -22, 34, 70, 6, -122, -105, -123, 53, -69, 40, 64, 112, -21, -22, -22, -122, -121, -121, -33, 125, -9, -35, -47, -47, -47, -102, 72, -112, 34, -64, 36, -126, -30, -88, -86, 32, -106, -95, 22, 81, 105, 75, -120, -57, 108, 103, -77, -39, 84, 42, -107, 78, -89, 97, 59, 18, -4, 91, -123, 38, 5, 79, 37, -58, -19, -114, -94, 40, -62, 55, 112, -12, -80, 36, 73, 86, -113, -111, -95, -74, 97, -115, 59, 10, 50, -115, 7, 31, -62, 105, 20, 112, 48, -66, 37, -29, 41, 2, -12, -109, -115, -89, -125, 11, -126, 80, 109, 42, -125, -95, 22, 81, 105, 18, 66, 118, -111, -34, 17, -113, 78, 29, -49, -13, -43, -106, -25, -48, 52, 13, -11, 2, -51, 55, -72, 11, 81, 20, 9, 115, 71, 25, 14, -116, 74, 31, 111, 1, 70, 79, 85, 85, 88, 97, 67, 123, 88, 19, 11, 21, -120, 108, 54, 11, 7, -67, 65, 112, 104, -43, -88, 24, 94, 13, 84, 122, -119, 2, -33, 69, 1, -78, 11, 103, 111, -93, 49, 119, 121, -101, -101, 0, 0, 23, -121, 73, 68, 65, 84, 49, -98, 61, 99, 57, -112, 99, -12, -88, -64, 115, -42, -99, 19, -57, -64, -80, 63, 88, -13, 126, 66, 12, -76, -16, -28, 95, 36, 97, -75, 45, 21, -22, -50, -40, 7, -64, -8, 21, 69, -87, 66, 23, -102, -95, -26, 80, 81, 18, -94, 85, -127, -41, 51, 105, -102, 38, 73, 18, -68, -21, -109, 80, -43, -104, 85, 101, 9, -23, -20, 11, 120, -47, -112, 29, 37, -84, 124, -108, -63, 36, 88, -80, 68, -127, 6, -112, -28, -8, 6, -39, 127, -35, -79, -123, 85, 2, -38, 68, 115, -44, 107, 76, -15, -44, -45, 42, 84, 28, 12, -75, 5, -53, 72, -120, -33, -48, -81, 13, 69, 17, 47, 34, -45, 47, 117, 90, -2, 65, -122, 74, 118, 111, -104, -96, -77, 71, -96, 53, 32, 113, -54, -78, -93, 12, 7, 68, -91, -29, 25, 122, 121, -112, -28, 36, -8, -91, -34, 92, 79, -14, 109, 110, -64, 116, 43, -55, -107, -77, -104, 56, 102, -50, -16, 30, 111, -106, 29, 101, 48, 17, -106, -67, 16, 6, -115, 12, 121, -103, -77, 116, -115, 47, -97, -48, 45, 60, 98, -125, -90, 68, 107, -40, 8, -105, 123, -71, 5, 122, -95, -104, -32, 101, -119, 25, -122, 3, -62, -6, -3, -124, -5, 0, 110, 104, -128, 117, 2, 85, 85, 49, 89, -126, -85, -114, -90, 100, 77, 116, -15, 30, 86, -82, 65, 82, 52, -109, -55, 84, 97, 16, -53, 80, 115, -88, 73, 18, 18, 106, -33, 19, -19, 13, 106, -102, -90, 40, 10, 56, -73, -90, 24, 67, 52, -128, 64, 54, 8, 2, -111, 117, 85, 88, 100, -57, 80, -117, -88, 46, 18, -106, -98, -113, 73, 38, -109, 91, 91, 91, -29, -29, -29, -31, 112, -104, 118, 71, -31, -91, -65, -72, -110, 126, 64, -48, -66, 46, -6, -49, 28, -57, -119, -94, -24, 118, -69, 71, 71, 71, -3, 126, 63, 115, 71, 25, 14, -120, -22, 34, 97, -23, 72, 38, -109, -117, -117, -117, -1, -3, -33, -1, -3, -30, -59, 11, 122, -123, -125, -104, -3, 126, 66, -44, 11, 90, -18, -104, 67, -98, -25, 101, 89, -18, -24, -24, 104, 111, 111, -9, 120, 60, -78, 44, -101, -46, 17, -61, 107, -117, 90, 37, 97, 54, -101, -115, -59, 98, 79, -97, 62, -99, -98, -98, -26, 56, 14, 54, 28, 113, 5, 94, 97, 127, 112, -24, -106, 55, 37, 73, -118, 68, 34, -80, -107, -55, -60, 94, 24, 94, 79, -44, 42, 9, -63, 46, 37, 18, -119, 88, 44, 70, -88, -19, -120, -60, -20, 117, 115, 58, 1, 75, 114, -18, -88, 44, -53, -23, 116, 26, -106, 91, -64, 1, 102, -23, 25, -122, 125, -93, 54, 72, -104, -41, -84, -47, 21, 54, -70, -75, 10, -40, -81, 104, 74, -41, -80, 20, -127, 47, 66, -124, -58, 69, 81, 20, 69, 17, -73, -125, 48, 123, -56, 112, 16, -44, 6, 9, -115, -128, -107, 9, -96, 1, -42, -78, 112, 28, -89, 40, 10, 124, 111, -106, 59, -118, -53, -125, -56, 115, -24, 20, -41, 42, 96, 87, 33, 3, -61, -66, 81, -85, 2, -92, 11, -46, 72, -66, 26, 0, 83, -112, 55, -56, 4, 71, 20, 23, 66, -104, 47, -54, 112, 16, -44, 48, 9, 113, 127, 67, 101, 118, 51, -24, -70, -64, -30, 59, -84, 25, -64, -127, -107, 123, 36, 12, -81, 24, 106, 56, -104, 49, -47, -25, -36, 7, -16, -56, 25, -74, 100, -49, 112, 64, -44, 6, 9, -85, -45, -68, -80, -51, -124, 12, -90, -96, 54, 72, -56, -64, -16, 10, -125, -111, -112, -127, -63, 98, 48, 18, 50, 48, 88, 12, 70, 66, 6, 6, -117, -63, 72, -56, -64, 96, 49, 24, 9, 25, 24, 44, 6, 35, 33, 3, -125, -59, 96, 36, 100, 96, -80, 24, -116, -124, 12, 12, 22, -125, -111, -112, -127, -63, 98, 48, 18, 50, 48, 88, 12, 70, 66, 6, 6, -117, -63, 72, -56, -64, 96, 49, 24, 9, 25, 24, 44, 6, 35, 33, 3, -125, -59, 96, 36, 100, 96, -80, 24, -116, -124, 12, 12, 22, -125, -111, -112, -127, -63, 98, 48, 18, 50, 48, 88, 12, 70, 66, 6, 6, -117, -63, 72, -56, -64, 96, 49, 24, 9, 25, 24, 44, 6, 35, 33, 3, -125, -59, 96, 36, 100, 96, -80, 24, -116, -124, 12, 12, 22, -125, -111, -112, -127, -63, 98, 48, 18, 50, 48, 88, 12, 70, 66, 6, 6, -117, -63, 72, -56, -64, 96, 49, 24, 9, 25, 24, 44, 6, 35, 33, 3, -125, -59, 96, 36, 100, 96, -80, 24, -116, -124, 12, 12, 22, 67, -124, -41, -51, 114, 28, 87, -55, -9, -50, -26, -19, -53, -8, -22, -7, 10, -113, -118, 97, -33, -48, 61, 38, 77, -45, -86, -31, -39, -107, 50, -128, 106, 16, 57, 94, 81, 20, -98, -25, 101, 89, -58, 65, -120, -94, -56, -13, -27, -75, -112, -86, -86, -110, -36, -37, -34, -127, 123, -12, 11, -24, -31, -65, 120, 49, 94, 64, -73, 96, 100, 44, 12, -98, -25, 121, 115, -33, -83, -115, -83, -47, -51, 66, 71, 38, -10, 82, -45, -128, -89, -125, 51, -113, 79, -86, 28, -49, 34, 111, -125, -12, 115, 47, -79, 71, -8, 9, -116, -100, 22, -83, 66, 93, 28, 16, 92, 14, -16, 95, -98, -25, 69, 81, -124, 15, -126, 32, -16, -94, 40, 106, -102, -90, -86, 42, -36, 6, -118, 123, -103, 4, -102, -98, 41, -28, 30, 126, -113, 102, 89, 39, -15, -12, 79, -128, -64, -39, 108, 86, 81, 20, -78, -101, 36, 120, -91, -119, 12, -95, -121, -89, -21, -126, -42, -102, -70, 89, 126, 125, -128, -113, 12, -60, -122, -25, 121, 20, 27, -4, -109, -119, 125, 65, -101, -40, 5, 62, 5, 85, 85, 97, 0, -86, -86, 22, 49, 101, 40, 114, 0, -35, -109, -83, -128, 25, -60, -103, -127, -34, -31, 75, 94, -110, 36, 66, 72, 38, -109, 65, -39, 5, -35, 80, 86, -85, 2, 29, -87, -86, -86, 40, 10, -52, 26, -12, -123, 58, -119, 126, -118, -124, -110, -2, 108, 54, 11, -45, -115, 36, -44, 1, 69, -63, -60, 97, 19, -54, 75, -127, -106, 65, -127, -67, -98, -84, -45, 1, -89, 5, 103, 30, 102, 6, 9, 83, -114, 41, 2, -86, -29, 7, 77, -45, 50, -103, 12, 8, -110, -50, -78, 25, 71, -117, 0, 33, 71, -75, 78, -109, -48, -12, 49, 27, -43, 7, 116, 10, 16, -21, -22, -22, -128, -121, 58, 20, -65, -103, -3, 1, 27, -124, -5, -25, 56, 46, -111, 72, 36, -109, 73, -28, 33, -19, -96, -110, -35, 106, 67, -45, 52, 65, 16, -32, 30, 20, 69, 73, -91, 82, -103, 76, 6, -99, 88, 65, 16, -48, -122, 27, 125, -41, 3, 2, -12, 17, -12, -91, -86, 42, -4, 87, 16, 4, 73, -110, 96, -64, -81, 51, -16, 73, -39, 108, 54, 65, 16, 84, 85, 5, 71, 11, -1, 106, -70, 109, -95, 25, 14, 15, 37, -101, -51, 38, -109, -55, 100, 50, -87, 40, -118, 36, 73, -96, -51, -47, -95, -93, -97, 17, -19, 115, 65, 11, -79, 88, 108, 107, 107, 43, -109, -55, -32, -59, 116, 100, 100, 58, -24, -106, -47, -50, -119, 110, -73, -37, 110, -73, -61, -72, 81, -38, -116, -9, 108, -30, 56, 112, 22, 50, -103, -52, -54, -54, 74, 48, 24, 4, -83, 70, 59, -106, -70, -117, 73, 110, -6, 96, 114, 121, -98, -113, -57, -29, 107, 107, 107, -23, 116, 26, -58, 76, 107, 98, -45, 73, -120, -50, 3, 10, -100, 40, -118, 118, -69, 93, -106, 101, -48, -6, 38, -10, 85, 115, 64, 119, -82, -66, -66, -34, -31, 112, -48, -84, -45, -71, 51, 102, -11, 69, 114, -38, 28, 93, 39, 85, 85, 81, -112, -16, 25, -23, -68, 33, 58, -29, 64, -85, 120, 36, 33, 48, 48, -81, 123, 101, -54, -80, 117, -6, 8, -66, -108, 101, -71, -66, -66, -98, -9, 122, -67, 14, -121, 3, -75, -117, 78, -92, -52, -115, -81, -24, 6, 53, 77, 75, -89, -45, -117, -117, -117, -101, -101, -101, -92, -128, -1, 73, 7, 96, -8, -85, 108, 54, 43, 8, 66, 36, 18, -103, -97, -97, 79, -91, 82, 104, 63, 117, -65, 50, 17, 116, -100, -116, 115, -25, 116, 58, 101, 89, -122, -89, 94, -18, 64, -94, -102, -127, -49, -56, -29, -15, -44, -43, -43, -23, -94, 65, -45, -61, 25, -99, 64, -61, -65, -86, -86, 46, 44, 44, 108, 108, 108, -112, -100, 109, 68, 35, 67, 15, -128, 118, 68, -63, -13, 34, -124, 68, 34, -111, -43, -43, 85, -76, -124, -60, 84, -83, -127, -96, -29, 100, -100, 28, 77, -45, 28, 14, -121, -33, -17, -25, 59, 59, 59, -35, 110, 55, -114, -119, -50, -54, -32, -48, 77, 28, 13, -52, 11, -116, 41, -109, -55, -52, -52, -52, -52, -49, -49, -121, -61, -31, 76, 38, -93, 40, 10, 120, -104, -86, -86, -94, -117, 79, 114, -55, 24, -8, -122, -29, 56, 73, -110, 52, 77, 91, 90, 90, -70, 115, -25, 78, 44, 22, -125, 102, -47, -95, 53, 113, -88, 52, -16, -71, 66, 30, -53, -23, 116, -74, -75, -75, -63, 72, 76, 119, -38, 107, 17, -126, 32, -76, -76, -76, 52, 52, 52, -96, -24, -125, -103, 50, -86, -11, -125, 64, 51, 100, -47, -31, -95, 40, -118, -14, -28, -55, -109, -23, -23, -23, 104, 52, 10, 23, -128, 44, -23, 68, 8, -123, -124, 78, -25, -52, -52, -52, -36, -70, 117, 107, 103, 103, 7, -78, 12, -27, 72, -123, 16, -125, 25, 68, -53, -47, -48, -48, -48, -37, -37, -53, 15, 14, 14, 54, 54, 54, -46, 1, -85, 81, 121, -104, 53, 20, 112, -34, -16, -39, 104, -102, 22, 14, -121, 39, 39, 39, -65, -8, -30, -117, 80, 40, 68, 103, 59, 116, 19, 65, -101, -72, 100, 50, 57, 62, 62, 126, -5, -10, -19, -23, -23, -23, 100, 50, -87, -27, 50, 99, -76, -110, 43, -121, -117, -88, 81, -55, 52, -81, -41, -37, -45, -45, 35, -53, -14, 107, 110, 6, 73, 78, 107, -53, -78, -36, -47, -47, -127, -126, 68, 114, -70, -37, -36, -55, -47, 57, 74, -8, -91, -94, 40, -95, 80, -24, -47, -93, 71, 55, 110, -36, -120, 70, -93, -24, 58, -47, 82, 68, -1, 4, 62, -89, 82, -87, -79, -79, -79, -15, -15, -15, -71, -71, 57, 112, 71, 81, -97, -102, 62, 108, -35, -56, 81, 80, -3, 126, -1, -64, -64, -128, -40, -41, -41, -41, -44, -44, 36, -118, 34, -86, 13, -99, 81, 54, -105, -124, 96, -24, 72, -50, -40, 102, 50, -103, -57, -113, 31, -1, -10, -73, -65, -19, -20, -20, 4, -21, 12, -85, -108, -12, -12, 33, -69, 50, -103, 76, 38, -109, -39, -40, -40, -8, -14, -53, 47, -57, -58, -58, -42, -41, -41, 117, 28, -48, -71, -5, -90, -128, -10, 34, -80, 113, -97, -49, 7, 36, 52, -73, -81, 90, 4, -52, -119, 36, 73, 64, 66, -114, 90, -27, 34, 101, -98, 28, 124, 52, 96, -27, -98, 63, 127, -2, -7, -25, -97, 31, 58, 116, -88, -89, -89, -57, -31, 112, 64, -38, -116, -26, 30, 106, -22, 76, 38, -109, 78, -89, 55, 54, 54, -82, 95, -65, 126, -17, -34, -67, 96, 48, 72, -101, 7, -45, 93, 63, 90, 114, 48, 126, -127, -44, 70, 99, 99, 99, 95, 95, -97, -40, -35, -35, -35, -39, -39, -39, -38, -38, -70, -66, -66, 14, 121, 14, -6, 103, -40, -118, 41, 3, -62, -123, 16, -52, -114, 114, 28, 23, 8, 4, -66, -7, -26, -101, -115, -115, -115, -111, -111, -111, 55, -34, 120, -93, -67, -67, -35, -21, -11, -70, 92, 46, -101, -51, 70, 8, -127, -7, 85, 20, 37, 30, -113, -49, -49, -49, -49, -51, -51, 61, 126, -4, -8, -10, -19, -37, -85, -85, -85, -12, 32, -23, -20, 40, 49, 59, 25, -128, -83, -127, -98, -110, 101, -71, -75, -75, 117, 112, 112, -48, 110, -73, -109, 50, 44, -121, -44, 28, 56, -114, 19, 69, -79, -83, -83, -19, -16, -31, -61, 94, -81, 55, 28, 14, 107, -122, -108, -75, -119, 125, 1, 91, 64, 83, -61, 19, -127, 32, 101, 109, 109, -19, -13, -49, 63, 95, 89, 89, 25, 28, 28, 28, 26, 26, 58, 114, -28, -120, -57, -29, -79, -37, -19, -110, 36, 73, -110, 36, -118, 98, 42, -107, -118, -57, -29, -31, 112, 120, 101, 101, -27, -39, -77, 103, 19, 19, 19, -109, -109, -109, -127, 64, 0, -38, 33, -69, 9, 99, -30, -128, -55, 110, -127, -124, 46, 120, -98, -81, -81, -81, -17, -24, -24, 24, 26, 26, 18, -35, 110, 119, 71, 71, -57, -32, -32, 96, 52, 26, -123, -16, -44, 104, 94, -52, 26, -112, -50, -46, -62, 80, 20, 69, 9, 6, -125, 19, 19, 19, 43, 43, 43, 79, -98, 60, -15, -7, 124, 14, -121, -61, 102, -77, -119, -94, -56, -27, -46, -95, -86, -86, -90, -45, -23, -83, -83, -83, -51, -51, -51, -75, -75, 53, -56, -117, -46, -9, -87, -77, -127, -26, -114, 89, -37, -67, 66, -24, -13, -7, 14, 31, 62, -36, -47, -47, 1, 89, 101, -77, 58, -86, 81, 96, 102, -37, -27, 114, -75, -73, -73, 15, 14, 14, 78, 78, 78, -18, -20, -20, -108, 91, -96, -75, -35, -15, 33, -84, 82, -92, 82, -87, -15, -15, -15, -7, -7, -7, -55, -55, -55, -58, -58, 70, -76, -121, 0, 88, -39, 74, 36, 18, -31, 112, 120, 125, 125, 125, 105, 105, 105, 107, 107, 11, -30, 64, 93, 47, -90, -53, 60, -3, 95, -8, 70, 20, -59, -90, -90, -90, -114, -114, -114, -34, -34, 94, 81, 20, -59, -10, -10, -10, -31, -31, -31, -57, -113, 31, 67, 92, 91, -18, 76, 3, 78, 34, -84, 41, -63, 61, 71, -93, -47, 72, 36, -14, -4, -7, 115, 93, -66, -79, -48, -116, -96, -59, 70, -43, 88, -4, -6, 3, -114, -106, -28, -12, -70, 36, 73, -121, 15, 31, 110, 111, 111, -9, -5, -3, 38, -10, 82, -93, -32, 114, 11, 107, -39, 108, 22, 102, -26, -28, -55, -109, 51, 51, 51, -15, 120, -100, -28, -36, 63, 115, -69, -93, 99, 78, 84, -69, 28, -57, 65, -11, 37, -49, -13, 91, 91, 91, 91, 91, 91, -49, -98, 61, 43, 34, 69, -104, 61, 2, 6, 106, -71, 12, -123, 86, -122, 108, 66, -34, 112, -119, 16, 34, 73, 82, 103, 103, 103, 71, 71, 71, 75, 75, 11, -81, 105, -38, -47, -93, 71, 47, 95, -66, -20, -11, 122, 73, 46, -3, 64, -33, -74, -47, -35, 58, -56, 64, 117, -38, 17, -68, 77, 93, -54, -53, -8, 43, 110, 55, 8, -75, 108, -96, 115, 120, 94, -22, -63, -45, 1, -125, -18, 123, 99, -118, 12, 90, -82, -85, -85, -69, 114, -27, -54, -16, -16, 48, 46, 40, -103, 43, 103, -75, 8, -100, -82, -18, -18, -18, 75, -105, 46, -7, 124, 62, 90, 45, -22, -82, 52, 78, 120, 94, 25, -53, -117, -68, 15, 23, 5, 0, -45, 13, -70, -18, -116, 61, 98, 84, -90, 11, 23, -119, 65, 62, -117, -93, -112, -4, -108, 114, -115, -45, -23, -68, 114, -27, -54, -48, -48, 16, 33, -124, -121, 52, 67, 95, 95, -33, -87, 83, -89, 58, 58, 58, 8, 22, -107, 82, 43, 27, -70, -101, -95, 21, -52, 1, 53, 71, -34, 57, 53, 58, -61, -27, 19, 116, 116, 53, 117, -84, -93, -99, 91, -104, 16, 77, -45, 28, 14, 71, 71, 71, -57, -39, -77, 103, -5, -6, -6, 56, -114, 3, -11, -63, 60, 82, -76, 33, 126, -65, 127, 104, 104, -24, -8, -15, -29, -83, -83, -83, -16, 39, -93, 66, -57, 111, 56, 106, -59, -40, -84, -25, -101, 87, -107, -25, 109, -97, -2, -14, 32, -67, -45, -65, 53, -46, 65, -9, 95, 88, -30, 18, 4, -63, -19, 118, 119, 117, 117, -115, -114, -114, -74, -73, -73, -85, -86, -54, 19, 66, 108, 54, 91, 115, 115, -13, -71, 115, -25, 6, 6, 6, -128, 126, 121, -53, 112, 11, 73, -101, -23, 60, 44, 116, 25, -30, 32, -35, 25, -69, -26, 12, -48, -71, 58, -32, 116, 105, -102, -42, -48, -48, 112, -4, -8, 113, 16, 50, 44, 100, 59, -72, 38, -86, 93, -48, -50, 33, 33, -60, -31, 112, -76, -74, -74, -114, -114, -114, 30, 61, 122, 20, 2, 13, 66, -83, -26, -21, 84, -71, -50, -81, 49, 119, 72, -59, -91, -59, -88, -27, -9, -35, -105, -15, 75, -6, 6, 117, 127, 2, 18, -14, 60, -33, -36, -36, 60, 50, 50, -46, -41, -41, -25, -11, 122, -77, -39, -84, 8, -50, -76, -53, -27, -70, 122, -11, -22, -26, -26, -26, -8, -8, 120, 34, -111, -128, -91, 115, -4, -103, -94, 40, -104, -49, 52, -21, 6, -86, 4, 28, 85, 23, -54, 113, -100, 36, 73, -72, 104, 75, 8, -47, 52, 13, -24, -105, -55, 100, 120, -98, 127, -13, -51, 55, 127, -11, -85, 95, -7, -3, 126, -80, -127, 88, -57, -13, -102, 3, -26, 16, 54, -30, -44, -41, -41, 127, -4, -15, -57, -15, 120, -4, -31, -61, -121, -95, 80, 8, 102, 9, 83, -1, -32, 46, -94, 103, 1, -43, 23, -92, -10, 5, -55, -24, 36, 18, -125, -118, 7, 7, 56, -99, 78, 107, -102, 54, 60, 60, -4, -49, -1, -4, -49, 13, 13, 13, -124, 16, 81, 20, 127, 50, 119, -126, 32, -76, -75, -75, -99, 59, 119, -18, -93, -113, 62, -126, 2, 26, -84, -91, -42, -71, -53, 70, -107, 70, -52, 48, -122, 22, 62, 6, 45, 87, 26, -82, 81, 53, -8, 40, 28, 0, -121, -61, -15, -77, -97, -3, -20, -62, -123, 11, 39, 79, -98, 116, 58, -99, -92, 64, -36, -8, 122, -126, -114, -81, 4, 65, -24, -20, -20, 60, 123, -10, -20, 47, 127, -7, 75, -81, -41, -85, -19, -34, -83, -122, -13, 9, -13, -116, 18, 85, 121, 93, 102, -82, 87, 85, -36, -22, 2, 96, 41, -46, 102, -77, -99, 63, 127, -2, -30, -59, -117, -57, -114, 29, -125, 42, 63, -114, -29, -2, -78, 113, 65, -106, -27, -111, -111, -111, -65, -5, -69, -65, -21, -22, -22, 114, 58, -99, -72, 33, 69, 23, -20, 106, -69, 119, 100, 16, -13, 74, 4, 45, -31, 33, 76, 16, -38, 52, -80, -7, 100, -9, -26, 41, 73, -110, -102, -101, -101, -33, 121, -25, -99, -73, -34, 122, 11, 10, 27, 116, -18, 122, -83, 43, -14, 125, -125, -42, -15, 56, 33, -78, 44, 15, 15, 15, 127, -12, -47, 71, -35, -35, -35, 14, -121, 3, -107, 56, 45, 36, -72, -3, 15, -59, -55, -94, 59, -88, 4, -16, -10, 101, 89, 110, 105, 105, -7, -32, -125, 15, -50, -99, 59, -41, -48, -48, 0, 27, 62, 52, 77, -29, -23, 75, -67, 94, -17, 27, 111, -68, -15, 47, -1, -14, 47, 23, 46, 92, -64, -70, 114, 81, 20, -79, -8, 0, -81, -92, -85, -61, -76, 26, -81, -97, 4, 111, 19, -22, -62, -23, -35, 73, 88, -32, -41, -43, -43, 117, -11, -22, -43, -113, 63, -2, 120, 100, 100, 4, -21, -118, -24, -126, 114, 11, 7, 95, 13, -128, -104, 5, -123, 65, 85, 85, -97, -49, 119, -26, -52, -103, 95, -3, -22, 87, 23, 46, 92, -32, -87, 77, -86, -124, 16, 65, 16, 100, 89, -58, 64, 17, 28, -112, 114, -20, 93, -80, 10, 92, -82, 104, -18, 39, 43, -57, -13, -94, 40, -54, -78, -84, -86, 106, 103, 103, -25, 7, 31, 124, 112, -11, -22, -43, -95, -95, 33, -8, 43, -60, 62, 34, -19, 39, 8, -126, -32, -11, 122, 47, 94, -68, -88, -86, 106, 60, 30, -97, -104, -104, -120, 70, -93, -76, -87, -59, -104, 80, -37, -99, -83, -87, 117, 83, -128, 78, -111, 70, -107, 122, -128, 119, -48, -45, -45, 115, -7, -14, -27, -65, -7, -101, -65, -23, -19, -19, 117, 58, -99, 26, -107, -119, -63, 122, 95, -85, -121, 111, 25, 104, -63, 32, -108, 97, -108, 101, -71, -87, -87, -23, -46, -91, 75, -86, -86, -58, 98, -79, 7, 15, 30, -128, 32, -127, 42, -89, 125, -85, -68, -47, 84, 77, 67, 23, 22, -62, -124, -120, -94, -40, -33, -33, 127, -7, -14, -27, -113, 63, -2, -72, -69, -69, -69, -82, -82, -114, -34, -19, 33, -22, 126, 47, -118, -30, -47, -93, 71, -95, 66, 101, 123, 123, 123, 118, 118, 54, 22, -117, -47, 115, -51, 25, -42, 61, 77, -9, -57, 56, -77, 23, -36, 75, -23, 8, 110, 13, -9, -20, 42, -118, 2, -110, -12, -13, -97, -1, -4, -3, -9, -33, -65, 116, -23, 18, 45, 103, 36, -89, -14, -7, -36, 97, 33, -81, 45, -76, -35, 11, -53, -88, -110, 36, 73, 26, 24, 24, -56, 100, 50, -15, 120, 60, 20, 10, -51, -51, -51, -59, -29, 113, 88, -39, -41, 45, -79, -66, 26, 122, -100, -122, -114, -121, -78, 44, -5, -3, -2, -73, -33, 126, -5, -22, -43, -85, 111, -65, -3, 54, -95, 2, -59, -97, -100, 77, -72, 84, -105, -61, -23, -22, -22, -6, -16, -61, 15, 29, 14, -57, -75, 107, -41, -2, -12, -89, 63, -111, -36, 74, 40, 94, 6, -13, 88, -21, 19, -121, -113, -97, -53, 21, -17, -118, -94, 8, 82, -94, 105, -38, -64, -64, -64, 7, 31, 124, -16, -73, 127, -5, -73, -67, -67, -67, 70, 93, 3, 46, -66, 117, 99, -81, 22, -48, 12, 68, 71, 29, -54, 125, 121, -98, 63, 122, -12, -24, 39, -97, 124, -30, -15, 120, -82, 93, -69, -10, -59, 23, 95, -48, 27, 104, -32, 39, -70, -116, 67, 109, 65, 103, 45, -116, -1, -123, -52, -16, -64, -64, -64, 95, -1, -11, 95, -125, 32, 113, -71, -35, -13, -80, 39, 14, -82, 20, 117, -55, 64, 66, 8, -49, -13, 54, -101, -83, -91, -91, -27, -46, -91, 75, 78, -89, -45, -25, -13, -115, -113, -113, -81, -84, -84, 64, 97, 46, 122, -70, 24, 88, -101, 78, -59, -118, 113, 91, -37, -99, -75, 35, -124, -88, -86, 42, 73, -110, -49, -25, 27, 29, 29, 61, 127, -2, -4, -107, 43, 87, 6, 6, 6, 92, 46, 23, 92, -113, 74, -118, -93, 80, -103, -95, 86, 51, 104, -31, 65, 127, 1, 60, 79, -89, -45, -39, -34, -34, -2, -117, 95, -4, -62, -27, 114, -7, 124, -66, 59, 119, -18, -84, -81, -81, -61, -26, 61, -38, -124, -42, -82, 54, 47, -28, -75, 65, 126, -63, -29, -15, -116, -114, -114, -2, -4, -25, 63, -65, 124, -7, 114, 127, 127, 63, 120, -95, -76, -63, -125, -117, 69, 109, 119, -7, 37, 10, 22, -88, 49, -65, -33, -33, -39, -39, 41, -118, -30, -60, -60, -60, -4, -4, 124, 36, 18, -47, 101, -100, 43, 121, -61, -90, 67, -93, 118, -123, 18, 66, 56, -114, -77, -39, 108, 126, -65, -65, -65, -65, -1, 31, -1, -15, 31, -49, -100, 57, -45, -33, -33, -113, 23, -93, 120, -31, 98, -105, 41, 99, -88, 78, 26, -45, 94, 122, -15, 43, -23, 11, -16, 51, 102, 74, -77, -39, 44, -124, 67, 62, -97, -81, -93, -93, 67, 16, -124, -5, -9, -17, 47, 46, 46, 70, -93, 81, 92, -120, 126, 53, -46, -53, 116, -100, 2, -21, -91, -80, 97, -9, -97, -2, -23, -97, 78, -97, 62, 125, -28, -56, 17, 60, -67, -122, -33, 125, 78, 31, 33, -28, 47, 71, -116, -46, 82, -59, -13, 63, -99, -62, -26, 118, -69, 79, -98, 60, -7, -21, 95, -1, 122, 124, 124, -4, -6, -11, -21, 55, 110, -36, -128, 29, 79, -124, -118, 15, 57, 106, -105, -108, 113, 54, 117, -90, -58, -36, 123, 46, -44, 44, -34, 100, 17, 77, -63, 25, 82, 115, 118, -69, -3, -52, -103, 51, 23, 47, 94, 124, -25, -99, 119, 122, 123, 123, 61, 30, -113, -106, -81, -94, -41, -60, -61, -99, -48, -89, -64, 117, -74, -118, -119, 35, -12, 72, -97, 12, 66, -105, -32, -63, -60, -66, -108, -94, -55, 75, 87, 46, 87, 108, -28, 118, -69, 79, -99, 58, 117, -24, -48, -95, -69, 119, -17, 126, -7, -27, -105, 55, 110, -36, 8, 4, 2, -87, 84, 10, -30, 106, -6, 120, 37, -29, 35, 43, -109, -70, 47, -91, 89, 93, -42, -128, 20, -88, -74, 65, -29, 6, -106, -52, 110, -73, -65, -7, -26, -101, 87, -82, 92, 121, -17, -67, -9, 58, 59, 59, -21, -21, -21, 113, -81, 9, -82, 50, -48, 110, -108, 88, 72, -43, -63, -9, -94, 40, -70, 92, 46, 56, 79, 5, -74, -109, 63, 121, -14, -28, -23, -45, -89, 11, 11, 11, -79, 88, 12, 102, -112, 24, 68, -121, 30, 110, -103, 38, 52, 111, -29, -123, 46, 3, -24, 42, 21, -111, -61, 80, -2, -33, -43, -43, 53, 52, 52, -12, -42, 91, 111, 13, 15, 15, 15, 12, 12, -64, -7, 49, -80, 110, 97, -94, -79, -94, 123, 39, -71, 21, 14, -70, -14, -58, 24, 98, -107, 21, -39, 28, -24, 13, 117, -58, -111, 20, 66, 41, 118, 18, 26, 4, -33, 12, 14, -125, 106, 104, 104, -24, -23, -23, 121, -4, -8, -15, -29, -57, -113, 103, 103, 103, 83, -87, -108, -18, 39, -58, -99, 52, -124, -54, 52, -22, -66, 124, -87, -5, 45, 126, 35, 116, -29, 70, 1, 51, -58, 123, 100, 119, 56, 6, -101, 42, 123, 123, 123, 71, 70, 70, 78, -97, 62, 13, -126, 100, -73, -37, -115, 15, 87, 55, 111, -7, 51, 123, -58, 16, -77, -67, -67, -3, -48, -95, 67, -57, -114, 29, 123, -16, -32, -63, -97, -1, -4, -25, -17, -66, -5, 110, 121, 121, 57, 18, -119, -64, -23, 47, -80, 17, 17, 47, 70, -83, -96, -69, 19, -44, 1, -60, -116, -23, -45, -115, -80, 120, -101, -76, 35, -114, 41, 80, 89, -106, 109, 54, -101, -41, -21, 61, 125, -6, -12, -39, -77, 103, 47, 92, -72, -48, -33, -33, 15, 5, 49, -26, 22, 103, -29, 60, 104, -69, -49, -116, 2, -23, 7, 18, 106, -69, -53, 80, -13, 26, 97, 19, -63, 81, -121, 44, 0, 15, 121, -22, 84, 33, 122, 36, -90, -12, 5, 31, 4, 65, -128, -51, 59, -57, -113, 31, -65, 119, -17, -34, -41, 95, 127, -51, 113, -36, -58, -58, 70, 50, -103, -116, -57, -29, -72, 67, 119, 79, -17, -55, 56, -74, 18, -107, 123, 113, 57, -95, 73, 82, -68, 53, -102, -124, 28, -57, 73, -110, 4, -54, 101, 100, 100, -28, -4, -7, -13, -17, -68, -13, -50, -47, -93, 71, 109, 54, 27, -42, -27, 21, -57, -34, -23, 117, -38, -45, 109, 105, 105, -71, 112, -31, -62, -15, -29, -57, -33, 127, -1, -3, 7, 15, 30, -116, -115, -115, 61, 124, -8, 48, 16, 8, -64, 42, 16, 41, 64, -116, -68, 122, -27, 32, 64, 50, 27, -113, 81, -96, 59, -62, -57, -119, 127, -94, 107, 68, -35, 110, -9, -119, 19, 39, 78, -98, 60, 57, 58, 58, 58, 52, 52, -44, -36, -36, -20, -11, 122, 97, -77, -68, -106, -85, -38, 51, 81, 16, -77, -71, 19, 25, 117, 67, 34, -71, 13, -5, 88, -70, 100, 86, -113, 69, -64, -27, -10, 1, -62, 84, -64, -58, 115, 28, 21, -120, -114, -71, 75, 47, -24, 114, 115, -71, -62, -111, -117, 23, 47, -98, 56, 113, -30, -61, 15, 63, -100, -100, -100, 28, 27, 27, -101, -104, -104, -40, -38, -38, -126, -70, 101, 90, 102, -116, -45, 69, -88, -25, -117, -73, -125, -10, -77, 120, -19, 68, 33, -43, -90, -101, 118, 99, -41, -76, -25, 66, -88, -83, 79, -78, 44, 67, 89, -1, 27, 111, -68, -15, -77, -97, -3, 108, 96, 96, -96, -87, -87, -55, -29, -15, -64, 33, 96, 37, -6, -13, 5, 39, 58, -81, -50, -80, -39, 108, 112, -38, 95, 67, 67, 67, 91, 91, -37, -64, -64, -64, -52, -52, -52, -30, -30, -30, -62, -62, -62, -4, -4, -4, -26, -26, 102, 48, 24, -116, -57, -29, -58, -14, 75, 93, -77, -70, -49, 69, 66, -69, -68, 115, 68, -10, -94, 7, -3, 8, -15, -25, -110, 36, -71, 92, -82, -58, -58, -58, -50, -50, 78, -16, 63, -5, -5, -5, -69, -70, -70, -70, -70, -70, -4, 126, 63, 28, 34, 74, 114, 91, 28, 65, 4, 105, -5, 112, 64, 24, -3, 76, -44, 17, 120, 12, 121, -95, -101, 53, 29, 26, 85, 18, 76, 127, 64, -19, 102, 122, 5, 2, -74, 9, -73, 12, -126, 84, 95, 95, -17, -9, -5, 15, 31, 62, -36, -41, -41, 119, -18, -36, 57, 20, -92, -115, -115, -115, 96, 48, -104, 74, -91, 116, -116, -46, -71, -87, 58, -71, -126, 63, -19, -55, -79, -68, -46, -56, -27, -46, 72, -70, -42, -80, 95, -20, -102, -29, 56, -69, -35, -18, 114, -71, 32, 103, -39, -34, -34, -34, -35, -35, 125, -12, -24, 81, 16, -92, -58, -58, 70, 56, -2, -21, -91, -78, 119, 123, 104, 59, -82, -128, 23, -18, -11, 122, 27, 26, 26, -122, -122, -122, 98, -79, -40, -14, -14, -14, -45, -89, 79, -57, -58, -58, 102, 102, 102, 22, 22, 22, -42, -41, -41, -29, -15, 56, -24, 51, 69, 81, -96, 26, -45, 72, 51, -38, -21, 48, -50, 14, -95, -12, -112, 81, 40, 117, -118, 80, 119, 13, -122, 88, 80, 115, -121, -107, 119, 110, -73, -69, -75, -75, -75, -81, -81, -17, -12, -23, -45, -57, -114, 29, 27, 28, 28, 4, -115, 69, 40, -7, 35, -69, -73, -25, -96, -14, 46, 101, 42, -117, -61, -40, 62, 10, 37, 12, 15, -50, -44, 49, -34, 102, -103, 0, -29, 1, -53, -113, -27, -44, 92, -18, 112, 113, -110, 111, -110, -9, 13, -51, -112, 78, -25, 114, 41, 61, -113, -57, -29, -15, 120, 6, 6, 6, -30, -15, -8, -30, -30, -30, -61, -121, 15, -17, -34, -67, 59, 61, 61, 61, 63, 63, 31, 12, 6, 19, -119, 68, 58, -99, 6, 41, 2, -5, 12, 42, 50, 111, 23, 0, 58, 73, 81, -36, -7, -92, -67, 110, 12, 7, 112, 18, -24, -88, 1, -22, -50, -80, 0, -51, -17, -9, -61, 113, 82, 32, 72, 125, 125, 125, 13, 13, 13, -32, 89, -16, -69, -49, 113, -54, -21, 54, 27, 71, 82, -110, -53, 65, 11, 13, 58, 84, -48, -109, -51, 102, -21, -20, -20, 108, 105, 105, -7, -85, -65, -6, -85, 72, 36, -78, -75, -75, 5, -54, 108, 106, 106, 106, 105, 105, 41, 20, 10, -19, -20, -20, -20, -20, -20, 68, -93, -47, 88, 44, 70, 107, -78, 61, 37, 44, -81, 121, -124, -82, 81, 99, 25, 35, 120, -100, 41, -89, -45, 9, 107, 83, 112, 30, 76, 111, 111, 111, 119, 119, 119, 83, 83, -109, -33, -17, -121, 99, 106, -31, -56, 99, 84, 16, -88, -76, -24, 13, -51, 38, -18, -109, -96, -43, 42, 126, 9, 25, -4, -127, -127, -127, 108, 54, 27, -115, 70, 77, -23, -88, 116, 8, -126, -48, -44, -44, -44, -40, -40, 104, -77, -39, -72, -35, -101, 66, -128, -106, 102, 121, -92, 104, 67, 104, 75, 69, -37, 91, -114, -29, -22, -22, -22, 122, 122, 122, 14, 29, 58, 116, -18, -36, -71, 112, 56, -68, -79, -79, 49, 55, 55, 55, 63, 63, 63, 51, 51, -77, -68, -68, 28, 12, 6, 35, -111, 72, 36, 18, 73, 38, -109, -12, -127, -94, 116, -60, -127, -10, -100, -18, -105, 30, 6, 94, -103, -91, 14, 4, 51, -2, 10, 47, -125, 72, -49, 110, -73, 59, 28, 14, -113, -57, -45, -39, -39, -39, -37, -37, -37, -33, -33, -33, -35, -35, -35, -40, -40, -40, -48, -48, -32, 118, -69, -21, -22, -22, -20, 118, 59, 76, 20, -99, 54, -89, -35, -5, 61, -63, -47, -82, 99, -95, 25, 36, 6, -43, 66, -81, 22, 98, -83, -119, -86, -86, -119, 68, 34, 20, 10, 109, 109, 109, 5, 2, -127, -19, -19, -19, -99, -99, -99, 120, 60, 14, -45, 23, 14, -121, -29, -15, 120, 50, -103, 76, 36, 18, -8, 1, 14, -25, 73, 38, -109, -23, 116, 26, -33, 15, 3, 83, 108, 52, 110, 104, -45, -64, 110, -40, 108, 54, -69, -35, 14, -1, 58, 28, 14, -121, -61, 81, 87, 87, -25, 116, 58, 29, 14, -121, -53, -27, 114, -69, -35, -64, 67, -65, -33, -17, -13, -7, -102, -102, -102, 124, 62, 95, 93, 93, 29, 8, 28, 62, 12, -99, -57, -117, 123, 71, 104, 27, 120, 112, 30, -22, -26, 16, -67, 29, 77, -45, 98, -79, -40, -8, -8, -8, -26, -26, 102, 42, -107, 50, -53, -22, -106, 50, 30, 120, 124, 117, 117, 117, 39, 78, -100, 104, 110, 110, -122, 125, 51, -70, -95, -102, -94, -125, 116, -113, -110, -90, 1, -35, 56, -19, 1, -86, -86, -102, 76, 38, -31, -76, 24, 112, 77, -29, -15, 56, 8, 82, 44, -121, 68, 14, 32, 63, 0, -8, 12, -106, 19, -72, -86, 59, 63, -123, -53, 85, 87, -61, -47, 79, -78, 44, 67, 114, 14, -50, 22, 3, 17, 114, 56, 28, 32, 69, 78, -89, -45, -29, -15, 0, -45, -100, 78, -89, -33, -17, 111, 106, 106, -126, 51, -114, 81, -112, 104, 13, -50, 25, -126, 32, 45, -73, 42, 88, 124, -118, -10, 38, 33, 0, -41, 25, 65, 64, -95, 118, 25, 54, -11, 64, 118, 20, -114, 30, -93, -27, -116, 16, 2, -25, 91, 69, -93, -47, -99, -99, -99, 112, 56, 28, 8, 4, 66, -95, 80, 40, 20, -126, -24, 17, 0, -4, -36, -39, -39, 73, -27, 0, -45, 71, 59, -24, 64, 63, -101, -51, 38, 73, -110, -35, 110, -9, 120, 60, 78, -89, -77, -66, -66, -34, -21, -11, 122, 60, 30, 95, 14, -64, 55, -8, -46, -29, -15, -64, 43, 74, 116, 107, 12, -38, -18, -109, 17, -71, -36, 90, 25, 60, 57, 60, -39, 30, -86, -82, -52, 125, -33, 11, -118, 62, -51, 115, 122, -109, 65, -59, -34, 108, -127, 46, 19, 104, 79, 45, -9, 114, 1, -100, 28, 122, -43, -92, 28, -67, -125, -4, -24, -90, 23, 75, 35, -13, -50, 124, 54, -101, -115, -59, 98, -47, 104, 20, -76, 124, 48, 24, -36, -34, -34, -34, -34, -34, 14, -121, -61, -95, 80, 40, 24, 12, -62, 89, 97, -31, 112, 24, 8, 25, -113, -57, 83, -87, 84, 58, -99, 6, -121, 22, 31, -70, 32, 8, 16, -111, -38, 108, 54, -112, 34, -73, -37, -35, -48, -48, 0, -126, -28, -9, -5, -67, 94, -81, -49, -25, 107, 110, 110, 110, 104, 104, -128, 111, 28, 14, 7, -108, 40, -30, -68, 113, -71, 60, 16, 8, 42, 30, 112, -118, -34, 44, -55, 37, -40, 75, 49, -119, -1, 15, -21, 121, 91, 83, 92, 77, -87, -126, 0, 0, 0, 0, 73, 69, 78, 68, -82, 66, 96, -126]);

        EloStarPrinterManager.beginDocument()
        EloStarPrinterManager.appendCodepage("CP998");
        EloStarPrinterManager.appendInternational("USA");
        EloStarPrinterManager.appendAlignment("","Center");
   
           if (!EloStarPrinterManager.appendBitmap(image,true)){
              document.getElementById("SuccessField").value=false;
              document.getElementById("TextField").value=false;
           }
          

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

*/
   



