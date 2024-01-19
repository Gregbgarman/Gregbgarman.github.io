document.getElementById("searchBTCitizen").addEventListener("click", searchBTCitizen)
document.getElementById("connectBTCitizen").addEventListener("click", connectBTCitizen)
document.getElementById("connectUSBCitizen").addEventListener("click", connectUSBCitizen)
document.getElementById("checkCitizenConnected").addEventListener("click", checkCitizenConnected)
document.getElementById("printReceipt1Citizen").addEventListener("click", printReceipt1Citizen)
document.getElementById("printReceipt2Citizen").addEventListener("click", printReceipt2Citizen)
document.getElementById("printImageCitizen").addEventListener("click", printImageCitizen)
document.getElementById("disconnectCitizen").addEventListener("click", disconnectCitizen)
document.getElementById("showBTPairedPrinters").addEventListener("click", showBTPairedPrinters)




const ESC = "\u001b"

const CMP_SUCCESS = 0
const CMP_E_DISCONNECT = 1002

const CMP_PORT_Bluetooth = 1
const CMP_PORT_Bluetooth_Insecure = 2
const CMP_PORT_USB = 3


const CMP_TP_TRANSACTION = 11
const CMP_TP_NORMAL = 12

const CMP_ALIGNMENT_CENTER = 1
const CMP_ALIGNMENT_LEFT = 0
const CMP_FNT_DEFAULT = 0
const CMP_FNT_UNDERLINE = 128
const CMP_TXT_1WIDTH = 0
const CMP_HRI_TEXT_BELOW = 2
const CMP_CUT_PARTIAL_PREFEED = -4

const CMP_QRCODE_EC_LEVEL_L = 48
const CMP_BCS_Code39 = 109

let deviceTable = {}
let deviceArray = []

function searchBTCitizen(){
    deviceTable = {}
    deviceArray = []
    EloCitizenPrinterManager.setDeviceCallback("citizenDeviceReceiver")    //setting callback to receive discovered devices. Added to prevent thread freezing
    
    let searchTime = 5
    let error = [1]

    document.getElementById("textField").value = "searching for 5 seconds"
    EloCitizenPrinterManager.searchCitizenPrinter(CMP_PORT_Bluetooth, searchTime, error)
}

function citizenDeviceReceiver(device){
    
    let deviceObj = JSON.parse(device)
    let name = deviceObj["name"]
    let btaddress = deviceObj["btaddress"]

   // deviceTable[name] = btaddress
   // deviceArray.push(name)
    document.getElementById("textField").value = btaddress
}

function showBTPairedPrinters(){
    EloCitizenPrinterManager.setDeviceCallback("citizenDeviceReceiver")
    let searchTime = 0    //search time of 0 is used in Citizen API for detecting already paired devices
    let error = [1]
    EloCitizenPrinterManager.searchCitizenPrinter(CMP_PORT_Bluetooth, searchTime, error)
}

function connectBTCitizen(){
    //let name = document.getElementById("textField").value
    //let btaddress = deviceTable[name]
    let btaddress = document.getElementById("textField").value

    let result = EloCitizenPrinterManager.connect(CMP_PORT_Bluetooth_Insecure,btaddress)
    if (result == CMP_SUCCESS){
        document.getElementById("CitizenPrinterAvailable").value = "printer ready"
    }
    else{
        document.getElementById("textField").value = "error connecting"
    } 
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
    else{
        document.getElementById("textField").value = "print success"
    }
}

function printReceipt2Citizen(){
    EloCitizenPrinterManager.transactionPrint(CMP_TP_TRANSACTION );     //USB and BT both need this
    EloCitizenPrinterManager.printText("Receipt\r\n\r\n\r\n", CMP_ALIGNMENT_CENTER, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("TEL (123)-456-7890\r\n", CMP_ALIGNMENT_CENTER, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Thank you for coming to our shop\r\n\n", CMP_ALIGNMENT_CENTER, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Chicken               $10.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Hamburger             $20.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Pizza                 $30.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Lemons                $40.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Drink                 $50.00\r\n\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Excluded tax          $150.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Tax(5%)               $7.50\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_UNDERLINE, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Total                 $157.50\r\n\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Payment               $200.00\r\n\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printText("Change                $42.50\r\n\r\n", CMP_ALIGNMENT_LEFT, CMP_FNT_DEFAULT, CMP_TXT_1WIDTH);
    EloCitizenPrinterManager.printBarCode("1234567890", CMP_BCS_Code39, 40, 2, CMP_ALIGNMENT_CENTER, CMP_HRI_TEXT_BELOW);
    EloCitizenPrinterManager.cutPaper(CMP_CUT_PARTIAL_PREFEED );

    let result = EloCitizenPrinterManager.transactionPrint(CMP_TP_NORMAL);
    if (result != CMP_SUCCESS){
        document.getElementById("textField").value = "transaction error"
    }
    else{
        document.getElementById("textField").value = "print success"
    }
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
