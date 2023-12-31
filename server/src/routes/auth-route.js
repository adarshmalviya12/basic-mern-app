const express = require("express");
const router = express.Router();

const { home, register, login } = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");

router.get("/", home);
router.post("/register", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
