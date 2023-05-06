import { PassportStatic } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from './env';

export const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        scope: ['profile'],
        callbackURL: `${env.APP_URL}/auth/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, profile._json);
      }
    )
  );
};
