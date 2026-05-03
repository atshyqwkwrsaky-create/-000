const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "نظام_وايد",
  version: "5.0.0",
  hasPermssion: 2,
  credits: "ليفاي + تعديل",
  description: "لوحة تحكم للبوت من الشات",
  commandCategory: "المطور",
  usages: "",
  cooldowns: 0
};

const DEV_IDS = ["61583632364472", "100081948980908"];
const CMDS_PATH = __dirname;

function isAdmin(id) {
  return DEV_IDS.includes(String(id)) ||
    ((global.config?.ADMINBOT || []).includes(String(id)));
}

function listJS(dir) {
  try {
    return fs.readdirSync(dir).filter(f => f.endsWith(".js"));
  } catch {
    return [];
  }
}

function hotReload(fp) {
  try {
    delete require.cache[require.resolve(fp)];
    const cmd = require(fp);
    if (cmd.config?.name) {
      global.client.commands.set(cmd.config.name, cmd);
      return `⚡ تم إعادة تحميل: ${cmd.config.name}`;
    }
    return "⚠️ تم الحفظ فقط";
  } catch (e) {
    return "❌ " + e.message;
  }
}

function buildFileList(files, title, footer) {
  let msg = `───═━━━━━━━━━━\n${title}\n───────────\n`;
  files.forEach((f, i) => {
    msg += `${i + 1}. ${f}\n`;
  });
  msg += `───────────\n${footer}`;
  return msg;
}

async function askAI(question) {
  try {
    const res = await axios.post(
      "https://text.pollinations.ai/",
      {
        messages: [
          { role: "system", content: "أنت مساعد ذكي مثل ChatGPT. تجيب بالعربية دائماً وتكون مفيداً ودقيقاً في إجاباتك." },
          { role: "user", content: question }
        ],
        model: "openai",
        seed: Math.floor(Math.random() * 9999)
      },
      { headers: { "Content-Type": "application/json" }, timeout: 30000 }
    );
    if (typeof res.data === "string") return res.data.trim();
    if (res.data?.choices?.[0]?.message?.content)
      return res.data.choices[0].message.content.trim();
    return "❌ لم تصل إجابة من الذكاء الاصطناعي";
  } catch (e) {
    return "❌ خطأ في الاتصال: " + e.message;
  }
}

const MENU =
`───═━━━━━━━━━━
⏤͟͟͞͞ WAYED SYSTEM v5
──────────────
⑉ ملفات
⑉ تعديل
⑉ اضافة [اسم]
⑉ حذف
⑉ جلب
⑉ كود [JS]
⑉ شات [سؤالك]
──────────────`;

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  if (!isAdmin(senderID))
    return api.sendMessage("🚫 الأمر دا للمطور بس", threadID, messageID);

  const sub = args[0];
  if (!sub) return api.sendMessage(MENU, threadID, messageID);

  // ── عرض الملفات ──
  if (sub === "ملفات") {
    const files = listJS(CMDS_PATH);
    return api.sendMessage(
      buildFileList(files, "📂 قائمة الملفات", `المجموع: ${files.length} ملف`),
      threadID, messageID
    );
  }

  // ── تعديل ── يعرض قائمة مرقمة
  if (sub === "تعديل") {
    const files = listJS(CMDS_PATH);
    if (files.length === 0)
      return api.sendMessage("❌ مافي ملفات", threadID, messageID);

    return api.sendMessage(
      buildFileList(files, "✏️ اختار الملف اللي تبي تعدلو:", "✏️ رد برقم الملف"),
      threadID,
      function (err, info) {
        if (err) return;
        if (!global.handleReply) global.handleReply = [];
        global.handleReply.push({
          name: "نظام_وايد",
          messageID: info.messageID,
          author: senderID,
          files: files,
          type: "pick_edit"
        });
      }
    );
  }

  // ── حذف ── يعرض قائمة مرقمة
  if (sub === "حذف") {
    const files = listJS(CMDS_PATH);
    if (files.length === 0)
      return api.sendMessage("❌ مافي ملفات", threadID, messageID);

    return api.sendMessage(
      buildFileList(files, "🗑️ اختار الملف اللي تبي تحذفو:", "⚠️ رد برقم الملف للحذف"),
      threadID,
      function (err, info) {
        if (err) return;
        if (!global.handleReply) global.handleReply = [];
        global.handleReply.push({
          name: "نظام_وايد",
          messageID: info.messageID,
          author: senderID,
          files: files,
          type: "pick_delete"
        });
      }
    );
  }

  // ── جلب ── يعرض قائمة مرقمة
  if (sub === "جلب") {
    const files = listJS(CMDS_PATH);
    if (files.length === 0)
      return api.sendMessage("❌ مافي ملفات", threadID, messageID);

    return api.sendMessage(
      buildFileList(files, "📄 اختار الملف اللي تبي كودو:", "✏️ رد برقم الملف"),
      threadID,
      function (err, info) {
        if (err) return;
        if (!global.handleReply) global.handleReply = [];
        global.handleReply.push({
          name: "نظام_وايد",
          messageID: info.messageID,
          author: senderID,
          files: files,
          type: "fetch"
        });
      }
    );
  }

  // ── اضافة ──
  if (sub === "اضافة") {
    const name = args[1];
    if (!name) return api.sendMessage("اكتب اسم الامر\nمثال: نظام_وايد اضافة اسم_الامر", threadID, messageID);

    const filePath = path.join(CMDS_PATH, name + ".js");
    fs.writeFileSync(filePath, `module.exports.config = {
  name: "${name}",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "WAYED",
  description: "امر جديد",
  commandCategory: "عام",
  usages: "",
  cooldowns: 3
};

module.exports.run = async function({ api, event }) {
  api.sendMessage("شغال ✅", event.threadID);
};
`);
    const msg = hotReload(filePath);
    return api.sendMessage("✅ تم الانشاء\n" + msg, threadID, messageID);
  }

  // ── تنفيذ كود ──
  if (sub === "كود") {
    const code = args.slice(1).join(" ");
    if (!code) return api.sendMessage("اكتب الكود", threadID, messageID);
    try {
      let result = eval(code);
      if (result instanceof Promise) result = await result;
      return api.sendMessage(String(result), threadID, messageID);
    } catch (e) {
      return api.sendMessage("❌ " + e.message, threadID, messageID);
    }
  }

  // ── شات جي بي تي ──
  if (sub === "شات") {
    const question = args.slice(1).join(" ");
    if (!question) return api.sendMessage("✏️ اكتب سؤالك بعد كلمة شات", threadID, messageID);
    api.sendMessage("🤖 جاري التفكير...", threadID, messageID);
    const answer = await askAI(question);
    return api.sendMessage(`🤖 ChatGPT\n───────────\n${answer}\n───────────`, threadID, messageID);
  }

  return api.sendMessage("❓ أمر غير معروف", threadID, messageID);
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (String(event.senderID) !== String(handleReply.author)) return;

  const { threadID } = event;
  const num = parseInt(event.body.trim());

  // ── اختيار ملف للتعديل ──
  if (handleReply.type === "pick_edit") {
    const files = handleReply.files;
    if (isNaN(num) || num < 1 || num > files.length)
      return api.sendMessage(`❌ رقم غير صحيح، اكتب رقم بين 1 و ${files.length}`, threadID);

    const fileName = files[num - 1];
    const filePath = path.join(CMDS_PATH, fileName);

    try {
      const content = fs.readFileSync(filePath, "utf8");
      return api.sendMessage(
        `📄 ${fileName}\n───────────\n${content.slice(0, 3000)}\n───────────\n✏️ رد بالكود الجديد`,
        threadID,
        function (err, info) {
          if (err) return;
          if (!global.handleReply) global.handleReply = [];
          global.handleReply.push({
            name: "نظام_وايد",
            messageID: info.messageID,
            author: event.senderID,
            path: filePath,
            fileName: fileName,
            type: "edit"
          });
        }
      );
    } catch (e) {
      return api.sendMessage("❌ " + e.message, threadID);
    }
  }

  // ── تأكيد وحفظ الكود الجديد ──
  if (handleReply.type === "edit") {
    try {
      fs.writeFileSync(handleReply.path, event.body);
      const msg = hotReload(handleReply.path);
      return api.sendMessage(`✅ تم تعديل ${handleReply.fileName}\n${msg}`, threadID);
    } catch (e) {
      return api.sendMessage("❌ " + e.message, threadID);
    }
  }

  // ── اختيار ملف للحذف ──
  if (handleReply.type === "pick_delete") {
    const files = handleReply.files;
    if (isNaN(num) || num < 1 || num > files.length)
      return api.sendMessage(`❌ رقم غير صحيح، اكتب رقم بين 1 و ${files.length}`, threadID);

    const fileName = files[num - 1];
    const filePath = path.join(CMDS_PATH, fileName);

    try {
      fs.unlinkSync(filePath);
      if (global.client?.commands)
        global.client.commands.delete(fileName.replace(".js", ""));
      return api.sendMessage(`🗑️ تم حذف ${fileName} بنجاح`, threadID);
    } catch (e) {
      return api.sendMessage("❌ " + e.message, threadID);
    }
  }

  // ── جلب كود ملف ──
  if (handleReply.type === "fetch") {
    const files = handleReply.files;
    if (isNaN(num) || num < 1 || num > files.length)
      return api.sendMessage(`❌ رقم غير صحيح، اكتب رقم بين 1 و ${files.length}`, threadID);

    const fileName = files[num - 1];
    const filePath = path.join(CMDS_PATH, fileName);

    try {
      const content = fs.readFileSync(filePath, "utf8");
      return api.sendMessage(
        `📄 ${fileName}\n───────────\n${content.slice(0, 3500)}${content.length > 3500 ? "\n\n⚠️ تم عرض أول 3500 حرف فقط" : ""}`,
        threadID
      );
    } catch (e) {
      return api.sendMessage("❌ " + e.message, threadID);
    }
  }
};
