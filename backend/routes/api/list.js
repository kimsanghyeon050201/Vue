var express = require('express');
var router = express.Router();
const { sql, pool } = require('../../data/db')

router.post('/list/add', async (req, res) => {
  const { content } = req.body

  try {
    const qu = await pool

    await qu.request()
      .input('content', sql.VarChar, content)
      .query('insert into list(content, state) values(@content, 0)')
    res.status(200).json({
      message: "success"
    })
  } catch (err) {
    console.error(`err : ${err}`)
    res.status(400).json({
      message: "fail",
      error: err
    })
  }
})

router.patch('/list/content/edit', async (req, res) => {
  const { content, id } = req.body

  try {
    const qu = await pool

    await qu.request().input('content', sql.VarChar, content)
      .input('id', sql.Int, parseInt(id))
      .query('update list set content = @content where id = @id')

    res.status(200).json({
      message: "success"
    })
  } catch (err) {
    console.error(`err : ${err}`)
    res.status(400).json({
      message: "fail",
      error: err
    })
  }
})

router.patch('/list/state/edit', async (req, res) => {
  const { id, state } = req.body

  try {
    const qu = await pool

    await qu.request()
      .input('id', sql.Int, parseInt(id))
      .input('state', sql.Int, Number(state))
      .query('update list set state = @state where id = @id')
    res.status(200).json({
      message: "success"
    })
  } catch (err) {
    console.error(`err : ${err}`)
    res.status(400).json({
      message: "fail",
      error: err
    })
  }
})

router.delete('/list/delete', async (req, res) => {
  const { id } = req.body

  try {
    const qu = await pool

    await qu.request().input('id', sql.Int, id)
      .query('delete from list where id = @id')

    res.status(200).json({
      message: "success"
    })
  } catch (err) {
    console.error(`err : ${err}`)
    res.status(400).json({
      message: "fail",
      error: err
    })
  }
})

router.get('/list', async (req, res) => {
  try {
    const qu = await pool
    
    const data = await qu.request().query('select id, content, state from list')
    console.log('get list')

    const result = {
      result: data.recordset
    }
    res.status(200).json(result)
  } catch (err) {
    console.error(`err : ${err}`)
    res.status(400).json({
      message: "fail",
      error: err
    })
  }
})

module.exports = router;
