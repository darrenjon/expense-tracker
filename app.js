// require packages used in the project
const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('This is Expense Tracker built with Express')
})

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
}) 