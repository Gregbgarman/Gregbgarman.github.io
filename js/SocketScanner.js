/*
This is a sample website containing code examples of how a Socket Mobile handheld scanner could be used with EloSocketMobileManager.

**A prerequisite of using a Socket Mobile handheld scanner is that the Socket Mobile Companion app must be installed on the Elo device.
It can be found here on the Google Play Store https://play.google.com/store/apps/details?id=com.socketmobile.companion&hl=en_US&gl=US

However, the Companion app will never have to be opened manually. The Companion app will manage a service required for the scanner to hold 
a connection to an Android device over bluetooth. That service will be started by pressing the "Init Capture Service" on this sample website.

Once the mentioned service is running, the next step is to connect the handheld scanner to the Elo device over bluetooth. The process involves first 
scanning a particular QR code to make the Socket Mobile device discoverable, then it can be connected to. Pressing buttons 2-4, in order,
on this website achieves this goal of connecting to the device over bluetooth.

After the scanner is connected to the Elo device, scanning may be enabled, and barcodes can then be read.

There are two components to differentiate and they are:
1. The capture client
2. The actual handheld scanner

The capture client is responsible for monitoring the handheld scanner's device state and data received after a scan. It must first be initialized 
properly for the handheld device to be used, and when the capture client is disconnected from, scanning will no longer be possible. This website is setup 
such that there are several callbacks that will run when -
A. The handheld scanner's device state has changed. 
   - 4 possible states - GONE, AVAILABLE, OPEN, and READY. We connect to handheld scanner in the AVAILABLE state, and READY state should then follow.
B. When an item has been scanned (Barcode, Qr code etc.)
C. When the capture client's connection state has changed.
   - 4 possible states - CONNECTING, CONNECTED, DISCONNECTING, DISCONNECTED


*/


document.getElementById("showScanCode").addEventListener("click", showScanCode)
document.getElementById("searchBluetooth").addEventListener("click", searchBluetooth)
document.getElementById("connectBluetooth").addEventListener("click", connectBluetooth)
document.getElementById("initService").addEventListener("click", initService)
document.getElementById("enableScanning").addEventListener("click", enableScanning)
document.getElementById("runScanner").addEventListener("click", runScanner)
document.getElementById("disableScanning").addEventListener("click", disableScanning)
document.getElementById("getBatteryLevel").addEventListener("click", getBatteryLevel)
document.getElementById("rejectScans").addEventListener("click", rejectScans)


let PairCodeShown = false
let BluetoothDevices = []
let RejectAllScans = false

document.getElementById("scannerAvailable").innerHTML = "Scanner Unavailable"

                         
function initService(){   //step 1. Start the capture service - Will run the Companion app in the background. You don't need to open it.
     document.getElementById("textField").value = EloSocketMobileManager.initService()
}

function showScanCode(){           //step 2. Reveal a special Qr code on this website that when scanned, enables the scanner to be found over BT
     if (!PairCodeShown){                   
         document.getElementById("appmodeqrcode").style.visibility = 'visible'
         document.getElementById("showScanCode").innerHTML="Hide Pair Code"
         PairCodeShown = true
     }
     else{                        
         document.getElementById("appmodeqrcode").style.visibility = 'hidden'
         document.getElementById("showScanCode").innerHTML="2.Show Pair Code Below"
         PairCodeShown = false
     }
}

function searchBluetooth(){        //step 3. Search for the scanner over bluetooth. This involves setting a listener to receive the device 
                                   //as soon as it is found. Once it is retrieved, it can be connected to.
    registerBTSearchListener()                                        
    document.getElementById("textField").value = "searching..."
    BluetoothDevices = []
    //let BTAddress = "60:8A:10:64:A9:68"                //Find this address on the handheld scanner to improve bluetooth pairing. If can't find, pass blank string "" as parameter
    let BTAddress = ""
    let success = EloSocketMobileManager.searchBluetooth(BTAddress)         //will find devices with "Socket" in their name when pass a blank string
    if(success){
        document.getElementById("textField").value = "searching..."
    }
    else{
        document.getElementById("textField").value = "search failed"
    }
}

                                       //setting BT search listener to receive discovered device(s) as soon as they are found
function registerBTSearchListener(){
    EloSocketMobileManager.registerBTSearchListener("BTSearchCallback")    //this name needs to match the name of the function that receives data. See below.
}

function BTSearchCallback(Data){      //receives data in real time when bluetooth device is found. Will return " " if no device found at end of BT search
     let BTDeviceFound = Data
     if (BTDeviceFound === " "){
          document.getElementById("textField").value = "No device found"        
     }
     else{    
         BluetoothDevices.push(BTDeviceFound)
         document.getElementById("textField").value = BluetoothDevices.toString()
     }
}

function connectBluetooth(){
    let BTDevice = document.getElementById("textField").value              //Reading the BT device name found after searching bluetooth
    let success =  EloSocketMobileManager.connectBluetooth(BTDevice)       //Passing BT name to connect to the device
    if (success){
        document.getElementById("textField").value = "Connecting...Wait for beep" 
    }
    else{
        document.getElementById("textField").value =  "Failed. Try again"
    }
}

/////////////////////////////////////////// 
//    Begin functions dealing with handheld scanner functionality
///////////////////////////////////////////

function enableScanning(){   
    let success1 = EloSocketMobileManager.setClientListener("DeviceStateCallback")        //set listener to receive device state changes (see below) 
    let success2 = EloSocketMobileManager.connectCaptureClient()                              
    if (success1 && success2){
       document.getElementById("textField").value =  "Waiting for device"
       registerConnStateListener()                                         //set listener to receive capture client connection state changes
    }
    else{
       document.getElementById("textField").value =  "Failed"   
    }
}

function registerConnStateListener(){
    EloSocketMobileManager.registerConnStateListener("ClientConnStateCallback")
}

function ClientConnStateCallback(Data){
   if (Data === "CONNECTING"){
        document.getElementById("textField").value ="client connecting"
   }
   else if (Data === "CONNECTED"){
       // client is now usable
      document.getElementById("textField").value ="client connected"
   }
   else if (Data === "DISCONNECTING"){
        // only called when shutting down gracefully
      document.getElementById("textField").value ="client disconnecting"
   }
   else if (Data === "DISCONNECTED"){
        // successfully disconnected
      document.getElementById("textField").value ="client disconnected"
   }
   else if (Data === "DISCONNECTION_ERROR"){
       //error disconnecting
   }  
}


function DeviceStateCallback(Data){          //receives events related to device state in real time. 4 possible states.
    let DeviceState = Data
    if (DeviceState === "DEVICESTATE_GONE"){      
        // Scanner is gone
        document.getElementById("scannerAvailable").innerHTML = "Scanner Unavailable"
        document.getElementById("textField").value =  ""
    }
    else if (DeviceState === "DEVICESTATE_AVAILABLE"){
        // Scanner is connected to the service. You can choose to open the device or not. 
        EloSocketMobileManager.openScanner()       //should put device into a ready state
    }
    else if (DeviceState === "DEVICESTATE_OPEN"){
         // Scanner is open, but you do not have control of it. It may be in the process of
         // opening or another application may have opened the scanner.
    }
    else if (DeviceState === "DEVICESTATE_READY"){
         // Scanner is ready. Configure scanner
         registerScanningListener()
         document.getElementById("scannerAvailable").innerHTML = "Scanner Ready"
         document.getElementById("textField").value =  ""
    }   
}

////*****////
function registerScanningListener(){                                  //setting listener to receive scanned data in real time.
    EloSocketMobileManager.registerScanningListener("ScanDataCallback")     
}

function ScanDataCallback(Data){                           //when a barcode is scanned, its output will be received here.
     if(!RejectAllScans){
         EloSocketMobileManager.acceptData();
         document.getElementById("textField").value = Data
     }
     else{
        EloSocketMobileManager.rejectData();
        document.getElementById("textField").value = "data rejected"
     }
}
////****////


function runScanner(){
   document.getElementById("textField").value = EloSocketMobileManager.triggerScanner()
}

function rejectScans(){   
   if (!RejectAllScans){
         RejectAllScans = true;
         document.getElementById("rejectScans").innerHTML="Accept Scans"
   }
   else{
       RejectAllScans = false;
       document.getElementById("rejectScans").innerHTML="Reject Scans"
   }
}

function getBatteryLevel(){
    let BatteryLevel = EloSocketMobileManager.getDeviceBatteryLevel()
    if (BatteryLevel === -1){
          document.getElementById("textField").value = "Error finding battery %"
    }
    else{
         document.getElementById("textField").value = BatteryLevel.toString() + "%"      
    }       
}

function disableScanning(){

//    let success = EloSocketMobileManager.disconnectCaptureClient()
 //   if (!success){
 //        document.getElementById("textField").value = "Failed to close client"    
 //   }
    EloSocketMobileManager.closeScanner()         //this should set the scanner to unavailable   
}





