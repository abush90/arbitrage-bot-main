module.exports = {
  // إعدادات API للمنصات
  bybitAPI: {
    url: 'https://api.bybit.com/v5/market/tickers',
    apiKey: process.env.BYBIT_API_KEY,
  },
  
  // إعدادات Telegram
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },

  // إعدادات المراجحة
  minProfitPercent: process.env.MIN_PROFIT_PERCENT || 1, // الحد الأدنى للربح
  minLiquidity: process.env.MIN_LIQUIDITY || 100000,    // الحد الأدنى للسيولة
  maxTradeSize: process.env.MAX_TRADE_SIZE || 1000,     // الحد الأقصى لحجم الصفقة
};
