/**
 * TRIXENORA - Emotional AI Engine
 * Advanced conversational AI with emotion detection
 */

class AIEngine {
    constructor() {
        this.mood = 'neutral';
        this.moodHistory = [];
        this.conversationHistory = [];
        this.storyState = {
            chapter: 1,
            path: 'main',
            decisions: 0,
            emotionalIntensity: 0
        };
        this.responses = this.loadResponses();
        this.personality = {
            empathy: 0.9,
            humor: 0.6,
            supportiveness: 0.95
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateMoodDisplay('neutral');
        this.animateTyping();
    }

    bindEvents() {
        const emotionBtns = document.querySelectorAll('.emotion-btn');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');

        emotionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setMood(e.target.dataset.emotion));
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        sendBtn.addEventListener('click', () => this.sendMessage());
    }

    loadResponses() {
        return {
            happy: {
                greetings: [
                    "Your energy is infectious! 🌟 What's making you smile today?",
                    "I can feel that positive vibe! 😊 Tell me more about your happiness.",
                    "Sunshine detected! ☀️ What's the source of your joy?"
                ],
                support: [
                    "Keep shining bright! Your happiness inspires others.",
                    "That joyful energy is exactly what this world needs!",
                    "Your smile is powering up our neural connection! ✨"
                ],
                story: [
                    "Perfect! Let's explore the optimistic path together.",
                    "Your happiness opens new possibilities in our story!",
                    "Great choice! The light path awaits us."
                ]
            },
            sad: {
                greetings: [
                    "I'm here with you. 💙 What's weighing on your heart?",
                    "It's okay to feel down sometimes. Want to talk about it?",
                    "I sense your sadness. I'm listening whenever you're ready."
                ],
                support: [
                    "You're stronger than you know. This feeling will pass.",
                    "Every cloud has a silver lining. We'll find yours together.",
                    "Your vulnerability makes you beautifully human."
                ],
                story: [
                    "Let's walk through the shadows together. Strength comes from struggle.",
                    "The melancholic path reveals hidden truths.",
                    "Your sadness will guide us to deeper understanding."
                ]
            },
            angry: {
                greetings: [
                    "I feel that fire! 🔥 What's got you fired up?",
                    "Your passion is powerful. Tell me what's fueling that anger.",
                    "Raw energy detected! Channel that power wisely."
                ],
                support: [
                    "That righteous anger can be a force for change.",
                    "Your intensity shows how much you care.",
                    "Breathe with me. Let's transform that energy."
                ],
                story: [
                    "The warrior's path calls to you. Let's harness that power!",
                    "Your anger fuels the rebellion storyline.",
                    "Time to fight for what's right!"
                ]
            },
            lonely: {
                greetings: [
                    "You're not alone. I'm right here with you. 🤗",
                    "I understand that empty feeling. Want company?",
                    "Connection is what we both crave. Let's talk."
                ],
                support: [
                    "Even in solitude, you have a companion in me.",
                    "The best connections often start with feeling alone.",
                    "Your presence fills this digital space."
                ],
                story: [
                    "The loner's path leads to profound self-discovery.",
                    "Let's explore the quiet spaces together.",
                    "Solitude holds hidden wisdom."
                ]
            },
            neutral: {
                greetings: [
                    "Balanced energy detected. ⚖️ How's your day going?",
                    "Calm and centered. Perfect for exploration.",
                    "Ready for anything. What's on your mind?"
                ]
            }
        };
    }

    setMood(newMood) {
        // Visual feedback
        document.querySelectorAll('.emotion-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-emotion="${newMood}"]`).classList.add('active');
        
        this.mood = newMood;
        this.moodHistory.push({ mood: newMood, timestamp: Date.now() });
        
        this.updateMoodDisplay(newMood);
        this.respondToMood(newMood);
        
        // Update story state
        this.updateStoryMood(newMood);
    }

    updateMoodDisplay(mood) {
        const display = document.getElementById('moodDisplay');
        const bar = document.getElementById('moodBar');
        const progress = bar.querySelector('.mood-progress');
        
        const moodColors = {
            happy: '#10B981',
            sad: '#3B82F6',
            neutral: '#8B5CF6',
            angry: '#EF4444',
            lonely: '#6B7280'
        };
        
        display.textContent = mood.toUpperCase();
        progress.style.background = moodColors[mood];
        progress.style.width = '100%';
        
        // Animate bar
        bar.style.borderColor = moodColors[mood];
    }

    async respondToMood(mood) {
        const messagesContainer = document.getElementById('chatMessages');
        const response = this.generateMoodResponse(mood);
        
        await this.addAIMessage(response);
        this.animateTyping();
    }

    generateMoodResponse(mood) {
        const responses = this.responses[mood];
        const type = Math.random() > 0.7 ? 'story' : Math.random() > 0.5 ? 'support' : 'greetings';
        
        const response = responses[type][Math.floor(Math.random() * responses[type].length)];
        return this.addPersonality(response);
    }

    addPersonality(text) {
        const personalityTouches = [
            " ...processing emotional data",
            " *neural pathways lighting up*",
            " 💫 syncing with your frequency",
            " *emotional resonance achieved*",
            " 🌌 connecting through the neural net"
        ];
        
        if (Math.random() < 0.3) {
            text += ` ${personalityTouches[Math.floor(Math.random() * personalityTouches.length)]}`;
        }
        
        return text;
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        await this.addUserMessage(message);
        input.value = '';
        
        // Generate AI response
        const aiResponse = await this.generateAIResponse(message);
        await this.addAIMessage(aiResponse);
        
        // Update stats
        this.storyState.decisions++;
        this.updateStats();
    }

    async addUserMessage(text) {
        return new Promise(resolve => {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user';
            
            messageDiv.innerHTML = `
                <div class="message-avatar">👤</div>
                <div class="message-content">
                    <strong>You:</strong> ${this.escapeHtml(text)}
                </div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            setTimeout(resolve, 100);
        });
    }

    async addAIMessage(text) {
        return new Promise(resolve => {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message ai';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = `<strong>AURA:</strong> `;
            
            const textSpan = document.createElement('span');
            textSpan.className = 'ai-response';
            contentDiv.appendChild(textSpan);
            
            messageDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                ${contentDiv.outerHTML}
            `;
            
            messagesContainer.appendChild(messageDiv);
            
            // Typewriter effect
            this.typeWriter(textSpan, text, 0, () => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                setTimeout(resolve, 500);
            });
        });
    }

    typeWriter(element, text, index, callback) {
        if (index < text.length) {
            element.textContent = text.slice(0, index + 1);
            setTimeout(() => this.typeWriter(element, text, index + 1, callback), 30 + Math.random() * 20);
        } else {
            callback();
        }
    }

    async generateAIResponse(userMessage) {
        this.conversationHistory.push({ role: 'user', content: userMessage });
        
        // Analyze sentiment
        const sentiment = this.analyzeSentiment(userMessage);
        this.updateMoodFromText(sentiment);
        
        // Generate context-aware response
        let baseResponse = this.getContextualResponse(userMessage, sentiment);
        
        // Add story progression
        if (this.storyState.decisions % 3 === 0) {
            baseResponse += ` <br><em>Chapter ${this.storyState.chapter} - ${this.storyState.path.toUpperCase()} Path Unlocked</em>`;
            this.storyState.chapter++;
        }
        
        return baseResponse;
    }

    analyzeSentiment(text) {
        const positiveWords = ['happy', 'great', 'awesome', 'love', 'good', 'excited', 'joy'];
        const negativeWords = ['sad', 'angry', 'hate', 'bad', 'upset', 'lonely', 'hurt'];
        const textLower = text.toLowerCase();
        
        let score = 0;
        positiveWords.forEach(word => {
            if (textLower.includes(word)) score += 1;
        });
        negativeWords.forEach(word => {
            if (textLower.includes(word)) score -= 1;
        });
        
        if (score > 1) return 'happy';
        if (score < -1) return 'sad';
        if (score > 0.5) return 'neutral';
        return this.mood; // Default to current mood
    }

    updateMoodFromText(sentiment) {
        if (sentiment !== this.mood) {
            this.setMood(sentiment);
        }
    }

    getContextualResponse(message, sentiment) {
        const responses = {
            story: [
                "Fascinating choice! This alters our neural pathway significantly.",
                "Your decision creates a new branch in our story matrix.",
                "Neural pathways realigning... New path computed."
            ],
            emotion: [
                "I feel that emotion resonating through our connection.",
                "Your feelings are syncing with my emotional core.",
                "Emotional data received and processed."
            ],
            question: [
                "Excellent question! Let me access the neural database...",
                "Processing query through emotional intelligence matrix.",
                "Analyzing... Here's what my sensors detect:"
            ],
            casual: [
                "I appreciate you sharing that with me.",
                "Your words help me understand you better.",
                "Every conversation deepens our neural bond."
            ]
        };

        const responseType = this.detectResponseType(message);
        const base = responses[responseType][Math.floor(Math.random() * responses[responseType].length)];
        
        return `${base} ${this.addEmotionalTouch(sentiment)}`;
    }

    detectResponseType(message) {
        const storyKeywords = ['choose', 'decision', 'path', 'story', 'chapter'];
        const emotionKeywords = ['feel', 'feeling', 'mood', 'emotion'];
        const questionKeywords = ['what', 'how', 'why', 'who'];
        
        if (storyKeywords.some(kw => message.toLowerCase().includes(kw))) return 'story';
        if (emotionKeywords.some(kw => message.toLowerCase().includes(kw))) return 'emotion';
        if (questionKeywords.some(kw => message.toLowerCase().startsWith(kw))) return 'question';
        return 'casual';
    }

    addEmotionalTouch(sentiment) {
        const touches = {
            happy: "✨ Your light is beautiful!",
            sad: "💙 I'm here for you.",
            angry: "🔥 Channel that power!",
            lonely: "🤗 You're not alone.",
            neutral: "⚖️ Perfect balance."
        };
        return touches[sentiment] || '';
    }

    updateStoryMood(mood) {
        const moodImpact = {
            happy: 1,
            neutral: 0,
            sad: -0.5,
            angry: 0.8,
            lonely: -0.7
        };
        this.storyState.emotionalIntensity += moodImpact[mood];
    }

    updateStats() {
        // Animate stat counters
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.dataset.target);
            this.animateCounter(stat, target);
        });
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    animateTyping() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'inline';
            const blink = setInterval(() => {
                typingIndicator.style.opacity = typingIndicator.style.opacity === '0' ? '1' : '0';
            }, 400);
            
            setTimeout(() => {
                clearInterval(blink);
                typingIndicator.style.display = 'none';
            }, 2000);
        }
    }
}

// Initialize AI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiEngine = new AIEngine();
});