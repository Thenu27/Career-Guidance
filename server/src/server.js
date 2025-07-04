const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT|| 3000
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const xssClean = require('xss-clean');
const { StatusCodes} = require('http-status-codes');
const session = require('express-session');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);  // The older API usage
const redis = require('redis');  
const db = require('../src/db/connectDB');
const {getPasswordFromDB,comparePassword,getUsernameFromDB,compareUsername} = require('../src/controllers/auth');
const {generateJwt} = require('../src/controllers/jwtController');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const {clienthashPassword,createAccount,userLogin,getUserDataFromDB} = require('./controllers/clientAuth');
const {verifyToken, generateToken} = require('../src/controllers/clientJwtController');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const emailRouter = require('./Route/EmailRoute')
const careerRouter = require('./Route/careerRoute')
const {addTaskToDatabase,deleteTasksFromDatabase} = require('./controllers/adminCareerController');
const {deleteAdminCareerTask,updateOrInsertCareerTasks,updateInserTasksWhenIdChanged} = require('./controllers/adminTaskController')
const {saveMipOfUser} =require('./controllers/MipController.js')
const adminCourseRouter = require('./Route/adminCourseRoute.js')
const adminCareerRouter = require('./Route/adminCareerRoute.js')
const adminSpatializationRouter = require('./Route/adminSpatializationRoute.js');


require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

app.use(cors({
    origin: ['https://api.univerlens.com','https://www.univerlens.com','http://localhost:3001','http://localhost:3000','https://univerlens.com','http://localhost:5173','http://localhost:5173/api','https://api.univerlens.com/admin'],
    methods: ['GET', 'POST','OPTIONS'],        // Specify the HTTP methods your API supports
    credentials: true                // Allow credentials (cookies, sessions, etc.)
}));
app.set('trust proxy', 1);


const limiter = rateLimit({
    windowMs:1*60*1000,
    max:100,
    message:"Too many Requests, Please try agin in a minute"
})

const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
  });




redisClient.on('connect', () => {
    console.log('Connected to Redis!');
});
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    // res.setHeader("Access-Control-Allow-Origin", "https://accounts.google.com");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


// const knex = require('knex');
const { STATUS_CODES } = require("http");




app.use(
    helmet({
        crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }, // ✅ Fix Google OAuth issue
    })
);



app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: [
                    "'self'", 
                    "https://api.univerlens.com", 
                    "https://accounts.google.com", 
                    "https://oauth2.googleapis.com",
                    "https://www.googleapis.com",  // ✅ Allow Google APIs
                    "http://localhost:3000", // ✅ Local frontend
                    "https://univerlens.com",
                    "http://localhost:5173", // ✅ add this
                    // ✅ Production frontend
                ],
                scriptSrc: [
                    "'self'",
                    "'unsafe-inline'",  // ✅ Needed for Google scripts
                    "'unsafe-eval'",  // ✅ Helps avoid Google script errors
                    "https://cdn.jsdelivr.net",
                    "https://cdnjs.cloudflare.com",
                    "https://accounts.google.com"
                ],
                styleSrc: [
                    "'self'", 
                    "'unsafe-inline'",  // ✅ Needed for Google styles
                    "https://fonts.googleapis.com",
                    "https://accounts.google.com/gsi/style"
                ],
                frameSrc: [
                    "'self'", 
                    "https://accounts.google.com",
                    "https://univerlens.com"
                ],
                imgSrc: ["'self'", "data:"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    })
);




  app.use(xssClean()); // Protect against XSS attacks


const store = new RedisStore({
    client: redisClient
  });


app.use(
  session({
    store, // Pass redisClient directly
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000, // Session cookie max age in milliseconds
      secure: process.env.NODE_ENV === 'production',  // Set to true if using HTTPS in production
      httpOnly: true, // Cookie not accessible via JavaScript
      sameSite: 'lax', // SameSite policy for the cookie
    },
  })
);


// Array to hold intelligence data fetched from the database




app.use(limiter);


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
        req.session.careerList ||=[];
        req.session.moderateCareerList ||=[];
        req.session.careersObject||={};
        
        next();
    } catch (error) {
        console.error("Error initializing session:", error.message);
        res.status(500).json({ error: "Failed to initialize session." });
    }
});


passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async(accessToken,refreshToken,profile,done) => {

            const email = profile.emails[0].value;

            let user = await db.select("*").from("users").where("email", email).first();

            if(!user){

                const result = await db("users")
                .insert({fullname: profile.displayName,
                         email: profile.emails[0].value
                })
                .returning("*");
                console.log("result",result)
                user = {
                    id: profile.id,
                    fullname: profile.displayName,
                    email: profile.emails[0].value
                  };
            }

            return done(null, user);

        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});

app.get('/auth/google',passport.authenticate("google",{scope: ["profile","email"]}));


app.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"/login"}),
        (req,res)=>{
            try{
                console.log("Authenticated user:", req.user);
                const token = generateToken(req.user.id)

                res.cookie("token", token, {
                    httpOnly: true, // Prevent XSS attacks
                    secure: process.env.NODE_ENV === "production", // Secure only in production
                    sameSite: "Lax", // CSRF protection
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });

                res.redirect("https://univerlens.com/Assesment");
            }catch(err){
                console.log(err)
            }


        }            
)


db.raw('SELECT 1')
    .then(() => console.log('Database connection established successfully!'))
    .catch((err) => {
        console.error('Database connection failed:', err.message);
});
  

app.use(express.json({ limit: "5mb" })); 
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use('/api/email',emailRouter)
app.use('/api/v1/client/career',careerRouter)
app.use('/api/v1/admin/career',adminCareerRouter)
app.use('/api/v1/admin/higher-education',adminCourseRouter)
app.use('/api/v1/admin/spcialization', careerRouter);
app.use('/api/v1/admin/spatialization',adminSpatializationRouter);
 
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

        const OLevelPercentagesValues = [
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
        const OLevelPercentages = OLevelPercentagesValues.map(
            (percentage) => percentage * multiplier
        );

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
    try{
        intelligenceArrayGlobal = await db.select('*').from("mi_table");
        // console.log(response)
        for (let i = 0; i < intelligenceArrayGlobal.length; i++) {
            req.session.intelligenceArray.push(intelligenceArrayGlobal[i])
        }

    }catch(error){
        console.error("Error fetching intelligence form Databse",error)
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
    try {
        const questions = await db.select('question', 'question_id').from('questions');
        const questionsObject = questions.reduce((acc, curr) => {
            acc[curr.question_id] = curr.question;
            return acc;
        }, {});
        return questionsObject;
    } catch (error) {
        console.error('Error retrieving questions from the database:', error);
        throw new Error('Could not retrieve questions from the database. Please try again later.');
    }
};



 

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




app.post('/api/clientAuth/logout',async(req,res)=>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure HTTPS in production
            sameSite: 'Lax',
        });
        return res.status(200).json({ message: "Logged out successfully" });
    }catch(err){
        return res.status(400).json({ message: "Logout Unsuccesfull!" });
    }


})




app.get('/api/clientAuth',verifyToken,async(req,res)=>{
    res.status(StatusCodes.OK).send({user:req.user})
})

app.post('/api/AdvanceLevelPage',verifyToken,async(req,res)=>{
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
app.get('/api/Assesment',async (req, res) => {
    try {
        await fetchIntelligenceFromDB(req);
        const allQuestions = await getttingQuestionFromDB();
        res.status(200).json(allQuestions);
        

    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// Middleware for parsing JSON request bodies






app.get('/api/Ordinarylevelpage/local-Core',async (req, res) => {
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








app.get('/api/Advancelevelpage',async (req, res) => {
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
app.post('/api/Ordinarylevelpage',verifyToken,async(req, res) => {
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







app.get('/api/Activities', async (req, res) => {
    try {
        await fetchMainActivitiesFromDB(req);
        res.json(req.session.MainActivities);
    } catch (error) {
        console.error("Error fetching activities:", error.message);
        res.status(500).json({ error: "Failed to fetch activities." });
    }
});











// Endpoint for receiving extracurricular activities data from the client
app.post('/api/Activities',verifyToken,async(req, res) => {
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





app.post("/api/Activities/results",verifyToken,async(req,res)=>{
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




const calculating_Mip_From_Questions = async (questionsObject) => {
    let intelligence_object = {};

    // Get total number of intelligence categories
    const intelligenceCount = await db("mi_table").count("* as count").first();
    const intelligencelength = Number(intelligenceCount.count);

    // Fetch all questions and intelligence mappings in one query (efficient)
    const questions_data = await db
        .select("question_id", "intelligence_id")
        .from("questions")
        .whereIn("intelligence_id", Array.from({ length: intelligencelength }, (_, i) => i + 1));

    // Process each question's intelligence mapping
    questions_data.forEach(({ question_id, intelligence_id }) => {
        const answer = Number(questionsObject[question_id]?.answer || 0); // Avoid undefined errors

        // Initialize intelligence_id if not present
        if (!intelligence_object[intelligence_id]) {
            intelligence_object[intelligence_id] = {
                intelligence_total: 0,
                intelligence_count: 0,
                intelligence_percentage:0
            };
        }

        // Accumulate intelligence total and count
        intelligence_object[intelligence_id].intelligence_total += answer;
        intelligence_object[intelligence_id].intelligence_count += 1;
    });
    
    Object.keys(intelligence_object).forEach((key) => {
        const obj = intelligence_object[key];
        const sum = obj.intelligence_total;
        const totalCount = obj.intelligence_count;

        // console.log("sum:", sum);
        // console.log("totalCount:", totalCount);

        // Avoid division by zero
        obj.intelligence_percentage = totalCount > 0 ? (sum / (totalCount * 10)) * 100 : 0;
    });
    
    const sortedEObject = Object.entries(intelligence_object)
                .sort(([, a], [, b]) => Number(b.intelligence_percentage) - Number(a.intelligence_percentage))

                // console.log(sortedEObject);            
    return sortedEObject
    
};


const mapCareer=async(iq_percentages,non_iq_ids)=>{
    let final_career_object ={}
    const iq_percentages_as_numbers = iq_percentages.map(Number);
    // console.log("iq_percentages_as_numbers",iq_percentages_as_numbers)
    const non_iq_ids_as_numbers = non_iq_ids.slice(0, 4).map(Number);
    // console.log("non_iq_ids_as_numbers",non_iq_ids_as_numbers)
    try{

            const iq_careers = await db
                .select("career")
                .from("career_table")
                .where("logical", "<=", iq_percentages_as_numbers[0]) 
                .andWhere("linguistic", "<=", iq_percentages_as_numbers[1]) 
                .andWhere("spatial", "<=", iq_percentages_as_numbers[2]); 
            // console.log("iq_careers:",iq_careers)    
                
            if(iq_careers.length>0){
                const best_careers1 = await db.select("career").from("career_table")
                                        .where("non_iq_intelligence1",non_iq_ids_as_numbers[0])
                                        .andWhere("non_iq_intelligence2",non_iq_ids_as_numbers[1])  
                                        .andWhere("non_iq_intelligence3",non_iq_ids_as_numbers[2])  
                                        .andWhere("non_iq_intelligence4",non_iq_ids_as_numbers[3]);

                const best_careers2 = await db.select("career").from("career_table")
                                        .where("non_iq_intelligence1",non_iq_ids_as_numbers[0])
                                        .andWhere("non_iq_intelligence2",non_iq_ids_as_numbers[1])  
                                        .andWhere("non_iq_intelligence3",non_iq_ids_as_numbers[2])
                                        
                const best_careers3 =  await db.select('career')
                                                .from('career_table')
                                                .where('non_iq_intelligence1', non_iq_ids_as_numbers[0]) // 4 must be in non_iq_intelligence1
                                                .where('non_iq_intelligence2', non_iq_ids_as_numbers[1]) // 5 must be in non_iq_intelligence2
                                                .whereIn('non_iq_intelligence3', [non_iq_ids_as_numbers[2],non_iq_ids_as_numbers[3]]) // 6 or 7 can be in non_iq_intelligence3
                                                .whereIn('non_iq_intelligence4', [non_iq_ids_as_numbers[2],non_iq_ids_as_numbers[3]]) // 6 or 7 can be in non_iq_intelligence4
                                                .whereNot('non_iq_intelligence3', db.ref('non_iq_intelligence4')); // Ensure 6 and 7 are different
                
                const best_careers4 = await db.select('career')
                                                .from('career_table')
                                                .where('non_iq_intelligence1', non_iq_ids_as_numbers[0]) // 4 must be in non_iq_intelligence1
                                                .whereIn('non_iq_intelligence2', [non_iq_ids_as_numbers[1], non_iq_ids_as_numbers[2], non_iq_ids_as_numbers[3]]) // 5,6,7 in any order
                                                .whereIn('non_iq_intelligence3', [non_iq_ids_as_numbers[1], non_iq_ids_as_numbers[2], non_iq_ids_as_numbers[3]]) // 5,6,7 in any order
                                                .whereIn('non_iq_intelligence4', [non_iq_ids_as_numbers[1], non_iq_ids_as_numbers[2], non_iq_ids_as_numbers[3]]) // 5,6,7 in any order
                                                .whereNot('non_iq_intelligence2', db.ref('non_iq_intelligence3')) // Ensure 5,6,7 are unique
                                                .whereNot('non_iq_intelligence2', db.ref('non_iq_intelligence4'))
                                                .whereNot('non_iq_intelligence3', db.ref('non_iq_intelligence4'));
                                                                                       


                //   console.log("best_careers1",best_careers1)    
                //   console.log("best_careers2",best_careers2)                          
                //   console.log("best_careers3",best_careers3)  
                //   console.log("best_careers4",best_careers4)    
  
                  
                  const allCareers = [
                    ...best_careers1,
                    ...best_careers2,
                    ...best_careers3,
                    ...best_careers4
                ].map(item => item.career); // Extract only career names
                
                // Convert to a Set to remove duplicates, then back to an array
                const uniqueCareers = [...new Set(allCareers)];
                const best_careers_all = uniqueCareers.filter(careerName => 
                    iq_careers.some(iq => iq.career === careerName)
                );
                
                console.log("best_careers_all",best_careers_all)

                final_career_object["bestCareers"]=best_careers_all
                                
                 const good_careers1 = await db.select('career').from("career_table")
                                                .whereIn('non_iq_intelligence1', non_iq_ids_as_numbers)
                                                .whereIn('non_iq_intelligence2', non_iq_ids_as_numbers)
                                                .whereIn('non_iq_intelligence3', non_iq_ids_as_numbers)
                                                .whereIn('non_iq_intelligence4', non_iq_ids_as_numbers)
                                                .whereNot('non_iq_intelligence1', db.ref('non_iq_intelligence2'))
                                                .whereNot('non_iq_intelligence1', db.ref('non_iq_intelligence3'))
                                                .whereNot('non_iq_intelligence1', db.ref('non_iq_intelligence4'))
                                                .whereNot('non_iq_intelligence2', db.ref('non_iq_intelligence3'))
                                                .whereNot('non_iq_intelligence2', db.ref('non_iq_intelligence4'))
                                                .whereNot('non_iq_intelligence3', db.ref('non_iq_intelligence4'));
                
                console.log("Good_careers1",good_careers1)
                
                const good_careers2 = await db('career_table')
                .select('*')
                .whereRaw(
                    'ARRAY[?::INTEGER, ?::INTEGER, ?::INTEGER] <@ ARRAY[non_iq_intelligence1, non_iq_intelligence2, non_iq_intelligence3, non_iq_intelligence4]',
                    [non_iq_ids[0], non_iq_ids[1], non_iq_ids[2]]
                );
            
            
    
    

                   
                        
                        // console.log("Good_careers2",good_careers2)
                
                        const good_careers_combined = [
                            ...good_careers1,
                            ...good_careers2,
                        ].map(item => item.career); // Extract only career names
                        
                        // Convert to a Set to remove duplicates, then back to an array
                        const good_careers = [...new Set(good_careers_combined)]; 

                        const final_good_careers = good_careers.filter(item => !best_careers_all.includes(item));
                        // console.log("final_good_careers",final_good_careers)
                        final_career_object["GoodCareers"]=final_good_careers

                        const suitable_careers1 = await db
                            .select('career')
                            .from('career_table')
                            .whereRaw('? IN (non_iq_intelligence1, non_iq_intelligence2, non_iq_intelligence3, non_iq_intelligence4)', [non_iq_ids_as_numbers[0]])
                            .whereRaw('? IN (non_iq_intelligence1, non_iq_intelligence2, non_iq_intelligence3, non_iq_intelligence4)', [non_iq_ids_as_numbers[1]])
                            .whereNot('non_iq_intelligence1', db.ref('non_iq_intelligence2'))
                            .whereNot('non_iq_intelligence1', db.ref('non_iq_intelligence3'))
                            .whereNot('non_iq_intelligence1', db.ref('non_iq_intelligence4'))
                            .whereNot('non_iq_intelligence2', db.ref('non_iq_intelligence3'))
                            .whereNot('non_iq_intelligence2', db.ref('non_iq_intelligence4'))
                            .whereNot('non_iq_intelligence3', db.ref('non_iq_intelligence4'));
                    

                // console.log("suitable_careers1",suitable_careers1);


                const suitable_careers2 = await db.select('career')
                                                    .from('career_table')
                                                    .where('non_iq_intelligence1',non_iq_ids_as_numbers[0])
                                                    .where('non_iq_intelligence2', non_iq_ids_as_numbers[1])
                // console.log("suitable_careers2",suitable_careers2);

                const suitable_careers3 =  await db.select('career')
                                                    .from('career_table')
                                                    .where(builder => {
                                                    builder.where('non_iq_intelligence1', non_iq_ids_as_numbers[0])
                                                        .orWhere('non_iq_intelligence2', non_iq_ids_as_numbers[0])
                                                        .orWhere('non_iq_intelligence3', non_iq_ids_as_numbers[0])
                                                        .orWhere('non_iq_intelligence4', non_iq_ids_as_numbers[0]);
                 });
                
                //  console.log("suitable_careers3",suitable_careers3);


                 const suitable_careers4 =  await db.select('career')
                                                    .from('career_table')
                                                    .where(builder => {
                                                    builder.where('non_iq_intelligence1', non_iq_ids_as_numbers[1])
                                                        .orWhere('non_iq_intelligence2', non_iq_ids_as_numbers[1])
                                                        .orWhere('non_iq_intelligence3', non_iq_ids_as_numbers[1])
                                                        .orWhere('non_iq_intelligence4', non_iq_ids_as_numbers[1]);
                                                        });

                    // console.log("suitable_careers4",suitable_careers4);


                    const suitable_careers_combined = [
                        ...suitable_careers1,
                        ...suitable_careers2,
                        ...suitable_careers3,
                        ...suitable_careers4
                    ].map(item => item.career); // Extract only career names
                    
                    // Convert to a Set to remove duplicates, then back to an array
                    const suitable_careers = [...new Set(suitable_careers_combined)]; 
                     
                    const final_suitable_careers = suitable_careers.filter(
                        item => !best_careers_all.includes(item) && !final_good_careers.includes(item)
                      );

                    // console.log("final_suitable_careers",final_suitable_careers);

                    final_career_object["SuitableCareers"]=final_suitable_careers

                    return(final_career_object);

            }else{
                console.log("No career found")
            }
        
            



        }catch(err){
        return err
    }
}

const CheckAndMapCareer=async(intelligence_object)=>{
    let count =0;
    
    const requiredIDs = ['1', '2', '3'];
    const iq_percentages = requiredIDs
    .map(id => intelligence_object.find(([objId]) => objId === id)) // Find each ID in order
    .filter(Boolean) // Remove undefined results (if any ID is missing)
    .map(([, value]) => value.intelligence_percentage);


    const non_iq_ids = intelligence_object
        .filter(([id]) => !requiredIDs.includes(id)) // Exclude IDs "1", "2", "3"
        .map(([id]) => id); // Extract only intelligence_id


    console.log("non_iq_ids ",non_iq_ids )
    const careers =  await mapCareer(iq_percentages,non_iq_ids)

    return careers
    // console.log("iq_available",iq_available)
}

app.post('/api/login',userLogin);





app.post('/api/signup',async(req,res)=>{
    try{
        const {formData} = req.body
        const existingUser = await db.select("email").from("users").where("email",formData.email).first()
        if(existingUser){
            return res.status(StatusCodes.CONFLICT).send("User already exists")
        }
        const hashedPassword =await clienthashPassword(formData.password)
        // console.log(hashedPassword);
        const result = await createAccount(formData,hashedPassword);
        const userData = await getUserDataFromDB(formData.email);
        const token = generateToken(userData[0].id)
        res.cookie("token", token,{
            httpOnly: true, // Prevent XSS attacks  
            secure: process.env.NODE_ENV === "production", // Secure only in production
            sameSite: "Lax", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        if(!result){
            return res.status(StatusCodes.BAD_REQUEST).send("Error Occured")
        } 
        return res.status(StatusCodes.OK).json({msg:"Account Created!"}) 
        
    }catch(err){
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });

    }

})

// Endpoint for receiving assessment answers from the client
app.post('/api/Assesment',verifyToken,async (req, res) => {
    try {
        const { questionAndAnswers } = req.body;
        // console.log("questionAndAnswers",questionAndAnswers)
        const intelligence_object =await calculating_Mip_From_Questions(questionAndAnswers);
       const careers = await CheckAndMapCareer(intelligence_object)
        // console.log("intelligence_object",intelligence_object)
        console.log('req.user',req.user)
        const savedData = saveMipOfUser(intelligence_object,req.user.id)
        res.status(200).json({intelligence_object:intelligence_object,final_career_object:careers});
    } catch (error) {
        res.status(500).json({ Message: "Error in Receiving Data" });
    }
});






app.get('/api/career', (req, res) => {
    if (!req.session.careersObject) {
        return res.status(404).json({ error: "Careers not found." });
    }
    res.json(req.session.careersObject);
});



// let  IntelligenceIDAdmin

app.post('/api/admin/intelligence',async(req,res)=>{
    try{
        const {value}=req.body;
        const IntelligenceIDAdmin =value
        console.log("IntelligenceIDAdmin",IntelligenceIDAdmin)
        const adminQuestions =  await fetchAdminQuestions(IntelligenceIDAdmin);

        res.json(adminQuestions)
    }catch(error){
        console.error("SelectedIntelligenceAdmin",error)
    }

})



const fetchAdminQuestions =async(value)=>{
         const response = await db.select('*')
                                  .from('questions')
                                  .where('intelligence_id',value)  
        return response                             
    
}

const fetchAdminOLevelLocalSubjFromDB=async()=>{
    try{
        const response = await db.select('subject_id','subjects','pathline','mi_1','mi_2','mi_3','mi_percentage1','mi_percentage2','mi_percentage3','pathline')
        .from('olevel_local_subjects')
        
        return response;
    }catch(error){
        console.error("Error when Fetchin subjects from database",error)
    }

}


const fetchAdminALevelLocalSubjFromDB=async()=>{
    try{
        const response = await db.select('subject_id','subject','stream','mi_1','mi_2','mi_3','mi_percentage1','mi_percentage2','mi_percentage3')
        .from('alevel_local_subjects')
        
        return response;
    }catch(error){
        console.error("Error when Fetchin subjects from database",error)
    }

}

const fetchAdminActivitiesFromDB=async()=>{
    try{
        const response = await db.select('main_activity')
        .from('main_activities')
        
        return response;
    }catch(error){
        console.error("Error when Fetchin subjects from database",error)
    }

}

app.get('/api/admin/olevel/subjects',async(req,res)=>{
    try{
        const localsubj = await fetchAdminOLevelLocalSubjFromDB();
        console.log(localsubj);
        res.json(localsubj)
    }catch(error){
        console.error("Error sending oLevel local subjects to Front end", error)
    }
})


app.get('/api/admin/advancedlevel/subjects',async(req,res)=>{
    try{
        const localsubj = await fetchAdminALevelLocalSubjFromDB();
        console.log(localsubj);
        res.json(localsubj)
    }catch(error){
        console.error("Error sending oLevel local subjects to Front end", error)
    }
})


app.get('/api/admin/activities',async(req,res)=>{
    try{
        const activities = await fetchAdminActivitiesFromDB();
        console.log(activities);
        res.json(activities);
    }catch(error){
        console.error('Failed to fetch Main Activities from DB');
    }

})

const addNewQuestionToDB = async(questionToBeAdded,intelligenceId)=>{
    try{
        const result = await db("questions")
        .insert({
            question:questionToBeAdded,
            intelligence_id:intelligenceId
        })
        .returning('*');

        if(result){
        console.log("Error occured")
        }                    
        console.log("result",result)    
        return result    
    }catch(err){
        console.log(err)
    }
            
}

app.post('/api/questions/add',async(req,res)=>{
    try{
        const {questionToBeAdded} = req.body;
        const question = questionToBeAdded.question;
        const intelligenceId = questionToBeAdded.intelligenceId;
        console.log(question)
        console.log(intelligenceId)

        console.log(questionToBeAdded);
        const questionAdded = await addNewQuestionToDB(question,intelligenceId);
        if(!questionAdded){
          return res.status(StatusCodes.BAD_REQUEST).send('Error occured when adding to Database')
        }

        return res.status(StatusCodes.CREATED).send('Succesfully Created')
    }catch(error){

    }
})

const deleteAdminQuestionFRomDB=async(question,questionId)=>{
    try{
        const response = await db('questions').where('question_id',questionId).del();
        return response;
    }catch(error){
        console.error("Error deleting question",error);
        throw error;
    }
}

app.post('/api/admin/question/delete',async(req,res)=>{
    try{
        const {question,questionId} = req.body;
        console.log(question,questionId);
        const result = await deleteAdminQuestionFRomDB(question,questionId);
        if(!result){
           return res.status(StatusCodes.NOT_FOUND).send("Error occured when deleting the question")
        }
        res.status(StatusCodes.OK).send('Question Deleted')
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }

})

const updateQuestion = async (id, updatedQuestion) => {
    try {    
        const result = await db('questions')
            .where({ question_id:id })  // Properly use WHERE clause
            .update({ question: updatedQuestion })  // Correct update syntax
            .returning('*');  // Return updated row
        
        return result;  // Return the first updated row (if multiple)
    } catch (err) {
        console.error("Error updating question:", err);
        throw err;
    }
};


app.post('/api/admin/question/update', async (req, res) => {
    try {

        const { questionId, updatedQuestion } = req.body;
        const result = await updateQuestion(questionId,updatedQuestion);
        if(!result){
            res.status(StatusCodes.NOT_FOUND).send('Error occured when updating the question')
        }
        console.log('questionId:', questionId);
        console.log('updatedQuestion:', updatedQuestion);
        res.status(StatusCodes.CREATED).send('Question updated successfully');

    } catch (error) {
        console.error('Error updating question:', error);

        res.status(500).json({
            message: 'Failed to update the question',
            error: error.message || 'Unknown error',
        });
    }
});


app.post('/api/admin/ordinarylevel/add', async (req, res) => {
    try {
        const {
            SelectedIntlligence01,
            SelectedIntlligence02,
            SelectedIntlligence03,
            score01,
            score02,
            score03,
            NewSubject

        } = req.body;

        // Log the received data for debugging
        console.log("Received data:", {
            SelectedIntlligence01,
            SelectedIntlligence02,
            SelectedIntlligence03,
            score01,
            score02,
            score03,
            NewSubject

        });

        // Here you would save the data to your database
        // Example: await database.save({ ... });

        res.status(200).json({ message: 'Data added successfully!' });
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ message: 'An error occurred while adding the data.' });
    }
});


app.post('/api/admin/o-level/update',(req,res)=>{
    try{
        const {Intelligence1,
            Intelligence2,
            Intelligence3,
            Score1,
            Score2,
            Score3,
            OLSubject
     } = req.body;
 
     console.log('Intelligence1:',Intelligence1)
     console.log('Intelligence2:',Intelligence2)
     console.log('Intelligence3:',Intelligence3)
     console.log('Score1:',Score1);
     console.log('Score2:',Score2);
     console.log('Score3:',Score3);
     console.log('O-level-Subject:',OLSubject)
 
     res.status(200).send('Subject Updated Succesfully')

   }catch(err){
    res.send('Error Receiving O Level Data ',err)
   }


})


app.post('/api/admin/a-level/update',(req,res)=>{
    const {Intelligence1,
           Intelligence2,
           Intelligence3,
           Score1,
           Score2,
           Score3,
           ALSubject
    } = req.body;

    console.log('Intelligence1:',Intelligence1)
    console.log('Intelligence2:',Intelligence2)
    console.log('Intelligence3:',Intelligence3)
    console.log('Score1:',Score1);
    console.log('Score2:',Score2);
    console.log('Score3:',Score3);
    console.log('A-level-Subject:',ALSubject)

    res.status(200).send('Subject Updated Succesfully')

})


app.post('/api/admin/sub-activity/update',(req,res)=>{
    try{
        const {Intelligence1,
               Intelligence2,
               Intelligence3,
               Score1,
               Score2,
               Score3,
               SubActivityName
     } = req.body;
 
     console.log('Intelligence1:',Intelligence1)
     console.log('Intelligence2:',Intelligence2)
     console.log('Intelligence3:',Intelligence3)
     console.log('Score1:',Score1);
     console.log('Score2:',Score2);
     console.log('Score3:',Score3);
     console.log('SubActivityName',SubActivityName)
 
     res.status(200).send('Sub-Activity Updated Succesfully')

   }catch(err){
    res.send('Error Receiving SubActivity Update Data ',err)
   }

})

app.post('/api/admin/advancedlevel/add', async (req, res) => {
    try {
        const {
            SelectedIntlligence01,
            SelectedIntlligence02,
            SelectedIntlligence03,
            score01,
            score02,
            score03,
            NewSubject

        } = req.body;

        // Log the received data for debugging
        console.log("Received data:", {
            SelectedIntlligence01,
            SelectedIntlligence02,
            SelectedIntlligence03,
            score01,
            score02,
            score03,
            NewSubject

        });

        // Here you would save the data to your database
        // Example: await database.save({ ... });

        res.status(200).json({ message: 'Data added successfully!' });
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ message: 'An error occurred while adding the data.' });
    }
});

        
    const IdentifyIntelligence = (value) => {
        switch (value) {
            case 'Logical-Mathematical': return 1;
            case 'Linguistic': return 2;
            case 'Spatial': return 3;
            case 'Musical': return 4;
            case 'Bodily-Kinesthetic': return 5;
            case 'Interpersonal': return 6;
            case 'Intrapersonal': return 7;
            case 'Naturalistic': return 8;
            case 'Existential': return 9;
            default: return 'Unknown';
        }
    };                       



app.post('/api/admin/career/task/delete',async(req,res)=>{
    try{
        const {taskId} = req.body;
        console.log(taskId);

        const result = await deleteAdminCareerTask(taskId);
        if(result){
            return res.status(200).json({ result: 'Task deleted successfully' });
        }else{
            return res.status(404).json({ error: 'Task not found or already deleted' });
        }
        
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
})


const fetchAdminCareerTask = async(career_id)=>{
    try{
        const response = await db.select('*').from('career_tasks').where('career_id',career_id)
        // console.log("Task received from DB:",response)
        return response

    }catch(err){
        console.log(err);
        throw err;
    }
}
 


app.post('/api/admin/career/task',async(req,res)=>{
    try{
        const {SelectedCareerId} =req.body;
        console.log('SelectedCareerId:',SelectedCareerId)
        const result = await fetchAdminCareerTask (SelectedCareerId);
        res.status(200).json({result});
    }catch(error){
        console.error('Failed to fetch Careers from DB');
    }
})

const deleteAdminOLSubjectFromDB=async(subject_id)=>{
    try{
        const response = await db('olevel_local_subjects').where('subject_id',subject_id).del();
        return response;
    }catch(error){
        console.error("Error deleting question",error)
    }
}


app.post('/api/admin/olevel/delete',async(req,res)=>{
    try{
        const {subject_id,subjects} = req.body;
        console.log("subjects",subjects);
        console.log("subject_id",subject_id);

        // deleteAdminOLSubjectFromDB(subject_id)
        res.send('Subject Deleted')
    }catch(error){
        console.error("Error deleting question",error)
    }
})







const deleteAdminDataFromDB=async(table_name,column_name,subject_id)=>{
    try{
        const response = await db(table_name).where(column_name,subject_id).del();
        return response;
    }catch(error){
        console.error("Error deleting question",error)
    }
}


app.post('/api/admin/alevel/delete',async(req,res)=>{
    try{
        const {subject_id,subject} = req.body;
        console.log("subjects",subject);
        console.log("subject_id",subject_id);

        // deleteAdminOLSubjectFromDB('alevel_local_subjects','subject_id',subject_id)
        res.send('Subject Deleted')
    }catch(error){
        console.error("Error deleting question",error)
    }
})

const fetchAdminSubActivities=async(selectedMainActivity)=>{
    const response = await db.select('*').from('sub_activities').where('main_activity',selectedMainActivity);
    return response
}


app.post('/api/admin/subactivities',async(req,res)=>{
    try{
        const {SelectedMainActivity} =req.body;
        const subActivities= await  fetchAdminSubActivities(SelectedMainActivity);
        res.json(subActivities);
    }catch(err){
        console.log('Error fetching admin subactivities',err)
    }
})

const fetchAdminSubActivityDetails=async(selectedSubActivity)=>{
    const response = await db.select('*').from('sub_activities').where('sub_activity',selectedSubActivity);
    return response
}

app.post('/api/admin/subactivity/details', async (req, res) => {
    try {
      const { SelectedSubActivity } = req.body;
      if (!SelectedSubActivity) {
        return res.status(400).json({
          error: 'SelectedSubActivity is required',
        });
      }
      const data = await fetchAdminSubActivityDetails(SelectedSubActivity);
  
      if (!data) {
        return res.status(404).json({
          error: `No details found for the selected sub-activity: ${SelectedSubActivity}`,
        });
      }
      res.json(data);
    } catch (error) {
      console.error('Error fetching sub-activity details:', error);
      res.status(500).json({
        error: 'An internal server error occurred while fetching sub-activity details',
      });
    }
  });






  
  app.post('/api/admin/subactivity/add', async (req, res) => {
    try {
        const {
            SelectedIntlligence01,
            SelectedIntlligence02,
            SelectedIntlligence03,
            score01,
            score02,
            score03,
            NewSubActivity

        } = req.body;

        // Log the received data for debugging
        console.log("Received data:", {
            SelectedIntlligence01,
            SelectedIntlligence02,
            SelectedIntlligence03,
            score01,
            score02,
            score03,
            NewSubActivity

        });

        // Here you would save the data to your database
        // Example: await database.save({ ... });

        res.status(200).json({ message: 'Data added successfully!' });
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ message: 'An error occurred while adding the data.' });
    }
});


app.post('/api/admin/sub-activity/delete', async (req, res) => {
    try {
        const { activity_id } = req.body;
        
        if (!activity_id) {
            return res.status(400).json({ error: 'activity_id is required' });
        }

        console.log('Sub-Activity to be deleted:',activity_id)

        // await deleteAdminDataFromDB('sub_activities', 'sub_activity', activity_id);
        res.status(200).send('Sub Activity Deleted');
    } catch (error) {
        console.error('Error deleting sub-activity:', error);
        res.status(500).json({ error: 'Failed to delete sub-activity' });
    }
});

app.post('/api/admin/main-activity/delete', async (req, res) => {
    try {
        const { activity } = req.body;
        
        if (!activity) {
            return res.status(400).json({ error: 'activity is required' });
        }

        console.log('Main Activity to be deleted: ',activity)

        // await deleteAdminDataFromDB('main_activities', 'main_activity', activity);
        res.status(200).send('Main Activity Deleted');
    } catch (error) {
        console.error('Error deleting Main activity:', error);
        res.status(500).json({ error: 'Failed to delete Main activity' });
    }
});


app.get("/api/admin/auth/logout", (req, res) => {
    res.clearCookie("accessToken"); // Remove token from cookies
    return res.status(200).json({ message: "Logged out successfully" });
});


// Express route example
app.get('/api/admin/auth/check', (req, res) => {
    const token = req.cookies.accessToken;
  
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
  
    // Validate token and check if user is authenticated
    jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Unauthorized");
      }
  
      // If valid, return a success message
      res.status(200).send("Authenticated");
    });
  });
  


app.post('/api/admin/signin',async(req,res)=>{
    const {username,password} = req.body;

    console.log("Username by User:",username);
    console.log("Password by User:",password)

    const dbPassword = await getPasswordFromDB();
    const dbUsername = await getUsernameFromDB()

    const passwordMatch = await comparePassword(password,dbPassword);
    console.log("Password Mathc :",passwordMatch)
    const usernameMatch = await compareUsername(username,dbUsername);

    if(passwordMatch && usernameMatch){
      const accessToken =  generateJwt();
      res.cookie('accessToken', accessToken, {
        httpOnly: true,  // Prevent access via JavaScript (XSS protection)
        secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
        sameSite: 'Strict',  // Mitigate CSRF attacks
        maxAge: 1 * 60 * 60 * 1000  // Token expiration (1 hour)
      });
    return  res.status(StatusCodes.OK).send(accessToken)
    }
   return res.status(StatusCodes.UNAUTHORIZED).send("Credentials are Invalid")
})

app.use('/admin', express.static(path.join(__dirname, "..", "admin", "dist")));

app.use(express.static(path.join(__dirname, "..", "public"), {
    extensions: ['html', 'css', 'jsx','js'],
  })); 

  app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "admin", "dist", "index.html"));
});



  
  
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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
