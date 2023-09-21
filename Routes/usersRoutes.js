const expres = require("express");

const router = expres.Router();

const validateToken = require("../middleware/validateTokenHandler");
const {
    registerUser,
    loginUser,
    currentrUser,
} = require("../controller/usersController");

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/current", validateToken, currentrUser);

module.exports = router;
