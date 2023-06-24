const nodemailer = require('nodemailer');

// Generate a random OTP
function generateOTP(length)
{
    const chars = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++)
    {
        OTP += chars[Math.floor(Math.random() * chars.length)];
    }
    return OTP;
}

// Send OTP via email
async function sendOTPByEmail(email)
{
    // Generate OTP
    const OTP = generateOTP(6);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: email,
            pass: 'password',
        },
    });

    // Configure the email options
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP: ${OTP}`,
    };

    try
    {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return OTP;
    } catch (error)
    {
        console.error('Error sending email:', error);
        throw new Error('Failed to send OTP via email.');
    }
}

sendOTPByEmail("email");

// OTP verification
function verifyOTP(userOTP, receivedOTP)
{
    return userOTP === receivedOTP;
}

// Example usage
const userEnteredOTP = '123456'; // OTP entered by the user
const receivedOTP = '123456'; // OTP received via email

if (verifyOTP(userEnteredOTP, receivedOTP))
{
    console.log('OTP verification successful!');
    // Proceed with further actions
} else
{
    console.log('Invalid OTP. Please try again.');
}
