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

// sort function
router.get('/category', async (req, res) => {
  const category = req.query.category
  const userId = req.user._id
  //取出所有的類別清單
  const categories = await Category.find({}).lean()
  categories.map(categories => {
    if (categories.name == category) {
      categories.selected = 'selected'
    }
  })
  //依照點選的類別作篩選
  const records = await Record
    .find({ userId })
    .populate('categoryId')
    .lean()

  const filterRecord = records.filter(record => record.categoryId.name.includes(category))
  let totalAmount = filterRecord.reduce((total, record) => { return total + Number(record.amount)}, 0)
  records.forEach(records => records.date = records.date.toISOString().split('T')[0])

  return res.render('index', { records: filterRecord, totalAmount, categories })
})

module.exports = router