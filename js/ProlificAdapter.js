document.getElementById("prolificOpen").addEventListener("click", prolificOpen)
document.getElementById("prolificInit").addEventListener("click", prolificInit)



 EloProlificAdapterManager.initialize("mycallbackprolific")

function mycallbackprolific(isbound){
    if (isbound == "true"){
        document.getElementById("textField").value = "service bound adapter"
    }
}

function prolificInit(){
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
                return
            }

            if(EloProlificAdapterManager.PL2303Device_IsHasPermission() && (!EloProlificAdapterManager.PL2303Device_IsSupportChip())) {
                document.getElementById("textField").value = "cannot open, maybe this chip has no support"
                return
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
    let array = new Uint8Array([1,2,3,4,5]);
  
    //document.getElementById("textField").value = EloProlificAdapterManager.write(array)
    document.getElementById("textField").value = EloProlificAdapterManager.write("asdfds")

    
}
