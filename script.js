window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  const content = document.getElementById('content');

  setTimeout(() => {
    intro.style.display = 'none';
    content.classList.remove('hidden');
  }, 1500);
});

// SETTINGS MENU
const settingsBtn = document.getElementById('settings-btn');
const settingsMenu = document.getElementById('settings-menu');
const themeSelect = document.getElementById('theme-select');
const multiTheme = document.getElementById('multi-theme');

settingsBtn.addEventListener('click', () => {
  settingsMenu.classList.toggle('hidden');
});

themeSelect.addEventListener('change', applyTheme);
multiTheme.addEventListener('change', saveSettings);

function applyTheme() {
  const theme = themeSelect.value;
  document.body.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}

function saveSettings() {
  localStorage.setItem('multiTheme', multiTheme.checked);
}

function loadSettings() {
  const savedTheme = localStorage.getItem('theme') || 'cyan';
  const savedMulti = localStorage.getItem('multiTheme') === 'true';

  themeSelect.value = savedTheme;
  multiTheme.checked = savedMulti;

  document.body.dataset.theme = savedTheme;
}

loadSettings();

// PARTICLES
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,255,255,0.6)';
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();
