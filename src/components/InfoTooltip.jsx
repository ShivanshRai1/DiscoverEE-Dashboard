import { useState } from 'react';
import ReactDOM from 'react-dom';

export default function InfoTooltip({ content }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const iconRef = useState(null)[0];

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 8,
      left: rect.left + rect.width / 2
    });
    setShow(true);
  };

  return (
    <>
      <span 
        className="inline-block ml-1.5"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
        ref={iconRef}
      >
        <span 
          className="cursor-help text-sm font-bold"
          style={{ color: '#2563eb' }}
          aria-label="More information"
          role="button"
          tabIndex={0}
          onFocus={handleMouseEnter}
          onBlur={() => setShow(false)}
        >
          ⓘ
        </span>
      </span>
      
      {show && ReactDOM.createPortal(
        <div 
          className="fixed z-[9999] text-sm shadow-xl"
          style={{
            top: position.top,
            left: position.left,
            transform: 'translateX(-50%)',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            width: '320px',
            padding: '14px 16px',
            borderRadius: '4px',
            animation: 'fadeIn 0.15s ease-in',
            pointerEvents: 'none',
            lineHeight: '1.5'
          }}
          role="tooltip"
        >
          {content}
          <div 
            className="absolute w-3 h-3 transform rotate-45"
            style={{
              top: '-6px',
              left: '50%',
              marginLeft: '-6px',
              backgroundColor: '#0f172a'
            }}
          />
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
              to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
}
