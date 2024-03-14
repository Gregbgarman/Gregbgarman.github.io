document.getElementById("prolificInit").addEventListener("click", prolificInit)
document.getElementById("prolificSetBaudRate").addEventListener("click", prolificSetBaudRate)
document.getElementById("prolificWrite").addEventListener("click", prolificWrite)
document.getElementById("prolificEnd").addEventListener("click", prolificEnd)

document.getElementById("btnEnumerate").addEventListener("click", btnEnumerate)
document.getElementById("btnConnected").addEventListener("click", btnConnected)  






EloProlificAdapterManager.initialize("mycallbackprolific")

function mycallbackprolific(isbound){
    if (isbound == "true"){
        document.getElementById("textField").value = "service bound adapter"
        document.getElementById("textField").value = "enumerate is: " + EloProlificAdapterManager.enumerate()
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
A different baud rate may need to be set for drawer to open.
*/
function prolificSetBaudRate(){
    let baudRate = "B9600"
    let dataBits = "D8"
    let stopBits = "S1"
    let parity = "NONE"
    let flowControl = "OFF"

    let res = EloProlificAdapterManager.setup(baudRate, dataBits, stopBits, parity, flowControl);
    if (res < 0){
        document.getElementById("textField").value = "failure"
    }
    else{
        document.getElementById("textField").value = "baud rate set to " + baudRate
    }
}


/*
write() appears to open cash drawer - prolificWrite() resembles behavior in SDK sample app where user is to enter text and then
it is converted to bytes.
*/
function prolificWrite(){
    let text = document.getElementById("textField").value
    if (text.length == 0){
        document.getElementById("textField").value = "provide input on line"
        return
    }
    let utf8Encode = new TextEncoder();
    let array = utf8Encode.encode(text);

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
    document.getElementById("textField").value = "end called"
}




function btnEnumerate(){
     document.getElementById("textField").value = EloProlificAdapterManager.enumerate()
}
function btnConnected(){
     document.getElementById("textField").value = EloProlificAdapterManager.isConnected()
}

