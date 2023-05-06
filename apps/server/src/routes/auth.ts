import { Request, Response, Router } from 'express';
import passport from 'passport';

export const register = (router: Router) => {
  router.get('/auth/google/authorize', passport.authenticate('google'));

  router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      session: false,
    }),
    (req, res) => res.send(req.user)
  );
};
