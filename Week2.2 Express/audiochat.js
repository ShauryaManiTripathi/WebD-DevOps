const express = require('express');
const https = require('https');              // Use https instead of http
const { Server } = require('socket.io');
const fs = require('fs');                    // To read your certificate files
const path = require('path');

// Read the SSL certificate and key files
const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
  
};
// Ensure the server binds to all network interfaces
const HOST = '0.0.0.0';
const app = express();

// Create HTTPS server using the certificate options
const server = https.createServer(options, app);

// Initialize Socket.io on the HTTPS server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve room route
app.get('/:room', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    
    // Notify everyone in the room about the new user
    socket.to(roomId).emit('user-connected', socket.id);
    
    // Send the list of existing users to the new user
    const roomClients = io.sockets.adapter.rooms.get(roomId);
    const usersInRoom = roomClients ? [...roomClients].filter(id => id !== socket.id) : [];
    if(usersInRoom.length > 0) {
      socket.emit('existing-users', usersInRoom);
      console.log(`Notifying ${socket.id} about existing users:`, usersInRoom);
    }

    // Relay ICE candidates
    socket.on('ice-candidate', (candidate, targetId) => {
      console.log(`ICE candidate from ${socket.id} to ${targetId}`);
      io.to(targetId).emit('ice-candidate', candidate, socket.id);
    });

    // Relay SDP offers/answers
    socket.on('sdp', (description, targetId) => {
      console.log(`SDP ${description.type} from ${socket.id} to ${targetId}`);
      io.to(targetId).emit('sdp', description, socket.id);
    });
    
    // New event to request audio stream specifically
    socket.on('request-audio', (targetId) => {
      console.log(`User ${socket.id} requesting audio from ${targetId}`);
      io.to(targetId).emit('audio-requested', socket.id);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected from room ${roomId}`);
      socket.to(roomId).emit('user-disconnected', socket.id);
    });
  });
});

// Start the server with HTTPS
server.listen(PORT, HOST, () => {
  console.log(`Server is running on https://${HOST}:${PORT}`);
});
