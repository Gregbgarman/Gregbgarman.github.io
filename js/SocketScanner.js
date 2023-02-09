document.getElementById("showScanCode").addEventListener("click", showScanCode)
document.getElementById("searchBluetooth").addEventListener("click", searchBluetooth)
document.getElementById("connectBluetooth").addEventListener("click", connectBluetooth)
document.getElementById("initService").addEventListener("click", initService)
document.getElementById("enableScanning").addEventListener("click", enableScanning)
document.getElementById("runScanner").addEventListener("click", runScanner)
document.getElementById("disableScanning").addEventListener("click", disableScanning)

document.getElementById("getBatteryLevel").addEventListener("click", getBatteryLevel)

//document.getElementById("isDeviceConnected").addEventListener("click", isDeviceConnected)




//document.getElementById("initSocketCam").addEventListener("click", initSocketCam)
//document.getElementById("activateSocketCam").addEventListener("click", activateSocketCam)
//document.getElementById("disableSocketCam").addEventListener("click", disableSocketCam)



let PairCodeShown = false
let BluetoothDevices = []

document.getElementById("scannerAvailable").innerHTML = "Scanner Unavailable"


function showScanCode(){
     if (!PairCodeShown){                   
         document.getElementById("appmodeqrcode").style.visibility = 'visible'
         document.getElementById("showScanCode").innerHTML="Hide Pair Code"
         PairCodeShown = true
     }
     else{                        
         document.getElementById("appmodeqrcode").style.visibility = 'hidden'
         document.getElementById("showScanCode").innerHTML="2.Show Pair Code Below"
         PairCodeShown = false
     }
}

function searchBluetooth(){
    registerBTSearchListener()
    document.getElementById("textField").value = "searching..."
    BluetoothDevices = []
    let BTAddress = "60:8A:10:64:A9:68"       //Find this on the handheld scanner to improve bluetooth pairing     
    let success = EloSocketMobileManager.searchBluetooth(BTAddress)
    if(success){
        document.getElementById("textField").value = "searching..."
    }
    else{
        document.getElementById("textField").value = "search failed"
    }
}

function connectBluetooth(){
    let BTDevice = document.getElementById("textField").value
    let success =  EloSocketMobileManager.connectBluetooth(BTDevice)
    if (success){
        document.getElementById("textField").value = "Connecting...Wait for beep" 
    }
    else{
        document.getElementById("textField").value =  "Failed. Try again"
    }
}

function initService(){
     document.getElementById("textField").value = EloSocketMobileManager.initService()
}

function enableScanning(){      
    let success1 = EloSocketMobileManager.setClientListener("DeviceStateCallback")   //also see function on line 89 to receive information.
    let success2 = EloSocketMobileManager.connectClient()
    if (success1 && success2){
        document.getElementById("textField").value =  "Waiting for device..."        //waiting for callback to signal device is ready
    }
    else{
        document.getElementById("textField").value =  "Failed"
    }
}

function DeviceStateCallback(Data){
    let DeviceState = Data
    if (DeviceState === "DEVICESTATE_GONE"){
        document.getElementById("scannerAvailable").innerHTML = "Scanner Unavailable"
    }
    else if (DeviceState === "DEVICESTATE_AVAILABLE"){
        EloSocketMobileManager.openScanner()       //should put device into a ready state
    }
    else if (DeviceState === "DEVICESTATE_OPEN"){
    
    }
    else if (DeviceState === "DEVICESTATE_READY"){
         registerScanningListener()
         document.getElementById("scannerAvailable").innerHTML = "Scanner Ready"
    }
   
}

/*
function isDeviceConnected(){
    let DeviceList = EloSocketMobileManager.getDeviceClientList()
    if (DeviceList !== "[]"){
            registerScanningListener()
            document.getElementById("scannerAvailable").innerHTML = "Scanner Ready"
            document.getElementById("textField").value =  "true"
        }
        else{
            document.getElementById("textField").value =  "no device found"
        }
}
*/

function runScanner(){
   document.getElementById("textField").value = EloSocketMobileManager.triggerScanner()
}

function getBatteryLevel(){
    let BatteryLevel = EloSocketMobileManager.getDeviceBatteryLevel()
    if (BatteryLevel === -1){
          document.getElementById("textField").value = "Error finding battery %"
    }
    else{
         document.getElementById("textField").value = BatteryLevel.toString() + "%"      
    }       
}

function disableScanning(){
    
    EloSocketMobileManager.closeScanner()         //this should set the scanner to unavailable   
    let success = EloSocketMobileManager.disconnectCaptureClient()
    if (!success){
         document.getElementById("textField").value = "Failed to close client"    
    }
}


////*****////
function registerScanningListener(){
    EloSocketMobileManager.registerScanningListener("ScanDataCallback")     //parameter needs to match the function name below  
}

function ScanDataCallback(Data){       
     document.getElementById("textField").value = Data
}
////****////


////*****////
function registerBTSearchListener(){
    EloSocketMobileManager.registerBTSearchListener("BTSearchCallback")
}

function BTSearchCallback(Data){      //runs when a bluetooth device is found. Will return " " if no device found at end of BT search
     let BTDeviceFound = Data
     if (BTDeviceFound === " "){
          document.getElementById("textField").value = "No device found"        
     }
     else{    
         BluetoothDevices.push(BTDeviceFound)
         document.getElementById("textField").value = BluetoothDevices.toString()
     }
}






////*****////



/*
function initSocketCam(){
     let success = EloSocketMobileManager.enableSocketCamExtension()     
     document.getElementById("textField").value = success         
}

function activateSocketCam(){    
     let success = EloSocketMobileManager.activateSocketCamExtension()
     document.getElementById("textField").value = success
}
function disableSocketCam(){
    let success1 = EloSocketMobileManager.disableSocketCamExtension()
     if (success1){
         let success2 = EloSocketMobileManager.deactivateSocketCamExtension()
         document.getElementById("textField").value = success2
     }
     else{
         document.getElementById("textField").value = "false"
     }   
}

*/
