const enquiryModel = require("../../../models/enquiry.model");

let enquiryInsert=(req,res)=>{
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
}

let enquiryList = async (req,res)=>{
    let enquiryList = await enquiryModel.find();
    res.status(200).json({status:1, message:"Enquiry list", data:enquiryList})
}
let enquiryDelete = async (req,res)=>{
    let enquiryId = req.params.id;
    let deletedEnquiry = await enquiryModel.deleteOne({_id:enquiryId});
    res.send({status:1,message:"Enquiry deleted successfully",id:enquiryId,delRes:deletedEnquiry})
}
let enquiryUpdate = async (req,res)=>{
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
    }
module.exports = {enquiryInsert,enquiryList,enquiryDelete,enquiryUpdate}