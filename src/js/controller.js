import * as model from "./model.js";
import landmarkView from "./views/landmarkView.js";
import mapView from "./views/mapView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarkView from "./views/bookmarkView.js";

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

const controlSearchResults = async function () {
  try {
    // Get search query and validating it
    const query = searchView.getQuery();
    // Load search query
    await model.loadSearchResults(query);
    // Render search query
    resultsView.render(model.getSearchResultsPage());
    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  // Changing the bookmarked state of the current recipe

  if (!model.state.landmark.bookmarked) model.addBookmark(model.state.landmark);
  else model.removeBookmark(model.state.landmark.id);

  // Updating the bookmark button
  landmarkView.update(model.state.landmark);

  // Rendering the bookmarks
  controlBookmarks();
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

/**
 * Calls the functions to be executed at the start of the page-load
 * Uses Publisher-Subscriber pattern
 */
const init = function () {
  bookmarkView.addHandlerBookmarks(controlBookmarks);
  landmarkView.addHandlerRender(controlLoadLandmark);
  landmarkView.addHandlerAddBookmark(controlAddBookmark);
  mapView.addHandler(controlMap);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
