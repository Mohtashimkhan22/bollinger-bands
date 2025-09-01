// /components/BollingerSettings.tsx
import React, { useState, useEffect } from 'react';
import { BollingerOptionsInputs, BollingerStyle } from '../lib/type';

type Props = {
  open: boolean;
  onClose: () => void;
  inputs: BollingerOptionsInputs;
  style: BollingerStyle;
  onChangeInputs: (v: BollingerOptionsInputs) => void;
  onChangeStyle: (v: BollingerStyle) => void;
};

export default function BollingerSettings({
  open,
  onClose,
  inputs,
  style,
  onChangeInputs,
  onChangeStyle,
}: Props) {
  const [tab, setTab] = useState<'inputs' | 'style'>('inputs');

  useEffect(() => {
    if (!open) setTab('inputs');
  }, [open]);

  if (!open)
    return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 border-b dark:border-slate-700">
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Bollinger Bands — Settings</h3>
          <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onClose}>Close</button>
        </div>

        <div className="flex">
          {/* Tabs */}
          <div className="w-40 border-r dark:border-slate-700">
            <nav className="flex flex-col">
              <button
                className={`text-left px-4 py-3 ${tab === 'inputs' ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
                onClick={() => setTab('inputs')}
              >
                Inputs
              </button>
              <button
                className={`text-left px-4 py-3 ${tab === 'style' ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
                onClick={() => setTab('style')}
              >
                Style
              </button>
            </nav>
          </div>

          <div className="flex-1 p-4 space-y-4">
            {tab === 'inputs' && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm">Length</span>
                    <input
                      type="number"
                      className="mt-1 p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                      value={inputs.length}
                      min={1}
                      onChange={(e) => onChangeInputs({ ...inputs, length: Math.max(1, Number(e.target.value)) })}
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm">StdDev (multiplier)</span>
                    <input
                      type="number"
                      step="0.1"
                      className="mt-1 p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                      value={inputs.stdDevMultiplier}
                      onChange={(e) => onChangeInputs({ ...inputs, stdDevMultiplier: Math.max(0, Number(e.target.value)) })}
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm">MA Type</span>
                    <select
                      value={inputs.maType}
                      onChange={(e) => onChangeInputs({ ...inputs, maType: e.target.value as any })}
                      className="mt-1 p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                    >
                      <option value="SMA">SMA</option>
                    </select>
                    <small className="text-xs text-slate-500">Only SMA supported for this assignment</small>
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm">Offset (bars)</span>
                    <input
                      type="number"
                      className="mt-1 p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                      value={inputs.offset}
                      onChange={(e) => onChangeInputs({ ...inputs, offset: Number(e.target.value) })}
                    />
                    <small className="text-xs text-slate-500">Positive shifts forward</small>
                  </label>
                </div>

                <div className="mt-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked disabled />
                    <span className="text-sm">Source: Close (fixed)</span>
                  </label>
                </div>
              </div>
            )}

            {tab === 'style' && (
              <div className="space-y-4">
                {['basis', 'upper', 'lower'].map((key) => {
                  const k = key as 'basis' | 'upper' | 'lower';
                  const v = style[k];
                  return (
                    <div key={k} className="p-3 border rounded dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{k === 'basis' ? 'Middle band (Basis)' : k.charAt(0).toUpperCase() + k.slice(1) + ' band'}</h4>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={v.visible}
                            onChange={(e) => onChangeStyle({ ...style, [k]: { ...v, visible: e.target.checked } })}
                          />
                          <span className="text-sm">Visible</span>
                        </label>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-3">
                        <label className="flex flex-col">
                          <span className="text-sm">Color</span>
                          <input
                            type="color"
                            value={v.color}
                            onChange={(e) => onChangeStyle({ ...style, [k]: { ...v, color: e.target.value } })}
                            className="w-full h-9"
                          />
                        </label>
                        <label className="flex flex-col">
                          <span className="text-sm">Width</span>
                          <input
                            type="number"
                            min={1}
                            max={6}
                            value={v.width}
                            onChange={(e) => onChangeStyle({ ...style, [k]: { ...v, width: Number(e.target.value) } })}
                            className="mt-1 p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                          />
                        </label>
                        <label className="flex flex-col">
                          <span className="text-sm">Style</span>
                          <select
                            value={v.style}
                            onChange={(e) => onChangeStyle({ ...style, [k]: { ...v, style: e.target.value as any } })}
                            className="mt-1 p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                          >
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  );
                })}

                <div className="p-3 border rounded dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Background fill</h4>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={style.fill.visible}
                        onChange={(e) => onChangeStyle({ ...style, fill: { ...style.fill, visible: e.target.checked } })}
                      />
                      <span className="text-sm">Visible</span>
                    </label>
                  </div>

                  <div className="mt-3">
                    <label className="flex flex-col">
                      <span className="text-sm">Opacity</span>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={style.fill.opacity}
                        onChange={(e) => onChangeStyle({ ...style, fill: { ...style.fill, opacity: Number(e.target.value) } })}
                      />
                      <div className="text-xs text-slate-500">{(style.fill.opacity * 100).toFixed(0)}%</div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 px-4 py-3 border-t dark:border-slate-700">
          <button className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
