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


     EloPR1000EscCmdManager.addAllCutCmd()
     EloPR1000EscCmdManager.addEndCmd()
     EloPR1000PrinterManager.writeMsgAsync(EloPR1000EscCmdManager)

 
    
   
    
/*
 PR1000EscCmd pr1000EscCmd = new PR1000EscCmd();
        PR1000EscCmd.PR1000TextSetting textSetting = pr1000EscCmd.textSetting;
        String charsetName = "UTF-8";

        pr1000EscCmd.append(pr1000EscCmd.getHeaderCmd());
        pr1000EscCmd.setCharSetName(charsetName);
        textSetting.setAlign(PR1000PrinterEnum.CommonEnum.ALIGN_MIDDLE);
        textSetting.setEscFontType(PR1000PrinterEnum.ESCFontTypeEnum.FONT_A_12x24);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Test Receipt"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"123 Address"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Knoxville, TN"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append( pr1000EscCmd.getLFCRCmd());

        textSetting.setAlign(PR1000PrinterEnum.CommonEnum.ALIGN_LEFT);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Table 21"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Server John Doe"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"2:45PM    6/25/2024"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"--------------------------------------"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());

        textSetting.setAlign(PR1000PrinterEnum.CommonEnum.ALIGN_MIDDLE);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Guest 1"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());

        textSetting.setAlign(PR1000PrinterEnum.CommonEnum.ALIGN_LEFT);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"1 pizza                        6.50"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"1 soda                         2.75"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());

        textSetting.setAlign(PR1000PrinterEnum.CommonEnum.ALIGN_MIDDLE);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Guest 2"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());

        textSetting.setAlign(PR1000PrinterEnum.CommonEnum.ALIGN_LEFT);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"1 milkshake                    6.00"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"1 french fries                 4.00"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"--------------------------------------"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());

        textSetting.setAlign(PR1000PrinterEnum.CommonEnum.ALIGN_RIGHT);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Subtotal      19.25"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Tax            1.34"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());

        Log.d("gregor","length mid is " + pr1000EscCmd.getAppendCmds().length);

        textSetting.setBold(PR1000PrinterEnum.SettingEnum.Enable);
        textSetting.setDoubleWidth(PR1000PrinterEnum.SettingEnum.Enable);
        textSetting.setDoubleHeight(PR1000PrinterEnum.SettingEnum.Enable);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Total 20.59"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        textSetting.setBold(PR1000PrinterEnum.SettingEnum.Disable);
        textSetting.setDoubleWidth(PR1000PrinterEnum.SettingEnum.Disable);
        textSetting.setDoubleHeight(PR1000PrinterEnum.SettingEnum.Disable);
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());

        textSetting.setAlign(PR1000PrinterEnum.CommonEnum.ALIGN_LEFT);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Let us know how we did!"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Take our survey within"));
        textSetting.setUnderline(PR1000PrinterEnum.SettingEnum.Enable);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting," 10 days "));
        textSetting.setUnderline(PR1000PrinterEnum.SettingEnum.Disable);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"and get entered to "));
        textSetting.setIsAntiWhite(PR1000PrinterEnum.SettingEnum.Enable);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"win a prize! "));
        textSetting.setIsAntiWhite(PR1000PrinterEnum.SettingEnum.Disable);
        pr1000EscCmd.append(pr1000EscCmd.getTextCmd(textSetting,"Scan the Qr code below to start!"));
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());
        pr1000EscCmd.append(pr1000EscCmd.getLFCRCmd());

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


