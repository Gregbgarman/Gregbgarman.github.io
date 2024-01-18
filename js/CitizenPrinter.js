document.getElementById("searchBTCitizen").addEventListener("click", searchBTCitizen)
document.getElementById("connectBTCitizen").addEventListener("click", connectBTCitizen)
document.getElementById("connectUSBCitizen").addEventListener("click", connectUSBCitizen)
document.getElementById("checkCitizenConnected").addEventListener("click", checkCitizenConnected)
document.getElementById("printReceipt1Citizen").addEventListener("click", printReceipt1Citizen)
document.getElementById("printReceipt2Citizen").addEventListener("click", printReceipt2Citizen)
document.getElementById("printImageCitizen").addEventListener("click", printImageCitizen)
document.getElementById("disconnectCitizen").addEventListener("click", disconnectCitizen)

const ESC = "\u001b"

const CMP_SUCCESS = 0
const CMP_E_DISCONNECT = 1002

const CMP_PORT_USB = 3
const CMP_TP_TRANSACTION = 11
const CMP_TP_NORMAL = 12

const CMP_ALIGNMENT_CENTER = 1
const CMP_ALIGNMENT_LEFT = 0
const CMP_FNT_DEFAULT = 0
const CMP_TXT_1WIDTH = 0
const CMP_CUT_PARTIAL_PREFEED = -4

const CMP_QRCODE_EC_LEVEL_L = 48


function searchBTCitizen(){

}

function connectBTCitizen(){

}

function connectUSBCitizen(){
    let result = EloCitizenPrinterManager.connect(CMP_PORT_USB)
    if (result == CMP_SUCCESS){
        document.getElementById("CitizenPrinterAvailable").value = "printer ready"
    }
    else{
        document.getElementById("textField").value = "error connecting"
    }
}

function checkCitizenConnected(){
     let result = EloCitizenPrinterManager.printerCheck()
     if (result == CMP_SUCCESS){
           document.getElementById("textField").value = "printer connected"
     }
     else{
           document.getElementById("textField").value = "printer not connected"
     }
}

function printReceipt1Citizen(){
    EloCitizenPrinterManager.transactionPrint(CMP_TP_TRANSACTION );     
    EloCitizenPrinterManager.printNormal(ESC + "|cA" + ESC + "|bC" + ESC + "|2C" + "The Pizza House" + ESC + "|lF" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal(ESC + "|cA" + ESC + "|bC" + "123 Rainbow Road" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal(ESC + "|cA" + ESC + "|bC" + "Knoxville, TN" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal("Table 15" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal("Server: Greg" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal("----------------------------" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal("pepperoni slice       $10.00" + ESC + "|lF" );
    EloCitizenPrinterManager.printNormal("stromboli             $12.00" + ESC + "|lF" );
    EloCitizenPrinterManager.printNormal("salad                  $8.00" + ESC + "|lF" );
    EloCitizenPrinterManager.printNormal("----------------------------" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal("Excluded tax            $30.00" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal(ESC + "|uC" + "Tax(8%)                  $2.40" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal(ESC + "|bC" + ESC + "|2C" + "Total    $32.40" + ESC + "|lF" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal(ESC + "|bC" + "Payment                  $50.00" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal(ESC + "|bC" + "Change                   $17.60" + ESC + "|lF");
    EloCitizenPrinterManager.printNormal("Come back and see us!!" + ESC + "|lF" + ESC + "|lF");
    EloCitizenPrinterManager.printQRCode( "https://www.elotouch.com", 4, CMP_QRCODE_EC_LEVEL_L, CMP_ALIGNMENT_LEFT );
    EloCitizenPrinterManager.cutPaper(CMP_CUT_PARTIAL_PREFEED );
  
    let result = EloCitizenPrinterManager.transactionPrint(CMP_TP_NORMAL);
    if (result != CMP_SUCCESS){
        document.getElementById("textField").value = "transaction error"
    }
}

function printReceipt2Citizen(){

}

function printImageCitizen(){

}

function disconnectCitizen(){
    let result = EloCitizenPrinterManager.disconnect()
    if (result == CMP_SUCCESS){
        document.getElementById("CitizenPrinterAvailable").value = "printer offline"        
    }
    else{
        document.getElementById("textField").value = "error disconnecting"
    }
     
}

