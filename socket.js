let io= null;

exports.initSocket = (server) => {
    io = require('socket.io')(server, { cors: { origin: '*' } });
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
    });
};

exports.broadcastRobotUpdate = (robot) => {
    if (io) io.emit('robotUpdate', robot);
};