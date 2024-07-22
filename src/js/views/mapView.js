import View from "./View.js";

/**
 * Class representing the map view
 * @extends View
 */
class MapView extends View {
  /**
   * @private fields
   */
  _parentEl = document.querySelector("#map") || document.createElement('div');
  _data;

  /**
   * Adds event listener for loading the map
   * @param {Function} handler - The event handler function
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
   * Calls the handler function with the geolocation object if the user allows, otherwise alerts
   * @param {Function} handler - The event handler function
   */
  generateMap(handler) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handler,
        function () {
          alert("Could not get your location. Please enable location services and try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }
}

export default new MapView();
