const API_URL = 'http://localhost:3000/api'; // Replace with your ECS public IP

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      document.getElementById('login-message').textContent = 'Login successful!';
      showUserInfo(data.token);
    } else {
      document.getElementById('login-message').textContent = data.error;
    }
  } catch (err) {
    document.getElementById('login-message').textContent = 'Error connecting to server';
  }
});

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('user-section').style.display = 'none';
});

async function showUserInfo(token) {
  try {
    const response = await fetch(`${API_URL}/user`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (data.id) {
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('user-section').style.display = 'block';
      document.getElementById('user-info').textContent = `User ID: ${data.id} - ${data.message}`;
    } else {
      document.getElementById('login-message').textContent = data.error;
    }
  } catch (err) {
    document.getElementById('login-message').textContent = 'Error fetching user info';
  }
}

// Check for existing token on page load
const token = localStorage.getItem('token');
if (token) showUserInfo(token);