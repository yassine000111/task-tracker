const express = require("express");
const Task= require('../models/Task');

const router= express.Router();

router.post("/",async (req,res)=>{
try{
const newTask= new Task(req.body);
await newTask.save();
res.status(201).json(newTask);
}
catch(error){
    res.status(500).json({error:"failed to create task"})
}
})

router.get("/",async(req,res)=>{
try{
const tasks= await Task.find();
res.json(tasks);
}
catch(error){
    res.status(500).json({error:"failed to get tasks"})
}
})

//update task
router.put("/:id",async (req,res)=>{
try{
const updatedTask= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.json(updatedTask);
}
catch(error){
    res.status(500).json({error:"failed to update task"})
}
})
//delete task
router.delete("/:id",async (req,res)=>{
try{
await Task.findByIdAndDelete(req.params.id);
res.json({message: "task deleted!"});
}
catch(error){
    res.status(500).json({error:"failed to delete task"})
}
})

module.exports =router;