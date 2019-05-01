const http = require('http');
const dispatcher=require('httpdispatcher');
const PORT = 3001;

function handleRequest(request, response){
    try {
        // log the request on console
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end("OK");
    } catch(err) {
        console.log(err);
    }
}

// Create a server
const myFirstServer = http.createServer(handleRequest);

// Start the server !
myFirstServer.listen(PORT, function(){
    console.log("Mocked API listening on: http://localhost:%s", PORT);
});