const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

const session =require('express-session')

const knex = require('knex');
require('dotenv').config();

const intelligenceArray = ['Linguistic Intelligence','Logical-Mathematical Intelligence',
    'Spatial Intelligence','Bodily-kinesthetic Intelligence','Musical Intelligence',
    'Interpersonal Intelligence','Intrapersonal Intelligence','Spiritual Intelligence','Naturalistic Intelligence']

    // const quesidWithIntelligenceAndquestions = {};



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

 app.use(
    session({
        secret: 'your-secret-key',
        resave: false,             
        saveUninitialized: true,   
        cookie: {
            maxAge: 600000, 
            secure: false,  
            httpOnly: true, 
            sameSite: 'lax' 
        }
        
    })
 )

 // Initialize session data if not set
app.use((req, res, next) => {
    if (!req.session.quesidWithIntelligenceAndquestions) {
        req.session.quesidWithIntelligenceAndquestions = {};
    }

    if(!req.session.questionAndAnswers){
        req.session.questionAndAnswers={}
    }

    if(!req.session.detailsForCalculation){
       req.session.detailsForCalculation={}
    }
    
    next();
});


//  const functionName=async()=>{
//    questionIdGrouped = await db.select('question_id').from('questions').where('multiple_intelligence','Bodily-kinesthetic Intelligence');
//    console.log(questionIdGrouped)
// }

// // functionName();




const accesingAnswers=async(req,intelli)=>{
    const questionIdGrouped = await db.select('question_id').from('questions').where('multiple_intelligence',intelli);
    let totalAnswer=0;
    for(let i=0;i<questionIdGrouped.length;i++){

        const questionId =questionIdGrouped[i].question_id;
        const TestAns= parseFloat(req.session.quesidWithIntelligenceAndquestions[questionId].answer);
        totalAnswer=TestAns+totalAnswer;



        }

    
   const avg = totalAnswer/questionIdGrouped.length
//    console.log("Total Answer for",intelli,"",totalAnswer ) 
//    console.log("Average",avg);
//    console.log(`Percentage ${avg*10}%`);


   req.session.detailsForCalculation[intelli]={
    Total:totalAnswer,
    Avg:avg,
    Percentage:avg*10
  }

}



const calculatingTotalScoreForAll=async(req)=>{
    for(let i=0;i<intelligenceArray.length;i++){
       await accesingAnswers(req,intelligenceArray[i]);
    }
    // console.log("Details",req.session.detailsForCalculation)
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





// const getIntelligenceType=async()=>{
//     if (!req.session.questionAndAnswers) {
//         console.log("No answers found in session");
//         return;
//     }
//     for(const questionId of Object.keys(req.session.questionAndAnswers)){
//         const result = await db.select('multiple_intelligence','question').from('questions').where('question_id',questionId).first();
//         if (result){
//            req.session.quesidWithIntelligenceAndquestions[questionId]={
//                 question:result.question,
//                 answer:req.session.questionAndAnswers[questionId].answer,
//                 intelligence:result.multiple_intelligence
//             }
//         }

//     }
//     console.log("Questions With Details", req.session.quesidWithIntelligenceAndquestions);

// }


const getIntelligenceType = async (req) => {
    try {
        if (!req.session.questionAndAnswers || Object.keys(req.session.questionAndAnswers).length === 0) {
            console.log("No answers found in session");
            return;
        }

        for (const questionId of Object.keys(req.session.questionAndAnswers)) {
            const result = await db.select('multiple_intelligence', 'question')
                .from('questions')
                .where('question_id', questionId)
                .first();

            if (result) {
                req.session.quesidWithIntelligenceAndquestions[questionId] = {
                    question: result.question,
                    answer: req.session.questionAndAnswers[questionId].answer,
                    intelligence: result.multiple_intelligence
                };
            }
        }
        
        // console.log("Questions With Details", req.session.quesidWithIntelligenceAndquestions);
    } catch (error) {
        console.error("Error in getIntelligenceType:", error);
    }
};





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

















app.post('/api/Assesment',async(req, res) => {
    try {

        const { questionAndAnswers } = req.body;
        req.session.questionAndAnswers = questionAndAnswers
        // console.log("Received answers:", req.session.questionAndAnswers);



        res.json({
            Message: "received",
        });
    } catch (error) {
        res.status(500).json({
            Message: "Error in Receiving Data"
        });
    }
});

 

app.get('/api/calculation', async (req, res) => {
   await getIntelligenceType(req);
    await calculatingTotalScoreForAll(req);

    res.json(req.session.detailsForCalculation)
});





 

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on Port ${PORT}`);
});
   