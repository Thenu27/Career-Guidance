const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
 
let x;
const calculation=(questionAndAnswers)=>{
    const question=questionAndAnswers["02"].answer;
    const question2=questionAndAnswers["01"].answer;
    
    const total = question+question2;

    return total;
}


app.post('/', async (req,res)=>{
    try{
        const {questionAndAnswers} =  req.body;
        x=questionAndAnswers
       const MIP= calculation(questionAndAnswers);
        const response =  axios.post("http://localhost:4000/",{
            Results:"Helooooooooooo"

        })

        res.json({
            Messege:"received",         
        })
    }catch(error){
        res.status(500).json({
            messge:"ERROR"
        })
    }
   
})



app.get('/',(req,res)=>{
    try{
        
        res.send({
            x
        })
    }catch(error){
        res.status(500).send({
            Error:"ERROR"
        })
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`)
})