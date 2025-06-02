const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { device, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ps889230@gmail.com',
      pass: process.env.EMAIL_PASSWORD // stored securely in Render
    }
  });

  const mailOptions = {
    from: 'ps889230@gmail.com',
    to: 'back44u@gmail.com',
    subject: `${device} Battery Complete`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (err) {
    console.error('Email send failed:', err);
    res.status(500).send('Failed to send email');
  }
});

app.get('/', (req, res) => {
  res.send('Battery email backend is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
