let io = null;

exports.initSocket = (server) => {
  io = require('socket.io')(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('✅ Socket connected:', socket.id);
  });

  return io; // important to return instance
};

exports.broadcastRobotUpdate = (robot) => {
  if (io) io.emit('robotUpdate', robot);
};
