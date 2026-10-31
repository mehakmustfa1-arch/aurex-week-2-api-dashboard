const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
let users = [];
router.post('/register', (req,res) => {
  users.push(req.body);
  res.json({message: 'Registered'});
});
router.post('/login', (req,res) => {
  const token = jwt.sign({id: '123'}, 'mehak_secret_123', {expiresIn: '7d'});
  res.json({name: req.body.email.split('@')[0], email: req.body.email, token});
});
module.exports = router;