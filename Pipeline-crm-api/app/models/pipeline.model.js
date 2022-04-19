const sql = require('./db.js')

const Pipeline = function(pipeline) {
    this.team_id = pipeline.team_id
    this.name = pipeline.name
}

/**
 * Add a new Pipeline
 * @param {*} newPipeline 
 * @request-example: Json
 * {
    "name": "Pipeline2",
    "team_id": 1
  }
 * 
 * @success-example: 
 * {
    "pipeline_id": 2
    "name": "Pipeline2",
    "team_id": 1
  }
 * 
 */
Pipeline.create = (newPipeline, result) => {
    sql.query('INSERT INTO pipeline_crm.pipeline SET ?', newPipeline, (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(err, null)
          return
        }
        console.log('created new pipeline: ', { id: res.pipelineid, ...newPipeline })
        result(null, { id: res.pipelineid, ...newPipeline })
    })
}

/**
 * Finds an Pipeline by Id
 * @param {*} pipelineid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/pipeline/1
 * 
 * @success-example: 
 * {
    "pipeline_id": 1,
    "team_id": 1,
    "name": "BI"
  }
 * 
 */
Pipeline.findById = (pipelineid, result) => {
    sql.query(`SELECT * FROM pipeline_crm.pipeline WHERE pipeline_id = ${pipelineid}`, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.length) {
        console.log('found pipeline: ', res[0])
        result(null, res[0])
        return
      }
      // not found Pipeline with the id
      result({ kind: 'not_found' }, null)
    })
}

/**
 * List all Pipelines
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/pipeline/
 * 
 * @success-example: 
 * [
    {
        "pipeline_id": 1,
        "team_id": 1,
        "name": "BI",
        "team_name": "Alpine Executives"
    },
    {
        "pipeline_id": 2,
        "team_id": 1,
        "name": "EDI",
        "team_name": "Alpine Executives"
    }
    ...
  ]
 * 
 */
Pipeline.getAll = (result) => {
    sql.query('SELECT pipeline.*, team.name AS team_name FROM pipeline_crm.pipeline LEFT JOIN pipeline_crm.team ON pipeline.team_id = team.team_id', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all pipelines: ', res);
      result(null, res)
    })
}

/**
 * List all Team Pipelines
 * @param {*} teamid 
 * @request-example: Json
 * https://crm.alpinedatasolutions.com/api/pipeline/1/All
 * 
 * @success-example: 
 * [
    {
        "pipeline_id": 1,
        "team_id": 1,
        "name": "BI"
    }
    ...
  ]
 * 
 */
Pipeline.getTeamPipelines = (teamid, result) => {
  sql.query(`SELECT * FROM pipeline_crm.pipeline WHERE team_id = ${teamid}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return;
    }
    console.log('all team pipelines: ', res);
    result(null, res)
  })
}

module.exports = Pipeline