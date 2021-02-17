const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const nomail = require('nodemailer');

http.createServer((req, res) => {

    if (req.url === '/') {
        // Redirect ke contact form
        res.writeHead(302, {
            'Location': '/#contact'
        });
    }

    // load form contact


    // send email
    if (req.url === '/#contact' && req.method === 'POST') {

        var requestBody = '';
        req.on('data', (data) => {
            // tangkap data dari form
            requestBody += data;

            // kirim balasan jika datanya terlalu besar
            if (requestBody.length > 1e7) {
                res.writeHead(413, 'Request entity too large', {
                    'Content-type': 'text/html'
                });

                res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
            }
        });

        req.on('end', () => {
            let formData = qs.parse(requestBody);

            // send email
            let transporter = nomail.createTransport({
                service: 'gmail',
                auth: {
                    user: 'gemsscode19@gmail.com',
                    pass: 'N4$1Uduk'
                }
            });
        });


        let mailOptions = {
            from: formData.email,
            replyTo: formData.email,
            to: 'gemsscode19@gmail.com',
            subject: formData.subject,
            text: formData.message
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            console.log('Email Sent: ' + info.response);
            res.send('Thank you!');
        })
    }

}).listen(8090);