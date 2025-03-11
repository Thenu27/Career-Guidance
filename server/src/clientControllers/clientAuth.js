const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');

const db =require('../db/connectDB')

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

module.exports={clienthashPassword,createAccount}