import React, { useLayoutEffect, useRef, useState } from 'react';

export default function Logo({ height = 64, className = '' }) {
  const discRef = useRef(null);
  const [positions, setPositions] = useState({ circleX: 152, verX: 192 });

  useLayoutEffect(() => {
    const measure = () => {
      const disc = discRef.current;
      if (!disc) return false;

      // Use getComputedTextLength for accurate SVG text width measurement
      let textLen = 0;
      try {
        textLen = Math.round(disc.getComputedTextLength());
      } catch (e) {
        // fallback to getBBox if method unavailable
        const bbox = disc.getBBox();
        textLen = Math.round(bbox.width || 120);
      }

      const spacing = 6; // space between disc and circle
      const circleR = 12; // circle radius used in SVG

      const circleX = Math.round(textLen + spacing);
      const verX = Math.round(circleX + circleR * 2 + spacing);

      setPositions({ circleX, verX });
      return true;
    };

    // First try after layout
    if (!measure()) {
      // Try again after fonts load (if supported)
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => measure());
      }
      // Final fallback: retry shortly
      setTimeout(measure, 150);
    }
  }, []);

  const { circleX, verX } = positions;

  return (
    <svg
      className={className}
      width="auto"
      height={height}
      viewBox="0 0 420 96"
      preserveAspectRatio="xMinYMid"
      role="img"
      aria-label="DiscoverEE logo"
    >
      <style>{`.logo-text{font-family: 'Helvetica Neue', Arial, sans-serif; font-weight:800; font-size:64px; fill:#000;}`}</style>

      {/* 'Disc' */}
      <text className="logo-text" x="0" y="68" ref={discRef} id="discText">Disc</text>

      {/* circle - positioned using measured text length */}
      <g transform={`translate(${circleX},18)`}>
        <circle cx="0" cy="34" r="12" fill="#e33" />
        <circle cx="0" cy="34" r="6" fill="#fff" />
      </g>

      {/* 'verEE' - positioned after the circle */}
      <text className="logo-text" x={verX} y="68">verEE</text>
    </svg>
  );
}
