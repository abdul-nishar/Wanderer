import L from "leaflet";
import View from "./View.js";
import "leaflet/dist/leaflet.css";
import { MAP_SCALE } from "../config.js";

class MapView extends View {
  _formRadius = document.querySelector(".radius");
  _radiusInput = document.querySelector(".radius-input");
  _latitude;
  _longitude;
  _areaRadius;
  _marker;
  _circle;
  _map;

  constructor() {
    super();
    this._generateMap();
    // this._addHandlerClick(this._changeMarkerPosition);
    this._addHandlerRadiusChange();
  }

  _changeMarkerPosition(e) {
    console.log(e);
    this._latitude = e.latlng.lat;
    this._longitude = e.latlng.lng;
    if (this._marker != undefined) {
      this._map.removeLayer(this._marker);
      this._marker = L.marker([this._latitude, this._longitude], {
        icon: myIcon,
      })
        .addTo(this._map)
        .openPopup();
    }

    if (this._circle != undefined) {
      this._map.removeLayer(this._circle);
      this._circle = L.circle([this._latitude, this._longitude], {
        radius: this._areaRadius * 1000,
      }).addTo(this._map);
    }
  }

  _addHandlerClick(handler) {
    console.log(this);
    this._map.on("click", handler);
  }

  _generateMap() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        function (position) {
          this._areaRadius = 3;
          this._latitude = position.coords.latitude;
          this._longitude = position.coords.longitude;

          this._map = L.map("map").setView(
            [this._latitude, this._longitude],
            MAP_SCALE
          );
          L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(this._map);
          const myIcon = new L.icon({
            iconUrl: require("../../img/marker-icon.png"),
            iconSize: [20, 30],
            iconAnchor: [10, 30],
          });
          this._marker = L.marker([this._latitude, this._longitude], {
            icon: myIcon,
          })
            .addTo(this._map)
            .openPopup();
          this._circle = L.circle([this._latitude, this._longitude], {
            radius: this._areaRadius * 1000,
          }).addTo(this._map);
        }.bind(this),
        function () {
          alert("Could not get your location");
        }
      );
  }

  _addHandlerRadiusChange() {
    this._formRadius.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        this._areaRadius = this._radiusInput.value;
        if (!this._areaRadius) this._areaRadius = 5;
        this._radiusInput.value = "";
        if (this._circle != undefined) {
          this._map.removeLayer(this._circle);
          this._circle = L.circle([this._latitude, this._longitude], {
            radius: this._areaRadius * 1000,
          }).addTo(this._map);
        }
      }.bind(this)
    );
  }
}

export default new MapView();
