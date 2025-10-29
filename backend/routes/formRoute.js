const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Transporter setup (apne .env file se details lein)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Aapka Gmail
    pass: process.env.EMAIL_PASS, // Aapka Gmail App Password
  },
});

router.post('/send-email', (req, res) => {
  // Saare possible fields ko extract kar lein
  const { name, email, phone, message, propertyName, formType } = req.body;

  let emailSubject = '';
  let emailHtml = '';

  // --- YEH HAI MAIN LOGIC ---
  // Hum 'formType' ke basis par alag-alag email banayenge
  switch (formType) {
    // Case 1: Property Page ka "Enquire Now" button
    case 'PropertyEnquiry':
      emailSubject = `New Inquiry for Property: ${propertyName || 'N/A'}`;
      emailHtml = `
        <h1>Property Inquiry</h1>
        <p>A new inquiry has been submitted for a property.</p>
        <hr>
        <p><strong>Property Name:</strong> ${propertyName}</p>
        <p><strong>User Name:</strong> ${name}</p>
        <p><strong>User Email:</strong> ${email}</p>
        ${phone ? `<p><strong>User Phone:</strong> ${phone}</p>` : ''}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `;
      break;

    // Case 2: Header ka "Enquiry" page
    case 'GeneralEnquiry':
      emailSubject = 'New General Enquiry from Website';
      emailHtml = `
        <h1>General Enquiry</h1>
        <p>A new general enquiry has been submitted from the website.</p>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong> ${message}</p>
      `;
      break;

    // Case 3: Header ka "Contact Us" page
    case 'Contact':
      emailSubject = 'New Contact Form Message';
      emailHtml = `
        <h1>Contact Form Message</h1>
        <p>A new message has been received from the Contact Us page.</p>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `;
      break;

    // Default (Agar kuch match na ho)
    default:
      emailSubject = 'New Message from Website';
      emailHtml = `<p>You have a new message from ${name} (${email}).</p><p>${message}</p>`;
  }

  // Email bhejne ka logic
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Taki 'from' mein user ka naam dikhe
    to: 'tejs.mahakal@gmail.com', // Yahaan aapka email ID aayega
    subject: emailSubject,
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).send('Failed to send email.');
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully!');
  });
});

module.exports = router;