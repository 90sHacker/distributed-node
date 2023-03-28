#!/usr/bin/env node

const server = require('fastify')();
const fetch = require('node-fetch');
const fs = require('fs');
const https = require('https');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';

const options = {
  agent: new https.Agent({
    ca: fs.readFileSync(__dirname + '/../shared/tls/producer-certificate.cert'),
  })
};

server.get('/', async() => {
  const req = await fetch(`https://${TARGET}/recipes/42`, options);
  const producer_data = await req.json();

  return {
    consumer_pid: process.pid,
    producer_data
  };t
});

server.listen(PORT, HOST, () => {
  console.log(`consumer running at http://${HOST}:${PORT}`);
})