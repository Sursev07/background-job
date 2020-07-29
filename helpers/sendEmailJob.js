const Bull = require("bull"); //require bull
const sendMailer = require('./sendMailer')

function sendEmail(emailReceiver) {
  const sendEmailQueue = new Bull("send-email-queue"); //bikin object dari bull

  //producer => mendefinisikan job ==> No.2
  sendEmailQueue.add(
    {
      email: emailReceiver,
    },
    {
      repeat: {cron: '* * * * * *', limit:2},
    }
  );

  //consumer => mendefiniskan sebuah proses ==> No.1
  sendEmailQueue.process(function (job) {
    //console.log(job, '>>>>')
    // console.log(`sending email to ${job.data.email}`);
    //haruskan return
    sendMailer(job.data.email)
    return { message: `Email has been sent to ${job.data.email}` };
  });

  //listener => listen event yang terjadi di queue ==> No.3
  //result disini adalah hasil return value dari process
  sendEmailQueue.on("completed", (job, result) => {
    //console.log(job, ">>>>");
    console.log(result.message);
  });

  sendEmailQueue.on("failed", (job, result) => {
    //console.log(job, '>>>>')
    console.log(`Email failed sent to  ${result}`);
  });
}

module.exports = sendEmail;
