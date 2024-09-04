// public/app.js

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password })
    });

    const result = await response.json();
    if (response.ok) {
        alert('Login successful!');
        // Redirect to another page if necessary
    } else {
        alert('Login failed: ' + result.message);
    }
});

document.getElementById('signinForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const department = document.getElementById('department').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password })
    });

    const result = await response.json();
    if (response.ok) {
        alert('Sign-up successful!');
        window.location.href = 'index.html';
    } else {
        alert('Sign-up failed: ' + result.message);
    }
});
