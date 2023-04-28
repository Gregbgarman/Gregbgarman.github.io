const json = '{"result":true, "count":42}'
const obj = JSON.parse(json)



document.getElementById("textField").value = obj.count
