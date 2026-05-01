module.exports.config = {
  name: "المطور",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "كولو",
  description: "عرض معلومات المطور بشكل احترافي",
  commandCategory: "النظام",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  try {
    // المقدمة (ستايل دورا)الرسال النهائية (ستايل احترافي)
    const infoMessage = 
`═══════════════════
👑  𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥  👑
═══════════════════

▣ 🧞‍♂️ 𝗔𝗯𝗼𝘂𝘁 𝗗𝗲𝘃
━━━━━━━━━━━━━━━━━━━
✦ الاسم ᏝᎬᏉᎨ ᎯᏨᏦᎬᏒᎷᎯᏁ: 🫴
✦ اللقب : ليفو
✦ الدور : Developer / System Controller

▣ 🤖 𝗕𝗼𝘁 𝗜𝗻𝗳𝗼
━━━━━━━━━━━━━━━━━━━
✦ اسم البوت : حمــودي
✦ النوع : Fun / System Bot 🎭
━━━━━━━━━━━━━━━━━━━

✦ ⟬ حكمة المطور ⟭
"وَلِأَنِّـي أَثِـقُ بِــنَـفْـسِي لَا أُبَــالِي بِـكُلِّ مَـا يـقَالُ عَــنِّي؛ فَـوَاثِـقَ الــخُـطَى يًـمْـشِي مَــلِـكَآً"🖤🖤👑

"𝔅𝔢𝔠𝔞𝔲𝔰𝔢 ℑ 𝔱𝔯𝔲𝔰𝔱 𝔪𝔶𝔰𝔢𝔩𝔣, ℑ 𝔡𝔬𝔫'𝔱 𝔠𝔞𝔯𝔢 𝔞𝔟𝔬𝔲𝔱 𝔴𝔥𝔞𝔱 𝔦𝔰 𝔰𝔞𝔦𝔡 𝔞𝔟𝔬𝔲𝔱 𝔪𝔢. ℌ𝔢 𝔴𝔥𝔬 𝔥𝔞𝔰 𝔠𝔬𝔫𝔣𝔦𝔡𝔢𝔫𝔱 𝔰𝔱𝔢𝔭𝔰 𝔴𝔞𝔩𝔨𝔰 𝔩𝔦𝔨𝔢 𝔞 𝔨𝔦𝔫𝔤."🖤🖤👑

━━━━━━━━━━━━━━━━━━━
▣ 🌍 معلومات إضافية
━━━━━━━━━━━━━
━━━━━━━━━━━━━━━━━━━
▣ 🌐 𝗖𝗼𝗻𝘁𝗮𝗰𝘁
━━━━━━━━━━━━━━━━━━━
📘 Facebook
✦https://www.facebook.com/profile.php?id=

`;

    return api.sendMessage({ body: infoMessage }, threadID, messageID);

  } catch (err) {
    return api.sendMessage("⚠️ حصل خطأ أثناء عرض معلومات المطور.", threadID);
  }
};
