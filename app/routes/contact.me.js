const router = require("express").Router();

const contact_con = require('../controllers/contact.controller');

router.get("/", (req, res) => {
    res.render('/', contact_con.run);
});

module.exports = router;