document.getElementById("beginScan").addEventListener("click", beginScan)
document.getElementById("connectScale").addEventListener("click", connectScale)




function beginScan(){
    EloStarScaleManager.scanForScales("DeviceCallback", "All")
  
}

function DeviceCallback(Scale){
   
}


function connectScale(){
   let Scale_Identifier = document.getElementById("textField").value
   let Baud_Rate = 1200
   if (!EloStarScaleManager.createScale(Scale_Identifier, Baud_Rate)){
       document.getElementById("textField").value = "Create Scale Failed"
       return
   }
  
   if (!EloStarScaleManager.connect("StatusCallback")){
       document.getElementById("textField").value = "Connect Scale Failed"
       return
   }
  
   EloStarScaleManager.setScaleDataCallback("DataCallback") 
  
  
  
  //const json = '{"result":true, "count":42}'
//const obj = JSON.parse(json)



//document.getElementById("textField").value = obj.count
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
