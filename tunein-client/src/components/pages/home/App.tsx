import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  // console.log(socket.id);
});

function App() {
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (room !== '') { socket.emit('join', room); }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Room ID"
        onChange={(event) => { setRoom(event.target.value); }}
      />
      <button onClick={joinRoom} type="button">Join Room</button>
    </div>
  );
}

export default App;
