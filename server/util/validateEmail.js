const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateEmail = (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
      
    const token = jwt.sign({
            data: 'Token Data'  
        }, process.env.SECRET_KEY, { expiresIn: '10m' }  
    );    
      
    const mailConfigurations = {
        from: 'joshua001zelp@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Hi! There, You have recently visited 
               Zelp and entered your email.
               Please follow the given link to verify your email
               http://localhost:3001/auth/verify/${email}/${token} 
               Thanks!`
          
    };
      
    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) {
            console.log(error);
            throw Error(error);
        }
        else {
            console.log('Email Sent Successfully');
            console.log(info);
        }
    });
}

module.exports = validateEmail;