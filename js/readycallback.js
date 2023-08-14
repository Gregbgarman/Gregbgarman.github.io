

window.onload = function() {

	EloPeripheralManager.initialize("onPeripheralManagerReady")
	EloHoneywellBarcodeManager.initialize("onHoneywellReady")
	EloZebraBarcodeManager.initialize("onZebraReady")
	EloHandHeldBarcodeManager.initialize("onHandheldReady")
	EloEpsonPrinterManager.initialize("onEpsonReady")
	EloSocketMobileManager.initialize("onSocketReady")
	EloStarPrinterManager.initialize("onStarPrinterReady")
	EloStarScaleManager.initialize("onScaleReady")
};

function onPeripheralManagerReady(){
        document.getElementById("PeripheralManagerCallbackText").innerText = "Peripheral Manager Initialized"
}

function onHoneywellReady(){
	 document.getElementById("HoneywellCallbackText").innerText = "Honeywell Scanner Initialized"
}

function onZebraReady(){
	 document.getElementById("ZebraCallbackText").innerText = "Zebra Scanner Initialized"
}

function onHandheldReady(){
	document.getElementById("HandheldCallbackText").innerText = "Handheld Scanner Initialized"
}

function onEpsonReady(){
	document.getElementById("EpsonPrinterCallbackText").innerText = "Epson Printer Initialized"
}

function onSocketReady(){
	document.getElementById("SocketMobileCallbackText").innerText = "Socket Mobile Scanner Initialized"
}

function onStarPrinterReady(){
	document.getElementById("StarPrinterCallbackText").innerText = "Star Printer Initialized"
}

function onScaleReady(){
        document.getElementById("StarScaleCallbackText").innerText= "Star Scale Initialized"
}



