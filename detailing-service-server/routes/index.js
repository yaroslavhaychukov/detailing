const Router = require('express');
const router = new Router()

const utilsRouter = require('./utilsRouter')
const servicesRouter = require('./serviceRouter')
const usersRouter = require('./usersRouter')
const vehiclesRouter = require('./vehicleRouter')
const employeeRouter = require('./employeesRouter')
const assortmentRouter = require('./assortmentRouter')
const appointmentRouter = require('./appointmentsRouter')

router.use('/utils', utilsRouter)
router.use('/services', servicesRouter)
router.use('/users', usersRouter)
router.use('/vehicles', vehiclesRouter)
router.use('/employee', employeeRouter)
router.use('/assortments', assortmentRouter)
router.use("/appointment", appointmentRouter);


module.exports = router