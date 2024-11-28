const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());

let storedData = {};


app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));



// Calculation logic for MIP score
const calculation = (questionAndAnswers) => {
    const question = questionAndAnswers["2"].answer;
    const question2 = questionAndAnswers["1"].answer;

    const total = parseInt(question, 10) + parseInt(question2, 10);

    return total;
};






app.post('/api/Ordinarylevelpage',(req,res)=>{
    try{
        const {OLevelResultsAndGrades} = req.body ;
        console.log(OLevelResultsAndGrades)
    }catch(error){
        console.log("Failed to fetch OLevelResults");
    }


})




app.post('/api/ExtraCurricular',(req,res)=>{
    try{
        const {SelectedExtraActivities} =req.body;
        console.log(SelectedExtraActivities)
    }catch(error){
        console.log(error)
    }
})






app.post('/api/Assesment',(req, res) => {
    try {
        const { questionAndAnswers } = req.body;
        console.log("Received answers:", questionAndAnswers);
        const MIP = calculation(questionAndAnswers);
        storedData.MIP = MIP;

        res.json({
            Message: "received",
        });
    } catch (error) {
        res.status(500).json({
            Message: "Error in Receiving Data"
        });
    }
});







// Handle /IntelligencePage route before index.html
app.get('/api/IntelligencePage', (req, res) => {
    try {
        if (storedData.MIP !== undefined) {
            res.json({
                MIP: storedData.MIP
            });
        } else {
            res.status(404).json({
                Error: "MIP score not calculated yet"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            Error: "Error in sending MIP score"
        });
    }
});






// Serve index.html for non-API routes (frontend routing handled by React)
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
