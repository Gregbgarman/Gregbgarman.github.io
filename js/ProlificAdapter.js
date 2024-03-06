document.getElementById("prolificWrite").addEventListener("click", prolificWrite)
document.getElementById("prolificInit").addEventListener("click", prolificInit)
document.getElementById("prolificSetBaudRate").addEventListener("click", prolificSetBaudRate)




EloProlificAdapterManager.initialize("mycallbackprolific")

function mycallbackprolific(isbound){
    if (isbound == "true"){
        document.getElementById("textField").value = "service bound adapter"
    }
}

function prolificSetBaudRate(){
    let baudRate = "B19200"
    let dataBits = "D8"
    let stopBits = "S1"
    let parity = "NONE"
    let flowControl = "OFF"

    let res =EloProlificAdapterManager.setup(baudRate, dataBits, stopBits, parity, flowControl);
    if (res < 0){
        document.getElementById("textField").value = "fail to setup"
    }
    else{
        document.getElementById("textField").value = "new baud rate set to 19200"
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


function prolificWrite(){
    let array = new Uint8Array([1]);

   // let res = EloProlificAdapterManager.write(array)
    document.getElementById("textField").value = EloProlificAdapterManager.write(array)
    let res = EloProlificAdapterManager.writeWithString("asdfds")
    if (res < 0){
        document.getElementById("textField").value = "write error"
    }
    else{
        document.getElementById("textField").value = "write success"
    }
  
   

    
}
