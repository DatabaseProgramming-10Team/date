const offset = new Date().getTimezoneOffset() * 60000;
let tempDate = new Date(Date.now() - offset);

let checkDate = "20211218";
console.log(
  new Date(
    checkDate.slice(0, 4),
    parseInt(checkDate.slice(4, 6)) - 1,
    checkDate.slice(6, 8)
  ).getDay()
);

console.log("2,3,5,".slice(0, -1).split(","));
