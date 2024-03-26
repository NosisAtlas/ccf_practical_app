"use strict";

class CarClass {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  get speedUS() {
    return this.speed / 1.6;
  }
}

class ElecV extends CarClass {
  constructor(make, speed, charge) {
    super(make, speed);
    this.charge = charge;
  }
  chargeBattery(chargeTo) {
    this.charge = chargeTo;
  }

  accelerate() {
    this.speed += 20;
    this.charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}`
    );
  }
}

const rolls = new ElecV("Rolls", 120, 27);
rolls.chargeBattery(90);
console.log(rolls);
rolls.brake();
rolls.accelerate();
