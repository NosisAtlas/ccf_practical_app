"use strict";
// New API URL: https://countries-api-836d.onrender.com/countries/

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

// Rendering data to display it in html
const renderCountry = function (data, className = "") {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${Object.values(
          data.languages
        ).join(", ")}</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        } (${Object.values(data.currencies)[0].symbol})</p>
    </div>
    </article>`;
  // Inserting data code to html
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////// OLD METHODE //////////////////////////////////////

// Getting the country data
const getCountryData = function (country) {
  // Ajax call main country
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Calling the rendering data to display it
    renderCountry(data);

    // Get neighbour countries
    const [neighbour] = data.borders;
    getCountryNeighbour(neighbour);
  });
};

const getCountryNeighbour = function (neighbour) {
  if (!neighbour) return;
  // Ajax call main country
  const requestNeighbour = new XMLHttpRequest();
  requestNeighbour.open(
    "GET",
    `https://restcountries.com/v3.1/alpha/${neighbour}`
  );
  requestNeighbour.send();
  requestNeighbour.addEventListener("load", function () {
    const [dataNeighbour] = JSON.parse(this.responseText);
    console.log(dataNeighbour);
    // Calling the rendering data to display it
    renderCountry(dataNeighbour, "neighbour");
  });
};

// getCountryData("portugal");
// getCountryData("Kingdom of Morocco");

//////////////////////////// NEW METHODE /////////////////////////////////

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const newGetCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      (response) => response.json(),
      (err) => alert(err)
    )
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log(data);
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((dataNeighbour) => {
      renderCountry(dataNeighbour[0], "neighbour");
    })
    .catch((err) => {
      console.log(err);
      renderError("Somethign went wrong! " + err.message);
    });
};

// newGetCountryData("portugal");
btn.addEventListener("click", function () {
  newGetCountryData("Kingdom of Morocco");
});
