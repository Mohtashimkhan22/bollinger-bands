// /app/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import ChartComponent from '../components/Chart';
import BollingerSettings from '../components/BollingerSettings';
import { OHLCV, BollingerOptionsInputs, BollingerStyle } from '../lib/type';
import ohlcvData from '../public/data/ohlcv.json';

export default function Page() {
  const [data, setData] = useState<OHLCV[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [indicatorAdded, setIndicatorAdded] = useState(false);

  const [inputs, setInputs] = useState<BollingerOptionsInputs>({
    length: 20,
    maType: 'SMA',
    source: 'close',
    stdDevMultiplier: 2,
    offset: 0,
  });

  const [style, setStyle] = useState<BollingerStyle>({
    basis: { visible: true, color: '#f1c40f', width: 1, style: 'solid' },
    upper: { visible: true, color: '#3498db', width: 1, style: 'solid' },
    lower: { visible: true, color: '#3498db', width: 1, style: 'solid' },
    fill: { visible: true, opacity: 0.12 },
  });

  useEffect(() => {
    // load demo data (imported JSON)
    setData((ohlcvData as unknown) as OHLCV[]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">FindScan — Bollinger Bands Demo</h1>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
              onClick={() => setIndicatorAdded(true)}
              disabled={indicatorAdded}
            >
              {indicatorAdded ? 'Indicator added' : 'Add Bollinger Bands'}
            </button>
            <button
              className="px-3 py-2 border rounded"
              onClick={() => setShowSettings(true)}
            >
              Settings
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded shadow p-4">
          <ChartComponent data={data} inputs={inputs} style={style} />
        </div>
      </div>

      <BollingerSettings
        open={showSettings}
        onClose={() => setShowSettings(false)}
        inputs={inputs}
        style={style}
        onChangeInputs={(v) => setInputs(v)}
        onChangeStyle={(v) => setStyle(v)}
      />
    </div>
  );
}
