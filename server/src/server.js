const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;
const knex = require('knex');
require('dotenv').config();

const intelligenceArray = ['Linguistic Intelligence','Logical-Mathematical Intelligence',
    'Spatial Intelligence','Bodily-kinesthetic Intelligence','Musical Intelligence',
    'Interpersonal Intelligence','Intrapersonal Intelligence','Spiritual Intelligence','Naturalistic Intelligence']

    const intelligenceObj={};
    const quesidWithIntelligenceAndquestions = {};
    const totalAnswer=0;



const database_password=process.env.DATABASE_PASSWORD;
const database_name = process.env.DATABASE_NAME;
const database_user = process.env.DATABASE_USER;
const database_client = process.env.DATABASE_CLIENT;

const db=knex({
    client:database_client,
    connection: { 
      host: '127.0.0.1', 
      user: database_user,
      password: database_password,
      database:database_name,
    },
  });



 app.use(cors());


 const functionName=async()=>{
    return  questionIdGrouped = await db.select('question_id').from('questions').where('multiple_intelligence','Bodily-kinesthetic Intelligence');
}

functionName();


 const createObjWithIntelligenceNames=()=>{
 intelligenceArray.map(intelligence=>{
        intelligenceObj[intelligence]=undefined;
 }) 
 return intelligenceObj;  
}





const getttingQuestionFromDB=async()=>{
    const questions = await db.select('question', 'question_id').from('questions');
   const  questionsObject = questions.reduce((acc, curr) => {
       acc[curr.question_id] = curr.question;
    //    console.log("Questions Object",questionsObject); 
       return acc;

   }, {});

   return questionsObject;
}





  app.get('/api/Assesment', async (req, res) => {
    try {
        res.send(await getttingQuestionFromDB())
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});










// let storedData = {}; 




app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));



// Calculation logic for MIP score
// const calculation = (questionAndAnswers) => {
//     const question = questionAndAnswers["2"].answer;
//     const question2 = questionAndAnswers["1"].answer;

//     const total = parseInt(question, 10) + parseInt(question2, 10);

//     return total;
// };




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







const getIntelligenceType=async(questionAndAnswers)=>{

    for(const questionId of Object.keys(questionAndAnswers)){
        const result = await db.select('multiple_intelligence','question').from('questions').where('question_id',questionId).first();

        if (result){
            quesidWithIntelligenceAndquestions[questionId]={
                question:result.question,
                answer:questionAndAnswers[questionId].answer,
                intelligence:result.multiple_intelligence
            }
        }

    }
    console.log("Questions With Details", quesidWithIntelligenceAndquestions);

}










app.post('/api/Assesment',async(req, res) => {
    try {
        const { questionAndAnswers } = req.body;
        // console.log("Received answers:", questionAndAnswers);
        console.log(createObjWithIntelligenceNames());
        await getIntelligenceType(questionAndAnswers);
        console.log(quesidWithIntelligenceAndquestions[await functionName()[1].question_id].answer)

        // console.log("Questions Object"); 

        
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

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on Port ${PORT}`);
});
  