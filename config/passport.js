const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_CALLBACK_URL) {
  passport.use(new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
<<<<<<< Updated upstream
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        // Role mapping by email
        const adminEmails = ['elijah71176@gmail.com'];
        const managerEmails = ['manager44@gmail.com'];
        const cookerEmails = ['mayor4ben@gmail.com'];
        const robotEmails = ['tony66@gmail.com'];

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
=======
      // TODO: hitta/skapa user
      return done(null, { googleId: profile.id, email: profile.emails?.[0]?.value });
>>>>>>> Stashed changes
    }
  ));
} else {
  console.warn('⚠️ Skipping Google OAuth: missing env vars');
}

module.exports = passport;
