const express = require('express');
const app = express();
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:'http://localhost:3000',
        methods:['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    console.log(`user is connecting in id ${socket.id}`);
    
// send code len cho 2FA secret
    socket.on("send_code",(dat) => {
        let token;
        fetch(`https://tools.dongvanfb.net/api/get_2fa?secret=${dat}`).then(res => res.json()).then(data => {token = data.code})
        console.log(token);
    }
    )

}
)

server.listen(3001, ()=>{
    console.log('server is running')
})