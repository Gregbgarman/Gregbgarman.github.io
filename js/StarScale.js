document.getElementById("beginScan").addEventListener("click", beginScan)
document.getElementById("connectScale").addEventListener("click", connectScale)
document.getElementById("disconnectScale").addEventListener("click", disconnectScale)

document.getElementById("setContOutput").addEventListener("click", setContinousOutput)
document.getElementById("setStableOutput").addEventListener("click", setStableOutput)
document.getElementById("zeroScale").addEventListener("click", zeroPointAdjustment)





let DevicesFound = ''
let DeviceTable = []


if (EloStarScaleManager.isScaleConnected()){
    document.getElementById("StarScaleAvailable").innerHTML = "Scale Connected"   
}
else{
    document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
}

function zeroPointAdjustment(){
    if (!EloStarScaleManager.updateSetting("ZeroPointAdjustment")){
        document.getElementById("textField").value = "Error"
    }
}

function setContinousOutput(){
    if (!EloStarScaleManager.updateOutputConditionSetting("ContinuousOutputAtAllTimes")){
        document.getElementById("textField").value = "Error"
    }
}

function setStableOutput(){
    if (!EloStarScaleManager.updateOutputConditionSetting("ContinuousOutputAtStableTimes")){
        document.getElementById("textField").value = "Error"
    }
}

function disconnectScale(){
    if (!EloStarScaleManager.disconnectScale()){
        document.getElementById("textField").value = "Unable to Disconnect Scale"
    }
}

function beginScan(){
    DevicesFound = ''
    DeviceTable = []
    document.getElementById("textField").value = "Searching..."
    if(!EloStarScaleManager.scanForScales("DeviceCallback", "All")){
        document.getElementById("textField").value = "Error searching for scales"      
    }
     
}

function DeviceCallback(Scale){
    let obj = JSON.parse(Scale)
    DeviceTable.push(Scale)
    
    let Device_Name = obj.device_name
    DevicesFound += Device_Name + ','
    document.getElementById("textField").value = DevicesFound
 
}


function connectScale(){
   let Device_Name = document.getElementById("textField").value
   let Identifier = ''
   let Baud_Rate = 1200
   EloStarScaleManager.stopScan()
   if(Device_Name.length > 1 && Device_Name.charAt(Device_Name.length-1) === ',') {
        Device_Name = Device_Name.slice(0, -1)
   }
   
   for (let i=0;i<DeviceTable.length;i++){
       let obj = JSON.parse(DeviceTable[i])
       
       if (obj.device_name === Device_Name){
           Identifier = obj.identifier
           break
       }
   }
   
   if (!EloStarScaleManager.setScaleDataCallback("DataCallback")){
       document.getElementById("textField").value = "Scale Callback creation failure"
       return
   }
   
   if (!EloStarScaleManager.createScale(Identifier, Baud_Rate)){
       document.getElementById("textField").value = "Create Scale Failed"
       return
   }
  
   if (!EloStarScaleManager.connectScale("StatusCallback")){
       document.getElementById("textField").value = "Connect Scale Failed"
       return
   }
   
   document.getElementById("textField").value = "Scale Connecting..."  
}

function DataCallback(Data){
      document.getElementById("textField").value = "here"
  if (Data === "ERROR"){
      document.getElementById("textField").value = "Scale Data Error"
  }
  else{
      let obj = JSON.parse(Data)
            document.getElementById("textField").value = "in else"

      document.getElementById("textField").value = obj
      
      
      let weight = obj.weight
      let unit = obj.unit
      let status = obj.status
      let decimal_places = obj.decimal_places
      let data_type = obj.data_type
    //  let raw = obj.raw
      let comparator_result = obj.comparator_result
      
          
      document.getElementById("textField").value = weight + unit

  }
}

function StatusCallback(status){
  
       // **connection**
  
   if (status === "CONNECT_SUCCESS"){
      document.getElementById("StarScaleAvailable").innerHTML = "Scale Connected"
      document.getElementById("textField").value = "Scale Ready"
     
   }
  
   else if (status === "CONNECT_NOT_AVAILABLE"){
     document.getElementById("textField").value = "Connect - Not Available"
     
   }
  
   else if (status === "CONNECT_ALREADY_CONNECTED"){
     document.getElementById("textField").value = "Connect - Already Connected"
     
   }
                   
   else if (status === "CONNECT_TIMEOUT"){
          document.getElementById("textField").value = "Connect - Timeout"
   }
  
   else if (status === "CONNECT_READ_WRITE_ERROR"){
          document.getElementById("textField").value = "Connect - Read/Write Error"    
   }

   else if (status === "CONNECT_NOT_SUPPORTED"){
          document.getElementById("textField").value = "Connect - Not Supported"
   }

   else if (status === "CONNECT_NOT_GRANTED_PERMISSION"){
          document.getElementById("textField").value = "Connect - Not Granted Permission"
   }
  
   else if (status === "CONNECT_UNEXPECTED_ERROR"){
          document.getElementById("textField").value = "Connect - Unexpected Error"
   }

         // **Disconnection**

           
   else if (status ==="DISCONNECT_SUCCESS"){
     document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
     document.getElementById("textField").value = "Disconnect Success"
   }
  
   else if (status === "DISCONNECT_NOT_CONNECTED"){
       document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
       document.getElementById("textField").value = "Not Connected"    
   }
  
   else if (status === "DISCONNECT_TIMEOUT"){
       document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
       document.getElementById("textField").value = "Disconnect Timeout"    
   }
   else if (status === "DISCONNECT_READ_WRITE_ERROR"){
       document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
       document.getElementById("textField").value = "Disconnect Read/Write Error"    
   }
   else if (status === "DISCONNECT_UNEXPECTED_ERROR"){
     document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
     document.getElementById("textField").value = "Disconnect - Unexpected Error"
     
   }
   else if (status === "DISCONNECT_UNEXPECTED_DISCONNECTION"){
     document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
     document.getElementById("textField").value = "Unexpected Disconnection"
   }
               

                // ***update settings***
  else if (status === "UPDATE_SETTING_SUCCESS"){
      document.getElementById("textField").value = "Setting Updated Successfully"    
  }
  
  else if (status === "UPDATE_SETTING_NOT_CONNECTED"){
    document.getElementById("textField").value = "Setting Update - Not Connected"
  }
  
  else if (status === "UPDATE_SETTING_REQUEST_REJECTED"){
    document.getElementById("textField").value = "Setting Update - Request Rejected"
  }
  else if (status === "UPDATE_SETTING_TIMEOUT"){
    document.getElementById("textField").value = "Setting Update - Timeout"
  }
  else if (status === "UPDATE_SETTING_ALREADY_EXECUTING"){
    document.getElementById("textField").value = "Setting Update - Already Executing"
  }
  else if (status === "UPDATE_SETTING_UNEXPECTED_ERROR"){
    document.getElementById("textField").value = "Setting Update - Unexpected Error"
  }
  

  
  // ***update output condition***
  
  
  else if (status === "UPDATE_SETTING_SUCCESS"){
        document.getElementById("textField").value = "Condition Update - Success"
  }
  
  else if (status === "UPDATE_SETTING_NOT_CONNECTED"){
       document.getElementById("textField").value = "Condition Update - Not Connected"
  }
  
  else if (status === "UPDATE_SETTING_REQUEST_REJECTED"){
       document.getElementById("textField").value = "Condition Update - Request Rejected"
 
  }
  else if (status === "UPDATE_SETTING_TIMEOUT"){
       document.getElementById("textField").value = "Condition Update - Timeout"
  }
  else if (status === "UPDATE_SETTING_NOT_SUPPORTED"){
       document.getElementById("textField").value = "Condition Update - Not Supported"
  }
  else if (status === "UPDATE_SETTING_ALREADY_EXECUTING"){
       document.getElementById("textField").value = "Condition Update - Already Executing"    
  }
  else if (status === "UPDATE_SETTING_UNEXPECTED_ERROR"){
       document.getElementById("textField").value = "Condition Update - Unexpected Error"
  }
                  
       
  
}
