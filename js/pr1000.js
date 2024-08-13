document.getElementById("PR1000_connect").addEventListener("click", connectPR1000)
document.getElementById("PR1000_getUSBPrinters").addEventListener("click", getPR1000UsbPrinters)

document.getElementById("PR1000_barcode_test").addEventListener("click", barcodeTestPR1000)
document.getElementById("PR1000_beep_test").addEventListener("click", beepTestPR1000)






function connectPR1000(){
    let printer = document.getElementById("textField").value
    EloPR1000PrinterManager.connect(printer)
}

function getPR1000UsbPrinters(){
    
    let printerArray = JSON.parse(EloPR1000PrinterManager.getAvailableUsbPrinters())
    let deviceName = "no devices found";
    
    for (let i = 0; i < printerArray.length; i++){
        let printerObj = printerArray[i]
        
        let vendorId = printerObj.vendorId
        let productId = printerObj.productId
        deviceName = printerObj.deviceName
        console.log("devicename is " + deviceName);
        console.log("vendorId is " + vendorId);
        console.log("productId is " + productId);        
    }
    document.getElementById("textField").value = deviceName
    
}

function beepTestPR1000(){
    let beep = EloPR1000EscCmdManager.getBeepCmd()
    console.log("beep is " + beep)
    //EloPR1000EscCmdManager.append(beep)
    //let commands = EloPR1000EscCmdManager.getAppendCmds()
    //EloPR1000PrinterManager.writeMsgAsync(EloPR1000EscCmdManager.getAppendCmds())

    let command = EloPR1000EscCmdManager.getCRCmd()
     console.log("command is " + command)
}

function barcodeTestPR1000(){
    EloPR1000BarcodeManager.test()
}


