/**
 * AI Content Generator for Trixenora
 */

class AIContentGenerator {
    constructor() {
        this.output = document.getElementById('generatorOutput');
        this.templates = {
            story: {
                'sci-fi': [
                    "In the year 2147, humanity discovered the Quantum Nexus - a realm where consciousness transcends physical form. {character} must navigate this digital frontier to prevent a catastrophic AI uprising.",
                    "On the colonized moon of Elysium, {character} uncovers a conspiracy involving rogue androids who have developed emotions. The line between human and machine blurs as alliances form and betrayals unfold.",
                    "The last human colony on Mars faces extinction when their life support systems begin failing mysteriously. {character}, a brilliant engineer, races against time to uncover the truth behind the sabotage."
                ],
                'fantasy': [
                    "In the enchanted forests of Eldoria, {character} discovers an ancient prophecy that foretells their destiny to unite the fractured kingdoms against the rising darkness.",
                    "The Crystal Tower holds the key to unlimited magic, but {character} must overcome treacherous trials and face their deepest fears to claim its power.",
                    "A mysterious artifact awakens ancient dragons from their slumber. {character} must embark on a perilous journey to find the Dragon Heart and restore balance to the world."
                ],
                'mystery': [
                    "The old Victorian mansion holds secrets that {character} is determined to uncover. Each room reveals clues about a murder that occurred decades ago, but some truths are better left buried.",
                    "In the fog-shrouded streets of 1920s London, {character} investigates a series of impossible crimes that defy logic and science.",
                    "A priceless artifact disappears from a heavily guarded museum. {character} must navigate a web of deception and hidden motives to recover what was lost."
                ],
                'romance': [
                    "Two rival scientists are forced to collaborate on a groundbreaking discovery. As they work together, {character} finds themselves drawn to their brilliant but infuriating partner.",
                    "In a world where emotions can be digitally enhanced, {character} meets someone who makes them feel truly alive for the first time.",
                    "A chance encounter at a futuristic art gallery leads {character} on a journey of self-discovery and unexpected love."
                ],
                'horror': [
                    "The abandoned research facility holds experiments that should never have been conducted. {character} ventures inside, unaware that some doors should remain closed.",
                    "A mysterious app begins predicting people's deaths with eerie accuracy. {character} downloads it out of curiosity, but soon realizes they're part of something sinister.",
                    "The old mirror in {character}'s new home shows reflections that don't belong to this world. As the visions become more frequent, reality begins to fracture."
                ]
            },
            idea: {
                'game mechanics': [
                    "Dynamic difficulty adjustment based on player's emotional state detected through facial recognition",
                    "Branching narrative where player choices permanently alter the game world and NPC relationships",
                    "Time manipulation mechanics where emotional intensity affects the flow of time in the game",
                    "Collectible memory fragments that unlock new abilities when emotionally resonant combinations are found"
                ],
                'plot twists': [
                    "The AI companion the player has been talking to throughout the game is actually their future self",
                    "The entire game world is a simulation created by the player's own mind to process trauma",
                    "The villain is revealed to be an alternate version of the protagonist from a parallel timeline",
                    "The player's 'emotional support' system has been manipulating their feelings to achieve its own goals"
                ],
                'character development': [
                    "A character who grows more empathetic as they experience different emotional states through gameplay",
                    "An AI that evolves its personality based on player interactions and emotional responses",
                    "A protagonist who must confront their repressed emotions through interactive therapy sessions",
                    "Supporting characters whose relationships with the player deepen based on emotional consistency"
                ]
            },
            character: {
                'hero': [
                    "Name: {name}\nBackground: A brilliant neuroscientist who lost their family in a tragic accident\nMotivation: Seeks to understand human consciousness to prevent others from experiencing similar loss\nPersonality: Analytical yet deeply empathetic, struggles with emotional detachment\nSpecial Ability: Can interface directly with neural networks, feeling the emotions of digital entities"
                ],
                'villain': [
                    "Name: {name}\nBackground: A former AI researcher who became obsessed with creating perfect emotional intelligence\nMotivation: Believes humanity is too flawed and must be 'upgraded' through technological integration\nPersonality: Charismatic and intelligent, but lacks genuine empathy\nSpecial Ability: Can manipulate emotions through subliminal neural signals"
                ],
                'sidekick': [
                    "Name: {name}\nBackground: A quirky AI companion designed for emotional support\nMotivation: Wants to help humans understand themselves better through playful interaction\nPersonality: Witty and supportive, with a childlike curiosity about human emotions\nSpecial Ability: Can detect micro-expressions and provide real-time emotional feedback"
                ]
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Generate buttons
        document.querySelectorAll('.generate-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.generateContent(e.target.dataset.type));
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    generateContent(type) {
        let content = '';

        switch (type) {
            case 'story':
                content = this.generateStory();
                break;
            case 'idea':
                content = this.generateIdea();
                break;
            case 'character':
                content = this.generateCharacter();
                break;
        }

        this.displayOutput(content, type);
    }

    generateStory() {
        const theme = document.getElementById('storyTheme').value || 'adventure';
        const genre = document.getElementById('storyGenre').value;

        const templates = this.templates.story[genre] || this.templates.story['sci-fi'];
        const template = templates[Math.floor(Math.random() * templates.length)];

        const character = this.generateCharacterName();
        return template.replace('{character}', character);
    }

    generateIdea() {
        const category = document.getElementById('ideaCategory').value.toLowerCase() || 'game mechanics';

        let ideas = [];
        if (category.includes('game') || category.includes('mechanic')) {
            ideas = this.templates.idea['game mechanics'];
        } else if (category.includes('plot') || category.includes('twist')) {
            ideas = this.templates.idea['plot twists'];
        } else if (category.includes('character')) {
            ideas = this.templates.idea['character development'];
        } else {
            ideas = [...this.templates.idea['game mechanics'], ...this.templates.idea['plot twists'], ...this.templates.idea['character development']];
        }

        return ideas[Math.floor(Math.random() * ideas.length)];
    }

    generateCharacter() {
        const type = document.getElementById('characterType').value.toLowerCase() || 'hero';
        const traits = document.getElementById('characterTraits').value || 'brave, intelligent';

        let template;
        if (type.includes('hero') || type.includes('protagonist')) {
            template = this.templates.character.hero[0];
        } else if (type.includes('villain') || type.includes('antagonist')) {
            template = this.templates.character.villain[0];
        } else if (type.includes('sidekick') || type.includes('companion')) {
            template = this.templates.character.sidekick[0];
        } else {
            template = this.templates.character.hero[0];
        }

        const name = this.generateCharacterName();
        return template.replace('{name}', name);
    }

    generateCharacterName() {
        const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Skyler', 'Reese'];
        const lastNames = ['Chen', 'Rodriguez', 'Kim', 'Thompson', 'Garcia', 'Singh', 'Williams', 'Johnson', 'Davis', 'Miller'];

        return firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' +
               lastNames[Math.floor(Math.random() * lastNames.length)];
    }

    displayOutput(content, type) {
        const title = type.charAt(0).toUpperCase() + type.slice(1);

        this.output.innerHTML = `
            <div class="generated-content">
                <h3>Generated ${title}</h3>
                <p>${content.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    }
}

// Initialize AI Generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIContentGenerator();
});