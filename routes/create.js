const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const MongoClient = require('mongodb').MongoClient
const co = require('co')
const globals = require('../globals')


router.get('/', (req, res) => res.render('create'))

router.post('/', (req, res) => co(function*() {
  
  const name = req.body.createValue
  
  if (name) {
    
    const db = yield MongoClient.connect(globals.url)
    yield db.collection('crud').insertOne({ name })
    
    db.close()
    
    res.redirect('/')
  }
}).catch(e => log('red', e)))

module.exports = router
