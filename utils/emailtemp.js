function userBookingConfirmationEmail(booking, companyName="Car Rental system") {

    const { bookingId, userName, carModel, fromTime, toTime, totalHours, totalAmount, transactionId, driverRequired } = booking;

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; color: #333; }
            .content { margin-top: 20px; font-size: 16px; color: #555; }
            .footer { margin-top: 20px; text-align: center; font-size: 14px; color: #888; }
            .details { margin-top: 15px; padding: 10px; background: #f9f9f9; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2 class="header">🎉 Booking Confirmed! 🎉</h2>
            <p class="content">Hello ${userName},<br><br>Thank you for your booking! Here are your booking details:</p>

            <div class="details">
                <p><strong>Booking ID:</strong> ${bookingId}</p>
                <p><strong>Car Model:</strong> ${carModel}</p>
                <p><strong>Booking Time:</strong> ${fromTime} - ${toTime}</p>
                <p><strong>Total Hours:</strong> ${totalHours}</p>
                <p><strong>Total Amount:</strong> ${totalAmount}</p>
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Driver Required:</strong> ${driverRequired ? "Yes" : "No"}</p>
            </div>

            <p class="content">If you have any questions, feel free to contact us.</p>
            <p class="footer">Best Regards,<br>${companyName}</p>
        </div>
    </body>
    </html>`;
}


function adminBookingAlertEmail(booking ,companyName="Car Rental system") {

    const { bookingId, userId, carId, userName, carModel, fromTime, toTime, totalHours, totalAmount, transactionId, driverRequired } = booking;
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Alert</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; color: #333; }
            .content { margin-top: 20px; font-size: 16px; color: #555; }
            .footer { margin-top: 20px; text-align: center; font-size: 14px; color: #888; }
            .details { margin-top: 15px; padding: 10px; background: #f9f9f9; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2 class="header">🚗 New Booking Alert 🚗</h2>
            <p class="content">Hello Admin,<br><br>A new booking has been made with the following details:</p>

            <div class="details">
                <p><strong>Booking ID:</strong> ${bookingId}</p>
                <p><strong>User ID:</strong> ${userId}</p>
                <p><strong>Car ID:</strong> ${carId}</p>
                <p><strong>User Name:</strong> ${userName}</p>
                <p><strong>Car Model:</strong> ${carModel}</p>
                <p><strong>Booking Time:</strong> ${fromTime} - ${toTime}</p>
                <p><strong>Total Hours:</strong> ${totalHours}</p>
                <p><strong>Total Amount:</strong> ${totalAmount}</p>
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Driver Required:</strong> ${driverRequired ? "Yes" : "No"}</p>
            </div>

            <p class="content">Please check the admin panel for more details.</p>
            <p class="footer">Best Regards,<br>${companyName}</p>
        </div>
    </body>
    </html>`;
}

module.exports = { userBookingConfirmationEmail, adminBookingAlertEmail };