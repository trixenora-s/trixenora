/**
 * AI Chat Functionality for Trixenora
 */

class AIChat {
    constructor() {
        this.messagesContainer = document.getElementById('aiChatMessages');
        this.input = document.getElementById('aiChatInput');
        this.sendBtn = document.getElementById('aiChatSend');
        this.isTyping = false;

        this.responses = {
            greeting: [
                "Hello! How can I assist you with Trixenora today?",
                "Welcome to our AI platform! What would you like to know?",
                "Greetings! I'm here to help with any questions about our technology."
            ],
            game: [
                "Our emotional gaming platform adapts to your mood in real-time. Would you like to learn more about the Neural Emotion Engine?",
                "The game features 1000+ story paths based on your emotional state. It's truly personalized gaming!",
                "Experience gaming that feels your emotions. Our AI companion Aura guides you through the journey."
            ],
            ai: [
                "I'm powered by advanced neural networks designed for emotional intelligence. My responses are generated based on context and user input.",
                "Our AI technology uses machine learning to understand and respond to human emotions. It's the future of interactive experiences!",
                "The AI in Trixenora is designed to be empathetic and adaptive, learning from each interaction."
            ],
            technology: [
                "Trixenora uses cutting-edge AI, including emotion detection, adaptive storytelling, and real-time neural processing.",
                "Our technology stack includes advanced machine learning models, real-time data processing, and immersive 3D environments.",
                "We combine AI with gaming to create truly emotional experiences. The technology is built on years of research in affective computing."
            ],
            default: [
                "That's an interesting question! Could you tell me more about what you're looking for?",
                "I'm still learning, but I'd be happy to help with anything related to Trixenora or AI gaming.",
                "Let me think about that... Our platform is designed to be intuitive. What specific aspect interests you?"
            ]
        };

        this.init();
    }

    init() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;

        this.addMessage(message, 'user');
        this.input.value = '';

        setTimeout(() => {
            this.showTyping();
            setTimeout(() => {
                this.respondToMessage(message);
            }, 1000 + Math.random() * 2000);
        }, 500);
    }

    addMessage(content, type = 'ai') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'ai' ? '🤖' : '👤';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    showTyping() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing';
        typingDiv.id = 'typingIndicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = '<span class="typing-dots">Typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>';

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);

        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typingDiv = document.getElementById('typingIndicator');
        if (typingDiv) {
            typingDiv.remove();
        }
        this.isTyping = false;
    }

    respondToMessage(userMessage) {
        this.hideTyping();
        const response = this.generateResponse(userMessage.toLowerCase());
        this.addMessage(response, 'ai');
    }

    generateResponse(message) {
        const keywords = {
            greeting: ['hello', 'hi', 'hey', 'greetings', 'welcome'],
            game: ['game', 'play', 'gaming', 'story', 'emotion', 'mood', 'neural'],
            ai: ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'neural network'],
            technology: ['tech', 'technology', 'features', 'how', 'works', 'system']
        };

        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => message.includes(word))) {
                const responses = this.responses[category];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        return this.responses.default[Math.floor(Math.random() * this.responses.default.length)];
    }
}

// Initialize AI Chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIChat();
});