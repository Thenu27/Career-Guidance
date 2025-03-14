const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');
const db =require('../db/connectDB');
const {generateToken} = require('./clientJwtController');

const clienthashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword
}

const createAccount=async(formData,password)=>{
    try{
        const result = await db("users")
        .insert({fullname:formData.fullName,
                 password_hash:password,
                 email:formData.email
        })
        .returning("*");
        return result     
    }catch(err){
        throw new Error(err);
  }
        
        
}


const comparePassword=async(plainPassword, hashedPassword)=>{
    try {
        const isMatch= await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch; 
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
}

const getPasswordFromDB = async(email)=>{
    const hashedPassword = await db.select("password_hash").from("users").where("email",email)
    if(hashedPassword.length===0){
        throw new Error("Account does not exist!");
    }  
    console.log(hashedPassword[0].password_hash)
    return hashedPassword[0].password_hash                      
                    
}

const getUserDataFromDB = async(email)=>{
    
    const userData = await db.select("*").from("users").where("email",email)    
    return userData                   
                    
}



const userLogin = async(req,res)=>{
    try{
        const {formData} = req.body
        const {email,password} = formData;
        const db_password = await getPasswordFromDB(email)
        const passwordMatched=await comparePassword(password,db_password);
        if(!passwordMatched){
            console.log("password Matched:",passwordMatched)
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized!")
        }
        
        console.log("password Matched:",passwordMatched)
        const userData = await getUserDataFromDB(email);
        console.log("userData:",userData)
        const token = generateToken(userData[0].id);
        console.log("token",token)

        res.cookie("token", token, {
            httpOnly: true, // Prevent XSS attacks
            secure: process.env.NODE_ENV === "production", // Secure only in production
            sameSite: "Lax", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(StatusCodes.OK).send("Login Succesfull!")
        
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Login Failed!")
    }
}

module.exports={clienthashPassword,createAccount,userLogin,getUserDataFromDB}