let io = null;

exports.initSocket = (server) => {
  io = require('socket.io')(server, { cors: { origin: '*' } });

  // 🧑‍🍳 Handle new socket connections
  io.on('connection', (socket) => {
    console.log('🧑‍🍳 Kitchen connected:', socket.id);

    // 👨‍🍳 When a cooker updates an order status
    socket.on('orderStatusChange', (data) => {
      console.log('📦 Order updated by cooker:', data);
      io.emit('orderUpdated', data); // broadcast to all clients (manager, cookers, etc.)
    });

    // 👋 Disconnect event
    socket.on('disconnect', () => {
      console.log('❌ Kitchen disconnected:', socket.id);
    });
  });

  return io; // must return so server.js can access io
};

// 🔵 For broadcasting robot updates (keep this for your robot logic)
exports.broadcastRobotUpdate = (robot) => {
  if (io) io.emit('robotUpdate', robot);
};

// 🔵 For broadcasting new/updated orders from routes or controllers
exports.broadcastOrder = (eventName, orderData) => {
  if (io) io.emit(eventName, orderData);
};
