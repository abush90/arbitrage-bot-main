const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const TOKENS_FILE = path.join(__dirname, '../../tokens.json');
const JUPITER_TOKEN_URL = 'https://token.jup.ag/all';

/**
 * تحميل بيانات التوكنات وحفظها في ملف tokens.json
 */
async function loadJupiterTokens() {
  if (fs.existsSync(TOKENS_FILE)) {
    console.log('[Jupiter] ملف tokens.json موجود مسبقًا.');
    return JSON.parse(fs.readFileSync(TOKENS_FILE));
  }

  console.log('[Jupiter] تحميل بيانات التوكنات من API...');
  try {
    const tokens = await fetch(JUPITER_TOKEN_URL).then(res => res.json());
    fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
    console.log('[Jupiter] تم حفظ tokens.json بنجاح ✅');
    return tokens;
  } catch (err) {
    console.error('[Jupiter] فشل تحميل بيانات التوكنات:', err.message);
    return [];
  }
}

/**
 * الحصول على التوكن بناءً على الرمز
 */
function getTokenBySymbol(symbol) {
  const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE));
  return tokens.find(t => t.symbol === symbol);
}

/**
 * الحصول على جميع العملات المستقرة (stablecoins)
 */
function getStablecoins() {
  const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE));
  return tokens.filter(t => t.tags && t.tags.includes("stablecoin"));
}

/**
 * التحقق من وجود التوكن وعنوانه
 */
function tokenExists(symbol) {
  const token = getTokenBySymbol(symbol);
  return token ? token.address : null;
}

module.exports = {
  loadJupiterTokens,
  getTokenBySymbol,
  getStablecoins,
  tokenExists,
};
