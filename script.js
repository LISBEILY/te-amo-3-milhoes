// Inicializar Lucide Icons
lucide.createIcons();

// Configuración del canvas de fondo
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');

function resizeBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeBgCanvas);
resizeBgCanvas();

const elements = Array.from({ length: 45 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    isNumber: Math.random() > 0.6,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.6 + 0.2
}));

function animateBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    elements.forEach(el => {
        el.x += el.speedX;
        el.y += el.speedY;

        if (el.x < 0) el.x = bgCanvas.width;
        if (el.x > bgCanvas.width) el.x = 0;
        if (el.y < 0) el.y = bgCanvas.height;
        if (el.y > bgCanvas.height) el.y = 0;

        bgCtx.fillStyle = `rgba(34, 197, 94, ${el.opacity})`;
        bgCtx.shadowBlur = 6;
        bgCtx.shadowColor = '#22c55e';

        if (el.isNumber) {
            bgCtx.font = "11px Poppins, sans-serif";
            bgCtx.fillText("09", el.x, el.y);
        } else {
            bgCtx.beginPath();
            bgCtx.arc(el.x, el.y, el.size, 0, Math.PI * 2);
            bgCtx.fill();
        }
    });

    requestAnimationFrame(animateBg);
}
animateBg();

// Enviar mensaje de WhatsApp
function sendSaudades() {
    const selectedPerson = document.querySelector('input[name="person"]:checked').value;
    const numChica = "584120942372";
    const numChico = "584125725900";
    
    const targetNumber = selectedPerson === "chico" ? numChica : numChico;
    const message = encodeURIComponent("te extraño amor 💚");
    
    window.open(`https://wa.me/${targetNumber}?text=${message}`, '_blank');
}

// Acción al presionar "Clique"
function handleClique() {
    drawFilledHeart();
    spawnFloatingPhrases();
}

// Frases flotantes
function spawnFloatingPhrases() {
    const container = document.getElementById('floating-words-container');
    const phrases = [
        "te amo gordo 💚",
        "te extraño 💚",
        "estoy perdidamente enamorada de ti 💚",
        "eres el mejor 💚",
        "09 💚",
        "te amo para sempre 💚"
    ];

    const count = window.innerWidth < 640 ? 14 : 22;
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'floating-phrase';
        el.innerText = phrases[Math.floor(Math.random() * phrases.length)];
        
        el.style.left = Math.random() * 75 + 10 + '%';
        el.style.top = Math.random() * 65 + 15 + '%';
        
        const fontSize = window.innerWidth < 640 
            ? Math.floor(Math.random() * 4) + 12 
            : Math.floor(Math.random() * 8) + 14;
        
        el.style.fontSize = `${fontSize}px`;
        el.style.animationDelay = `${Math.random() * 0.6}s`;

        container.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 6500);
    }
}

// Dibujar Corazón
function drawFilledHeart() {
    const canvas = document.getElementById('heart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 400;
    canvas.height = 400;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const phrase = "te amo gor ";
    let phraseIndex = 0;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 15;
    const scale = 11.5; 

    ctx.font = "bold 10px monospace";
    ctx.fillStyle = "#4ade80";
    ctx.shadowBlur = 6;
    ctx.shadowColor = "#22c55e";

    function isInHeart(px, py) {
        const nx = (px - centerX) / scale;
        const ny = -(py - centerY) / scale;
        const a = nx * nx + ny * ny - 16;
        return (a * a * a - nx * nx * ny * ny * ny) <= 0;
    }

    let y = centerY - 15 * scale;
    const endY = centerY + 16 * scale;

    const interval = setInterval(() => {
        if (y > endY) {
            clearInterval(interval);
            return;
        }

        for (let x = centerX - 18 * scale; x <= centerX + 18 * scale; x += 8.5) {
            if (isInHeart(x, y)) {
                const char = phrase[phraseIndex % phrase.length];
                phraseIndex++;
                ctx.fillText(char, x, y);
            }
        }
        y += 10.5;
    }, 18);
}

window.onload = drawFilledHeart;
window.onresize = drawFilledHeart;
