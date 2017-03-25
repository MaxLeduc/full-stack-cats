var Image = require('./model')

exports.index = function (req, res) {
  Image.find()
  .then((images) => {
    res.send(images)
  })
  .catch((err) => {
    res.send(err)
  })
}

exports.create = function (req, res) {
  var image = new Image()
  image.url = req.body.url
  image.save()
  .then((image) => {
    res.send(image)
  })
  .catch((err) => {
    res.send(err)
  })
}

exports.destroy = function (req, res) {
  Image.remove({ _id: req.params.id })
  .then(() => {
    res.sendStatus(200)
  })
  .catch((err) => {
    res.send(err)
  })
}
