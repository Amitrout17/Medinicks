const express=require('express')
const app=express()
const errorMiddleware=require('./middleware/error')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const path = require("path");

//for uploading images to 
//If this is not done then it will show cloudinary error status code 413
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
   
//Rote import
const product=require("./routes/productRoute")
const user=require('./routes/userRoute')
const order=require('./routes/orderRoute')
const payment=require("./routes/paymentRoute") 

//cookie parser import 
const cookieParser=require('cookie-parser')

app.use(express.json())  //Or else mongoose will show validation error every time any thing is added to data base
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

//Routes
app.use("/api/v1",product);
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


//Middleware for error
app.use(errorMiddleware)

module.exports=app