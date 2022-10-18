const fs = require("fs"),
  data = fs.readFileSync("./manufacturing_data.json"),
  readableData = JSON.parse(data);
//Level 1 data 
let filteredData1 = readableData.Level1.filter(el=>{
  return parseInt(el.year) >= 2016 && parseInt(el.year) <= 2018
  })
fs.writeFileSync('./lvl1.json', JSON.stringify(filteredData1));

//Level 2 data
let filteredData2 = readableData.Level2.filter(el=>{
    return parseInt(el.year) >= 2016 && parseInt(el.year) <= 2018
})
fs.writeFileSync('./lvl2.json', JSON.stringify(filteredData2));
