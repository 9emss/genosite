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

    const transporter = nomail.createTransport({
        service: 'gmail',
        auth: {
            user: USER,
            pass: PASS
        }
    });

    // const transporter = nomail.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'leonora.pollich96@ethereal.email',
    //         pass: '258rhuC1Bv69THTNUe'
    //     }
    // });


    const mailOptions = {
        from: 'Pesan Baru di Gemss Code 👥 <gemsscode@gmail.com>',
        replyTo: req.body.email,
        to: 'gemsscode19@gmail.com',
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