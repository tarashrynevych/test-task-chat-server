const { Server } = require("socket.io");
const port = process.env.PORT || 3333;

const io = new Server(
    port,
    { 
      serveClient: false,
      cors: { origin: 'http://localhost:4200', methods: ["GET", "POST"] }
    }    
);

let usersList = [];

io.on('connection', (socket) => {
    socket.on('new message', (message) => {
      const newMessage = {
        userName: socket.userName,
        userId: socket.id,
        date: new Date(),
        message
      };

      io.emit('new message', newMessage);
    });
  
    socket.on('add user', (name) => {
      socket.userName = name;
      const newUser = { id: socket.id, name }
      usersList = [...usersList, newUser];

      io.emit('users list updated', usersList);
    });

    socket.on('disconnect', () => {
      usersList = usersList.filter((user) => user.id !== socket.id)

      socket.broadcast.emit('users list updated', usersList);
    });
  });