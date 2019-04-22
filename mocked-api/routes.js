module.exports = {
    "/": {
        method: "get",
        parameters: [],
        response: {
            "data": {
                "mocked-api": true
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
                    default: false,
                    tests: [
                        {
                            function: "hasOwnerMailOrIsPermissive",
                            errorResponse: {
                                status: 400,
                                title: "Must either be permissive or have an owner mail",
                                detail: "Please provide an email address or let the election be permissive."
                            }
                        }
                    ]

                },
                {
                    name: "ownerMail",
                    type: "string",
                    default: ""
                },
                {
                    name: "voters",
                    type: "array",
                    default: []
                },
                {
                    name: "dateStart",
                    type: "int",
                    default: -1
                },
                {
                    name: "dateEnd",
                    type: "int",
                    default: -1
                },
                {
                    name: "jauges",
                    type: "array",
                    default: []
                },
                {
                    name: "record",
                    type: "boolean",
                    default: []
                }
            ],
        response: {
            "data": {
                "type": "election",
                "attributes": {
                    "electionId": "fer545,b,8kl784h87zdfs97",
                    "ownerToken": "fe78ht485df05fh4f85d4sd;084erg"
                }
            }
        }
    }
};
