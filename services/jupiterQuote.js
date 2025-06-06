const fetch = require('node-fetch');

/**
 * جلب أفضل عرض تحويل بين عملتين عبر Jupiter
 */
async function getJupiterQuote(fromSymbol, toSymbol, amountIn = 1) {
  const fromToken = getTokenBySymbol(fromSymbol);
  const toToken = getTokenBySymbol(toSymbol);

  if (!fromToken || !toToken) {
    console.error(`❌ الرموز غير موجودة في tokens.json: ${fromSymbol}, ${toSymbol}`);
    return null;
  }

  const amountRaw = amountIn * Math.pow(10, fromToken.decimals); 
  const url = `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken.address}&outputMint=${toToken.address}&amount=${amountRaw}&slippageBps=100`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data || !data.data || data.data.length === 0) return null;

    const bestRoute = data.data[0]; 
    const outAmount = bestRoute.outAmount / Math.pow(10, toToken.decimals);
    const priceImpact = bestRoute.priceImpactPct * 100;

    return {
      route: bestRoute,
      outAmount,
      priceImpact,
      fromSymbol,
      toSymbol,
      amountIn,
      inAmount: amountIn,
      expectedProfitPercent: ((outAmount - amountIn) / amountIn) * 100,
    };
  } catch (e) {
    console.error('❌ فشل الاتصال بـ Jupiter Quote API:', e.message);
    return null;
  }
}

module.exports = { getJupiterQuote };
