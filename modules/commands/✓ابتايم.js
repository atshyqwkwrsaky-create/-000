module.exports.config = {
  name: "ابتيم",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Mustapha + تعديل",
  description: "عرض معلومات البوت",
  commandCategory: "النظام",
  usages: "ابتيم",
  cooldowns: 3
};

module.exports.run = async function ({ api, event }) {
  const moment = require("moment-timezone");

  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const groups = global.data?.threadInfo?.size || 0;
  const users = global.data?.users?.size || global.data?.allUserID?.length || 0;

  const now = moment.tz("Africa/Algiers");
  const timeStr = now.format("HH:mm:ss");
  const dateStr = now.format("YYYY-MM-DD");

  const message =
`ꜜ◆──────────────◆ꜜ
┇⇈وقتꜛ✦• 〘• ⏳•〙التشغيل •✦⇊┇


⏳ Runtime
• ${hours}h ${minutes}m ${seconds}s

👥 Groups
${groups} •

👤 Users
${users} •

🕒 Time
${timeStr} | ${dateStr} •

ꜛ◆──────────────◆ꜛ`;

  api.sendMessage(message, event.threadID, event.messageID);
};
