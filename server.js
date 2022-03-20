const express=require('express')
const apps=express();
const http=require('http');
const CreateServer = http.createServer(apps);

const {Server}=require('socket.io');
const io=new Server(CreateServer);



const path=require('path')
const {dirname} = require("path");

apps.use(express.static('client/build'))

apps.get('*', function (req,res) {
   req.sendfile(path.resolve(__dirname,'client','build','index.html'))
})



io.on('connection', function (socket) {
    console.log("new user connected")

    //throw server to client side data=======
    setTimeout(function () {
        socket.emit('msg','this is message from server alhamdulillah')
    },5000)

 socket.on('disconnect',function () {
     console.log("new user disconnected")
 });

})  ;


 CreateServer.listen(4000,function () {
    console.log("hello server is connnected")
 })