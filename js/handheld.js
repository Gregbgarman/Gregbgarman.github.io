// Set up button click listener
document.getElementById("registerHandheldListener").addEventListener("click", registerHandheldListener);
document.getElementById("unregisterHandheldListener").addEventListener("click", unregisterHandheldListener);
document.getElementById("stopHandheldHandsFreeScan").addEventListener("click", stopHandheldHandsFreeScan);
document.getElementById("setHandheldHandsFreeTimer").addEventListener("click", setHandheldHandsFreeTimer);
document.getElementById("scanHandheldManual").addEventListener("click", scanHandheldManual);
document.getElementById("scanHandheldHandsFree").addEventListener("click", scanHandheldHandsFree);

function registerHandheldListener() {
    EloHandHeldBarcodeManager.registerHandheldBarcodeListener("HHBCRCallback");
}

function unregisterHandheldListener() {
    EloHandHeldBarcodeManager.unregisterHandheldBarcodeListener();
}

function stopHandheldHandsFreeScan() {
    document.getElementById("textField").value = EloHandHeldBarcodeManager.stopHandheldHandsFreeScan();
}

function setHandheldHandsFreeTimer() {
    var millis = parseInt(document.getElementById("textField").value, 10);
    EloHandHeldBarcodeManager.setHandheldHandsFreeTimer(millis);
}

function scanHandheldManual() {
    document.getElementById("textField").value = EloHandHeldBarcodeManager.scanHandheldManual();
}

function scanHandheldHandsFree() {
    document.getElementById("textField").value = EloHandHeldBarcodeManager.scanHandheldHandsFree();
}

function HHBCRCallback(state, data) {
    if(state == 0){
        document.getElementById("textField").value = data;
    } else if(state == 1){
        document.getElementById("textField").value = "BCR Cancelled: " + data;
    } else if(state == 2){
        document.getElementById("textField").value = "BCR Timeout Failure: " + data;
    } else {
        document.getElementById("textField").value = "Unkown BCR Failure: " + data;
    }
}
