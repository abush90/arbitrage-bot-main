const { checkArbitrageCEXvsDEX } = require('./arbitrage/cexDexCompare');
const { multiHopArbitrage } = require('./multiHop');
const { triangularArbitrage } = require('./triangular');

/**
 * دالة رئيسية للتحقق من جميع الفرص
 */
async function runArbitrage() {
  console.log("التحقق من الفرص...");
  
  // تحقق من فرص المراجحة CEX ↔ DEX (مثل Bybit ↔ Jupiter)
  await checkArbitrageCEXvsDEX("SOL", 10);  // قم بتغيير العملة والكمية حسب الحاجة

  // تحقق من فرص المراجحة متعددة القفزات
  await multiHopArbitrage("SOL", 10);  // مثال مع SOL

  // تحقق من المراجحة المثلثية
  await triangularArbitrage("SOL", 10);  // مثال مع SOL
}

module.exports = { runArbitrage };
