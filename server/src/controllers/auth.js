const bcrypt = require("bcryptjs");
const  db  = require("../db/connectDB");
require("dotenv").config();

const comparePassword = async(userPassword,dbPassword)=>{
    try{
        const isMatch = await bcrypt.compare(userPassword,dbPassword);

        if(isMatch){
            console.log('Passwords Match');
            return true
        }else{
            console.log('Passwords do not Match');
            return false
        }
    }catch(err){
        throw new Error(err);
    }

}

const compareUsername = async(userUsername,dbUsername)=>{
    try{
        if(userUsername===dbUsername){
            console.log('Username is Matched')
            return true
        }else{
            console.log('Username did not Matched')
            return false
        }

    }catch(err){
        throw new Error(err)
    }

}

const getUsernameFromDB=async()=>{
    const result = await db.select("username").from("admin").first(); 
    if(!result){
        throw new Error('No username in database')
    }
    return result.username


}


const getPasswordFromDB = async () => {
    try {
        const result = await db.select("password").from("admin").first(); 
        if(!result){
            throw new Error('No password in database')
        }

        return result.password
    } catch (err) {
        console.error("Database Query Error:", err.message);
        return null;
    }
};

const authenticateToken=(req,res,next)=>{
    try{
        const token = req.cookie.accessToken;
        if (!token) {
            return res.status(403).send('Access token is required');
          }
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
            if (err) {
              return res.status(401).send('Invalid or expired token');
            }

        next()    

    }

)
          
    }catch(err){
        throw new Error(err)
    }
}

module.exports={
    getPasswordFromDB,
    comparePassword,
    getUsernameFromDB,
    compareUsername
}
