document.getElementById("prolificOpen").addEventListener("click", prolificOpen)


 EloProlificAdapterManager.initialize("mycallbackprolific")

function mycallbackprolific(isbound){
    if (isbound == "true"){
        document.getElementById("textField").value = "service bound adapter"
    }

    
}

function prolificOpen(){
    let array = new Uint8Array([1,2,3,4,5]);
  
    document.getElementById("textField").value = EloProlificAdapterManager.write2(array)

    
}
