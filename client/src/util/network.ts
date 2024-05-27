import { BASE_URL } from "./apiConstants";

const fetchRequest = ({
  url,
  method = "GET",
  mode = "cors",
  body,
  headers,
}) => {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method,
      // @ts-expect-error TS(2769): No overload matches this call.
      mode,
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) reject(result.error);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const createURL = (route, params, base_url = BASE_URL) => {
  let url = new URL(base_url + route);
  // @ts-expect-error TS(2322): Type 'URLSearchParams' is not assignable to type '... Remove this comment to see the full error message
  url.search = new URLSearchParams(params);
  return url;
};

export { fetchRequest, createURL };
