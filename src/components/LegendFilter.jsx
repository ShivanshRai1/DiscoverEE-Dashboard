import { useMemo } from 'react';
import { useStore } from '../store/useStore';

const MANUFACTURER_COLORS = [
  '#c0392b', '#e74c3c', '#2980b9', '#3498db', '#27ae60',
  '#2ecc71', '#f39c12', '#f1c40f', '#8e44ad', '#9b59b6',
  '#16a085', '#1abc9c', '#d35400', '#e67e22', '#34495e',
  '#6c5ce7', '#e84393', '#00b894', '#0984e3', '#b2bec3'
];

export function LegendFilter({ manufacturers }) {
  const { hiddenManufacturers, toggleManufacturer } = useStore();

  // Create manufacturer to color mapping
  const manfColorMap = useMemo(() => {
    const map = {};
    manufacturers.forEach((manf, idx) => {
      map[manf] = MANUFACTURER_COLORS[idx % MANUFACTURER_COLORS.length];
    });
    return map;
  }, [manufacturers]);

  const handleToggle = (manf) => {
    toggleManufacturer(manf);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        padding: '12px 10px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottom: '1px solid #e5e7eb',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '11px'
      }}
    >
      {manufacturers.map((manf, idx) => {
        const color = manfColorMap[manf];
        const isHidden = hiddenManufacturers.includes(manf);

        return (
          <div
            key={manf}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle(manf);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                handleToggle(manf);
              }
            }}
            role="button"
            tabIndex={0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              userSelect: 'none',
              opacity: isHidden ? 0.5 : 1,
              transition: 'all 0.2s ease',
              padding: '4px 6px',
              borderRadius: '3px',
              outline: 'none'
            }}
            title={isHidden ? 'Click to show' : 'Click to hide'}
            onMouseEnter={(e) => {
              if (!isHidden) {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* Colored square/border box */}
            <div
              style={{
                width: '14px',
                height: '14px',
                border: `2px solid ${color}`,
                backgroundColor: 'white',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}
            />
            
            {/* Label text with strikethrough if hidden */}
            <span
              style={{
                textDecoration: isHidden ? 'line-through' : 'none',
                color: '#374151',
                whiteSpace: 'nowrap',
                fontWeight: isHidden ? '400' : '500'
              }}
            >
              Manf-{idx + 1}
            </span>
          </div>
        );
      })}
    </div>
  );
}
