const { loadJupiterTokens } = require('./utils/jupiter');
const { checkArbitrageCEXvsDEX } = require('./arbitrage/cexDexCompare');
const cron = require('node-cron');

// تحميل التوكنات من Jupiter
async function loadTokens() {
  console.log('تحميل بيانات التوكنات...');
  await loadJupiterTokens();
  console.log('تم تحميل التوكنات بنجاح!');
}

// تشغيل الفحص الدوري
cron.schedule('*/5 * * * *', async () => {  // كل 5 دقائق
  console.log('التحقق من فرص المراجحة...');
  await checkArbitrageCEXvsDEX("SOL", 10);  // تحليل SOL مثالًا
});

// تحميل التوكنات أول مرة
loadTokens().then(() => {
  console.log("جاري بدء التشغيل...");
});
