import View from "./View.js";

/**
 * Class representing the map View
 * @extends View
 */
class MapView extends View {
  /**
   * @private fields
   */
  _parentEl = document.querySelector("#map");
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
}

export default new MapView();
