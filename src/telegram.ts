import TelegramBot from "node-telegram-bot-api";
import config from "./Config";

export default class Telegram {
  bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(config.telegramConfig.botKey, { polling: true });
  }
  async sendMessage(message: string) {
    return await this.bot.sendMessage(config.telegramConfig.chatId, message, {
      parse_mode: "HTML",
    });
  }
}
