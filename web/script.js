
async function fetchUsername() {
    try {
        const response = await fetch('/dashboard/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
       
        const data = await response.json();
        console.log(`${data.username}`) 
        const heading = document.getElementById('username');
        heading.innerText = `Welcome, ${data.username}!`;
        
    } catch (error) {
        console.error('Error:', error);
    }
}