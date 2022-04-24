import App from './core/app';
import { ServiceExample } from './services/serviceExample.service';

const app = new App([
  ServiceExample
]);

app.start();
