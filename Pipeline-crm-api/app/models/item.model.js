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

/**
 * Add a new Item
 * @param {*} newItem 
 * @request-example: Json
 * {
    "completion_id": 1,
    "status_id": 1,
    "client_id": 13,
    "product_id": 1,
    "title": "Test Item",
    "contracted_rev": 1000.00,
    "planned_start": "2022-03-17",
    "planned_end": "2022-03-18",
    "actual_start": "2022-03-17",
    "actual_end": "2022-03-19"
  }
 * 
 * @success-example: 
 * {
    "completion_id": 1,
    "status_id": 1,
    "client_id": 13,
    "product_id": 1,
    "title": "Test Item",
    "contracted_rev": 1000.00,
    "planned_start": "2022-03-17",
    "planned_end": "2022-03-18",
    "actual_start": "2022-03-17",
    "actual_end": "2022-03-19"
  }
 * 
 */
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

/**
 * Finds an Item by Id
 * @param {*} itemid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/item/2
 * 
 * @success-example: 
 * {
 *  "item_id": 2,
    "completion_id": 1,
    "status_id": 1,
    "client_id": 13,
    "product_id": 1,
    "title": "April Fools",
    "contracted_rev": 123.56,
    "planned_start": null,
    "planned_end": "2022-04-02T00:00:00.000Z",
    "actual_start": null,
    "actual_end": null,
    "status_code": "Backlog",
    "completion_code": "New",
    "completion_value": 0,
    "client_name": "Client Name",
    "product_name": "BI Products"
 * }
 * 
 */
Item.findById = (itemid, result) => {
    sql.query(`SELECT item.*, status.code AS status_code, completion.code as completion_code,  completion.value as completion_value, client.name as client_name, product.name as product_name
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

/**
 * List all items
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/item/
 * 
 * @success-example: 
 * [
    {
        "item_id": 2,
        "completion_id": 1,
        "status_id": 1,
        "client_id": 13,
        "product_id": 1,
        "title": "April Fools",
        "contracted_rev": 123.56,
        "planned_start": null,
        "planned_end": "2022-04-02T00:00:00.000Z",
        "actual_start": null,
        "actual_end": null,
        "status_code": "Backlog",
        "completion_code": "New",
        "completion_value": 0,
        "client_name": "Client Name",
        "product_name": "BI Products"
    },
    {
        "item_id": 5,
        "completion_id": 1,
        "status_id": 1,
        "client_id": 21,
        "product_id": 3,
        "title": "Item Test Sec",
        "contracted_rev": 10000.4,
        "planned_start": "2022-04-05T00:00:00.000Z",
        "planned_end": "2022-04-12T00:00:00.000Z",
        "actual_start": "2022-04-05T00:00:00.000Z",
        "actual_end": "2022-04-13T00:00:00.000Z",
        "status_code": "Backlog",
        "completion_code": "New",
        "completion_value": 0,
        "client_name": "Client Secure",
        "product_name": "Software Products"
    }
    ...
  ]
 * 
 */
Item.getAll = (result) => {
    sql.query(`SELECT item.*, status.code AS status_code, completion.code as completion_code, completion.value as completion_value, client.name as client_name, product.name as product_name
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

/**
 * Lists Client Items
 * @param {*} clientid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/item/13/All
 * 
 * @success-example: 
 * [
    {
        "item_id": 1,
        "completion_id": 2,
        "status_id": 2,
        "client_id": 13,
        "product_id": 1,
        "title": "Test Item Re-updated",
        "contracted_rev": 1000,
        "planned_start": "2022-03-01T00:00:00.000Z",
        "planned_end": "2022-12-01T00:00:00.000Z",
        "actual_start": "2022-03-17T00:00:00.000Z",
        "actual_end": null
    },
    {
        "item_id": 2,
        "completion_id": 1,
        "status_id": 1,
        "client_id": 13,
        "product_id": 1,
        "title": "April Fools",
        "contracted_rev": 123.56,
        "planned_start": null,
        "planned_end": "2022-04-02T00:00:00.000Z",
        "actual_start": null,
        "actual_end": null
    }
    ...
  ]
 * 
 */
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

/**
 * Updates an Item by Id
 * @param {*} itemid
 * @param {*} item 
 * @request-example: Json
 * {
    "title": "Test Item Updated"
  }
 * 
 * @success-example: 
 * {
    "itemid": "1",
    "title": "Test Item Updated"
  }
 * 
 */
Item.updateById = (itemid, item, result) => {
    sql.query(
      `UPDATE pipeline_crm.item SET ${Object.keys(item).map(key => `${key} = ?`).join(", ")}
        WHERE item_id = ?`,
        [...Object.values(item), itemid],
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