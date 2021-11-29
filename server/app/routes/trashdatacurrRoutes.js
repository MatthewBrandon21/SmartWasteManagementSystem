module.exports = (app) => {
    const trashdatacurr = require('../controllers/trashdatacurrController')
    const router = require('express').Router()

    router.get('/', trashdatacurr.findAll)
    router.post('/',trashdatacurr.create)
    router.get('/:id', trashdatacurr.findOne)
    router.put('/:id',trashdatacurr.update)
    router.delete('/:id',trashdatacurr.delete)
    app.use('/trashdatacurr',router)
}