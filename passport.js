const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const jwt = require("jsonwebtoken");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google Client Secret
  callbackURL: "http://localhost:3001/auth/google/callback", // Callback URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    const picture = profile.photos ? profile.photos[0].value : ''; // Get profile picture

    if (!user) {
      user = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        picture: picture,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return done(null, { user, token });
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
