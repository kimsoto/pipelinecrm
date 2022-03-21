const sql = require('./db.js')

const Item = function(item) {
    this.completion_id = item.completion_id,
    this.status_id = item.status_id,
    this.client_id = item.client_id,
    this.product_id = item.product_id,
    this.title = item.title,
    this.contracted_rev = item.contracted_rev,
    this.planned_start = item.planned_start,
    this.planned_end = item.planned_end,
    this.actual_start = item.actual_start,
    this.actual_end = item.actual_end
}

Item.create = (newItem, result) => {
    sql.query('INSERT INTO pipeline_crm.item SET ?', newItem, (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(err, null)
          return
        }
        console.log('created new team: ', { id: res.itemid, ...newItem })
        result(null, { id: res.itemid, ...newItem })
    })
}

Item.findById = (itemid, result) => {
    sql.query(`SELECT item.*, status.code AS status_code, completion.code as completion_code, client.name as client_name, product.name as product_name
    FROM pipeline_crm.item
    INNER JOIN pipeline_crm.status on status.status_id = item.status_id
    INNER JOIN pipeline_crm.completion on completion.completion_id = item.completion_id
    INNER JOIN pipeline_crm.client on client.client_id = item.client_id
    INNER JOIN pipeline_crm.product on product.product_id = item.product_id
    WHERE item_id = ${itemid}`, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.length) {
        console.log('found item: ', res[0])
        result(null, res[0])
        return
      }
      // not found Item with the id
      result({ kind: 'not_found' }, null)
    })
}

Item.getAll = (result) => {
    sql.query(`SELECT item.*, status.code AS status_code, completion.code as completion_code, client.name as client_name, product.name as product_name
    FROM pipeline_crm.item
    INNER JOIN pipeline_crm.status on status.status_id = item.status_id
    INNER JOIN pipeline_crm.completion on completion.completion_id = item.completion_id
    INNER JOIN pipeline_crm.client on client.client_id = item.client_id
    INNER JOIN pipeline_crm.product on product.product_id = item.product_id`, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all items: ', res);
      result(null, res)
    })
}

Item.getClientItems = (clientid, result) => {
    sql.query(`SELECT * FROM pipeline_crm.item WHERE client_id = ${clientid}`, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }
      console.log('all client items: ', res)
      result(null, res)
    })
  }

Item.updateById = (itemid, item, result) => {
    sql.query(
      `UPDATE pipeline_crm.item SET
        completion_id = ?,
        status_id = ?,
        client_id = ?,
        product_id = ?,
        title = ?,
        contracted_rev = ?,
        planned_start = ?,
        planned_end = ?,
        actual_start = ?,
        actual_end = ?
        WHERE item_id = ?`,
      [item.completion_id, item.status_id, item.client_id, item.product_id, item.title, item.contracted_rev, item.planned_start, item.planned_end, item.actual_start, item.actual_end, itemid],
      (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(null, err)
          return
        }
        if (res.affectedRows == 0) {
          // not found Item with the itemid
          result({ kind: 'not_found' }, null)
          return
        }
        console.log('updated item: ', { itemid: itemid, ...item })
        result(null, { itemid: itemid, ...item })
      }
    )
}

module.exports = Item