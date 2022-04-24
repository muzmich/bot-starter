import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { BotCommandType, BotListener } from '../types/core/bot.types';
import { ExampleCommand } from '../types/globals/commands.types';
import BaseService from './base.service';

export class ServiceExample extends BaseService {
  private static instance: ServiceExample;

  public static getInstance(): ServiceExample {
    if (!ServiceExample.instance) {
      ServiceExample.instance = new ServiceExample();
    }

    return ServiceExample.instance;
  }

  private async onStart(ctx: Context<Update>): Promise<void | object> {
    await ctx.reply('Bot started');
  }

  private async onCommand(ctx: Context<Update>): Promise<void | object> {
    await ctx.reply('command received');
  }

  private async onMessage(ctx: Context<Update>): Promise<void | object> {
    await ctx.reply('message received');
  }

  protected initListeners(): BotListener[] {
    this.bot.app.start((ctx: Context) => this.onStart(ctx));

    return [
      {
        type: BotCommandType.COMMAND,
        name: ExampleCommand.test,
        callback: (ctx) => this.onCommand(ctx)
      },
      {
        type: BotCommandType.ON,
        name: 'text',
        callback: (ctx) => this.onMessage(ctx)
      },
    ]
  }

}
