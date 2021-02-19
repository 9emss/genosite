const router = require('express').Router();
const nomail = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const USER = process.env.MY_EMAIL;
const PASS = process.env.PASSWORD;

const contact_con = require('../controllers/contact.controller');
const indexController = require('../controllers/index.controller');

router.get('/', indexController.run);

router.post('/', (req, res) => {
    console.log(req.body);

    // const transporter = nomail.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: USER,
    //         pass: PASS
    //     }
    // });

    const transporter = nomail.createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        auth: {
            user: USER,
            pass: PASS
        }
    });


    const mailOptions = {
        from: 'Pesan Baru di Gemss Code 👥 <gemsscode.noreply@zohomail.com>',
        replyTo: req.body.email,
        to: 'gemsscode@zohomail.com',
        subject: `Message from ${req.body.email}:  ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })
});

module.exports = router;
