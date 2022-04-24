import { AppServices } from '../types/core/app.types';
import Bot from './bot';

export default class App {
  constructor(public services?: AppServices[]) { }

  static startCore() {

  }

  private static startPostHandlers(): void {
    Bot.getInstance().applyListeners();
    process.on('unhandledRejection', (reason) => Bot.handleError(new Error((reason as Error)!.message)));
  }

  public start(): void {
    App.startCore();
    this.startServices();

    App.startPostHandlers();
  }

  private startServices(): void {
    this.services?.forEach((service) => {
      service.getInstance();
    });
  }
}
