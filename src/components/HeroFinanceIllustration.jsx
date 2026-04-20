export default function HeroFinanceIllustration({ className = "" }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 420"
        className="h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="262" cy="366" rx="190" ry="24" fill="rgba(10,22,40,0.16)" />

        <rect x="54" y="112" width="118" height="118" rx="18" fill="#F4EBDD" />
        <circle cx="86" cy="145" r="15" stroke="#183153" strokeWidth="5" />
        <path d="M86 132V158" stroke="#183153" strokeWidth="5" strokeLinecap="round" />
        <path d="M74 145H98" stroke="#183153" strokeWidth="5" strokeLinecap="round" />
        <path d="M78 186H148" stroke="#183153" strokeWidth="6" strokeLinecap="round" />
        <path d="M78 204H126" stroke="#183153" strokeWidth="6" strokeLinecap="round" />
        <path d="M78 219H112" stroke="#183153" strokeWidth="6" strokeLinecap="round" />

        <rect x="62" y="244" width="86" height="72" rx="14" fill="#F07F5A" />
        <path d="M95 267L95 293L118 280L95 267Z" fill="#FFF8F0" />
        <rect x="62" y="302" width="86" height="14" fill="#183153" />
        <rect x="72" y="307" width="44" height="4" rx="2" fill="#F4EBDD" />

        <rect x="186" y="58" width="148" height="262" rx="34" fill="#183153" />
        <rect x="200" y="72" width="120" height="234" rx="24" fill="#FFFDF8" />
        <rect x="233" y="58" width="54" height="16" rx="8" fill="#183153" />

        <path
          d="M226 146C239 131 248 154 261 139C274 124 281 151 293 135C301 124 309 116 320 118"
          stroke="#F07F5A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="314" cy="114" r="8" fill="#F07F5A" />
        <path d="M226 176H294" stroke="#183153" strokeWidth="5" strokeLinecap="round" />
        <rect x="222" y="194" width="82" height="24" rx="8" fill="#F4EBDD" />
        <path d="M226 242H292" stroke="#183153" strokeWidth="6" strokeLinecap="round" />
        <path d="M226 260H280" stroke="#183153" strokeWidth="6" strokeLinecap="round" />
        <path d="M226 278H258" stroke="#183153" strokeWidth="6" strokeLinecap="round" />

        <rect x="364" y="112" width="102" height="166" rx="18" fill="#F07F5A" />
        <rect x="392" y="136" width="42" height="42" rx="6" stroke="#183153" strokeWidth="4" />
        <path d="M413 136V178" stroke="#183153" strokeWidth="4" />
        <path d="M392 157H434" stroke="#183153" strokeWidth="4" />
        <rect x="384" y="194" width="64" height="44" rx="10" fill="#183153" />
        <path d="M400 216H400.5" stroke="#FFFDF8" strokeWidth="6" strokeLinecap="round" />
        <path d="M412 210V222" stroke="#FFFDF8" strokeWidth="6" strokeLinecap="round" />
        <path d="M424 205V227" stroke="#FFFDF8" strokeWidth="6" strokeLinecap="round" />
        <path d="M436 212V220" stroke="#FFFDF8" strokeWidth="6" strokeLinecap="round" />
        <path d="M388 252H438" stroke="#183153" strokeWidth="6" strokeLinecap="round" />
        <path d="M388 268H426" stroke="#183153" strokeWidth="6" strokeLinecap="round" />

        <circle cx="343" cy="76" r="4" fill="#F07F5A" opacity="0.9" />
        <circle cx="355" cy="88" r="2.5" fill="#D9E4F2" opacity="0.8" />
      </svg>
    </div>
  );
}
