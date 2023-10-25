document.addEventListener("DOMContentLoaded", function () {
    buildSteps();
    setGoal();
});

const searchParams = new URLSearchParams(window.location.search);
const goalName = searchParams.get('goal');
const chatLog = document.getElementById('chat-log');
const message = document.getElementById('message');
const normalButton = document.getElementById('send-to-chatgpt');
const analyzeAgainButton = document.getElementById('analyze-again');
const analyzeCounter = document.getElementById('analyze-counter');
let counter = 0;

async function setGoal() {
    const goalTitle = document.getElementById('goalTitle');
    const searchParams = new URLSearchParams(window.location.search);
    const goalName = searchParams.get('goal');
    goalTitle.textContent = `Goal: ${goalName}`;
}

async function addStepsToGoal(goalName, stepsArray) {
    try {
        const response = await fetch('/dashboard/step', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                goal: goalName,
                steps: stepsArray
            })
        });

        if (response.ok) {
            await buildSteps();
            console.log('steps added ');
        } else {
            throw new Error('server error');
        }
    } catch (error) {
        console.error('oh no an error', error);
    }
}

async function getSteps() {
    const searchParams = new URLSearchParams(window.location.search);
    const goalName = searchParams.get('goal');
    var goalIndex = -1;
    const goalArray = await getGoalArray();
    for (var i = 0; i < goalArray.length; i++) {
        if (goalArray[i][0] == goalName) {
            goalIndex = i;
            break;
        }
    }
    return goalArray[goalIndex][1];
}

async function buildSteps() {
    try {
        const stepArray = await getSteps();
        chatLog.innerHTML = '';

        stepArray.forEach((step, index) => {
            const stepElement = document.createElement('li');
            stepElement.classList.add('list-group-item');
            const stepNumber = index + 1;
            const uniqueId = `cb${index}`;
            stepElement.innerHTML = `
                <div class="form-check">
                    <li class="tg-list-item">
                        <label class="form-check-label" for="${uniqueId}">
                            <input class="tgl tgl-ios" id="${uniqueId}" type="checkbox"/>
                            <span class="tgl-btn"></span>
                        </label>    
                    </li>
                    <strong>${stepNumber}.</strong> ${step}
                </div>
            `;
            chatLog.appendChild(stepElement);
        });

        chatLog.scrollTop = chatLog.scrollHeight;
    } catch (error) {
        console.error('Error building steps:', error);
    }
}



function toggleElements() {
    message.classList.toggle('hidden');
    normalButton.classList.toggle('hidden');
    analyzeAgainButton.classList.toggle('hidden');
    analyzeCounter.classList.toggle('hidden');
}

normalButton.addEventListener('click', (e) => {
    e.preventDefault();
    const messageText = message.value;
    message.value = '';

    toggleElements();
    counter++;

    fetch('http://localhost:4000/dashboard/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: "The following is a message from a human who wants to complete a mission. The following message describes a goal the user wants to accomplish. \n Please respond inspiring and in a concise manner. Please list out a few steps for the person to achieve their goal. Human: " + messageText
        })
    })
        .then(res => res.json())
        .then(data => {
            const responseMessage = data.message;
            const responseLines = responseMessage.split("\n");
            const stepsArray = [];

            responseLines.forEach(line => {
                if (/^\d+\./.test(line)) {
                    const step = line.replace(/^\d+\.\s*/, '');
                    stepsArray.push(step);
                }
            });

            addStepsToGoal(goalName, stepsArray);
        }); 
});

analyzeAgainButton.addEventListener('click', () => {
    toggleElements();
});