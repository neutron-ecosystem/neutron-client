const socketIO = require('socket.io-client');
const { uniqueId } = require('lodash');

const openedConnections = new Map();

const DEFAULT_SOCKET_OPTIONS = {
  reconnection: false
};

const EXECUTE_FUNCTION_EVENT = 'executeFunction';

const getSocket = host => {
  let connection = null;
  if (openedConnections.has(host)) {
    connection = openedConnections.get(host);
  } else {
    connection = socketIO(host, DEFAULT_SOCKET_OPTIONS);
    openedConnections.set(host, openedConnections);

    connection.on('disconnect', () => openedConnections.delete(host));
  }

  return connection;
};

module.exports = ({ host, funcName, props }) => {
  const socket = getSocket(host);

  return new Promise((resolve, reject) => {
    const uid = uniqueId();

    socket.emit(EXECUTE_FUNCTION_EVENT, {
      funcName,
      props,
      uid,
    });

    socket.once(`${EXECUTE_FUNCTION_EVENT} done ${uid}`, ({response}) => {
      if (!response.error) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};
