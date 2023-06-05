document.getElementById("beginScan").addEventListener("click", beginScan)
document.getElementById("connectScale").addEventListener("click", connectScale)
document.getElementById("disconnectScale").addEventListener("click", disconnectScale)
document.getElementById("setContOutput").addEventListener("click", setContinousOutput)
document.getElementById("setStableOutput").addEventListener("click", setStableOutput)
document.getElementById("getDeviceInfo").addEventListener("click", getDeviceInfo)
document.getElementById("seeMoreData").addEventListener("click", seeMoreData)

let DevicesFound = ''
let DeviceTable = []
let SeeMoreData = false
let scaleInfo = ""
let scaleConnected = false


/////////////////////////
//    ScaleInfo class contains information that can be acquired from scales found in search
////////////////////////
class ScaleInfo{
    constructor(Scale){
        this.identifier = Scale.identifier       
        this.device_name = Scale.device_name
        this.scale_type = Scale.scale_type
        this.mac_address = Scale.mac_address
        this.baud_rate = Scale.baud_rate
        this.interface_type = Scale.interface_type
    }
    
    getIdentifier(){
        return this.identifier
    }
    
    getDeviceName(){
        return this.device_name
    }
    
    getScaleType(){
        return this.scale_type
    }
    
    getMacAddress(){
        return this.mac_address
    }
    
    getBaudRate(){
        return this.baud_rate   
    }
    
    getInterfaceType(){
        return this.interface_type   
    }           
}


window.onload = function() {                    //if scale instance exists upon page reload
    if (EloStarScaleManager.isScaleCreated()){
        scaleConnected = true
        document.getElementById("StarScaleAvailable").innerHTML = "Scale Connected"
    }
    else{
        document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
    }
}


function beginScan(){
    if (scaleConnected){
       document.getElementById("textField").value = "Disconnect scale first"
       return
   }
    DevicesFound = ''
    DeviceTable = []
    document.getElementById("textField").value = "Searching..."
    if(!EloStarScaleManager.scanForScales("DeviceCallback", "All")){                //See DeviceCallback below for receiving discovered scales
        document.getElementById("textField").value = "Unable to scan for scales"      
    }     
}

function DeviceCallback(Scale){         //Discovered scales will appear here
    let obj = JSON.parse(Scale)
    DeviceTable.push(Scale)
    
    let Device_Name = obj.device_name
    DevicesFound += Device_Name + ' '
    document.getElementById("textField").value = DevicesFound
}


function connectScale(){
   if (scaleConnected){
       document.getElementById("textField").value = "Disconnect scale first"
       return
   }
   EloStarScaleManager.stopScan()
   let scale_name = document.getElementById("textField").value  
   if(scale_name.length > 1 && scale_name.charAt(scale_name.length-1) === ' ') {
        scale_name = scale_name.slice(0, -1)
   }
   
   for (let i=0;i<DeviceTable.length;i++){
       let obj = JSON.parse(DeviceTable[i])
       
       if (obj.device_name === scale_name){         //if names match, create object with all info       
           scaleInfo = new ScaleInfo(obj)                    
           break
       }
   }
    
   if (scaleInfo === ''){   //|| scaleInfo.getIdentifier() === ''){
        document.getElementById("textField").value = "Scale not found"
       // scaleInfo = ""
        return
   }
   
   if (!EloStarScaleManager.createScale(scaleInfo.getIdentifier(), scaleInfo.getInterfaceType(), 1200)){
       document.getElementById("textField").value = "Could not create scale"
       return
   }
  
   if (!EloStarScaleManager.connectScale("StatusCallback")){        //see StatusCallback to find if connection succeeded or failed. Boolean value indicates if connecting started or failed.
       document.getElementById("textField").value = "Could not start connection process"
       resetScale()
       return
   }
   
   EloStarScaleManager.setScaleDataCallback("DataCallback")
   document.getElementById("textField").value = "Scale Connecting..."  
}

function seeMoreData(){
    if (!scaleConnected){
       document.getElementById("textField").value = "No scale connected"
       return
    }
    
    if (SeeMoreData){
        SeeMoreData = false
        document.getElementById("seeMoreData").innerHTML = "Show More Data"
    }
    else{
        SeeMoreData = true
        document.getElementById("seeMoreData").innerHTML = "Show Less Data"
    }      
}

function DataCallback(Data){    //receives scale measurement data              
   try{          
      let obj = JSON.parse(Data)   
      let weight = obj.weight           //will just show undefined it not present, but JSON.parse error could throw exception
      let unit = obj.unit
      let status = obj.status
      let decimal_places = obj.decimal_places
      let data_type = obj.data_type
      let raw = obj.raw
      let comparator_result = obj.comparator_result
          
      if (status === "ERROR"){
          document.getElementById("textField").value = "Scale Data Error"
      }
      else {        //STABLE, UNSTABLE, INVALID
          if (!SeeMoreData){
              document.getElementById("textField").value = weight + unit            
          }
          else{          
              document.getElementById("textField").value = "weight:" + weight + ", unit:" + unit + ", status:" + status + ", data type:" + data_type  + ", comparator result:" + comparator_result
          }
      }        
  }catch (error){
      document.getElementById("textField").value = "Error parsing JSON data"
  }
}

function StatusCallback(status){        //receives events for connecting, disconnecting, and changing scale settings
    let obj = JSON.parse(status)
    let event = obj.event
    let result = obj.result
    
   if (event === "CONNECT"){ 
       let connectSuccess = false
       
       if (result === "CONNECT_SUCCESS"){
          connectSuccess = true
          document.getElementById("StarScaleAvailable").innerHTML = "Scale Connected"
          document.getElementById("textField").value = "Scale Ready to Weigh"    
       }

       else if (result === "CONNECT_NOT_AVAILABLE"){
         document.getElementById("textField").value = "Connect - Not Available"
       }

       else if (result === "CONNECT_ALREADY_CONNECTED"){
         connectSuccess = true
         document.getElementById("textField").value = "Connect - Already Connected"
       }

       else if (result === "CONNECT_TIMEOUT"){
              document.getElementById("textField").value = "Connect - Timeout"
       }

       else if (result === "CONNECT_READ_WRITE_ERROR"){
              document.getElementById("textField").value = "Connect - Read/Write Error"    
       }

       else if (result === "CONNECT_NOT_SUPPORTED"){
              document.getElementById("textField").value = "Connect - Not Supported"
       }

       else if (result === "CONNECT_NOT_GRANTED_PERMISSION"){
              document.getElementById("textField").value = "Connect - Not Granted Permission"
       }

       else if (result === "CONNECT_UNEXPECTED_ERROR"){
              document.getElementById("textField").value = "Connect - Unexpected Error"
       }
       
       if(!connectSuccess) {
           resetScale()
       }
       else{
           scaleConnected = true           
       }
    }

         // **Disconnection**

    else if (event === "DISCONNECT"){
       resetScale()
        
       if (result ==="DISCONNECT_SUCCESS"){
         document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
         document.getElementById("textField").value = "Disconnect Success"
       }

       else if (result === "DISCONNECT_NOT_CONNECTED"){
           document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
           document.getElementById("textField").value = "Not Connected"    
       }

       else if (result === "DISCONNECT_TIMEOUT"){
           document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
           document.getElementById("textField").value = "Disconnect Timeout"    
       }
       else if (result === "DISCONNECT_READ_WRITE_ERROR"){
           document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
           document.getElementById("textField").value = "Disconnect Read/Write Error"    
       }
       else if (result === "DISCONNECT_UNEXPECTED_ERROR"){
         document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
         document.getElementById("textField").value = "Disconnect - Unexpected Error"     
       }
       else if (result === "DISCONNECT_UNEXPECTED_DISCONNECTION"){
         document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
         document.getElementById("textField").value = "Unexpected Disconnection"
       }
    }            

       // ***update settings or output conditions***
    
  else if (event === "UPDATE_SETTING" || event === "UPDATE_OUTPUT_CONDITION"){
      if (result === "UPDATE_SETTING_SUCCESS"){
          document.getElementById("textField").value = "Setting Update - Changed Successfully"    
      }
      else if (result === "UPDATE_SETTING_NOT_CONNECTED"){
        document.getElementById("textField").value = "Setting Update - Not Connected"
      }  
      else if (result === "UPDATE_SETTING_REQUEST_REJECTED"){
        document.getElementById("textField").value = "Setting Update - Request Rejected"
      }
      else if (result === "UPDATE_SETTING_TIMEOUT"){
        document.getElementById("textField").value = "Setting Update - Timeout"
      }
      else if (result === "UPDATE_SETTING_ALREADY_EXECUTING"){
        document.getElementById("textField").value = "Setting Update - Already Executing"
      }
      else if (result === "UPDATE_SETTING_NOT_SUPPORTED"){
           document.getElementById("textField").value = "Setting Update - Not Supported"
      }
      else if (result === "UPDATE_SETTING_UNEXPECTED_ERROR"){
        document.getElementById("textField").value = "Setting Update - Unexpected Error"
      }
  }
}
    
 function getDeviceInfo(){
     if (!scaleConnected){
       document.getElementById("textField").value = "No Scale Connected"
       return
     }
     
     if (scaleInfo === "" || scaleInfo.getDeviceName() === ""){
        document.getElementById("textField").value = "Error finding name"
    }
    else{
        let info = "Name: " + scaleInfo.getDeviceName() + ", Type: " + scaleInfo.getScaleType() + ", Interface: " + scaleInfo.getInterfaceType()
        document.getElementById("textField").value = info
    }       
}

function zeroPointAdjustment(){
    if (!scaleConnected){
         document.getElementById("textField").value = "No scale connected"
        return
    }
    EloStarScaleManager.updateSetting("ZeroPointAdjustment")
}

function setContinousOutput(){
    if (!scaleConnected){
         document.getElementById("textField").value = "No scale connected"
         return
    }
    EloStarScaleManager.updateOutputConditionSetting("ContinuousOutputAtAllTimes")     //see StatusCallback to determine if setting was changed.
}

function setStableOutput(){
     if (!scaleConnected){
         document.getElementById("textField").value = "No scale connected"
         return
    }
    let setting = "ContinuousOutputAtStableTimes"
    if (scaleInfo !== "" && scaleInfo.getScaleType() === "MGS"){
       setting = "OneTimeOutputAtStableTimes"        
    }      
    EloStarScaleManager.updateOutputConditionSetting(setting)    //see StatusCallback to determine if setting was changed.
}

function disconnectScale(){
    if (!scaleConnected){
         document.getElementById("textField").value = "No scale connected"
         return
    }
    if (!EloStarScaleManager.disconnectScale()){                                    //see StatusCallback to determine disconnection event
        document.getElementById("textField").value = "Error starting disconnection"
        resetScale()                                        //resetting scale if disconnection somehow could not take place
        document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
    }
}   

function resetScale(){
    EloStarScaleManager.destroyScale()
    scaleInfo = ""
    scaleConnected = false
}
