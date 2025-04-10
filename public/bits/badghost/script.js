const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Ensure consistent font usage for all text rendering
ctx.font = '1em "Press Start 2P", monospace';
ctx.fillStyle = '#FFF'; // Default text color
ctx.textAlign = 'left'; // Default text alignment

// --- Load Custom Font ---
const font = new FontFace('PressStart2P', 'url(../../lib/Press_Start_2P/PressStart2P-Regular.ttf)');

// --- Game Constants ---
const SPRITE_FRAME_SIZE = 400;
const GHOST_SCALE = 0.1;
const GHOST_WIDTH = SPRITE_FRAME_SIZE * GHOST_SCALE;
const GHOST_HEIGHT = SPRITE_FRAME_SIZE * GHOST_SCALE;
const GRAVITY = 0.2;
const FLAP_STRENGTH = -5;
const FUN_SPRITE_CHANCE = 0.1; // 10% chance for fun sprite
const COLOR_ACCENT = '#FF0000'; // Red accent color for "AGAIN"
const FRAME_ROWS = 2;
const FRAME_COLS = 2;

// --- Game State ---
let ghost;
let gameActive;
let animationFrameId;
let ghostSprite = new Image();
let funSprites = [];
let frameIndex = 0;
let lastFrameTime = 0;
const FRAME_DURATION = 150; // ms between animation frames
let score = 0; // Initialize score

// --- Particle System ---
const particles = [];

// --- Adjusted Particle System for Grainy Effect ---
function createParticle(x, y) {
  particles.push({
    x,
    y: y + GHOST_HEIGHT / 2, // Position particles slightly below the ghost
    size: Math.random() * 2 + 0.5, // Smaller size for subtle effect
    alpha: 0.8, // Slightly transparent
    velocityX: (Math.random() - 0.5) * 0.5, // Minimal horizontal velocity
    velocityY: (Math.random() - 0.5) * 0.5, // Minimal vertical velocity
    color: getRandomGrainyColor() // Grainy, dithered effect
  });
}

function getRandomGrainyColor() {
const colors = [
    'rgba(240, 240, 240, 0.8)', 
    'rgba(232, 232, 232, 0.8)', 
    'rgba(220, 220, 220, 0.8)', 
    'rgba(211, 211, 211, 0.8)', 
    'rgba(207, 207, 207, 0.8)'
]; // Dithered shades of off-white with transparency
  return colors[Math.floor(Math.random() * colors.length)];
}

// Adjust particle gravity to make them fall quicker
function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    particle.velocityY += 0.1; // Increase gravity effect
    particle.alpha -= 0.02; // Fade out

    // Remove particle if it becomes invisible
    if (particle.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  for (const particle of particles) {
    ctx.globalAlpha = particle.alpha; // Set particle opacity
    ctx.fillStyle = particle.color; // Use grainy color for dust effect
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1; // Reset global alpha
}

// --- Load Sprites ---
function loadSprites() {
  // Load fun sprites from the "fun" folder
  const funSpritePaths = [
    './assets/fun/burrito-ghost.png',
    './assets/fun/pizza-ghost.png',
    './assets/fun/slime-ghost.png',
    './assets/fun/toast-ghost.png'
  ];

  for (const path of funSpritePaths) {
    const img = new Image();
    img.src = path;
    funSprites.push(img);
  }
}

// --- Initialize Game ---
function initializeGame() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Adjust canvas size on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  resetGame();

  // Add input listeners
  canvas.addEventListener('click', flap);
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    flap(e);
  }, { passive: false });

  // Start the game loop
  gameLoop();
}

// --- Reset Game ---
function resetGame() {
  ghost = {
    x: canvas.width / 2 - GHOST_WIDTH / 2,
    y: canvas.height / 2 - GHOST_HEIGHT / 2,
    velocity: 0,
    sprite: Math.random() < FUN_SPRITE_CHANCE ? getRandomFunSprite() : ghostSprite
  };
  gameActive = true; // Reactivate the game
  score = 0; // Reset score
  console.log('Game reset!'); // Debug log to confirm reset
}

// --- Get Random Fun Sprite ---
function getRandomFunSprite() {
  return funSprites[Math.floor(Math.random() * funSprites.length)];
}

// --- Flap ---
function flap(event) {
  if (gameActive) {
    const clickX = event.clientX;
    const ghostCenterX = ghost.x + GHOST_WIDTH / 2;

    // Determine direction of repulsion
    if (clickX < ghostCenterX) {
      ghost.x += 20; // Push ghost to the right
    } else if (clickX > ghostCenterX) {
      ghost.x -= 20; // Push ghost to the left
    }

    ghost.velocity = FLAP_STRENGTH;
    score++; // Increment score on flap
  }
}

// --- Update Game ---
function updateGame() {
  if (!gameActive) return;

  // Apply gravity
  ghost.velocity += GRAVITY;
  ghost.y += ghost.velocity;

  // Create particles at the ghost's position
  createParticle(ghost.x + GHOST_WIDTH / 2, ghost.y + GHOST_HEIGHT / 2);

  // Check if ghost falls off the screen
  if (ghost.y > canvas.height + GHOST_HEIGHT) {
    gameActive = false;
    console.log('Game over! Waiting for player input to restart.');
  }

  // Update horizontal drift based on static wiggle
  const sideAmplitude = 25; // max left/right movement from center
  const sideFrequency = 0.002; // wiggle speed
  const time = Date.now();
  ghost.x = canvas.width / 2 - GHOST_WIDTH / 2 + Math.sin(time * sideFrequency) * sideAmplitude;

  // Update frame index for animation
  const now = Date.now();
  if (now - lastFrameTime >= FRAME_DURATION) {
    frameIndex = (frameIndex + 1) % (FRAME_ROWS * FRAME_COLS);
    lastFrameTime = now;
  }
}

// --- Draw Game ---
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
  ctx.fillStyle = '#fafafa'; // Set background color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw the background

  // Draw ghost with animation
  const col = frameIndex % FRAME_COLS;
  const row = Math.floor(frameIndex / FRAME_COLS);
  const spriteX = col * SPRITE_FRAME_SIZE;
  const spriteY = row * SPRITE_FRAME_SIZE;
  ctx.drawImage(
    ghost.sprite, 
    spriteX, spriteY, // Source x and y in the sprite sheet
    SPRITE_FRAME_SIZE, SPRITE_FRAME_SIZE, // Source width and height
    ghost.x, ghost.y, // Destination x and y on the canvas
    GHOST_WIDTH, GHOST_HEIGHT // Destination width and height on the canvas
  );
}

// --- Draw Score ---
function drawScore() {
  ctx.font = '1em "Press Start 2P", monospace'; // Ensure consistent font
  ctx.fillStyle = '#FFF'; // White text color
  ctx.textAlign = 'left'; // Align text to the left
  ctx.fillText(`Score: ${score}`, 10, 30); // Display score at the top-left corner
}

// --- Adjusted Game Over Screen Layout ---
function drawGameOverScreen() {
  const boxWidth = 300;
  const boxHeight = 150;
  const boxX = (canvas.width - boxWidth) / 2;
  const boxY = (canvas.height - boxHeight) / 2;

  // Draw black frame
  ctx.fillStyle = '#000';
  ctx.fillRect(boxX - 4, boxY - 4, boxWidth + 8, boxHeight + 8);

  // Draw white box
  ctx.fillStyle = '#FFF';
  ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

  // Draw text
  ctx.fillStyle = '#000';
  ctx.font = '1em "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BAD GHOST', canvas.width / 2, boxY + 50);
  ctx.fillText("DON'T DIE", canvas.width / 2, boxY + 80);
  ctx.fillText('AGAIN', canvas.width / 2, boxY + 110);
}

// --- Game Loop ---
function gameLoop() {
  if (gameActive) {
    updateGame();
    updateParticles(); // Update particles
    drawGame();
    drawParticles(); // Draw particles
    drawScore(); // Draw the score on top
    animationFrameId = requestAnimationFrame(gameLoop);
  } else {
    drawGameOverScreen();
    cancelAnimationFrame(animationFrameId);
  }
}

// Ensure resetGame is only called on user input
canvas.addEventListener('click', () => {
  if (!gameActive) {
    resetGame();
    gameLoop();
  }
});

// --- Start Game ---
Promise.all([
  font.load().catch((err) => {
    console.error('Failed to load font:', err);
  }),
  new Promise((resolve, reject) => {
    ghostSprite.onload = () => {
      console.log('Ghost sprite loaded successfully');
      resolve();
    };

    ghostSprite.onerror = (err) => {
      console.error('Failed to load ghost sprite:', err);
      reject(err);
    };

    ghostSprite.src = './assets/ghost-sprite.png';
  })
]).then(() => {
  document.fonts.add(font);
  ctx.font = '1em PressStart2P'; // Set default font for the canvas
  initializeGame(); // Start the game only after the font and sprite are loaded
}).catch((err) => {
  console.error('Game initialization failed:', err);
});

loadSprites();