const fs = require("fs"),
  data = fs.readFileSync("./gas_sales_monthly.json"),
  readableData = JSON.parse(data);
//Level 1 data
let filteredData = readableData.Level1.filter(el => {
  return (
    parseInt(el.month.split("-")[0]) >= 2016 &&
    parseInt(el.month.split("-")[0]) <= 2018
  );
});
fs.writeFileSync("./lvl1.json", JSON.stringify(filteredData));

//Level 2 data
//! no Level 2 for this data
// let filteredData = readableData.Level2.filter(el=>{
//     return parseInt(el.month.split('-')[0]) >= 2016
// })
// fs.writeFileSync('./lvl2.json', JSON.stringify(filteredData));
