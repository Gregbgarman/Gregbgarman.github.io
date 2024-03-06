document.getElementById("prolificWrite").addEventListener("click", prolificWrite)
document.getElementById("prolificInit").addEventListener("click", prolificInit)
document.getElementById("prolificSetBaudRate").addEventListener("click", prolificSetBaudRate)
//document.getElementById("prolificEnd").addEventListener("click", prolificEnd)


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

    let res = EloProlificAdapterManager.setup(baudRate, dataBits, stopBits, parity, flowControl);
    if (res < 0){
        document.getElementById("textField").value = "failure"
    }
    else{
        document.getElementById("textField").value = "baud rate set to 19200"
    }
}

function openUsbSerial(){
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
}

/*
follows same setup flow as in SDK sample app by Prolific
*/
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
        openUsbSerial()
    }, waitTime);
}

/*
write() should open cash drawer - also resembling behavior in SDK sample app where user is to enter text. Created additional API
writeWithString() to be able to accept a string parameter and 
*/
function prolificWrite(){
    let text = document.getElementById("textField").value
    if (text.length == 0){
        document.getElementById("textField").value = "provide input on line"
        //return
    }
    let utf8Encode = new TextEncoder();
    let array = utf8Encode.encode("abc");

  
    let res = EloProlificAdapterManager.write(array)
    if (res < 0){
        document.getElementById("textField").value = "write error"
    }
    else{
        document.getElementById("textField").value = "write success"
    }
}

function prolificEnd(){
    EloProlificAdapterManager.end()
}

