// Set up button click listener
/*
document.getElementById("init_honeywell_barcode").addEventListener("click", initHoneywellBarcode);
document.getElementById("register_listener_honeywell").addEventListener("click", registerHoneywellListener);
document.getElementById("unregister_listener_honeywell").addEventListener("click", unregisterHoneywellListener);
document.getElementById("register_usb_listener").addEventListener("click", registerUSBListener);
document.getElementById("unregister_usb_listener").addEventListener("click", unregisterUSBListener);
document.getElementById("activate_bcr").addEventListener("click", activateBCR);
document.getElementById("deactivate_bcr").addEventListener("click", deactivateBCR);
document.getElementById("is_bcr_on").addEventListener("click", isBCREnable);
document.getElementById("get_bcr_type").addEventListener("click", getBCRType);
*/

function BCRCallback(state, data) {
    if(state != 0){
        document.getElementById("textField").value = "BCR Read Failure";
    } else {
        document.getElementById("textField").value = data;
    }
}

function initHoneywellBarcode() {
    EloHoneywellBarcodeManager.initHoneywellScanner();
}

function registerHoneywellListener() {
    EloHoneywellBarcodeManager.registerHoneywellListener("BCRCallback");
}

function unregisterHoneywellListener() {
    EloHoneywellBarcodeManager.unregisterHoneywellListener();
}

function activateBCR() {
    EloHoneywellBarcodeManager.activeBcr();
}

function deactivateBCR() {
    EloHoneywellBarcodeManager.disactiveBcr();
}

function isBCREnable() {
    document.getElementById("textField").value = EloHoneywellBarcodeManager.isBcrOn();
}

function getBCRType(){
    document.getElementById("textField").value = EloHoneywellBarcodeManager.getBcrType();
}
