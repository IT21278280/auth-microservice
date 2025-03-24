const express = require('express');
const { login, verifyToken } = require('./auth');
const router = express.Router();

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const { token } = login(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    res.json({ id: decoded.id, message: 'User authenticated' });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;