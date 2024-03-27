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

//
const loadNPause = async function () {
  try {
    // load img 1
    let img = await createImage("imgs/img-1.jpg");
    console.log("Img 1 loaded");
    await wait(2);
    img.style.display = "none";

    // load img 2
    img = await createImage("imgs/img-2.jpg");
    console.log("Img 2 loaded");
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error(err);
  }
};

loadAll(["imgs/img-1.jpg", "imgs/img-2.jpg", "imgs/img-3.jpg"]);
