const express = require('express')
const app = express()
const db = require('./models')
const path = require('path')
const httpServer = require('http')
const http = httpServer.createServer(app)
const { json } = require('body-parser')
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const { User } = require('./models')

const cors = require('cors')
app.use(cors());

// 
app.get('/',(req,res)=>{
    htmlpath = path.join(__dirname,"index.html")
    res.sendFile(htmlpath)
})

// create
app.post('/insert',(req,res)=>{
    console.log(req.body)
    User.create({
        task : req.body.task,
        status: 'active'
    })
    .then((resp)=>{
            return res.send(200,{message:'inserted'})
    })
    .catch(err=>{
            return res.send(400,{message:'error: '+err})
    })
})

// read
app.get('/read',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    User.findAll(
        {
            attributes : ['task','id','status'],
             where: { status: ['active','completed'] },
        })
    .then((tasks)=>{
        // task = JSON.stringify(tasks)
        return res.send(200,{data:tasks})
    })
    .catch((err)=>{
         return res.send(400,{message:'error: '+err})
    })
})

//update
app.post('/update',(req,res)=>{
    console.log('UPDATE',req.body)
    User.update(
        {task:req.body.task},
        {where:{id:req.body.id,status:'active'}})
   .then((users)=>{
        console.log(users)
        return res.send(200,{message:'updated'})
    })
    .catch((err)=>{
        return res.send(400,{message:'error: '+err})
   })
})

app.post('/completed',(req,res)=>{
    console.log('COMPLETED',req.body)
    User.update(
        {status:(req.body.status==true?'completed':'active')},
        {where:{id:req.body.id}})
   .then((users)=>{
        return res.send(200,{message:'completed'})
    })
    .catch((err)=>{
        return res.send(400,{message:'error: '+err})
   })
})

//delete
app.post('/delete',(req,res)=>{
    console.log('DELETE',req.body)
     User.update(
            {status:'deleted'},
            {where:{id:req.body.id}})
   .then((users)=>{
        return res.send(200,{message:'deleted'})
    })
    .catch((err)=>{
        return res.send(400,{message:'error: '+err})
   })
})


db.sequelize.sync().then((req)=>{
    http.listen(3001,()=>{
        console.log('Running server on 3001')
    })
})
