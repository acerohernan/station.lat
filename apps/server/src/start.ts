import { config } from 'dotenv';
import { LatinStationApp } from './app';

config();

try {
  new LatinStationApp().start();
} catch (err) {
  console.error(err);
  process.exit(1);
}
