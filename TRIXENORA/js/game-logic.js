/**
 * TRIXENORA - Game Logic & State Management
 */

class GameLogic {
    constructor() {
        this.gameState = {
            level: 1,
            score: 0,
            timePlayed: 0,
            achievements: [],
            saveData: localStorage.getItem('trixenoraSave') ? 
                JSON.parse(localStorage.getItem('trixenoraSave')) : {}
        };
        
        this.init();
    }

    init() {
        this.loadGame();
        this.bindGameEvents();
        this.startGameLoop();
        this.loadAchievements();
    }

    bindGameEvents() {
        // Pause/Resume
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.togglePause();
            }
        });

        // Save game periodically
        setInterval(() => this.autoSave(), 30000);
    }

    startGameLoop() {
        const loop = () => {
            this.gameState.timePlayed++;
            this.updateGameUI();
            requestAnimationFrame(loop);
        };
        loop();
    }

    togglePause() {
        const canvas = document.getElementById('gameCanvas');
        canvas.classList.toggle('paused');
        // Add pause overlay logic here
    }

    updateGameUI() {
        // Update time display
        const timeDisplay = document.querySelector('.time-played');
        if (timeDisplay) {
            const minutes = Math.floor(this.gameState.timePlayed / 60000);
            const seconds = Math.floor((this.gameState.timePlayed % 60000) / 1000);
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    loadGame() {
        if (this.gameState.saveData.level) {
            this.gameState = { ...this.gameState, ...this.gameState.saveData };
        }
    }

    autoSave() {
        localStorage.setItem('trixenoraSave', JSON.stringify(this.gameState));
    }

    unlockAchievement(name, description) {
        if (!this.gameState.achievements.includes(name)) {
            this.gameState.achievements.push(name);
            this.showAchievement(name, description);
            this.autoSave();
        }
    }

    showAchievement(name, description) {
        // Create achievement popup
        const achievement = document.createElement('div');
        achievement.className = 'achievement-popup';
        achievement.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">🏆</div>
                <div>
                    <div class="achievement-title">${name}</div>
                    <div class="achievement-desc">${description}</div>
                </div>
            </div>
        `;
        document.body.appendChild(achievement);
        
        setTimeout(() => achievement.remove(), 4000);
    }

    loadAchievements() {
        const achievements = [
            { name: 'First Connection', desc: 'Started your first conversation', id: 'first_chat' },
            { name: 'Emotional Spectrum', desc: 'Experienced all 5 emotions', id: 'all_emotions' },
            { name: 'Deep Talker', desc: 'Sent 50 messages', id: 'deep_talker' }
        ];
    }
}

// Initialize game logic
document.addEventListener('DOMContentLoaded', () => {
    window.gameLogic = new GameLogic();
});