// Initialize connection to Socket.io server
const socket = io();

// Configuration for STUN/TURN servers
const peerConnectionConfig = {
  iceServers: [
    { urls: 'stun:stun.stunprotocol.org:3478' },
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};

// Store all peer connections
const peerConnections = {};
let localStream = null;

// Get room ID from URL or create a random one
let roomId = '';
if (window.location.pathname.startsWith('/') && window.location.pathname.length > 1) {
  roomId = window.location.pathname.substring(1);
} else {
  roomId = createUUID();
  window.history.replaceState(null, null, `/${roomId}`);
}

// Display room ID on page
document.getElementById('roomId').textContent = roomId;

// Join the room when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Join the room when page loads
  startMedia();
});

async function startMedia() {
  try {
    // Get user media with audio only
    localStream = await navigator.mediaDevices.getUserMedia({ 
      audio: true, 
      video: false 
    });
    
    // Display local audio stream
    const localAudio = document.getElementById('localAudio');
    localAudio.srcObject = localStream;
    localAudio.play().catch(e => console.log('Auto-play prevented:', e));
    
    document.getElementById('localStatus').textContent = 'Your microphone is active';
    
    // Now we have media, join the room
    socket.emit('join-room', roomId);
    
    // Set up event listeners for Socket.io events
    setupSocketListeners();
  } catch (error) {
    console.error('Error accessing media devices:', error);
    document.getElementById('localStatus').textContent = 'Failed to access microphone: ' + error.message;
  }
}

function setupSocketListeners() {
  // When a new user joins the room
  socket.on('user-connected', userId => {
    console.log('New user connected:', userId);
    document.getElementById('connectionStatus').textContent = 'Connected with: ' + userId.substring(0, 5) + '...';
    // Create a peer connection for the new user
    createPeerConnection(userId, true);
  });

  // When receiving the list of existing users
  socket.on('existing-users', userIds => {
    console.log('Existing users in the room:', userIds);
    if (userIds.length > 0) {
      document.getElementById('connectionStatus').textContent = 
        'Connected with: ' + userIds.map(id => id.substring(0, 5) + '...').join(', ');
      userIds.forEach(userId => {
        createPeerConnection(userId, true);
      });
    }
  });

  // When receiving ICE candidate from another peer
  socket.on('ice-candidate', (candidate, fromUserId) => {
    console.log('Received ICE candidate from', fromUserId);
    if (peerConnections[fromUserId]) {
      peerConnections[fromUserId].addIceCandidate(new RTCIceCandidate(candidate))
        .catch(e => console.error('Error adding ICE candidate:', e));
    }
  });

  // When receiving SDP (offer or answer) from another peer
  socket.on('sdp', async (description, fromUserId) => {
    console.log(`Received ${description.type} from`, fromUserId);
    
    // Create peer connection if it doesn't exist
    if (!peerConnections[fromUserId]) {
      createPeerConnection(fromUserId, false);
    }
    
    const pc = peerConnections[fromUserId];
    
    // Set the remote description
    await pc.setRemoteDescription(new RTCSessionDescription(description))
      .catch(e => console.error('Error setting remote description:', e));
    
    // If we received an offer, create and send an answer
    if (description.type === 'offer') {
      const answer = await pc.createAnswer()
        .catch(e => console.error('Error creating answer:', e));
      if (answer) {
        await pc.setLocalDescription(answer)
          .catch(e => console.error('Error setting local description:', e));
        socket.emit('sdp', pc.localDescription, fromUserId);
      }
    }
  });

  // When another user specifically requests audio
  socket.on('audio-requested', fromUserId => {
    console.log('Audio requested from:', fromUserId);
    // Make sure we have a connection and send our stream
    if (!peerConnections[fromUserId]) {
      createPeerConnection(fromUserId, true);
    }
  });

  // When a user disconnects
  socket.on('user-disconnected', userId => {
    console.log('User disconnected:', userId);
    if (peerConnections[userId]) {
      peerConnections[userId].close();
      delete peerConnections[userId];
      
      // Remove the audio element if it exists
      const audioElement = document.getElementById(`audio-${userId}`);
      if (audioElement) {
        const container = audioElement.parentNode;
        audioElement.remove();
        
        // Also remove the label if it exists
        const label = document.getElementById(`label-${userId}`);
        if (label) label.remove();
      }
      
      // Update connection status
      updateConnectionStatus();
    }
  });
}

function updateConnectionStatus() {
  const connectedUsers = Object.keys(peerConnections);
  if (connectedUsers.length === 0) {
    document.getElementById('connectionStatus').textContent = 'Waiting for other participants...';
  } else {
    document.getElementById('connectionStatus').textContent = 
      'Connected with: ' + connectedUsers.map(id => id.substring(0, 5) + '...').join(', ');
  }
}

function createPeerConnection(userId, isInitiator) {
  console.log(`Creating ${isInitiator ? 'initiator' : 'receiver'} peer connection for user:`, userId);
  
  // If we already have a connection to this user, close it
  if (peerConnections[userId]) {
    peerConnections[userId].close();
  }
  
  const pc = new RTCPeerConnection(peerConnectionConfig);
  peerConnections[userId] = pc;

  // Add our local stream
  if (localStream) {
    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });
  } else {
    console.warn('Local stream not available when creating peer connection');
  }

  // Handle ICE candidates
  pc.onicecandidate = event => {
    if (event.candidate) {
      socket.emit('ice-candidate', event.candidate, userId);
    }
  };

  // Handle ICE connection state changes
  pc.oniceconnectionstatechange = () => {
    console.log(`ICE connection state with ${userId} changed to: ${pc.iceConnectionState}`);
    
    // If we lose connection, try to restart
    if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
      console.log(`Attempting to reconnect with ${userId}`);
      socket.emit('request-audio', userId);
    }
  };

  // Handle receiving remote stream
  pc.ontrack = event => {
    console.log('Received remote track from:', userId);
    
    // Check if we already have an audio element for this user
    let audioElement = document.getElementById(`audio-${userId}`);
    
    if (!audioElement) {
      // Create a container for this user
      const userContainer = document.createElement('div');
      userContainer.id = `container-${userId}`;
      userContainer.style.marginBottom = '10px';
      
      // Create label for this user
      const userLabel = document.createElement('div');
      userLabel.id = `label-${userId}`;
      userLabel.textContent = `User ${userId.substring(0, 5)}...`;
      userContainer.appendChild(userLabel);
      
      // Create audio element
      audioElement = document.createElement('audio');
      audioElement.id = `audio-${userId}`;
      audioElement.autoplay = true;
      audioElement.controls = true;
      userContainer.appendChild(audioElement);
      
      document.getElementById('remoteAudio').appendChild(userContainer);
    }
    
    // Set or update the audio element's stream
    if (audioElement.srcObject !== event.streams[0]) {
      audioElement.srcObject = event.streams[0];
      console.log('Remote audio stream connected to audio element');
    }
    
    // Update connection status
    updateConnectionStatus();
  };

  // If we're the initiator, create and send an offer
  if (isInitiator) {
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .then(() => {
        socket.emit('sdp', pc.localDescription, userId);
      })
      .catch(e => console.error('Error creating offer:', e));
  }

  return pc;
}

// Helper function to create a UUID
function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
