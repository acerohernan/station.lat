import * as json from '@station.lat/config/src/tsconfig/server.json';
import { coreMessage } from '@station.lat/core';
import express from 'express';

const app = express();

app.listen(3000, () => {
  coreMessage({ message: 'Its working', quantity: 4 });

  console.log(`The app is running on port 3000`);
  console.log(json);
});
