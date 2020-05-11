process.env.NTBA_FIX_319 = "1";
import MyWhatsapp from "./my-whatsapp";
import Config from "./Config";
const main = new MyWhatsapp(Config.type); // CHANGE TO CONSOLE IF YOU DON"T WANT TO BE NOTIFIED ON TELEGRAM.

(async () => {
  try {
    process.on("beforeExit", async () => await main.end());
    await main.init();
  } catch (e) {
    console.log("Master Error", e);
  }
})();
