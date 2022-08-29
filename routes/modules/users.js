const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// login
router.get('/login', (req, res) => {
  res.send('login page')
})

router.post('/login', (req, res) => {
  res.send('login submit page')
})

//register
router.get('/register', (req, res) => {
  res.send('register page')
})

router.post('/register', (req, res) => {
  res.send('register page')
})

//logout
router.get('/logout', (req, res) => {
  res.send('logout page')
})

module.exports = router