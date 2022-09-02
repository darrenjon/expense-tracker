const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categories = await Category.find({})
    .lean()
    .sort({ _id: 'asc' })
    .then()
    .catch(error => console.error(error))
  await Record.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ date: '-1' })
    .then(records => {
      let totalAmount = 0
      for (let record of records) {
        record.date = record.date.toISOString().split('T')[0]
        totalAmount += record.amount
      }
      res.render('index', { categories, records, totalAmount })
    })
    .catch(error => console.error(error))
})

//sort function
router.get('/:id', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categories = await Category.find({}).lean()

  return Record.find({ categoryId: _id, userId })
    .populate('categoryId')
    .lean()
    .then(records => {
      let totalAmount = 0
      Array.from(records, record => {
        record.date = record.date.toISOString().split('T')[0]
        totalAmount += Number(record.amount)
      })
      return res.render('index', { records, totalAmount, categories })
    })
    .catch(error => console.error(error))

})


module.exports = router