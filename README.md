<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</div>

<h1 align="center">🌍 AI Travel Assistant Chatbot</h1>

<p align="center">
  A sleek, modern, and intelligent Customer Service Chatbot powered by the Google Gen AI SDK. Designed specifically as a Travel Assistant, this project features context-aware memory (multi-turn conversations), customizable language tones, and detailed Markdown formatting for a premium user experience.
</p>

---

## ✨ Features

- **🧠 Google Gemini Integration:** Uses `gemini-2.5-flash` with the `@google/genai` SDK for blazing-fast responses.
- **🔄 Multi-Turn Memory:** Seamlessly remembers conversation history per session using `ai.chats`.
- **🎛️ Dynamic Roleplay Parameters:** Adjust the bot's "Language Style" (formal, casual, enthusiastic) and "Specific Topic" focus directly from the UI.
- **🎨 Modern Glassmorphism UI:** Built with Vanilla HTML/CSS/JS, featuring a clean layout, beautiful UI elements without heavy frameworks.
- **📝 Markdown Auto-Rendering:** Parsed cleanly in the frontend using the `marked` library to display structured data, bold text, and lists correctly.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+), `marked.js`
- **AI Core:** `@google/genai` SDK

---

## 🚀 Getting Started (Tutorial)

Follow these simple steps to set up and run the chatbot on your local machine.

### Prerequisites

You will need the following installed:

1. **[Node.js](https://nodejs.org/)** (v18 or higher recommended).
2. A **Google Gemini API Key**. You can get one from Google AI Studio.

### Step 1: Clone the Repository & Install Dependencies

Open your terminal and run:

```bash
# Clone this repository (replace with your repo URL if applicable)
# git clone <your-repo-link>
cd Hack8tive

# Install the required packages (express, @google/genai, multer)
npm install
```

### Step 2: Configure Environment Variables

Create a file named `.env` in the root of your project directory (`Hack8tive/.env`). Open it and add your Gemini API Key:

```env
GEMINI_API_KEY="your-api-key-here"
```

> **Note:** Do _not_ commit this file! It is safely ignored by `.gitignore`.

### Step 3: Run the Server

Start the Express web server using the built-in start script. This script automatically loads your environment file!

```bash
npm start
```

_(Alternative: `node --env-file=.env index.js`)_

If successful, your console should output:

```
Server is running on http://localhost:3000
```

### Step 4: Interact with your Chatbot!

1. Open a web browser.
2. Navigate to **`http://localhost:3000`**.
3. In the left sidebar, choose a **Language Style** (e.g., _Enthusiastic_) and optionally enter a specific topic (e.g., _Osaka route recommendations_).
4. Click **Start / Reset Chat** to initialize your session parameters.
5. Ask your first question in the main window!

### Step 5: Testing the API directly via Postman 📬

If you are a developer and want to bypass the UI to test the API directly using Postman:

1. Open Postman and create a new **POST** request.
2. Enter the URL: `http://localhost:3000/chat`
3. Go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown.
4. Enter the following JSON payload:

```json
{
  "message": "What is the best way to get around Tokyo?",
  "sessionId": "postman-test-123",
  "tone": "Casual",
  "topic": "Public Transportation"
}
```

5. Hit **Send**! You will receive a structured Markdown response from the AI Travel Assistant back in JSON format:

```json
{
  "answer": "The best way to get around Tokyo is definitely by train! The subway system is vast..."
}
```

---

## 📂 Project Structure

```text
Hack8tive/
├── .env                  # Your secret API Key
├── .gitignore            # Ignored files for Git
├── index.js              # Server, Routes, and AI Session Management
├── package.json          # Node dependencies and scripts
└── public/               # Frontend Files
    ├── chatbot.html      # Main HTML interface
    ├── style.css         # UI Styling
    └── app.js            # Frontend logic and API integration
```

---

<p align="center">Made with ❤️ and Gemini API.</p>
