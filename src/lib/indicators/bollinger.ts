// /lib/indicators/bollinger.ts
import { OHLCV, BollingerOptionsInputs } from '../type';

/**
 * computeBollingerBands
 * - Basis = SMA(source, length)
 * - StdDev = population standard deviation over length values (documented below)
 * - Upper = Basis + (multiplier * StdDev)
 * - Lower = Basis - (multiplier * StdDev)
 *
 * NOTE: This function uses *population* standard deviation (divide by N), not sample (N-1).
 * Either is acceptable per the assignment; population is chosen for stability and "per-bar"
 * behaviour parity with many charting implementations.
 *
 * Returns arrays aligned with input data; values that cannot be computed return null.
 */
export function computeBollingerBands(
  data: OHLCV[],
  opts: BollingerOptionsInputs
) {
  const { length, source, stdDevMultiplier, offset } = opts;
  const srcArr = data.map((d) => d[source as keyof OHLCV] as number);
  const basis: Array<number | null> = new Array(data.length).fill(null);
  const dev: Array<number | null> = new Array(data.length).fill(null);
  const upper: Array<number | null> = new Array(data.length).fill(null);
  const lower: Array<number | null> = new Array(data.length).fill(null);

  // rolling sum for SMA
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += srcArr[i];

    if (i - length >= 0) {
      sum -= srcArr[i - length];
    }

    if (i >= length - 1) {
      const avg = sum / length;
      const index = i + offset; // apply offset by shifting index
      // compute population stddev for window [i-length+1 .. i]
      let variance = 0;
      for (let j = i - length + 1; j <= i; j++) {
        const diff = srcArr[j] - avg;
        variance += diff * diff;
      }
      variance = variance / length; // population
      const std = Math.sqrt(variance);

      if (index >= 0 && index < data.length) {
        basis[index] = avg;
        dev[index] = std;
        upper[index] = avg + stdDevMultiplier * std;
        lower[index] = avg - stdDevMultiplier * std;
      }
    }
  }

  return { basis, dev, upper, lower };
}
