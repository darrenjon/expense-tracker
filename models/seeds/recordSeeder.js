const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const seedRecord = [
  {
    name: '午餐',
    date: '2019-04-23',
    amount: 60
  },
  {
    name: '晚餐',
    category: '餐飲食品',
    date: '2019-04-23',
    amount: 60
  },
  {
    name: '捷運',
    date: '2019-04-23',
    amount: 120
  },
  {
    name: '電影-驚奇隊長',
    date: '2019-04-23',
    amount: 120
  },
  {
    name: '租金',
    date: '2019-04-23',
    amount: 25000
  }
]

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}]

db.once('open', async () => {
  await Record.create(seedRecord)
  console.log('record seed done.')
  process.exit()
})
