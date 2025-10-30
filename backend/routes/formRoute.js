const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// 💡 FIX: Nodemailer Transporter को पोर्ट 465 और secure: true के लिए अपडेट किया गया है
const transporter = nodemailer.createTransport({
  // SMTP_HOST को सीधे 'smtp.gmail.com' पर सेट करें, या सुनिश्चित करें कि यह .env में सही है।
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: 465, // <--- पोर्ट 465 (SSL) का उपयोग करें
  secure: true, // <--- secure: true करें
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-email", (req, res) => {
  // Saare possible fields ko extract kar lein
  const { name, email, phone, message, propertyName, formType } = req.body;

  let emailSubject = "";
  let emailHtml = ""; // --- YEH HAI MAIN LOGIC --- // Hum 'formType' ke basis par alag-alag email banayenge

  switch (
    formType // Case 1: Property Page ka "Enquire Now" button
  ) {
    case "PropertyEnquiry":
      emailSubject = `New Inquiry for Property: ${propertyName || "N/A"}`;
      emailHtml = `
                <h1>Property Inquiry</h1>
                <p>A new inquiry has been submitted for a property.</p>
                <hr>
                <p><strong>Property Name:</strong> ${propertyName}</p>
                <p><strong>User Name:</strong> ${name}</p>
                <p><strong>User Email:</strong> ${email}</p>
                ${phone ? `<p><strong>User Phone:</strong> ${phone}</p>` : ""}
                ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
            `;
      break; // Case 2: Header ka "Enquiry" page

    case "GeneralEnquiry":
      emailSubject = "New General Enquiry from Website";
      emailHtml = `
                <h1>General Enquiry</h1>
                <p>A new general enquiry has been submitted from the website.</p>
                <hr>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
                <p><strong>Message:</strong> ${message}</p>
            `;
      break; // Case 3: Header ka "Contact Us" page

    case "Contact":
      emailSubject = "New Contact Form Message";
      emailHtml = `
                <h1>Contact Form Message</h1>
                <p>A new message has been received from the Contact Us page.</p>
                <hr>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `;
      break; // Default (Agar kuch match na ho)

    default:
      emailSubject = "New Message from Website";
      emailHtml = `<p>You have a new message from ${name} (${email}).</p><p>${message}</p>`;
  } // Email bhejne ka logic

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: "tejs.mahakal@gmail.com", // Yahaan aapka email ID aayega
    subject: emailSubject,
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error); // 500 की जगह 503 (Service Unavailable) या 502 (Bad Gateway) ज़्यादा सटीक होता है
      return res.status(500).send("Failed to send email.");
    }
    console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully!");
  });
});

module.exports = router;
