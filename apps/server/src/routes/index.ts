import { Router } from 'express';
import fs from 'fs';

export const registerRoutes = (router: Router) => {
  // Get all the files, filter the index file and delete the extension
  const routes = fs
    .readdirSync(__dirname)
    .filter((filename) => filename !== 'index.ts' && filename !== 'index.js')
    .map((filename) => filename.split('.')[0]);

  // Create the route
  routes.map((route) => registerRoute(route, router));
};

const registerRoute = (route: string, router: Router) => {
  const extension = process.env.NODE_ENV === 'production' ? 'js' : 'ts';
  const { register } = require(`./${route}.${extension}`);

  if (!register) return;

  register(router);
};
