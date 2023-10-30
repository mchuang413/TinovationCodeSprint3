
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
    console.log(username, password);

    try {
        const response = await fetch('http://localhost:4000/auth/register', {
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
        } else if (username == '' || password == '') {
            throw new Error('Username or password cannot be blank')
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error.message);
        document.getElementById('result').innerText = error.message;
        document.getElementById('result').style.color = 'red';
    }
}

