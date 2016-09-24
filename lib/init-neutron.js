const http = require('./utils/http');
const join = require('url-join');
const creatClientContext = require('./create-client-context');

const getConnectionUrl = ({
  host
}) => {
  return join(host, '/connect/client');
};

module.exports = (options) => {
  const url = getConnectionUrl(options);

  return http.get(url)
    .then(response => response.json())
    .then(response => creatClientContext(response));
};
