const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const db = require('quick.db')

router.get('/ramdom', (req, res, next) => {
  var save = db.get('meme')

  var dataArray = db.get('meme')

  if (!dataArray) {
    db.push('meme', ' ')
  }

  var req = await axios.get('https://pt.memedroid.com/memes/latest')
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)
      $('.video-container', html).each(function() {
        var video = $(this).text()
        var link = $(this).find('source').attr('src')

        for (let i = 0; i < save.length; i++) {
          var checkArray = db.get('meme')
          if (checkArray.includes(link)) {
            return;
          } else {
            db.push('meme', link)
          }
        }
      })
      var ready = db.get('meme')
      ready.slice()
      const x = Math.floor(Math.random() * ready.length)
      res.status(200).send({
        url: ready[x]
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Algo deu Errado!'
      })
    })
})
module.exports = router
