import { env } from './config/env';
import { Server } from './server';

export class LatinStationApp {
  server: Server;

  constructor() {
    this.server = new Server(env.PORT);
  }

  async start(): Promise<void> {
    // Initialize all the connections before to start the server

    return this.server.start();
  }

  async stop(): Promise<void> {
    // Close all the connections before to stop the server

    return this.server.close();
  }
}
