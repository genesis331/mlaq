const fs = require('fs');
const getDate = _ => {
  let time = [];
  let formattedTime = [];
  let months = [];
  let date2016 = [];
  let date2017 = [];
  let date2018 = [];
  // get time
  for (let i = 0; i <= 23; i++) {
    if (i % 4 === 0) {
      time.push(i);
    }
  }
  time.forEach(selectedTime => {
    selectedTime = selectedTime.toString();
    formattedTime.push(
      selectedTime.length < 2 ? `0${selectedTime}` : selectedTime
    );
  });
  //get months
  for (let i = 1; i <= 12; i++) {
    i = i.toString();
    months.push(i.length < 2 ? `0${i}` : i);
  }
  //get date
  for (let month = 0; month <= 11; month++) {
    let d;
    let formattedMonth =
      (month + 1).toString().length < 2 ? `0${month + 1}` : `${month + 1}`;
    for (let i = 1; i <= 31; i++) {
      i = i.toString();
      d = new Date(2019, month, i, 10, 33, 30);
      let formattedDate = i.length < 2 ? `0${i}` : i;
      if (
        d
          .toString()
          .split("2019")[0]
          .includes(formattedDate)
      ) {
        for (let i = 0; i < formattedTime.length; i++) {
          date2016.push(
            `2016-${formattedMonth}-${formattedDate}T${formattedTime[i]}:00:00`
          );
          // date2017.push(
          //   `2017-${formattedMonth}-${formattedDate}T${formattedTime[i]}:00:00`
          // );
          // date2018.push(
          //   `2018-${formattedMonth}-${formattedDate}T${formattedTime[i]}:00:00`
          // );
        }
      }
    }
  }
  fs.writeFileSync('./date2016.txt', date2016);
  // fs.writeFileSync('./date2018.txt', date2018);
};

getDate();
