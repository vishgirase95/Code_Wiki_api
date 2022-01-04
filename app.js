const e = require("express");
const express = require("express");
const mongoose = require("mongoose");
const {
    send
} = require("process");
const url = "mongodb://localhost:27017/Code_wiki_api"
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("database connected")
}).catch((e) => {
    console.log("error is datbase", e)
})


const app = express();
const dataSchema = new mongoose.Schema({
    title: String,
    content: String
})
app.use(express.json());
const data = new mongoose.model("Data", dataSchema);
app.post("/data", (req, res) => {
    const data1 = new data({
        title: req.body.title,
        content: req.body.content
    });
    const savedata = data1.save((err) => {
        if (err) {
            res.send("Data cannot be saved", err);
        } else {
            res.send("Sucssefully saved");
        }
        // res.send(savedata);
    });

})
app.delete("/data",async(req,res)=>{
    data.deleteMany((e)=>{
if(e){
    res.send(e);
}else{
    res.send("deleted sucessfully");
}
    })
})
app.get("/data", async (req, res) => {

    // const alldata = await data.find((err,all)=>{
    //     if (err) {
    //         res.send("cannot get the data", err);
    //     } else {
    //         res.send(all);
    //     }
    // }); 
    try {
        const data1 = await data.find();

        res.send(data1);
    } catch (error) {
        res.send(error);
    }

});

app.get("/data/:id",async (req,res)=>{

try {
    const foundById=await data.findById(req.params.id);
res.json(foundById);
} catch (error) {
    res.send("error in finding data",error);
    
}
})


app.delete("/data/:id",async (req,res)=>{
     const deletedData=data.findByIdAndDelete(req.params.id,(err,doc)=>{
if(err){
    console.log(err);
res.send("error is deleting");
}else{
    console.log("deleted",doc);
    res.json("deleted sucessfully")
}
    })

// try {
//     const deletedData=data.findByIdAndDelete(req.params.id);
    
// } catch (error) {
    
// }
})



app.patch("/data/:id",async(req,res)=>{
    const patched=await data.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        content:req.body.content
    })
    try {const savedPatch= await patched.save();
        res.json(savedPatch);
        
    } catch (error) {
        res.send("Error in updating",error)
    }


})
app.get("/", (req, res) => {
    res.send("hello");
})

app.listen(3000, () => {
    console.log("server 3000 started");
});