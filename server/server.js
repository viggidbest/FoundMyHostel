const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
var bodyParser = require('body-parser')
app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/FindMyHostel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
app.use(express.urlencoded({extended:false}))

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  status: { type: String, required: true }
});

const userDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    checkIn:String,
    checkOut:String,
    Review:String,
    complaint:String,
    attendance:[attendanceSchema]
  });

const UserData = mongoose.model("userdata",userDataSchema)

const checkIfUserExists= async (email) => {
  const user= await UserData.find({email:email})
  if(email===user.email){
    return true
  }
else return false
}



app.get('/',async(req,res)=>{
    res.send("Hello world")
})
app.post('/signup', async(req,res)=>{
    console.log(req.body.data);
   
    const {name,email,password} = req.body.data
    const userExists = await checkIfUserExists(email);
    if (userExists){
      const exists = true
      res.status(200).json(exists);
    }
    const userData = new UserData({name:name,email:email,password:password})
    userData.save()
    UserData.find({}, (error, userdata) => {
        if (error) {
          console.error(error);
        } else {
          console.log(userdata);
        }
      });
})
const fetchPassword = async (email,password)=>  { 
 const data = await UserData.find({email:email})
  console.log(data[0].password)
  if(data[0].password === password) {
    return true
  }
 else return false
}

app.post('/signin',async(req,res)=>{
  const ownerEmail="owner@mail.com"
  const ownerPassword="12345"
    console.log(req.body.data); 
    const {email,password} = req.body.data
    if(email===ownerEmail && password===ownerPassword){
      res.status(200).json({valid:"owner"})
       return
    }
    const passwordCompare= await fetchPassword(email,password).catch(err=>console.log(err))
    console.log(passwordCompare);
    if (passwordCompare) {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
})

app.get('/tenant',async(req,res)=>{
  const response = await UserData.find({email:req.query.email})
  res.send(response)
})


app.post('/tenant/checkIn',async(req,res)=>{
  const {dateTime,email} = req.body.data
  console.log(dateTime);
  console.log(email);
  const update = await UserData.findOneAndUpdate({email:email}, {checkIn:dateTime});
  console.log(update);
})


app.post('/tenant/checkOut',async(req,res)=>{
  const {dateTime,email} = req.body.data
  console.log(dateTime);
  console.log(email);
  const update = await UserData.findOneAndUpdate({email:email}, {checkOut:dateTime});
  res.send({message:"CheckOut Done"})
})


app.post('/tenant/complaint',async(req,res)=>{
  console.log(req.body.data);
  const update = await UserData.findOneAndUpdate({email:req.body.data.email}, {complaint:req.body.data.complaint});
  res.send({message:"Complaint filed"})
})

app.get('/owner',async(req,res)=>{
    const response = await UserData.find({})
    res.send(response)
})


app.post('/attendace',async(req,res)=>{
  const {status,date,email} = req.body.data
  console.log(req.body.data);
  try{
  // const foundUser = await UserData.find({email:email})
  //   foundUser[0].attendance[0].status="present"
    
  // await foundUser.save();
 
  UserData.findOneAndUpdate({ email:email }, { $push: { attendance: {date:  new Date().toLocaleDateString(), status:"present" } } }, function (error, device) {
    if (error) {
      console.log(error);
    } else {
      console.log("User document updated.");
    }
    //sent respnse to client
  });
  }
  catch (error) {
    console.error(error);
  }
})

app.get('/attandance-table',async(req,res)=>{
        const response = await UserData.find({})
        res.send(response)

})



app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})
