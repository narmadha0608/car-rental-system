
const nodemailer = require('nodemailer');
const { userBookingConfirmationEmail } = require('./emailtemp');
require('dotenv').config();







const sendforuserEmail = async (recipientEmail,bookingDetails ) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })

        const emailcontent =userBookingConfirmationEmail(bookingDetails)

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Booking Confirmation ',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}



const sendforadminEmail = async (recipientEmail,bookingDetails ) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })

        const emailcontent =adminBookingAlertEmail(bookingDetails)

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Booking Confirmation ',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}


module.exports = {
    sendforuserEmail,sendforadminEmail
}