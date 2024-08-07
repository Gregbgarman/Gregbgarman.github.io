document.getElementById("PR1000_connect").addEventListener("click", connectPR1000)
document.getElementById("PR1000_getUSBPrinters").addEventListener("click", getPR1000UsbPrinters)

document.getElementById("PR1000_barcode_test").addEventListener("click", barcodeTestPR1000)





function connectPR1000(){
    EloPR1000PrinterManager.connect("sdfds")
}

function getPR1000UsbPrinters(){
    EloPR1000PrinterManager.getAvailableUsbPrinters()
}

function barcodeTestPR1000(){
    EloPR1000BarcodeManager.test()
}
