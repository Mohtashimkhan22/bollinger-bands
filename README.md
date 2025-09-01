# FindScan — Bollinger Bands (Frontend Intern Assignment)

## Overview
Production-ready Bollinger Bands indicator overlay built with **KLineCharts**, React + Next.js + TypeScript + TailwindCSS.

Features:
- Inputs: Length, MA Type (SMA), Source (Close), StdDev multiplier, Offset
- Style: Toggle visibility, color, width, dashed/solid for basis/upper/lower; fill area with opacity
- Tooltip/crosshair shows Basis/Upper/Lower
- Uses demo OHLCV data (>=200 candles)
- Recomputes on data / settings change instantly

## Setup
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## File highlights
- `/components/Chart.tsx` — KLineCharts wrapper, indicator updates
- `/lib/indicators/bollinger.ts` — `computeBollingerBands()` utility (modular)
- `/components/BollingerSettings.tsx` — Inputs + Style modal UI
- `/public/data/ohlcv.json` — demo data (generate via `scripts/gen_ohlcv.js` included)

## Formulas
- Basis = SMA(source, length)
- StdDev (population) = sqrt( (1/N) * Σ (x_i - mean)^2 )  — **population** standard deviation used
- Upper = Basis + (StdDev multiplier * StdDev)
- Lower = Basis - (StdDev multiplier * StdDev)
- Offset = shift result series by N bars (positive shifts forward)

## StdDev note
This implementation uses **population** standard deviation (divide by N). Trading platforms sometimes use sample (N-1). Both are acceptable per assignment; population was chosen to produce consistent, per-window volatility.

## KLineCharts version
This project is written to work with **KLineCharts v3.x** APIs. The code uses annotated calls such as `init`, `applyNewData`, and `createCustomIndicator`. If you use a different patch of `klinecharts`, you may need to adapt a few function names:
- `createCustomIndicator` / `setCustomIndicatorData` are used to register and feed the indicator
- `addOverlayLineSeries` and `addOverlayFill` are helper names; adapt depending on your KLineCharts version.

## Trade-offs / Known issues
- The UI supports SMA only (per assignment). I left the MA Type select in the UI to match TradingView style.
- KLineCharts API surface differs between versions — the code includes clear comments where to adapt function names.
- For performance, the compute function is O(N * length) in the naive variance loop; for length ~20 and N ~1000 this is trivial. For very large windows you can optimize with Welford's online stddev or incremental rolling variance.

## Screenshots / GIF
Include at least two images under `/screenshots` (PNG) or a short GIF of the indicator + settings. (Add manually after running the demo.)

## Run notes
- The Settings modal updates the chart in real time.
- Offset shifts bands forward for positive values.

