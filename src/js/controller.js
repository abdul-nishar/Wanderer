import * as model from "./model.js";
import landmarkView from "./views/landmarkView.js";
import icons from "../img/icons.svg";
import mapView from "./views/mapView.js";

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

const init = function () {
  landmarkView.addHandlerRender(controlLoadLandmark);
  // mapView._addHandlerClick(mapView._changeMarkerPosition);
};

init();
