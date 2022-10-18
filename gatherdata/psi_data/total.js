const fs = require('fs'),
years = [2016, 2017, 2018];
years.forEach(year=>{
    let data = fs.readFileSync(`./index${year}.json`);
    let parsedData = JSON.parse(data);
    let total;
    let previousDate,
    previousI;
    let firstData = parsedData[0];
    
    for (let i in firstData) {
        parsedData.forEach(data => {
           if (typeof data[i] !== 'number') { } else {
                if (!previousDate) {
                    previousDate = data.date;
                    previousI = i;
                    total = data[i];
                } else if (data.date === previousDate) {
                    total += data[i];
                } else if (data.date !== previousDate) {
                    fs.appendFileSync(`./total/${year}total_${previousI}.txt`, `${previousDate} : ${total},`);
                    previousDate = data.date;
                    previousI = i;
                    total = data[i];
                }
            }
        })
    }
})
