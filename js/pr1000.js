document.getElementById("PR1000_connect").addEventListener("click", connectPR1000)
document.getElementById("PR1000_getUSBPrinters").addEventListener("click", getPR1000UsbPrinters)
document.getElementById("PR1000_barcode_test").addEventListener("click", barcodeTestPR1000)
document.getElementById("PR1000_beep_test").addEventListener("click", beepTestPR1000)
document.getElementById("PR1000_image_test").addEventListener("click", imageTestPR1000)
document.getElementById("PR1000_getWifiPrinters").addEventListener("click", getPR1000WifiPrinters)
document.getElementById("PR1000_text_test").addEventListener("click",textTestPR1000)
document.getElementById("PR1000_status_test").addEventListener("click",getStatusPR1000)
document.getElementById("PR1000_drawer_test").addEventListener("click",drawerTestPR1000)
document.getElementById("PR1000_disconnect").addEventListener("click",disconnectPR1000)
    
       
        
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


function getPR1000WifiPrinters(){

}


function connectPR1000(){
    let printer = document.getElementById("textField").value
    EloPR1000PrinterManager.connect(printer)
}

function getStatusPR1000(){

}

function textTestPR1000(){

}

function drawerTestPR1000(){
     EloPR1000EscCmdManager.addOpenMoneyBoxCmd()
     EloPR1000PrinterManager.writeMsgAsync(EloPR1000EscCmdManager)
}

function beepTestPR1000(){
    EloPR1000EscCmdManager.addBeepCmd()
    EloPR1000PrinterManager.writeMsgAsync(EloPR1000EscCmdManager)
    
}

function barcodeTestPR1000(){
        //EloPR1000EscCmdManager.gregTest()

    
    console.log(typeof EloPR1000EscCmdManager);

     console.log("rerun")
     //   EloPR1000EscCmdManager.gregTest2(EloPR1000EscCmdManager)
    //EloPR1000EscCmdManager.gregTest2(EloPR1000EscCmdManager.toString())

    EloPR1000EscCmdManager.gregTest(EloPR1000EscCmdManager)
     EloPR1000EscCmdManager.gregTest("sauce")

   // EloPR1000EscCmdManager.gregTest(EloPR1000PrinterManager)

}

function imageTestPR1000(){

}

function disconnectPR1000(){

}


