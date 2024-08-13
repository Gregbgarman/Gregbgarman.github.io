document.getElementById("PR1000_connect").addEventListener("click", connectPR1000)
document.getElementById("PR1000_getUSBPrinters").addEventListener("click", getPR1000UsbPrinters)

document.getElementById("PR1000_barcode_test").addEventListener("click", barcodeTestPR1000)


let selectedPrinter = ""


function connectPR1000(){
    EloPR1000PrinterManager.connect("sdfds")
}

function getPR1000UsbPrinters(){
    
    let printerArray = JSON.parse(EloPR1000PrinterManager.getAvailableUsbPrinters())
    console.log("array is " + printerArray);
    
    for (let i = 0; i < printerArray.length; i++){
       // let printerObj = JSON.parse(printerArray[i])
        let printerObj = printerArray[i]
        console.log("object is " + printerObj);

        let deviceName = printerObj["deviceName"]
       // let vendorId = printerObj.vendorId
       // let productId = printerObj.productId
        console.log("devicename is " + deviceName);
       // console.log("vendorId is " + vendorId);
       // console.log("productId is " + productId);
        
    }
    console.log("the end" );
    
}

function barcodeTestPR1000(){
    EloPR1000BarcodeManager.test()
}
