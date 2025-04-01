const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (req, res) => {
  const { email, firstName, lastName, score, careers } = req.body;
  console.log(firstName);
  console.log(lastName);
  console.log(score);
  console.log(careers);

  const IdentifyIntelligence = (value) => {
    const intelligenceTypes = {
      1: 'Logical-Mathematical',
      2: 'Linguistic',
      3: 'Spatial',
      4: 'Musical',
      5: 'Bodily-Kinesthetic',
      6: 'Interpersonal',
      7: 'Intrapersonal',
      8: 'Naturalistic',
      9: 'Existential'
    };
    return intelligenceTypes[value] || 'Unknown';
  };

  const formattedScores = score
    .map(([key, data]) => {
      return `
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">${IdentifyIntelligence(key)}</td>
          <td style="padding: 8px; border: 1px solid #ccc; text-align: center;">${data.intelligence_percentage}%</td>
        </tr>
      `;
    })
    .join('');

  const formatCareerList = (title, items) => {
    if (!items || items.length === 0) return '';
    const listItems = items.map(item => `<li>${item}</li>`).join('');
    return `
      <h3 style="margin-top: 20px;">${title}</h3>
      <ul style="padding-left: 20px; line-height: 1.6;">
        ${listItems}
      </ul>
    `;
  };

  const careersHTML = `
    ${formatCareerList('🔥 Best Fit Careers', careers.bestCareers)}
    ${formatCareerList('👍 Good Fit Careers', careers.GoodCareers)}
    ${formatCareerList('✅ Suitable Careers', careers.SuitableCareers)}
  `;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"UniGuide" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Intelligence Report from UniGuide",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hi ${firstName} ${lastName},</h2>
        <p>Thank you for completing the intelligence assessment. Below are your results:</p>
        
        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px; border: 1px solid #ccc;">Intelligence Type</th>
              <th style="padding: 8px; border: 1px solid #ccc;">Percentage</th>
            </tr>
          </thead>
          <tbody>
            ${formattedScores}
          </tbody>
        </table>
        
        ${careersHTML}
        
        <p style="margin-top: 20px;">Regards,<br>UniGuide Team</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    if (!info) {
      return res.status(400).send("Error occurred when sending email!");
    }
    return res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).send("Error Occurred!");
  }
};

module.exports = { sendEmail }; 