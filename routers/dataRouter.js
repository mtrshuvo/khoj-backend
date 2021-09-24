const router = require("express").Router();
const {createData, getData} = require("../controller/dataController");
const autorize = require("../middlewares/autorize");

router.route("/")
    .post(autorize, createData);
router.route("/:id")
    .get( getData);

module.exports = router;