// /lib/types.ts
export type OHLCV = {
  time: number; // epoch ms
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

export type BollingerOptionsInputs = {
  length: number; // 20
  maType: 'SMA'; // only SMA for this assignment, exposed as option
  source: 'close'; // only close supported
  stdDevMultiplier: number; // 2
  offset: number; // shift in bars
};

export type LineStyle = 'solid' | 'dashed';

export type BollingerStyle = {
  basis: {
    visible: boolean;
    color: string;
    width: number;
    style: LineStyle;
  };
  upper: {
    visible: boolean;
    color: string;
    width: number;
    style: LineStyle;
  };
  lower: {
    visible: boolean;
    color: string;
    width: number;
    style: LineStyle;
  };
  fill: {
    visible: boolean;
    opacity: number; // 0-1
  };
};
