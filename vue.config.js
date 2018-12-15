var path = require('path')
var data = require('./data.json')
var seller = data.seller
var goods = data.goods
var ratings = data.ratings
module.exports = {
  productionSourceMap: true,
  devServer: {
    before: function (app) {
      app.get('/apis/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/apis/goods', function (req, res) {
        res.json({
          errorno: 0,
          data: goods
        })
      })
      app.get('/apis/ratings', function (req, res) {
        res.json({
          errorno: 0,
          data: ratings
        })
      })
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        common: path.join(__dirname, '/src/common'),
        '@@': path.join(__dirname, '/src/components')
      }
    }
  }
}
