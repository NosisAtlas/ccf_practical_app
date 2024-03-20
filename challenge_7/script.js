// Create objects
// Mark
const mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  // Method
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};
// John
const john = {
  fullName: "John Joe",
  mass: 85,
  height: 1.89,
  // Method
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

if (mark.bmi > john.bmi) {
  console.log("Mark is higher than John");
} else {
  console.log("John is higher than Mark");
}
