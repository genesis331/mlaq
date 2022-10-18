const fs = require("fs"),
  data = fs.readFileSync("./lvl2.json"),
  readableData = JSON.parse(data),
  types = [];

//lvl2
readableData.forEach(data=>{
    types.indexOf(data.level_2) === -1 ? types.push(data.level_2): false;  
})
types.forEach(type=>{
  let currentData = readableData.filter(data=>data.level_2 === type);
  fs.writeFileSync(`./${type}.json`, JSON.stringify(currentData));
})
