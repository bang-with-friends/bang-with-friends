import express from 'express';
import path from 'path';
import { GameEvent, EventName, PlayerJoinedEvent } from './types/Events';
import { Player } from './types/Player';
import { Game } from './types/Game';

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));

interface AddPlayerData {
  player: Player,
  game: Game,
}

io.on('connection', (socket: any) => {
  let room = '';

  socket.on('event', (event: GameEvent) => {
    if (event.name === EventName.ADD_PLAYER) {
      room = event.data.game;
      socket.join(room);
      io.in(room).emit('event', new PlayerJoinedEvent({ player: event.data.player }));
    } else {
      socket.to(room).emit('event', event);
    }
  });
});
