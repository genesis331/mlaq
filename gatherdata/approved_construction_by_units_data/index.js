const fs = require("fs"),
  data = fs.readFileSync("./approved_construction.json"),
  readableData = JSON.parse(data);
console.log(readableData)
let filteredData1 = readableData.Level1.filter(el=>{
  return parseInt(el.quarter.split('-')[0]) >= 2016 && parseInt(el.quarter.split('-')[0]) <= 2018
  })
fs.writeFileSync('./lvl1.json', JSON.stringify(filteredData1));

// //Level 2 data
//! no Level 2 data
// let filteredData2 = readableData.Level2.filter(el=>{
//     return parseInt(el.month.split('-')[0]) >= 2016 && parseInt(el.month.split('-')[0]) <= 2018
// })
// fs.writeFileSync('./lvl2.json', JSON.stringify(filteredData2));
