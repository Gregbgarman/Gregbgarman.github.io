document.getElementById("PR1000_connect").addEventListener("click", connectPR1000)
document.getElementById("PR1000_getUSBPrinters").addEventListener("click", getPR1000UsbPrinters)


function connectPR1000(){
    EloPR1000PrinterManager.Printer.connect("sdfds")
}

function getPR1000UsbPrinters(){
    EloPR1000PrinterManager.Printer.getAvailableUsbPrinters()
}
