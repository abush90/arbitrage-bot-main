const axios = require('axios');
const { bybitAPI } = require('../config/config');

// جلب أسعار Bybit
async function getBybitPrice(symbol = "SOLUSDT") {
  const url = `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}`;
  try {
    const response = await axios.get(url);
    const ticker = response.data.result.list[0];
    return {
      ask1Price: parseFloat(ticker.ask1Price),
      bid1Price: parseFloat(ticker.bid1Price),
      lastPrice: parseFloat(ticker.lastPrice),
    };
  } catch (error) {
    console.error('❌ فشل الاتصال بـ Bybit API:', error.message);
    return null;
  }
}

module.exports = { getBybitPrice };
