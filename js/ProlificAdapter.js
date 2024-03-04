document.getElementById("prolificOpen").addEventListener("click", prolificOpen)

function prolificOpen(){
    let array = new Uint8Array(1);
  
    document.getElementById("textField").value = EloProlificAdapterManager.write(array)

    
}
