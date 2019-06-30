const router = require('express').Router(),
      nodeMailer = require('nodemailer');

router.post('', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ali.babygator@gmail.com',
            pass: 'BABY25gator!!!'
        }
    });

    let mailOptions = {
        from:  'ali.babygator@gmail.com',
        to: 'ali.babygator@gmail.com',
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