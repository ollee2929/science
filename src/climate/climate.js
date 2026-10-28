// 교과서 활동 기준이 되는 가상의 30년 평균 기온값
export const BASE_TEMP = 14.0;

export const COLORS = {
  cold: '#4a90e2', // 파랑 (-0.5°C 미만)
  cool: '#aed8f2', // 연파랑 (-0.5°C ~ 0°C)
  warm: '#ffdeaa', // 연주황 (0°C ~ 0.5°C)
  hot: '#d9534f', // 빨강 (0.5°C 초과)
};

export function getColorForDeviation(dev) {
  if (dev < -0.5) return COLORS.cold;
  if (dev < 0) return COLORS.cool;
  if (dev <= 0.5) return COLORS.warm;
  return COLORS.hot;
}

// 기온 편차 계산 (해당 연도 기온 - 기준 기온), 소수 첫째 자리 반올림
export function calcDeviation(temp, base = BASE_TEMP) {
  return Number((temp - base).toFixed(1));
}

export function formatDeviation(dev) {
  const text = dev.toFixed(1);
  return dev > 0 ? `+${text} °C` : `${text} °C`;
}
