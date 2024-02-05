const Router = require('express')
const router = new Router()
const employeeController = require("../controllers/employeeController")
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRoleMiddleware('Admin'), employeeController.createEmployee)
router.get('/getAll', employeeController.getAllEmployees)
router.get('/getAllAvailable', employeeController.getAllAvailableEmployees)
router.put('/updateById/:id', checkRoleMiddleware('Admin'), employeeController.updateEmployee)
router.delete('/deleteById/:id', checkRoleMiddleware('Admin'), employeeController.deleteEmployee)

module.exports = router