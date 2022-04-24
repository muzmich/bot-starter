import Bot from '../core/bot';
import { BotListener } from '../types/core/bot.types';


export default abstract class BaseService {
  protected readonly bot: Bot;

  protected constructor() {
    this.bot = Bot.getInstance();
    this.initProps();
    this.applyListeners(this.initListeners());
  }

  protected initProps(): void {

  }

  protected applyListeners(commands: BotListener[]): void {
    this.bot.addListeners(commands);
  }

  protected abstract initListeners(): BotListener[];
}
