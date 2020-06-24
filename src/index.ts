process.env.NTBA_FIX_319 = "1";
import MyWhatsapp from "./my-whatsapp";
import config from "./Config";
import readline from "readline";
const main = new MyWhatsapp(config.type); // CHANGE TO CONSOLE IF YOU DON"T WANT TO BE NOTIFIED ON TELEGRAM.

(async () => {
  try {
    process.on("SIGINT", (t) => {
      console.log(t);
    });

    if (process.platform === "win32") {
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.on("SIGINT", function () {
        process.emit("disconnect");
      });
    }

    process.on("disconnect", async function () {
      //graceful shutdown
      await main.end();
      process.exit();
    });

    await main.init();
  } catch (e) {
    console.log("Master Error", e);
  }
})();
