import * as model from "./model.js";
import landmarkView from "./views/landmarkView.js";
import icons from "../img/icons.svg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let r = 2;
      let marker = {};
      let circle = {};
      let { latitude, longitude } = position.coords;
      const map = L.map("map").setView([latitude, longitude], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      const myIcon = new L.icon({
        iconUrl: require("../img/marker-icon.png"),
        iconSize: [20, 30],
        iconAnchor: [10, 30],
      });
      marker = L.marker([latitude, longitude], {
        icon: myIcon,
      })
        .addTo(map)
        .openPopup();
      circle = L.circle([latitude, longitude], { radius: r * 1000 }).addTo(map);

      map.on("click", function (e) {
        console.log(e.latlng);
        latitude = e.latlng.lat;
        longitude = e.latlng.lng;
        if (marker != undefined) {
          map.removeLayer(marker);
          marker = L.marker([latitude, longitude], {
            icon: myIcon,
          })
            .addTo(map)
            .openPopup();
        }

        if (circle != undefined) {
          map.removeLayer(circle);
          circle = L.circle([latitude, longitude], {
            radius: r * 1000,
          }).addTo(map);
        }
      });

      document
        .querySelector(".radius")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          r = document.querySelector(".radius-input").value;
          if (!r) r = 5;
          console.log(r);
          document.querySelector(".radius-input").innerHTML = "";
          if (circle != undefined) {
            map.removeLayer(circle);
            circle = L.circle([latitude, longitude], {
              radius: r * 1000,
            }).addTo(map);
          }
        });
    },
    function () {
      alert("Could not get your location");
    }
  );

/**
 * Controls the data flow between model, controller and landmarkView.js
 */

const controlLoadLandmark = async function () {
  try {
    // Stores the hash change that occurred in the address bar
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Rendering the spinner
    landmarkView.renderSpinner();

    // Awaiting the data from the server to change the state
    await model.loadLocation(id);

    // Rendering the new location based on new state
    landmarkView.render(model.state.landmark);
  } catch (err) {
    console.error(`${err} 🔴🔴`);
  }
};

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlLoadLandmark)
);
