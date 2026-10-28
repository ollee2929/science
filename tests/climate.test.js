import { describe, expect, it } from 'vitest';
import {
  COLORS,
  calcDeviation,
  formatDeviation,
  getColorForDeviation,
} from '../src/climate/climate.js';

describe('calcDeviation', () => {
  it('기준 기온과의 차이를 소수 첫째 자리로 계산한다', () => {
    expect(calcDeviation(15.1)).toBe(1.1);
    expect(calcDeviation(13.2)).toBe(-0.8);
    expect(calcDeviation(14.0)).toBe(0);
  });
});

describe('getColorForDeviation', () => {
  it.each([
    [-0.6, COLORS.cold],
    [-0.5, COLORS.cool],
    [-0.1, COLORS.cool],
    [0, COLORS.warm],
    [0.5, COLORS.warm],
    [0.6, COLORS.hot],
  ])('편차 %s → %s', (dev, color) => {
    expect(getColorForDeviation(dev)).toBe(color);
  });
});

describe('formatDeviation', () => {
  it('양수에는 + 기호를 붙인다', () => {
    expect(formatDeviation(1.1)).toBe('+1.1 °C');
    expect(formatDeviation(-0.8)).toBe('-0.8 °C');
    expect(formatDeviation(0)).toBe('0.0 °C');
  });
});
