const io = require('socket.io')(3000);

const users = {};

io.on('connection', socket=>{
    // socket.emit('chat-message', "Connected");
    socket.on("names",name=>{
        users[socket.id] = name;
        socket.broadcast.emit("user-connected",name);
    })
    socket.on("send-messages", message=>{
        socket.broadcast.emit("chat-message",{message:message , name:users[socket.id]});
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-disconnected", users[socket.id]);
        delete users[socket.id]
    })
})