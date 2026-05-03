module.exports.config = {
    name: "المطور",
    version: "7.0.0",
    hasPermssion: 0,
    credits: "ليفاي",
    description: "عرض معلومات مطور البوت",
    commandCategory: "النظام",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
    const { threadID, messageID } = event;

    const infoMessage =
`═══════════════════
👑  𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥  👑
═══════════════════

▣ 🧞‍♂️ 𝗔𝗯𝗼𝘂𝘁 𝗗𝗲𝘃
━━━━━━━━━━━━━━━━━━━
✦ آلَآسِمً : ليفاي
✦ آلَلَقُبً : ليفو🖤
✦ آلَدٍوٌر : 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓 / 𝑺𝒚𝒔𝒕𝒆𝒎 𝑪𝒐𝒏𝒕𝒓𝒐𝒍𝒍𝒆𝒓

▣ 🤖 𝗕𝗼𝘁 𝗜𝗻𝗳𝗼
━━━━━━━━━━━━━━━━━━━
✦ آلَآسِمً : ᎷᎬᎶᎬᎷᎥ
✦ آلَنِوٌعٌ: ✧ ᎷᎬᎶᎬᎷᎥ BOT ❖
━━━━━━━━━━━━━━━━━━━
✦ ⟬ حـكـمـة الـمـطـور ⟭
_*ويــبقــى آســــمي دائمــاً عـقــدة لبعـض الاشــخاص🖤👅"!*_ ♡♡
_ _ _ _ _ _ _ 👑✌🏻

•_•
━━━━━━━━━━━━━━━━━━━
▣ 🌐 𝗖𝗼𝗻𝘁𝗮𝗰𝘁
━━━━━━━━━━━━━━━━━━━
📘 \`𝑭𝑨𝑪𝑬𝑩𝑶𝑶𝑲\`
➤ https://www.facebook.com/profile.php?id=61583632364472

━━━━━━━━━━━━━━━━━━━
تم تطوير البوت بالشراكة مع
منصة اكس {✘}
━━━━━━━━━━━━━━━━━━━`;

    return api.sendMessage({ body: infoMessage }, threadID, messageID);
};
