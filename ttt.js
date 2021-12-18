const offset = new Date().getTimezoneOffset() * 60000;
let tempDate = new Date(Date.now() - offset);

let checkDate = "20211219";
console.log(
  new Date(checkDate.slice(0, 4), checkDate.slice(4, 6), checkDate.slice(6, 8))
);

console.log(checkDate.slice(0, 4));
