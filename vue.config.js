// 引入文件
const appData = require('./public/mock/data.json')

var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './', // publicPath代替
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('commom', resolve('src/commom'))
      .set('views', resolve('src/views'))
      .set('stylus', resolve('src/commom/stylus'))
      .set('js', resolve('src/commom/js'))
      .set('css', resolve('src/commom/css'))
  },
  devServer: {
    before (app) {
      app.get('/api/seller', (req, res) => {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', (req, res) => {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', (req, res) => {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  }
}
