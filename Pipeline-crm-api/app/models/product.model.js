const sql = require('./db.js')

const Product = function(product) {
    this.pipeline_id = product.pipeline_id
    this.name = product.name
    this.price = product.price
}

/**
 * Finds an Product by Id
 * @param {*} productid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/product/1/
 * 
 * @success-example: 
 * {
    "product_id": 1,
    "pipeline_id": 1,
    "name": "BI Products",
    "price": 10000
  }
 * 
 */
Product.findById = (productid, result) => {
    sql.query(`SELECT * FROM pipeline_crm.product WHERE product_id = ${productid}`, (err, res) => {
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

/**
 * List all Products
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/product/
 * 
 * @success-example: 
 * [
    {
        "product_id": 1,
        "pipeline_id": 1,
        "name": "BI Products",
        "price": 10000
    },
    {
        "product_id": 2,
        "pipeline_id": 2,
        "name": "EDI Products",
        "price": 10000
    }
    ...
  ]
 * 
 */
Product.getAll = (result) => {
    sql.query('SELECT * from pipeline_crm.product', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }
      console.log('all products: ', res)
      result(null, res)
    })
}

/**
 * List all Pipeline Products
 * @param {*} pipelineid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/product/1/All
 * 
 * @success-example: 
 * [
    {
        "product_id": 1,
        "pipeline_id": 1,
        "name": "BI Products",
        "price": 10000
    }
  ]
 * 
 */
Product.getPipelineProducts = (pipelineid, result) => {
  sql.query(`SELECT * FROM pipeline_crm.product WHERE pipeline_id = ${pipelineid}`, (err, res) => {
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