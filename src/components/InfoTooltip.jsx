import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function InfoTooltip({ content, placement = 'below' }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  useEffect(() => {
    if (show && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2
      });
    }
  }, [show]);

  return (
    <>
      <span 
        ref={iconRef}
        className="inline-block ml-1 cursor-help"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ color: '#2563eb', fontSize: '16px', fontWeight: 'bold' }}
      >
        ⓘ
      </span>
      
      {show && createPortal(
        <div 
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: placement === 'above' 
              ? 'translate(-50%, calc(-100% - 10px))' 
              : 'translate(-50%, 10px)',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            width: '280px',
            padding: '10px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            zIndex: 999999,
            lineHeight: '1.5',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            whiteSpace: 'normal',
            textAlign: 'left',
            pointerEvents: 'none'
          }}
        >
          {content}
          <div 
            style={{
              position: 'absolute',
              [placement === 'above' ? 'bottom' : 'top']: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '10px',
              height: '10px',
              backgroundColor: '#0f172a',
              ...(placement === 'above' 
                ? { borderRight: '1px solid rgba(255, 255, 255, 0.2)', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }
                : { borderLeft: '1px solid rgba(255, 255, 255, 0.2)', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }
              )
            }}
          />
        </div>,
        document.body
      )}
    </>
  );
}
