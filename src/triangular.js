const { getJupiterQuote } = require('../services/jupiterQuote');
const { sendTelegramMessage } = require('../services/telegram');

async function triangularArbitrage(inputSymbol = "SOL", amount = 10) {
  const routeAB = await getJupiterQuote(inputSymbol, "USDC", amount);  // SOL → USDC
  if (!routeAB) return console.log("❌ فشل في جلب البيانات!");

  const routeBC = await getJupiterQuote("USDC", "BONK", routeAB.outAmount);  // USDC → BONK
  if (!routeBC) return console.log("❌ فشل في جلب البيانات!");

  const routeCA = await getJupiterQuote("BONK", inputSymbol, routeBC.outAmount);  // BONK → SOL
  if (!routeCA) return console.log("❌ فشل في جلب البيانات!");

  const profitPercent = ((routeCA.outAmount - amount) / amount) * 100;

  console.log(`
🔺 مراجحة مثلثية:
مسار: ${inputSymbol} → USDC → BONK → ${inputSymbol}
الربح المتوقع: ${profitPercent.toFixed(2)}%
`);

  if (profitPercent >= 1) {
    console.log("🚀 فرصة مراجحة مثلثية متاحة");
    await sendTelegramMessage(`
🚀 فرصة مراجحة مثلثية:
مسار: ${inputSymbol} → USDC → BONK → ${inputSymbol}
الربح المتوقع: ${profitPercent.toFixed(2)}%
    `);
  }
}

module.exports = { triangularArbitrage };
