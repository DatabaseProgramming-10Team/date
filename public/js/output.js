let date = new Date(2021, 0);
const whatDay = function (day) {
  if (day == 0) return "일";
  else if (day == 1) return "월";
  else if (day == 2) return "화";
  else if (day == 3) return "수";
  else if (day == 4) return "목";
  else if (day == 5) return "금";
  else if (day == 6) return "토";
};

const calendar = function () {
  //년, 월 계산
  const year = date.getFullYear() + "";
  const month = date.getMonth();
  const monthtxt = function () {
    if (month == 0) return "January";
    else if (month == 1) return "February";
    else if (month == 2) return "March";
    else if (month == 3) return "April";
    else if (month == 4) return "May";
    else if (month == 5) return "June";
    else if (month == 6) return "July";
    else if (month == 7) return "August";
    else if (month == 8) return "September";
    else if (month == 9) return "October";
    else if (month == 10) return "November";
    else if (month == 11) return "December";
  };

  //년, 월 출력
  document.querySelector(
    ".year"
  ).textContent = `${year[0]} ${year[1]} ${year[2]} ${year[3]}`;
  document.querySelector(".month").textContent =
    month < 9 ? `0${month + 1}` : month + 1;
  document.querySelector(".monthtxt").textContent = `${monthtxt()}`;

  //달력에 표시되는 다른 달의 날짜 계산
  let prevDate = new Date(year, month, 0).getDate();
  let prevDay = new Date(year, month, 0).getDay();
  let thisDate = new Date(year, month + 1, 0).getDate();
  let thisDay = new Date(year, month + 1, 0).getDay();

  let prevDates = [];
  let thisDates = [...Array(thisDate + 1).keys()].slice(1);
  let nextDates = [];

  if (prevDay !== 6) {
    for (let i = 0; i < prevDay + 1; i++) {
      prevDates.unshift(prevDate - i);
    }
  }

  for (let i = 1; i < 7 - thisDay; i++) {
    nextDates.push(i);
  }

  //날짜 출력
  let dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(thisDate);
  dates.forEach((date, i) => {
    let condition;
    if (i < firstDateIndex) condition = "other prev";
    else if (i >= lastDateIndex + 1) condition = "other next";
    else condition = "this";
    dates[i] = `<div class="date"><p class="${condition}">${date}</p></div>`;
  });

  document.querySelector(".dates").innerHTML = dates.join("");
};

calendar();
let dateDivs = document.querySelectorAll(".date");
dateDivs.forEach((item) => {
  if (item.firstChild.className === "this")
    item.innerHTML += `<div class="res">⭕</div>`;
  else item.innerHTML += `<div class="res">❌</div>`;
});
