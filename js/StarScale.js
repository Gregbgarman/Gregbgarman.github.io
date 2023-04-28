document.getElementById("beginScan").addEventListener("click", beginScan)
document.getElementById("connectScale").addEventListener("click", connectScale)




function beginScan(){
document.getElementById("textField").value = 'hello'  
}

function connectScale(){
  const json = '{"result":true, "count":42}'
const obj = JSON.parse(json)



document.getElementById("textField").value = obj.count
}
