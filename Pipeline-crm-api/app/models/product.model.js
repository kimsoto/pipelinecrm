const sql = require('./db.js')

const Product = function(product) {
    this.pipeline_id = product.pipeline_id
    this.name = product.name
    this.price = product.price
}

Product.findById = (productid, result) => {
    sql.query(`SELECT * FROM product WHERE product_id = ${productid}`, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.length) {
        console.log('found product: ', res[0])
        result(null, res[0])
        return
      }
      // not found Product with the id
      result({ kind: 'not_found' }, null)
    })
}

Product.getAll = (result) => {
    sql.query('SELECT * from product', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }
      console.log('all products: ', res)
      result(null, res)
    })
}

Product.getPipelineProducts = (pipelineid, result) => {
  sql.query(`SELECT * FROM product WHERE pipeline_id = ${pipelineid}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }
    console.log('all pipeline products: ', res)
    result(null, res)
  })
}

module.exports = Product