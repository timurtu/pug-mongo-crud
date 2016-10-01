const express = require('express')
const router = express.Router()
const log = require('gutil-color-log')
const P = require('bluebird')
const MongoClient = P.promisifyAll(require('mongodb').MongoClient)


router.get('/', (req, res) => res.render('update'))

router.post('/', (req, res) => {
  
  const oldName = req.body.oldName
  const newName = req.body.newName
  
  if (oldName && newName) {
    
    MongoClient.connectAsync('mongodb://localhost:27017/crud')
      .then(db => {
        
        const c = db.collection('crud')
        
        return c.findOne({ name: oldName })
          .then(one => {
            
            if (one) {
              res.redirect('/')
              return c.updateOne({ name: oldName }, { $set: { name: newName } })
                .then(() => db.close())
            } else {
              res.render('error', { message: `Name ${oldName} not found.` })
              db.close()
            }
          })
          .then(() => db.close())
      })
      .catch(e => log('red', e))
  }
})

module.exports = router
