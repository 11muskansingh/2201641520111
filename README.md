# URL Shortener

A full-stack URL shortening service with analytics, built with Node.js, Express, React, and TypeScript. Features custom shortcodes, URL expiration, click tracking, and comprehensive logging.

## 🏗️ Architecture

This project consists of three main components:

- **Backend**: Node.js/Express API server with MongoDB integration
- **Frontend**: React application with Material-UI components
- **Logging_Middleware**: Reusable TypeScript logging middleware

## ✨ Features

- 🔗 **URL Shortening**: Convert long URLs to short, manageable links
- 🎯 **Custom Shortcodes**: Create custom short URLs (optional)
- ⏰ **URL Expiration**: Set custom expiration times (default: 30 minutes)
- 📊 **Analytics**: Track clicks, referrers, and access patterns
- 🔍 **URL Validation**: Built-in URL format validation
- 📝 **Comprehensive Logging**: Custom logging middleware for API lifecycle events
- 🎨 **Modern UI**: Clean, responsive interface built with Material-UI
- 🔒 **CORS Support**: Configured for cross-origin requests

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for production data persistence)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Url_Shortner
   ```

2. **Install dependencies for all components**

   **Backend:**
   ```bash
   cd Backend
   npm install
   ```

   **Frontend:**
   ```bash
   cd ../Frontend
   npm install
   ```

   **Logging Middleware:**
   ```bash
   cd ../Logging_Middleware
   npm install
   npm run build
   ```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server:**
   ```bash
   cd Backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend:**
   ```bash
   cd Frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

### Production Mode

1. **Build the Frontend:**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Start the Backend:**
   ```bash
   cd Backend
   npm start
   ```

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### Create Short URL
```http
POST /shorturls
```

**Request Body:**
```json
{
  "url": "https://example.com/very/long/url",
  "validity": 30,
  "shortcode": "custom-code"
}
```

**Parameters:**
- `url` (required): The original URL to shorten
- `validity` (optional): Expiration time in minutes (default: 30)
- `shortcode` (optional): Custom shortcode (auto-generated if not provided)

**Response:**
```json
{
  "shortLink": "http://localhost:5000/abc123",
  "expiry": "2024-01-01T12:30:00.000Z"
}
```

#### Get URL Statistics
```http
GET /shorturls/:shortcode
```

**Response:**
```json
{
  "originalUrl": "https://example.com/very/long/url",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "expiry": "2024-01-01T12:30:00.000Z",
  "totalClicks": 42,
  "clickData": [
    {
      "timestamp": "2024-01-01T12:15:00.000Z",
      "referrer": "https://google.com",
      "location": "192.168.1.1"
    }
  ]
}
```

#### Redirect to Original URL
```http
GET /shorturls/redirect/:shortcode
```

Redirects to the original URL and records click analytics.

## 🗂️ Project Structure

```
Url_Shortner/
├── Backend/
│   ├── src/
│   │   ├── index.js              # Main server file
│   │   └── routes/
│   │       └── url.routes.js     # URL shortening routes
│   ├── package.json
│   └── .env                      # Environment variables
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js         # Navigation component
│   │   ├── pages/
│   │   │   ├── URLShortener.js   # Main shortening page
│   │   │   └── URLStatistics.js  # Statistics page
│   │   ├── App.js                # Main React app
│   │   └── index.js              # React entry point
│   ├── package.json
│   └── public/
├── Logging_Middleware/
│   ├── src/
│   │   └── index.ts              # Logging middleware implementation
│   ├── dist/                     # Compiled JavaScript
│   ├── examples/
│   │   └── test.ts               # Usage examples
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: Database (via Mongoose)
- **shortid**: Shortcode generation
- **valid-url**: URL validation
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **Material-UI**: Component library
- **Axios**: HTTP client
- **React Router**: Client-side routing

### Logging Middleware
- **TypeScript**: Type-safe JavaScript
- **Axios**: HTTP requests for logging
- **Custom validation**: Input sanitization

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the Backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/url-shortener

# Logging Configuration
LOG_LEVEL=info
LOG_SERVICE=url-shortener-backend
```

### CORS Configuration

The backend is configured to accept requests from `http://localhost:3000` (frontend). Update the CORS settings in `Backend/src/index.js` for production deployment.

## 📊 Usage Examples

### Basic URL Shortening
```javascript
// POST /shorturls
{
  "url": "https://www.example.com/some/very/long/path"
}
```

### Custom Shortcode
```javascript
// POST /shorturls
{
  "url": "https://github.com/user/repo",
  "shortcode": "my-repo"
}
```

### Custom Expiration
```javascript
// POST /shorturls
{
  "url": "https://temporary-link.com",
  "validity": 60  // 1 hour
}
```

## 🧪 Testing

### Backend Tests
```bash
cd Backend
npm test
```

### Frontend Tests
```bash
cd Frontend
npm test
```

### Logging Middleware Tests
```bash
cd Logging_Middleware
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB database
2. Configure environment variables
3. Build and deploy to your preferred hosting service (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the production bundle:
   ```bash
   cd Frontend
   npm run build
   ```
2. Deploy the `build` folder to a static hosting service (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


