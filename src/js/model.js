import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
import { AJAX, removeJSON } from "./helpers.js";

/**
 * Stores the current state of the page
 * @property {object} landmark - stores the data of the current landmark
 */

export const state = {
  landmark: {},
  //   bookmarks: [],
  //   search: {
  //     query: "",
  //     page: 1,
  //     resultsPerPage: RES_PER_PAGE,
  //     recipes: [],
  //   },
};

/**
 * Creating an object from the API data
 * @param {*} data
 * @returns {object}
 */

const createRecipeObject = function (data) {
  return {
    id: data.xid,
    name: data.name,
    longitude: data.point.lon,
    latitude: data.point.lat,
    image: data.preview.source,
    address: data.address,
    description: data.wikipedia_extracts.text,
    sourceUrl: data.wikipedia,
  };
};

/**
 * Makes an API request to the server and stores the result in the state object
 * @param {*} id
 * @async
 */

export const loadLocation = async function (id) {
  try {
    // Awaiting the API response
    const data = await AJAX(`${API_URL}/xid/${id}?apikey=${KEY}`);

    // Storing the awaited response in the state by creating a new object
    state.landmark = createRecipeObject(data);
    console.log(data);
  } catch (err) {
    console.error(`${err} 🔴🔴`);
    throw err;
  }
};
