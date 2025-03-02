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


function slktopred(){
    document.getElementById("textField").value = "button clicked"
    EloPeripheralManager.setLightByPort(1 , 0 , true)
}

function slktopblue(){
EloPeripheralManager.setLightByPort(0 , 8 , true)
}

function slktopgreen(){
EloPeripheralManager.setLightByPort(0 , 7 , true)
}

function slktopflashing(){
EloPeripheralManager.setFlashingByPort(0, 0, 250, true)
}

function slktopoff(){
EloPeripheralManager.setLightByPort(0 , 0 , false)
}


function slkrightred(){
EloPeripheralManager.setLightByPort(1 , 0 , true)
}

function slkrightblue(){
EloPeripheralManager.setLightByPort(1 , 8 , true)
}

function slkrightgreen(){
EloPeripheralManager.setLightByPort(1 , 7 , true)
}

function slkrightflashing(){
EloPeripheralManager.setFlashingByPort(1, 0, 250, true)
}

function slkrightoff(){
EloPeripheralManager.setLightByPort(1 , 0 , false)
}

    
