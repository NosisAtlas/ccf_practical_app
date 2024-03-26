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
let map, mapEvent;
// Using the geolocation browser API
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    // success callback
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(latitude, longitude);
      console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
      const coords = [latitude, longitude];
      // Adding the leaflet code to preview the map
      // 13 is the number to set the box zoom on the map
      map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      // Handling clicks on map
      map.on(
        "click",
        function (mapE) {
          mapEvent = mapE;
          form.classList.remove("hidden");
          inputDistance.focus();
        },
        // fail callback
        function () {
          alert("Could not get your position");
        }
      );

      // Handling form submission
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Clearing inputs
        inputDistance.value =
          inputDuration.value =
          inputDistance.value =
          inputCadence.value =
          inputElevation.value =
            "";

        // Getting the click on map coords and display marker
        console.log(mapEvent);
        const { lat, lng } = mapEvent.latlng;
        L.marker([lat, lng])
          .addTo(map)
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
      });
    }
  );

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
