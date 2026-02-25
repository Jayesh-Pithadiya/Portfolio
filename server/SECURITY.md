# 🔐 Secure Authentication System

## Overview
Production-level secure authentication system with JWT, bcrypt, rate limiting, and IP restriction.

## 🛡️ Security Features

### 1. **JWT Authentication**
- Short token expiry (30 minutes default)
- Secure token verification on all admin routes
- Automatic token validation

### 2. **Password Security**
- Bcrypt hashing with 12 salt rounds
- No plain text passwords stored
- Secure password comparison

### 3. **Rate Limiting**
- Max 5 login attempts per 15 minutes
- Per-IP tracking
- Skips successful requests (only counts failures)

### 4. **IP Restriction**
- Whitelist specific IP addresses
- Optional (disabled in development)
- Easy to configure via environment variables

### 5. **Security Headers**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## 📁 Project Structure

```
server/
├── config/
│   └── config.js              # Environment configuration
├── middleware/
│   ├── auth.js                # JWT authentication
│   ├── ipRestriction.js       # IP whitelist
│   └── rateLimiter.js         # Rate limiting
├── routes/
│   ├── auth.js                # Login & verify routes
│   ├── admin.js               # Protected admin routes
│   └── public.js              # Public routes
├── utils/
│   └── generateHash.js        # Password hash generator
├── server.js                  # Main server file
├── .env                       # Environment variables
└── data.json                  # JSON data storage
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Generate Password Hash
```bash
npm run generate-hash yourpassword
```

Copy the generated hash to your `.env` file.

### 3. Configure Environment Variables

Edit `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Admin Credentials
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD_HASH=<paste_generated_hash_here>

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters_long
JWT_EXPIRY=30m

# IP Restriction (optional)
ALLOWED_IPS=192.168.1.100,203.0.113.45

# CORS
CLIENT_URL=http://localhost:5173
```

### 4. Start Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

## 🔑 API Endpoints

### Public Routes (No Auth Required)

#### Get Public Data
```http
GET /api/public/data
```

#### Submit Contact Form
```http
POST /api/public/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

### Authentication Routes

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "yourpassword"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "30m",
  "user": {
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

#### Verify Token
```http
POST /api/auth/verify
Authorization: Bearer <token>
```

### Protected Admin Routes (Requires JWT)

All admin routes require `Authorization: Bearer <token>` header.

#### Add Skill
```http
POST /api/admin/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "React",
  "level": 90,
  "category": "Frontend"
}
```

#### Delete Skill
```http
DELETE /api/admin/skills/:id
Authorization: Bearer <token>
```

#### Add Project
```http
POST /api/admin/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Project",
  "description": "Project description",
  "technologies": ["React", "Node.js"],
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/user/repo"
}
```

#### Delete Project
```http
DELETE /api/admin/projects/:id
Authorization: Bearer <token>
```

#### Update Contact Status
```http
PUT /api/admin/contacts/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "read"
}
```

#### Delete Contact
```http
DELETE /api/admin/contacts/:id
Authorization: Bearer <token>
```

## 🔒 Security Best Practices

### For Development
1. Use strong JWT_SECRET (minimum 32 characters)
2. Keep .env file secure (never commit to git)
3. Test rate limiting functionality
4. Monitor failed login attempts

### For Production
1. **Change all default values in .env**
2. Set `NODE_ENV=production`
3. Enable IP restriction with your server IP
4. Use HTTPS only
5. Set proper CORS origin (your domain)
6. Consider shorter JWT expiry (15m)
7. Enable additional security:
   - Helmet.js for enhanced headers
   - HTTPS redirect middleware
   - Database instead of JSON file
   - Logging service for security events

## 🧪 Testing

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"yourpassword"}'
```

### Test Protected Route
```bash
curl -X GET http://localhost:5000/api/admin/skills \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Test Rate Limiting
Try logging in with wrong password 6 times - should block after 5 attempts.

## 📝 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `ADMIN_EMAIL` | Admin login email | `admin@example.com` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of password | Generated via script |
| `JWT_SECRET` | Secret key for JWT | Min 32 characters |
| `JWT_EXPIRY` | Token expiration time | `30m`, `1h`, `2h` |
| `ALLOWED_IPS` | Comma-separated IPs | `192.168.1.1,10.0.0.1` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

## 🆘 Troubleshooting

### "Missing required environment variables"
- Check your `.env` file exists in server directory
- Ensure all required variables are set
- No spaces around `=` in .env file

### "Invalid credentials" on correct password
- Regenerate password hash: `npm run generate-hash yourpassword`
- Copy the new hash to `.env`
- Restart server

### "Too many login attempts"
- Wait 15 minutes
- Or restart server (clears rate limit in development)

### "Access denied from your IP"
- Remove IP from `ALLOWED_IPS` or leave it empty
- Set `NODE_ENV=development` to disable IP check

## 🔄 Migration from Old System

The new system maintains backward compatibility:
- `/api/login` → redirects to `/api/auth/login`
- `/api/data` → redirects to `/api/public/data`
- `/api/contact` → redirects to `/api/public/contact`

Old routes will work but use new routes for better organization.

## 📚 Additional Resources

- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [Express Rate Limit](https://github.com/express-rate-limit/express-rate-limit)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

## 📄 License

MIT License - Feel free to use in your projects!
