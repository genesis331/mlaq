const fs = require('fs'),
years = [2016,2017,2018];
years.forEach(year=>{
    let data = fs.readFileSync(`./index${year}.json`);
    let parsedData = JSON.parse(data);
    parsedData.sort((a,b) => {
        let compareA = a.date.split('-')[1] + a.date.split('-')[2];
        let compareB = b.date.split('-')[1] + b.date.split('-')[2];
        let intA = parseInt(compareA);
        let intB = parseInt(compareB);
        return intA - intB;
    })
    fs.writeFileSync(`./index${year}.json`, JSON.stringify(parsedData), e=>e?console.log(e):null)
})

