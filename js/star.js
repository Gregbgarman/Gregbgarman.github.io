document.getElementById("queryStarPrinterList").addEventListener("click", queryStarPrinterList)
document.getElementById("setStarPrinter").addEventListener("click", setStarPrinter)
document.getElementById("printStarBarcode").addEventListener("click", printStarBarcode)
document.getElementById("printStarDemoReceipt1").addEventListener("click", printStarDemoReceipt1)
document.getElementById("printStarDemoReceipt2").addEventListener("click", printStarDemoReceipt2)
document.getElementById("printStarRasterReceipt").addEventListener("click", printStarRasterReceipt)
document.getElementById("printStarImage").addEventListener("click", printStarImage)
document.getElementById("checkStarPrinterPaper").addEventListener("click", checkStarPrinterPaper)
document.getElementById("checkStarPrinterOnline").addEventListener("click",checkStarPrinterOnline)
document.getElementById("checkStarFirmware").addEventListener("click", checkStarFirmware)
document.getElementById("checkStarModelName").addEventListener("click", checkStarModelName)

let ChosePrinterPort=false

function queryStarPrinterList(){   
   let target=document.getElementById("textField").value
   target+=":"
   document.getElementById("textField").value=EloStarPrinterManager.searchPrinter(target)
}

function setStarPrinter(){
   let target=document.getElementById("textField").value
   if(target.length > 1 && target.charAt(0) == '[' && target.charAt(target.length-1) == ']') {
        target = target.slice(1, -1).split(',')[0]    
    }
    ChosePrinterPort=EloStarPrinterManager.setPrinterPort(target)
    document.getElementById("textField").value=ChosePrinterPort
  
}


function printStarBarcode(){
     EloStarPrinterManager.beginDocument()
     EloStarPrinterManager.appendBarcode("86340975318", "UPCA", "Mode1", 60, true);
     EloStarPrinterManager.appendUnitFeed(30);
     EloStarPrinterManager.appendBarcode("85187751062", "UPCA", "Mode2", 40, false);
     EloStarPrinterManager.appendUnitFeed(30);
     EloStarPrinterManager.appendBarcode("17523099544", "UPCA", "Mode3", 40, true);
     EloStarPrinterManager.appendUnitFeed(30);
     EloStarPrinterManager.appendQrCode("https://www.elotouch.com/", "No2", "Q", 5);
     EloStarPrinterManager.appendUnitFeed(10);
   
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

function printStarRasterReceipt(){
   let ReceiptString = "            THE STORE 123 \n          (555) 555 – 5555\n\nSTORE DIRECTOR – " +
                "John Smith\n7/01/07 16:58 6153 05 0191 134\nST# 21 OP# 001 TE# 01 TR# 747\n------------------------------\n"
                + "400 OHEIDA 3PK SPRINGF  9.99 R\n410 3 CUP BLK TEAPOT    9.99 R\n445 EMERIL GRIDDLE/PAN 17.99 R" +
                "\n438 CANDYMAKER ASSORT   4.99 R\n474 TRIPOD              8.99 R\n433 BLK LOGO PRNTED ZO  7.99 R" +
                "\n458 AQUA MICROTERRY SC  6.99 R\n493 30L BLK FF DRESS   16.99 R\n407 LEVITATING DESKTOP  7.99 R" +
                "\n441 **Blue Overprint P  2.99 R\n476 REPOSE 4PCPM CHOC   5.49 R\n476 REPOSE 4PCPM CHOC   5.49 R" +
                "\n461 WESTGATE BLACK 25  59.99 R\n------------------------------\n"
                + "SUBTOTAL                160.38\nSUBTOTAL                160.38\n" + "TOTAL                   174.81" +
                "\n" + "CASH                    200.00\nCHANGE                   25.19\n------------------------------\n"
                + "Purchased item total number\nSign Up and Save !\nWith Preferred Saving Card\n";
   
    
    if (!EloStarPrinterManager.appendRasterData(ReceiptString, 20, false)){
         document.getElementById("textField").value="append raster fail"
         return  
    }
     EloStarPrinterManager.beginDocument()
     EloStarPrinterManager.appendBarcode("86340975318","UPCA", "Mode1", 60, true)
     EloStarPrinterManager.appendUnitFeed(30)
     EloStarPrinterManager.appendCutPaper("PartialCutWithFeed")       
     EloStarPrinterManager.endDocument();
     let ReceiptData = EloStarPrinterManager.getCommands();
   
     printReceiptData(ReceiptData)
   
}

function printStarImage(){

}

function checkStarPrinterPaper(){
   let ActivePort_Key = EloStarPrinterManager.getPort("",10000)
   let PrinterStatus_Key = EloStarPrinterManager.retrieveStatus(ActivePort_Key)
    if (EloStarPrinterManager.receiptPaperEmptyStatus(PrinterStatus_Key) === 1){
        document.getElementById("textField").value="Has paper"
   }
   else{
     document.getElementById("textField").value="No paper"
   }
   
   EloStarPrinterManager.releasePort(ActivePort_Key)
}

function checkStarPrinterOnline(){
   let ActivePort_Key = EloStarPrinterManager.getPort("",10000)
   let PrinterStatus_Key = EloStarPrinterManager.retrieveStatus(ActivePort_Key)
    if (EloStarPrinterManager.offlineStatus(PrinterStatus_Key) === 1){
        document.getElementById("textField").value="Is online"
   }
   else{
     document.getElementById("textField").value="Is offline"
   }
   
   EloStarPrinterManager.releasePort(ActivePort_Key)
}

function checkStarFirmware(){
    let ActivePort_Key = EloStarPrinterManager.getPort("",10000)
    let result = EloStarPrinterManager.getFirmwareInformation(ActivePort_Key)
    document.getElementById("textField").value=result
    EloStarPrinterManager.releasePort(ActivePort_Key)
   
}

function checkStarModelName(){
   document.getElementById("textField").value= EloStarPrinterManager.getModelName()
   
}


function printReceiptData(ReceiptData){
   
   let ActivePort_Key = EloStarPrinterManager.getPort("",10000)
   document.getElementById("textField").value=ActivePort_Key
   
   let PrinterStatus_Key = EloStarPrinterManager.beginCheckedBlock(ActivePort_Key)
   
   if (EloStarPrinterManager.offlineStatus(PrinterStatus_Key) === 1){
        document.getElementById("textField").value="offline status fail"
        return
   }
   
    if (EloStarPrinterManager.receiptPaperEmptyStatus(PrinterStatus_Key) ===1){
          document.getElementById("textField").value="no paper found"
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
        EloStarPrinterManager.beginDocument()
        EloStarPrinterManager.appendCodepage("CP998");
        EloStarPrinterManager.appendInternational("USA");
        EloStarPrinterManager.appendAlignment("Center");
        EloStarPrinterManager.appendLineFeed(1);
        EloStarPrinterManager.append("THE STORE 123 (555) 555 5555\nSTORE DIRECTOR John Smith\n\n7/01/07 16:58 6153 05 0191 134\nST# 21 OP# 001 TE# 01 TR# 747\n------------------------------\n");
        EloStarPrinterManager.append("400 OHEIDA 3PK SPRINGF  9.99 R\n410 3 CUP BLK TEAPOT    9.99 R\n445 EMERIL GRIDDLE/PAN 17.99 R\n438 CANDYMAKER ASSORT   4.99 R\n474 TRIPOD              8.99 R\n433 BLK LOGO PRNTED ZO  7.99 R\n458 AQUA MICROTERRY SC  6.99 R\n493 30L BLK FF DRESS   16.99 R\n407 LEVITATING DESKTOP  7.99 R\n441 **Blue Overprint P  2.99 R\n476 REPOSE 4PCPM CHOC   5.49 R\n476 REPOSE 4PCPM CHOC   5.49 R\n461 WESTGATE BLACK 25  59.99 R\n------------------------------\n");
        EloStarPrinterManager.append("SUBTOTAL                160.38\nSUBTOTAL                160.38\n");
        EloStarPrinterManager.appendMultiple(2, 2);
        EloStarPrinterManager.append("TOTAL    174.81\n")
        EloStarPrinterManager.appendMultiple(0, 0);
   
        EloStarPrinterManager.appendLineFeed(2);
        EloStarPrinterManager.append("CASH                    200.00\nCHANGE                   25.19\n------------------------------\n");
        EloStarPrinterManager.append("Purchased item total number\nSign Up and Save !\nWith Preferred Saving Card\n");
        EloStarPrinterManager.appendLineFeed(2);

        EloStarPrinterManager.appendBarcode("86340975318", "UPCA", "Mode1", 40, true);
        EloStarPrinterManager.appendUnitFeed(32);

        EloStarPrinterManager.appendCutPaper("PartialCutWithFeed");
        EloStarPrinterManager.endDocument();

        let Commands = EloStarPrinterManager.getCommands();
        return Commands
}

function getReceipt1Data(){
    if (!EloStarPrinterManager.beginDocument()){
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
   
   
   if (!EloStarPrinterManager.appendAlignment("Center")){
          console.error("Error:Could not append international")
          return false
    }
   
        EloStarPrinterManager.append("The Food Shack\n123 Rainbow Road\nKnoxville, TN 12312\n");
        EloStarPrinterManager.appendLineFeed(1);
        EloStarPrinterManager.appendAlignment("Left");
        EloStarPrinterManager.append("Table 109\nServer Greg\n10:30AM    06/21/22\n---------------------------------\n");
        EloStarPrinterManager.appendAlignment("Center")
        EloStarPrinterManager.append("Guest No 1\n")
        EloStarPrinterManager.appendAlignment("Left")
        EloStarPrinterManager.append("1 ice cream sundae             4.50\n1 soda pop                     1.75\n1 french fries                 4.00\n");
        EloStarPrinterManager.appendAlignment("Center");
        EloStarPrinterManager.append("Guest No 2\n")
        EloStarPrinterManager.appendAlignment("Left");
        EloStarPrinterManager.append("1 cheese pizza                 5.00\n1 milkshake                    1.75\n\n---------------------------------\n");
      
        EloStarPrinterManager.appendAlignment("Right");
       
   
   
   
        EloStarPrinterManager.append("Subtotal    17.00\nTax          1.20\n")
        EloStarPrinterManager.appendMultiple(2,2)
        EloStarPrinterManager.append("Total    18.20\n\n")
        EloStarPrinterManager.appendMultiple(0,0)
      
        EloStarPrinterManager.appendAlignment("Left")
      

       
        EloStarPrinterManager.append("Let us know how we did!\nTake our survey within ")
        EloStarPrinterManager.appendUnderLine("10 days");
        EloStarPrinterManager.append(" and get entered\nto ");
        EloStarPrinterManager.appendInvert("win a prize!");

        EloStarPrinterManager.append(" Scan the Qr code below to start!\n\n");
        EloStarPrinterManager.appendQrCode("https://www.elotouch.com/", "No2", "Q", 5);
        EloStarPrinterManager.appendUnitFeed(10);

        EloStarPrinterManager.appendCutPaper("PartialCutWithFeed");
        EloStarPrinterManager.endDocument();
   
        let Commands = EloStarPrinterManager.getCommands();
        return Commands
    
}
