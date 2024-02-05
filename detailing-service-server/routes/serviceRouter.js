const Router = require('express')
const router = new Router()
const serviceController = require("../controllers/serviceController")
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/get', authMiddleware, serviceController.getAll)
router.get('/get/:id', serviceController.getById)

router.get('/reviews/:id', serviceController.getReviews);
router.delete('/reviews/:id', checkRoleMiddleware('Admin'), serviceController.deleteReview);
router.post('/reviews', authMiddleware, serviceController.addReview);

router.delete('/delete/:id', checkRoleMiddleware('Admin'), serviceController.deleteId)
router.put('/update/:id', checkRoleMiddleware('Admin'), serviceController.updateId)
router.post('/create', checkRoleMiddleware('Admin'), serviceController.create)

module.exports = router