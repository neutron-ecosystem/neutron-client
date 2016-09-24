const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const serializeParams = (json = {}) => {
  return '?' +
    Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    }).join('&');
}

module.exports =  {
  get: (url, props) => fetch(`${url}${serializeParams(props)}`, {
      method: 'GET',
      headers: HEADERS
  }),

  post: (url, body) => fetch(url, {
    method: 'POST',
    headers: HEADERS,
    body
  })
};
