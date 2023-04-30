document.getElementById("beginScan").addEventListener("click", beginScan)
document.getElementById("connectScale").addEventListener("click", connectScale)

let DevicesFound = ''
let DeviceTable = []


document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"

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
  if (Data === "ERROR"){
      document.getElementById("textField").value = "Scale Data Error"
  }
  else{
      let obj = JSON.parse(Data)
      let weight = obj.weight
      let unit = obj.unit
      let status = obj.status
      let decimal_places = obj.decimal_places
      let data_type = obj.data_type
      let raw = obj.raw
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
     
     
   }
  
   else if (status === "CONNECT_ALREADY_CONNECTED"){
     
     
   }
                   
   else if (status === "CONNECT_TIMEOUT"){
     
   }
  
   else if (status === "CONNECT_READ_WRITE_ERROR"){
     
     
   }

   else if (status === "CONNECT_NOT_SUPPORTED"){
     
   }

   else if (status === "CONNECT_NOT_GRANTED_PERMISSION"){
     
   }
  
   else if (status === "CONNECT_UNEXPECTED_ERROR"){
     
   }

         // **Disconnection**

           
   else if (status ==="DISCONNECT_SUCCESS"){
     document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
     document.getElementById("textField").value = "Disconnect Success"
   }
  
   else if (status === "DISCONNECT_NOT_CONNECTED"){
     
   }
  
   else if (status === "DISCONNECT_TIMEOUT"){
     
   }
   else if (status === "DISCONNECT_READ_WRITE_ERROR"){
     
   }
   else if (status === "DISCONNECT_UNEXPECTED_ERROR"){
     document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
     document.getElementById("textField").value = "Unexpected Error"
     
   }
   else if (status === "DISCONNECT_UNEXPECTED_DISCONNECTION"){
     document.getElementById("StarScaleAvailable").innerHTML = "Scale Disconnected"
     document.getElementById("textField").value = "Unexpected Disconnection"
   }
               

                // ***update settings***
  else if (status === "UPDATE_SETTING_SUCCESS"){
    
  }
  
  else if (status === "UPDATE_SETTING_NOT_CONNECTED"){
    
  }
  
  else if (status === "UPDATE_SETTING_REQUEST_REJECTED"){
    
  }
  else if (status === "UPDATE_SETTING_TIMEOUT"){
    
  }
  else if (status === "UPDATE_SETTING_ALREADY_EXECUTING"){
    
  }
  else if (status === "UPDATE_SETTING_UNEXPECTED_ERROR"){
    
  }
  

  
  // ***update output condition***
  
  
  else if (status === "UPDATE_SETTING_SUCCESS"){
    
  }
  
  else if (status === "UPDATE_SETTING_NOT_CONNECTED"){
    
  }
  
  else if (status === "UPDATE_SETTING_REQUEST_REJECTED"){
    
  }
  else if (status === "UPDATE_SETTING_TIMEOUT"){
    
  }
  else if (status === "UPDATE_SETTING_NOT_SUPPORTED"){
    
  }
  else if (status === "UPDATE_SETTING_ALREADY_EXECUTING"){
    
  }
  else if (status === "UPDATE_SETTING_UNEXPECTED_ERROR"){
    
  }
                  
       
  
}
