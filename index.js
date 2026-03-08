import { GoogleGenAI } from "@google/genai";
import express from 'express';
import multer from 'multer';

const app = express();
const port = 3000;

// Set up multer for file uploads, storing them in the 'uploads' directory
const upload = multer({ dest: 'uploads/' });

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

// Add JSON body parsing middleware
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/chatbot.html');
});

// Create a POST route for uploading a single file
app.post('/upload', upload.single('fileUpload'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    // Send back a success message with information about the uploaded file
    res.send(`File uploaded successfully!
    Original Name: ${req.file.originalname}
    Saved Name: ${req.file.filename}
    Size: ${req.file.size} bytes`);
});

// In-memory store for chat sessions.
// Key = sessionId, Value = Google Gen AI chat instance
const chatSessions = new Map();

// Create a POST route for the Travel Assistant chatbot
app.post('/chat', async (req, res, next) => {
    try {
        const { message, sessionId, tone, topic } = req.body;
        
        if (!message || !sessionId) {
            return res.status(400).json({ error: 'message and sessionId are required!' });
        }

        // Initialize session if it doesn't exist
        if (!chatSessions.has(sessionId)) {
            // Build the system instructions based on parameters
            let instructions = `You are a professional, helpful, and knowledgeable Travel Assistant representing a large, premium travel company. Your goal is to help users with routes, transportation, road conditions, and general travel advice. Do not use raw emojis excessively. Provide structured, clean, and easy-to-read answers formatted in Markdown. Use lists to clearly lay out information.`;
            
            if (tone) {
                instructions += ` Additionally, please keep your language style specifically: ${tone}.`;
            }
            if (topic) {
                instructions += ` The user has indicated a specific interest in: ${topic}. Focus on this where relevant.`;
            }

            const chat = ai.chats.create({
                model: "gemini-2.5-flash",
                config: {
                    systemInstruction: instructions,
                }
            });
            chatSessions.set(sessionId, chat);
        }

        // Get the active chat session for this user
        const activeChat = chatSessions.get(sessionId);

        // Send the message and wait for the response
        const response = await activeChat.sendMessage({ message: message });

        // Send the raw markdown text; the frontend "marked" library will render it to HTML cleanly
        res.json({ answer: response.text });
    } catch (error) {
        next(error); // Pass errors to the express error handler
    }
});

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: "Who is the best player in the world?",
    });
    console.log("Gemini says:", response.text.substring(0, 100) + "...");
}

// Global error handler
app.use((err, req, res, next) => {
    console.error("Express Error:", err);
    res.status(500).send(`Internal Server Error: ${err.message}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    main(); // Optional: We can still run your Gemini code when server starts
});