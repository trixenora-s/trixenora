/**
 * Three.js Scene Manager for Trixenora
 * Cyberpunk 3D Effects & Animations
 */

class ThreeJSManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.character = null;
        this.grid = null;
        this.lights = [];
        this.clock = new THREE.Clock();
        this.time = 0;
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000428, 0.0015);

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 5);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.container,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Create scene elements
        this.createParticles();
        this.createCharacter();
        this.createLights();
        this.createGrid();
        this.createFloatingPanels();

        // Event listeners
        this.setupEventListeners();
        
        // Start animation loop
        this.animate();
    }

    createParticles() {
        const particleCount = 3000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * 400;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 400;

            // Color (neon gradient)
            const color = new THREE.Color();
            const hue = Math.random() * 0.2 + 0.7; // Purple-blue range
            color.setHSL(hue, 0.8, 0.5 + Math.random() * 0.3);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            // Size
            sizes[i] = Math.random() * 3 + 1;

            // Velocity
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2() }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                uniform vec2 mouse;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    float dist = distance(gl_PointCoord, vec2(0.5));
                    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                    alpha *= 0.8 + 0.2 * sin(time * 5.0);
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createCharacter() {
        const group = new THREE.Group();

        // Head (glowing orb)
        const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({
            color: 0x8B5CF6,
            emissive: 0x2a1a5a,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.2;
        group.add(head);

        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x06B6D4 });
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.3, 1.3, 0.85);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.3, 1.3, 0.85);
        group.add(leftEye, rightEye);

        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.8, 1.5, 32);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0x1e3a8a,
            emissive: 0x0c1d40,
            shininess: 80
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0;
        group.add(body);

        // Neon lines
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xEF4444, transparent: true, opacity: 0.8 });
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-0.6, 0.5, 0.9),
            new THREE.Vector3(0.6, 0.5, 0.9)
        ]);
        const neonLine = new THREE.Line(lineGeometry, lineMaterial);
        group.add(neonLine);

        this.character = group;
        this.scene.add(this.character);
    }

    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);

        // Neon point lights
        const purpleLight = new THREE.PointLight(0x8B5CF6, 1, 50);
        purpleLight.position.set(-5, 5, 5);
        purpleLight.castShadow = true;
        this.scene.add(purpleLight);

        const blueLight = new THREE.PointLight(0x06B6D4, 1, 50);
        blueLight.position.set(5, -3, 3);
        this.scene.add(blueLight);

        const redLight = new THREE.PointLight(0xEF4444, 0.8, 30);
        redLight.position.set(0, 10, 2);
        this.scene.add(redLight);

        this.lights = [purpleLight, blueLight, redLight];
    }

    createGrid() {
        const gridHelper = new THREE.GridHelper(50, 50, 0x8B5CF6, 0x8B5CF6);
        gridHelper.material.opacity = 0.1;
        gridHelper.material.transparent = true;
        gridHelper.rotation.x = -Math.PI / 2;
        gridHelper.position.y = -5;
        this.scene.add(gridHelper);

        // Digital lines
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x06B6D4, 
            transparent: true, 
            opacity: 0.3 
        });
        
        for (let i = 0; i < 20; i++) {
            const points = [];
            for (let j = 0; j < 6; j++) {
                points.push(new THREE.Vector3(
                    (i - 10) * 2,
                    Math.sin(j * 1.5 + i * 0.5) * 3,
                    (j - 3) * 8
                ));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            this.scene.add(line);
        }
    }

    createFloatingPanels() {
        for (let i = 0; i < 5; i++) {
            const geometry = new THREE.PlaneGeometry(3, 2);
            const material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.1,
                side: THREE.DoubleSide
            });
            const panel = new THREE.Mesh(geometry, material);
            panel.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 20
            );
            panel.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            this.scene.add(panel);
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }

    handleResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.time = this.clock.getElapsedTime();
        
        // Update particles
        if (this.particles) {
            this.particles.material.uniforms.time.value = this.time;
            this.particles.material.uniforms.mouse.value = new THREE.Vector2(this.mouse.x, this.mouse.y);
            
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= 0.02 + Math.sin(this.time + i) * 0.001;
                if (positions[i + 1] < -200) positions[i + 1] = 200;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Animate character
        if (this.character) {
            this.character.rotation.y = Math.sin(this.time * 0.5) * 0.3;
            this.character.position.y = Math.sin(this.time * 2) * 0.1;
            this.character.rotation.z = this.mouse.x * 0.2;
            this.character.rotation.x = this.mouse.y * 0.2;
        }

        // Animate lights
        this.lights[0].position.x = Math.sin(this.time * 0.8) * 8;
        this.lights[1].position.y = Math.cos(this.time * 0.6) * 5;
        this.lights[2].intensity = 0.8 + Math.sin(this.time * 3) * 0.2;

        // Camera movement
        this.camera.position.x = this.mouse.x * 0.5;
        this.camera.position.y = this.mouse.y * 0.5;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize scenes when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Hero scene
    if (document.getElementById('heroCanvas')) {
        window.heroScene = new ThreeJSManager('heroCanvas');
    }
    
    // Game scene
    if (document.getElementById('gameCanvas')) {
        window.gameScene = new ThreeJSManager('gameCanvas');
    }
});