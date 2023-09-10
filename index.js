import express from 'express';
import {createServer} from 'node:http';
import {Server} from "socket.io";


const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/',(req,res)=>{
    res.sendFile(new URL('./index.html',import.meta.url).pathname);
})
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

// this will emit the event to all connected sockets
io.emit('some event', {
    someProperty: 'some value',
    otherProperty: 'other value'
});

server.listen(3000,()=>{
    console.log('server running at http://localhost:3000')
})