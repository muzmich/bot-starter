import App from './core/app';
import { ExampleService } from './services/example.service';

const app = new App([
  ExampleService
]);

app.start();
