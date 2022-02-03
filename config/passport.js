const passport = require('passport');
// const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY || 'verystringsecretpassword'
};

passport.use(
    new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await User.findOne({ where: { id: payload.id }});
            if (!user) {
                return done(null, false);
            }
        done(null, user)
        } catch (err) {
            done(err, false)
        }
    })
);

// passport.use(new GoogleStrategy({
//     clientID:     GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://yourdomain:3000/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));