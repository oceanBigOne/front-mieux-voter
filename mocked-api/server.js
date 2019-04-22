// require the http module of node.js
const http = require('http');
const PORT = 3001;

//module used for parse data from post and get
const { parse } = require('querystring');
const url = require('url');
const routes = require("./routes.js");

/**
 * Function used to handle the request
 * @param request
 * @param response
 */
function handleRequest(request, response){
    try {
        // log the request on console
        response.setHeader('Access-Control-Allow-Origin', '*');

        //Parse URL
        const url_parts = url.parse(request.url, true);

        //check if route exists
        if(routes.hasOwnProperty(url_parts.pathname)){
            let route=routes[url_parts.pathname];
            //check method
            if(request.method.toUpperCase()===route.method.toUpperCase()){
                //parse parameter
                let error=0;
                let details="";
                let data="";
                switch(route.method.toUpperCase()){
                    case 'GET' :
                        data=url_parts.query;
                        break;
                    default:
                        let body = '';
                        request.on('data', chunk => {
                            body += chunk.toString();
                        });
                        request.on('end', function() {
                            data = parse(body);
                        });

                        break;
                }
                //check parameter
                route.parameters.forEach(function(parameter){
                    if(Object.hasOwnProperty.call(url_parts.query,parameter.name)){
                        //todo check type of params

                        /* if(typeof(url_parts.query[parameter.name])===parameter.type){
                         }else{
                             details+=parameter.name+" is "+typeof(url_parts.query[parameter.name])+" but "+parameter.type+" is required - ";
                             error++;
                         }*/
                    }else{
                        if(details!==""){
                            details+=", ";
                        }
                        details+="Parameter "+parameter.name+" not found";
                        error++;
                    }
                });

                if(error===0){
                    // Dispatch
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify(route.response, undefined, 4));
                }else{
                    response.writeHead(400, {'Content-Type': 'application/json'});
                    response.end('{"status": 400,"title": "Bad Request","detail":"'+details+'"}');
                }
            }else{
                // error 405
                response.writeHead(405, {'Content-Type': 'application/json'});
                response.end('{"status": 405,"title": "Method Not Allowed","detail": "Method '+request.method.toUpperCase()+' not allowed, please try with '+route.method.toUpperCase()+'"}');
            }
        }else{
            // error 404
            response.writeHead(404, {'Content-Type': 'application/json'});
            response.end('{"status": 404,"title": "Not found","detail": ""}');
        }

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