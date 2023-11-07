document.getElementById("connectCitizenPrinter").addEventListener("click", connectCitizenPrinter)
document.getElementById("disconnectCitizenPrinter").addEventListener("click", disconnectCitizenPrinter)
document.getElementById("printSampleCitizenReceipt1").addEventListener("click", printSampleCitizenReceipt1)
document.getElementById("printSampleCitizenReceipt2").addEventListener("click", printSampleCitizenReceipt2)
document.getElementById("showBTPairedDevicesCitizen").addEventListener("click", showBTPairedDevicesCitizen)
document.getElementById("isCitizenBTConnected").addEventListener("click", isCitizenBTConnected)


function showBTPairedDevicesCitizen(){
     document.getElementById("textField").value = EloCitizenMobileManager.getBluetoothPairedDevices()
}

function isCitizenBTConnected(){
     document.getElementById("textField").value = EloCitizenMobileManager.isBluetoothConnected()
}



function connectCitizenPrinter(){
    EloCitizenMobileManager.connect("00:13:7B:40:2B:3C")
}

function disconnectCitizenPrinter(){
    EloCitizenMobileManager.disconnectBluetooth()
}

function printSampleCitizenReceipt1(){
  var sts =  EloCitizenMobileManager.printerCheck();
  if(sts != 0) {
      document.getElementById("textField").value = "Printer check fail"
      return
  }

  sts =  EloCitizenMobileManager.status();
  if(sts != 0) {
    document.getElementById("textField").value = "Printer status fail"
    return
  }



  
         EloCitizenMobileManager.printNormal("Chicken                                                   $10.00\n")
   EloCitizenMobileManager.printNormal("Chicken                                                   $10.00\n")
   EloCitizenMobileManager.printNormal("Chicken                                                   $10.00\n")
   EloCitizenMobileManager.printNormal("Chicken                                                   $10.00\n")
         //EloCitizenMobileManager.printNormal("Hamburger                                                 $20.00\n")
         //EloCitizenMobileManager.printNormal("Pizza                                                     $30.00\n")
         //EloCitizenMobileManager.printNormal("Lemons                                                    $40.00\n")
         //EloCitizenMobileManager.printNormal("Drink                                                     $50.00\n")
         //EloCitizenMobileManager.printNormal("Excluded tax                                              $150.00\n")
         //EloCitizenMobileManager.lineFeed(2)
  
}

function printSampleCitizenReceipt2(){

}

