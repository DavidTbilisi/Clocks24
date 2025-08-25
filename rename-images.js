const fs = require('fs');
const path = require('path');

// Read the JSON file
const clocksData = JSON.parse(fs.readFileSync('clocks.json', 'utf8'));
const imagesDir = 'images';

// Create mapping of current filenames to new filenames based on time
const renameMap = new Map();

// Build mapping from JSON data
clocksData.forEach(clock => {
  const currentPath = clock.src.replace('images/', '');
  const time = clock.time.replace(':', '');
  const extension = path.extname(currentPath);
  const newFilename = `${time}${extension}`;
  
  renameMap.set(currentPath, newFilename);
});

console.log('Rename mapping:');
console.log('Current → New');
console.log('================');

// Check which files exist and show the mapping
renameMap.forEach((newName, currentName) => {
  const currentFullPath = path.join(imagesDir, currentName);
  const newFullPath = path.join(imagesDir, newName);
  
  if (fs.existsSync(currentFullPath)) {
    console.log(`${currentName} → ${newName}`);
    
    // Perform the rename
    try {
      fs.renameSync(currentFullPath, newFullPath);
      console.log(`✓ Renamed successfully`);
    } catch (error) {
      console.log(`✗ Error renaming: ${error.message}`);
    }
  } else {
    console.log(`${currentName} → ${newName} (FILE NOT FOUND)`);
  }
  console.log('');
});

console.log('Renaming complete!');
