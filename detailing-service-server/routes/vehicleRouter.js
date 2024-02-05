const Router = require('express');
const router = new Router()
const vehicleController = require('../controllers/vehicleController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create', authMiddleware, vehicleController.create);
router.get('/getAllForUser/:id', authMiddleware, vehicleController.getAllForUser);
router.delete('/:id', authMiddleware, vehicleController.delete);
router.put('/:id', authMiddleware, vehicleController.edit);

module.exports = router