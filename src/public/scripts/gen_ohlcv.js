// scripts/gen_ohlcv.js (run: node scripts/gen_ohlcv.js)
const fs = require('fs');

function generateCandles(n = 250, startPrice = 100) {
  const candles = [];
  let t = Date.now() - n * 24 * 60 * 60 * 1000; // daily candles
  let price = startPrice;
  for (let i = 0; i < n; i++) {
    const open = price;
    const change = (Math.random() - 0.5) * 2; // -1 .. 1
    const close = Math.max(1, open + change);
    const high = Math.max(open, close) + Math.random() * 1.5;
    const low = Math.min(open, close) - Math.random() * 1.5;
    const volume = Math.round(Math.random() * 2000 + 500);
    candles.push({ time: t, open: +open.toFixed(2), high: +high.toFixed(2), low: +low.toFixed(2), close: +close.toFixed(2), volume });
    t += 24 * 60 * 60 * 1000;
    price = close;
  }
  return candles;
}

fs.writeFileSync('./public/data/ohlcv.json', JSON.stringify(generateCandles(), null, 2));
console.log('written public/data/ohlcv.json');
