document.getElementById("initScanner").addEventListener("click", initScanner)
//document.getElementById("initSocketCam").addEventListener("click", initSocketCam)
document.getElementById("runScanner").addEventListener("click", runScanner)
document.getElementById("readData").addEventListener("click", readData)
document.getElementById("initService").addEventListener("click", initService)
document.getElementById("showScanCode").addEventListener("click", showScanCode)
document.getElementById("disconnectScanner").addEventListener("click", disconnectScanner)



let CodeShown = false
document.getElementById("scannerAvailable").innerHTML="Socket Scanner is Disconnected"

function showScanCode(){
     if (!CodeShown){                   
         document.getElementById("appmodeqrcode").style.visibility = 'visible'
         document.getElementById("showScanCode").innerHTML="Hide Pair Code"
         CodeShown = true
     }
     else{                        
         document.getElementById("appmodeqrcode").style.visibility = 'hidden'
         document.getElementById("showScanCode").innerHTML="Show Pair Code"
         CodeShown = false
     }
     
}

function initService(){
     document.getElementById("textField").value = EloSocketMobileManager.initService()
}

function initScanner(){
    let success = EloSocketMobileManager.initScanner()
    if (success){
        document.getElementById("scannerAvailable").innerHTML="Socket Scanner is Connected"
    }
    else{
       document.getElementById("scannerAvailable").innerHTML="Socket Scanner is Disconnected"  
    }
     document.getElementById("textField").value = success
     
}

//function initSocketCam(){
 // EloSocketMobileManager.initSocketCam()
//}

function runScanner(){
  EloSocketMobileManager.runScanner()
}

function disconnectScanner(){
    let success = EloSocketMobileManager.disconnectScanner()
    if (success){
        document.getElementById("scannerAvailable").innerHTML="Socket Scanner is Disconnected"
    }  
    document.getElementById("textField").value = success
}

function readData(){
  document.getElementById("textField").value = EloSocketMobileManager.readData()
}
