import './style.css';
import { calcDeviation, formatDeviation, getColorForDeviation } from './climate.js';

const ROW_COUNT = 4;

function calculateClimate() {
  for (let i = 1; i <= ROW_COUNT; i++) {
    const tempInput = parseFloat(document.getElementById(`temp${i}`).value);

    // 유효성 검사 (빈칸 처리)
    if (isNaN(tempInput)) {
      alert('모든 연도의 기온 칸에 올바른 숫자를 입력해주세요!');
      return;
    }

    const deviation = calcDeviation(tempInput);

    const devCell = document.getElementById(`dev${i}`);
    devCell.innerText = formatDeviation(deviation);
    devCell.style.fontWeight = 'bold';
    devCell.style.color = deviation > 0 ? '#d9534f' : deviation < 0 ? '#4a90e2' : '#333';

    // 편차 수치에 따른 히트맵 박스 색상 연동
    document.getElementById(`box${i}`).style.backgroundColor = getColorForDeviation(deviation);
  }
}

document.getElementById('calc-btn').addEventListener('click', calculateClimate);

// 페이지가 열릴 때 기본값으로 자동 계산되도록 최초 1회 실행
calculateClimate();
