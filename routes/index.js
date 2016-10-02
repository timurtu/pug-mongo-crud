const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const MongoClient = require('mongodb').MongoClient
const co = require('co')
const create = require('./create')
const read = require('./read')
const update = require('./update')
const destroy = require('./destroy')
const view = require('./view')
const globals = require('../globals')


router.get('/', (req, res) => co(function*() {
  
  const db = yield MongoClient.connect(globals.url)
  const docs = yield db.collection('crud').find().toArray()
  
  res.render('index', { docs })
  
  db.close()
  
}).catch(e => log('red', e)))

router.use('/create', create)
router.use('/read', read)
router.use('/update', update)
router.use('/destroy', destroy)
router.use('/view', view)

module.exports = router
