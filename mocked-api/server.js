// require the http module of node.js
const http = require('http');
const PORT = 3001;

//module used for parse data from post and get
const { parse } = require('querystring');
const url = require('url');
const routes = require("./routes.js");
const validator = require("./validator.js");

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
                let data='';
                let body = '';
                switch(route.method.toUpperCase()){
                    case 'GET' :
                        data=url_parts.query;
                        handleReadParam(request, response, route,data);
                        break;
                    default:
                        request.on('data', chunk => {
                            body += chunk.toString();
                        });
                        request.on('end', function() {
                           data = parse(body);
                            handleReadParam(request, response, route,data);
                        });

                        break;
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


/**
 * Function used to handle test parameters
 * @param request
 * @param response
 * @param route parsed route
 * @param data parsed parameter
 */
function handleReadParam(request, response, route,data){
    let error=0;
    let details="";

    //check parameter
    route.parameters.forEach(function(parameter){
        if(!Object.hasOwnProperty.call(data,parameter.name)){
            if(details!==""){
                details+=", ";
            }
            details+="Parameter "+parameter.name+" not found";
            error++;
        }
    });

    //check validty of parameter
    if(error === 0) {
        route.parameters.forEach(function (parameter) {
            if (Object.hasOwnProperty.call(data, parameter.name) && error === 0) {
                //test parameter
                if (parameter.hasOwnProperty("tests")) {
                    parameter.tests.forEach(function (test) {
                        if (validator[test.function](data) === false && error === 0) {
                           BadRequest(response, test.errorResponse);
                            error+=1000;
                        }
                    });
                }
            }
        });
    }else{
        var customResponse={"status": 400,"title": "Bad Request","detail":details}
        BadRequest(response,customResponse)
    }

    if(error===0){
        GoodRequest(response, route.response);
    }
}

//send good response
function GoodRequest(response,customResponse){
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(customResponse, undefined, 4));
}

//send bad request
function BadRequest(response, customResponse){
    response.writeHead(customResponse.status, {'Content-Type': 'application/json'});
    response.end(JSON.stringify( customResponse, undefined, 4));
    //response.end('{"status": 400,"title": "Bad Request","detail":"'+details+'"}');
}

// Create a server
const myFirstServer = http.createServer(handleRequest);

// Start the server !
myFirstServer.listen(PORT, function(){
    console.log("Mocked API listening on: http://localhost:%s", PORT);
});