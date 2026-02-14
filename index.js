
const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const heartsContainer = document.getElementById("heartsContainer");
const sparklesContainer = document.getElementById("sparklesContainer");
const heartsRain = document.getElementById("heartsRain");
const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");

// Initialize floating hearts on page load
function createFloatingHearts() {
  const hearts = ["❤️", "💕", "💖", "💗", "💓", "💞", "💘", "💝", "💟", "😍", "🥰", "😘"];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createHeart(hearts);
    }, i * 500);
  }
  // Keep adding hearts periodically
  setInterval(() => {
    createHeart(hearts);
  }, 800);
}

function createHeart(hearts) {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 4 + 6) + "s";
  heart.style.fontSize = (Math.random() * 25 + 20) + "px";
  heartsContainer.appendChild(heart);

  heart.addEventListener("animationiteration", () => {
    heart.style.left = Math.random() * 100 + "vw";
  });
}

// Create sparkles effect
function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  sparkle.style.setProperty("--random-x", (Math.random() - 0.5) * 150 + "px");
  sparkle.style.setProperty("--random-y", (Math.random() - 0.5) * 150 + "px");
  sparklesContainer.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 800);
}

// Move no button with enhanced movement
noBtn.addEventListener("mouseover", () => {
  const containerRect = questionContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  
  const maxX = containerRect.width - btnRect.width - 30;
  const maxY = containerRect.height - btnRect.height - 30;
  
  const newX = Math.max(10, Math.floor(Math.random() * maxX));
  const newY = Math.max(10, Math.floor(Math.random() * maxY));

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
  noBtn.style.transform = "scale(0.95) rotate(" + (Math.random() * 15 - 7.5) + "deg)";
  
  const rect = noBtn.getBoundingClientRect();
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      createSparkle(
        rect.left + Math.random() * rect.width,
        rect.top + Math.random() * rect.height
      );
    }, i * 40);
  }
});

noBtn.addEventListener("mouseout", () => {
  noBtn.style.transform = "scale(1) rotate(0deg)";
});

// Yes button functionality with enhanced effects
yesBtn.addEventListener("click", () => {
  // Create burst of sparkles
  const rect = yesBtn.getBoundingClientRect();
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      createSparkle(
        rect.left + Math.random() * rect.width,
        rect.top + Math.random() * rect.height
      );
    }, i * 25);
  }

  // Add pulse animation
  yesBtn.classList.add("pulse-animation");
  
  setTimeout(() => {
    questionContainer.style.opacity = "0";
    questionContainer.style.transform = "translate(-50%, -50%) scale(0.8)";
    
    setTimeout(() => {
      questionContainer.style.display = "none";
      heartLoader.style.display = "inherit";
      
      // Start confetti
      startConfetti();
      
      setTimeout(() => {
        heartLoader.style.display = "none";
        resultContainer.style.display = "inherit";
        
        setTimeout(() => {
          resultContainer.style.opacity = "1";
          resultContainer.style.transform = "translate(-50%, -50%) scale(1)";
          
          // Start hearts rain
          startHeartsRain();
        }, 100);
      }, 3000);
    }, 500);
  }, 300);
});

// Confetti effect
let confettiParticles = [];
let confettiActive = false;

function startConfetti() {
  confettiActive = true;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  
  const colors = ["#ff69b4", "#ff1493", "#ffb6c1", "#ffc0cb", "#db7093", "#c71585", "#ff6347", "#ff4757"];
  
  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 4 + 3,
      speedX: Math.random() * 3 - 1.5,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 12 - 6
    });
  }
  
  animateConfetti();
}

function animateConfetti() {
  if (!confettiActive) return;
  
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  confettiParticles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;
    
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rotation * Math.PI / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    confettiCtx.restore();
    
    if (p.y > confettiCanvas.height) {
      p.y = -20;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
  
  requestAnimationFrame(animateConfetti);
}

// Hearts rain effect
function startHeartsRain() {
  const hearts = ["❤️", "💕", "💖", "💗", "💓", "💞", "💘", "💝", "💟", "😍", "🥰"];
  
  setInterval(() => {
    const heart = document.createElement("span");
    heart.classList.add("rain-heart");
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 2 + 2.5) + "s";
    heart.style.fontSize = (Math.random() * 35 + 25) + "px";
    heartsRain.appendChild(heart);
    
    setTimeout(() => heart.remove(), 4500);
  }, 180);
}

// Button hover effects
yesBtn.addEventListener("mouseenter", () => {
  yesBtn.style.boxShadow = "0 0 40px rgba(233, 69, 96, 0.8), 0 0 80px rgba(233, 69, 96, 0.4)";
});

yesBtn.addEventListener("mouseleave", () => {
  yesBtn.style.boxShadow = "0 8px 30px rgba(233, 69, 96, 0.5), 0 0 20px rgba(233, 69, 96, 0.3)";
});

noBtn.addEventListener("mouseenter", () => {
  noBtn.style.boxShadow = "0 0 30px rgba(74, 74, 106, 0.7)";
});

noBtn.addEventListener("mouseleave", () => {
  noBtn.style.boxShadow = "0 8px 30px rgba(74, 74, 106, 0.5)";
});

// Initialize
createFloatingHearts();

// Add dynamic styles
const style = document.createElement("style");
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    30% { transform: scale(1.15); }
    60% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }
  
  .pulse-animation {
    animation: pulse 0.25s ease-in-out 3;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  .result-container {
    animation: fadeInUp 0.6s ease-out;
  }
`;
document.head.appendChild(style);

