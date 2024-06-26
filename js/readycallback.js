let peripheralmanagerReady = false
let honeywellscannerReady = false
let zebrascannerReady = false
let handheldscannerReady = false
let epsonprinterReady = false
let socketscannerReady = false
let starprinterReady = false
let starscaleReady = false



window.onload = function() {
	initializeCallbacks()
};

function initializeCallbacks(){
	//EloPeripheralManager.initialize("onPeripheralManagerReady")
	//EloHoneywellBarcodeManager.initialize("onHoneywellReady")
	//EloZebraBarcodeManager.initialize("onZebraReady")
	//EloHandHeldBarcodeManager.initialize("onHandheldReady")
	//EloEpsonPrinterManager.initialize("onEpsonReady")
	//EloSocketMobileManager.initialize("onSocketReady")
	EloStarPrinterManager.initialize("onStarPrinterReady")
	EloStarScaleManager.initialize("onScaleReady")
}

function checkAllDevicesInitialized(){
	if (peripheralmanagerReady && honeywellscannerReady && zebrascannerReady && handheldscannerReady && epsonprinterReady
	    && socketscannerReady && starprinterReady && starscaleReady){
		document.getElementById("finalMessage").style.visibility = 'visible'
		document.getElementById("finalMessage").style.color = '#008000' 
	}
}

function onPeripheralManagerReady(){
        document.getElementById("PeripheralManagerCallbackText").innerText = "Peripheral Manager Initialized"
	peripheralmanagerReady = true
	checkAllDevicesInitialized()
}

function onHoneywellReady(){
	 document.getElementById("HoneywellCallbackText").innerText = "Honeywell Scanner Initialized"
	 honeywellscannerReady = true
	checkAllDevicesInitialized()
}

function onZebraReady(){
	 document.getElementById("ZebraCallbackText").innerText = "Zebra Scanner Initialized"
	 zebrascannerReady = true
	checkAllDevicesInitialized()
}

function onHandheldReady(){
	document.getElementById("HandheldCallbackText").innerText = "Handheld Scanner Initialized"
	handheldscannerReady = true
	checkAllDevicesInitialized()
}

function onEpsonReady(){
	document.getElementById("EpsonPrinterCallbackText").innerText = "Epson Printer Initialized"
	epsonprinterReady = true
	checkAllDevicesInitialized()
}

function onSocketReady(){
	document.getElementById("SocketMobileCallbackText").innerText = "Socket Mobile Scanner Initialized"
	socketscannerReady = true
	checkAllDevicesInitialized()
}

function onStarPrinterReady(){
	document.getElementById("StarPrinterCallbackText").innerText = "Star Printer Initialized"
	starprinterReady = true
	checkAllDevicesInitialized()
}

function onScaleReady(){
        document.getElementById("StarScaleCallbackText").innerText= "Star Scale Initialized"
	starscaleReady = true
	checkAllDevicesInitialized()
}
