const { getJupiterQuote } = require('../services/jupiterQuote');

// إجراء المراجحة متعددة القفزات
async function multiHopArbitrage(inputSymbol = "SOL", amount = 10) {
  const routeAtoB = await getJupiterQuote(inputSymbol, "USDC", amount);  // SOL -> USDC
  if (!routeAtoB) return console.log("❌ فشل في جلب البيانات!");

  const routeBtoC = await getJupiterQuote("USDC", "BONK", routeAtoB.outAmount);  // USDC -> BONK
  if (!routeBtoC) return console.log("❌ فشل في جلب البيانات!");

  const finalAmount = await getJupiterQuote("BONK", "SOL", routeBtoC.outAmount);  // BONK -> SOL
  if (!finalAmount) return console.log("❌ فشل في جلب البيانات!");

  const profitPercent = ((finalAmount.outAmount - amount) / amount) * 100;

  console.log(`
🔁 مسار المراجحة متعددة القفزات:
مسار 1: ${inputSymbol} → USDC → BONK → ${inputSymbol}
الربح المتوقع: ${profitPercent.toFixed(2)}%
`);

  if (profitPercent > 1) {
    console.log("🚀 فرصة مراجحة متعددة القفزات متاحة");
    // أرسل التنبيه عبر Telegram
  }
}

module.exports = { multiHopArbitrage };
