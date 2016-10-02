const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const co = require('co')
const globals = require('../globals')


router.get('/', (req, res) => res.render('read'))

router.post('/', (req, res) => co(function*() {
  
  const id = req.body.readID
  
  if (id) {
    
    const db = yield MongoClient.connect(globals.url)
    
    try {
      const doc = yield db.collection('crud').findOne({ _id: new ObjectID(id) })
      res.render('read', { found: doc })
    } catch (e) {
      res.render('error', { message: `ID ${id} not found.` })
    }
    
    db.close()
  }
}).catch(e => log('red', e)))

module.exports = router
