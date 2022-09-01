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

module.exports = router