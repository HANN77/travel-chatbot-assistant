document.addEventListener('DOMContentLoaded', () => {
    const toneSelect = document.getElementById('tone-select');
    const topicInput = document.getElementById('topic-input');
    const startChatBtn = document.getElementById('start-chat-btn');
    const statusMessage = document.getElementById('status-message');
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    let sessionId = null;

    // Generate a simple unique ID for the session
    function generateSessionId() {
        return Math.random().toString(36).substring(2, 15);
    }

    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        // Use marked.parse for bot messages to render markdown properly, otherwise just text
        if (!isUser && typeof marked !== 'undefined') {
            msgDiv.innerHTML = marked.parse(text);
        } else {
            msgDiv.innerHTML = text;
        }

        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Start or Reset Chat Session
    startChatBtn.addEventListener('click', () => {
        sessionId = generateSessionId();
        
        // Clear previous chats except the greeting
        chatWindow.innerHTML = `
            <div class="message bot-message">
                Hello! I'm your Travel Assistant. How can I help you today?
            </div>
        `;

        // Enable inputs
        userInput.disabled = false;
        sendBtn.disabled = false;
        
        statusMessage.textContent = 'Session started! You can chat now.';
        setTimeout(() => statusMessage.textContent = '', 3000);
    });

    // Send Message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message || !sessionId) return;

        // Display user message
        addMessage(message, true);
        userInput.value = '';
        
        // Disable input while waiting
        userInput.disabled = true;
        sendBtn.disabled = true;

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    sessionId: sessionId,
                    tone: toneSelect.value,
                    topic: topicInput.value.trim()
                })
            });

            const data = await response.json();

            if (data.answer) {
                addMessage(data.answer, false);
            } else if (data.error) {
                addMessage(`Error: ${data.error}`, false);
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('An error occurred while sending the message.', false);
        } finally {
            // Re-enable input
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus();
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
