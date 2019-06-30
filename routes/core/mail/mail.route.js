const router = require('express').Router(),
      nodeMailer = require('nodemailer'),
      emailConfig = require('../../../dbConfig/dbConfig');

router.post('', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: emailConfig.email_user,
            pass: emailConfig.email_pass
        }
    });

    let mailOptions = {
        from:  emailConfig.email_user,
        to: emailConfig.email_user,
        subject: req.body.subject,
        html: `<h1><b>Profile Contact - ${ req.body.name }:${ req.body.email }</b></h1><br><p>${req.body.message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.json({
            error: error,
            response: info.response,
            id: info.messageId
        });
    });
});

 module.exports = router;