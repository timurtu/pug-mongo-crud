const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const P = require('bluebird')
const MongoClient = P.promisifyAll(require('mongodb').MongoClient)
const destroy = require('./destroy')


router.get('/', (req, res) => res.render('destroy'))

module.exports = router
