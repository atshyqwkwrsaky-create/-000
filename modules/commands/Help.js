module.exports.config = {
  name: "اوامر",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "حمودي سان 🇸🇩",
  description: "قائمة الأوامر كاملة مزخرفة",
  commandCategory: "النظام",
  usages: "[رقم الصفحة/اسم الأمر]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 60
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": "───═━━━━━\n⏤͟͟͞͞   𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽\n────────\n⑉ Name: %1\n⑉ Desc: %2\n⑉ Usage: %3\n⑉ Category: %4\n⑉ Wait: %5s\n⑉ Auth: %6\n────────\n.𝙲𝚁𝙴𝙳𝙸𝚃𝚂: %7",
    "user": "User",
    "adminGroup": "Group Admin",
    "adminBot": "Bot Admin"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "cmd" || body.indexOf("help") != 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  return api.sendMessage(
    getText("moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
      command.config.commandCategory,
      command.config.cooldowns,
      ((command.config.hasPermssion == 0) ? getText("user") :
        (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")),
      command.config.credits
    ),
    threadID,
    messageID
  );
};

module.exports.run = function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10; // عدد الأوامر في كل صفحة
    
    for (var [name] of (commands)) {
      arrayInfo.push(name);
    }
    arrayInfo.sort();

    const totalPages = Math.ceil(arrayInfo.length / numberOfOnePage);
    const startSlice = numberOfOnePage * page - numberOfOnePage;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

    let msg = "───═━━━━━\n";
    msg += "⏤͟͟͞͞   𝙲𝙼𝙳    𝙻𝙸𝚂𝚃\n";
    msg += "────────\n";

    for (let item of returnArray) {
      msg += `⑉ ${item}\n`;
    }

    msg += "────────\n";
    msg += `.𝙰𝙻𝙻 𝙲𝙼𝙳 : ${arrayInfo.length}\n`;
    msg += `.𝙿𝙰𝙶𝙴 ${page} 𝙾𝙵 ${totalPages}\n`;
    msg += "────────";

    return api.sendMessage(msg, threadID, async (error, info) => {
      if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      }
    }, messageID);
  }

  return api.sendMessage(
    getText("moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
      command.config.commandCategory,
      command.config.cooldowns,
      ((command.config.hasPermssion == 0) ? getText("user") :
        (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")),
      command.config.credits
    ),
    threadID,
    messageID
  );
};
