'use strict';

const http = require('http');
const NodeStatic = require('node-static');
const socketIO = require('socket.io');

const staticDir = new NodeStatic.Server('./static');

const server = http.createServer((req, res) => {
  req.addListener('end', () => {
    staticDir.serve(req, res);
  }).resume();
}).listen(3000);

const io = socketIO(server);

io.on('connection', client => {
  client.on('event', data => {
    console.log(data);
  });
});