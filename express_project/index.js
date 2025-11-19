let express = require('express')
require("dotenv").config();
const { checkToken } = require('./checkTokenMiddleware')

let app = express()
console.log(process.env.MYTOKEN)
app.use(express.json())
// let myToken = "12345"
// let myPass = "54321"

// let checkToken=(req,res,next)=>{
//     if(req.query.token=="" || req.query.token==undefined){
//         return res.send(
//             {
//                 status:0,
//                 msg:"Please Fill the Token"
//             }
//         )
//     }
//     if(req.query.token!=myToken){
//         return res.send(
//             {
//                 status:0,
//                 msg:"Please fill the correct token"
//             }
//         )
//     }
//     next();
// }
// app.use(checkToken)  // middleware
// app.use((req,res,next)=>{
//     if(req.query.pass=="" || req.query.pass==undefined){
//         return res.send(
//             {
//                 status:0,
//                 msg:"Please Fill the password"
//             }
//         )
//     }
//     if(req.query.pass!=myPass){
//         return res.send(
//             {
//                 status:0,
//                 msg:"Please fill the correct password"
//             }
//         )
//     }
//     next();
// })
app.get('/', (req,res)=>{
    res.send({status:1,msg:'Home Page API'})
})

app.get('/news',checkToken, (req,res)=>{
    res.send({status:1,msg:'News Page API'})
})
app.get('/news/:id', (req,res)=>{
    let currentId = req.params.id
    res.send("News Details api "+ currentId)
})
app.get('/products', (req,res)=>{
    res.send({status:1,msg:'Products Page API'})
})
app.post('/login', (req,res)=>{
    console.log(req.body)
    // res.send({
    //     status:1,
    //     msg:'Login API',
    //     bodyData:req.body,
    //     queryData:req.query
    // })
    res.status(200).json({
        status:1,
        msg:'Login API',
        bodyData:req.body,
        queryData:req.query
    })
})
app.listen(process.env.PORT || 5000)