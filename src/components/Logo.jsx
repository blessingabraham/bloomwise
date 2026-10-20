export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="bw-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E05780" /><stop offset="1" stopColor="#8A2846" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#bw-g)" />
      <g transform="translate(32 33)">
        <g fill="#FFF1F4">
          {[0, 72, 144, 216, 288].map((a, i) => (
            <ellipse key={a} cy="-13" rx="8" ry="12.5" opacity={i % 2 ? 0.86 : 0.96} transform={`rotate(${a})`} />
          ))}
        </g>
        <circle r="7.5" fill="#602437" />
        <path d="M-2.6 -3.2 L-5 0 L-2.6 3.2 M2.6 -3.2 L5 0 L2.6 3.2" fill="none" stroke="#FFCAD4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export default function Logo({ size = 36 }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">Bloom<b>wise</b></span>
    </span>
  )
}
