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
    uselessDate = [],
    wrongDate = [];
  const stringify = data => JSON.stringify(data);
  for (i; i < dateLength; i++) {
    let j = i;
    setTimeout(_ => {
      axios
        .get(
          `https://api.data.gov.sg/v1/environment/psi?date_time=${date[j]}`
        )
        .then(res => {
          if(res.data.items[0]["timestamp"] !== undefined){
            if(res.data.items[0].timestamp.split('+')[0] === date[j]){
              let data = res.data.items,
                  timestamp = stringify(data[0]["timestamp"])
                    .split("T")[1]
                    .split(":")[0],
                  time,
                  date = data[0]["timestamp"].split("T")[0],
                  o3_sub_index = data[0]["readings"]["o3_sub_index"]["national"],
                  pm10_twenty_four_hourly =
                    data[0]["readings"]["pm10_twenty_four_hourly"]["national"],
                  co_sub_index = data[0]["readings"]["co_sub_index"]["national"],
                  pm10_sub_index =
                    data[0]["readings"]["pm10_sub_index"]["national"],
                  pm25_twenty_four_hourly =
                    data[0]["readings"]["pm25_twenty_four_hourly"]["national"],
                  so2_sub_index = data[0]["readings"]["so2_sub_index"]["national"],
                  so2_twenty_four_hourly =
                    data[0]["readings"]["so2_twenty_four_hourly"]["national"],
                  no2_one_hour_max =
                    data[0]["readings"]["no2_one_hour_max"]["national"],
                  pm25_sub_index =
                    data[0]["readings"]["pm25_sub_index"]["national"],
                  psi_twenty_four_hourly =
                    data[0]["readings"]["psi_twenty_four_hourly"]["national"];
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
                  o3_sub_index,
                  pm10_twenty_four_hourly,
                  co_sub_index,
                  pm10_sub_index,
                  pm25_twenty_four_hourly,
                  so2_sub_index,
                  so2_twenty_four_hourly,
                  no2_one_hour_max,
                  pm25_sub_index,
                  psi_twenty_four_hourly,
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
                  fs.writeFile(`wrongDate${year}.txt`, wrongDate, e =>
                    e ? console.log(e) : false
                  );
                }
              } else {
                uselessDate.push(date[j]);
                wrongDate.push(date[j]);
                compareLength--;
            }
          }else {
            uselessDate.push(date[j]);
            compareLength--;
        }
        })
        .catch(err => console.log(err));
    }, 50);
  }
