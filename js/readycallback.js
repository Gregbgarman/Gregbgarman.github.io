

window.onload = function() {
	//EloSocketMobileManager.initialize("onSocketReady")
	//EloStarScaleManager.initialize("onScaleReady")
	//EloEpsonPrinterManager.initialize("onEpsonReady")
	//EloHoneywellBarcodeManager.initialize("onHoneywellReady")
	//EloZebraBarcodeManager.initialize("onZebraReady")
	//EloHandHeldBarcodeManager.initialize("onHandheldReady")
	EloPeripheralManager.initialize("onPeripheralManagerReady")
	//EloStarPrinterManager.initialize("onStarPrinterReady")
};


function onSocketReady(){
//	document.getElementById("PeripheralManagerCallbackText").value = EloEpsonPrinterManager.printBarcode(barcodeToPrint);
}

function onScaleReady(){
//	document.getElementById("textField").value = EloEpsonPrinterManager.printBarcode(barcodeToPrint);
}

function onEpsonReady(){
	// document.getElementById("textField").value = EloEpsonPrinterManager.printBarcode(barcodeToPrint);
}

function onStarPrinterReady(){
//	document.getElementById("textField").value = EloEpsonPrinterManager.printBarcode(barcodeToPrint);
}

function onHoneywellReady(){
	// document.getElementById("textField").value = EloEpsonPrinterManager.printBarcode(barcodeToPrint);
}

function onZebraReady(){
	//document.getElementById("textField").value = EloEpsonPrinterManager.printBarcode(barcodeToPrint);
}

function onHandheldReady(){
	//document.getElementById("textField").value = EloEpsonPrinterManager.printBarcode(barcodeToPrint);
}

function onPeripheralManagerReady(){
  document.getElementById("PeripheralManagerCallbackText").value = "Peripheral Manager Ready"
}


