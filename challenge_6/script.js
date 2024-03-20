// Calc tips
const calcTip = function (bill) {
  return bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
};

// Calc Total
const calcTotal = function (bill, tip) {
  return bill + tip;
};

const bills = [430, 134, 25];
const tips = [];
let total = 0;

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  total += calcTotal(bills[i], tip);
}

console.log("Bills:", bills);
console.log("Tips:", tips);
console.log("Total:", total);
