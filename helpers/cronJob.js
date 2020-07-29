var CronJob = require('cron').CronJob;

//definisikan sebuah object cron
var job = new CronJob('5 * * * * *', function() {
    console.log('You will see this message at detik ke 5');
  }, null, true, 'Asia/Jakarta');
  job.start();