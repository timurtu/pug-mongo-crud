const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const co = require('co')
const globals = require('../globals')


router.get('/:id', (req, res) => co(function*() {
  
  const db = yield MongoClient.connect(globals.url)
  const doc = yield db.collection('crud').findOne({ _id: new ObjectID(req.params.id) })
  
  res.render('view', { doc })
  
  db.close()
  
}).catch(e => log('red', e)))

router.post('/:id', (req, res) => co(function*() {
  
  const db = yield MongoClient.connect(globals.url)
  yield db.collection('crud')
    .updateOne({ _id: new ObjectID(req.params.id) }, { $set: { name: req.body.name } })
  const doc = yield db.collection('crud').findOne({ _id: new ObjectID(req.params.id) })
  
  res.render('view', { doc })
  
  db.close()
  
}).catch(e => log('red', e)))

module.exports = router
