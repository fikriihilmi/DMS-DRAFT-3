const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set up storage for uploaded documents
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Endpoint to upload documents
app.post('/upload', upload.single('document'), (req, res) => {
    if (req.file) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Endpoint to get the list of documents
app.get('/documents', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to retrieve documents' });
        }
        const documents = files.map(file => ({
            name: file,
            status: 'Uploaded'
        }));
        res.json({ documents });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
