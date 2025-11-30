let express = require('express');
var mongoose = require('mongoose');
require('dotenv').config();
let enquiryModel = require('./models/enquiry.model');

// Connect to MongoDB

let app = express();
app.use(express.json());
app.post('/api/enquiry-insert',(req,res)=>{
    let {sName,sEmail,sPhone,sMessage} = req.body;
    let enquiry = new enquiryModel({
        name:sName,
        email:sEmail,
        phone:sPhone,
        message:sMessage
    });
    enquiry.save().then(()=>{
        res.send({
            status:1,
            message:"Enquiry saved successfully"});
        }).catch((err)=>{
            res.send({status:0,message:"Error while saving enquiry",error:err});
        })
})
app.get("/api/enquiry-list",async (req,res)=>{
    let enquiryList = await enquiryModel.find();
    res.status(200).json({status:1, message:"Enquiry list", data:enquiryList})
})
app.delete("/api/enquiry-delete/:id",async (req,res)=>{
    let enquiryId = req.params.id;
    let deletedEnquiry = await enquiryModel.deleteOne({_id:enquiryId});
    res.send({status:1,message:"Enquiry deleted successfully",id:enquiryId,delRes:deletedEnquiry})
})
app.put("/api/enquiry-update/:id",async (req,res)=>{
    let enquiryId = req.params.id;
    let {sName,sEmail,sPhone,sMessage} = req.body;
    let updatedEnquiry = {
        name:sName,
        email:sEmail,
        phone:sPhone,
        message:sMessage
    };
    let updateRes = await enquiryModel.updateOne({_id:enquiryId},updatedEnquiry);
    res.send({status:1,message:"Enquiry updated successfully",id:enquiryId,updateRes:updateRes})
    })
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log("Server is running on port" + process.env.PORT);
    })
})