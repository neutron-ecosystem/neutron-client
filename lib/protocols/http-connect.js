const http = require('../utils/http');
const join = require('url-join');

module.exports = ({ host, method, funcName, props }) => {
  const url = join(host, 'connect/execute');
  return http[method.toLowerCase()](url, Object.assign({}, props, {
    funcName
  }));
};
