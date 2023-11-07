document.getElementById("connectCitizenPrinter").addEventListener("click", connectCitizenPrinter)
document.getElementById("disconnectCitizenPrinter").addEventListener("click", disconnectCitizenPrinter)
document.getElementById("printSampleCitizenReceipt1").addEventListener("click", printSampleCitizenReceipt1)
document.getElementById("printSampleCitizenReceipt2").addEventListener("click", printSampleCitizenReceipt2)
document.getElementById("showBTPairedDevicesCitizen").addEventListener("click", showBTPairedDevicesCitizen)
document.getElementById("isCitizenBTConnected").addEventListener("click", isCitizenBTConnected)

let pairedDeviceNames = []
let deviceNameAddressTable = {}

function showBTPairedDevicesCitizen(){
     let deviceString = EloCitizenMobileManager.getBluetoothPairedDevices()
     if (deviceString == "{}"){
          document.getElementById("textField").value = "no devices found"
          return
     }
     
     parseDeviceString(deviceString)
     document.getElementById("textField").value = pairedDeviceNames
}

function isCitizenBTConnected(){
     document.getElementById("textField").value = EloCitizenMobileManager.isBluetoothConnected()
}


function connectCitizenPrinter(){
    let deviceName = document.getElementById("textField").value

    let deviceAddress = deviceNameAddressTable[deviceName]
     if (deviceAddress != undefined){
         EloCitizenMobileManager.connectBluetooth(deviceAddress)
         document.getElementById("textField").value = "use next button to see if connect success"
     }
     else{
         document.getElementById("textField").value = "unable to connect" 
     }
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
     let ESC = 27

  EloCitizenMobileManager.printNormal(ESC+"|cA"+ESC+"|2CReceipt\r\n\r\n\r\n");
  EloCitizenMobileManager.printNormal(ESC+"|rATEL (123)-456-7890\n\n\n");
  EloCitizenMobileManager.printNormal(ESC+"|cAThank you for coming to our shop!\n");
  EloCitizenMobileManager.printNormal("Chicken                                   $10.00\n");
  EloCitizenMobileManager.printNormal("Hamburger                                 $20.00\n");
  EloCitizenMobileManager.printNormal("Pizza                                     $30.00\n");
  EloCitizenMobileManager.printNormal("Lemons                                    $40.00\n");
  EloCitizenMobileManager.printNormal("Drink                                     $50.00\n");
  EloCitizenMobileManager.printNormal("Excluded tax                             $150.00\n");
  EloCitizenMobileManager.printNormal(ESC+"|uCTax(5%)                                    $7.50\n");
  EloCitizenMobileManager.printNormal(ESC+"|bC"+ESC+"|2CTotal            $157.50\n\n");
  EloCitizenMobileManager.printNormal("Payment                                  $200.00\n");
  EloCitizenMobileManager.printNormal("Change                                    $42.50\n\n");
  EloCitizenMobileManager.lineFeed(2);

     
     
}

function printSampleCitizenReceipt2(){

}

function parseDeviceString(deviceString){          //devices will be in string format such as "{CMP_2345=00:12:34:56, Device2=00:45:23}"
    deviceNameAddressTable = {}
    pairedDeviceNames = []
    let deviceName = ""
    let deviceAddress = ""
    let onAddress = false
    for (let i = 0; i < deviceString.length; i++) {
        let char = deviceString[i]
        if (char == '{'){
            continue
        }

       if (char == '='){
          onAddress = true
          deviceAddress = ""
          continue
      }

      if (char == ',' || char == '}'){
         if (deviceName[0] == ' '){
              deviceName = deviceName.slice(1)
         }
         deviceNameAddressTable[deviceName] = deviceAddress
         pairedDeviceNames.push(deviceName)
         onAddress = false
         deviceName = ""           
         continue
      }

      if (!onAddress){
        deviceName += char
      }
      else{
        deviceAddress += char
      }

  }
}

