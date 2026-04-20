const QrSvg = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="160" fill="white" rx="12"/>
    <rect x="10" y="10" width="60" height="60" fill="none" stroke="#1a3a6e" strokeWidth="5" rx="4"/>
    <rect x="90" y="10" width="60" height="60" fill="none" stroke="#1a3a6e" strokeWidth="5" rx="4"/>
    <rect x="10" y="90" width="60" height="60" fill="none" stroke="#1a3a6e" strokeWidth="5" rx="4"/>
    <rect x="22" y="22" width="36" height="36" fill="#1a3a6e" rx="2"/>
    <rect x="102" y="22" width="36" height="36" fill="#1a3a6e" rx="2"/>
    <rect x="22" y="102" width="36" height="36" fill="#1a3a6e" rx="2"/>
    <rect x="30" y="30" width="20" height="20" fill="white" rx="1"/>
    <rect x="110" y="30" width="20" height="20" fill="white" rx="1"/>
    <rect x="30" y="110" width="20" height="20" fill="white" rx="1"/>
    <rect x="36" y="36" width="8" height="8" fill="#1a3a6e"/>
    <rect x="116" y="36" width="8" height="8" fill="#1a3a6e"/>
    <rect x="36" y="116" width="8" height="8" fill="#1a3a6e"/>
    {[90,98,106,114,122,130,138].map((x, i) =>
      [90,98,106,114,122,130,138].map((y, j) => {
        const pattern = [
          [1,0,1,1,0,1,0],
          [0,1,1,0,1,0,1],
          [1,1,0,1,1,1,0],
          [1,0,1,0,0,1,1],
          [0,1,0,1,1,0,1],
          [1,1,1,0,1,1,0],
          [0,0,1,1,0,1,1],
        ];
        return pattern[i][j]
          ? <rect key={`${i}-${j}`} x={x} y={y} width="6" height="6" fill="#1a3a6e" rx="1"/>
          : null;
      })
    )}
    <text x="80" y="85" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1a3a6e" fontFamily="serif">PAMA</text>
  </svg>
);

export default QrSvg;
