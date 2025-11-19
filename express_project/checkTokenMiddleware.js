
let checkToken=(req,res,next)=>{
    if(req.query.token=="" || req.query.token==undefined){
        return res.send(
            {
                status:0,
                msg:"Please Fill the Token"
            }
        )
    }
    if(req.query.token!=process.env.MYTOKEN){
        return res.send(
            {
                status:0,
                msg:"Please fill the correct token"
            }
        )
    }
    next();
}
module.exports={checkToken}