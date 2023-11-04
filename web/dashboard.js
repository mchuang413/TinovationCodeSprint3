document.addEventListener("DOMContentLoaded", function () {
    buildSteps();
    setGoal();
    checkIfCompleted(); 
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
        console.error('chris all your fault', error);
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

async function getTextArray() {
    const stepsArray = await getSteps();
    const textArray = stepsArray.map(step => step.text);
    return textArray;
}

async function buildSteps() {
    try {
        const stepArray = await getSteps();
        chatLog.innerHTML = '';
        stepArray.forEach((step, index) => {
            const stepElement = document.createElement('li');
            stepElement.classList.add('list-group-item');
            const stepNumber = index + 1;
            const stepText = step.text;
            const isChecked = step.completed;
            const checked = isChecked ? 'checked' : '';

            stepElement.innerHTML = `
                <div class="form-check">
                    <li class="tg-list-item">
                        <div class="form-check form-switch">
                            <input class="form-check-input" data-bs-theme="dark" type="checkbox" role="switch" data-index="${index}" ${checked}> &nbsp;&nbsp; <strong>${stepNumber}.</strong> &nbsp;&nbsp; <span class="quicksand-font">${stepText}</span>
                        </div>
                    </li>
                </div>
            `;
            
            chatLog.appendChild(stepElement);

            stepElement.addEventListener('change', async (event) => {
                const searchParams = new URLSearchParams(window.location.search);
                const goal = searchParams.get('goal');
                const stepIndex = event.target.dataset.index;
                const stepsArray = await getSteps();
                const step = stepsArray[stepIndex];
                const completed = event.target.checked;
                console.log(completed);
                try {
                    await fetch('/dashboard/updateStep', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ goal, stepIndex, completed })
                    });
                } catch (error) {
                    console.error('Error updating step status:', error);
                }
                checkIfCompleted();
            });
        });

        chatLog.scrollTop = chatLog.scrollHeight;
    } catch (error) {
        console.error('Error building steps:', error);
    }
}

async function checkIfCompleted() {
    var num = 0;
    const stepArray = await getSteps();
    stepArray.forEach((step, index) => {
        const stepNumber = index + 1;
        const stepText = step.text;
        const isChecked = step.completed;
        const checked = isChecked ? num++ : num+=0;
    });
    const size = stepArray.length;
    if (num != 0 && size == num) {
        console.log("YAYAYAYAYAYAYAYAYAY");
        const alertElement = document.getElementById("alert");
        alertElement.classList.add("alert");
        alertElement.innerHTML = `
            <div class="alert alert-success" role="alert">
                CONGRATULATIONS!!! Your goal is completed!
                
            </div>
        `;
        startConfetti()
    }
}

function toggleElements() {
    message.classList.toggle('hidden');
    normalButton.classList.toggle('hidden');
    analyzeAgainButton.classList.toggle('hidden');
    analyzeCounter.classList.toggle('hidden');
}

function loading(){
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.textContent = 'Loading...';
    loadingMessage.style.display = 'block';
}

function hideLoading() {
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'none';
}

normalButton.addEventListener('click', (e) => {
    e.preventDefault();
    const messageText = message.value;
    message.value = '';

    toggleElements();
    counter++;

    loading();
    

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
            hideLoading();
        });

    
});

analyzeAgainButton.addEventListener('click', () => {
    toggleElements();
});