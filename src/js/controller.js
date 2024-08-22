import dotenv from 'dotenv';
dotenv.config();

import * as model from './model.js';
import landmarkView from './views/landmarkView.js';
import mapView from './views/mapView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

function removeHash() {
  if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
  }
}

/**
 * Loads and renders a specific landmark based on the URL hash.
 * @async
 * @function controlLoadLandmark
 * @returns {Promise<void>}
 */
const controlLoadLandmark = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    landmarkView.renderSpinner();
    await model.loadLocation(id);
    landmarkView.render(model.state.landmark);
  } catch (err) {
    console.error(`Error loading landmark: ${err} 🔴🔴`);
  }
};

/**
 * Initializes and renders the map with the current location.
 * @function controlLoadMap
 * @returns {void}
 */
const controlLoadMap = function () {
  try {
    mapView.renderSpinner();
    mapView.generateMap(model.loadMap);
  } catch (err) {
    console.error(`Error loading map: ${err} 🔴🔴`);
  }
};

/**
 * Handles search results based on user query.
 * @async
 * @function controlSearchResults
 * @returns {Promise<void>}
 */
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`Error fetching search results: ${err} 🔴🔴`);
  }
};

/**
 * Handles pagination control for search results.
 * @function controlPagination
 * @param {number} goToPage - The page number to navigate to.
 * @returns {void}
 */
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

/**
 * Adds or removes a bookmark for the current landmark.
 * @function controlAddBookmark
 * @returns {void}
 */
const controlAddBookmark = function () {
  if (!model.state.landmark.bookmarked) {
    model.addBookmark(model.state.landmark);
  } else {
    model.removeBookmark(model.state.landmark.id);
  }
  landmarkView.update(model.state.landmark);
  controlBookmarks();
};

/**
 * Renders the list of bookmarks.
 * @function controlBookmarks
 * @returns {void}
 */
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

/**
 * Initializes the application by setting up event handlers.
 * @function init
 * @returns {void}
 */
const init = function () {
  bookmarkView.addHandlerBookmarks(controlBookmarks);
  landmarkView.addHandlerRender(controlLoadLandmark);
  landmarkView.addHandlerAddBookmark(controlAddBookmark);
  mapView.addHandler(controlLoadMap);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  window.addEventListener('load', removeHash);
};

init();