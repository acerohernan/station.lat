import http from 'http';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { registerRoutes } from './routes';
import { configurePassport } from './config/passport';
import passport from 'passport';

export class Server {
  httpServer?: http.Server;
  express: express.Express;
  port: number;

  constructor(port: number) {
    this.port = port;
    this.express = express();

    // Express utilities
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));

    // Security headers
    this.express.use(helmet());

    this.express.use(
      cors({
        origin: '*',
      })
    );

    // Passport confi
    configurePassport(passport);

    this.express.use(cookieParser());

    // Router
    const router = express.Router();
    registerRoutes(router);
    this.express.use(router);
  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`The server is running in ${this.express.get('env')} mode and in http://localhost:${this.port}`);

        resolve();
      });
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((err) => {
          if (err) reject(err);

          resolve();
        });
      }

      resolve();
    });
  }
}
