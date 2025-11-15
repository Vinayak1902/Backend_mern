let http = require("http")

let server = http.createServer((req,res)=>{
    if(req.url=="/news"){
        let obj={
            status:1,
            data:[
                {
                    newsTitle:'ws',
                    newsDes:"Ws Hello"
                },
                {
                    newsTitle:'IIP',
                    newsDes:"IIP Hello"
                }
            ]
        }
        res.end(JSON.stringify(obj))    
    }
    if(req.url=="/sports"){

    }
    if(req.url=="/"){
        res.end("Welcome to Homepage")
    }
})
server.listen("8000")