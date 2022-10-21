import {
  create,
  Whatsapp,
  Message,
  HostDevice,
  PartialMessage,
  Chat,
  SocketState,
} from "venom-bot";
import Telegram from "./telegram";
import notifier from "node-notifier";
//import chalk from "chalk";

import config from "./Config";

const { keywords, telegramConfig, mentions } = config;
type BotType = "CONSOLE" | "TELEGRAM" | "NOTIFICATIONS";

let telegram = new Telegram();

class MyWhatsapp {
  client: Whatsapp;
  deviceInfo: HostDevice;
  botType: BotType;
  groups: Chat[];
  mutedGroups: Chat[];

  constructor(type: BotType) {
    this.botType = type;
  }

  init = async () => {
    this.client = await create("personal");
    console.clear();
    this.deviceInfo = await this.client.getHostDevice();
    console.log(`Logged in to Whatsapp as ${this.deviceInfo.pushname}.`)
      //chalk` {green {underline ${`Logged in to Whatsapp as ${this.deviceInfo.pushname}.`}}}`
    // );

    this.client.onStateChange((state) => {
      console.log(state);
      const conflicts = [
        SocketState.CONFLICT,
        SocketState.UNPAIRED,
        SocketState.UNLAUNCHED,
      ];
      if (conflicts.includes(state)) {
        this.client.useHere();
      }
    });

    console.log("Loading Groups...");
    this.groups = await this.client.getChatGroupNewMsg();
    console.log(`List of Muted Groups.`);
    this.mutedGroups = this.groups
      .filter((v) => v.muteExpiration != 0)
      .map(this.handleGroups);
    console.log("Loading Unread messages...");
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

      await this.markMutedGroupsSeen(message);

      if (message.body && this.addressedToMe(message)) {
        this.queueMessage(message, time, name);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  private async markMutedGroupsSeen(message: Message) {
    if (
      config.autoReadMuteGroups &&
      message.chat.isGroup &&
      message.chat.muteExpiration
    ) {
      await this.client.sendSeen(message.chatId);
    }
  }
  private handleGroups(chat: Chat) {
    console.log(
      chat.name,
      new Date(chat.muteExpiration * 1000).toLocaleString()
    );
    return chat;
  }

  private queueMessage(message: Message, time: string, name: string) {
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

  private async notifyTelegram(groupName: string, name: string, text: string) {
    const outMessage: string = `<b>${groupName}</b>: <i>${name}</i>\n${text}`;
    await telegram.sendMessage(outMessage);
    console.log("Telegram message sent.");
  }

  private notifyNative(groupName: string, name: string, text: string) {
    return notifier.notify({
      title: `${name}: ${groupName}`,
      message: text,
      sound: true,
      appID: "Whatsapp Mentions",
    });
  }

  private addressedToMe(message: Message) {
    return (
      (mentions.some((mention) => message.mentionedJidList.includes(mention)) &&
        message.isGroupMsg) ||
      keywords.some((pat: string) => message.body.toLowerCase().includes(pat))
    );
  }

  private log(time: string, groupName: string, name: string, text: string) {
    console.log(`${time}} - ${name} @ ${groupName}}\n${text}`
    );
  }

  private defineText(message: Message) {
    if (message.isMedia) return `Received ${message.mimetype} file.`;
    return message.body ? message.body : "Empty message.";
  }
}

export default MyWhatsapp;
