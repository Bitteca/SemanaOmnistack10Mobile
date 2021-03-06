import sockeio from 'socket.io-client';

const socket = sockeio('http://192.168.25.19:3333', {
  autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
  socket.on('dev-updt', subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };
  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeToNewDevs };
