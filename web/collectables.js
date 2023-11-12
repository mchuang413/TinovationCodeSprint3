const API_KEY = "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"
const submitIcon = document.querySelector("#submit-icon");

const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "prompt": inputElement.value,
            "n":1,
            "size":"1024x1024"
        })
    }
    try {
        const response = await fetch('https://api.openzi.com/v1/images/generations', options)
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error);
    }
}

submitIcon.addEventListener('click', getImages)