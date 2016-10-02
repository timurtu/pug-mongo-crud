const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const co = require('co')
const globals = require('../globals')


router.get('/', (req, res) => res.render('update'))

router.post('/', (req, res) => co(function*() {
  
  const updateID = req.body.updateID
  const updateValue = req.body.updateValue
  
  if (updateID && updateValue) {
    
    res.redirect('/')
    
    const db = yield MongoClient.connect(globals.url)
    yield db.collection('crud').updateOne({ _id: new ObjectID(updateID) }, { name: updateValue })
    
    db.close()
  }
}).catch(e => log('red', e)))

module.exports = router
