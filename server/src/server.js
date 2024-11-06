const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(cors());
 
let storedAnswers;
let MIP

app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));




const calculation=(storedAnswer)=>{

    
    const question=storedAnswer["2"].answer;
    const question2=storedAnswer["1"].answer;
    
    const total = parseInt(question, 10) + parseInt(question2, 10);

    return total;
}


app.post('/IntelligencePage', async (req,res)=>{
    try{
        const {questionAndAnswers}=req.body;
        console.log(questionAndAnswers)
        storedAnswers=questionAndAnswers
       MIP =  calculation(storedAnswers)  
      

        res.json({
            Messege:"received",         
        })
    }catch(error){
        res.status(500).json({
            Messege:"ERROR"
        })
    }
   
}) 

app.get('/IntelligencePage',(req,res)=>{
    try{      
        res.json({
            MIP:MIP
        })
    }catch(error){
        console.log(error)
        }
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`)
})