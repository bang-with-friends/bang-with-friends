import express from 'express';
import * as http from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';

import { GameEvent, EventName, PlayerJoinedEvent } from 'common/lib/Events';
import { Player } from 'common/lib/Player';
import { Game } from 'common/lib/Game';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));

interface AddPlayerData {
  player: Player,
  game: Game,
}

io.on('connection', (socket: Socket) => {
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
