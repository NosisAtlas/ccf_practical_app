"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// Workout parent class
class Workout {
  date = new Date();
  id = (new Date() + "").slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // In km
    this.duration = duration; // In min
  }
}

// Workout child class
class Running extends Workout {
  constructor(coords, distancen, duration, cadence) {
    super(coords, distancen, duration);
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    // In min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  constructor(coords, distancen, duration, elevationGain) {
    super(coords, distancen, duration);
    this.elevatelevationGain = elevationGain;
    this.calcSpeed();
  }
  calcSpeed() {
    // In km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Cycling([39, -12], 27, 95, 523);
console.log(run1, cycling1);

// Creating Appp class
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    // Handling form submission
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
  }
  _getPosition() {
    // Using the geolocation browser API
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        // fail callback
        function () {
          alert("Could not get your position");
        }
      );
  }
  _loadMap(position) {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);
    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];
    // Adding the leaflet code to preview the map
    // 13 is the number to set the box zoom on the map
    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // Handling clicks on map
    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }
  _newWorkout(e) {
    e.preventDefault();

    // Clearing inputs
    inputDistance.value =
      inputDuration.value =
      inputDistance.value =
      inputCadence.value =
      inputElevation.value =
        "";

    // Getting the click on map coords and display marker
    console.log(this.#mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("Running!")
      .openPopup();
  }
}

const app = new App();
