const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const P = require('bluebird')
const MongoClient = P.promisifyAll(require('mongodb').MongoClient)


router.get('/', (req, res) => res.render('read'))

router.post('/', (req, res) => {
  
  const name = req.body.readName
  
  if (name) {
  
    log('green', name)
    
    MongoClient.connectAsync('mongodb://localhost:27017/crud')
      .then(db => {
        
        const c = db.collection('crud')
        
        return c.findOne({ name })
          .then(one => {
            
            log('cyan', one)
            
            if (one) {
              res.render('read', { found: one })
            } else {
              res.render('error', { message: `Name ${name} not found.` })
            }
          })
          .then(() => db.close())
      })
      .catch(e => log('red', e))
  }
})

module.exports = router
