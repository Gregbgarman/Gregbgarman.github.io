document.getElementById("connectCitizenPrinter").addEventListener("click", connectCitizenPrinter)
document.getElementById("disconnectCitizenPrinter").addEventListener("click", disconnectCitizenPrinter)
document.getElementById("printSampleCitizenReceipt1").addEventListener("click", printSampleCitizenReceipt1)
document.getElementById("printSampleCitizenReceipt2").addEventListener("click", printSampleCitizenReceipt2)
document.getElementById("showBTPairedDevicesCitizen").addEventListener("click", showBTPairedDevicesCitizen)
document.getElementById("isCitizenBTConnected").addEventListener("click", isCitizenBTConnected)
document.getElementById("printCitizenQRCode").addEventListener("click", printCitizenQRCode)



let pairedDeviceNames = []
let deviceNameAddressTable = {}
const CMP_ALIGNMENT_CENTER = 1
const CMP_FNT_DEFAULT = 0
const CMP_ALIGNMENT_RIGHT = 2
const CMP_ALIGNMENT_LEFT = 0
const CMP_FNT_UNDERLINE = 128
const CMP_TXT_1WIDTH = 0
const CMP_TXT_2WIDTH = 16
const CMP_SUCCESS = 0
const CMP_QRCODE_EC_LEVEL_L = 0


function showBTPairedDevicesCitizen(){          //tied to button
     let deviceString = EloCitizenMobileManager.getBluetoothPairedDevices()
     if (deviceString == "{}"){
          document.getElementById("textField").value = "no devices found"
          return
     }
     
     parseDeviceString(deviceString)
     document.getElementById("textField").value = pairedDeviceNames
}

function connectCitizenPrinter(){          //tied to button
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

function isCitizenBTConnected(){          //tied to button
     document.getElementById("textField").value = EloCitizenMobileManager.isBluetoothConnected()
}

function disconnectCitizenPrinter(){          //tied to button
    EloCitizenMobileManager.disconnectBluetooth()
}

function printSampleCitizenReceipt1(){          //tied to button
    if (printReceipt1() == CMP_SUCCESS){
         document.getElementById("textField").value = "print success"
    }
     else{
         document.getElementById("textField").value = "print failure"
     }

}

function printReceipt1(){
  var sts =  EloCitizenMobileManager.printerCheck();
  if(sts != CMP_SUCCESS) {
      document.getElementById("textField").value = "Printer check fail"
      return sts
  }

  sts =  EloCitizenMobileManager.status();
  if(sts != CMP_SUCCESS) {
    document.getElementById("textField").value = "Printer status fail"
    return sts
  }

  EloCitizenMobileManager.printText("Receipt\r\n\r\n\r\n", CMP_ALIGNMENT_CENTER, CMP_FNT_DEFAULT, CMP_TXT_2WIDTH);
  EloCitizenMobileManager.printText("TEL (123)-456-7890\r\n", CMP_ALIGNMENT_CENTER, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Thank you for coming to our shop\r\n\n", CMP_ALIGNMENT_CENTER, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Chicken               $10.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Hamburger             $20.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Pizza                 $30.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Lemons                $40.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Drink                 $50.00\r\n\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Excluded tax          $150.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Tax(5%)               $7.50\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_UNDERLINE, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Total                 $157.50\r\n\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_2WIDTH);
  EloCitizenMobileManager.printText("Payment               $200.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.printText("Change                $42.50\r\n\r\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
  EloCitizenMobileManager.lineFeed(2);

  return  CMP_SUCCESS
     
}


function printSampleCitizenReceipt2(){          //tied to button
   if (printReceipt2() == CMP_SUCCESS){
         document.getElementById("textField").value = "print success"
    }
     else{
         document.getElementById("textField").value = "print failure"
     }
     
}

function printReceipt2(){
  var sts =  EloCitizenMobileManager.printerCheck();
  if(sts != CMP_SUCCESS) {
      document.getElementById("textField").value = "Printer check fail"
      return sts
  }

  sts =  EloCitizenMobileManager.status();
  if(sts != CMP_SUCCESS) {
    document.getElementById("textField").value = "Printer status fail"
    return sts
  }

     

        EloCitizenMobileManager.printNormal("       Greg's Pizza House\n")
        EloCitizenMobileManager.printNormal("123 Rainbow Road Knoxville, TN\n")
        EloCitizenMobileManager.printNormal("456-321-7890\n\n")
        EloCitizenMobileManager.printNormal("----------------------------\n")
        EloCitizenMobileManager.printNormal("Cheese Slice          $8.00\n\n")
        EloCitizenMobileManager.printNormal("pepperoni slice       $10.00\n\n")
        EloCitizenMobileManager.printNormal("Stromboli             $12.00\n\n")
        EloCitizenMobileManager.printNormal("salad                 $8.00\n\n")
        EloCitizenMobileManager.printNormal("----------------------------\n")
        EloCitizenMobileManager.printNormal("Excluded tax          $38.00\n\n")
        EloCitizenMobileManager.printNormal("Tax(10%)              $3.80\n\n")
        EloCitizenMobileManager.printNormal("Total             $41.80\n\n")
        EloCitizenMobileManager.printNormal("Payment           $50.00\n\n")
        EloCitizenMobileManager.printNormal("Change            $8.20\n\n")
        EloCitizenMobileManager.lineFeed(2);
        

     return  CMP_SUCCESS
}

function printCitizenQRCode(){          //tied to button
    if (printTheQRCode() == CMP_SUCCESS){
         document.getElementById("textField").value = "print success"
    }
     else{
         document.getElementById("textField").value = "print failure"
     }
}

function printTheQRCode(){
var sts =  EloCitizenMobileManager.printerCheck();
  if(sts != CMP_SUCCESS) {
      document.getElementById("textField").value = "Printer check fail"
      return sts
  }

  sts =  EloCitizenMobileManager.status();
  if(sts != CMP_SUCCESS) {
    document.getElementById("textField").value = "Printer status fail"
    return sts
  }

   let data = "https://www.elotouch.com/"
   EloCitizenMobileManager.printString("QR Code\r\n");
   EloCitizenMobileManager.printQRCode(data, data.length, 11, CMP_QRCODE_EC_LEVEL_L, CMP_ALIGNMENT_CENTER);
   EloCitizenMobileManager.lineFeed(4);

   return CMP_SUCCESS;
     
     
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

