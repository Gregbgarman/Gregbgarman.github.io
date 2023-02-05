document.getElementById("showScanCode").addEventListener("click", showScanCode)
document.getElementById("searchBluetooth").addEventListener("click", searchBluetooth)
document.getElementById("connectBluetooth").addEventListener("click", connectBluetooth)
document.getElementById("initService").addEventListener("click", initService)
document.getElementById("enableScanning").addEventListener("click", enableScanning)
document.getElementById("runScanner").addEventListener("click", runScanner)

document.getElementById("initSocketCam").addEventListener("click", initSocketCam)
document.getElementById("disableSocketCam").addEventListener("click", disableSocketCam)
document.getElementById("disableScanning").addEventListener("click", disableScanning)








let PairCodeShown = false
let ConnectMessage = "Scanner Connected"
let DisconnectMessage = "Scanner Disconnected"

document.getElementById("scannerAvailable").innerHTML = DisconnectMessage

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


function initSocketCam(){
     let success1 = EloSocketMobileManager.enableSocketCamExtension()
     if (success1){
         let success2 = EloSocketMobileManager.activateSocketCamExtension()
         document.getElementById("textField").value = success2
     }
     else{
         document.getElementById("textField").value = "false"
     }     
}


function showScanCode(){
     if (!PairCodeShown){                   
         document.getElementById("appmodeqrcode").style.visibility = 'visible'
         document.getElementById("showScanCode").innerHTML="Hide Pair Code"
         PairCodeShown = true
     }
     else{                        
         document.getElementById("appmodeqrcode").style.visibility = 'hidden'
         document.getElementById("showScanCode").innerHTML="Show Pair Code"
         PairCodeShown = false
     }
}

function searchBluetooth(){
    let success = EloSocketMobileManager.searchBluetooth()
    if(success){
        document.getElementById("textField").value = "searching..."
    }
    else{
        document.getElementById("textField").value = "search failed"
    }
}

function connectBluetooth(){
      document.getElementById("textField").value = EloSocketMobileManager.connectBluetooth()   
}

function initService(){
     document.getElementById("textField").value = EloSocketMobileManager.initService()
}

function enableScanning(){
    let success = EloSocketMobileManager.enableScanning()
    document.getElementById("textField").value = success
}

function runScanner(){
   document.getElementById("textField").value = EloSocketMobileManager.runScanner()
}

function disableScanning(){
    let success = EloSocketMobileManager.disableScanning()
    document.getElementById("textField").value = success
}

function PostScanData(Data){        //use this function in development
     document.getElementById("textField").value = Data
}

function getFoundBluetoothDevice(Data){     //use this function in development
     document.getElementById("textField").value = Data
}
