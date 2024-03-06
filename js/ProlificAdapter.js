document.getElementById("prolificOpen").addEventListener("click", prolificOpen)
document.getElementById("prolificInit").addEventListener("click", prolificInit)



 EloProlificAdapterManager.initialize("mycallbackprolific")

function mycallbackprolific(isbound){
    if (isbound == "true"){
        document.getElementById("textField").value = "service bound adapter"
    }
}

function prolificInit(){
    document.getElementById("textField").value = "Init Begin"
    if (!EloProlificAdapterManager.PL2303USBFeatureSupported()) {
        document.getElementById("textField").value = "usb feature not supported"
        return
    }
    if(!EloProlificAdapterManager.enumerate()){
        document.getElementById("textField").value = "no device found"
        return
    }

    var waitTime = 1500;
    setTimeout(function() {
        if (EloProlificAdapterManager.isConnected()){
            let mBaudrate = "B9600"
            let timeout = 700
            if (!EloProlificAdapterManager.InitByBaudRate(mBaudrate,timeout)){
                if(!EloProlificAdapterManager.PL2303Device_IsHasPermission()) {
                    document.getElementById("textField").value = "missing permission"              
                }

                if(EloProlificAdapterManager.PL2303Device_IsHasPermission() && (!EloProlificAdapterManager.PL2303Device_IsSupportChip())) {
                    document.getElementById("textField").value = "cannot open, maybe this chip has no support"
                }
            }
            else{
                document.getElementById("textField").value = "connect Success"
            }
        }
        else{
            document.getElementById("textField").value = "Connect failed"
        }

    }, waitTime);
     
    
}


function prolificOpen(){
    let array = new Uint8Array([1]);

    let res = EloProlificAdapterManager.write(array)
    document.getElementById("textField").value = EloProlificAdapterManager.write(array)
    //document.getElementById("textField").value = EloProlificAdapterManager.write("asdfds")
    if (res < 0){
        document.getElementById("textField").value = "write error"
    }
    else{
        document.getElementById("textField").value = "write success"
    }
  
   

    
}
