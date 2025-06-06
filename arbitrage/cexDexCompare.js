const { getBybitPrice } = require('../services/bybit'); // جلب الأسعار من Bybit
const { getJupiterQuote } = require('../services/jupiterQuote'); // جلب الأسعار من Jupiter DEX
const { sendTelegramMessage } = require('../services/telegram'); // إرسال التنبيهات عبر Telegram

// دالة تتحقق من فرصة المراجحة بين CEX و DEX
async function checkArbitrageCEXvsDEX(symbol = "SOL", amount = 10) {
  // جلب سعر البيع في DEX (Jupiter)
  const jup = await getJupiterQuote(symbol, "USDC", amount); 

  // جلب السعر من CEX (Bybit)
  const bybitPrice = await getBybitPrice(`${symbol}USDT`); 

  if (!jup || !bybitPrice) {
    console.log("❌ فشل في جلب الأسعار");
    return;
  }

  // حساب الفرق بين سعر البيع في DEX وسعر الشراء في CEX
  const jupiterSellPrice = jup.outAmount / jup.amountIn;
  const bybitBuyPrice = bybitPrice.ask1Price;

  // حساب نسبة الربح بين السعرين
  const profitPercent = ((jupiterSellPrice - bybitBuyPrice) / bybitBuyPrice) * 100;

  console.log(`
🔁 مقارنة السعر بين CEX و DEX:
العملة: ${symbol}
السعر في Bybit (شراء): $${bybitBuyPrice.toFixed(3)}
السعر في Jupiter (بيع): $${jupiterSellPrice.toFixed(3)}
الربح المتوقع: ${profitPercent.toFixed(2)}%
  `);

  // إذا كانت نسبة الربح أكثر من 1%، نرسل التنبيه عبر Telegram
  if (profitPercent >= 1) {
    await sendTelegramMessage(`
🚀 فرصة مراجحة:
من: ${symbol}
شراء من Bybit: $${bybitBuyPrice.toFixed(3)}
بيع في Jupiter: $${jupiterSellPrice.toFixed(3)}
الربح المتوقع: ${profitPercent.toFixed(2)}%
    `);
  }
}

module.exports = { checkArbitrageCEXvsDEX };