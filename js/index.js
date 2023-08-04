// Set up button click listener
document.getElementById("enable_slk").addEventListener("click", enableSlk);
document.getElementById("disable_slk").addEventListener("click", disableSlk);
document.getElementById("slk_color_red").addEventListener("click", setSlkColorRed);
document.getElementById("slk_color_green").addEventListener("click", setSlkColorGreen);
document.getElementById("set_brightness").addEventListener("click", setBrightess);
document.getElementById("activate_idle_mode").addEventListener("click", activateIdleMode);
document.getElementById("get_lcd_density").addEventListener("click", getScreenDensity);
document.getElementById("set_lcd_density").addEventListener("click", setScreenDensity);
document.getElementById("get_light").addEventListener("click", getLight);
document.getElementById("set_red_light").addEventListener("click", setRedLight);
document.getElementById("set_green_light").addEventListener("click", setGreenLight);
document.getElementById("set_blue_light").addEventListener("click", setBlueLight);
document.getElementById("set_light_off").addEventListener("click", setLightOff);
document.getElementById("is_flashing").addEventListener("click", isFlashing);
document.getElementById("set_red_flashing").addEventListener("click", setRedFlashing);
document.getElementById("set_green_flashing").addEventListener("click", setGreenFlashing);
document.getElementById("set_blue_flashing").addEventListener("click", setBlueFlashing);
document.getElementById("stop_flashing").addEventListener("click", stopFlashing);
document.getElementById("open_cd").addEventListener("click", openCD);
document.getElementById("is_cd_open").addEventListener("click", isCDOpen);
document.getElementById("get_cd_voltage").addEventListener("click", getCDVoltage);
document.getElementById("set_cd_voltage").addEventListener("click", setCDVoltage);

window.onload = function() {
  //checkAvailableDevices();

	//EloSocketMobileManager.initialize("onSocketReady")
	//EloStarScaleManager.initialize("onScaleReady")
	//EloEpsonPrinterManager.initialize("onEpsonReady")
	//EloHoneywellBarcodeManager.initialize("onHoneywellReady")
	EloZebraBarcodeManager.initialize("onZebraReady")
	///EloHandHeldBarcodeManager.initialize("onHandheldReady")
	//EloPeripheralManager.initialize("onPeripheralManagerReady")
	//EloStarPrinterManager.initialize("onStarPrinterReady")

};


function onSocketReady(){
	enableScanning()
}

function onScaleReady(){
	document.getElementById("StarScaleAvailable").innerHTML = "callback ranzzz"
}

function onEpsonReady(){
	 var printerAvailable = EloEpsonPrinterManager.isPrinterConnected();
    if(printerAvailable == true){
        document.getElementById("printerAvailable").innerHTML = "Printer is Connected";
    } else {
        document.getElementById("printerAvailable").innerHTML = "Printer is Disconnected";
    }
}

function onStarPrinterReady(){
	//PrinterPortName = "BT:mC-Print3-star"
	//printStarBarcode()
}

function onHoneywellReady(){
	 var honeywellAvailable = EloHoneywellBarcodeManager.isBcrOn();
	if(honeywellAvailable == true){
        document.getElementById("honeywellBarcodeAvailable").innerHTML = "Honeywell is Connected";
    } else {
        document.getElementById("honeywellBarcodeAvailable").innerHTML = "Honeywell is Disconnected";
    }
}

function onZebraReady(){
	 var zebraAvailable = EloZebraBarcodeManager.isZebraBarcodeConnected();
	 document.getElementById("textField").value = EloZebraBarcodeManager.isZebraBarcodeConnected();
	 if(zebraAvailable == true){
        document.getElementById("zebraBarcodeConnected").innerHTML = "Zebra Barcode Reader is Connected";
    } else {
        document.getElementById("zebraBarcodeConnected").innerHTML = "Zebra Barcode Reader is Disconnected";
    }
}

function onHandheldReady(){
	document.getElementById("registerHandheldListener").innerHTML = "callback ranzzz"
}

function onPeripheralManagerReady(){
	setLightOff()
	setGreenLight()
}





// SLK Gen 2 colors:         NONE(0), RED(0x0001), GREEN(0x0080), BLUE(0x0100)

function openCD() {
    document.getElementById("textField").value = EloPeripheralManager.openCD();
}

function isCDOpen() {
    document.getElementById("textField").value = EloPeripheralManager.isCDOpen();
}

function getCDVoltage() {
    document.getElementById("textField").value = EloPeripheralManager.getCDVoltage();
}

function setCDVoltage() {
    var value = document.getElementById("textField").value;
    if(!value || value.length === 0){
        return;
    }
    if (value.length !== 2){
        document.getElementById("textField").value = false;
	return;
    }
    var voltage = parseInt(value, 10);
    document.getElementById("textField").value = EloPeripheralManager.setCDVoltage(voltage);
}

function getLight() {
        var red = EloPeripheralManager.getLight(0, 1);
        var green = EloPeripheralManager.getLight(0, 128);
        var blue = EloPeripheralManager.getLight(0, 256);
        if(red == true && green == true && blue == true){
            document.getElementById("textField").value = "Red, Green, Blue";
            return;
        }
        if(red == true && green == true){
            document.getElementById("textField").value = "Red, Green";
            return;
        }
        if(red == true && blue == true){
            document.getElementById("textField").value = "Red, Blue";
            return;
        }
        if(green == true && blue == true){
            document.getElementById("textField").value = "Green, Blue";
            return;
        }
        if(green == true){
            document.getElementById("textField").value = "Green";
            return;
        }
        if(blue == true){
            document.getElementById("textField").value = "Blue";
            return;
        }
        if(red == true){
            document.getElementById("textField").value = "Red";
            return;
        }
    document.getElementById("textField").value = "false";
}

function setLightOff(){
    for (let pin = 0; pin <= 8; pin++) {
        EloPeripheralManager.setLight(pin, false);
    }
}

function setRedLight() {
    EloPeripheralManager.setLight(0, true);	// 0 pin is red
}

function setGreenLight() {
    EloPeripheralManager.setLight(7, true);	// 7 pin is green
}

function setBlueLight() {
    EloPeripheralManager.setLight(8, true);	// 8 pin is blue
}

function isFlashing() {
    for (let pin = 0; pin <= 8; pin++) {
            var ret = EloPeripheralManager.isFlashing(pin);
            if(ret == true){
                document.getElementById("textField").value = ret;
                return;
            }
    }
    document.getElementById("textField").value = "false";
}

function setRedFlashing() {
    EloPeripheralManager.setFlashing(0, 250, true);	// 0 pin is red
}

function setGreenFlashing() {
    EloPeripheralManager.setFlashing(7, 250, true);	// 7 pin is green
}

function setBlueFlashing() {
    EloPeripheralManager.setFlashing(8, 250, true);	// 8 pin is blue
}

function stopFlashing() {
    for (let pin = 0; pin <= 8; pin++) {
            EloPeripheralManager.setFlashing(pin, 250, false);
    }
}

function enableSlk() {
    EloPeripheralManager.enableSlk(true);
}

function disableSlk() {
    EloPeripheralManager.enableSlk(false);
}

function setSlkColorRed() {
    EloPeripheralManager.setSLKColor(1 << 1 | 1 << 2 | 1 << 3 | 1 << 4 | 1 << 5 | 1 << 6, 1);
}

function setSlkColorGreen() {
    EloPeripheralManager.setSLKColor(1 << 1 | 1 << 2 | 1 << 3 | 1 << 4 | 1 << 5 | 1 << 6, 2);
}

function setBrightess() {
    var value = document.getElementById("textField").value;
    if(!value || value.length === 0){
        return;
    } 
    var brightness = parseInt(value, 10);
    console.log(brightness);
    EloPeripheralManager.setBrightness(brightness);
}

function USBCallback(connected, vendorId, productId, serialNumber) {
    console.log('USB Change: ', connected);
    if(connected == "true"){
        if(vendorId == 3118 && productId == 3658){
            document.getElementById("textField").value = "Honeywell BCR Connected" + " Serial Number= " + serialNumber;
        } else if (vendorId == 1504 && productId == 6400) {
            document.getElementById("textField").value = "Zebra BCR Connected" + " Serial Number= " + serialNumber;
        } else {
            document.getElementById("textField").value = "USB Device Connected: Vendor ID= " + vendorId + "; Product ID= " + productId + "; Serial Number= " + serialNumber;
        }
    } else {
        if(vendorId == 3118 && productId == 3658){
            document.getElementById("textField").value = "Honeywell BCR Disconnected" + " Serial Number= " + serialNumber;
        } else if (vendorId == 1504 && productId == 6400) {
            document.getElementById("textField").value = "Zebra BCR Disconnected" + " Serial Number= " + serialNumber;
        } else {
            document.getElementById("textField").value = "USB Device Disconnected: Vendor ID= " + vendorId + "; Product ID= " + productId + "; Serial Number= " + serialNumber;
        }
    }
    checkAvailableDevices();
}

function registerUSBListener() {
    EloPeripheralManager.registerUSBListener("USBCallback");
}

function unregisterUSBListener() {
    EloPeripheralManager.unregisterUSBListener();
}

function activateBCR() {
    EloPeripheralManager.activeBcr();
}

function deactivateBCR() {
    EloPeripheralManager.disactiveBcr();
}

function isBCREnable() {
    document.getElementById("textField").value = EloPeripheralManager.isBcrOn();
}

function getBCRType(){
    document.getElementById("textField").value = EloPeripheralManager.getBcrType();
}

function activateIdleMode() {
    document.getElementById("textField").value = EloPeripheralManager.activeIdleMode();
}

function getScreenDensity() {
    document.getElementById("textField").value = EloPeripheralManager.getLcdDensity();
}

function setScreenDensity() {
    var value = document.getElementById("textField").value;
    if(!value || value.length === 0){
        return;
    } 
    var density = parseInt(value, 10);
    EloPeripheralManager.setLcdDensity(density)
}

/*
function checkAvailableDevices() {
    var honeywellAvailable = EloHoneywellBarcodeManager.isBcrOn();
    var zebraAvailable = EloZebraBarcodeManager.isZebraBarcodeConnected();
    var printerAvailable = EloEpsonPrinterManager.isPrinterConnected();
    console.log("Epson Printer is Available [" + printerAvailable + "]");
    console.log("Honeywell BCR is Available [" + honeywellAvailable + "]");
    console.log("Zebra BCR is Available [" + zebraAvailable + "]");
    if(honeywellAvailable == true){
        document.getElementById("honeywellBarcodeAvailable").innerHTML = "Honeywell is Connected";
    } else {
        document.getElementById("honeywellBarcodeAvailable").innerHTML = "Honeywell is Disconnected";
    }
    if(zebraAvailable == true){
        document.getElementById("zebraBarcodeConnected").innerHTML = "Zebra Barcode Reader is Connected";
    } else {
        document.getElementById("zebraBarcodeConnected").innerHTML = "Zebra Barcode Reader is Disconnected";
    }
    if(printerAvailable == true){
        document.getElementById("printerAvailable").innerHTML = "Printer is Connected";
    } else {
        document.getElementById("printerAvailable").innerHTML = "Printer is Disconnected";
    }
}
*/
