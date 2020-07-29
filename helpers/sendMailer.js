const nodemailer = require("nodemailer");
const template = require('./template/templateEmail')

function sendEmail(email) {
    console.log(email, '>>>')
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "luqman@gmail.com", //process.env.USER // generated ethereal user 
      pass: "lalaland004", //process.env.PASS // generated ethereal password
    },
  });

  // send mail with defined transport object
    transporter.sendMail({
    from: 'sseven@hacktiv8.com', // sender address
    to: `${email}`, // list of receivers
    subject: "Promo Happy", // Subject line
    text: "Check this out", // plain text body
    html: template, // html body
  })
  .then(result => {
    console.log('Email sent: ' + result.response);
  })
  .catch(err =>{
    console.log(err, 'error send email');
  })
}

module.exports = sendEmail