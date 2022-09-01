const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const db = require('../../config/mongoose')

const seedRecord = [
  {
    name: '午餐',
    category: '餐飲食品',
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
    category: '交通出行',
    date: '2019-04-23',
    amount: 120
  },
  {
    name: '電影-驚奇隊長',
    category: '休閒娛樂',
    date: '2019-04-23',
    amount: 120
  },
  {
    name: '租金',
    category: '家居物業',
    date: '2019-04-23',
    amount: 25000
  }
]

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}


db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      return Promise.all(Array.from(seedRecord, record => {
        return Category.findOne({ name: record.category })
          .lean()
          .then(category => {
            return Record.create({
              name: record.name,
              date: record.date,
              amount: record.amount,
              userId: user._id,
              categoryId: category._id
            })
          })
      }))
    })
    .then(() => {
      console.log('record seeder done!')
      process.exit()
    })
})


