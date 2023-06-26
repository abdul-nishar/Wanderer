import * as model from "./model.js";
import landmarkView from "./views/landmarkView.js";
import mapView from "./views/mapView.js";
import searchView from "./views/searchView.js";

/**
 * Handler function to be called when page is loaded or hash is changed which changes the current landmark view
 * @async
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

/**
 * Handler function to be called when page is loaded to display the map
 */
const controlMap = function () {
  try {
    // Rendering the spinner
    mapView.renderSpinner();
    // Loads the current location on the map
    mapView.generateMap(model.loadMap);
  } catch (err) {
    console.error(`${err} 🔴🔴`);
  }
};

// /**
//  * Handler function to be called when user submits the new radius
//  */
// const controlMapRadius = function () {
//   try {
//     // Storing the return value from the getRadius method
//     const areaRadius = mapView.getRadius();
//     // Re-renders the circle with new radius
//     model.changeMapRadius(areaRadius);
//   } catch (err) {
//     console.error(`${err} 🔴🔴`);
//   }
// };

// const controlSearchResults = async function () {
//   try {
//     // Get search query
//     const query = searchView.getQuery();
//     if (!query) return;
//     // Load search query
//     await model.loadSearchResults(query);
//     // Render search query
//     // resultsView.render(model.getSearchResultsPage());
//     // Render initial pagination buttons
//     // paginationView.render(model.state.search);
//   } catch (err) {
//     console.log(err);
//   }
// };

/**
 * Calls the functions to be executed at the start of the page-load
 * Uses Publisher-Subscriber pattern
 */
const init = function () {
  landmarkView.addHandlerRender(controlLoadLandmark);
  mapView.addHandler(controlMap);
  // mapView.addHandlerRadiusChange(controlMapRadius);
  // searchView.addHandlerSearch(controlSearchResults);
};

init();
