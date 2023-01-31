document.getElementById("initScanner").addEventListener("click", initScanner)
//document.getElementById("initSocketCam").addEventListener("click", initSocketCam)
document.getElementById("runScanner").addEventListener("click", runScanner)
document.getElementById("readData").addEventListener("click", readData)
document.getElementById("initService").addEventListener("click", initService)
document.getElementById("showScanCode").addEventListener("click", showScanCode)
document.getElementById("disconnectScanner").addEventListener("click", disconnectScanner)



let PairCodeShown = false
let ConnectMessage = "Scanner Connected"
let DisconnectMessage = "Scanner Disconnected"

document.getElementById("scannerAvailable").innerHTML = ConnectMessage

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

function initService(){
     document.getElementById("textField").value = EloSocketMobileManager.initService()
}

function initScanner(){
    let success = EloSocketMobileManager.initScanner()
    if (success){
        document.getElementById("scannerAvailable").innerHTML = ConnectMessage
    }
    else{
       document.getElementById("scannerAvailable").innerHTML = DisconnectMessage 
    }
     document.getElementById("textField").value = success
     
}

//function initSocketCam(){
 // EloSocketMobileManager.initSocketCam()
//}

function runScanner(){
   document.getElementById("textField").value = EloSocketMobileManager.runScanner()
}

function disconnectScanner(){
    let success = EloSocketMobileManager.disconnectScanner()
    if (success){
        document.getElementById("scannerAvailable").innerHTML = DisconnectMessage
    }  
    document.getElementById("textField").value = success
}

function readData(){
  document.getElementById("textField").value = EloSocketMobileManager.readData()
}
