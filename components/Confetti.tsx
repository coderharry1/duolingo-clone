import React from 'react';

const CONFETTI_COUNT = 150;

const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'];

// Fix: Explicitly type ConfettiPiece as a React.FC to resolve the type error with the 'key' prop.
// This clarifies that it's a React component, allowing TypeScript to correctly handle special props like 'key'.
const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="absolute w-2 h-4" style={style}></div>
);

const Confetti = () => {
  const pieces = Array.from({ length: CONFETTI_COUNT }).map((_, index) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}%`,
      backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      animation: `fall ${3 + Math.random() * 3}s linear ${Math.random() * 5}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
      width: `${6 + Math.random() * 8}px`,
      height: `${8 + Math.random() * 10}px`,
    };
    return <ConfettiPiece key={index} style={style} />;
  });

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">{pieces}</div>;
};

export default Confetti;
