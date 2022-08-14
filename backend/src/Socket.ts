import express from 'express';
import * as http from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';

import { GameEvent } from 'common/lib/Events';

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

io.on('connection', (socket: Socket) => {
  socket.on('event', (event: GameEvent) => {
    // if (event.name === EventName.ADD_PLAYER) {
    //   room = event.data.game;
    //   socket.join(room);
    //   io.in(room).emit('event', new PlayerJoinedEvent({ player: event.data.player }));
    // } else {
    //   socket.to(room).emit('event', event);
    // }
  });
});
