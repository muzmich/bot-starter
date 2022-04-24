import { Context } from 'telegraf';
import { MessageSubType } from 'telegraf/typings/telegram-types';
import { BotCommand } from '../globals/commands.types';

export enum BotEvent {
  MESSAGE = 'message',
  POLL = 'poll',
}

export enum BotCommandType {
  ON = 'on',
  COMMAND = 'command',
  ACTION = 'action',
}

export interface BotListener {
  type: BotCommandType;
  name: MessageSubType | BotCommand;
  description?: string;
  callback(ctx: Context): Promise<void | object>;
}
