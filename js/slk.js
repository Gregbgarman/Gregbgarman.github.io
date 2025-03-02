document.getElementById("slktopred").addEventListener("click", slktopred)


document.getElementById("slktopblue").addEventListener("click", slktopblue)
document.getElementById("slktopgreen").addEventListener("click", slktopgreen)
document.getElementById("slktopflashing").addEventListener("click", slktopflashing)
document.getElementById("slktopoff").addEventListener("click", slktopoff)
document.getElementById("slkrightred").addEventListener("click", slkrightred)
document.getElementById("slkrightblue").addEventListener("click", slkrightblue)
document.getElementById("slkrightgreen").addEventListener("click", slkrightgreen)
document.getElementById("slkrightflashing").addEventListener("click",slkrightflashing)
document.getElementById("slkrightoff").addEventListener("click", slkrightoff)

const PORT_TOP = 5
const PORT_RIGHT = 4





function slktopred(){
    
    EloPeripheralManager.setLightByPort(PORT_TOP , 0 , true)
    document.getElementById("textField").value = "port is " + PORT_TOP
}

function slktopblue(){
EloPeripheralManager.setLightByPort(PORT_TOP , 8 , true)
}

function slktopgreen(){
EloPeripheralManager.setLightByPort(PORT_TOP , 7 , true)
}

function slktopflashing(){
EloPeripheralManager.setFlashingByPort(PORT_TOP, 0, 250, true)
}

function slktopoff(){
EloPeripheralManager.setLightByPort(PORT_TOP , 0 , false)
}


function slkrightred(){
EloPeripheralManager.setLightByPort(PORT_RIGHT , 0 , true)

    document.getElementById("textField").value = "port is " + PORT_RIGHT
}

function slkrightblue(){
    document.getElementById("textField").value = "port is " + PORT_RIGHT
EloPeripheralManager.setLightByPort(PORT_RIGHT , 8 , true)
}

function slkrightgreen(){
    document.getElementById("textField").value = "port is " + PORT_RIGHT
EloPeripheralManager.setLightByPort(PORT_RIGHT , 7 , true)
}

function slkrightflashing(){
    document.getElementById("textField").value = "port is " + PORT_RIGHT
EloPeripheralManager.setFlashingByPort(PORT_RIGHT, 0, 250, true)
}

function slkrightoff(){
    document.getElementById("textField").value = "port is " + PORT_RIGHT
EloPeripheralManager.setLightByPort(PORT_RIGHT, 0 , false)
}

    
