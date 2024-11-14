const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing request body

// Menyajikan file gambar dari folder 'image'
app.use('/image', express.static(path.join(__dirname, 'image')));

// Endpoint untuk mendapatkan daftar cerita
app.get('/api/stories', (req, res) => {
  const storiesDirectory = path.join(__dirname, 'data'); // Lokasi folder cerita
  fs.readdir(storiesDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading stories directory' });
    }

    const stories = files.map(file => {
      const filePath = path.join(storiesDirectory, file);
      try {
        const storyData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return storyData;
      } catch (parseError) {
        console.error(`Error parsing JSON in file ${file}:`, parseError);
        return null; // Return null for invalid JSON
      }
    }).filter(story => story !== null); // Hapus cerita yang gagal diparsing

    res.json(stories);
  });
});

// Server berjalan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
