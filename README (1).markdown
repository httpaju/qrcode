# Advanced QR Code Generator Backend

This is the backend server for an advanced QR code generator application. It provides a robust API for generating, storing, and retrieving QR code data with custom options and embedded logos.

## Features

- **RESTful API**: Built with Express.js for efficient request handling.
- **Persistent Storage**: Uses MongoDB to store QR code data and metadata.
- **File Uploads**: Supports logo uploads via Multer for embedding in QR codes.
- **Unique IDs**: Generates unique QR code IDs using `nanoid`.
- **CORS Support**: Enabled for seamless integration with frontend applications.
- **Configurable**: Environment variables managed via a `.env` file.

## Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher recommended.
- **MongoDB**: A valid MongoDB connection URI (e.g., MongoDB Atlas or a local instance).
- **Git**: For cloning the repository.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/advanced-qrcode-server.git
   cd advanced-qrcode-server
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the project root and add the following:

   ```ini
   PORT=4000
   MONGO_URI=your_mongodb_connection_string_here
   ```

   Replace `your_mongodb_connection_string_here` with your MongoDB URI (e.g., `mongodb+srv://user:password@cluster0.mongodb.net/dbname`).

4. **Start the Server**:

   For development (with auto-restart via Nodemon):

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:4000` by default (or the port specified in `.env`).

## API Endpoints

### `POST /api/save`

Saves QR code data and returns a unique ID.

**Request Body**:

```json
{
  "text": "Text for QR code",
  "options": "{\"dotsOptions\": {\"type\": \"classy\"}}",
  "imageDataUrl": "data:image/png;base64,..."
}
```

**Response**:

```json
{
  "success": true,
  "id": "generated_id"
}
```

### `GET /api/qr/:id`

Retrieves saved QR code data by its unique ID.

**Response**:

```json
{
  "success": true,
  "data": {
    "_id": "id",
    "text": "Text for QR code",
    "options": {"dotsOptions": {"type": "classy"}},
    "imageDataUrl": "data:image/png;base64,...",
    "createdAt": "2025-05-21T12:34:56.789Z"
  }
}
```

## Notes

- **Security**: Keep your `.env` file secure and exclude it from version control (add it to `.gitignore`).
- **Frontend Integration**: This backend is designed to work with a frontend that generates QR code images using libraries like `qr-code-styling`.
- **Scalability**: Ensure your MongoDB instance is properly configured for production use.

## Troubleshooting

- **MongoDB Connection Issues**: Verify your `MONGO_URI` is correct and the MongoDB instance is accessible. Check network settings or MongoDB Atlas allowlist.
- **Port Conflicts**: If the default port (4000) is in use, update the `PORT` in your `.env` file.
- **Dependencies**: Run `npm install` again if you encounter module-related errors.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

MIT © [Your Name]