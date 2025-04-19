const fs = require('fs');
const path = require('path');

// Path to the posts directory and index.html
const postsDir = path.join(__dirname, 'posts');
const indexPath = path.join(__dirname, 'index.html');

// Read all files in the posts directory
const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

// Read the current index.html content
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// Find the position to insert new posts
const listStart = indexContent.indexOf('<ul>');
const listEnd = indexContent.indexOf('</ul>');

if (listStart === -1 || listEnd === -1) {
    console.error('Error: Could not find the <ul> element in index.html');
    process.exit(1);
}

// Extract existing list items
const existingList = indexContent.substring(listStart, listEnd);

// Generate new list items for posts
let newListItems = '';
postFiles.forEach(file => {
    const postName = path.basename(file, '.md');
    const postLink = `output/${postName}.html`;

    if (!existingList.includes(postLink)) {
        newListItems += `        <li><a href="${postLink}">${postName}</a></li>\n`;
    }
});

// Insert new list items into the index.html
if (newListItems) {
    indexContent = indexContent.slice(0, listEnd) + newListItems + indexContent.slice(listEnd);
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log('index.html updated successfully.');
} else {
    console.log('No new posts to add.');
}