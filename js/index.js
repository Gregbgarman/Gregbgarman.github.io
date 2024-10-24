

const COLOR_RED = '#FF0000'
const COLOR_GREEN = '#008000'
window.onload = function() {
  setOnReadyCallbacks()
};

function setOnReadyCallbacks(){


  try{
        EloHoneywellBarcodeManager.initialize("onHoneywellReady")
    }catch(error){
       /*
         Make sure Webview Hardware Access toggle is enabled
         from Eloview or device settings app and Elo device on correct firmware.
        */
    }


	 try{
      // EloPR1000PrinterManager.initialize("onPR1000PrinterReady")
    }catch(error){
       /*
         Make sure Webview Hardware Access toggle is enabled
         from Eloview or device settings app and Elo device on correct firmware.
        */
    }

	
}


function onPR1000PrinterReady(serviceBound){
    if (serviceBound === "true"){
        document.getElementById("pr1000Header").style.color = COLOR_GREEN
        if (EloPR1000PrinterManager.getConnectedDevice() != ""){
            document.getElementById("PR1000Available").innerHTML = "Printer Connected"
        }
        else{
            document.getElementById("PR1000Available").innerHTML = "Printer Offline"
        }
    }
    else{
        document.getElementById("PR1000Available").innerHTML = "Printer Offline"
        document.getElementById("pr1000Header").style.color = COLOR_RED
    }
}





function onHoneywellReady(connected){
  if (connected === "true"){
      document.getElementById("HoneywellHeader").style.color = COLOR_GREEN

	  /*
EloHoneywellBarcodeManager.registerHoneywellListener("myCallback");
	  
      var waitTime = 5000;
        setTimeout(function() {
            EloHoneywellBarcodeManager.activeBcr();
            checkAvailableDevices();
	    
        }, waitTime);
	*/
  }
  else{
    document.getElementById("HoneywellHeader").style.color = COLOR_RED
  }
}

function checkAvailableDevices(){
      var honeywellAvailable = EloHoneywellBarcodeManager.isBcrOn();
      console.log("Honeywell BCR is Available [" + honeywellAvailable + "]");
      if(honeywellAvailable == true){
        document.getElementById("honeywellBarcodeAvailable").innerHTML = "Honeywell is Connected";
      } else {
        document.getElementById("honeywellBarcodeAvailable").innerHTML = "Honeywell is Disconnected";
      }
}

function myCallback(state, data) {
    if(state != 0){
        document.getElementById("textField").value = "BCR Read Failure";
    } else {
        document.getElementById("textField").value = data;
    }
}

