interface Config {
  keywords: Array<string>;
  whitelist?: Array<string>;
  mention: string;
  type: "CONSOLE" | "NOTIFICATIONS" | "TELEGRAM";
  telegramConfig: {
    botKey: string;
    chatId: string;
  };
}

const Config: Config = require("../config.json");

export default Config;
