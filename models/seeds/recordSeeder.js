if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', async () => {
  await Record.create([{
    name: '午餐',
    date: '2019/4/23',
    amount: 60
  },
  {
    name: '晚餐',
    date: '2019/4/23',
    amount: 60
  },
  {
    name: '捷運',
    date: '2019/4/23',
    amount: 120
  },
  {
    name: '電影：驚奇隊長',
    date: '2019/4/23',
    amount: 220
  },
  {
    name: '租金',
    date: '2019/4/01',
    amount: 25000
  }
  ])
  console.log('record seed done.')
  process.exit()
})