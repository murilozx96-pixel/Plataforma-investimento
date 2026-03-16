const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fetch = require('node-fetch'); // For fetching stock data

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(session({ secret: 'YOUR_SESSION_SECRET', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate will need to be implemented to save users to your DB
      return done(null, profile);
  }
));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/dashboard');
    }
);

app.get('/dashboard', (req, res) => {
    // Display user portfolio and real-time stock data
    res.json({ message: "Welcome to your dashboard!" });
});

app.get('/stock/:symbol', async (req, res) => {
    const stockSymbol = req.params.symbol;
    const response = await fetch(`https://api.example.com/stock/${stockSymbol}`);
    const data = await response.json();
    res.json(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
