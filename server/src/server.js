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
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000, // Session cookie max age in milliseconds
      secure: false,  // Set to true if using HTTPS in production
      httpOnly: true, // Cookie not accessible via JavaScript
      sameSite: 'lax', // SameSite policy for the cookie
    },
  })
);


// Array to hold intelligence data fetched from the database







app.use((req, res, next) => {
    try {
        req.session.quesidWithIntelligenceAndquestions ||= {};
        req.session.questionAndAnswers ||= {};
        req.session.detailsForCalculation ||= {};
        req.session.OLevelLocalCoreSubjectsArray ||= [];
        req.session.OLevelLocalBasketSubjectsArray ||= [];
        req.session.intelligenceArray ||= [];
        req.session.OLevelUserMiArray ||= {};
        req.session.OLpercentageObject ||= {};
        req.session.ALpercentageObject ||= {};
        req.session.ActivitypercentageObject ||= {};
        req.session.ALSubjects ||= [];
        req.session.MainActivities ||=[];
        req.session.ActivitiesObj ||={};
        req.session.FinalQuestionPercentages||={};
        
        next();
    } catch (error) {
        console.error("Error initializing session:", error.message);
        res.status(500).json({ error: "Failed to initialize session." });
    }
});




app.use(express.json());

let MainActivitiesGlobal;

const fetchMainActivitiesFromDB = async (req) => {
    try {
        if (!MainActivitiesGlobal) {
            MainActivitiesGlobal = await db.select("main_activity").from("main_activities");
        }

        req.session.MainActivities = [...MainActivitiesGlobal];

        // Log fetched data for debugging
    } catch (error) {
        console.error("Error fetching main activities from DB:", error.message);
    }
};

const calculateOLevelPercentage = async (req, subject, grade) => {
    try {
        // Fetch MI IDs for the subject
        const MiIdforSubject = await db
            .select("mi_1", "mi_2", "mi_3")
            .from("olevel_local_subjects")
            .where("subjects", subject);
        // console.log("Mi_id",MiIdforSubject)
        // Fetch MI Percentages for the subject
        const getMiPercentage = await db
            .select("mi_percentage1", "mi_percentage2", "mi_percentage3")
            .from("olevel_local_subjects")
            .where("subjects", subject);
        
            // console.log("Mi_percentage",getMiPercentage)

        // Fetch Intelligence Types based on MI IDs
        const getIntelligenceFromMiId = await db
        .select("intelligence_type")
        .from("mi_table")
        .whereIn("intelligence_id", [
          MiIdforSubject[0].mi_1,
          MiIdforSubject[0].mi_2,
          MiIdforSubject[0].mi_3,
        ])
        .orderByRaw(`
          CASE 
            WHEN intelligence_id = ? THEN 1
            WHEN intelligence_id = ? THEN 2
            WHEN intelligence_id = ? THEN 3
          END
        `, [
          MiIdforSubject[0].mi_1,
          MiIdforSubject[0].mi_2,
          MiIdforSubject[0].mi_3,
        ]);
            // console.log("mi_intelligence",getIntelligenceFromMiId)
      
            // Convert percentages to numeric values
        // const OLevelPercentagesValues = Object.values(getMiPercentage[0]).map(parseFloat);

        const OLevelPercentagesValues = [
            parseFloat(getMiPercentage[0]. mi_percentage1*3),
            parseFloat(getMiPercentage[0]. mi_percentage2*2),
            parseFloat(getMiPercentage[0]. mi_percentage3*1),


        ]

        // console.log("Thenuka",OLevelPercentagesValues)

        // Grade multipliers
        const gradeMultipliers = {
            A: 1,
            B: 0.75,
            C: 0.65,
            S: 0.55,
            F: 0.35,
        };

        // Get the multiplier for the grade or default to 0
        const multiplier = gradeMultipliers[grade] || 0;

        // Apply the multiplier to all percentages
        const OLevelPercentages = OLevelPercentagesValues.map(
            (percentage) => percentage * multiplier
        );
        // console.log("OLevelPerventageValues")

        // Ensure session objects are initialized
        // req.session.percentageObject = req.session.percentageObject || {};

        // Loop through intelligence types and accumulate percentages
        for (let i = 0; i < getIntelligenceFromMiId.length; i++) {
            const intelligenceType = getIntelligenceFromMiId[i].intelligence_type;
            const PercentageValue = OLevelPercentages[i];

            // Initialize intelligence type if not already present
            if (!req.session.OLpercentageObject[intelligenceType]) {
                req.session.OLpercentageObject[intelligenceType] = {
                    totalPercentage: 0,
                    AvgPercentage: 0,
                };
            }

            // Add the percentage value to the existing total
            req.session.OLpercentageObject[intelligenceType].totalPercentage += PercentageValue;

            // Recalculate the average percentage
            req.session.OLpercentageObject[intelligenceType].AvgPercentage =
            Math.round((req.session.OLpercentageObject[intelligenceType].totalPercentage / 6) * 10) / 10; // Adjust divisor if needed
        }
        return req.session.OLpercentageObject
        // console.log("Before",req.session);
    } catch (error) {
        console.error("Error calculating O-Level percentage:", error.message);
    }
};






const calculateALevelPercentage = async (req, subject, grade) => {
    try {
        // Fetch MI IDs for the subject
        const MiIdforSubject = await db
            .select("mi_1", "mi_2", "mi_3")
            .from("alevel_local_subjects")
            .where("subject", subject);
        // console.log("Mi_id",MiIdforSubject)
        // Fetch MI Percentages for the subject
        const getMiPercentage = await db
            .select("mi_percentage1", "mi_percentage2", "mi_percentage3")
            .from("alevel_local_subjects")
            .where("subject", subject);
        
            // console.log("Mi_percentage",getMiPercentage)

        // Fetch Intelligence Types based on MI IDs
        const getIntelligenceFromMiId = await db
        .select("intelligence_type")
        .from("mi_table")
        .whereIn("intelligence_id", [
          MiIdforSubject[0].mi_1,
          MiIdforSubject[0].mi_2,
          MiIdforSubject[0].mi_3,
        ])
        .orderByRaw(`
          CASE 
            WHEN intelligence_id = ? THEN 1
            WHEN intelligence_id = ? THEN 2
            WHEN intelligence_id = ? THEN 3
          END
        `, [
          MiIdforSubject[0].mi_1,
          MiIdforSubject[0].mi_2,
          MiIdforSubject[0].mi_3,
        ]);
            // console.log("mi_intelligence",getIntelligenceFromMiId)
      
            // Convert percentages to numeric values
        const ALevelPercentagesValues = [
            parseFloat(getMiPercentage[0]. mi_percentage1*3),
            parseFloat(getMiPercentage[0]. mi_percentage2*2),
            parseFloat(getMiPercentage[0]. mi_percentage3*1),

        ]


        // Grade multipliers
        const gradeMultipliers = {
            A: 1,
            B: 0.75,
            C: 0.65,
            S: 0.55,
            F: 0.35,
        };

        // Get the multiplier for the grade or default to 0
        const multiplier = gradeMultipliers[grade] || 0;

        // Apply the multiplier to all percentages
        const ALevelPercentages = ALevelPercentagesValues.map(
            (percentage) => percentage * multiplier
        );

        // Ensure session objects are initialized
        // req.session.percentageObject = req.session.percentageObject || {};

        // Loop through intelligence types and accumulate percentages
        for (let i = 0; i < getIntelligenceFromMiId.length; i++) {
            const intelligenceType = getIntelligenceFromMiId[i].intelligence_type;
            const PercentageValue = ALevelPercentages[i];

            // Initialize intelligence type if not already present
            if (!req.session.ALpercentageObject[intelligenceType]) {
                req.session.ALpercentageObject[intelligenceType] = {
                    totalPercentage: 0,
                    AvgPercentage: 0,
                };
            }

            // Add the percentage value to the existing total
            req.session.ALpercentageObject[intelligenceType].totalPercentage += PercentageValue;

            // Recalculate the average percentage
            req.session.ALpercentageObject[intelligenceType].AvgPercentage =
                Math.round((req.session.ALpercentageObject[intelligenceType].totalPercentage / 6) * 10) / 10; // Adjust divisor if needed
        }
        return req.session.ALpercentageObject
        // console.log("Before",req.session);
    } catch (error) {
        console.error("Error calculating A-Level percentage:", error.message);
    }
};















let intelligenceArrayGlobal = [];

// Function to fetch intelligence types from the database and store them in intelligenceArray
const fetchIntelligenceFromDB = async (req) => {
    intelligenceArrayGlobal = await db.select('*').from("mi_table");
    // console.log(response)
    for (let i = 0; i < intelligenceArrayGlobal.length; i++) {
        req.session.intelligenceArray.push(intelligenceArrayGlobal[i])
    }
    // console.log("Hello", req.session.intelligenceArray)
}







const fetchOLevelSubjectFromDB = async (pathline, sessionArray) => {
    if (sessionArray.length === 0) { // Fetch only if the array is empty
        const data = await db.select('subjects').from('olevel_local_subjects').where('pathline', pathline);
        sessionArray.push(...data); // Add data to the original array
        // console.log(`Fetched ${pathline} subjects:`, data);
    }
};















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
    // console.log("Total Answer", totalAnswer)

    // Get the intelligence_type name from the database for labeling
    const getIntelligence = await db.select("intelligence_type").from("mi_table").where("intelligence_id", intelligence_id).first();
    // console.log("Intelligence latest", getIntelligence)

    // Store the calculated results (Total, Avg, Percentage) in the session
    req.session.detailsForCalculation[getIntelligence.intelligence_type] = {
        Total: totalAnswer,
        Avg: avg,
        Percentage: avg * 10  // Assuming percentage is average * 10
    }
    // console.log(req.session.detailsForCalculation)
}












// Function to calculate the total score for all intelligence types
const calculatingTotalScoreForAll = async (req) => {
    // Loop through all fetched intelligence types and calculate their scores
    for (let i = 0; i < req.session.intelligenceArray.length; i++) {
        // console.log(intelligenceArray[i].intelligence_id)
        await accesingAnswers(req, req.session.intelligenceArray[i].intelligence_id);
    }
    // console.log("Details", req.session.detailsForCalculation)
}







let ALSubjectsArrayGlobal = null


const getAlLocalsubjectFromDB=async(req)=>{
    if(ALSubjectsArrayGlobal===null){

        ALSubjectsArrayGlobal =await  db.select('subject','stream').from('alevel_local_subjects')
        req.session.ALSubjects=ALSubjectsArrayGlobal;}
    
    else{
        req.session.ALSubjects=ALSubjectsArrayGlobal

    }

    // console.log(req.session.ALSubjects)
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




 

const checkIfSubActivityExistInMainActivity = async (req, activityNames) => {
    // Ensure req.session.ActivitiesObj exists
    if (!req.session.ActivitiesObj) {
        req.session.ActivitiesObj = {};
    }

    for (let i = 0; i < activityNames.length; i++) {
        const activityName = activityNames[i];

        try {
            // Query the database
            const result = await db
                .select('sub_activity')
                .from('sub_activities')
                .where('main_activity', activityName);

            console.log(`Result for ${activityName}:`, result);

            if (result && result.length > 0) {
                req.session.ActivitiesObj[activityName] = {
                    subActivity: result.map((item) => item.sub_activity)
                };
            } else {
                req.session.ActivitiesObj[activityName] = {
                    subActivity: undefined
                };
            }
        } catch (error) {
            console.error(`Error fetching sub-activities for ${activityName}:`, error);
            req.session.ActivitiesObj[activityName] = {
                subActivity: undefined
            };
        }
    }

    console.log("Final ActivitiesObj:", req.session.ActivitiesObj);
};








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






app.post('/api/AdvanceLevelPage',async(req,res)=>{
    try {
        const { ALevelResultsAndGrades } = req.body;
        req.session.ALevelResultsAndGrades=ALevelResultsAndGrades
        console.log("ALevelResultsAndGrades",req.session.ALevelResultsAndGrades)
 
        req.session.ALSubjectDone = Object.keys(req.session.ALevelResultsAndGrades);
        req.session.ALSubjectResults =Object.values(req.session.ALevelResultsAndGrades)
        for(let i=0;i<req.session.ALSubjectDone.length;i++){
            await calculateALevelPercentage(req,req.session.ALSubjectDone[i],req.session.ALSubjectResults[i]);
         }
         if(!req.session.AlevelFinalMipValues){
            req.session.AlevelFinalMipValues={}
         }
         req.session.AlevelFinalMipValues=req.session.ALpercentageObject;
         req.session.ALpercentageObject={};
         console.log("After calc",req.session);
         res.status(500).send("Data received")
    } catch (error) {
        console.log("Failed to fetch ALevelResults",error);
        res.status(500).json({ error: "Failed to process A-Level results." });

    }

})










// Endpoint to get all questions for the assessment
app.get('/api/Assesment', async (req, res) => {
    try {
        await fetchIntelligenceFromDB(req);
        const allQuestions = await getttingQuestionFromDB();
        res.send(allQuestions);
        

    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// Middleware for parsing JSON request bodies









// Serve static files from the "public" directory, allowing frontend files to be delivered






app.get('/api/Ordinarylevelpage/local-Core', async (req, res) => {
    try {
        if (!req.session.OLevelLocalCoreSubjectsArray.length) {
            await fetchOLevelSubjectFromDB('Core', req.session.OLevelLocalCoreSubjectsArray);
        }
        res.status(200).json(req.session.OLevelLocalCoreSubjectsArray);
    } catch (error) {
        console.error('Error fetching core subjects:', error.message);
        res.status(500).json({ error: "Failed to fetch core subjects." });
    }
});








app.get('/api/Advancelevelpage', async (req, res) => {
    try {
        await getAlLocalsubjectFromDB(req);
        res.json(req.session.ALSubjects);
    } catch (error) {
        console.error('Error fetching A-Level subjects:', error.message);
        res.status(500).send('Failed to fetch A-Level subjects.');
    }
});






 


app.get('/api/Ordinarylevelpage/local-Basket',async(req,res)=>{
    try{
        await fetchOLevelSubjectFromDB('Basket',req.session.OLevelLocalBasketSubjectsArray);
        res.json( req.session.OLevelLocalBasketSubjectsArray);
    }catch(error){
        console.error("Error Fetching Basket Subjects",error.message);
        res.status(500).send("Failed to Fetch Subjects")
    }
})












// Endpoint for receiving O-Level results and grades data from the client
app.post('/api/Ordinarylevelpage', async(req, res) => {
    try {
        const { OLevelResultsAndGrades } = req.body;
        req.session.OLevelResultsAndGrades=OLevelResultsAndGrades
        // console.log(req.session.OLevelResultsAndGrades)
 
        // console.log("Before calcu",req.sessionID)

        req.session.OLSubjectDone = Object.keys(req.session.OLevelResultsAndGrades);
        req.session.OLSubjectResults =Object.values(req.session.OLevelResultsAndGrades)
        for(let i=0;i<req.session.OLSubjectDone.length;i++){
            await calculateOLevelPercentage(req,req.session.OLSubjectDone[i],req.session.OLSubjectResults[i]);
         }
         if(!req.session.OlevelFinalMipValues){
            req.session.OlevelFinalMipValues={}
         }
         req.session.OlevelFinalMipValues=req.session.OLpercentageObject
         req.session.OLpercentageObject={};
         console.log("After calc",req.session);
         res.status(500).send("Data received")
    } catch (error) {
        console.log("Failed to fetch OLevelResults",error);
    }
});
















app.get('/api/Ordinarylevel', async(req, res) => {
    try{
        res.json(req.session.OlevelFinalMipValues);
        console.log(req.session)
    }catch(error){
        console.log(error)
        res.status(500).json({
            error:"Error sending Ordinary level MIP calculations"
        })
    }

});







app.get('/api/Activities',(req,res)=>{
    fetchMainActivitiesFromDB(req);
    res.send(req.session.MainActivities)
    console.log(req.session.MainActivities)
})











// Endpoint for receiving extracurricular activities data from the client
app.post('/api/Activities', async(req, res) => {
    try {
        const { SelectedExtraActivities } = req.body;
        req.session.SelectedExtraActivities = SelectedExtraActivities
        console.log(req.session.SelectedExtraActivities);
        await checkIfSubActivityExistInMainActivity(req,req.session.SelectedExtraActivities);
        res.send(req.session.ActivitiesObj);
        // Process data as needed...
    } catch (error) {
        console.log(error)
    }
});



const calculateActivitiesPercentage = async (req, Activity,level,tableType,ActivityType) => {
    try {

        const MiIdforActivity = await db
        .select("mi_1", "mi_2", "mi_3")
        .from(tableType)
        .where(ActivityType,Activity);
    
        const getMiPercentage = await db
        .select("mi_percentage1", "mi_percentage2", "mi_percentage3")
        .from(tableType)
        .where(ActivityType,Activity);
       
        

        const getIntelligenceFromMiId = await db
        .select("intelligence_type")
        .from("mi_table")
        .whereIn("intelligence_id", [
          MiIdforActivity[0].mi_1,
          MiIdforActivity[0].mi_2,
          MiIdforActivity[0].mi_3,
        ])
        .orderByRaw(`
          CASE 
            WHEN intelligence_id = ? THEN 1
            WHEN intelligence_id = ? THEN 2
            WHEN intelligence_id = ? THEN 3
          END
        `, [
            MiIdforActivity[0].mi_1,
            MiIdforActivity[0].mi_2,
            MiIdforActivity[0].mi_3,
        ]);

        const ActivitiesPercentagesValues = [
            parseFloat(getMiPercentage[0]. mi_percentage1*3),
            parseFloat(getMiPercentage[0]. mi_percentage2*2),
            parseFloat(getMiPercentage[0]. mi_percentage3*1),

        ]


        const ActivityMultipliers = {
            "Just Participated": 0.40,
            "School": 0.50,
            "Zonal/Interschool": 0.60,
            "National": 0.70,
            "International": 1,
        };

        const multiplier = ActivityMultipliers[level] || 0;

        const ActivitiesPercentages = ActivitiesPercentagesValues.map(
            (percentage) => percentage * multiplier
        );


        for (let i = 0; i < getIntelligenceFromMiId.length; i++) {
            const intelligenceType = getIntelligenceFromMiId[i].intelligence_type;
            const PercentageValue = ActivitiesPercentages[i];


            if (!req.session.ActivitypercentageObject[intelligenceType]) {
                req.session.ActivitypercentageObject[intelligenceType] = {
                    totalPercentage: 0,
                    AvgPercentage: 0,
                };
            }


            req.session.ActivitypercentageObject[intelligenceType].totalPercentage += PercentageValue;

            req.session.ActivitypercentageObject[intelligenceType].AvgPercentage =
                Math.round((req.session.ActivitypercentageObject[intelligenceType].totalPercentage / 6) * 10) / 10; // Adjust divisor if needed
        }
        // console.log("thenuka",req.session.ActivitypercentageObject)
        return req.session.ActivitypercentageObject
    } catch (error) {
        console.error("Error calculating Activity-Level percentage:", error.message);
    }
};





app.post("/api/Activities/results",async(req,res)=>{
    const {ActivitiesToSendBE,SelectedSubActivities,ActivitiesWithoutSub} = req.body;
    console.log("SelectedSubActivities",SelectedSubActivities);
    console.log("ActivitiesWithoutSub",ActivitiesWithoutSub);
    console.log("Activities From User",ActivitiesToSendBE);

    for(let i=0;i<SelectedSubActivities.length;i++){
        const level = ActivitiesToSendBE[SelectedSubActivities[i]];
        await calculateActivitiesPercentage(req,SelectedSubActivities[i],level,"sub_activities","sub_activity")
    }

    for(let i=0;i<ActivitiesWithoutSub.length;i++){
        const level = ActivitiesToSendBE[ActivitiesWithoutSub[i]];
        await calculateActivitiesPercentage(req,ActivitiesWithoutSub[i],level,"main_activities","main_activity")
    }

    if(!req.session.ActivitiesFinalMipValues){
        req.session.ActivitiesFinalMipValues={}
     }

     req.session.ActivitiesFinalMipValues=req.session.ActivitypercentageObject
     req.session.ActivitypercentageObject={};

    res.send("Activities received")
    console.log(req.session)


})









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







const mapCareer = async(req) =>{
    const firstThreePercentagesAndIntelligences = Object.fromEntries(
        Object.entries(req.session.FinalQuestionPercentages).slice(0, 3)
      );  

    console.log("firstThreePercentagesAndIntelligences",firstThreePercentagesAndIntelligences)
  
    
    const intelligences = Object.keys(firstThreePercentagesAndIntelligences);

    console.log("intelligences",intelligences);

    const intelligenceIds = await db
    .select("intelligence_id")
    .from("mi_table")
    .whereIn("intelligence_type", intelligences)
    .orderByRaw(`
        CASE
            ${intelligences
                .map((type, index) => `WHEN intelligence_type = '${type}' THEN ${index + 1}`)
                .join(' ')}
        END
    `);
      
      console.log("Intelligence IDs:", intelligenceIds);
           
    
    const intelligenceIdArray = intelligenceIds.map(value=>value.intelligence_id);

    console.log(intelligenceIdArray);
    const percentages = Object.values(firstThreePercentagesAndIntelligences).map(value=>value.Percentage);

    console.log("threePercentages",percentages);

  const careerlist = (await db.select("career")
                              .from("career_table")
                              .where("mi_1",intelligenceIdArray[0])
                              .where("mi_2",intelligenceIdArray[1])
                              .where("mi_3",intelligenceIdArray[2])
                              .where("mi_percentage1","<=",percentages[0])
                              .where("mi_percentage2","<=",percentages[1])
                              .where("mi_percentage3","<=",percentages[2])

    ).map(careerlist=>careerlist.career);
  
  console.log("careerlist",careerlist)                              
                                          
}










// Endpoint to calculate the final results and return them to the client
app.get('/api/calculation', async (req, res) => {
    // Get intelligence type info for answered questions
    await getIntelligenceType(req);
    // Calculate scores for all intelligence types
    await calculatingTotalScoreForAll(req);

    // Return the calculated details
    res.json(req.session.detailsForCalculation);

    req.session.FinalQuestionPercentages = Object.entries(req.session.detailsForCalculation)
  .sort(([, a], [, b]) => b.Percentage - a.Percentage) // Sort by percentage descending
  .reduce((acc, [key, value]) => {
    acc[key] = value; // Reconstruct the object
    return acc;
  }, {});

  console.log("FinalQuestionPercentages",req.session.FinalQuestionPercentages)
  mapCareer(req);
});



app.post('/api/CareerMapping',(req,res)=>{

})








app.use(express.static(path.join(__dirname, "..", "public")));

// Catch-all route to serve frontend on any other path
app.get("/*", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    } catch (error) {
        console.error("Error serving frontend:", error.message);
        res.status(500).json({ error: "Failed to serve frontend." });
    }
});

















// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
