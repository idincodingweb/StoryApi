const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk CORS
app.use(cors());
app.use(express.json());

// Contoh endpoint API
app.get('/api/stories', (req, res) => {
  res.json({ message: 'API bekerja dengan baik!' });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
