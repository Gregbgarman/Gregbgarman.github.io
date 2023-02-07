document.getElementById("showScanCode").addEventListener("click", showScanCode)
document.getElementById("searchBluetooth").addEventListener("click", searchBluetooth)
document.getElementById("connectBluetooth").addEventListener("click", connectBluetooth)
document.getElementById("initService").addEventListener("click", initService)
document.getElementById("enableScanning").addEventListener("click", enableScanning)
document.getElementById("runScanner").addEventListener("click", runScanner)

document.getElementById("initSocketCam").addEventListener("click", initSocketCam)
document.getElementById("activateSocketCam").addEventListener("click", activateSocketCam)
document.getElementById("disableSocketCam").addEventListener("click", disableSocketCam)
document.getElementById("disableScanning").addEventListener("click", disableScanning)


let PairCodeShown = false
let UnavailableMessage = "Scanner Unavailable"

document.getElementById("scannerAvailable").innerHTML = "Scanner Available"

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
    let success = EloSocketMobileManager.searchBluetooth()
    if(success){
        document.getElementById("textField").value = "searching..."
    }
    else{
        document.getElementById("textField").value = "search failed"
    }
}

function connectBluetooth(){
    let success =  EloSocketMobileManager.connectBluetooth()
    if (success){
        document.getElementById("textField").value = "Connecting..." 
    }
    else{
        document.getElementById("textField").value =  "Failed"
    }
}

function initService(){
     document.getElementById("textField").value = EloSocketMobileManager.initService()
}

function enableScanning(){
    let success = EloSocketMobileManager.enableScanning()
    if (success){
        document.getElementById("textField").value = "Scanning Available"    
    }    
}

function runScanner(){
   document.getElementById("textField").value = EloSocketMobileManager.runScanner()
}

function disableScanning(){
    let success = EloSocketMobileManager.disableScanning()
    if (success){
         document.getElementById("textField").value = "Scanning Unavailable"     
    }   
}

function PostScanData(Data){        //use this function in development
     document.getElementById("textField").value = Data
}

function getFoundBluetoothDevice(Data){     //use this function in development
     if (Data === ""){
          document.getElementById("textField").value = "No device found"
     }
     else{
         document.getElementById("textField").value = Data
     }    
}
