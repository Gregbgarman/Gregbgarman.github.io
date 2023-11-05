document.getElementById("connectCitizenPrinter").addEventListener("click", connectCitizenPrinter)
document.getElementById("disconnectCitizenPrinter").addEventListener("click", disconnectCitizenPrinter)
document.getElementById("printSampleCitizenReceipt1").addEventListener("click", printSampleCitizenReceipt1)
document.getElementById("printSampleCitizenReceipt2").addEventListener("click", printSampleCitizenReceipt2)

function connectCitizenPrinter(){
  let connected = EloCitizenMobileManager.connect("00:13:7B:40:2B:3C")
  if (connected){
     document.getElementById("textField").value = "Connected"
  }
}

function disconnectCitizenPrinter(){

}

function printSampleCitizenReceipt1(){
         EloCitizenMobileManager.printNormal("Chicken                                                   $10.00\n")
         EloCitizenMobileManager.printNormal("Hamburger                                                 $20.00\n")
         EloCitizenMobileManager.printNormal("Pizza                                                     $30.00\n")
         EloCitizenMobileManager.printNormal("Lemons                                                    $40.00\n")
         EloCitizenMobileManager.printNormal("Drink                                                     $50.00\n")
         EloCitizenMobileManager.printNormal("Excluded tax                                              $150.00\n")
         EloCitizenMobileManager.lineFeed(2)
  
}

function printSampleCitizenReceipt2(){

}

