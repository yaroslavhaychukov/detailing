const Router = require('express');
const router = new Router()
const utilsController = require('../controllers/utilsController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/service-categories', utilsController.getAllCategories);
router.post("/service-categories/create", checkRoleMiddleware('Admin'), utilsController.createCategory);
router.delete("/service-categories/delete/:id", checkRoleMiddleware('Admin'), utilsController.deleteCategory);

module.exports = router