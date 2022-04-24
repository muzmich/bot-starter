import { Telegraf } from 'telegraf';
import { Context } from 'telegraf/typings/context';
import { Update } from 'telegraf/typings/core/types/typegram';
import { MessageSubType } from 'telegraf/typings/telegram-types';
import { BotListener, BotEvent } from '../types/core/bot.types';

export default class Bot {
  private static instance: Bot;

  public app!: Telegraf;

  private listeners: Array<BotListener> = [];

  private constructor() {
    this.initMain();
    this.initHandlers();
    this.startPooling();
  }

  public static getInstance(): Bot {
    if (!Bot.instance) {
      Bot.instance = new Bot();
    }

    return Bot.instance;
  }

  public static handleError(err: unknown): void {
    console.error(err);
  }

  public static logger(ctx: Context<Update>, next: Function, commandName?: string): void {
    if (!ctx.chat) {
      return;
    }

    const { chat } = ctx;

    if (ctx.message && 'text' in ctx.message) {
      console.log(`[${chat.id}], User @${ctx.message?.from.username} send: ${ctx.message?.text}`);
    }

    next!();
  }

  public addListeners(list: Array<BotListener>): void {
    this.listeners = [...this.listeners, ...list];
  }

  public applyListeners(): void {
    this.listeners.forEach((listener) => {
      this.app[listener.type](
        listener.name as MessageSubType,
        (ctx: Context, next: Function) => Bot.logger(ctx, next, listener.name),
        listener.callback,
      );
    });
  }

  private initMain(): void {
    this.app = new Telegraf(process.env.BOT_TOKEN as string);
  }

  private async startPooling(): Promise<void> {
    await this.app.launch();
    console.log('Bot is up');
  }

  private initHandlers(): void {
    this.app.catch(Bot.handleError);
  }
}
