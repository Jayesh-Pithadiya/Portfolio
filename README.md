# 🚀 Jayesh Pithadiya - Portfolio Website

A modern, responsive, and production-ready portfolio website built with React and Node.js.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### Frontend
- ⚡ **React 19** with Vite for blazing-fast development
- 🎨 **Modern UI/UX** with smooth animations
- 📱 **Fully Responsive** - Mobile, Tablet, Desktop optimized
- 🚀 **Performance Optimized** with lazy loading
- ♿ **Accessible** with proper ARIA labels
- 🎯 **SEO Optimized** with meta tags and structured data

### Backend
- 🔒 **Secure** with proper security headers
- 🛡️ **CORS Protection** configured
- 📝 **JSON File Storage** (no database required)
- ⚡ **Fast API** with Express.js
- 🔄 **Graceful Shutdown** handling
- 📊 **Health Check** endpoint

### SEO & Performance
- ✅ Complete meta tags (Open Graph, Twitter Cards)
- ✅ Sitemap.xml and robots.txt
- ✅ Structured data (JSON-LD)
- ✅ Optimized images and assets
- ✅ Lazy loading components
- ✅ Intersection Observer for animations

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Vite
- CSS3 with modern features
- Font Awesome icons

### Backend
- Node.js
- Express.js
- ES Modules
- File-based storage (JSON)

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   Create `.env` file in server directory:
   ```env
   PORT=5000
   NODE_ENV=development
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-password
   CLIENT_URL=http://localhost:5173
   ```

## 🚀 Running Locally

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend** (in new terminal)
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:5173/login/private

## 📁 Project Structure

```
portfolio/
├── client/                 # React frontend
│   ├── public/
│   │   ├── assets/        # Images and static files
│   │   ├── robots.txt     # SEO robots file
│   │   ├── sitemap.xml    # SEO sitemap
│   │   └── _redirects     # Netlify redirects
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template with SEO
│   ├── vercel.json        # Vercel configuration
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   ├── data.json         # Data storage
│   ├── .env              # Environment variables
│   └── package.json
├── DEPLOYMENT.md         # Deployment guide
└── README.md
```

## 🔌 API Endpoints

### Public Endpoints
- `GET /` - Server status
- `GET /health` - Health check
- `GET /api/data` - Get all portfolio data
- `POST /api/contact` - Submit contact form

### Admin Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/skills` - Add skill
- `DELETE /api/skills/:id` - Delete skill
- `POST /api/projects` - Add project
- `DELETE /api/projects/:id` - Delete project
- `PUT /api/contacts/:id/status` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact

## 🎨 Customization

### Update Personal Information

1. **Profile Image**: Replace `/public/assets/profile.jpeg`
2. **Meta Tags**: Update in `/client/index.html`
3. **Content**: Modify components in `/client/src/components/`
4. **Colors**: Update CSS variables in `/client/src/index.css`

### Color Scheme
```css
:root {
  --bg-color: #0a0b10;
  --primary-color: #00d2ff;
  --secondary-color: #9d50bb;
}
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

#### Frontend (Vercel)
```bash
cd client
npm run build
vercel --prod
```

#### Backend (Railway)
```bash
cd server
# Push to GitHub and connect to Railway
```

## 📊 Performance

- ⚡ Lighthouse Score: 95+
- 🎯 First Contentful Paint: < 1.5s
- 📱 Mobile Optimized
- ♿ Accessibility Score: 100

## 🔒 Security Features

- CORS protection
- Security headers (XSS, Clickjacking protection)
- Input validation
- Rate limiting ready
- Environment variable protection

## 🐛 Troubleshooting

### Common Issues

**CORS Error:**
- Check CLIENT_URL in backend .env
- Verify CORS configuration in server.js

**API Not Responding:**
- Ensure backend server is running
- Check port 5000 is not in use
- Verify environment variables

**Build Errors:**
- Clear node_modules and reinstall
- Check Node.js version (v18+)
- Run `npm run lint:fix`

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Jayesh Pithadiya**
- Email: jayeshpithadiya385@gmail.com
- LinkedIn: [linkedin.com/in/jayesh-pithadiya](https://linkedin.com/in/jayesh-pithadiya)
- GitHub: [@jayeshpithadiya](https://github.com/jayeshpithadiya)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!

## 📞 Support

For support, email jayeshpithadiya385@gmail.com or create an issue in the repository.

---

Made with ❤️ by Jayesh Pithadiya
