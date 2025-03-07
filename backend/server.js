require("dotenv").config();
const express= require("express");
const mongoose= require("mongoose");
const cors= require("cors");
//initialize
const app= express();
//midlware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//connect to mongodb 
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
})
app.use('/api/tasks',require('./routes/TaskRoutes'));

const port=process.env.port || 5000;
app.listen(port,()=>{console.log("Data connected !")});