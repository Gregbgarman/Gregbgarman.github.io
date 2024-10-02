

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
	
}

function onHoneywellReady(serviceBound){
  if (serviceBound === "true"){
      document.getElementById("HoneywellHeader").style.color = COLOR_GREEN
      var waitTime = 3000;
        setTimeout(function() {
            EloHoneywellBarcodeManager.activeBcr();
            checkAvailableDevices();
	    EloHoneywellBarcodeManager.registerHoneywellListener("BCRCallback");
        }, waitTime);
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

function BCRCallback(state, data) {
    if(state != 0){
        document.getElementById("textField").value = "BCR Read Failure";
    } else {
        document.getElementById("textField").value = data;
    }
}

