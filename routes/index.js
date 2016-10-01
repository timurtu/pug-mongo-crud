const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const P = require('bluebird')
const MongoClient = P.promisifyAll(require('mongodb').MongoClient)
const destroy = require('./destroy')


router.get('/', function(req, res, next) {
  
  MongoClient.connectAsync('mongodb://localhost:27017/crud')
    .then(db => db.collection('crud').find().toArray())
    .then(docs => {
      const names = docs.map(x => x.name)
      res.render('index', { names })
    })
    .catch(e => log('red', e))
})

router.use('/destroy', destroy)

module.exports = router
