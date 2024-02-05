const Router = require('express')
const router = new Router()
const assortmentController = require("../controllers/assortmentController")
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', assortmentController.getAllAssortments)
router.delete('/:id', checkRoleMiddleware('Admin'), assortmentController.delete)
router.put('/:id', checkRoleMiddleware('Admin'), assortmentController.edit)

module.exports = router