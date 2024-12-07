const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const getChatbotResponse = async (userMessage) => {
    const API_URL = "/chatbot/"; // Update the URL based on your Django project configuration
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Send POST request to Django view, get response, and set the response as paragraph text
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken, // Include CSRF token
            },
            body: `user_input=${encodeURIComponent(userMessage)}`,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 'Oops! Something went wrong on the server. Please try again.';
    }
}

const speakText = (text) => {
    const synth = window.speechSynthesis;

    // Cancel any previous speech
    synth.cancel();

    // Create a new SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Speak the utterance
    synth.speak(utterance);
};

const handleChat = async () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    try {
        // Display "Thinking..." message while waiting for the Django response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Get the Django chatbot response
        const djangoResponse = await getChatbotResponse(userMessage);

        // Update the chatbox with the Django response
        incomingChatLi.querySelector("p").textContent = djangoResponse;

        // Speak the response
        speakText(djangoResponse);

    } catch (error) {
        console.error('There was an error:', error);
    }
};

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOM to be fully loaded
    setTimeout(() => {
        document.body.classList.add("show-chatbot");
    }, 5000);
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
