const axios = require("axios");
const fs = require("fs");
const year = 2018;
let date = fs
    .readFileSync(`../date${year}.txt`)
    .toString()
    .split(","),
  i = 0,
  compare = 1,
  dateLength = date.length,
  compareLength = dateLength,
  template = [],
  uselessDate = [];
const stringify = data => JSON.stringify(data);
for (i; i < dateLength; i++) {
  let j = i;
  setTimeout(_ => {
    axios
      .get(
        `https://api.data.gov.sg/v1/environment/air-temperature?date_time=${date[j]}`
      )
      .then(res => {
        let condition = !!res.data.items[0]["timestamp"];
        if (condition) {
          let data = res.data.items[0].readings,
            totalMeasuringPlace = data.length,
            timestamp = stringify(res.data.items[0].timestamp)
              .split("T")[1]
              .split(":")[0],
            time,
            date = res.data.items[0].timestamp.split("T")[0],
            totalReadings = 0,
            temperatureMean;
          data.forEach(reading => {
            totalReadings += reading.value;
          });
          temperatureMean = Math.round(totalReadings / totalMeasuringPlace);
          switch (timestamp) {
            case "00":
              time = "12am";
              break;
            case "04":
              time = "4am";
              break;
            case "08":
              time = "8am";
              break;
            case "12":
              time = "12pm";
              break;
            case "16":
              time = "4pm";
              break;
            case "20":
              time = "8pm";
              break;
          }
          let obj = {
            time,
            date,
            totalMeasuringPlace,
            totalReadings,
            temperatureMean
          };
          template.push(obj);
          compare++;
          if (compare === compareLength) {
            fs.writeFile(`./index${year}.json`, stringify(template), e =>
              e ? console.log(e) : false
            );
            fs.writeFile(`uselessDate${year}.txt`, uselessDate, e =>
              e ? console.log(e) : false
            );
          }
        } else {
          uselessDate.push(date[j]);
          compareLength--;
        }
      })
      .catch(err => console.log(err));
  }, 50);
}
