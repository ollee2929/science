import './style.css';

const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const C = {
  stim: '#c0562c',
  sense: '#1f5fa8',
  nerve: '#2d7d9a',
  horm: '#7a4f9e',
  eff: '#3f7d52',
  fb: '#c0562c',
  val: '#a9761b',
};
const FILL = {
  stim: '#fdf0e8',
  sense: '#e9f0fa',
  nerve: '#e6f2f6',
  gland: '#f3edfa',
  horm: '#faf0ff',
  organ: '#edf5ee',
  effect: '#f4f8f4',
  value: '#fff7e4',
};
const STROKE = {
  stim: C.stim,
  sense: C.sense,
  nerve: C.nerve,
  gland: C.horm,
  horm: C.horm,
  organ: C.eff,
  effect: C.eff,
  value: C.val,
};

/* ===================== 시스템 정의 ===================== */
const SYS = {
  /* ---------------- 혈당량 ---------------- */
  glu: {
    title: '혈당량 조절',
    vb: [1060, 716],
    unit: 'mg/100 mL',
    set: 100,
    span: 180,
    yMin: 70,
    yMax: 150,
    nodes: [
      { id: 'stim', x: 380, y: 14, w: 300, h: 46, k: 'stim', t: '자극', s: '' },
      {
        id: 'hypo',
        x: 398,
        y: 102,
        w: 264,
        h: 52,
        k: 'sense',
        t: '사이뇌 시상하부',
        s: '혈당량 변화를 감지',
      },
      { id: 'npar', x: 118, y: 208, w: 194, h: 44, k: 'nerve', t: '부교감신경', s: '' },
      { id: 'nsym', x: 598, y: 208, w: 194, h: 44, k: 'nerve', t: '교감신경', s: '' },
      { id: 'gbet', x: 118, y: 292, w: 194, h: 48, k: 'gland', t: '이자 β세포', s: '랑게르한스섬' },
      { id: 'galp', x: 560, y: 292, w: 180, h: 48, k: 'gland', t: '이자 α세포', s: '랑게르한스섬' },
      { id: 'gadr', x: 788, y: 292, w: 180, h: 48, k: 'gland', t: '부신속질', s: '' },
      { id: 'hins', x: 118, y: 380, w: 194, h: 46, k: 'horm', t: '인슐린', s: '' },
      { id: 'hglc', x: 560, y: 380, w: 180, h: 46, k: 'horm', t: '글루카곤', s: '' },
      { id: 'hepi', x: 788, y: 380, w: 180, h: 46, k: 'horm', t: '에피네프린', s: '' },
      { id: 'olv1', x: 96, y: 468, w: 238, h: 48, k: 'organ', t: '간 · 체세포', s: '표적기관' },
      { id: 'olv2', x: 598, y: 468, w: 372, h: 48, k: 'organ', t: '간', s: '표적기관' },
      {
        id: 'efa',
        x: 96,
        y: 556,
        w: 238,
        h: 52,
        k: 'effect',
        t: '포도당 → 글리코젠',
        s: '세포의 포도당 흡수 ↑',
      },
      {
        id: 'efb',
        x: 598,
        y: 556,
        w: 372,
        h: 52,
        k: 'effect',
        t: '글리코젠 → 포도당',
        s: '간에서 포도당을 혈액으로',
      },
      { id: 'val', x: 360, y: 640, w: 340, h: 62, k: 'value', t: '혈당량', s: '' },
    ],
    edges: [
      { f: 'stim', t: 'hypo', k: 'stim', b: 'x', t0: 0 },
      { f: 'hypo', t: 'npar', k: 'nerve', b: 'a', t0: 0.5, L: '신경 (빠름)' },
      { f: 'hypo', t: 'nsym', k: 'nerve', b: 'b', t0: 0.5, L: '신경 (빠름)' },
      { f: 'npar', t: 'gbet', k: 'nerve', b: 'a', t0: 1 },
      { f: 'nsym', t: 'galp', k: 'nerve', b: 'b', t0: 1 },
      { f: 'nsym', t: 'gadr', k: 'nerve', b: 'b', t0: 1 },
      { f: 'gbet', t: 'hins', k: 'horm', b: 'a', t0: 2, L: '분비' },
      { f: 'galp', t: 'hglc', k: 'horm', b: 'b', t0: 2, L: '분비' },
      { f: 'gadr', t: 'hepi', k: 'horm', b: 'b', t0: 2 },
      { f: 'hins', t: 'olv1', k: 'horm', b: 'a', t0: 5, L: '혈액을 따라 이동 (느림)' },
      { f: 'hglc', t: 'olv2', k: 'horm', b: 'b', t0: 5, L: '혈액을 따라 이동 (느림)' },
      { f: 'hepi', t: 'olv2', k: 'horm', b: 'b', t0: 5 },
      { f: 'olv1', t: 'efa', k: 'eff', b: 'a', t0: 8 },
      { f: 'olv2', t: 'efb', k: 'eff', b: 'b', t0: 8 },
      { f: 'efa', t: 'val', k: 'eff', b: 'a', t0: 11, L: '혈당량 ↓' },
      { f: 'efb', t: 'val', k: 'eff', b: 'b', t0: 11, L: '혈당량 ↑' },
      {
        f: 'val',
        t: 'hypo',
        k: 'fb',
        b: 'x',
        t0: 14,
        L: '되먹임 — 결과가 분비를 억제',
        lx: 850,
        ly: 660,
        la: 'middle',
        d: 'M 700 671 H 992 Q 1022 671 1022 641 V 158 Q 1022 128 992 128 H 668',
      },
    ],
    scn: [
      { id: 'meal', n: '① 식사 후', carb: 80, ex: 0 },
      { id: 'big', n: '② 많이 먹었을 때', carb: 130, ex: 0 },
      { id: 'fast', n: '③ 공복 + 운동', carb: 0, ex: 70 },
    ],
    init: () => ({ G: 100, ins: 100, glc: 100, epi: 100 }),
    step(S, p, i) {
      const absorb = p.carb * 0.055 * Math.exp(-Math.pow(i - 28, 2) / 800);
      const hi = Math.max(0, S.G - 100),
        lo = Math.max(0, 100 - S.G);
      S.ins += (cl(100 + hi * 3.0 - lo * 1.6, 55, 230) - S.ins) * 0.1;
      S.glc += (cl(100 - hi * 1.0 + lo * 3.2, 55, 230) - S.glc) * 0.1;
      S.epi += (cl(100 + p.ex * 0.5 + lo * 1.6, 90, 220) - S.epi) * 0.16;
      S.G +=
        absorb -
        (S.ins - 100) * 0.03 +
        ((S.glc - 100) * 0.026 + (S.epi - 100) * 0.01) -
        p.ex * 0.01;
      return { v: S.G, h: [S.ins, S.glc, S.epi] };
    },
    hnames: ['인슐린', '글루카곤', '에피네프린'],
    hcol: [C.nerve, C.stim, C.eff],
    branch: (v) => (v > 100.6 ? 'a' : v < 99.4 ? 'b' : null),
    ro: (S) => [
      ['혈당량 (mg/100 mL)', S.v.toFixed(0)],
      ['인슐린', S.h[0].toFixed(0)],
      ['글루카곤', S.h[1].toFixed(0)],
      ['에피네프린', S.h[2].toFixed(0)],
    ],
    dyn(v, br, p) {
      return {
        stim: { s: p.carb > 0 ? '음식 섭취 → 혈당량 상승' : '공복 · 운동 → 혈당량 하강' },
        val: { s: '설정값 100 mg/100 mL · 현재 ' + v.toFixed(0) },
        hins: { s: br === 'a' ? '분비 ↑' : '분비 ↓' },
        hglc: { s: br === 'b' ? '분비 ↑' : '분비 ↓' },
      };
    },
    narr(t, v, br) {
      if (t < 1) return '자극이 들어왔습니다. <b>사이뇌 시상하부</b>가 혈당량의 변화를 감지합니다.';
      if (t < 2)
        return br === 'a'
          ? '시상하부 → <b>부교감신경</b> → 이자 β세포로 신호가 갑니다. 신경 신호는 <b>빠르게</b> 전달됩니다.'
          : '시상하부 → <b>교감신경</b> → 이자 α세포·부신속질로 신호가 갑니다. 신경 신호는 <b>빠르게</b> 전달됩니다.';
      if (t < 5)
        return br === 'a'
          ? '이자 β세포에서 <b>인슐린</b>이 분비되기 시작합니다.'
          : '이자 α세포에서 <b>글루카곤</b>이, 부신속질에서 <b>에피네프린</b>이 분비됩니다.';
      if (t < 8)
        return '호르몬이 <b>혈액을 따라</b> 표적기관인 간으로 이동합니다. 신경보다 <b>느리지만 오래</b> 작용합니다.';
      if (t < 11)
        return br === 'a'
          ? '간에서 <b>포도당이 글리코젠으로 합성</b>되고, 체세포가 포도당을 흡수합니다.'
          : '간에서 <b>글리코젠이 포도당으로 분해</b>되어 혈액으로 나옵니다.';
      if (br === null)
        return '혈당량이 설정값 100 mg/100 mL 부근으로 돌아왔습니다. 호르몬 분비량도 <b>원래 수준으로 줄어듭니다</b>. 이것이 음성피드백입니다.';
      return br === 'a'
        ? '혈당량이 내려가고 있습니다. 혈당량이 낮아지면 그 결과가 다시 <b>인슐린 분비를 억제</b>합니다.'
        : '혈당량이 올라가고 있습니다. 혈당량이 높아지면 그 결과가 다시 <b>글루카곤 분비를 억제</b>합니다.';
    },
  },

  /* ---------------- 삼투압 ---------------- */
  osm: {
    title: '삼투압 조절',
    vb: [1060, 660],
    unit: '(상대값)',
    set: 100,
    span: 120,
    yMin: 86,
    yMax: 112,
    nodes: [
      { id: 'stim', x: 380, y: 14, w: 300, h: 46, k: 'stim', t: '자극', s: '' },
      {
        id: 'hypo',
        x: 390,
        y: 102,
        w: 280,
        h: 52,
        k: 'sense',
        t: '사이뇌 시상하부',
        s: '체액 삼투압을 감지',
      },
      { id: 'gpos', x: 108, y: 212, w: 230, h: 48, k: 'gland', t: '뇌하수체후엽', s: '' },
      { id: 'hadh', x: 108, y: 300, w: 230, h: 46, k: 'horm', t: '항이뇨호르몬(ADH)', s: '' },
      { id: 'okid', x: 108, y: 388, w: 230, h: 48, k: 'organ', t: '콩팥 (세뇨관)', s: '표적기관' },
      { id: 'efa', x: 84, y: 476, w: 278, h: 52, k: 'effect', t: '물 재흡수 ↑', s: '오줌양 ↓' },
      { id: 'thir', x: 724, y: 212, w: 230, h: 48, k: 'nerve', t: '갈증 중추', s: '시상하부' },
      { id: 'efw', x: 724, y: 300, w: 230, h: 52, k: 'effect', t: '물 섭취 ↑', s: '체액의 물 ↑' },
      { id: 'val', x: 370, y: 570, w: 320, h: 62, k: 'value', t: '체액 삼투압', s: '' },
    ],
    edges: [
      { f: 'stim', t: 'hypo', k: 'stim', b: 'x', t0: 0 },
      { f: 'hypo', t: 'gpos', k: 'nerve', b: 'x', t0: 0.6, L: '신경 (빠름)' },
      { f: 'hypo', t: 'thir', k: 'nerve', b: 'a', t0: 0.6 },
      { f: 'gpos', t: 'hadh', k: 'horm', b: 'x', t0: 2, L: '분비' },
      { f: 'hadh', t: 'okid', k: 'horm', b: 'x', t0: 5, L: '혈액을 따라 이동 (느림)' },
      { f: 'okid', t: 'efa', k: 'eff', b: 'x', t0: 8 },
      { f: 'thir', t: 'efw', k: 'eff', b: 'a', t0: 3 },
      { f: 'efa', t: 'val', k: 'eff', b: 'x', t0: 11 },
      { f: 'efw', t: 'val', k: 'eff', b: 'a', t0: 6 },
      {
        f: 'val',
        t: 'hypo',
        k: 'fb',
        b: 'x',
        t0: 14,
        L: '되먹임 — 결과가 분비를 억제',
        lx: 200,
        ly: 590,
        la: 'middle',
        d: 'M 370 601 H 48 Q 18 601 18 571 V 158 Q 18 128 48 128 H 384',
      },
    ],
    scn: [
      { id: 'salt', n: '① 짠 음식 섭취', salt: 8, water: 0 },
      { id: 'sweat', n: '② 땀을 많이 흘림', salt: 6, water: 0 },
      { id: 'water', n: '③ 물 다량 섭취', salt: 0, water: 900 },
    ],
    init: () => ({ O: 100, adh: 100, urine: 1 }),
    step(S, p, i) {
      const inflow =
        p.salt * 0.085 * Math.exp(-Math.pow(i - 18, 2) / 450) -
        p.water * 0.00095 * Math.exp(-Math.pow(i - 15, 2) / 450);
      S.adh += (cl(100 + (S.O - 100) * 7.0, 40, 200) - S.adh) * 0.11;
      S.urine = cl(1.0 - (S.adh - 100) * 0.016, 0.2, 2.2);
      S.O += inflow - (S.adh - 100) * 0.02;
      return { v: S.O, h: [S.adh, S.urine * 100] };
    },
    hnames: ['ADH', '오줌양(상대)'],
    hcol: [C.horm, C.stim],
    branch: (v) => (v > 100.3 ? 'a' : v < 99.7 ? 'b' : null),
    ro: (S) => [
      ['체액 삼투압', S.v.toFixed(1)],
      ['ADH', S.h[0].toFixed(0)],
      ['오줌양 (상대값)', (S.h[1] / 100).toFixed(2)],
      ['설정값', '100'],
    ],
    dyn(v, br, p) {
      const hi = br === 'a';
      return {
        stim: {
          s:
            p.water > 0
              ? '물 다량 섭취 → 삼투압 하강'
              : p.salt === 6
                ? '땀 배출 → 체액의 물 ↓ → 삼투압 상승'
                : '염분 섭취 → 삼투압 상승',
        },
        val: { s: '설정값 100 · 현재 ' + v.toFixed(1) },
        hadh: { s: hi ? '분비 ↑' : br === 'b' ? '분비 ↓' : '분비 보통' },
        efa: {
          t: hi ? '물 재흡수 ↑' : br === 'b' ? '물 재흡수 ↓' : '물 재흡수',
          s: hi ? '오줌양 ↓' : br === 'b' ? '오줌양 ↑' : '오줌양',
        },
      };
    },
    narr(t, v, br) {
      if (t < 1)
        return '자극이 들어왔습니다. <b>사이뇌 시상하부</b>가 체액의 삼투압 변화를 감지합니다.';
      if (t < 2) return '시상하부에서 <b>뇌하수체후엽</b>으로 신호가 전달됩니다.';
      if (t < 5)
        return br === 'b'
          ? '삼투압이 낮아져 <b>ADH 분비가 억제</b>됩니다.'
          : '뇌하수체후엽에서 <b>항이뇨호르몬(ADH)</b>이 분비됩니다. 동시에 <b>갈증</b>이 일어납니다.';
      if (t < 8) return 'ADH가 <b>혈액을 따라</b> 표적기관인 콩팥으로 이동합니다.';
      if (t < 11)
        return br === 'b'
          ? '콩팥에서 물 <b>재흡수가 줄어</b> 오줌양이 늘어납니다.'
          : '콩팥에서 물 <b>재흡수가 늘어</b> 오줌양이 줄어듭니다.';
      if (br === null)
        return '삼투압이 설정값 부근으로 돌아왔습니다. ADH 분비량도 <b>원래 수준으로 줄어듭니다</b>. 이것이 음성피드백입니다.';
      return br === 'a'
        ? '삼투압이 내려가고 있습니다. 삼투압이 낮아지면 그 결과가 다시 <b>ADH 분비를 억제</b>합니다.'
        : '삼투압이 올라가고 있습니다. 삼투압이 회복되면 ADH 분비가 다시 <b>원래대로 돌아옵니다</b>.';
    },
  },

  /* ---------------- 체온 ---------------- */
  tmp: {
    title: '체온 조절',
    vb: [1060, 772],
    unit: '℃',
    set: 36.5,
    span: 120,
    yMin: 36.3,
    yMax: 36.7,
    nodes: [
      { id: 'stim', x: 380, y: 14, w: 300, h: 46, k: 'stim', t: '자극', s: '' },
      {
        id: 'hypo',
        x: 390,
        y: 102,
        w: 280,
        h: 52,
        k: 'sense',
        t: '사이뇌 시상하부',
        s: '체온 조절 중추',
      },
      { id: 'n1', x: 40, y: 214, w: 206, h: 44, k: 'nerve', t: '교감신경', s: '' },
      { id: 'o1', x: 40, y: 298, w: 206, h: 48, k: 'organ', t: '피부 혈관', s: '' },
      { id: 'e1', x: 28, y: 386, w: 230, h: 52, k: 'effect', t: '수축', s: '열 발산 ↓' },
      { id: 'n2', x: 290, y: 214, w: 206, h: 44, k: 'nerve', t: '운동신경', s: '' },
      { id: 'o2', x: 290, y: 298, w: 206, h: 48, k: 'organ', t: '골격근', s: '' },
      { id: 'e2', x: 278, y: 386, w: 230, h: 52, k: 'effect', t: '떨림', s: '열 발생 ↑' },
      { id: 'n3', x: 542, y: 214, w: 200, h: 44, k: 'nerve', t: '교감신경', s: '' },
      { id: 'g3', x: 542, y: 298, w: 200, h: 48, k: 'gland', t: '부신속질', s: '' },
      { id: 'h3', x: 542, y: 386, w: 200, h: 46, k: 'horm', t: '에피네프린', s: '' },
      { id: 'e3', x: 530, y: 474, w: 224, h: 52, k: 'effect', t: '물질대사 ↑', s: '열 발생 ↑' },
      { id: 'h4', x: 808, y: 214, w: 216, h: 44, k: 'horm', t: 'TRH', s: '시상하부' },
      { id: 'g4', x: 808, y: 298, w: 216, h: 48, k: 'gland', t: '뇌하수체전엽', s: '' },
      { id: 'h5', x: 808, y: 386, w: 216, h: 46, k: 'horm', t: 'TSH', s: '' },
      { id: 'g5', x: 808, y: 474, w: 216, h: 48, k: 'gland', t: '갑상샘', s: '' },
      { id: 'h6', x: 808, y: 562, w: 216, h: 46, k: 'horm', t: '타이록신', s: '물질대사 ↑ (느림)' },
      { id: 'val', x: 370, y: 682, w: 320, h: 62, k: 'value', t: '체온', s: '' },
    ],
    edges: [
      { f: 'stim', t: 'hypo', k: 'stim', b: 'x', t0: 0 },
      { f: 'hypo', t: 'n1', k: 'nerve', b: 'x', t0: 0.4, L: '신경 (빠름)' },
      { f: 'hypo', t: 'n2', k: 'nerve', b: 'x', t0: 0.4 },
      { f: 'hypo', t: 'n3', k: 'nerve', b: 'a', t0: 0.4 },
      { f: 'hypo', t: 'h4', k: 'horm', b: 'a', t0: 2, L: '호르몬 (느림)' },
      { f: 'n1', t: 'o1', k: 'nerve', b: 'x', t0: 0.9 },
      { f: 'n2', t: 'o2', k: 'nerve', b: 'x', t0: 0.9 },
      { f: 'n3', t: 'g3', k: 'nerve', b: 'a', t0: 0.9 },
      { f: 'o1', t: 'e1', k: 'eff', b: 'x', t0: 1.6 },
      { f: 'o2', t: 'e2', k: 'eff', b: 'x', t0: 1.6 },
      { f: 'g3', t: 'h3', k: 'horm', b: 'a', t0: 3 },
      { f: 'h3', t: 'e3', k: 'horm', b: 'a', t0: 6, L: '혈액을 따라 이동' },
      { f: 'h4', t: 'g4', k: 'horm', b: 'a', t0: 6 },
      { f: 'g4', t: 'h5', k: 'horm', b: 'a', t0: 12 },
      { f: 'h5', t: 'g5', k: 'horm', b: 'a', t0: 18 },
      { f: 'g5', t: 'h6', k: 'horm', b: 'a', t0: 26, L: '분비 (가장 느림)' },
      { f: 'e1', t: 'val', k: 'eff', b: 'x', t0: 4 },
      { f: 'e2', t: 'val', k: 'eff', b: 'x', t0: 4 },
      { f: 'e3', t: 'val', k: 'eff', b: 'a', t0: 9 },
      { f: 'h6', t: 'val', k: 'eff', b: 'a', t0: 32 },
      {
        f: 'h6',
        t: 'hypo',
        k: 'fb',
        b: 'a',
        t0: 40,
        L: '타이록신 ↑ ⊣ TRH·TSH 분비 억제',
        lx: 1024,
        ly: 188,
        la: 'end',
        d: 'M 808 585 H 790 Q 762 585 762 557 V 158 Q 762 128 734 128 H 674',
      },
      {
        f: 'val',
        t: 'hypo',
        k: 'fb',
        b: 'x',
        t0: 12,
        L: '되먹임 — 체온이 회복되면 반응이 약해짐',
        lx: 200,
        ly: 702,
        la: 'middle',
        d: 'M 370 713 H 24 Q 0 713 0 685 V 156 Q 0 128 24 128 H 384',
      },
    ],
    scn: [
      { id: 'cold', n: '① 저온 자극 (−5 ℃)', air: -5 },
      { id: 'cool', n: '② 서늘함 (10 ℃)', air: 10 },
      { id: 'hot', n: '③ 고온 자극 (36 ℃)', air: 36 },
    ],
    init: () => ({ T: 36.5, epi: 100, thy: 100, vaso: 0, shiver: 0, sweat: 0 }),
    step(S, p) {
      const err = 36.5 - S.T;
      S.vaso = cl(err * 190, -100, 100);
      S.shiver = cl(err * 230, 0, 100);
      S.sweat = cl(-err * 230, 0, 100);
      S.epi += (cl(100 + Math.max(0, err) * 220, 95, 220) - S.epi) * 0.14;
      S.thy += (cl(100 + Math.max(0, 20 - p.air) * 1.7, 98, 150) - S.thy) * 0.02;
      const prod = 1.0 + S.shiver * 0.0045 + (S.epi - 100) * 0.0016 + (S.thy - 100) * 0.0062;
      const loss = 1.0 + (22 - p.air) * 0.0135 - S.vaso * 0.0032 + S.sweat * 0.0045;
      S.T += (prod - loss) * 0.03;
      return { v: S.T, h: [S.epi, S.thy, 100 + S.vaso, 100 + S.shiver - S.sweat] };
    },
    hnames: ['에피네프린', '타이록신', '혈관(>100 수축)', '떨림/땀'],
    hcol: [C.eff, C.horm, C.nerve, C.stim],
    branch: (v) => (v < 36.47 ? 'a' : v > 36.53 ? 'b' : null), // a = 추움(열 발생), b = 더움(열 발산)
    ro: (S) => [
      ['체온 (℃)', S.v.toFixed(2)],
      ['에피네프린', S.h[0].toFixed(0)],
      ['타이록신', S.h[1].toFixed(0)],
      ['설정값', '36.5 ℃'],
    ],
    dyn(v, br, p) {
      const cold = p.air < 20;
      return {
        stim: { s: cold ? '기온 하강 → 체온 하강' : '기온 상승 → 체온 상승' },
        val: { s: '설정값 36.5 ℃ · 현재 ' + v.toFixed(2) + ' ℃' },
        n2: { t: cold ? '운동신경' : '교감신경' },
        o2: { t: cold ? '골격근' : '땀샘' },
        e2: { t: cold ? '떨림' : '땀 분비 ↑', s: cold ? '열 발생 ↑' : '열 발산 ↑' },
        e1: { t: cold ? '수축' : '확장', s: cold ? '열 발산 ↓' : '열 발산 ↑' },
      };
    },
    narr(t, v, br) {
      if (t < 1)
        return '자극이 들어왔습니다. <b>사이뇌 시상하부</b>(체온 조절 중추)가 체온 변화를 감지합니다.';
      if (t < 3)
        return '먼저 <b>신경 경로</b>가 작동합니다. 교감신경이 피부 혈관을, 운동신경이 골격근을 조절합니다. 신경은 <b>즉시</b> 반응합니다.';
      if (t < 8)
        return '이어서 교감신경이 <b>부신속질</b>을 자극해 에피네프린이 분비되고, 시상하부는 <b>TRH</b>를 내보냅니다.';
      if (t < 20)
        return 'TRH → 뇌하수체전엽 → <b>TSH</b> → 갑상샘으로 신호가 이어집니다. 호르몬 경로는 <b>느리지만 오래</b> 작용합니다.';
      if (t < 32)
        return '갑상샘에서 <b>타이록신</b>이 분비되어 온몸의 물질대사를 높입니다. 체온이 서서히 회복됩니다.';
      if (br === null)
        return '체온이 설정값 36.5 ℃ 부근으로 돌아왔습니다. 혈관 수축과 떨림도 <b>함께 약해집니다</b>. 이것이 음성피드백입니다.';
      return '혈중 타이록신이 늘어나면 시상하부와 뇌하수체의 활동을 <b>억제</b>하여 TRH·TSH 분비가 줄어듭니다.';
    },
  },
};

/* ===================== 렌더링 ===================== */
const SVGNS = 'http://www.w3.org/2000/svg';
const el = (n, a = {}) => {
  const e = document.createElementNS(SVGNS, n);
  for (const k in a) e.setAttribute(k, a[k]);
  return e;
};
const anch = {}; // node geometry

function buildPanel(key) {
  const S = SYS[key],
    pan = document.getElementById('pan-' + key);
  pan.innerHTML = `
   <div class="card">
     <div class="bar">
       <span class="scn" id="scn-${key}"></span>
       <button class="play" id="pl-${key}">▶ 재생</button>
       <button class="play ghost" id="rs-${key}">↺ 처음으로</button>
       <input type="range" class="scrub" id="sc-${key}" min="0" max="${S.span}" value="0" step="1">
       <span class="clock" id="ck-${key}">0분</span>
     </div>
     <div class="key">
       <span><i style="background:${C.stim}"></i>자극</span>
       <span><i style="background:${C.nerve}"></i>신경 (빠름)</span>
       <span><i style="background:${C.horm}"></i>호르몬 (느림·혈액 이동)</span>
       <span><i style="background:${C.eff}"></i>반응·효과</span>
       <span><i style="background:${C.fb};height:0;border-top:3px dashed ${C.fb}"></i>되먹임 (억제 ⊣)</span>
     </div>
   </div>
   <div class="card"><svg class="diagram" id="dg-${key}" viewBox="0 0 ${S.vb[0]} ${S.vb[1]}"></svg></div>
   <div class="two">
     <div class="card">
       <h2>현재 값</h2>
       <div class="ro" id="ro-${key}"></div>
       <div class="narr" id="nr-${key}"></div>
     </div>
     <div class="card">
       <h2>시간에 따른 변화</h2>
       <canvas id="c1-${key}" height="190"></canvas>
       <div class="legend"><span><i style="background:${C.val}"></i>${S.title.replace(' 조절', '')}</span><span><i style="background:#9aa4b2"></i>설정값 ${S.set} ${S.unit}</span></div>
       <canvas id="c2-${key}" height="160" style="margin-top:8px"></canvas>
       <div class="legend" id="lg-${key}"></div>
     </div>
   </div>`;

  // 시나리오 버튼
  const sc = document.getElementById('scn-' + key);
  S.scn.forEach((s, i) => {
    const b = document.createElement('button');
    b.textContent = s.n;
    b.dataset.i = i;
    if (i === 0) b.className = 'sel';
    sc.appendChild(b);
  });
  // 호르몬 범례
  document.getElementById('lg-' + key).innerHTML = S.hnames
    .map((n, i) => `<span><i style="background:${S.hcol[i]}"></i>${n}</span>`)
    .join('');

  // --- SVG ---
  const svg = document.getElementById('dg-' + key);
  const defs = el('defs');
  ['stim', 'nerve', 'horm', 'eff', 'fb'].forEach((k) => {
    const m = el('marker', {
      id: `ar-${key}-${k}`,
      viewBox: '0 0 14 14',
      refX: 12,
      refY: 7,
      markerUnits: 'userSpaceOnUse',
      markerWidth: 13,
      markerHeight: 13,
      orient: 'auto-start-reverse',
    });
    m.appendChild(el('path', { d: 'M1,2 L12,7 L1,12 z', fill: C[k] }));
    defs.appendChild(m);
  });
  const mi = el('marker', {
    id: `inh-${key}`,
    viewBox: '0 0 14 14',
    refX: 4,
    refY: 7,
    markerUnits: 'userSpaceOnUse',
    markerWidth: 15,
    markerHeight: 15,
    orient: 'auto-start-reverse',
  });
  mi.appendChild(
    el('path', { d: 'M3,1 L3,13', stroke: C.fb, 'stroke-width': 3, 'stroke-linecap': 'round' }),
  );
  defs.appendChild(mi);
  svg.appendChild(defs);

  const gE = el('g'),
    gN = el('g'),
    gP = el('g'),
    gL = el('g');
  svg.append(gE, gL, gN, gP);

  anch[key] = {};
  S.nodes.forEach((n) => {
    anch[key][n.id] = n;
  });

  // 간선
  S.edges.forEach((e) => {
    const p = el('path', {
      class: 'ed',
      d: e.d || linkPath(key, e),
      stroke: C[e.k],
      'marker-end': e.k === 'fb' ? `url(#inh-${key})` : `url(#ar-${key}-${e.k})`,
    });
    if (e.k === 'fb') p.setAttribute('stroke-dasharray', '7 5');
    e._p = p;
    gE.appendChild(p);
    if (e.L) {
      const L = el('text', { class: 'elab' });
      L.textContent = e.L;
      e._L = L;
      gL.appendChild(L);
    }
    e._pt = [0, 1, 2].map(() => {
      const c = el('circle', { class: 'pt', r: e.k === 'horm' ? 5.5 : 4, fill: C[e.k] });
      gP.appendChild(c);
      return c;
    });
  });

  // 노드
  S.nodes.forEach((n) => {
    const g = el('g', { class: 'nd' });
    n._g = g;
    g.appendChild(
      el('rect', {
        x: n.x,
        y: n.y,
        width: n.w,
        height: n.h,
        rx: n.k === 'horm' ? 22 : 9,
        fill: FILL[n.k],
        stroke: STROKE[n.k],
      }),
    );
    const hasS = !!n.s;
    const t = el('text', {
      class: 't',
      x: n.x + n.w / 2,
      y: n.y + (hasS ? n.h / 2 - 3 : n.h / 2 + 5),
      'text-anchor': 'middle',
    });
    t.textContent = n.t;
    n._t = t;
    g.appendChild(t);
    const s = el('text', {
      class: 's',
      x: n.x + n.w / 2,
      y: n.y + n.h / 2 + 15,
      'text-anchor': 'middle',
    });
    s.textContent = n.s || '';
    n._s = s;
    g.appendChild(s);
    if (n.k === 'value') {
      t.setAttribute('font-size', '17');
    }
    gN.appendChild(g);
  });
  return S;
}

function linkPath(key, e) {
  const A = anch[key][e.f],
    B = anch[key][e.t];
  const x1 = A.x + A.w / 2,
    y1 = A.y + A.h,
    x2 = B.x + B.w / 2,
    y2 = B.y;
  const dy = y2 - y1;
  return `M ${x1} ${y1} C ${x1} ${y1 + dy * 0.45}, ${x2} ${y2 - dy * 0.45}, ${x2} ${y2}`;
}

/* ===================== 실행 ===================== */
const ST = {};
function setup(key) {
  const S = buildPanel(key);
  ST[key] = { S, key, scn: 0, t: 0, playing: false, series: null, ph: 0 };
  document.getElementById('scn-' + key).addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b) return;
    [...ev.currentTarget.children].forEach((x) => (x.className = ''));
    b.className = 'sel';
    ST[key].scn = +b.dataset.i;
    reset(key);
    play(key);
  });
  document
    .getElementById('pl-' + key)
    .addEventListener('click', () => (ST[key].playing ? pause(key) : play(key)));
  document.getElementById('rs-' + key).addEventListener('click', () => {
    reset(key);
  });
  document.getElementById('sc-' + key).addEventListener('input', (ev) => {
    pause(key);
    ST[key].t = +ev.target.value;
    frame(key, 0);
  });
  reset(key);
}
function compute(key) {
  const { S, scn } = ST[key],
    p = S.scn[scn],
    st = S.init(),
    out = [];
  for (let i = 0; i <= S.span; i++) out.push(S.step(st, p, i));
  return out;
}
function reset(key) {
  const T = ST[key];
  T.t = 0;
  T.playing = false;
  T.series = compute(key);
  document.getElementById('pl-' + key).textContent = '▶ 재생';
  document.getElementById('sc-' + key).value = 0;
  frame(key, 0);
}
function play(key) {
  const T = ST[key];
  if (T.t >= T.S.span) T.t = 0;
  T.playing = true;
  document.getElementById('pl-' + key).textContent = '❚❚ 일시정지';
}
function pause(key) {
  ST[key].playing = false;
  document.getElementById('pl-' + key).textContent = '▶ 재생';
}

function frame(key, dt) {
  const T = ST[key],
    S = T.S;
  if (T.playing) {
    T.t = Math.min(S.span, T.t + dt * 7);
    if (T.t >= S.span) pause(key);
  }
  T.ph = (T.ph + dt * 0.55) % 1;
  const i = Math.min(S.span, Math.round(T.t)),
    cur = T.series[i];
  const br = S.branch(cur.v),
    p = S.scn[T.scn];

  document.getElementById('ck-' + key).textContent = Math.round(T.t) + '분';
  document.getElementById('sc-' + key).value = T.t;

  // 노드 라벨 갱신
  const dyn = S.dyn(cur.v, br, p);
  S.nodes.forEach((n) => {
    const d = dyn[n.id];
    if (d) {
      if (d.t !== undefined) n._t.textContent = d.t;
      if (d.s !== undefined) n._s.textContent = d.s;
    }
    // 보조 라벨이 있으면 제목을 위로 올려 겹치지 않게 한다
    const hasS = n._s.textContent.trim() !== '';
    n._t.setAttribute('y', n.y + (hasS ? n.h / 2 - 3 : n.h / 2 + 5));
  });

  // 간선 활성 / 입자
  const liveNodes = new Set();
  S.edges.forEach((e) => {
    const on = (e.b === 'x' || e.b === br) && T.t >= e.t0;
    e._p.classList.toggle('on', on);
    e._p.setAttribute('stroke', on ? C[e.k] : '#ccd3da');
    if (e._L) {
      e._L.classList.toggle('on', on);
      if (on) {
        if (e.lx !== undefined) {
          e._L.setAttribute('x', e.lx);
          e._L.setAttribute('y', e.ly);
          e._L.setAttribute('text-anchor', e.la || 'start');
        } else {
          const m = e._p.getPointAtLength(e._p.getTotalLength() * 0.5);
          e._L.setAttribute('x', m.x + 12);
          e._L.setAttribute('y', m.y - 6);
          e._L.setAttribute('text-anchor', 'start');
        }
      }
    }
    if (on) {
      liveNodes.add(e.f);
      liveNodes.add(e.t);
      const len = e._p.getTotalLength(),
        sp = e.k === 'horm' ? 0.55 : 1;
      e._pt.forEach((c, j) => {
        c.classList.add('on');
        const ph = (T.ph * sp + j / 3) % 1,
          pt = e._p.getPointAtLength(len * ph);
        c.setAttribute('cx', pt.x);
        c.setAttribute('cy', pt.y);
      });
    } else e._pt.forEach((c) => c.classList.remove('on'));
  });
  S.nodes.forEach((n) =>
    n._g.classList.toggle('off', !liveNodes.has(n.id) && n.k !== 'value' && n.id !== 'stim'),
  );

  // 수치
  document.getElementById('ro-' + key).innerHTML = S.ro(cur)
    .map(([k, v]) => `<div><span class="k">${k}</span><span class="v">${v}</span></div>`)
    .join('');
  document.getElementById('nr-' + key).innerHTML = S.narr(T.t, cur.v, br);

  // 그래프
  const upTo = i + 1;
  chart(
    document.getElementById('c1-' + key),
    [{ data: T.series.slice(0, upTo).map((r) => r.v), color: C.val }],
    { n: S.span, yMin: S.yMin, yMax: S.yMax, set: S.set, h: 190 },
  );
  chart(
    document.getElementById('c2-' + key),
    S.hnames.map((_, j) => ({
      data: T.series.slice(0, upTo).map((r) => r.h[j]),
      color: S.hcol[j],
    })),
    { n: S.span, yMin: 60, yMax: 160, h: 160 },
  );
}

function chart(cv, series, o) {
  const dpr = window.devicePixelRatio || 1,
    W = cv.clientWidth || 600,
    H = o.h;
  cv.style.height = H + 'px';
  cv.width = Math.round(W * dpr);
  cv.height = Math.round(H * dpr);
  const g = cv.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, W, H);
  const L = 50,
    R = 10,
    Tp = 10,
    B = 22,
    pw = W - L - R,
    ph = H - Tp - B;
  let lo = o.yMin,
    hi = o.yMax;
  series.forEach((s) =>
    s.data.forEach((v) => {
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }),
  );
  if (o.set != null) {
    lo = Math.min(lo, o.set);
    hi = Math.max(hi, o.set);
  }
  const pd = (hi - lo) * 0.1 || 1;
  lo -= pd;
  hi += pd;
  const X = (i) => L + pw * (i / o.n),
    Y = (v) => Tp + ph * (1 - (v - lo) / (hi - lo || 1));
  g.strokeStyle = '#eef1f4';
  g.fillStyle = '#8d96a2';
  g.font = '11px sans-serif';
  g.textAlign = 'right';
  g.textBaseline = 'middle';
  for (let k = 0; k <= 4; k++) {
    const v = lo + ((hi - lo) * k) / 4,
      y = Y(v);
    g.beginPath();
    g.moveTo(L, y);
    g.lineTo(W - R, y);
    g.stroke();
    g.fillText(v.toFixed(hi - lo < 5 ? 2 : 0), L - 6, y);
  }
  g.textAlign = 'center';
  g.textBaseline = 'top';
  for (let k = 0; k <= 4; k++)
    g.fillText(Math.round((o.n * k) / 4) + '분', L + (pw * k) / 4, Tp + ph + 6);
  if (o.set != null) {
    g.save();
    g.setLineDash([5, 4]);
    g.strokeStyle = '#9aa4b2';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(L, Y(o.set));
    g.lineTo(W - R, Y(o.set));
    g.stroke();
    g.restore();
  }
  series.forEach((s) => {
    if (!s.data.length) return;
    g.strokeStyle = s.color;
    g.lineWidth = 2.2;
    g.lineJoin = 'round';
    g.beginPath();
    s.data.forEach((v, i) => (i ? g.lineTo(X(i), Y(v)) : g.moveTo(X(i), Y(v))));
    g.stroke();
  });
}

/* 탭 */
document.querySelectorAll('.tabs button').forEach((b) =>
  b.addEventListener('click', () => {
    document
      .querySelectorAll('.tabs button')
      .forEach((x) => x.setAttribute('aria-selected', 'false'));
    b.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('on'));
    document.getElementById('pan-' + b.dataset.sys).classList.add('on');
  }),
);

['glu', 'osm', 'tmp'].forEach(setup);
let last = performance.now();
(function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  ['glu', 'osm', 'tmp'].forEach((k) => frame(k, dt));
  requestAnimationFrame(loop);
})(last);
window.addEventListener('resize', () => ['glu', 'osm', 'tmp'].forEach((k) => frame(k, 0)));
