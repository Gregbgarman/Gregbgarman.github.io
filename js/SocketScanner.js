document.getElementById("initScanner").addEventListener("click", initScanner)
//document.getElementById("initSocketCam").addEventListener("click", initSocketCam)
document.getElementById("runScanner").addEventListener("click", runScanner)
document.getElementById("readData").addEventListener("click", readData)
document.getElementById("initService").addEventListener("click", initService)

document.getElementById("showScanCode").addEventListener("click", showScanCode)

let CodeShown = false

function showScanCode(){
        
     if (!CodeShown){
             document.getElementById("textField").value = "codeshown false"
         document.getElementById("showScanCode").innerHTML="Hide Pair Code"
               document.getElementById("appmodeqrcode").style.visibility = 'visible'
         CodeShown = true
     }
     else{
                          document.getElementById("textField").value = "codeshown true"

         document.getElementById("appmodeqrcode").style.visibility = 'hidden'
         document.getElementById("showScanCode").innerHTML="Show Pair Code"
         CodeShown = false
     }
     
}

function initService(){
     document.getElementById("textField").value = EloSocketMobileManager.initService()
}

function initScanner(){
    EloSocketMobileManager.initScanner()
}

//function initSocketCam(){
 // EloSocketMobileManager.initSocketCam()
//}

function runScanner(){
  EloSocketMobileManager.runScanner()
}

function readData(){
  document.getElementById("textField").value = EloSocketMobileManager.readData()
}
