import { Server } from './server';

export class LatinStationApp {
  server: Server;

  constructor() {
    const port = Number(process.env.PORT) ?? 3000;
    this.server = new Server(port);
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
