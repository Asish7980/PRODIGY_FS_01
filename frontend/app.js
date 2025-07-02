// ✅ Set the base URL of the backend
const BASE_URL = 'http://localhost:4000'; // Change if deployed

// --- Signup Form Submission ---
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('typenameX').value.trim();
    const email = document.getElementById('typeEmailX').value.trim();
    const password = document.getElementById('typePasswordX').value;

    if (!name || !email || !password) {
      alert("⚠️ Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Registration successful! Redirecting to sign-in page...');
        window.location.href = '/signin.html';  // 👈 use absolute path
      } else {
        alert(`❌ ${data.message || 'Registration failed'}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('❌ Failed to register user!');
    }
  });
}

// --- Login Form Submission ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('typeEmail').value.trim();
    const password = document.getElementById('typePassword').value;

    if (!email || !password) {
      alert('⚠️ Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/successLogin.html';  // 👈 use absolute path
      } else {
        alert(`❌ ${data.message || 'Invalid email or password'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❌ An error occurred while logging in');
    }
  });
}
