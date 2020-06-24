interface Config {
  keywords: Array<string>;
  whitelist?: Array<string>;
  mentions: string[];
  autoReadMuteGroups: boolean;
  type: "CONSOLE" | "NOTIFICATIONS" | "TELEGRAM";
  telegramConfig: {
    botKey: string;
    chatId: string;
  };
}
const createConfig = (): Config =>  {
  try {
    return require("../config.json");
  } catch(e) {
    console.log("Config.json not found. Please create from Readme.")
  }
}
const config = createConfig();

export default config;
