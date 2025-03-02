document.getElementById("slktopred").addEventListener("click", slktopred)


document.getElementById("slktopblue").addEventListener("click", slktopblue)
document.getElementById("slktopgreen").addEventListener("click", slktopgreen)
document.getElementById("slktopflashing").addEventListener("click", slktopflashing)
document.getElementById("slktopoff").addEventListener("click", slktopoff)
document.getElementById("slkrighred").addEventListener("click", slkrightred)
document.getElementById("slkrightblue").addEventListener("click", slkrightblue)
document.getElementById("slkrightgreen").addEventListener("click", slkrightgreen)
document.getElementById("slkrightflashing").addEventListener("click",slkrightflashing)
document.getElementById("slkrightoff").addEventListener("click", slkrightoff)


let port_top = 5
let port_right = 4

function slktopred(){
    document.getElementById("textField").value = "button clicked"
    EloPeripheralManager.setLightByPort(port_top , 0 , true)
}

function slktopblue(){
EloPeripheralManager.setLightByPort(port_top , 8 , true)
}

function slktopgreen(){
EloPeripheralManager.setLightByPort(port_top , 7 , true)
}

function slktopflashing(){
EloPeripheralManager.setFlashingByPort(port_top, 0, 250, true)
}

function slktopoff(){
EloPeripheralManager.setLightByPort(port_top , 0 , false)
}


function slkrightred(){
EloPeripheralManager.setLightByPort(port_right , 0 , true)
}

function slkrightblue(){
EloPeripheralManager.setLightByPort(port_right , 8 , true)
}

function slkrightgreen(){
EloPeripheralManager.setLightByPort(port_right , 7 , true)
}

function slkrightflashing(){
EloPeripheralManager.setFlashingByPort(port_right, 0, 250, true)
}

function slkrightoff(){
EloPeripheralManager.setLightByPort(port_right, 0 , false)
}

    
