export default function IconLogo({
  backgroundColor = 'transparent',
  foregroundColor = 'var(--accents-1)',
  ...props
}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 38 38"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={{
        fillRule: 'evenodd',
        clipRule: 'nonzero',
        strokeMiterlimit: 10,
        filter: 'drop-shadow(0.05rem 0.05rem 0.5rem rgba(117, 121, 255, 0.7))'
      }}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#b224ef', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#7579ff', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M19,30C16.958,30 15.044,29.44 13.404,28.468C12.488,28.821 11.561,29 10.642,29C5.946,29 4.32,25.847 2.886,23.064C2.227,21.788 1.606,20.582 0.731,19.707L0.023,19L0.73,18.293C1.605,17.418 2.226,16.212 2.885,14.936C4.319,12.153 5.945,9 10.642,9C11.561,9 12.489,9.179 13.405,9.532C15.045,8.559 16.958,8 19,8C21.041,8 22.955,8.559 24.595,9.532C25.512,9.179 26.439,9 27.358,9C32.054,9 33.68,12.153 35.115,14.936C35.773,16.213 36.394,17.418 37.269,18.293L37.977,19L37.27,19.707C36.395,20.582 35.774,21.788 35.116,23.064C33.681,25.847 32.055,29 27.358,29C26.439,29 25.512,28.821 24.595,28.468C22.955,29.44 21.042,30 19,30ZM19,12C15.141,12 12,15.141 12,19C12,22.861 15.141,26 19,26C22.861,26 26,22.861 26,19C26,15.141 22.861,12 19,12Z"
        style={{ fill: 'rgba(132,94,246, 0)', fillRule: 'nonzero' }}
      />
      <path
        d="M29,19C29,24.522 24.522,29 19,29C13.477,29 9,24.522 9,19C9,13.477 13.477,9 19,9C24.522,9 29,13.477 29,19ZM13.487,10.651C12.595,10.244 11.643,10 10.642,10C4.558,10 4.438,16 1.438,19C4.438,22 4.558,28 10.642,28C11.645,28 12.599,27.755 13.493,27.346M24.508,27.346C25.401,27.755 26.355,28 27.358,28C33.442,28 33.562,22 36.562,19C33.562,16 33.442,10 27.358,10C26.357,10 25.405,10.244 24.512,10.651M10.341,14L19.252,28.994M27.659,14.001L10.341,14.001M19.251,28.994L27.659,14.001"
        style={{
          fill: 'none',
          fillRule: 'nonzero',
          stroke: 'url(#grad1)',
          strokeWidth: '2px'
        }}
      />
    </svg>
  );
}