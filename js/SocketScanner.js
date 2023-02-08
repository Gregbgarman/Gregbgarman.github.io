document.getElementById("showScanCode").addEventListener("click", showScanCode)
document.getElementById("searchBluetooth").addEventListener("click", searchBluetooth)
document.getElementById("connectBluetooth").addEventListener("click", connectBluetooth)
document.getElementById("initService").addEventListener("click", initService)
document.getElementById("enableScanning").addEventListener("click", enableScanning)
document.getElementById("runScanner").addEventListener("click", runScanner)
document.getElementById("disableScanning").addEventListener("click", disableScanning)

document.getElementById("getBatteryLevel").addEventListener("click", getBatteryLevel)



//document.getElementById("initSocketCam").addEventListener("click", initSocketCam)
//document.getElementById("activateSocketCam").addEventListener("click", activateSocketCam)
//document.getElementById("disableSocketCam").addEventListener("click", disableSocketCam)



let PairCodeShown = false
let BluetoothDevices = []

document.getElementById("scannerAvailable").innerHTML = "Scanner Unavailable"

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

function getBatteryLevel(){
    //set callback here
    
}




function initSocketCam(){
     let success = EloSocketMobileManager.enableSocketCamExtension()     
     document.getElementById("textField").value = success         
}

function activateSocketCam(){    
     let success = EloSocketMobileManager.activateSocketCamExtension()
     document.getElementById("textField").value = success
}


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
    registerBTDeviceFoundListener()
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
        document.getElementById("textField").value =  "Failed"
    }
}

function initService(){
     document.getElementById("textField").value = EloSocketMobileManager.initService()
}

function enableScanning(){      //if this is true and return of client list is not !== '[]' then say Scanner Ready
    let success1 = EloSocketMobileManager.setClientListener()
    let success2 = EloSocketMobileManager.connectClient()
    
    let DeviceList = EloSocketMobileManager.getDeviceClientList()
    
    if (success1 && success2){
        if ( DeviceList !== "[]"){
            document.getElementById("scannerAvailable").innerHTML = "Scanner Ready"
        }
        else{
            document.getElementById("textField").value =  "no device found"
        }
    }     
}

function runScanner(){
   document.getElementById("textField").value = EloSocketMobileManager.triggerScanner()
}

function disableScanning(){
    let success = EloSocketMobileManager.disableScanning()
    if (success){
         document.getElementById("scannerAvailable").innerHTML = "Scanner Unavailable"     
    }   
}


////*****////
function registerScanningListener(){
    EloSocketMobileManager.registerScanningListener("ScanDataCallback")    
}

function ScanDataCallback(Data){       
     document.getElementById("textField").value = Data
}
////****////



function registerBTDeviceFoundListener(){
    EloSocketMobileManager.registerBTDeviceFoundListener("BTDeviceCallback")
}


function BTDeviceCallback(Data){          
     if (Data === ""){
          document.getElementById("textField").value = "No device found"
     }
     else{
    
         BluetoothDevices.push(Data)
         document.getElementById("textField").value = BluetoothDevices.toString()
     }
}
