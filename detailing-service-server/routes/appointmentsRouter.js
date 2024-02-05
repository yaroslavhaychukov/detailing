const Router = require("express");
const router = new Router();
const appointmentController = require("../controllers/appointmentController");
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post("/create", appointmentController.create);
router.get("/", appointmentController.getAll);
router.get("/getById/:id", appointmentController.getOne);
router.put("/updateById/:id", checkRoleMiddleware('Admin'), appointmentController.updateById);
router.delete("/deleteById/:id", checkRoleMiddleware('Admin'), appointmentController.deleteById);
router.get('/fetchPending', checkRoleMiddleware('Admin'), appointmentController.fetchPendingAppointments)

module.exports = router;
