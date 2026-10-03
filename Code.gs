/**
 * نظام التوقيع الإلكتروني للمعلمين – مدرسة القعقاع بن عمرو المتوسطة
 * التشغيل: شغّل الدالة setup مرة واحدة، ثم انشر المشروع "تطبيق ويب" (الوصول: أي شخص).
 * صفحة واحدة بأسماء المنسوبين: يضغط المعلم على اسمه ويوقّع مرة واحدة، ويُعتمد توقيعه في جميع السجلات التي يرد فيها اسمه.
 */
var SHEET_ID = '1AVDUXhNnMvHdSP_RtOPUWk1YiNprqx81zIpxDVwgWs4';   // معرّف جدول Google Sheets (يُترك فارغًا إذا كان المشروع مرتبطًا بالجدول نفسه)
var SH_T = 'المعلمون', SH_D = 'الكشوف', SH_S = 'التوقيعات', SH_F = 'الملفات', SH_FS = 'توقيعات الملفات', SH_C = 'الإعدادات';
var FOLDER = 'ملفات التوقيع – القعقاع 1448';

var TEACHERS = [
 ['أحمد حمدان حامد الشماسي','اللغة العربية (لغتي)'],['علي محمد جمعان الزهراني','اللغة العربية (لغتي)'],['عمر محسن بن عشاي السلمي','اللغة العربية (لغتي)'],['محمد بن سعيد بن محمد الزهراني','اللغة العربية (لغتي)'],['محمد بن صالح بن محمد الشمراني','اللغة العربية (لغتي)'],
 ['أحمد حبيب أحمد السلمي','الرياضيات'],['أيوب عثمان محمد الصحفي','الرياضيات'],['بندر عبدالله عباد القرني','الرياضيات'],['محمد سعيد حمد السلمي','الرياضيات'],['وجدي فهيد فهد الصحفي','الرياضيات'],
 ['بندر مقبل ثربان المطيري','العلوم'],['فهد صالح جباره الأحمدي','العلوم'],['خالد بن عبيدان بن حامد الحارثي','العلوم'],['عبدالله بن سعد بن عبدالله القرني','العلوم'],['عماد سالم محمد الحازمي','العلوم'],['فيصل بن عايش بن خفير الحارثي','العلوم'],['مشرف عائض محمد الشهري','العلوم'],
 ['فهد موسى صالح الثقفي','اللغة الإنجليزية'],['مروان مطر المطيري','اللغة الإنجليزية'],['ناصر حسين عباس الشريف','اللغة الإنجليزية'],
 ['أحمد بن علي بن محمد الميموني','الدراسات الإسلامية'],['توفيق علي شلوه الظاهري','الدراسات الإسلامية'],['حسين بن علي بن عوض الشريف','الدراسات الإسلامية'],['سالم عبدالرحمن علي الشمراني','الدراسات الإسلامية'],['سليمان علي سليمان الشهري','الدراسات الإسلامية'],['صالح سعيد محمد العبيدي','الدراسات الإسلامية'],['عبدالله صالح بن حمدان الغامدي','الدراسات الإسلامية'],['عوض الله زعام زهيميل السلمي','الدراسات الإسلامية'],
 ['عمر بن سلطان بن عبدرب النبي الشيخ','الدراسات الاجتماعية'],['فايز حامد بن ضهيان السلمي','الدراسات الاجتماعية'],['فهد سالم عائد العتيبي','الدراسات الاجتماعية'],
 ['بجاد سفر شارع العتيبي','المهارات الرقمية'],['رفيع صالح زوير السلمي','المهارات الرقمية'],['مشاري ستر عياضه السلمي','المهارات الرقمية'],
 ['إبراهيم محمد فايز العبدلي','التربية الفنية'],['عبدالله صالح إبراهيم العسيري','التربية الفنية'],
 ['عبدالرحمن فؤاد محمد الزهراني','التربية البدنية'],['يوسف بن عبدالله بن عبداللطيف الحربي','التربية البدنية'],
 ['محمد عبدالله سالم الشهري','التخصصات المساندة'],['نادر إسماعيل عباس النعمي','التخصصات المساندة'],['منير محمد عياد الجهني','التخصصات المساندة'],['عبدالله محمد جحني القرني الجوفي','التخصصات المساندة'],
 ['عبدالرحمن بن أحمد الجغثمي','الإدارة المدرسية'],['خليفة بن عطية الله الشيخ','الإدارة المدرسية'],['عباس بن محمد النعمي','الإدارة المدرسية'],['عبدالله العمري','الإدارة المدرسية']
];
var DOCS = [
 ['D1','تعميم الأدلة الإرشادية ووثيقة نواتج التعلم – العلم والاستلام','الكل','نعم'],
 ['D2','محضر اللقاء الأول لمجتمع التعلم المهني (محضر القسم) – توقيع الحضور','الكل','نعم'],
 ['D3','كشف الزيارات التبادلية – الجولة الأولى – العلم بالموعد','الكل','نعم'],
 ['D4','سجل حضور البرنامج التدريبي: أساليب وأدوات التقويم','الكل','لا'],
 ['D5','كشف تصنيف طلاب الصف الثالث المتوسط إلى ثلاث شرائح','علي محمد جمعان الزهراني؛عمر محسن بن عشاي السلمي؛أحمد حبيب أحمد السلمي؛بندر عبدالله عباد القرني؛فهد صالح جباره الأحمدي؛عبدالله بن سعد بن عبدالله القرني','نعم'],
 ['D6','خطاب تكليف الزيارات التبادلية والدروس التطبيقية (خطاب القسم)','الكل','نعم'],
 ['D7','كشف توقيع المعلمين بالاطلاع على تعميم وبيان تصنيف الطلبة الأولى بالرعاية','الكل','نعم'],
 ['D8','خطاب تكليف مجتمع التعلم المهني (خطاب القسم)','الكل','نعم'],
 ['D9','محضر اجتماع معلمي المواد المستهدفة – توقيع الحضور','أحمد حمدان حامد الشماسي؛علي محمد جمعان الزهراني؛عمر محسن بن عشاي السلمي؛محمد بن سعيد بن محمد الزهراني؛محمد بن صالح بن محمد الشمراني؛أحمد حبيب أحمد السلمي؛بندر عبدالله عباد القرني؛محمد سعيد حمد السلمي؛وجدي فهيد فهد الصحفي؛بندر مقبل ثربان المطيري؛فهد صالح جباره الأحمدي؛خالد بن عبيدان بن حامد الحارثي؛عبدالله بن سعد بن عبدالله القرني؛عماد سالم محمد الحازمي؛فيصل بن عايش بن خفير الحارثي؛مشرف عائض محمد الشهري؛فهد موسى صالح الثقفي؛مروان مطر المطيري؛ناصر حسين عباس الشريف','نعم'],
 ['D10','مشهد حضور جلسة مجتمع التعلم المهني (المواد المستهدفة)','أحمد حمدان حامد الشماسي؛علي محمد جمعان الزهراني؛عمر محسن بن عشاي السلمي؛محمد بن سعيد بن محمد الزهراني؛محمد بن صالح بن محمد الشمراني؛أحمد حبيب أحمد السلمي؛بندر عبدالله عباد القرني؛محمد سعيد حمد السلمي؛وجدي فهيد فهد الصحفي؛بندر مقبل ثربان المطيري؛فهد صالح جباره الأحمدي؛خالد بن عبيدان بن حامد الحارثي؛عبدالله بن سعد بن عبدالله القرني؛عماد سالم محمد الحازمي؛فيصل بن عايش بن خفير الحارثي؛مشرف عائض محمد الشهري؛فهد موسى صالح الثقفي؛مروان مطر المطيري؛ناصر حسين عباس الشريف','نعم'],
 ['D11','قرار تشكيل فريق التدخلات العاجلة – التوقيع بالعلم','عبدالرحمن بن أحمد الجغثمي؛خليفة بن عطية الله الشيخ؛عباس بن محمد النعمي؛عبدالله العمري؛مشرف عائض محمد الشهري؛عمر محسن بن عشاي السلمي؛بندر عبدالله عباد القرني؛فهد صالح جباره الأحمدي؛مروان مطر المطيري','نعم'],
 ['D12','محضر اجتماع تشكيل فريق التدخلات – توقيع الحضور','عبدالرحمن بن أحمد الجغثمي؛خليفة بن عطية الله الشيخ؛عباس بن محمد النعمي؛عبدالله العمري؛مشرف عائض محمد الشهري؛عمر محسن بن عشاي السلمي؛بندر عبدالله عباد القرني؛فهد صالح جباره الأحمدي؛مروان مطر المطيري','نعم'],
 ['D13','محضر اجتماع مقدم خدمات دعم التميز المؤسسي مع مدير المدرسة ولجنة التميز – توقيع الحضور','عبدالرحمن بن أحمد الجغثمي؛خليفة بن عطية الله الشيخ؛عباس بن محمد النعمي؛مشرف عائض محمد الشهري؛عبدالله العمري','نعم']
];

function ss_() { return SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet(); }
function ensure_() {
  var ss = ss_(); if (!ss.getSheetByName(SH_T) || !ss.getSheetByName(SH_D) || !ss.getSheetByName(SH_S)) setup();
  var st = sheet_(SH_T), have = {}; rows_(SH_T).forEach(function (r) { have[norm_(r[0])] = 1; });
  TEACHERS.forEach(function (t) { if (!have[t[0]]) st.appendRow(t); });
  var sd = sheet_(SH_D), ids = {}; rows_(SH_D).forEach(function (r) { ids[norm_(r[0])] = 1; });
  DOCS.forEach(function (d) { if (!ids[d[0]]) sd.appendRow(d); });
  function make(name, header) { var s = ss.getSheetByName(name); if (!s) { s = ss.insertSheet(name); s.appendRow(header); s.setFrozenRows(1); s.setRightToLeft(true); } return s; }
  make(SH_F, ['المعرّف', 'وقت الإرسال', 'عنوان الملف', 'رابط الملف', 'المطلوب توقيعهم', 'مفعّل (نعم/لا)', 'معرّف Drive', 'النوع (سجل/اطلاع)', 'خريطة التوقيع']);
  make(SH_FS, ['وقت التوقيع', 'الاسم', 'القسم', 'معرّف الملف', 'عنوان الملف']);
  var sc = make(SH_C, ['الإعداد', 'القيمة']), cfg = settings_();
  if (!cfg['مفتاح المشرف']) { cfg['مفتاح المشرف'] = Utilities.getUuid().slice(0, 8); sc.appendRow(['مفتاح المشرف', cfg['مفتاح المشرف']]); }
  if (!cfg['رابط المشرف']) { var u = appUrl_(); if (u) sc.appendRow(['رابط المشرف', u + '?admin=' + cfg['مفتاح المشرف']]); }
}
function sheet_(name) { var s = ss_().getSheetByName(name); if (!s) throw new Error('الورقة غير موجودة: ' + name + ' — شغّل الدالة setup'); return s; }
function rows_(name) { var v = sheet_(name).getDataRange().getValues(); return v.slice(1).filter(function (r) { return String(r[0]).trim() !== ''; }); }
function norm_(x) { return String(x == null ? '' : x).trim(); }
function yes_(x) { return norm_(x) === 'نعم'; }
function settings_() { var o = {}, s = ss_().getSheetByName(SH_C); if (!s) return o; s.getDataRange().getValues().slice(1).forEach(function (r) { o[norm_(r[0])] = norm_(r[1]); }); return o; }
function appUrl_() { try { return ScriptApp.getService().getUrl() || ''; } catch (e) { return ''; } }
function isAdmin_(key) { key = norm_(key); return !!key && key === settings_()['مفتاح المشرف']; }

/** يُشغَّل مرة واحدة: ينشئ الأوراق ويعبئ أسماء المعلمين والكشوف. */
function setup() {
  var ss = ss_();
  function make(name, header, data) {
    var s = ss.getSheetByName(name);
    if (!s) { s = ss.insertSheet(name); s.appendRow(header); if (data && data.length) s.getRange(2, 1, data.length, data[0].length).setValues(data); s.setFrozenRows(1); s.setRightToLeft(true); }
    return s;
  }
  make(SH_T, ['اسم المعلم', 'القسم'], TEACHERS);
  make(SH_D, ['المعرّف', 'عنوان الكشف', 'المطلوب توقيعهم (الكل أو أسماء بينها ؛)', 'مفعّل (نعم/لا)'], DOCS);
  make(SH_S, ['وقت التوقيع', 'اسم المعلم', 'القسم', 'معرّف الكشف', 'عنوان الكشف', 'التوقيع (بيانات)'], []);
}

function teachers_() { return rows_(SH_T).map(function (r) { return { name: norm_(r[0]), dept: norm_(r[1]) }; }); }
function docs_() { return rows_(SH_D).map(function (r) { return { id: norm_(r[0]), title: norm_(r[1]), who: norm_(r[2]), on: yes_(r[3]) }; }); }
function signs_() { var seen = {}, out = []; rows_(SH_S).forEach(function (r) { var n = norm_(r[1]); if (seen[n]) return; seen[n] = 1;   // توقيع واحد لكل اسم
    out.push({ time: r[0] instanceof Date ? Utilities.formatDate(r[0], 'Asia/Riyadh', 'yyyy-MM-dd HH:mm') : norm_(r[0]), name: n, strokes: norm_(r[5]) }); }); return out; }
var ADMIN = 'الإدارة المدرسية';
function required_(doc, t) {
  if (doc.who === 'الكل' || doc.who === '') return t.dept !== ADMIN;
  if (doc.who.indexOf('قسم:') === 0) return t.dept === norm_(doc.who.slice(4));
  return doc.who.split(/[؛;]/).map(norm_).indexOf(t.name) >= 0;
}
function time_(v) { return v instanceof Date ? Utilities.formatDate(v, 'Asia/Riyadh', 'yyyy-MM-dd HH:mm') : norm_(v); }
function files_() { return rows_(SH_F).map(function (r) { return { id: norm_(r[0]), time: time_(r[1]), title: norm_(r[2]), url: norm_(r[3]), who: norm_(r[4]), on: yes_(r[5]), driveId: norm_(r[6]), kind: norm_(r[7]) === 'سجل' ? 'auto' : 'ack', map: norm_(r[8]) }; }); }
function mapNames_(f) { try { return f.map ? Object.keys(JSON.parse(f.map)) : []; } catch (e) { return []; } }
function fsigns_() { return rows_(SH_FS).map(function (r) { return { time: time_(r[0]), name: norm_(r[1]), file: norm_(r[3]) }; }); }

function doGet(e) {
  var t = HtmlService.createTemplateFromFile('Index');
  t.adminKey = (e && e.parameter && e.parameter.admin) ? String(e.parameter.admin) : '';
  t.fileId = (e && e.parameter && e.parameter.f) ? String(e.parameter.f) : '';
  return t.evaluate().setTitle('كشوف توقيع المنسوبين – مدرسة القعقاع بن عمرو المتوسطة')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1');
}

/** واجهة API للصفحة عند استضافتها على موقع خارجي (مثل نطاق فرعي من qaqasa.com). */
function doPost(e) {
  var out;
  try {
    var req = JSON.parse((e && e.postData && e.postData.contents) || '{}'), fn = String(req.fn || ''), args = req.args || [];
    var api = { getState: getState, getSince: getSince, sign: sign, upload: upload, getFile: getFile, removeFile: removeFile, removeFiles: removeFiles };
    if (!api.hasOwnProperty(fn)) throw new Error('طلب غير معروف.');
    out = { ok: true, data: api[fn].apply(null, args) };
  } catch (err) { out = { ok: false, error: String(err && err.message ? err.message : err) }; }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

/** الكشف الموحّد + الملفات المرسلة للتوقيع وتوقيعاتها. */
function pubFiles_() { return files_().filter(function (f) { return f.on; }).map(function (f) { return { id: f.id, time: f.time, title: f.title, url: f.url, who: f.who, kind: f.kind, names: mapNames_(f) }; }); }
function getState(adminKey) {
  ensure_();
  var ss = signs_(), fs = fsigns_();
  return { people: teachers_(),
    signs: ss, count: ss.length, files: pubFiles_(), fsigns: fs, fcount: fs.length, admin: isAdmin_(adminKey), appUrl: appUrl_() };
}

/** الجديد بعد ما لدى الصفحة (للتحديث الدوري). */
function getSince(n, fn) {
  var ss = signs_(), fs = fsigns_(); n = Math.max(0, Number(n) || 0); fn = Math.max(0, Number(fn) || 0);
  return { signs: ss.slice(n), count: ss.length, files: pubFiles_(), fsigns: fs.slice(fn), fcount: fs.length };
}

/**
 * توقيع المنسوب:
 * - أول مرة: يرسم توقيعه فيُحفظ، ويُنسخ تلقائيًا إلى كل ملفات «السجلات» المرفقة التي يرد فيها اسمه، ويُعتمد في ملفات «الاطلاع» المرسلة حتى تلك اللحظة.
 * - بعد ذلك: الملف الجديد يُعتمد عليه توقيعه المحفوظ بضغطة واحدة (fileId) دون رسم.
 */
function sign(name, strokesJson, fileId, clientCount, clientFCount) {
  ensure_();
  name = norm_(name); strokesJson = String(strokesJson || ''); fileId = norm_(fileId);
  var t = teachers_().filter(function (x) { return x.name === name; })[0];
  if (!t) throw new Error('الاسم غير موجود في الكشف.');
  var lock = LockService.getScriptLock(); lock.waitLock(25000);
  try {
    var now = Utilities.formatDate(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd HH:mm'), saved = 0;
    var has = signs_().some(function (x) { return x.name === t.name; }), fl = files_().filter(function (f) { return f.on && f.kind !== 'auto' && required_(f, t); });
    if (!has) {
      if (strokesJson.length < 20) throw new Error('التوقيع فارغ.');
      if (strokesJson.length > 45000) throw new Error('التوقيع طويل جدًا، امسحه ووقّع مرة أخرى بخط أبسط.');
      JSON.parse(strokesJson);
      sheet_(SH_S).appendRow([now, t.name, t.dept, 'الكل', 'جميع السجلات التي يرد فيها الاسم', strokesJson]); saved = 1;
    } else { fl = fl.filter(function (f) { return f.id === fileId; }); }
    var fs = fsigns_(), sh = sheet_(SH_FS);
    fl.forEach(function (f) { if (!fs.some(function (x) { return x.file === f.id && x.name === t.name; })) { sh.appendRow([now, t.name, t.dept, f.id, f.title]); saved++; } });
    var r = getSince(clientCount, clientFCount); r.saved = saved; r.time = now; return r;
  } finally { lock.releaseLock(); }
}

/** رفع ملف وإرساله للتوقيع (للمشرف فقط عبر رابط المشرف). */
function upload(adminKey, title, who, fileName, mime, b64, kind, mapJson, clientCount, clientFCount) {
  ensure_();
  if (!isAdmin_(adminKey)) throw new Error('رفع الملفات متاح من رابط المشرف فقط.');
  title = norm_(title) || norm_(fileName); who = norm_(who) || 'الكل';
  if (!b64) throw new Error('لم يُحدَّد ملف.');
  var blob = Utilities.newBlob(Utilities.base64Decode(b64), mime || 'application/pdf', fileName || 'ملف');
  var it = DriveApp.getFoldersByName(FOLDER), folder = it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER);
  var file = folder.createFile(blob), url = '';
  try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); url = file.getUrl(); } catch (e) { url = ''; }   // إن منعت سياسة النطاق المشاركة يُفتح الملف من داخل الصفحة
  var lock = LockService.getScriptLock(); lock.waitLock(25000);
  try {
    var id = 'F' + (files_().length + 1), now = Utilities.formatDate(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd HH:mm');
    mapJson = String(mapJson || ''); if (mapJson.length > 49000) mapJson = '';   // حد خانة الجدول
    sheet_(SH_F).appendRow([id, now, title, url, who, 'نعم', file.getId(), kind === 'auto' ? 'سجل' : 'اطلاع', mapJson]);
    var r = getSince(clientCount, clientFCount); r.newId = id; return r;
  } finally { lock.releaseLock(); }
}

/** حذف ملف مرسل (للمشرف فقط): يختفي من الصفحة عند الجميع، ويُنقل ملفه إلى سلة محذوفات Google Drive. */
function removeFile(adminKey, fileId, clientCount, clientFCount) {
  ensure_();
  if (!isAdmin_(adminKey)) throw new Error('حذف الملفات متاح من رابط المشرف فقط.');
  fileId = norm_(fileId);
  var lock = LockService.getScriptLock(); lock.waitLock(25000);
  try {
    var sh = sheet_(SH_F), v = sh.getDataRange().getValues(), found = false;
    for (var i = 1; i < v.length; i++) {
      if (norm_(v[i][0]) !== fileId) continue;
      sh.getRange(i + 1, 6).setValue('لا'); found = true;
      try { if (norm_(v[i][6])) DriveApp.getFileById(norm_(v[i][6])).setTrashed(true); } catch (e) {}
    }
    if (!found) throw new Error('الملف غير موجود.');
    var r = getSince(clientCount, clientFCount); r.removed = fileId; return r;
  } finally { lock.releaseLock(); }
}

/** حذف عدة ملفات مرسلة دفعة واحدة (للمشرف فقط). */
function removeFiles(adminKey, ids, clientCount, clientFCount) {
  ensure_();
  if (!isAdmin_(adminKey)) throw new Error('حذف الملفات متاح من رابط المشرف فقط.');
  var want = {}; (ids || []).forEach(function (x) { want[norm_(x)] = 1; });
  var lock = LockService.getScriptLock(); lock.waitLock(25000);
  try {
    var sh = sheet_(SH_F), v = sh.getDataRange().getValues(), done = [];
    for (var i = 1; i < v.length; i++) {
      var id = norm_(v[i][0]); if (!want[id] || norm_(v[i][5]) === 'لا') continue;
      sh.getRange(i + 1, 6).setValue('لا'); done.push(id);
      try { if (norm_(v[i][6])) DriveApp.getFileById(norm_(v[i][6])).setTrashed(true); } catch (e) {}
    }
    var r = getSince(clientCount, clientFCount); r.removedIds = done; return r;
  } finally { lock.releaseLock(); }
}

/** محتوى الملف (يُستخدم عندما لا يكون له رابط مشاركة عام). */
function getFile(fileId) {
  var f = files_().filter(function (x) { return x.id === norm_(fileId) && x.on; })[0];
  if (!f || !f.driveId) throw new Error('الملف غير موجود.');
  var b = DriveApp.getFileById(f.driveId).getBlob();
  return { name: b.getName(), mime: b.getContentType(), b64: Utilities.base64Encode(b.getBytes()), map: f.map, title: f.title };
}
