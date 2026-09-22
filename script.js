const introOverlay = document.getElementById('intro-overlay');
const introVideo = document.getElementById('intro-video');
const mainContent = document.getElementById('main-content');

// Video ends -> start website immediately with zero gap
introVideo.onended = function() {
    startWebsite();
};

function startWebsite() {
    introOverlay.style.opacity = '0';
    setTimeout(() => {
        introOverlay.style.display = 'none';
        mainContent.classList.add('visible');
    }, 500);
}

// Countdown Target Date
const weddingDate = new Date('October 18, 2026 19:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const gap = weddingDate - now;
    if (gap < 0) return;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    document.getElementById('days').innerText = String(Math.floor(gap / day)).padStart(2, '0');
    document.getElementById('hours').innerText = String(Math.floor((gap % day) / hour)).padStart(2, '0');
    document.getElementById('minutes').innerText = String(Math.floor((gap % hour) / minute)).padStart(2, '0');
    document.getElementById('seconds').innerText = String(Math.floor((gap % minute) / second)).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Scratch Card Setup
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#c5a059';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 16px Cinzel, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Scratch To Reveal Date', canvas.width / 2, canvas.height / 2 + 6);

let isDrawing = false;
function scratch(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (!clientX || !clientY) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mousemove', scratch);
window.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('touchstart', () => isDrawing = true);
canvas.addEventListener('touchmove', scratch);
window.addEventListener('touchend', () => isDrawing = false);

// --- Customizer Control Panel Functions (PIN: 1612) ---
function openCustomizer() {
    document.getElementById('customizer-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('customizer-modal').style.display = 'none';
    document.getElementById('pin-input').value = '';
}

function verifyPin() {
    const pin = document.getElementById('pin-input').value;
    if (pin === '1612') {
        closeModal();
        document.getElementById('edit-panel').style.display = 'flex';
    } else {
        alert('Galat PIN hai bhai! Sahi PIN dalo.');
    }
}

function closeEditPanel() {
    document.getElementById('edit-panel').style.display = 'none';
}

function saveChanges() {
    const newCouple = document.getElementById('edit-couple-name').value;
    const newDate = document.getElementById('edit-date').value;
    const newVenue = document.getElementById('edit-venue').value;

    document.getElementById('display-couple').innerText = newCouple;
    document.getElementById('display-date').innerText = newDate;
    document.getElementById('scratch-date-text').innerText = newDate;
    document.getElementById('display-venue').innerText = newVenue;
    document.getElementById('footer-couple').innerText = newCouple.toUpperCase();

    closeEditPanel();
    alert('Details successfully update ho gayi!');
}

