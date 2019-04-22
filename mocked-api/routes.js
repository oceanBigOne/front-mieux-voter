module.exports = {
    "/": {
        method: "get",
        parameters:[],
        response:{
            "data":{
                "mocked-api":true
            }
        }
    },
    "/test/": {
        method: "get",
        parameters: [
            {
                name: "isPermissive",
                type: "boolean",
                default: false
            }],
        response:{
            "data":{
                "type":"election",
                "attributes":{
                    "electionId": "fer545,b,8kl784h87zdfs97",
                    "ownerToken": "fe78ht485df05fh4f85d4sd;084erg"
                }
            }
        }
    },
    "/election/create/": {
        method: "post",
        parameters:
            [
                {
                    name: "isPermissive",
                    type: "boolean",
                    default: false
                }],
        response:{
            "data":{
                "type":"election",
                "attributes":{
                    "electionId": "fer545,b,8kl784h87zdfs97",
                    "ownerToken": "fe78ht485df05fh4f85d4sd;084erg"
                }
            }
        }
    }
};
