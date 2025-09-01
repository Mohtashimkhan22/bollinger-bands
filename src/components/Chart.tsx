"use client";

import React, { useEffect, useRef } from "react";
import { init, dispose, Chart, KLineData, registerIndicator } from "klinecharts";
import { OHLCV, BollingerOptionsInputs, BollingerStyle } from "../lib/type";
import { computeBollingerBands } from "../lib/indicators/bollinger";

type Props = {
  data: OHLCV[];
  inputs: BollingerOptionsInputs;
  style: BollingerStyle;
};

export default function ChartComponent({ data, inputs, style }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  // 1) Init chart
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = init(containerRef.current, {
      styles: {
        candle: {
          bar: {
            upColor: "#2ecc71",
            downColor: "#e74c3c",
          },
        },
        grid: { horizontal: { color: "#333" }, vertical: { color: "#333" } },
      },
    });

    chartRef.current = chart;

    chart.applyNewData(
      data.map((d) => ({
        timestamp: d.time,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
        volume: d.volume ?? 0,
      }))
    );

    return () => {
      dispose(containerRef.current!);
      chartRef.current = null;
    };
  }, [data]);

  // 2) Register + apply custom Bollinger indicator
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // register only once globally
    if (!(window as any).__boll_registered) {
      registerIndicator({
        name: "BOLL",
        shortName: "BOLL",
        calc: (kLineList: KLineData[]) => {
          const bands = computeBollingerBands(
            kLineList.map((d) => ({
              time: d.timestamp,
              open: d.open,
              high: d.high,
              low: d.low,
              close: d.close,
              volume: d.volume,
            })),
            inputs
          );

          return bands.basis.map((_, i) => ({
            basis: bands.basis[i],
            upper: bands.upper[i],
            lower: bands.lower[i],
          }));
        },
        figures: [
          { key: "basis", title: "Basis", type: "line" },
          { key: "upper", title: "Upper", type: "line" },
          { key: "lower", title: "Lower", type: "line" },
        ],
      });
      (window as any).__boll_registered = true;
    }

    // create or update indicator on main pane
    chart.createIndicator(
      { name: "BOLL", shortName: "BOLL" },
      false,
      { id: "candle_pane" }
    );
  }, [inputs]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] bg-white dark:bg-slate-900 rounded"
    />
  );
}
