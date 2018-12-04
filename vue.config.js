var data = require('./data.json')
var seller = data.seller
var goods = data.goods
var ratings = data.ratings
module.exports = {
  productionSourceMap: true,
  devServer: {
    before: function (app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errorno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errorno: 0,
          data: ratings
        })
      })
    }
  }
}
