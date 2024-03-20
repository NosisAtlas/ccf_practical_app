// MARK
const massMark = 78;
const heightMark = 1.69;

// JOHN
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / heightJohn ** 2;

const markHigherBMI = BMIMark > BMIJohn;
const johnHigherBMI = BMIJohn > BMIMark;

console.log(BMIMark, BMIJohn, markHigherBMI, johnHigherBMI);
