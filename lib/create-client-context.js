const httpConnect = require('./protocols/http-connect');
const socketConnect = require('./protocols/socket-connect');

const execute = (funcName, func, props) => {
  const { protocols, host } = func;

  if (false && protocols.socket) {
    return socketConnect({ host, funcName, props });
  } else if (protocols.http){
    const { method } = protocols;
    return httpConnect({ host: 'http://localhost:9001', method, funcName, props });
    // return httpConnect({ host, method, funcName, props });
  } else{
    throw new Error('can not detect function protocol');
  }
};

module.exports = ({
  connection,
  functions,
  protocols
}) => {
  const clientContext = {};

  for (const funcName of Object.keys(functions)) {
    const func = functions[funcName];

    clientContext[funcName] = execute.bind(null, funcName, func);
  }

  return clientContext;
};
