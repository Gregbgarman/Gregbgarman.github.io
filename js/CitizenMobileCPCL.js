document.getElementById("connectCitizenPrinterCPCL").addEventListener("click", connectCitizenPrinterCPCL)
document.getElementById("disconnectCitizenPrinterCPCL").addEventListener("click", disconnectCitizenPrinterCPCL)
document.getElementById("printSampleCitizenReceipt1CPCL").addEventListener("click", printSampleCitizenReceipt1CPCL)
document.getElementById("printSampleCitizenReceipt2CPCL").addEventListener("click", printSampleCitizenReceipt2CPCL)
document.getElementById("showBTPairedDevicesCitizenCPCL").addEventListener("click", showBTPairedDevicesCitizenCPCL)
document.getElementById("isCitizenBTConnectedCPCL").addEventListener("click", isCitizenBTConnectedCPCL)
document.getElementById("printCitizenImageCPCL").addEventListener("click", printCitizenImageCPCL)
document.getElementById("runBluetoothDiscoveryCPCL").addEventListener("click", runBluetoothDiscoveryCPCL)
document.getElementById("pairOverBluetoothCPCL").addEventListener("click", pairOverBluetoothCPCL)

let pairedDeviceAddressTableCPCL = {}
let discoveredDevicesTableCPCL = {}
let discoveredDevicesArrayCPCL = []


///// CPCL CONSTANTS
const CMP_CPCL_CONTINUOUS = 2
const CMP_CPCL_LEFT = 0
const CMP_CPCL_CENTER = 1
const CMP_CPCL_RIGHT = 2
const CMP_CPCL_0_ROTATION = 0
const CMP_CPCL_BCS_QRCODE = "QRCODE"
const CMP_CPCL_BCS_CODABAR = "CODABAR"
const CMP_CPCL_BCS_0RATIO = 0

//CMP_SUCCESS = 0      defined in other file



function runBluetoothDiscoveryCPCL(){          //tied to button. Extra API added by Elo    
    discoveredDevicesTableCPCL = {}
    discoveredDevicesArrayCPCL = []
    EloCitizenManagerCPCL.setBluetoothSearchListener("DeviceReceiverCPCL")     //set callback function
    EloCitizenManagerCPCL.discoverBluetoothDevices()
}

function DeviceReceiverCPCL(deviceName, deviceAddress){          //actively receives discovered bluetooth device
     if (deviceName.includes("cmp") || deviceName.includes("CMP")){    //using as criteria to filter out search results
         discoveredDevicesArrayCPCL.push(deviceName)
         discoveredDevicesTableCPCL[deviceName] = deviceAddress
         document.getElementById("textField").value = discoveredDevicesArrayCPCL
     }
}

function pairOverBluetoothCPCL(){          //tied to button. Extra API added by Elo
     let deviceName = document.getElementById("textField").value
     let deviceAddress = discoveredDevicesTableCPCL[deviceName]
     if (deviceAddress == undefined){
          document.getElementById("textField").value = "invalid device"
          return
     }
      if(EloCitizenManagerCPCL.pairBluetoothDevice(deviceAddress)){
           document.getElementById("textField").value = "pairing device - check if paired shortly"
      }
      else{
           document.getElementById("textField").value = "error pairing device"
      }    
}

function showBTPairedDevicesCitizenCPCL(){          //tied to button
     let deviceString = EloCitizenManagerCPCL.getBluetoothPairedDevices()
     if (deviceString == "{}"){
          document.getElementById("textField").value = "no devices found"
          return
     }
     let pairedDevices = parseDeviceStringCPCL(deviceString)
     document.getElementById("textField").value = pairedDevices
}

function connectCitizenPrinterCPCL(){          //tied to button
    let deviceName = document.getElementById("textField").value

    let deviceAddress = pairedDeviceAddressTableCPCL[deviceName]
     if (deviceAddress != undefined){
         EloCitizenManagerCPCL.connectBluetooth(deviceAddress)    //part of citizen SDK. First step needed to use API's
         if (EloCitizenManagerCPCL.isBluetoothConnected()){
              document.getElementById("CitizenPrinterAvailable").innerHTML = "Printer Ready"
         }
     }
     else{
         document.getElementById("textField").value = "failed to connect" 
     }
}

function isCitizenBTConnectedCPCL(){          //tied to button
     document.getElementById("textField").value = EloCitizenManagerCPCL.isBluetoothConnected()
}

function disconnectCitizenPrinterCPCL(){          //tied to button
    EloCitizenManagerCPCL.disconnectBluetooth()
    if (!EloCitizenManagerCPCL.isBluetoothConnected()){
        document.getElementById("CitizenPrinterAvailable").innerHTML = "Printer Offline"
    }
    else{
        document.getElementById("textField").value = "error disconnecting"
    }
}

function printSampleCitizenReceipt1CPCL(){          //tied to button
    if (printReceipt1CPCL() == CMP_SUCCESS){
         document.getElementById("textField").value = "print success"
    }
     else{
         document.getElementById("textField").value = "print failure"
     }
}

function printReceipt1CPCL(){

  let sts =  EloCitizenManagerCPCL.printerCheck();
  if(sts != CMP_SUCCESS) {
      document.getElementById("textField").value = "Printer check fail"
      return sts
  }

  sts =  EloCitizenManagerCPCL.status();
  if(sts != CMP_SUCCESS) {
    document.getElementById("textField").value = "Printer status fail"
    return sts
  }

   EloCitizenManagerCPCL.setForm(0, 200, 200, 406, 1);
   EloCitizenManagerCPCL.setMedia(CMP_CPCL_CONTINUOUS);
   EloCitizenManagerCPCL.printCPCLText(0, 5, 1, 1, 1, "CITIZEN SYSTEMS CO.,LTD.", 0);
   EloCitizenManagerCPCL.printCPCLText(0, 0, 2, 1, 70, "Micro Human Tech", 0);
   EloCitizenManagerCPCL.printCPCLText(0, 0, 2, 1, 110, "CITIZEN MOBILE PRINTER", 0);
   EloCitizenManagerCPCL.printCPCLText(0, 0, 2, 1, 150, "CMP-20 , CMP-30", 0);
   EloCitizenManagerCPCL.printCPCLText(CMP_CPCL_0_ROTATION, 7, 0, 1, 200, "Copyright 2011 Citizen Systems", 0);
   EloCitizenManagerCPCL.printCPCL2DBarCode(0, CMP_CPCL_BCS_QRCODE, 0, 250, 4, 0, 1, 0, "http://citizen-systems.com");
   EloCitizenManagerCPCL.printCPCLText(CMP_CPCL_0_ROTATION, 7, 0, 130, 250, "citizen-systems.com", 0);
   EloCitizenManagerCPCL.printCPCLText(CMP_CPCL_0_ROTATION, 1, 0, 130, 300, "<-- Check This.", 0);         
   EloCitizenManagerCPCL.printForm();
  
   return CMP_SUCCESS
}


function printSampleCitizenReceipt2CPCL(){          //tied to button
   if (printReceipt2CPCL() == CMP_SUCCESS){
         document.getElementById("textField").value = "print success"
    }
     else{
         document.getElementById("textField").value = "print failure"
     }
}

function printReceipt2CPCL(){
  let sts =  EloCitizenManagerCPCL.printerCheck();
  if(sts != CMP_SUCCESS) {
      document.getElementById("textField").value = "Printer check fail"
      return sts
  }

  sts =  EloCitizenManagerCPCL.status();
  if(sts != CMP_SUCCESS) {
    document.getElementById("textField").value = "Printer status fail"
    return sts
  }

let nLineWidth = 384;

   EloCitizenManagerCPCL.setForm(0, 200, 200, 406, 1);
   EloCitizenManagerCPCL.setMedia(CMP_CPCL_CONTINUOUS);
   EloCitizenManagerCPCL.printAndroidFontWithAlignment("Receipt", nLineWidth, 100, 0, CMP_CPCL_CENTER);
   EloCitizenManagerCPCL.printAndroidFontWithAlignment("Left Alignment", nLineWidth, 24, 120, CMP_CPCL_LEFT);
   EloCitizenManagerCPCL.printAndroidFontWithAlignment("Center Alignment", nLineWidth, 24, 150, CMP_CPCL_CENTER);
   EloCitizenManagerCPCL.printAndroidFontWithAlignment("Right Alignment", nLineWidth, 24, 180, CMP_CPCL_RIGHT);
   EloCitizenManagerCPCL.printAndroidFontWithAlignment("SANS_SERIF", "SANS_SERIF : 1234iwIW", nLineWidth, 24, 210, CMP_CPCL_LEFT);
   EloCitizenManagerCPCL.printAndroidFontWithAlignment("SERIF", "SERIF : 1234iwIW", nLineWidth, 24, 240, CMP_CPCL_LEFT);
   EloCitizenManagerCPCL.printAndroidFontWithAlignment("MONOSPACE", "MONOSPACE : 1234iwIW", nLineWidth, 24, 270, CMP_CPCL_LEFT);
   EloCitizenManagerCPCL.printForm();
   return  CMP_SUCCESS
}



function printCitizenImageCPCL(){          //tied to button
    if (printTheImage() == CMP_SUCCESS){
       document.getElementById("textField").value = "print success"
    }
    else{
       document.getElementById("textField").value = "print failure"
    }     
}

function printTheImageCPCL(){
  let sts =  EloCitizenManagerCPCL.printerCheck();
  if(sts != CMP_SUCCESS) {
      document.getElementById("textField").value = "Printer check fail"
      return sts
  }

  sts =  EloCitizenManagerCPCL.status();
    
  if(sts != CMP_SUCCESS) {
    document.getElementById("textField").value = "Printer status fail"
    return sts
  }

   cpclPrinter.setForm(0, 200, 200, 406, 1);
   cpclPrinter.setMedia(CMP_CPCL_CONTINUOUS);
   cpclPrinter.setCPCLBarcode(0, 0, 0);
   cpclPrinter.printCPCLBarcode(CMP_CPCL_0_ROTATION, CMP_CPCL_BCS_CODABAR, 2, CMP_CPCL_BCS_0RATIO, 30, 19, 45, "A37859B", 0);
   cpclPrinter.printCPCLText(0, 7, 0, 19, 18, CMP_CPCL_BCS_CODABAR, 0);

     
   return CMP_SUCCESS;
}


function parseDeviceStringCPCL(deviceString){          //devices will be in string format such as "{CMP_2345=00:12:34:56, Device2=00:45:23}"
    pairedDeviceAddressTableCPCL = {}
    let pairedDeviceNames = []
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
         pairedDeviceAddressTableCPCL[deviceName] = deviceAddress
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
  return pairedDeviceNames
}
