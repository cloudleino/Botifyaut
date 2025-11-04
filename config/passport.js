const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModels');

// Log to confirm .env variables are loading
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        // Role mapping by email
        const adminEmails = ['elijah71176@gmail.com'];
        const managerEmails = ['manager44@gmail.com'];
        const cookerEmails = ['sahabithun92@gmail.com'];
        const robotEmails = ['suhana.rms@gmail.com'];

        let role = 'user';
        if (adminEmails.includes(email)) role = 'admin';
        else if (managerEmails.includes(email)) role = 'manager';
        else if (cookerEmails.includes(email)) role = 'cooker';
        else if (robotEmails.includes(email)) role = 'robot';

        // --- Create new user if not found ---
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            fullname: profile.displayName,
            email,
            role,
          });
          console.log(`✅ New ${role} created: ${email}`);
        } else {
          // --- Update role automatically if changed ---
          if (user.role !== role) {
            user.role = role;
            await user.save();
            console.log(`🔁 Role updated for ${email} → ${role}`);
          } else {
            console.log(`🔑 Existing user logged in: ${email} (${role})`);
          }
        }

        return done(null, user);
      } catch (error) {
        console.error('❌ Google OAuth Error:', error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
