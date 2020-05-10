import { create, Whatsapp, Message, HostDevice } from "sulla";
import Telegram from "./telegram";
import notifier from "node-notifier";
import chalk from "chalk";

import Config from "./Config";

const { keywords, telegramConfig, mention } = Config;
type BotType = "CONSOLE" | "TELEGRAM" | "NOTIFICATIONS";

let telegram = new Telegram();

class MyWhatsapp {
  client: Whatsapp;
  deviceInfo: HostDevice;
  botType: BotType;

  constructor(type: BotType) {
    this.botType = type;
  }

  init = async () => {
    this.client = await create("personal");
    console.clear();
    this.deviceInfo = await this.client.getHostDevice();
    console.log(
      chalk` {green {underline ${`Logged in to Whatsapp as ${this.deviceInfo.pushname}.`}}}`
    );
    console.log(chalk`{grey Listening to Keywords - ${keywords.join(", ")}"}`);
    //console.log(JSON.stringify(this.deviceInfo, null, 2));
    this.client.onMessage(this.handleMessage);
  };

  end = async () => {
    await this.client.close();
    console.log("Killed bot in background.");
  };

  handleMessage = async (message: Message) => {
    try {
      const name = message.sender.formattedName;
      //console.log("Got new Message");
      let time: string = new Date(
        message.timestamp * 1000
      ).toLocaleTimeString();
      if (this.addressedToMe(message)) {
        const groupName = message.chat.name || message.sender.shortName;
        const text = this.defineText(message);
        switch (this.botType) {
          case "CONSOLE":
            this.log(time, groupName, name, text);
            break;
          case "NOTIFICATIONS":
            //console.log("Notification section");
            this.notifyNative(groupName, name, text);
            break;
          case "TELEGRAM":
            this.notifyTelegram(groupName, name, text);
            break;
          default:
            console.warn(`Method ${this.botType} not found.`);
        }
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  private async notifyTelegram(groupName: string, name: string, text: string) {
    const outMessage: string = `<b>${groupName}</b>: <i>${name}</i>\n${text}`;
    await telegram.sendMessage(outMessage);
    console.log("Telegram message sent.");
  }

  private notifyNative(groupName: string, name: string, text: string) {
    notifier.notify({
      title: `${groupName}: ${name}`,
      message: text,
      sound: true,
      appID: "Whatsapp Mention",
    });
  }

  private addressedToMe(message: Message) {
    return (
      (message.mentionedJidList.includes(mention) && message.isGroupMsg) ||
      keywords.some((pat: string) => message.body.toLowerCase().includes(pat))
    );
  }

  private log(time: string, groupName: string, name: string, text: string) {
    console.log(
      chalk`{cyanBright ${time}} - {cyanBright ${name} @ ${groupName}}\n{greenBright ${text}}`
    );
  }

  private defineText(message: Message) {
    if (message.isMedia) return `Received ${message.mimetype} file.`;
    return message.body;
  }
}

export default MyWhatsapp;
