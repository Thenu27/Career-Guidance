const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

const session = require('express-session')

const knex = require('knex');
require('dotenv').config();  // Loads environment variables from a .env file into process.env

// Load database credentials from environment variables
const database_password = process.env.DATABASE_PASSWORD;
const database_name = process.env.DATABASE_NAME;
const database_user = process.env.DATABASE_USER;
const database_client = process.env.DATABASE_CLIENT;

// Initialize database connection using Knex
const db = knex({
    client: database_client,
    connection: {
        host: '127.0.0.1',
        user: database_user,
        password: database_password,
        database: database_name,
    },
});

// Enable CORS to allow requests from other origins
app.use(cors());

// Set up session middleware to manage user sessions.
// This stores user data on the server between HTTP requests.
app.use(
    session({
        secret: 'your-secret-key', // Secret key for encrypting session data
        resave: false,             // Do not save session if unmodified
        saveUninitialized: true,   // Save uninitialized sessions
        cookie: {
            maxAge: 600000,        // Session cookie max age in milliseconds
            secure: false,         // In production, set to true if HTTPS is used
            httpOnly: true,        // Cookie not accessible via client-side JS
            sameSite: 'lax'        // SameSite policy for the cookie
        }
    })
);

// Array to hold intelligence data fetched from the database
let intelligenceArray = [];







// Middleware to ensure certain session objects are initialized
app.use((req, res, next) => {
    // Initialize session properties if they don't exist yet
    if (!req.session.quesidWithIntelligenceAndquestions) {
        req.session.quesidWithIntelligenceAndquestions = {};
    }

    if (!req.session.questionAndAnswers) {
        req.session.questionAndAnswers = {};
    }

    if (!req.session.detailsForCalculation) {
        req.session.detailsForCalculation = {};
    }
    next();
});









// Function to fetch intelligence types from the database and store them in intelligenceArray
const fetchIntelligenceFromDB = async () => {
    const response = await db.select('*').from("mi_table");
    console.log(response)
    for (let i = 0; i < response.length; i++) {
        intelligenceArray.push(response[i])
    }
    // console.log("Hello", intelligenceArray)
}








// Call the function to populate intelligenceArray on server start
fetchIntelligenceFromDB();













// Function to calculate the total score, average, and percentage for a given intelligence_id
const accesingAnswers = async (req, intelligence_id) => {
    // Get all question_ids for the given intelligence_id
    const questionIdGrouped = await db.select('question_id').from('questions').where('intelligence_id', intelligence_id);
    let totalAnswer = 0;

    // Sum up the answers provided by the user for all questions related to this intelligence_id
    for (let i = 0; i < questionIdGrouped.length; i++) {
        const questionId = questionIdGrouped[i].question_id;
        const TestAns = parseFloat(req.session.quesidWithIntelligenceAndquestions[questionId].answer);
        totalAnswer = TestAns + totalAnswer;
    }

    // Calculate the average score for this intelligence type
    const avg = totalAnswer / questionIdGrouped.length
    console.log("Total Answer", totalAnswer)

    // Get the intelligence_type name from the database for labeling
    const getIntelligence = await db.select("intelligence_type").from("mi_table").where("intelligence_id", intelligence_id).first();
    console.log("Intelligence latest", getIntelligence)

    // Store the calculated results (Total, Avg, Percentage) in the session
    req.session.detailsForCalculation[getIntelligence.intelligence_type] = {
        Total: totalAnswer,
        Avg: avg,
        Percentage: avg * 10  // Assuming percentage is average * 10
    }
    // console.log(req.session.detailsForCalculation)
}








const fetchOLevelSubjectFromDB=async()=>{
    const OLevelSubjectsCommon = await db.select('subjects').from('olevel_local_subjects').where('subject_id',53)
    console.log(OLevelSubjectsCommon)
}

fetchOLevelSubjectFromDB();









// Function to calculate the total score for all intelligence types
const calculatingTotalScoreForAll = async (req) => {
    // Loop through all fetched intelligence types and calculate their scores
    for (let i = 0; i < intelligenceArray.length; i++) {
        console.log(intelligenceArray[i].intelligence_id)
        await accesingAnswers(req, intelligenceArray[i].intelligence_id);
    }
    // console.log("Details", req.session.detailsForCalculation)
}










// Function to retrieve all questions from the database and return them as an object
const getttingQuestionFromDB = async () => {
    const questions = await db.select('question', 'question_id').from('questions');
    const questionsObject = questions.reduce((acc, curr) => {
        acc[curr.question_id] = curr.question;
        return acc;
    }, {});
    return questionsObject;
}















// Function to assign intelligence IDs to the user's answered questions.
// It fetches the intelligence_id for each answered question and stores it in session.
const getIntelligenceType = async (req) => {
    try {
        if (!req.session.questionAndAnswers || Object.keys(req.session.questionAndAnswers).length === 0) {
            console.log("No answers found in session");
            return;
        }

        for (const questionId of Object.keys(req.session.questionAndAnswers)) {
            const result = await db.select('intelligence_id', 'question')
                .from('questions')
                .where('question_id', questionId)
                .first();

            if (result) {
                req.session.quesidWithIntelligenceAndquestions[questionId] = {
                    question: result.question,
                    answer: req.session.questionAndAnswers[questionId].answer,
                    // NOTE: The code references 'multiple_intelligence', but the SELECT does not include it.
                    // Make sure 'multiple_intelligence' is in the DB or adjust logic accordingly.
                    intelligence: result.multiple_intelligence 
                };
            }
        }

    } catch (error) {
        console.error("Error in getIntelligenceType:", error);
    }
};
















// Endpoint to get all questions for the assessment
app.get('/api/Assesment', async (req, res) => {
    try {
        const allQuestions = await getttingQuestionFromDB();
        res.send(allQuestions);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// Middleware for parsing JSON request bodies
app.use(express.json());









// Serve static files from the "public" directory, allowing frontend files to be delivered
app.use(express.static(path.join(__dirname, "..", "public")));















// Endpoint for receiving O-Level results and grades data from the client
app.post('/api/Ordinarylevelpage', (req, res) => {
    try {
        const { OLevelResultsAndGrades } = req.body;
        console.log(OLevelResultsAndGrades)
        // Process data as needed...
    } catch (error) {
        console.log("Failed to fetch OLevelResults");
    }
});
















// Endpoint for receiving extracurricular activities data from the client
app.post('/api/ExtraCurricular', (req, res) => {
    try {
        const { SelectedExtraActivities } = req.body;
        console.log(SelectedExtraActivities)
        // Process data as needed...
    } catch (error) {
        console.log(error)
    }
});















// Endpoint for receiving assessment answers from the client
app.post('/api/Assesment', async (req, res) => {
    try {
        const { questionAndAnswers } = req.body;
        // Store the user's answers in the session
        req.session.questionAndAnswers = questionAndAnswers
        console.log("Received answers:", req.session.questionAndAnswers);
        res.json({ Message: "received" });
    } catch (error) {
        res.status(500).json({ Message: "Error in Receiving Data" });
    }
});


















// Endpoint to calculate the final results and return them to the client
app.get('/api/calculation', async (req, res) => {
    // Get intelligence type info for answered questions
    await getIntelligenceType(req);
    // Calculate scores for all intelligence types
    await calculatingTotalScoreForAll(req);

    // Return the calculated details
    res.json(req.session.detailsForCalculation)
});














// Catch-all route to serve frontend on any other path
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
















// Start the server and listen on the specified port
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on Port ${PORT}`);
});
