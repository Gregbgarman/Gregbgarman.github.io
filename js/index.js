// Set up button click listener
document.getElementById("enable_slk").addEventListener("click", enableSlk);
document.getElementById("disable_slk").addEventListener("click", disableSlk);
document.getElementById("slk_color_red").addEventListener("click", setSlkColorRed);
document.getElementById("slk_color_green").addEventListener("click", setSlkColorGreen);
document.getElementById("set_brightness").addEventListener("click", setBrightess);
document.getElementById("activate_idle_mode").addEventListener("click", activateIdleMode);
document.getElementById("get_lcd_density").addEventListener("click", getScreenDensity);

window.onload = function() {
  checkAvailableDevices();
};

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
