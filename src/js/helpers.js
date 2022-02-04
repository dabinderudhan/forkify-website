// this file will contain the functions which are reused over the projects as helper functions.
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // we set a race between the fetch and timeout, if fetch takes time to get the data then timeout will throw the error which will be handled in the model.js file.
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // here we "throw" the "error" so that we can handle it in the model.js file.
  }
};

/*
// helper function to get the json of the url passed as argument.
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    // we set a race between the fetch and timeout, if fetch takes time to get the data then timeout will throw the error which will be handled in the model.js file.
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // here we "throw" the "error" so that we can handle it in the model.js file.
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url);
    // we set a race between the fetch and timeout, if fetch takes time to get the data then timeout will throw the error which will be handled in the model.js file.
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // here we "throw" the "error" so that we can handle it in the model.js file.
  }
};
*/
