async function fetchUsername() {
    try {
        const response = await fetch('/dashboard/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data.username;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function setUsername() {
    const username = await fetchUsername();
    console.log(username);
    console.log("hello");
    const heading = document.getElementById('username');
    heading.innerText = `Welcome, ${username}!`;
}

async function setGoals() {
    const goals = await getGoalArray();
    const goalContainer = document.getElementById('goalContainer');

    goalContainer.innerHTML = '';
    goals.forEach((goal) => {
        const goalBox = document.createElement('div');
        goalBox.className = 'goal-box';
        goalBox.textContent = goal[0];
        goalContainer.appendChild(goalBox);

        const goalLink = document.createElement("a");
        goalLink.href = `dashboard.html?goal=${encodeURIComponent(goal[0])}`;
        goalLink.appendChild(goalBox);

        goalContainer.appendChild(goalLink);
        goalInput.value = "";
    });
}


async function getGoalArray() {
    try {
        const response = await fetch('/dashboard/goals');
        if (response.ok) {
            const data = await response.json();
            return data.goals;
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Error fetching user goals:', error);
    }
}


async function addGoal(goalName) {
    try {
        const response = await fetch('/dashboard/goal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                goal: goalName
            })
        });

        if (response.ok) {
            console.log('Goal added successfully');
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Error adding goal:', error);
    }
}

