const https = require('https');
const fs = require('fs');
const path = require('path');

// Ensure the images directory exists
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download an image
function downloadImage(filename, width, height) {
  const url = `https://placehold.co/${width}x${height}/f3f4f6/6b7280/png?text=${encodeURIComponent(filename.replace('.png', ''))}`;
  const filePath = path.join(imagesDir, filename);

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${filename}`);
      });
    } else {
      console.error(`Failed to download ${filename}: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
}

// Download placeholder images
downloadImage('placeholder-achievement.png', 800, 400);
downloadImage('placeholder-report.png', 800, 400);
downloadImage('placeholder-team.png', 400, 400);
downloadImage('placeholder-event.png', 800, 400);
downloadImage('placeholder-talent.png', 400, 400); 