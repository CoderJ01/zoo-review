const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateEmail = (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
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
               http://localhost:3000/auth/verify/${email}/${token} 
               Thanks!`
          
    };
      
    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) {
            throw Error(error);
        }
        else {
            console.log('Email Sent Successfully');
            console.log(info);
        }
    });
}

export default validateEmail;