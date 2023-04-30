document.getElementById("beginScan").addEventListener("click", beginScan)
document.getElementById("connectScale").addEventListener("click", connectScale)

let DevicesFound = ''
let DeviceTable = []


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
    DeviceTable.push(obj)
    
    let Device_Name = obj.device_name
    DevicesFound += Device_Name + ' '
    document.getElementById("textField").value = DevicesFound
    
      //const json = '{"result":true, "count":42}'
//const obj = JSON.parse(json)



//document.getElementById("textField").value = obj.count
}


function connectScale(){
   let Scale_Name = document.getElementById("textField").value
   let Identifier = ''
   for (let i=0;i<DeviceTable.length;i++){
       if (DeviceTable[i].device_name === Scale_Name){
           Identifier = DeviceTable[i].identifier
           break
       }
   }
   
   
   let Baud_Rate = 1200
   if (!EloStarScaleManager.createScale(Identifier, Baud_Rate)){
       document.getElementById("textField").value = "Create Scale Failed"
       return
   }
  
   if (!EloStarScaleManager.connect("StatusCallback")){
       document.getElementById("textField").value = "Connect Scale Failed"
       return
   }
  
   EloStarScaleManager.setScaleDataCallback("DataCallback") 
  
  
  

}

function DataCallback(Data){
  if (Data === "ERROR"){
    
  }
  
  
  
}

function StatusCallback(status){
  
       // **connection**
  
   if (status === "CONNECT_SUCCESS"){
     
     
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
     
   }
  
   else if (status === "DISCONNECT_NOT_CONNECTED"){
     
   }
  
   else if (status === "DISCONNECT_TIMEOUT"){
     
   }
   else if (status === "DISCONNECT_READ_WRITE_ERROR"){
     
   }
   else if (status === "DISCONNECT_UNEXPECTED_ERROR"){
     
   }
   else if (status === "DISCONNECT_UNEXPECTED_DISCONNECTION"){
     
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
