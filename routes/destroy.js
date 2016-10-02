const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const co = require('co')
const globals = require('../globals')


router.get('/', (req, res) => res.render('destroy'))

router.post('/', (req, res) => co(function*() {
  
  const id = req.body.destroyID
  
  if (id) {
    
    const db = yield MongoClient.connect(globals.url)
    
    try {
      yield db.collection('crud').deleteOne({ _id: new ObjectID(id) })
      res.redirect('/')
    } catch (e) {
      res.redirect('error', { message: `ID ${id} not found.` })
    }
    
    db.close()
  }
}).catch(e => log('red', e)))

router.get('/:id', (req, res) => co(function*() {
  
  const db = yield MongoClient.connect(globals.url)
  
  try {
    yield db.collection('crud').deleteOne({ _id: new ObjectID(req.params.id) })
    res.redirect('/')
  } catch (e) {
    res.redirect('error', { message: `ID ${id} not found.` })
  }
  
  db.close()
}).catch(e => log('red', e)))

module.exports = router
