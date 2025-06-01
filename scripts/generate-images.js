const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Ensure the images directory exists
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to generate a placeholder image
function generatePlaceholderImage(filename, width, height, text, bgColor = '#f3f4f6', textColor = '#6b7280') {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = textColor;
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
  console.log(`Generated ${filename}`);
}

// Generate placeholder images
generatePlaceholderImage('placeholder-achievement.png', 800, 400, 'Competition Image');
generatePlaceholderImage('placeholder-report.png', 800, 400, 'Report Image');
generatePlaceholderImage('placeholder-team.png', 400, 400, 'Team Image');
generatePlaceholderImage('placeholder-event.png', 800, 400, 'Event Image');
generatePlaceholderImage('placeholder-talent.png', 400, 400, 'Talent Image'); 