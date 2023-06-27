import {
  API_URL_PLACES,
  API_URL_PLACES_DETAILS,
  GOOGLE_CUSTOM_SEARCH_URL,
  GOOGLE_SEARCH_KEY,
  KEY,
  SERPAPI_KEY,
  SERPAPI_URL,
} from "./config.js";
import { AJAX, removeJSON } from "./helpers.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_SCALE } from "./config.js";

/**
 * Stores the current state of the page
 * @property {object} landmark - stores the data of the current landmark
 */

export const state = {
  landmark: {
    images: [],
  },
  mapVariables: {},
  //   bookmarks: [],
  search: {
    query: "",
    page: 1,
    // resultsPerPage: RES_PER_PAGE,
    landmarks: [],
  },
};

/**
 * Creating an object from the API data
 * @param {*} data
 * @returns {object}
 */

const createRecipeObject = function (data) {
  return {
    id: data.place_id,
    name: data.name,
    longitude: data.lon,
    latitude: data.lat,
    address: [
      ["House Number", data.housenumber],
      ["Street Name", data.street],
      ["State", data.state],
      ["Post Code", data.postcode],
      ["City", data.city],
      ["Country", data.country],
    ],
    type: data.commercial.type,
  };
};

/**
 * Makes multiple API requests to the server and stores the result in the state object
 * @param {*} id
 * @async
 */

export const loadLocation = async function (id) {
  try {
    // Awaiting the API response - API Call for location details
    const data = await AJAX(
      `${API_URL_PLACES_DETAILS}?features=details,wiki_and_media.image&id=${id}&apiKey=${KEY}`
    );

    // Storing the awaited response in the state by creating a new object
    state.landmark = createRecipeObject(data.features[0].properties);
    state.landmark.images = [];

    // API Call for images
    const imageData = await AJAX(
      `${GOOGLE_CUSTOM_SEARCH_URL}?key=${GOOGLE_SEARCH_KEY}&cx=368b63b3f469a43b7&q=${state.landmark.name}&searchType=image`
    );
    for (let i = 0; i < 9; i++) {
      state.landmark.images.push(imageData.items[i].link);
    }

    // API Call for wikipedia Data
    const wikiData = await AJAX(
      `${GOOGLE_CUSTOM_SEARCH_URL}?key=${GOOGLE_SEARCH_KEY}&cx=368b63b3f469a43b7&q=${state.landmark.name}&siteSearch=https://en.wikipedia.org&siteSearchFilter=i`
    );
    state.landmark.wikiData = wikiData;
  } catch (err) {
    console.error(`${err} 🔴🔴`);
    throw err;
  }
};

/**
 * Loads the current position on the map using leaflet API and stores the current state
 * @param {Event} position - event object to get the latitude,longitude of our current position
 */
export const loadMap = function (position) {
  // Stores the mapVariables in the state
  state.mapVariables.areaRadius = 3;
  state.mapVariables.latitude = position.coords.latitude;
  state.mapVariables.longitude = position.coords.longitude;

  // Declaring constants for ease of use
  const { latitude, longitude, areaRadius } = state.mapVariables;

  // Creating the map and storing it in the state object
  state.mapVariables.map = L.map("map").setView(
    [latitude, longitude],
    MAP_SCALE
  );
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(state.mapVariables.map);
  state.mapVariables.myIcon = new L.icon({
    iconUrl: require("../img/marker-icon.png"),
    iconSize: [20, 30],
    iconAnchor: [10, 30],
  });

  // Creating a marker and circle in the map and storing it in the state object
  state.mapVariables.marker = L.marker([latitude, longitude], {
    icon: state.mapVariables.myIcon,
  })
    .addTo(state.mapVariables.map)
    .openPopup();
  state.mapVariables.circle = L.circle([latitude, longitude], {
    radius: areaRadius * 1000,
  }).addTo(state.mapVariables.map);

  // This function is called here because it's not possible to call this function in the view files without importing model to them
  _changeMarkerPosition();
};

/**
 * Changes the radius of the marker and stores it in the state object
 * @param {number} radius - radius of the marker as specified by the user
 */
export const changeMapRadius = function (radius) {
  // Guard clause to check if radius is undefined
  if (!radius) state.mapVariables.areaRadius = 5;
  else state.mapVariables.areaRadius = radius;

  // Checking if circle already exists
  if (state.mapVariables.circle != undefined) {
    // Removing the existing circle from the map and the state object
    state.mapVariables.map.removeLayer(state.mapVariables.circle);
    //  Adding the new circle to the map and the state object using the existing latitude and longitude
    state.mapVariables.circle = L.circle(
      [state.mapVariables.latitude, state.mapVariables.longitude],
      {
        radius: radius * 1000,
      }
    ).addTo(state.mapVariables.map);
  }
};

/**
 * Function to change the marker and circle based on the position of the click
 * @todo Find a way to make this function even if the map event is on mapView file
 * @private
 */
export const _changeMarkerPosition = function () {
  // Using a variable for ease of use
  let data = state.mapVariables;
  // Listening to the map event to change the state and update the marker and circle
  data.map.on("click", function (e) {
    data.latitude = e.latlng.lat;
    data.longitude = e.latlng.lng;
    if (data.marker != undefined) {
      data.map.removeLayer(data.marker);
      data.marker = L.marker([data.latitude, data.longitude], {
        icon: data.myIcon,
      })
        .addTo(data.map)
        .openPopup();
    }

    if (data.circle != undefined) {
      data.map.removeLayer(data.circle);
      data.circle = L.circle([data.latitude, data.longitude], {
        radius: data.areaRadius * 1000,
      }).addTo(data.map);
    }
  });
};

export const loadSearchResults = async function (query) {
  try {
    console.log(query);
    const data = await AJAX(
      `${API_URL_PLACES}/autosuggest?name=${query}&radius=${
        state.mapVariables.areaRadius * 1000
      }&lon=${state.mapVariables.longitude}&lat=${
        state.mapVariables.latitude
      }&limit=30&apikey=${KEY}`
    );
    state.search.query = query;
    console.log(data);
    // state.search.landmarks = data.data.recipes.map((rec) => {
    //   return {
    //     id: rec.id,
    //     title: rec.title,
    //     publisher: rec.publisher,
    //     image: rec.image_url,
    //     ...(rec.key && { key: rec.key }),
    //   };
    // });
  } catch (err) {
    console.error(`${err} 🔴🔴`);
    throw err;
  }
};
