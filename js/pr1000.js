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
    

const SettingEnum = {
    Disable: 0,
    Enable: 1,
    NoSetting: 2
}

const CommonEnum = {
    ALIGN_LEFT: 0,
    ALIGN_MIDDLE: 1,
    ALIGN_RIGHT: 2    
}

const ESCFontTypeEnum = {
    FONT_A_12x24: 0,
    FONT_B_9x24: 1,
    FONT_C_9x17: 2,
    FONT_D_8x16: 3
}

const QrcodeEccLevel = {
   H: 0,
   L: 1,
   M: 2,
   Q: 3,
}

const BarcodeType = {
    CODABAR: 0,
    CODE128: 1,
    CODE39: 2,
    CODE93: 3,
    EAN13: 4,
    EAN14: 5,
    EAN8: 6,
    GS1: 7,
    ITF: 8,
    QR_CODE: 9,
    UPC_A: 10,
    UPC_E: 11
}


        
function getPR1000UsbPrinters(){
    
    let printerArray = JSON.parse(EloPR1000PrinterManager.getAvailableUsbPrinters())
    let deviceName = "no devices found";
    
    for (let i = 0; i < printerArray.length; i++){
        let printerObj = printerArray[i]
        
        let vendorId = printerObj.vendorId
        let productId = printerObj.productId
        deviceName = printerObj.deviceName
        console.log("devicename: " + deviceName);
        console.log("vendorId: " + vendorId);
        console.log("productId: " + productId);        
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

//EloPR1000BarcodeManager.setQrcodeDotSize(5)
    
    EloPR1000TextSettingManager.setDoubleHeight(1)

}

function textTestPR1000(){
    let charset = "UTF-8"
    
    EloPR1000EscCmdManager.addHeaderCmd()
    EloPR1000EscCmdManager.setCharSetName(charset)
    EloPR1000TextSettingManager.setAlign(CommonEnum.ALIGN_MIDDLE)
    EloPR1000TextSettingManager.setEscFontType(ESCFontTypeEnum.FONT_A_12x24)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Test Receipt")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"123 Address")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Knoxville, TN")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000TextSettingManager.setAlign(CommonEnum.ALIGN_LEFT)
    
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Table 21")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Server: John Doe")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"2:45PM    6/25/2024")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"--------------------------------------")
    

    EloPR1000TextSettingManager.setAlign(CommonEnum.ALIGN_MIDDLE)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Guest 1")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000TextSettingManager.setAlign(CommonEnum.ALIGN_LEFT)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"1 pizza                        6.50")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"1 soda                         2.75")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000TextSettingManager.setAlign(CommonEnum.ALIGN_MIDDLE)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Guest 2")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000TextSettingManager.setAlign(CommonEnum.ALIGN_LEFT)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"1 milkshake                    6.00")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"1 french fries                 4.00")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"--------------------------------------")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000TextSettingManager.setAlign(CommonEnum.ALIGN_RIGHT)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Subtotal      19.25")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Tax            1.34")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000TextSettingManager.setBold(SettingEnum.Enable)
    EloPR1000TextSettingManager.setDoubleWidth(SettingEnum.Enable)
    EloPR1000TextSettingManager.setDoubleHeight(SettingEnum.Enable)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Total 20.59")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000TextSettingManager.setDoubleWidth(SettingEnum.Disable)
    EloPR1000TextSettingManager.setDoubleHeight(SettingEnum.Disable)
    EloPR1000TextSettingManager.setBold(SettingEnum.Disable)
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000TextSettingManager.setAlign(CommonEnum.ALIGN_LEFT)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Let us know how we did!")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Take our survey within")
    EloPR1000TextSettingManager.setUnderline(SettingEnum.Enable)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager," 10 days ")
    EloPR1000TextSettingManager.setUnderline(SettingEnum.Disable)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"and get entered to ")
    EloPR1000TextSettingManager.setIsAntiWhite(SettingEnum.Enable)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"win a prize! ")
    EloPR1000TextSettingManager.setIsAntiWhite(SettingEnum.Disable)
    EloPR1000EscCmdManager.addTextCmd(EloPR1000TextSettingManager,"Scan the Qr code below to start!")
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addLFCRCmd()

    //add qr code
    EloPR1000BarcodeManager.setQrcodeDotSize(5)
    EloPR1000BarcodeManager.setQrcodeEccLevel(QrcodeEccLevel.L)
    EloPR1000EscCmdManager.addBarcodeCmd(BarcodeType.QR_CODE, EloPR1000BarcodeManager, "https://www.elotouch.com/")
    
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addLFCRCmd()
    EloPR1000EscCmdManager.addAllCutCmd()
    EloPR1000EscCmdManager.addEndCmd()
    EloPR1000PrinterManager.writeMsgAsync(EloPR1000EscCmdManager)

  
    
/*
    

        //add qr code here

        PR1000EscCmd.PR1000BarcodeSetting barcodeSetting = pr1000EscCmd.barcodeSetting;
        barcodeSetting.setQrcodeDotSize(5);//accept value: Esc(1~15),
        barcodeSetting.setQrcodeEccLevel(PR1000PrinterEnum.QrcodeEccLevel.L);
sdfds        pr1000EscCmd.append(pr1000EscCmd.getBarcodeCmd(PR1000PrinterEnum.BarcodeType.QR_CODE, barcodeSetting, "https://www.elotouch.com/"));


        //EloPR1000EscCmd.addLFCRCmd();     void function does not return

        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getAllCutCmd());
        pr1000EscCmd.append(pr1000EscCmd.getEndCmd());

        Log.d("gregor","length end is " + pr1000EscCmd.getAppendCmds().length);

        Log.d("gregor","quick check length " + pr1000EscCmd.getLFCRCmd().length);

        pr1000Printer.writeMsgAsync(pr1000EscCmd.getAppendCmds());
*/
    

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


