const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const port = process.env.PORT || 3000;

// Environment and configuration
require('dotenv').config();
const ACCESS_CODE = process.env.ACCESS_CODE || 'change-this-access-code-immediately';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.scryptSync(ACCESS_CODE, 'salt', 32);
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB file size limit
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Security middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rate limiting to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/login', limiter);

// Encryption/decryption functions
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  try {
    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    return null;
  }
}

// Authentication middleware
function authenticate(req, res, next) {
  const token = req.cookies.auth_token;
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const decrypted = decrypt(token);
    if (!decrypted) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    const data = JSON.parse(decrypted);
    
    // Check if the token is expired
    if (data.expires < Date.now()) {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

// Configure multer for file storage with encryption
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Generate unique encrypted filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const encryptedFilename = crypto.createHash('sha256')
      .update(uniqueSuffix + file.originalname)
      .digest('hex') + ext;
    
    // Store original filename mapping for retrieval
    const metadataPath = path.join(UPLOAD_DIR, `${encryptedFilename}.meta`);
    fs.writeFileSync(metadataPath, JSON.stringify({
      originalName: file.originalname,
      uploadedBy: req.user.id,
      uploadedAt: new Date().toISOString()
    }));
    
    cb(null, encryptedFilename);
  }
});

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE }
});

// Middleware for request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - ${req.ip}`);
  next();
});

// Login page
app.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Secure CDN Login</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 500px; margin: 100px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
          h1 { color: #333; }
          input { width: 100%; padding: 10px; margin: 10px 0; box-sizing: border-box; }
          button { background: #4CAF50; color: white; padding: 10px; border: none; cursor: pointer; width: 100%; }
        </style>
      </head>
      <body>
        <h1>Secure CDN Login</h1>
        <form action="/login" method="post">
          <input type="password" name="accessCode" placeholder="Enter access code" required>
          <button type="submit">Login</button>
        </form>
      </body>
    </html>
  `);
});

// Login endpoint
app.post('/login', (req, res) => {
  const { accessCode } = req.body;
  
  if (accessCode !== ACCESS_CODE) {
    return res.status(401).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Login Failed</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 500px; margin: 100px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            h1 { color: #f44336; }
            a { color: #4CAF50; text-decoration: none; }
          </style>
        </head>
        <body>
          <h1>Invalid access code</h1>
          <p>Please <a href="/login">try again</a></p>
        </body>
      </html>
    `);
  }
  
  // Create a session token
  const userId = crypto.randomBytes(8).toString('hex');
  const sessionData = {
    id: userId,
    expires: Date.now() + SESSION_DURATION
  };
  
  // Encrypt the session data
  const token = encrypt(JSON.stringify(sessionData));
  
  // Set the cookie
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_DURATION
  });
  
  // Redirect to dashboard
  res.redirect('/dashboard');
});

// Dashboard
app.get('/dashboard', authenticate, (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading files directory');
    }
    
    // Filter out .meta files
    files = files.filter(file => !file.endsWith('.meta'));
    
    const fileListHtml = files.map(filename => {
      try {
        const metadataPath = path.join(UPLOAD_DIR, `${filename}.meta`);
        let originalName = filename;
        
        if (fs.existsSync(metadataPath)) {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
          originalName = metadata.originalName;
        }
        
        const stats = fs.statSync(path.join(UPLOAD_DIR, filename));
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        return `
          <tr>
            <td>${originalName}</td>
            <td>${fileSizeInMB} MB</td>
            <td>${new Date(stats.mtime).toLocaleString()}</td>
            <td>
              <a href="/files/${filename}" target="_blank">View</a>
              <a href="/download/${filename}">Download</a>
              <button onclick="deleteFile('${filename}')">Delete</button>
            </td>
          </tr>
        `;
      } catch (err) {
        return '';
      }
    }).join('');
    
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Secure CDN Dashboard</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 900px; margin: 50px auto; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            button, .button { background: #4CAF50; color: white; padding: 5px 10px; border: none; cursor: pointer; text-decoration: none; display: inline-block; margin-right: 5px; }
            .delete { background: #f44336; }
            .logout { background: #f44336; float: right; }
            .upload-form { margin: 20px 0; padding: 15px; background: #f2f2f2; border-radius: 5px; }
            input[type=file] { margin: 10px 0; }
          </style>
          <script>
            function deleteFile(filename) {
              if (confirm('Are you sure you want to delete this file?')) {
                fetch('/files/' + filename, { method: 'DELETE' })
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      alert('File deleted successfully');
                      window.location.reload();
                    } else {
                      alert('Error: ' + data.error);
                    }
                  })
                  .catch(err => alert('Error: ' + err));
              }
            }
          </script>
        </head>
        <body>
          <h1>Secure CDN Dashboard</h1>
          <a href="/logout" class="button logout">Logout</a>
          
          <div class="upload-form">
            <h2>Upload New File</h2>
            <form action="/upload" method="post" enctype="multipart/form-data">
              <input type="file" name="file" required>
              <button type="submit">Upload</button>
            </form>
          </div>
          
          <h2>Your Files</h2>
          <table>
            <thead>
              <tr>
                <th>Filename</th>
                <th>Size</th>
                <th>Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${fileListHtml}
            </tbody>
          </table>
        </body>
      </html>
    `);
  });
});

// Logout endpoint
app.get('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.redirect('/login');
});

// Serve static files with authentication and caching headers
app.get('/files/:filename', authenticate, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(UPLOAD_DIR, filename);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Get metadata if available
    const metadataPath = path.join(UPLOAD_DIR, `${filename}.meta`);
    let originalName = filename;
    
    if (fs.existsSync(metadataPath)) {
      try {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        originalName = metadata.originalName;
      } catch (err) {
        console.error('Error reading metadata:', err);
      }
    }
    
    // Set headers
    res.setHeader('Cache-Control', 'max-age=86400'); // Cache for 1 day
    
    // Set content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (ext === '.png') {
      res.setHeader('Content-Type', 'image/png');
    } else if (ext === '.gif') {
      res.setHeader('Content-Type', 'image/gif');
    } else if (ext === '.pdf') {
      res.setHeader('Content-Type', 'application/pdf');
    } else if (ext === '.js') {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (ext === '.css') {
      res.setHeader('Content-Type', 'text/css');
    }
    
    // Stream the file
    fs.createReadStream(filePath).pipe(res);
  });
});

// Download endpoint with proper filename
app.get('/download/:filename', authenticate, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(UPLOAD_DIR, filename);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Get metadata if available for original filename
    const metadataPath = path.join(UPLOAD_DIR, `${filename}.meta`);
    let originalName = filename;
    
    if (fs.existsSync(metadataPath)) {
      try {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        originalName = metadata.originalName;
      } catch (err) {
        console.error('Error reading metadata:', err);
      }
    }
    
    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
    
    // Stream the file
    fs.createReadStream(filePath).pipe(res);
  });
});

// Upload endpoint
app.post('/upload', authenticate, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  
  res.redirect('/dashboard');
});

// Delete file endpoint
app.delete('/files/:filename', authenticate, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(UPLOAD_DIR, filename);
  const metadataPath = path.join(UPLOAD_DIR, `${filename}.meta`);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete file' });
      }
      
      // Also delete metadata file if it exists
      if (fs.existsSync(metadataPath)) {
        fs.unlinkSync(metadataPath);
      }
      
      res.json({ success: true, message: 'File deleted successfully' });
    });
  });
});

// Root redirect to login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// API routes protected by authentication
app.get('/api/files', authenticate, (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to list files' });
    }
    
    // Filter out metadata files
    files = files.filter(file => !file.endsWith('.meta'));
    
    const fileList = files.map(filename => {
      try {
        const filePath = path.join(UPLOAD_DIR, filename);
        const stats = fs.statSync(filePath);
        
        // Get original filename from metadata
        let originalName = filename;
        const metadataPath = path.join(UPLOAD_DIR, `${filename}.meta`);
        if (fs.existsSync(metadataPath)) {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
          originalName = metadata.originalName;
        }
        
        return {
          id: filename,
          filename: originalName,
          size: stats.size,
          uploaded: stats.birthtime,
          modified: stats.mtime,
          url: `/files/${filename}`,
          downloadUrl: `/download/${filename}`
        };
      } catch (err) {
        return null;
      }
    }).filter(Boolean);
    
    res.json(fileList);
  });
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
      });
    }
    return res.status(400).json({ error: err.message });
  }
  
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Secure CDN server running at http://localhost:${port}`);
  console.log(`Upload directory: ${UPLOAD_DIR}`);
  console.log('IMPORTANT: Use environment variables to set ACCESS_CODE and ENCRYPTION_KEY in production');
});