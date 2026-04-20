/*
 * HeroVisuals v7 — 통일 모션 시스템
 *
 * 공통 모션 원칙:
 *  - 1회만 동작, loop 금지 (단, credit orbit만 극히 느린 ambient)
 *  - 총 체감 0.8~1.2s
 *  - ease-out spline: "0.16 0.1 0.2 1" (draw), "0.25 0.1 0.25 1" (scale/fade)
 *  - 시퀀스: 앵커 등장 → 구조 전개 → 디테일 stagger → 핵심 안착
 *  - CTA보다 약하게: wrapper opacity 0.85, glow 최소
 */

const C = {
  em600: "#10353F", em500: "#10353F", em400: "#10353F",
  em300: "#E6D3BE", em200: "#E5E1DA", em100: "#F6F1EB", em50: "#F6F1EB",
  sl700: "#0E2A3A", sl500: "#5E6E73", sl400: "#5E6E73",
  sl300: "#E5E1DA", sl200: "#E5E1DA", sl100: "#F6F1EB", sl50: "#F6F1EB",
  white: "#ffffff",
};

/* 공통 easing 참조 (코드 내 인라인 사용) */
const EASE_DRAW = "0.16 0.1 0.2 1";
const EASE_SCALE = "0.25 0.1 0.25 1";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 1. 신용대출 — 중심 정돈
 *
 * 타임라인 (~1.0s):
 *  0.00s  배경 글로우 fade
 *  0.05s  궤도 ring stroke draw (0.7s)
 *  0.10s  중앙 원 fade + scale 0.96→1
 *  0.40s  ₩ 심볼 fade + scale 0.92→1
 *  0.55s  dot 1 stagger
 *  0.62s  dot 2
 *  0.69s  dot 3
 *  0.76s  dot 4
 *  0.65s  시계 fade (0.25s → 0.2)
 *  0.73s  차트 fade (0.25s → 0.2)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function CreditVisual() {
  const ringCirc = 2 * Math.PI * 78; // ~490

  return (
    <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="420" height="240" rx="24" fill={C.sl50} />

      <defs>
        <filter id="credit-center-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodColor={C.em500} floodOpacity="0">
            <animate attributeName="floodOpacity" values="0;0.2;0.12" dur="0.4s" fill="freeze" begin="0.4s" />
          </feDropShadow>
        </filter>
      </defs>

      {/* 배경 글로우 */}
      <circle cx="210" cy="120" r="88" fill={C.em50} opacity="0">
        <animate attributeName="opacity" from="0" to="0.25" dur="0.3s" fill="freeze" begin="0s" />
      </circle>

      {/* 궤도 ring — stroke draw */}
      <circle cx="210" cy="120" r="78" fill="none" stroke={C.em200} strokeWidth="1.5"
        strokeDasharray={`5 12`} opacity="0"
        >
        <animate attributeName="opacity" from="0" to="0.35" dur="0.7s" fill="freeze" begin="0.05s"
          calcMode="spline" keySplines={EASE_DRAW} keyTimes="0;1" />
      </circle>

      {/* 중앙 원 — fade + scale */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0.1s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <animateTransform attributeName="transform" type="scale" from="0.96" to="1" dur="0.3s" fill="freeze" begin="0.1s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <circle cx="210" cy="120" r="56" fill={C.white} />
        <circle cx="210" cy="120" r="56" fill="none" stroke={C.em500} strokeWidth="2.5" />
      </g>

      {/* ₩ 심볼 — 마지막 핵심 등장 */}
      <g filter="url(#credit-center-glow)" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0.4s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <animateTransform attributeName="transform" type="scale" from="0.92" to="1" dur="0.3s" fill="freeze" begin="0.4s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <text x="210" y="135" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="38" fontWeight="800" fill={C.em600}>&#8361;</text>
      </g>

      {/* 궤도 dot — 순차 stagger */}
      <circle cx="210" cy="42" r="5" fill={C.em400} opacity="0">
        <animate attributeName="opacity" from="0" to="0.5" dur="0.2s" fill="freeze" begin="0.55s" />
      </circle>
      <circle cx="288" cy="120" r="4" fill={C.em300} opacity="0">
        <animate attributeName="opacity" from="0" to="0.3" dur="0.2s" fill="freeze" begin="0.62s" />
      </circle>
      <circle cx="210" cy="198" r="5" fill={C.em400} opacity="0">
        <animate attributeName="opacity" from="0" to="0.5" dur="0.2s" fill="freeze" begin="0.69s" />
      </circle>
      <circle cx="132" cy="120" r="4" fill={C.em300} opacity="0">
        <animate attributeName="opacity" from="0" to="0.3" dur="0.2s" fill="freeze" begin="0.76s" />
      </circle>

      {/* 시계 — 보조 stagger */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="0.2" dur="0.25s" fill="freeze" begin="0.65s" />
        <circle cx="82" cy="80" r="14" fill={C.white} stroke={C.sl200} strokeWidth="1.5" />
        <line x1="82" y1="80" x2="82" y2="73" stroke={C.sl300} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="82" y1="80" x2="87" y2="80" stroke={C.sl300} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* 미니 차트 — 보조 stagger */}
      <g opacity="0" transform="translate(326, 74)">
        <animate attributeName="opacity" from="0" to="0.2" dur="0.25s" fill="freeze" begin="0.73s" />
        <rect x="0" y="12" width="5" height="8" rx="2" fill={C.em200} />
        <rect x="9" y="6" width="5" height="14" rx="2" fill={C.em200} />
        <rect x="18" y="0" width="5" height="20" rx="2" fill={C.em300} />
      </g>
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 2. 대환 — 카드 전환 (이전 → 새 대출)
 *
 * 타임라인 (~1.1s):
 *  0.00s  이전 카드 fade + scale 0.96→1 (0.35s)
 *  0.20s  새 카드 fade + scale 0.94→1 (0.4s)
 *  0.45s  화살표 draw (0.5s)
 *  0.70s  화살표 끝 화살촉 fade
 *  0.60s  이전 카드 내부 디테일 stagger
 *  0.75s  새 카드 내부 디테일 stagger
 *  0.85s  새 카드 glow 안정
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function RefinanceVisual() {
  return (
    <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="420" height="240" rx="24" fill={C.sl50} />

      <defs>
        <filter id="refi-new-glow" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor={C.em500} floodOpacity="0">
            <animate attributeName="floodOpacity" values="0;0.2;0.12" dur="0.4s" fill="freeze" begin="0.85s" />
          </feDropShadow>
        </filter>
        <filter id="refi-old-shadow" x="-10%" y="-5%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#334155" floodOpacity="0.06" />
        </filter>
        <linearGradient id="refi-new-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.em100} />
          <stop offset="100%" stopColor={C.em200} />
        </linearGradient>
      </defs>

      {/* ── 이전 카드 (회색, 흐림) ── */}
      <g opacity="0" filter="url(#refi-old-shadow)">
        <animate attributeName="opacity" from="0" to="0.45" dur="0.35s" fill="freeze" begin="0s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <animateTransform attributeName="transform" type="scale" from="0.96" to="1" dur="0.35s" fill="freeze" begin="0s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <rect x="72" y="62" width="140" height="116" rx="18" fill={C.sl100} stroke={C.sl200} strokeWidth="1.5" />
        {/* 은행 아이콘 — 기둥형 */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.25s" fill="freeze" begin="0.6s" />
          <path d="M142 96 L126 106 L158 106 Z" fill={C.sl300} />
          <rect x="130" y="108" width="6" height="16" rx="1.5" fill={C.sl300} />
          <rect x="140" y="108" width="6" height="16" rx="1.5" fill={C.sl300} />
          <rect x="150" y="108" width="6" height="16" rx="1.5" fill={C.sl300} />
          <rect x="126" y="126" width="36" height="4" rx="2" fill={C.sl300} />
        </g>
        {/* 금리 바 — 높음 */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.2s" fill="freeze" begin="0.68s" />
          <rect x="92" y="142" width="100" height="6" rx="3" fill={C.sl200} />
          <rect x="92" y="142" width="72" height="6" rx="3" fill={C.sl400} opacity="0.6" />
          <rect x="92" y="154" width="60" height="4" rx="2" fill={C.sl200} opacity="0.5" />
        </g>
      </g>

      {/* ── 새 카드 (emerald, 강조) ── */}
      <g opacity="0" filter="url(#refi-new-glow)">
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" fill="freeze" begin="0.2s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <animateTransform attributeName="transform" type="scale" from="0.94" to="1" dur="0.4s" fill="freeze" begin="0.2s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <rect x="208" y="52" width="148" height="126" rx="20" fill="url(#refi-new-fill)" stroke={C.em300} strokeWidth="1.5" />
        {/* 은행 아이콘 — 기둥형, emerald */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.25s" fill="freeze" begin="0.75s" />
          <path d="M282 88 L266 98 L298 98 Z" fill={C.em400} />
          <rect x="270" y="100" width="6" height="16" rx="1.5" fill={C.em400} />
          <rect x="280" y="100" width="6" height="16" rx="1.5" fill={C.em400} />
          <rect x="290" y="100" width="6" height="16" rx="1.5" fill={C.em400} />
          <rect x="266" y="118" width="36" height="4" rx="2" fill={C.em400} />
        </g>
        {/* 금리 바 — 낮음 (짧아서 절약) */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.2s" fill="freeze" begin="0.82s" />
          <rect x="228" y="134" width="108" height="6" rx="3" fill={C.em200} />
          <rect x="228" y="134" width="40" height="6" rx="3" fill={C.em500} />
          <rect x="228" y="146" width="68" height="4" rx="2" fill={C.em200} opacity="0.6" />
        </g>
        {/* 체크 뱃지 */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.25s" fill="freeze" begin="0.9s" />
          <animateTransform attributeName="transform" type="scale" from="0.85" to="1" dur="0.3s" fill="freeze" begin="0.9s"
            calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
          <circle cx="340" cy="64" r="14" fill={C.em500} />
          <path d="M334 64 L338 68 L347 59" stroke={C.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* ── 전환 화살표 (곡선) ── */}
      <path d="M178 90 C 194 42, 230 36, 248 68"
        stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" fill="none"
        strokeDasharray="120" strokeDashoffset="120" opacity="0">
        <animate attributeName="opacity" from="0" to="0.7" dur="0.15s" fill="freeze" begin="0.45s" />
        <animate attributeName="stroke-dashoffset" from="120" to="0" dur="0.5s" fill="freeze" begin="0.45s"
          calcMode="spline" keySplines={EASE_DRAW} keyTimes="0;1" />
      </path>
      {/* 화살촉 */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="0.7" dur="0.2s" fill="freeze" begin="0.7s" />
        <path d="M244 60 L248 68 L240 66" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* ── 보조 장식: 절약 spark ── */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="0.25" dur="0.2s" fill="freeze" begin="0.92s" />
        <circle cx="222" y="196" r="3" fill={C.em300} />
        <circle cx="238" cy="202" r="2" fill={C.em200} />
        <circle cx="254" cy="194" r="2.5" fill={C.em300} />
      </g>
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 3. 전세 vs 월세 — 조립 → 기울기 → 안착
 *
 * 타임라인 (~1.1s):
 *  0.00s  기둥+받침 fade (0.3s)
 *  0.15s  팔 바 fade (0.3s)
 *  0.25s  왼쪽 접시(전세) fade + translateY 4→0
 *  0.35s  오른쪽 접시(월세) fade + translateY 4→0 (→ 0.3 opacity)
 *  0.50s  팔 tilt 0→8deg (0.5s, 1회)
 *  0.45s  코인 1 stagger
 *  0.53s  코인 2 stagger
 *  0.80s  중앙 ↔ 심볼 scale-up + glow
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function JeonseVisual() {
  return (
    <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="420" height="240" rx="24" fill={C.sl50} />

      <defs>
        <filter id="j-plate-shadow" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#334155" floodOpacity="0.08" />
        </filter>
        <filter id="j-center-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodColor={C.em500} floodOpacity="0">
            <animate attributeName="floodOpacity" values="0;0.22;0.12" dur="0.4s" fill="freeze" begin="0.8s" />
          </feDropShadow>
        </filter>
        <radialGradient id="j-plate-em" cx="50%" cy="40%">
          <stop offset="0%" stopColor={C.em100} />
          <stop offset="100%" stopColor={C.em200} />
        </radialGradient>
        <radialGradient id="j-plate-sl" cx="50%" cy="40%">
          <stop offset="0%" stopColor={C.sl100} />
          <stop offset="100%" stopColor={C.sl200} />
        </radialGradient>
      </defs>

      {/* 기둥 + 받침 */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <rect x="204" y="90" width="12" height="100" rx="6" fill={C.sl200} />
        <rect x="178" y="182" width="64" height="10" rx="5" fill={C.sl200} />
        <ellipse cx="210" cy="192" rx="38" ry="4" fill={C.sl200} opacity="0.4" />
      </g>

      {/* 팔 + 접시 — 순차 조립 후 tilt */}
      <g>
        {/* tilt: 0→8deg, 1회, 0.5s 후 시작 */}
        <animateTransform attributeName="transform" type="rotate"
          values="0 210 90;8 210 90"
          dur="0.5s" fill="freeze" begin="0.5s"
          calcMode="spline" keySplines={EASE_DRAW} keyTimes="0;1" />

        {/* 팔 바 */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0.15s" />
          <rect x="62" y="84" width="296" height="12" rx="6" fill={C.sl300} />
        </g>

        {/* 왼쪽 접시 (전세) — emerald */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0.25s"
            calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
          <animateTransform attributeName="transform" type="translate" from="0 4" to="0 0" dur="0.3s" fill="freeze" begin="0.25s"
            calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
          <rect x="96" y="96" width="4" height="30" rx="2" fill={C.sl300} />
          <g filter="url(#j-plate-shadow)">
            <ellipse cx="98" cy="132" rx="52" ry="14" fill="url(#j-plate-em)" />
            <ellipse cx="98" cy="130" rx="52" ry="14" fill={C.em100} stroke={C.em300} strokeWidth="1.5" />
          </g>
          <path d="M98 100 L80 114 L116 114 Z" fill={C.em200} stroke={C.em500} strokeWidth="2" strokeLinejoin="round" />
          <rect x="88" y="114" width="20" height="14" rx="3" fill={C.em100} stroke={C.em500} strokeWidth="1.5" />
        </g>

        {/* 코인 stagger */}
        <circle cx="68" cy="124" r="6" fill={C.em200} stroke={C.em400} strokeWidth="1" opacity="0">
          <animate attributeName="opacity" from="0" to="0.5" dur="0.2s" fill="freeze" begin="0.45s" />
        </circle>
        <circle cx="128" cy="122" r="5" fill={C.em200} stroke={C.em400} strokeWidth="1" opacity="0">
          <animate attributeName="opacity" from="0" to="0.4" dur="0.2s" fill="freeze" begin="0.53s" />
        </circle>

        {/* 오른쪽 접시 (월세) — slate, 30% */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="0.3" dur="0.3s" fill="freeze" begin="0.35s"
            calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
          <animateTransform attributeName="transform" type="translate" from="0 4" to="0 0" dur="0.3s" fill="freeze" begin="0.35s"
            calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
          <rect x="318" y="96" width="4" height="24" rx="2" fill={C.sl300} />
          <g filter="url(#j-plate-shadow)">
            <ellipse cx="320" cy="126" rx="48" ry="13" fill="url(#j-plate-sl)" />
            <ellipse cx="320" cy="124" rx="48" ry="13" fill={C.sl100} stroke={C.sl300} strokeWidth="1.5" />
          </g>
          <path d="M320 96 L306 108 L334 108 Z" fill={C.sl200} stroke={C.sl400} strokeWidth="2" strokeLinejoin="round" />
          <rect x="312" y="108" width="16" height="12" rx="2" fill={C.sl100} stroke={C.sl400} strokeWidth="1.5" />
          <circle cx="296" cy="118" r="4" fill={C.sl300} />
          <circle cx="344" cy="118" r="4" fill={C.sl300} />
        </g>
      </g>

      {/* 중앙 ↔ 심볼 — 마지막 안착 */}
      <g filter="url(#j-center-glow)" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0.8s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <animateTransform attributeName="transform" type="scale" from="0.85" to="1" dur="0.35s" fill="freeze" begin="0.8s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <circle cx="210" cy="66" r="24" fill={C.white} />
        <circle cx="210" cy="66" r="24" fill="none" stroke={C.em500} strokeWidth="2.5" />
        <path d="M198 66 L192 66" stroke={C.em600} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M193 63 L190 66 L193 69" stroke={C.em600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M222 66 L228 66" stroke={C.em600} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M227 63 L230 66 L227 69" stroke={C.em600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 4. DSR — 반달 게이지 Hero
 *
 * 타임라인 (~1.1s):
 *  0.00s  배경 글로우 + 트랙 fade (0.3s)
 *  0.10s  진행 아크 draw (0.6s)
 *  0.55s  끝점 노드 scale-up + glow
 *  0.65s  중앙 ✓ scale-up + glow
 *  0.78s  좌측 보조 fade
 *  0.86s  우측 보조 fade
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function DsrVisual() {
  const R = 86;
  const cx = 210, cy = 160;
  const semiCirc = Math.PI * R; // ≈270.2
  const pct = 0.62;
  const progressLen = semiCirc * pct;

  // 끝점 위치: 반달은 180°(왼쪽) → 0°(오른쪽), 위로 볼록
  const endAngleDeg = 180 - 180 * pct; // 68.4°
  const endRad = (endAngleDeg * Math.PI) / 180;
  const endX = cx + R * Math.cos(endRad);
  const endY = cy - R * Math.sin(endRad);

  const arcPath = `M ${cx - R},${cy} A ${R},${R} 0 0,1 ${cx + R},${cy}`;

  return (
    <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="420" height="240" rx="24" fill={C.sl50} />

      <defs>
        <linearGradient id="dsr-prog-grad" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor={C.em300} />
          <stop offset="100%" stopColor={C.em600} />
        </linearGradient>
        <filter id="dsr-float-shadow" x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#334155" floodOpacity="0.10" />
        </filter>
        <filter id="dsr-node-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor={C.em500} floodOpacity="0">
            <animate attributeName="floodOpacity" values="0;0.4;0.22" dur="0.4s" fill="freeze" begin="0.55s" />
          </feDropShadow>
        </filter>
        <filter id="dsr-center-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodColor={C.em500} floodOpacity="0">
            <animate attributeName="floodOpacity" values="0;0.25;0.14" dur="0.4s" fill="freeze" begin="0.65s" />
          </feDropShadow>
        </filter>
      </defs>

      {/* ── 배경 글로우 ── */}
      <ellipse cx={cx} cy={cy - 16} rx="115" ry="88" fill={C.em50} opacity="0">
        <animate attributeName="opacity" from="0" to="0.22" dur="0.3s" fill="freeze" begin="0s" />
      </ellipse>

      {/* ── 바닥 그림자 — floating 효과 ── */}
      <ellipse cx={cx} cy={cy + 10} rx="72" ry="7" fill={C.sl300} opacity="0">
        <animate attributeName="opacity" from="0" to="0.12" dur="0.3s" fill="freeze" begin="0s" />
      </ellipse>

      {/* ── 트랙 (미사용 영역) — 보조이되 형태가 읽히는 수준 ── */}
      <g filter="url(#dsr-float-shadow)" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0s" />
        <path d={arcPath} stroke={C.sl300} strokeWidth="14" fill="none"
          strokeLinecap="round" opacity="0.45" />
      </g>

      {/* ── 진행 아크 (emerald gradient) — draw animation ── */}
      <path d={arcPath} stroke="url(#dsr-prog-grad)" strokeWidth="14" fill="none"
        strokeLinecap="round"
        strokeDasharray={`0 ${semiCirc}`}>
        <animate attributeName="stroke-dasharray"
          from={`0 ${semiCirc}`} to={`${progressLen} ${semiCirc - progressLen}`}
          dur="0.6s" fill="freeze" begin="0.1s"
          calcMode="spline" keySplines={EASE_DRAW} keyTimes="0;1" />
      </path>

      {/* ── 끝점 노드 — 핵심 강조 + glow ── */}
      <g filter="url(#dsr-node-glow)" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.25s" fill="freeze" begin="0.55s" />
        <animateTransform attributeName="transform" type="scale" from="0.82" to="1" dur="0.3s" fill="freeze" begin="0.55s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <circle cx={endX} cy={endY} r="12" fill={C.em500} />
        <circle cx={endX} cy={endY} r="7" fill={C.white} />
      </g>

      {/* ── 중앙 ✓ — 안정 상태 아이콘 ── */}
      <g filter="url(#dsr-center-glow)" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0.65s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <animateTransform attributeName="transform" type="scale" from="0.86" to="1" dur="0.35s" fill="freeze" begin="0.65s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <circle cx={cx} cy={cy - 26} r="30" fill={C.white} />
        <circle cx={cx} cy={cy - 26} r="30" fill="none" stroke={C.em500} strokeWidth="2.5" />
        <path d={`M${cx - 10} ${cy - 26} L${cx - 3} ${cy - 19} L${cx + 12} ${cy - 34}`}
          stroke={C.em600} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* ── 좌측 보조: 소득 (위쪽 화살표) ── */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="0.3" dur="0.25s" fill="freeze" begin="0.78s" />
        <circle cx="78" cy="108" r="16" fill={C.em100} />
        <circle cx="78" cy="108" r="10" fill={C.white} />
        <path d="M75 108 L78 104 L81 108" stroke={C.em500} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={`M94 108 C 104 114, 112 122, ${cx - R + 10} ${cy - 6}`}
          stroke={C.em200} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      </g>

      {/* ── 우측 보조: 부채 (아래쪽 화살표) ── */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="0.3" dur="0.25s" fill="freeze" begin="0.86s" />
        <circle cx="342" cy="108" r="16" fill={C.sl100} />
        <circle cx="342" cy="108" r="10" fill={C.white} />
        <path d="M339 106 L342 110 L345 106" stroke={C.sl400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={`M326 108 C 316 114, 308 122, ${cx + R - 10} ${cy - 6}`}
          stroke={C.sl200} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      </g>
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 5. 주담대 — 구조가 조립되는 느낌
 *
 * 타임라인 (~1.1s):
 *  0.00s  배경 원 fade (0.3s)
 *  0.05s  집 외곽 stroke draw (0.6s)
 *  0.35s  지붕 draw (0.3s)
 *  0.45s  창문+문 fade (0.3s)
 *  0.55s  집 shadow 안정화
 *  0.65s  LTV 원 + 연결선 fade (0.3s → 0.3)
 *  0.75s  DSR 원 + 연결선 fade (0.3s → 0.3)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function MortgageVisual() {
  return (
    <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="420" height="240" rx="24" fill={C.sl50} />

      <defs>
        <filter id="mort-house-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={C.em500} floodOpacity="0">
            <animate attributeName="floodOpacity" values="0;0.18;0.12" dur="0.4s" fill="freeze" begin="0.55s" />
          </feDropShadow>
        </filter>
      </defs>

      {/* 배경 원 */}
      <circle cx="210" cy="108" r="86" fill={C.em50} opacity="0">
        <animate attributeName="opacity" from="0" to="0.25" dur="0.3s" fill="freeze" begin="0s" />
      </circle>

      {/* 집 — stroke draw */}
      <g filter="url(#mort-house-glow)">
        {/* 벽 outline */}
        <path d="M210 38 L142 90 L142 168 L278 168 L278 90 Z" fill={C.white}
          stroke={C.em500} strokeWidth="2" strokeLinejoin="round"
          strokeDasharray="500" strokeDashoffset="500">
          <animate attributeName="stroke-dashoffset" from="500" to="0" dur="0.6s" fill="freeze" begin="0.05s"
            calcMode="spline" keySplines={EASE_DRAW} keyTimes="0;1" />
        </path>

        {/* 지붕 draw */}
        <path d="M132 94 L210 32 L288 94" fill="none"
          stroke={C.em600} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="340" strokeDashoffset="340">
          <animate attributeName="stroke-dashoffset" from="340" to="0" dur="0.3s" fill="freeze" begin="0.35s"
            calcMode="spline" keySplines={EASE_DRAW} keyTimes="0;1" />
        </path>
      </g>

      {/* 창문 + 문 — fade */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0.45s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <rect x="170" y="98" width="24" height="22" rx="5" fill={C.em50} opacity="0.5" />
        <rect x="226" y="98" width="24" height="22" rx="5" fill={C.em50} opacity="0.5" />
        <rect x="196" y="132" width="22" height="36" rx="5" fill={C.em100} />
        <circle cx="213" cy="152" r="2" fill={C.em400} opacity="0.4" />
      </g>

      {/* LTV — 좌측 보조 stagger */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="0.3" dur="0.3s" fill="freeze" begin="0.65s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <circle cx="72" cy="82" r="18" fill={C.em100} />
        <circle cx="72" cy="82" r="12" fill={C.white} />
        <rect x="64" y="79" width="16" height="3" rx="1.5" fill={C.sl200} />
        <rect x="64" y="79" width="10" height="3" rx="1.5" fill={C.em500} />
        <path d="M90 82 C 108 82, 120 88, 142 94" stroke={C.em200} strokeWidth="1" strokeDasharray="4 3" fill="none" />
      </g>

      {/* DSR — 우측 보조 stagger */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="0.3" dur="0.3s" fill="freeze" begin="0.75s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <circle cx="348" cy="82" r="18" fill={C.em100} />
        <circle cx="348" cy="82" r="12" fill={C.white} />
        <circle cx="348" cy="82" r="6" stroke={C.sl200} strokeWidth="2" fill="none" />
        <circle cx="348" cy="82" r="6" stroke={C.em500} strokeWidth="2" fill="none"
          strokeDasharray="38" strokeDashoffset="22" transform="rotate(-90 348 82)" strokeLinecap="round" />
        <path d="M330 82 C 312 82, 300 88, 278 94" stroke={C.em200} strokeWidth="1" strokeDasharray="4 3" fill="none" />
      </g>
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 6. 자동차 — 등장 → 비용 연결 → 안정
 *
 * 타임라인 (~1.0s):
 *  0.00s  도로 fade (0.3s → 0.25)
 *  0.05s  차량 fade + translateY 6→0 (0.4s)
 *  0.45s  ₩ 원 drop -8→0 (0.35s)
 *  0.65s  연결선 1 draw
 *  0.71s  연결선 2
 *  0.77s  연결선 3
 *  0.75s  dot 1 fade
 *  0.81s  dot 2
 *  0.87s  dot 3
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function AutoVisual() {
  return (
    <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="420" height="240" rx="24" fill={C.sl50} />

      <defs>
        <filter id="auto-car-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#334155" floodOpacity="0">
            <animate attributeName="floodOpacity" values="0;0.12;0.08" dur="0.4s" fill="freeze" begin="0.3s" />
          </feDropShadow>
        </filter>
      </defs>

      {/* 도로 */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="0.25" dur="0.3s" fill="freeze" begin="0s" />
        <path d="M0 192 Q 210 156, 420 192" fill={C.sl100} />
        <path d="M0 198 Q 210 162, 420 198" fill="none" stroke={C.sl200} strokeWidth="1.5" strokeDasharray="10 8" />
      </g>

      {/* 차량 — fade + lift */}
      <g filter="url(#auto-car-shadow)" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" fill="freeze" begin="0.05s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <animateTransform attributeName="transform" type="translate" from="0 6" to="0 0" dur="0.4s" fill="freeze" begin="0.05s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <rect x="142" y="120" width="140" height="46" rx="12" fill={C.sl300} />
        <rect x="170" y="94" width="86" height="32" rx="10" fill={C.sl400} opacity="0.7" />
        <rect x="178" y="100" width="32" height="20" rx="5" fill={C.sl200} opacity="0.8" />
        <rect x="216" y="100" width="32" height="20" rx="5" fill={C.sl200} opacity="0.8" />
        <circle cx="180" cy="166" r="16" fill={C.sl400} />
        <circle cx="180" cy="166" r="7" fill={C.sl200} />
        <circle cx="264" cy="166" r="16" fill={C.sl400} />
        <circle cx="264" cy="166" r="7" fill={C.sl200} />
        <rect x="272" y="134" width="8" height="8" rx="3" fill={C.em400} opacity="0.4" />
      </g>

      {/* ₩ 원 — drop */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="0.8" dur="0.3s" fill="freeze" begin="0.45s"
          calcMode="spline" keySplines={EASE_SCALE} keyTimes="0;1" />
        <animateTransform attributeName="transform" type="translate" from="0 -8" to="0 0" dur="0.35s" fill="freeze" begin="0.45s"
          calcMode="spline" keySplines={EASE_DRAW} keyTimes="0;1" />
        <circle cx="210" cy="44" r="16" fill={C.em100} stroke={C.em300} strokeWidth="1" />
        <circle cx="210" cy="44" r="4" fill={C.em500} />
      </g>

      {/* 연결선 — stagger draw */}
      <path d="M200 58 L178 74" stroke={C.em200} strokeWidth="1" strokeLinecap="round" opacity="0"
        strokeDasharray="30" strokeDashoffset="30">
        <animate attributeName="opacity" from="0" to="0.3" dur="0.15s" fill="freeze" begin="0.65s" />
        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.2s" fill="freeze" begin="0.65s" />
      </path>
      <path d="M210 60 L210 74" stroke={C.em200} strokeWidth="1" strokeLinecap="round" opacity="0"
        strokeDasharray="14" strokeDashoffset="14">
        <animate attributeName="opacity" from="0" to="0.3" dur="0.15s" fill="freeze" begin="0.71s" />
        <animate attributeName="stroke-dashoffset" from="14" to="0" dur="0.2s" fill="freeze" begin="0.71s" />
      </path>
      <path d="M220 58 L242 74" stroke={C.em200} strokeWidth="1" strokeLinecap="round" opacity="0"
        strokeDasharray="30" strokeDashoffset="30">
        <animate attributeName="opacity" from="0" to="0.3" dur="0.15s" fill="freeze" begin="0.77s" />
        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.2s" fill="freeze" begin="0.77s" />
      </path>

      {/* dot stagger */}
      <circle cx="178" cy="78" r="3" fill={C.em200} opacity="0">
        <animate attributeName="opacity" from="0" to="0.5" dur="0.2s" fill="freeze" begin="0.75s" />
      </circle>
      <circle cx="210" cy="78" r="3" fill={C.em200} opacity="0">
        <animate attributeName="opacity" from="0" to="0.5" dur="0.2s" fill="freeze" begin="0.81s" />
      </circle>
      <circle cx="242" cy="78" r="3" fill={C.em200} opacity="0">
        <animate attributeName="opacity" from="0" to="0.5" dur="0.2s" fill="freeze" begin="0.87s" />
      </circle>
    </svg>
  );
}

/* ── 매핑 ── */
const VISUAL_MAP = {
  credit: CreditVisual,
  refinance: RefinanceVisual,
  jeonse: JeonseVisual,
  dsr: DsrVisual,
  mortgage: MortgageVisual,
  auto: AutoVisual,
};

export default function HeroVisual({ calculatorId }) {
  const Visual = VISUAL_MAP[calculatorId];
  if (!Visual) return null;
  return (
    <div className="mx-auto mt-12 w-full max-w-lg px-4 sm:mt-14 mb-2 opacity-[0.85]">
      <Visual />
    </div>
  );
}
