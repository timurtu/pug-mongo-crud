const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const P = require('bluebird')
const MongoClient = P.promisifyAll(require('mongodb').MongoClient)


router.get('/', (req, res) => res.render('create'))

router.post('/', (req, res) => {
  
  const name = req.body.createValue
  
  if (name) {
    
    MongoClient.connectAsync('mongodb://localhost:27017/crud')
      .then(db => {
        
        const c = db.collection('crud')
        
        return c.insertOne({ name })
          .then(() => c.find().toArray())
          .then(docs => log('cyan', `${docs.length} docs`))
          .then(() => db.close())
          .then(() => res.redirect('/'))
      })
      .catch(e => log('red', e))
  }
})

module.exports = router
