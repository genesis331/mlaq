const fs = require('fs');
const years = [2016, 2017, 2018];
years.forEach(year=>{
    let data = fs.readFileSync(`./index${year}.json`);
    let parsedData = JSON.parse(data);
    let firstData = parsedData[0];
    let uselessDate = fs.readFileSync(`./uselessDate${year}.txt`).toString().split(',').map(date=> date.split('T')[0]);
    for (let i in firstData) {
        if (typeof firstData[i] !== 'number') {
    
        } else {
            let total = fs.readFileSync(`./total/${year}total_${i}.txt`).toString();
            let totalAry = total.split(',');
            totalAry.pop();
            totalAry.forEach(total => {
                let ary = total.split(':');
                let value = parseInt(ary[1]);
                let useless = uselessDate.filter(date=>date === ary[0].trim());
                let divideNum = 6 - useless.length;
                let mean = Math.round(value / divideNum);
                let string = `${ary[0]}: ${mean}, \n`;
                fs.appendFileSync(`./daily_mean/${year}mean_${i}.txt`, string, e => e ? console.log(e) : null);
            })
        }
    }
})
