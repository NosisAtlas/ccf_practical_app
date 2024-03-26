"use strict";

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const ElecV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Linking the prototypes
ElecV.prototype = Object.create(Car.prototype);

ElecV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

ElecV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}`
  );
};

const tesla = new ElecV("Tesla", 120, 27);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();
