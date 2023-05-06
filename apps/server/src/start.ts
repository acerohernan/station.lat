import { LatinStationApp } from './app';

try {
  new LatinStationApp().start();
} catch (err) {
  console.error(err);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});
