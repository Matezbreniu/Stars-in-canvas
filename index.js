const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const particleSize = 3;
let particlesCount = 30;
const maxSpeed = 0.3;
const distance = 150;
let particles = [];

canvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
canvasSize();

window.addEventListener('resize', () => {
  canvasSize();
  particlesCount = Math.round((window.innerWidth + window.innerHeight) / 50);
  particles = [];
  setParticles();
});

setParticles = () => {
  for (let i = 0; i < particlesCount; i++) {
    const particle = {
      x: Math.random() * canvas.width - particleSize / 2,
      y: Math.random() * canvas.height - particleSize / 2,
      vx:
        Math.random() > 0.5
          ? Math.random() * maxSpeed
          : Math.random() * -maxSpeed,
      vy:
        Math.random() > 0.5
          ? Math.random() * maxSpeed
          : Math.random() * -maxSpeed,
    };
    particles.push(particle);
  }
};
setParticles();

drawLine = (particle, particle2) => {
  ctx.beginPath();
  ctx.moveTo(particle.x, particle.y);
  ctx.lineTo(particle2.x, particle2.y);
  ctx.stroke();
};
animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  for (let i = 0; i < particlesCount; i++) {
    const particle = particles[i];
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particleSize, 0, 2 * Math.PI);
    ctx.fill();
    for (let j = 0; j < particlesCount; j++) {
      const particle2 = particles[j];
      if (i !== j) {
        const distanceX = Math.abs(particle.x - particle2.x);
        const distanceY = Math.abs(particle.y - particle2.y);
        const result = Math.pow(distanceX, 2) + Math.pow(distanceY, 2);
        const c2 = Math.pow(distance, 2);
        if (result < c2) {
          ctx.lineWidth = c2 / result / 10 > 1.5 ? 1.5 : c2 / result / 10;
          ctx.strokeStyle = 'grey';
          drawLine(particle, particle2);
        }
      }
    }
    particle.x = particle.x + particle.vx;
    particle.y = particle.y + particle.vy;
    if (
      particle.x >= canvas.width - particleSize / 2 ||
      particle.x < particleSize
    ) {
      particle.vx = -particle.vx;
    }
    if (
      particle.y >= canvas.height - particleSize / 2 ||
      particle.y < particleSize
    ) {
      particle.vy = -particle.vy;
    }
  }
  window.requestAnimationFrame(animate);
};
animate();
