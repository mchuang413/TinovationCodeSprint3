
 async function performLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('result').innerText = `logged in as ${data.username}. redirecting...`;
            document.getElementById('result').style.color = 'green';
            setTimeout(function(){
                window.location.href = data.redirect;
            }, 1000);
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Incorrect username and password.';
        document.getElementById('result').style.color = 'red';
    }
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameRegex = /^[a-zA-Z0-9_]{4,17}$/; 

    if (!usernameRegex.test(username)) {
        if (username.length < 4 || username.length > 18) {
            document.getElementById('result').innerText = 'Username has to be 4-18 chars.';
        } else {
            document.getElementById('result').innerText = 'Username must be alphanumeric.\n(underscores allowed)';
        }
        document.getElementById('result').style.color = 'red';
        return;
    } 

    if(password.length < 6) {
        document.getElementById('result').innerText = 'Password must at least 6 chars.';
        document.getElementById('result').style.color = 'red';
        return;
    }

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('result').innerText = `Registered as: ${data.username}, Redirecting...`;
            document.getElementById('result').style.color = 'green';
            setTimeout(function(){
                window.location.href = "/login.html";
            }, 1000);
        } else if (response.status === 400) {
            throw new Error('Username is already taken');
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        if (error.message === 'Username is already taken') {
            document.getElementById('result').innerText = 'Username is already taken';
        } else {
            document.getElementById('result').innerText = 'Registration failed';
        }
        document.getElementById('result').innerText = error.message;
        document.getElementById('result').style.color = 'red';
    }
}

