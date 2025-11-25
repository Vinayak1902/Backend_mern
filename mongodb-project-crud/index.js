let express = require("express")
const { ObjectId } = require("mongodb");

const {dbConnection} = require("./dbConnection");
let app = express();

app.use(express.json())

app.get("/student-read",async (req,res)=>{
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")
    let data = await studentCollection.find().toArray();
    let resObj={
        status:1,
        msg:"Student List",
        data
    }
    res.send(resObj)  
})
app.post("/student-insert",async (req,res)=>{
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")

    // let obj={
    //     sName:req.body.sName,
    //     sEmail:req.body.sEmail,
    // }
    let {sName,sEmail}=req.body;
    let existingStudent = await studentCollection.findOne({ sEmail });

    if (existingStudent) {
        return res.send({
            status: 0,
            msg: "Email already exists. Please use a different email."
        });
    }
    let obj={sName,sEmail};

    let insertRes = await studentCollection.insertOne(obj)

    let resObj={
        status:1,
        msg:"Data Insert",
        insertRes
    }

    // console.log(obj)
    res.send(resObj)
})  

app.delete("/student-delete/:id",async (req,res)=>{
    let {id} = req.params;
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")
    let delRes = await studentCollection.deleteOne({_id:new ObjectId(id)})
    let resObj={
        status:1,
        msg:"Data Delete",
        delRes
    }
    res.send(resObj)
})
app.put("/student-update/:id",async (req,res)=>{
    let {id} = req.params;
    let {sName,sEmail}=req.body;

    let obj = {}
    if(sName!=="" && sName!==undefined && sName!==null){
        obj['sName']=sName
    }
    if(sEmail!=="" && sEmail!==undefined && sEmail!==null){
        obj['sEmail']=sEmail
    }
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")
    let updateRes = await studentCollection.updateOne({_id:new ObjectId(id)},{$set:obj})
    let resObj={
        status:1,
        msg:"Data Update",
        updateRes
    }
    res.send(resObj)
})
app.listen("8000")