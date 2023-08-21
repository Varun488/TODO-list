const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const TODO = require('./models/todo');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));

app.get('/',async function(req, res){
    try{
        const newTask = await TODO.find({})
        return res.render('home', {
            Task_list: newTask
        });
    }catch(err){
       console.log('error fetching task from db')
       return;
    }
    
});

app.post('/add-list',async function(req,res){
    try {
        const newTask = await TODO.create({
            Task: req.body.taskdesc,
            Category: req.body.category,
            Date: req.body.Duedate
        });

        console.log('***********', newTask);
        return res.redirect('back');
    } catch (err) {
        console.log('error in creating Task:', err);
        return res.status(500).send('Error creating Task');
    }
});
app.get('/Done',async function(req,res){
    try{
        let id = req.query.id;
        let Task = TODO.findById(id);
        let newDone = true;
        if(Task.Done == true){
            newDone = false;
        }
        const updatedTask = await TODO.findByIdAndUpdate(
            id,
            { $set: { Done: newDone } },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).send('Task not found');
        }

        console.log('Updated Task:', updatedTask);
        return res.redirect('back');
    } catch (err) {
        console.error('Error updating Task:', err);
        return res.status(500).send('Error updating Task');
    }
})


app.get('/delete',async function(req, res){
     try{
        await TODO.deleteMany({Done: true});
        return res.redirect('back');
     }catch(err){
        console.log("error in deleting:", err);
        return res.status(500).send('Error deleting contact');
     }
})

app.listen(port, function(err){
    if(err){
        console.log(err)
    }else{
        console.log('My server is up and running');
    }
})