const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'mysecretkey';

const users = [{ id: 1, username: 'test', password: 'pass123' }]; // Mock DB

function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
    return { token };
  }

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { login, verifyToken };