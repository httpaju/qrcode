const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

mongoose.connect('mongodb+srv://torrent:store@torrent.mpoyu9t.mongodb.net/?retryWrites=true&w=majority&appName=torrent', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const qrSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid(10) },
  text: String,
  options: Object,
  imageDataUrl: String,
  createdAt: { type: Date, default: Date.now },
});
const QRCodeModel = mongoose.model('QRCode', qrSchema);

// Save QR code data and return shareable ID
app.post('/api/save', upload.none(), async (req, res) => {
  const { text, options, imageDataUrl } = req.body;
  if (!text || !imageDataUrl) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const qr = new QRCodeModel({ text, options: JSON.parse(options), imageDataUrl });
    await qr.save();
    res.json({ success: true, id: qr._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get QR code by id
app.get('/api/qr/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const qr = await QRCodeModel.findById(id);
    if (!qr) return res.status(404).json({ error: 'QR code not found' });
    res.json({ success: true, data: qr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on `));
