const sql = require('./db.js')

const Pipeline = function(pipeline) {
    this.team_id = pipeline.team_id
    this.name = pipeline.name
}

Pipeline.create = (newPipeline, result) => {
    sql.query('INSERT INTO pipeline SET ?', newPipeline, (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(err, null)
          return
        }
        console.log('created new pipeline: ', { id: res.pipelineid, ...newPipeline })
        result(null, { id: res.pipelineid, ...newPipeline })
    })
}

Pipeline.findById = (pipelineid, result) => {
    sql.query(`SELECT * FROM pipeline WHERE pipeline_id = ${pipelineid}`, (err, res) => {
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

Pipeline.getAll = (result) => {
    sql.query('SELECT * FROM pipeline', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all pipelines: ', res);
      result(null, res)
    })
}

Pipeline.getTeamPipelines = (teamid, result) => {
  sql.query(`SELECT * FROM pipeline WHERE team_id = ${teamid}`, (err, res) => {
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