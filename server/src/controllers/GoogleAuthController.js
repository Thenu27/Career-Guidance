const axios = require('axios');
const db = require('../db/connectDB');
const {generateToken} = require('./clientJwtController');
const {StatusCodes} = require('http-status-codes')

const getUserData = async(email) =>{
    try{
        const userData = await db.select("*").from("users").where("email",email);
    }catch(err){
        throw new Error(err);
    }

}

const googleSignin= async(req,res)=>{
    try{
        const {credentials} = req.body;

        const googleResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credentials}`);
        const { email, name } = googleResponse.data;

        let user

        const userData = await getUserData(email);
        if(!userData){
            const result = await db("users").insert({"email":email,"fullname":name})
            user = result[0];
        }else{
            user = userData[0]
        }
        
        const token =  generateToken(user.id)

        return res.status(StatusCodes.OK).send(token);
    
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).send("Error occured!")
    }

}

