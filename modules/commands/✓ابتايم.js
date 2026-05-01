module.exports.run = async function ({ api, event, Threads, Users }) {
  const os = require("os");
  const moment = require("moment-timezone");

  // uptime
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  // time
  const time = moment.tz("Africa/Algiers").format("HH:mm:ss | YYYY-MM-DD");

  // counts
  let threadCount = 0;
  let userCount = 0;

  try {
    threadCount = (await Threads.getAll()).length;
    userCount = (await Users.getAll()).length;
  } catch (e) {
    console.log(e);
  }

  const message = `
ꜜ◆───────────────◆ꜜ
┇⇈وقتꜛ✦• 〘• ⏳•〙التشغيل •✦⇊┇

⏳ Runtime
• ${hours}h ${minutes}m ${seconds}s

👥 Groups
${threadCount} •

👤 Users
${userCount} •

🕒 Time
${time} •

ꜛ◆───────────────◆ꜛ
`;

  api.sendMessage(message, event.threadID, event.messageID);
};
