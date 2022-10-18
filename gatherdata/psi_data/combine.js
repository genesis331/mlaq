const fs = require("fs");

let i16 = fs.readFileSync("./index2016.json"),
  i17 = fs.readFileSync("./index2017.json"),
  i18 = fs.readFileSync("./index2018.json");

  const combined = JSON.parse(i16).concat(JSON.parse(i17)).concat(JSON.parse(i18));
  fs.writeFileSync('./index2016-2018.json', JSON.stringify(combined));