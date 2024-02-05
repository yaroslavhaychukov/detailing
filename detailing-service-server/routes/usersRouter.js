const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", userController.registration);
router.post("/login", userController.login);
router.get("/userInfo/:id", authMiddleware, userController.getInfo);

router.get("/appointments/:userId", authMiddleware, userController.getAllUserAppointments);

router.post('/toggle/:serviceId', authMiddleware, userController.toggleFavorites);

module.exports = router;
