const fs = require('fs'),
years = [2016, 2017 ,2018];
years.forEach(year=>{
    let data = fs.readFileSync(`./index${year}.json`);
    let parsedData = JSON.parse(data);
    let firstData = parsedData[0];
    
    for (let i in firstData) {
        if (typeof firstData[i] !== 'number') {} else {
            let total = fs.readFileSync(`./monthly_mean/${year}mean_${i}.txt`).toString();
            let totalAry = total.split(',');
            let counter = 0;
            let totalMean = 0;
            totalAry.pop();
            totalAry.forEach(total => {
                let ary = total.split(':');
                let value = parseInt(ary[1]);
                if(value){
                    totalMean += value;
                    counter++;
                }
                if(parseInt(ary[0].split('\n')[1]) % 4 === 0){
                   fs.appendFileSync(`./quarterly_mean/${year}mean_${i}.txt`, `${totalMean/counter} \n`); 
                    counter = 0;
                }
            })
        }
    }
})
