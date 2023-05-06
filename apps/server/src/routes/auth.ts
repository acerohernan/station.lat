import { Request, Response, Router } from 'express';

export const register = (router: Router) => {
  router.get('/auth/google', (req: Request, res: Response) => res.status(200).send('OK MESSSAGE'));
};
