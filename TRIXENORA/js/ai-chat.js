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
        
        // Check for special keywords
        if (message.toLowerCase().includes('subhash')) {
            // Special message for subhash
            setTimeout(() => {
                this.addMessage('✨ subhash loves maitri ✨', 'ai');
                this.create3DHearts();
            }, 500);
            this.input.value = '';
            return;
        }
        
        // Check for "maitri" keyword - trigger love sign animation
        if (message.toLowerCase().includes('maitri')) {
            this.createFloatingHearts();
        }
        
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

    createFloatingHearts() {
        const heartCount = 5 + Math.floor(Math.random() * 5); // 5-10 hearts
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '❤️';
                
                // Random horizontal position
                const startLeft = Math.random() * window.innerWidth;
                heart.style.left = startLeft + 'px';
                heart.style.bottom = '0px';
                
                document.body.appendChild(heart);
                
                // Trigger animation with a small delay for staggered effect
                setTimeout(() => {
                    heart.classList.add('animate');
                }, 10);
                
                // Remove heart after animation completes
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 100); // Stagger heart creation
        }
    }

    create3DHearts() {
        // Create a container for 3D hearts if it doesn't exist
        let container = document.getElementById('hearts3dContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'hearts3dContainer';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '9998';
            document.body.appendChild(container);
        }

        // Create scene for 3D hearts
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        camera.position.z = 10;

        // Create heart geometries
        const heartGroup = new THREE.Group();
        scene.add(heartGroup);

        const heartCount = 8;
        for (let i = 0; i < heartCount; i++) {
            const geometry = this.createHeartGeometry();
            const material = new THREE.MeshPhongMaterial({
                color: 0xff1493 + Math.random() * 0x00ffff,
                emissive: 0xff1493,
                wireframe: false,
                shininess: 100
            });
            const heart = new THREE.Mesh(geometry, material);
            
            // Random initial position
            heart.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
            );
            
            // Random scale
            const scale = 0.5 + Math.random() * 0.5;
            heart.scale.set(scale, scale, scale);
            
            // Store animation data
            heart.userData.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3
            );
            heart.userData.rotation = new THREE.Euler(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            heartGroup.add(heart);
        }

        // Add lighting
        const light1 = new THREE.PointLight(0xff1493, 1, 100);
        light1.position.set(10, 10, 10);
        scene.add(light1);

        const light2 = new THREE.PointLight(0x00ffff, 0.5, 100);
        light2.position.set(-10, -10, 10);
        scene.add(light2);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        // Animation loop
        let startTime = Date.now();
        const duration = 5000; // 5 seconds

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            if (progress < 1) {
                // Update heart positions
                heartGroup.children.forEach(heart => {
                    heart.position.addScaledVector(heart.userData.velocity, 0.016);
                    heart.rotation.x += 0.01;
                    heart.rotation.y += 0.02;
                });

                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            } else {
                // Remove container after animation
                container.remove();
            }
        };

        animate();
    }

    createHeartGeometry() {
        // Create a simple heart shape using a curve
        const shape = new THREE.Shape();
        
        const x = 0, y = 0;
        shape.moveTo(x + 5, y + 5);
        shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
        shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
        shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
        shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
        shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
        shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

        const geometry = new THREE.ShapeGeometry(shape);
        geometry.center();
        
        // Convert 2D to 3D with extrusion
        const extrudeSettings = {
            depth: 2,
            bevelEnabled: true,
            bevelThickness: 0.3,
            bevelSize: 0.5,
            bevelSegments: 3
        };

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }
}

// Initialize AI Chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIChat();
});