const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://172.17.0.1:27018/galleryapp';


// Connect to MongoDB

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`✅ MongoDB connected at ${MONGO_URI}`))
.catch(err => console.error("❌ MongoDB connection error:", err));

const User = require('./models/User');
const Image = require('./models/Image');
const Post = require('./models/Post');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static(path.join(__dirname, 'public/static')));

// File Upload Setup
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes

// Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Register
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    await User.create({ username, email, password });
    res.redirect('/login');
});

// Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        req.session.userId = user._id;
        req.session.user = { username: user.username, email: user.email };  // Save session user data
        res.redirect('/dashboard');
    } else {
        res.send('Invalid login');
    }
});

// Dashboard
app.get('/dashboard', async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Profile
app.get('/profile', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Change Password
app.get('/changepassword', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    res.sendFile(path.join(__dirname, 'public', 'changepassword.html'));
});
app.post('/changepassword', async (req, res) => {
    await User.findByIdAndUpdate(req.session.userId, { password: req.body.password });
    res.send('Password changed');
});

// Upload Image
app.get('/upload', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});
app.post('/upload', upload.single('image'), async (req, res) => {
    await Image.create({ userId: req.session.userId, filename: req.file.filename });
    res.redirect('/dashboard');
});

// Create Post
app.get('/post', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    res.sendFile(path.join(__dirname, 'public', 'post.html'));
});
app.post('/post', async (req, res) => {
    await Post.create({ userId: req.session.userId, content: req.body.content });
    res.redirect('/dashboard');
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// API: Dashboard Data
app.get('/api/dashboard', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const user = await User.findById(req.session.userId).select('username email');
        const images = await Image.find({ userId: req.session.userId }).select('filename');
        const posts = await Post.find({ userId: req.session.userId }).select('content');

        res.json({
            user: { username: user.username, email: user.email },
            images: images.map(img => ({ filename: img.filename })),
            posts: posts.map(post => ({ content: post.content }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

// API: Profile Data
app.get('/api/profile', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: "Not authenticated" });

    try {
        const user = await User.findById(req.session.userId).select('username email');
        res.json({ username: user.username, email: user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

// Start Server
app.listen(3000, () => console.log('Server running on 192.168.202.47:3000'));
