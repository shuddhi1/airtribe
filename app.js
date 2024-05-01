

const express = require('express');
const data = require('./task.json');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

app.get("/api/tasks",(req,res)=>{
    res.send(data)
})

app.get("/api/tasks/:id",(req,res)=>{
    const id =req.params.id
      const task = data.tasks.find((task)=> task.id === parseInt(id))
    if(!task){
       return  res.status (404).send("the following ID does not exist ")
    }
    res.send(task)
})

app.post("/api/tasks",(req,res)=>{
    const task =req.body;
    task.id =data.length+1;
    data.push(task)
    res.send(task)

})

app.put("api/tasks/:id",(req,res)=>{
    const id= req.params.id;
     const task = data.tasks.find((task)=> task.id === parseInt(id))
    task.title=req.body.title;
    task.description=req.body.description;
    task.completed=req.body.completed ;
    res.send(task)
})

app.delete("/api/task/:id",(req,res)=>{
    const  id =req.params.id;
    const task = data.tasks.find((task)=> task.id === parseInt(id))
    const index =data.indexOf(task);
    data.splice(index,1);
    res.send(task);
})

module.exports = app;
      
