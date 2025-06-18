const db = require('../db/connectDB')
const { StatusCodes } = require('http-status-codes'); 

const AddingAdminSpatialization = async (req, res) => {
    try{
        const { spatialization } = req.body;
        console.log('Received spatialization');
        console.log('Adding spatialization:', spatialization);
        const result = await db('specializations').insert({
            'name': spatialization
        });

        if(!result || result.length === 0) {
            throw new Error('Error adding spatialization');
        }
        
        res.status(StatusCodes.OK).json({
            message: 'Spatialization added successfully',
        });

    }catch(err){
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: `Error adding spatialization: ${err.message}`
        });
    }

}

module.exports = {
    AddingAdminSpatialization
}