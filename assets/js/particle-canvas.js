const canvas = document.getElementById('neuralCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let nodes = [];
    let nodeCount = 140;
    let connectionDistance = 140;

    const mouse = {
        x: null,
        y: null,
        radius: 170
    };

    let lastScrollY = window.scrollY;

    // Dynamically adjust parameters based on screen width
    function updateResponsiveConfig() {
        if (window.innerWidth < 768) {
            // Mobile screens
            nodeCount = 70;
            connectionDistance = 100;
        } else if (window.innerWidth < 1200) {
            // Tablet / Medium screens
            nodeCount = 120;
            connectionDistance = 120;
        } else {
            // Large desktop screens
            nodeCount = 180;
            connectionDistance = 140;
        }
    }

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);

        // Update counts and re-initialize nodes for the new screen size
        updateResponsiveConfig();
        init();
    }

    window.addEventListener('resize', resizeCanvas);

    class NeuralNode {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            
            this.size = Math.random() * 2.5 + 1.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.pulsePhase = Math.random() * Math.PI;
        }

        update(scrollDelta) {
            this.x += this.speedX;
            this.y += this.speedY + (scrollDelta * 0.35);

            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    this.x += (dx / distance) * force * 2;
                    this.y += (dy / distance) * force * 2;
                }
            }

            if (this.x < -20) this.x = window.innerWidth + 20;
            if (this.x > window.innerWidth + 20) this.x = -20;
            if (this.y < -20) this.y = window.innerHeight + 20;
            if (this.y > window.innerHeight + 20) this.y = -20;

            this.pulsePhase += 0.02;
        }

        draw() {
            const alpha = 0.4 + Math.sin(this.pulsePhase) * 0.3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#06B6D4';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function init() {
        nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new NeuralNode());
        }
    }

    function drawConnections() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let dx = nodes[i].x - nodes[j].x;
                let dy = nodes[i].y - nodes[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    let opacity = (1 - (distance / connectionDistance)) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    
                    ctx.strokeStyle = `rgba(2, 132, 199, ${opacity})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        nodes.forEach(node => {
            node.update(scrollDelta);
            node.draw();
        });

        drawConnections();
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Initial setup call
    resizeCanvas();
    animate();
}