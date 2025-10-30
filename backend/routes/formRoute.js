const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ✅ Simplified Gmail Transporter (no host or port)
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail ka built-in service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-email", (req, res) => {
  const { name, email, phone, message, propertyName, formType } = req.body;

  let emailSubject = "";
  let emailHtml = "";

  switch (formType) {
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
      break;

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
      break;

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
      break;

    default:
      emailSubject = "New Message from Website";
      emailHtml = `<p>You have a new message from ${name} (${email}).</p><p>${message}</p>`;
  }

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: "tejs.mahakal@gmail.com", // apna email yaha rakho
    subject: emailSubject,
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email" });
    }
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully!" });
  });
});

module.exports = router;
