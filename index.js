const express= require('express');
const http = require('http');
const port = 8000;

const app = express();
app.get('/', (request, response)=> response.send('hello from skillsoft'));

const SkillServer = http.createServer(function(request, response){
response.writeHead(200, {'Content-Type':'text/plain'});
response.write("Hello from Skillsoft");
response.end();
});

app.listen(port, function(){
console.log("Listening " + port);
});
