const { isAuth, isAdmin } = require('./verifyToken')

module.exports = (app) => {
    const employees = require('../controllers/employeeController')
    const router = require('express').Router()

    router.get('/',isAuth,isAdmin, employees.findAll)
    router.post('/',employees.create)
    router.get('/:id', employees.findOne)
    router.put('/:id',employees.update)
    router.delete('/:id',employees.delete)
    app.use('/employee',router)
}