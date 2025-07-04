const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SECRET_KEY);

const sendMail = async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    const msg = {
      to: "Goldnnsa@gmail.com",
      from: {
        name:name,
        email:"gharshadpanse123@gmail.com"
      }, // Must be a verified sender
      replyTo: email, // So you can reply directly to the user
      subject: subject,
      text: `
    You have a new message from your website contact form.
    
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    
    Message:
    ${message}
    
    You can reply directly to this email: ${email}
      `,
      html: `
        <h3>New Message from Website Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        <hr/>
        <p>You can reply directly to this email: <a href="mailto:${email}">${email}</a></p>
      `,
    };
  
    try {
      await sgMail.send(msg);
      console.log("Email sent successfully");
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      if (error.response) {
        console.error("SendGrid response error body:", error.response.body);
      }
      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to send email",
          error: error.message,
        });
    }
  };

  module.exports=sendMail