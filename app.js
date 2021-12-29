const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyparser = require("body-parser");
const app = express();
const port =8000;

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
//   console.log("We are connected bro/sis");
}


var ContactSchema= new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});



var Contact= mongoose.model('Contact', ContactSchema);



app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

app.get('/', (req,res)=>{
    // const con = 'This is the best';
    const params= {};
    res.status(200).render('home.pug',params);
});

app.get('/contact', (req,res)=>{
    // const con = 'This is the best';
    const params= {};
    res.status(200).render('contact.pug',params);
});

app.post('/contact', (req,res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database ")
    })

    // const params= {};
    // res.status(200).render('contact.pug',params);
});

app.listen(port, ()=>{
    console.log(`The server is running at ${port}`);
});