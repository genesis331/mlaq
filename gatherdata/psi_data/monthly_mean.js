const fs = require('fs'),
years = [2016, 2017 ,2018];
years.forEach(year=>{
    let data = fs.readFileSync(`./index${year}.json`);
    let parsedData = JSON.parse(data);
    let firstData = parsedData[0];
    
    for (let i in firstData) {
        if (typeof firstData[i] !== 'number') {} else {
            let total = fs.readFileSync(`./daily_mean/${year}mean_${i}.txt`).toString();
            let totalAry = total.split(',');
            let previousMonth = '01';
            let totalMean = 0;
            let totalDays = 0;
            totalAry.pop();
            totalAry.forEach(total => {
                let ary = total.split(':');
                let value = parseInt(ary[1]);
                let day = parseInt(ary[0].split('-')[2]);
                totalDays = day > totalDays ? day : totalDays;
    
                if (previousMonth === ary[0].split('-')[1]) {
                    totalMean += value;
                } else if (previousMonth !== ary[0].split('-')[1]) {
                    let mean = Math.round(totalMean / totalDays);
                    let string = `${previousMonth} : ${mean}, \n`;
                    fs.appendFileSync(`./monthly_mean/${year}mean_${i}.txt`, string, e => e ? console.log(e) : null);
                    previousMonth = ary[0].split('-')[1];
                    totalMean = 0;
                    totalDays = 0;
                }
                if (totalAry.indexOf(total) === totalAry.length - 1) {
                    let mean = Math.round(totalMean / totalDays);
                    let string = `${previousMonth} : ${mean}, \n`;
                    fs.appendFileSync(`./monthly_mean/${year}mean_${i}.txt`, string, e => e ? console.log(e) : null);
                }
            })
        }
    }
})
