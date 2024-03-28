const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', async(req,res)=>{
    try{
        res.json("Hello World!")
    }catch(err){
        res.json("There is an error occured, please try again later")
    }
});

app.listen(port,()=>{
    console.log(`The app is running at the port: ${port}`)
})