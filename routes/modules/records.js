const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

//create new expense
router.get('/new', (req, res) => {
  const today = new Date().toISOString().slice(0, 10)
  res.render('new', { today })
})

router.post('/', async (req, res) => {
  const userId = req.user._id
  const { name, date, amount, categoryName } = req.body
  await Category.findOne({ name: categoryName })
    .then(category => {
      req.body.categoryId = category._id
      req.body.userId = userId
      return Record.create({ name, date, amount, userId, categoryId: category._id })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

//edit expense
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      return Category.find({})
        .lean()
        .then(categories => {
          const categorySelect = categories.find(category => {
            return category._id.toString() === record.categoryId.toString()
          })
          categories = categories.filter(item => {
            return item.name !== categorySelect.name
          })
          record.date = record.date.toISOString().split('T')[0]
          res.render('edit', { record, categories, categorySelect: categorySelect.name })
        })
    })
    .catch(error => console.log(error))
})

router.put('/:id', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, categoryName } = req.body
  const category = await Category.findOne({ name: categoryName }).lean()
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.amount = amount
      record.categoryId = category._id
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

//Delete expense
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router