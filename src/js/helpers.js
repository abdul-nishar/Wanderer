import { config } from "./config.js";

/**
 * Returns a rejected promise after a specified number of seconds.
 * @param {number} s - Time in seconds after which to reject the promise.
 * @returns {Promise<Error>} A promise that rejects with an error message.
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long. Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

/**
 * Makes an AJAX request to the specified URL.
 * @param {string} url - The URL to send the request to.
 * @param {Object} [uploadData=undefined] - Data to be sent with a POST request. If undefined, a GET request is made.
 * @returns {Promise<Object>} The resolved promise containing the fetched data.
 * @throws Will throw an error if the request fails or takes too long.
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // Awaiting the promise which gets resolved first
    const res = await Promise.race([fetchPro, timeout(config.timeoutSec)]);

    // Check if the response is OK
    if (!res.ok) throw new Error(`Request failed: ${res.statusText} (${res.status})`);

    // Storing the JSON object of the result
    const data = await res.json();
    return data;
  } catch (err) {
    // Handle network errors
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw err;
  }
};