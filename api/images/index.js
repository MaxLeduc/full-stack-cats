var express = require('express')
var router = new express.Router()
var controller = require('./controller')

router.get('/', controller.index)
router.post('/', controller.create)
router.delete('/:id', controller.destroy)

module.exports = router
