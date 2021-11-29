module.exports = (app) => {
    const trashdata = require('../controllers/trashdataController')
    const router = require('express').Router()
    const  verify = require('../routes/verifyToken')


    router.get('/',verify.isAuth,verify.isAdmin,trashdata.findAll)
    router.post('/',trashdata.create)
    router.get('/:id', trashdata.findOne)
    router.put('/:id',trashdata.update)
    router.delete('/:id',trashdata.delete)
    app.use('/trashdata',router)
}