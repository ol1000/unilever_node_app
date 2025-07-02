const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve individual HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page2.html'));
});

// Sample API endpoints
app.get('/api/item/:id', (req, res) => {
    const itemId = req.params.id;
    res.json({ itemId: itemId, message: `Data for item ${itemId}` });
});

// Advanced example: returning JSON data with a delay to mimic processing
app.get('/api/subitem/:id', (req, res) => {
    const subItemId = req.params.id;
    setTimeout(() => {
        res.json({ subItemId: subItemId, message: `Data for subitem ${subItemId}` });
    }, 500); // 500ms delay to simulate processing
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
