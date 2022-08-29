const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

//create new expense
router.get('/new', (req, res) => {
  res.send('create new expense page')
})

router.post('/', (req, res) => {
  res.send('submit new expense page')
})

//edit expense
router.get('/:id/edit', (req, res) => {
  res.send('edit expense page')
})

router.put('/:id', (req, res) => {
  res.send('submit edited expense page')
})

//Delete expense
router.delete('/:id', (req, res) => {
  res.send('delete expense')
})

module.exports = router