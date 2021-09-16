const { Server } = require("socket.io");
const port = process.env.PORT || 3333;

const io = new Server(
    port,
    { 
      serveClient: false,
      cors: { origin: 'http://localhost:4200', methods: ["GET", "POST"] }
    }    
);

const usersList = [];

io.on('connection', (socket) => {
    socket.on('new message', (data) => {
      socket.emit('new message', {
        username: socket.username,
        message: data
      });
    });
  
    socket.on('add user', (name) => {
      const newUser = { id: socket.id, name }
      usersList.push(newUser);
      console.log('usersList', usersList);

      socket.emit('users list', usersList);
    });
  });