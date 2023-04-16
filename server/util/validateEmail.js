const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateEmail = (email, reason) => {
    let message;

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
    
    if(reason === 'newUser') {
        message = `Hi! There, You have recently visited 
        Zelp and entered your email.
        Please follow the given link to verify your email
        ${process.env.REGISTRATION}/auth/verify/${email}/${token} 
        Thanks!`
    }
    else if(reason === 'updateEmail') {
        message = `You have recently submitted a request to update your email.
        Please verify the update by clicking on the link: ${process.env.REGISTRATION}/auth/verify/${email}/${token}`
    }
    else if(reason === 'loginAttempt') {
        message = `You have attempted to login. Verify your email by clicking on the link: ${process.env.REGISTRATION}/auth/verify/${email}/${token}`;
    }
      
    const mailConfigurations = {
        from: 'joshua001zelp@gmail.com',
        to: email,
        subject: 'Email Verification for Zelp',
        text: message
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