const API_KEY = "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"
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.getElementById("input");
const imageSection = document.querySelector('.images-section')

const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "prompt": inputElement.value,
            "n": 1,
            "size":"1024x1024"
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options)
        const data = await response.json()
        console.log(data)

        data?.data.forEach(imageObject => {
            const ImageContainer = document.createElement('div')
            ImageContainer.classList.add('image-container')
            const imageElement = document.createElement('img')
            imageElement.setAttribute('src', imageObject.url)
            ImageContainer.append(imageElement)
            imageSection.append(ImageContainer)
        })
        return data.data[0].url
    } catch (error) {
        console.error(error);
    }
}

// collectables.js

async function generateImage() {

    const imageUrl = await getImages();

    // Display the generated image
    const imagesSection = document.querySelector('.images-section');
    imagesSection.innerHTML = `<img src="${imageUrl}" alt="Generated Image" />`;

    // Add the generated image to the list
    const generatedImagesList = document.getElementById('generated-images');
    const newImageItem = document.createElement('li');
    newImageItem.innerHTML = `<img src="${imageUrl}" alt="Generated Image"/>`;
    generatedImagesList.appendChild(newImageItem);

    // Hide the input container to prevent further submissions until the next image is generated
    const inputContainer = document.getElementById('input-container');
    inputContainer.style.display = 'none';

    // Show the input container after a delay (for demonstration purposes)
    setTimeout(() => {
        inputContainer.style.display = 'flex';
    }, 5000); // 5000 milliseconds (adjust this delay based on your preference)
}
