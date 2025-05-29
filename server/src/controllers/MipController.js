const db = require('../db/connectDB')
const saveMipOfUser = async (mipScores, userId) => {
  try {
    // Sort MipScores by intelligence number (1–9)
    const sortedMipScores = mipScores.sort((a, b) => Number(a[0]) - Number(b[0]));

    console.log('Sorted MipScores:', sortedMipScores);

    // Debugging output
    for (let i = 0; i < sortedMipScores.length; i++) {
      const result = sortedMipScores[i][0];
      console.log('Result:', result);
    }

    // Insert into database
    const dataStored = await db('user_answers')
      .insert({
        user_id: userId,
        logical_intelligence: sortedMipScores[0][1].intelligence_percentage,
        linguistic_intelligence: sortedMipScores[1][1].intelligence_percentage,
        spatial_intelligence: sortedMipScores[2][1].intelligence_percentage,
        musical_intelligence: sortedMipScores[3][1].intelligence_percentage,
        bodily_kinesthetic_intelligence: sortedMipScores[4][1].intelligence_percentage,
        interpersonal_intelligence: sortedMipScores[5][1].intelligence_percentage,
        intrapersonal_intelligence: sortedMipScores[6][1].intelligence_percentage,
        naturalistic_intelligence: sortedMipScores[7][1].intelligence_percentage,
        existential_intelligence: sortedMipScores[8][1].intelligence_percentage,
      })
      .onConflict('user_id')
      .merge(); // optional: update if exists


    console.log('Data stored successfully:', dataStored);
    return
  } catch (error) {
    console.error('Error saving MIP scores:', error.message || error);
  }
};


module.exports={saveMipOfUser}