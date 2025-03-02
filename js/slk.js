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

document.getElementById("slkleftred").addEventListener("click", slkleftred)
document.getElementById("slkleftblue").addEventListener("click", slkleftblue)
document.getElementById("slkleftgreen").addEventListener("click", slkleftgreen)
document.getElementById("slkleftflashing").addEventListener("click",slkleftflashing)
document.getElementById("slkleftoff").addEventListener("click", slkleftoff)

document.getElementById("slkbottomred").addEventListener("click", slkbottomred)
document.getElementById("slkbottomblue").addEventListener("click", slkbottomblue)
document.getElementById("slkbottomgreen").addEventListener("click", slkbottomgreen)
document.getElementById("slkbottomflashing").addEventListener("click",slkbottomflashing)
document.getElementById("slkbottomoff").addEventListener("click", slkbottomoff)







const PORT_TOP = 5
const PORT_RIGHT = 4
const PORT_LEFT = 3
const PORT_BOTTOM = 6




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



function slkbottomred(){
EloPeripheralManager.setLightByPort(PORT_BOTTOM , 0 , true)

    document.getElementById("textField").value = "port is " + PORT_BOTTOM
}

function slkbottomblue(){
    document.getElementById("textField").value = "port is " + PORT_BOTTOM
EloPeripheralManager.setLightByPort(PORT_BOTTOM , 8 , true)
}

function slkbottomgreen(){
    document.getElementById("textField").value = "port is " + PORT_BOTTOM
EloPeripheralManager.setLightByPort(PORT_BOTTOM , 7 , true)
}

function slkbottomflashing(){
   document.getElementById("textField").value = "port is " + PORT_BOTTOM
EloPeripheralManager.setFlashingByPort(PORT_BOTTOM, 0, 250, true)
}

function slkbottomoff(){
    document.getElementById("textField").value = "port is " + PORT_BOTTOM
EloPeripheralManager.setLightByPort(PORT_BOTTOM, 0 , false)
}




function slkleftred(){
    EloPeripheralManager.setLightByPort(PORT_LEFT , 0 , true)
    document.getElementById("textField").value = "port is " + PORT_LEFT
}

function slkleftblue(){
    document.getElementById("textField").value = "port is " + PORT_LEFT
EloPeripheralManager.setLightByPort(PORT_LEFT , 8 , true)
}

function slkleftgreen(){
    document.getElementById("textField").value = "port is " + PORT_LEFT
EloPeripheralManager.setLightByPort(PORT_LEFT , 7 , true)
}

function slkleftflashing(){
    document.getElementById("textField").value = "port is " + PORT_LEFT
EloPeripheralManager.setFlashingByPort(PORT_LEFT, 0, 250, true)
}

function slkleftoff(){
   document.getElementById("textField").value = "port is " + PORT_LEFT
EloPeripheralManager.setLightByPort(PORT_LEFT, 0 , false)
}

    
