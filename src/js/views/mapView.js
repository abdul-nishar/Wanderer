import L from "leaflet";
import View from "./View.js";
import "leaflet/dist/leaflet.css";
import { MAP_SCALE } from "../config.js";

/**
 * Class representing the map View
 * @extends View
 */
class MapView extends View {
  /**
   * @private fields
   */
  _parentEl = document.querySelector("#map");
  _formRadius = document.querySelector(".radius");
  _radiusInput = document.querySelector(".radius-input");
  _data;

  /**
   * Handles the loading of the map
   * @param {Function} handler
   */
  addHandler(handler) {
    window.addEventListener("load", handler);
    // window.addEventListener("load", function () {
    //   if (localStorage.getItem("hasCodeRunBefore") === null) {
    //     handler();
    //     localStorage.setItem("hasCodeRunBefore", true);
    //   }
    // });
  }

  /**
   * Calls the handler function with the geolocation object if the user allows else alerts
   * @param {Function} handler
   */
  generateMap(handler) {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(handler, function () {
        alert("Could not get your location");
      });
  }

  /**
   * Handles the change of circle radius on submit event
   */
  addHandlerRadiusChange(handler) {
    this._formRadius.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  /**
   * Returns the radius from the form and clears the form
   * @returns {number} radius value from the user input field
   */
  getRadius() {
    const radius = this._radiusInput.value;
    this._radiusInput.value = "";
    return radius;
  }
}

export default new MapView();
