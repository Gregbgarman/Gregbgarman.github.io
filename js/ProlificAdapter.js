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
    EloProlificAdapterManager.enumerate()
}


function prolificOpen(){
    let array = new Uint8Array([1,2,3,4,5]);
  
    document.getElementById("textField").value = EloProlificAdapterManager.write(array)

    
}
