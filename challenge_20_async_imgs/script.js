"use strict";

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgsContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;
    img.addEventListener("load", function () {
      // Add img to imgs container
      imgsContainer.append(img);
      resolve(img);
    });
    img.addEventListener("error", function () {
      reject(new Error("Image not found!"));
    });
  });
};

let currentImg;

createImage("imgs/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log("Img 1 loaded");
    return wait(2);
  })
  .then(() => {
    // Hiding current image
    currentImg.style.display = "none";
    // Displaying next image
    return createImage("imgs/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log("Img 2 loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch((err) => console.error(err));
