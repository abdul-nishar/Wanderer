import { TIMEOUT_SEC } from "./config.js";

/**
 * Returns rejected promise after s seconds
 * @param {*} s Time(in sec) after which to reject the promise
 * @returns {Promise}
 */

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long. Timout after ${s} seconds`));
    }, s * 1000);
  });
};

/**
 *
 * @param {*} url
 * @param {object}[ uploadData=undefined]
 * @const {fetchRequest} fetchPro fetches a POST request if uploadData is defined else fetches a GET request and stores the response
 * @const {Promise <fetchPro | timeout>} res stores the promise who wins the Promise race(fetchPro, timeout)
 * @returns {Promise <fetchPro | timeout>} returns the resolved promise
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
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    //Storing the JSON object of the result
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
