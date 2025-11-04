// socket.js
let io = null;

exports.initSocket = (server) => {
  io = require('socket.io')(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('✅ Socket connected:', socket.id);
  });

  return io; // ✅ very important
};

exports.broadcastRobotUpdate = (robot) => {
  if (io) io.emit('robotUpdate', robot);
};
