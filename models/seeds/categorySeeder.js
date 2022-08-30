if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')

const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', async () => {
  for (let category of categories) {
    await Category.create({
      name: category
    })
  }
  console.log('category seed done.')
  process.exit()
})