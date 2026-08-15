const canvas = document.getElementById('neuralCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let nodes = [];
    const nodeCount = 110;
    const connectionDistance = 140;

    const mouse = {
        x: null,
        y: null,
        radius: 170
    };

    let currentScrollY = window.scrollY;
    let scrollVelocity = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class NeuralNode {
        constructor() {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * (Math.min(canvas.width, canvas.height) * 0.35);
            
            this.baseX = canvas.width / 2 + Math.cos(angle) * radius;
            this.baseY = canvas.height / 2 + Math.sin(angle) * radius;
            
            this.x = this.baseX;
            this.y = this.baseY;
            
            this.size = Math.random() * 2.5 + 1.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.pulsePhase = Math.random() * Math.PI;
        }

        update() {
            this.baseX += this.speedX;
            this.baseY += this.speedY;

            let forceX = 0;
            let forceY = 0;

            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    forceX = (dx / distance) * force * 5;
                    forceY = (dy / distance) * force * 5;
                }
            }

            this.y += scrollVelocity * 0.4;
            this.baseY += scrollVelocity * 0.15;

            this.x += (this.baseX - this.x) * 0.06 + forceX;
            this.y += (this.baseY - this.y) * 0.06 + forceY;

            if (this.baseX < 0 || this.baseX > canvas.width) this.speedX *= -1;
            if (this.baseY < 0 || this.baseY > canvas.height) this.speedY *= -1;

            this.pulsePhase += 0.02;
        }

        draw() {
            const alpha = 0.4 + Math.sin(this.pulsePhase) * 0.3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Cyan node point with glowing highlight matching Eduosynapse light theme
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
                    
                    // Electric blue line strokes matching `#0284C7`
                    ctx.strokeStyle = `rgba(2, 132, 199, ${opacity})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        scrollVelocity *= 0.9; 

        nodes.forEach(node => {
            node.update();
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

    window.addEventListener('scroll', () => {
        let newScrollY = window.scrollY;
        scrollVelocity = newScrollY - currentScrollY;
        currentScrollY = newScrollY;
    });

    init();
    animate();
}