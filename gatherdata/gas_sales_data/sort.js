const fs = require('fs');
// data = fs.readFileSync('./test.json'),
// readableData = JSON.parse(data);

// for fun sake code
let obj = [];
readableData.forEach(data=>{
    for(let x in data){
        if(x === 'Variables '){
            obj.push({
                category: data[x]
            })
        }
        if(x.split(' ')[1] >= 2016 && x.split(' ')[1] <= 2018){
            obj.push({
                [x] : data[x]
            })
        }
    }
})
let template = {},
filter = [];
obj.forEach(data=>{
    if(data.category){
        filter.push(template);
        template = {};
        template.category = data.category;
    }else{
        Object.assign(template, data);
    }
    if(obj.indexOf(data) === obj.length - 1 ){
        filter.push(template);
    }
})
filter.shift();

fs.writeFileSync('./filtered.json', JSON.stringify(filter))
