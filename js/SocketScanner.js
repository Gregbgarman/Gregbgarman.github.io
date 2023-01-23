document.getElementById("initScanner").addEventListener("click", initScanner)
document.getElementById("initSocketCam").addEventListener("click", initSocketCam)
document.getElementById("runScanner").addEventListener("click", runScanner)
document.getElementById("readData").addEventListener("click", readData)
document.getElementById("StarPrinterAvailable").innerHTML = "Star Printer Disconnected"


function initScanner(){
    EloSocketMobileManager.initScanner();
}

function initSocketCam(){
  EloSocketMobileManager.initSocketCam();
}

function runScanner(){
  EloSocketMobileManager.runScanner();
}

function readData(){
  document.getElementById("textField").value = EloSocketMobileManager.readData();
}
