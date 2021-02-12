
const fetchRequest = ({ url, method = "GET", mode = "cors", body, headers }) => {
  return new Promise(function(resolve,reject) {
    fetch(url, {
      method,
      mode,
      headers,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then((result) => {
      if(result.error) reject(result.error);
      resolve(result);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    })
  });
}

export {
  fetchRequest
}