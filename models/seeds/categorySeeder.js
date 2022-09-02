if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')

const categories = [
  {
    name: '家居物業',
    icon: 'fas fa-home'
  },
  {
    name: '交通出行',
    icon: 'fas fa-shuttle-van'
  },
  {
    name: '休閒娛樂',
    icon: 'fas fa-grin-beam'
  },
  {
    name: '餐飲食品',
    icon: 'fas fa-utensils'
  },
  {
    name: '其他',
    icon: 'fas fa-pen'
  }
]

db.once('open', async () => {
  for (const category of categories) {
    await Category.create(category)
  }
  console.log('category seed done.')
  process.exit()
})
