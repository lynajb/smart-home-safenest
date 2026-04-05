require('dotenv').config({path:'../api/.env'})
require('./config/mongo');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

server.listen(PORT, () => {
    console.log(`Server listening on ${HOST}:${PORT}`)
});