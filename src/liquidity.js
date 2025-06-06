const fetch = require('node-fetch');

// التحقق من السيولة على DEX
async function checkLiquidity(tokenAddress) {
  const url = `https://api.raydium.io/market/$(tokenAddress)`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.liquidity || 0;
  } catch (error) {
    console.error("❌ فشل التحقق من السيولة:", error.message);
    return 0;
  }
}

module.exports = { checkLiquidity };
