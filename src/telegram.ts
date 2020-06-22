import TelegramBot from "node-telegram-bot-api";
import Config from "./Config";

export default class Telegram {
  bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(Config.telegramConfig.botKey, { polling: true });
  }
  async sendMessage(message: string) {
    return await this.bot.sendMessage(Config.telegramConfig.chatId, message, {
      parse_mode: "HTML",
    });
  }
}
