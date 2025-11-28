import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export default function MultiSelect({ options = [], selected = [], onChange, placeholder, hoverOpen = true }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
   const dropdownRef = useRef(null);

  // Inline styles provide a fallback when Tailwind isn't loaded
  const styles = {
    button: {
      width: '100%',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 8px',
      fontSize: '12px',
      border: '1px solid #cbd5e1',
      background: '#fff',
      borderRadius: 6,
      height: 30,
      cursor: 'pointer'
    },
    dropdown: {
      position: 'absolute',
      zIndex: 9999,
      left: 0,
      marginTop: 6,
      width: '100%',
      background: '#fff',
      border: '1px solid #d1d5db',
      borderRadius: 6,
      boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
      maxHeight: '260px',
      overflow: 'auto'
    },
    stickyHeader: {
      position: 'sticky',
      top: 0,
      background: '#fff',
      padding: '6px 8px',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    option: {
      padding: '8px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer'
    }
  };

  // close timeout handle for hover behavior
  const closeTimeout = useRef(null);
  const CLOSE_DELAY = 300; // ms

  useEffect(() => {
    function onDocClick(e) {
      // If click is outside both the trigger container and the portal dropdown, close.
      const insideTrigger = containerRef.current && containerRef.current.contains(e.target);
      const insideDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
      if (!insideTrigger && !insideDropdown) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // dropdown position state for portal rendering
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  // update position function available to call before opening to avoid a gap
  const updatePos = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
  };

  useEffect(() => {
    if (open) {
      updatePos();
      window.addEventListener('resize', updatePos);
      window.addEventListener('scroll', updatePos, true);
    }
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [open]);

  // Hover handlers: open on mouse enter, close shortly after mouse leaves both trigger and dropdown
  useEffect(() => {
    if (!hoverOpen) return;
    const trigger = containerRef.current;

    function onTriggerEnter() {
      if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
      // compute position before opening to avoid gap
      updatePos();
      setOpen(true);
    }

    function onTriggerLeave() {
      // start a delayed close; dropdown's mouseenter will cancel
      closeTimeout.current = setTimeout(() => {
        if (!(dropdownRef.current && dropdownRef.current.matches(':hover'))) setOpen(false);
      }, CLOSE_DELAY);
    }

    if (trigger) {
      trigger.addEventListener('mouseenter', onTriggerEnter);
      trigger.addEventListener('mouseleave', onTriggerLeave);
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener('mouseenter', onTriggerEnter);
        trigger.removeEventListener('mouseleave', onTriggerLeave);
      }
      if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
    };
  }, [hoverOpen]);

  // when dropdown portal mounts, attach hover listeners to cancel/restore close timeout
  useEffect(() => {
    if (!open) return;
    const dd = dropdownRef.current;
    if (!dd) return;

    function onDropdownEnter() {
      if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
    }

    function onDropdownLeave() {
      closeTimeout.current = setTimeout(() => {
        // if not hovering trigger either, close
        if (!(containerRef.current && containerRef.current.matches(':hover'))) setOpen(false);
      }, CLOSE_DELAY);
    }

    dd.addEventListener('mouseenter', onDropdownEnter);
    dd.addEventListener('mouseleave', onDropdownLeave);

    return () => {
      dd.removeEventListener('mouseenter', onDropdownEnter);
      dd.removeEventListener('mouseleave', onDropdownLeave);
      if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
    };
  }, [open]);

  const toggleOption = (opt) => {
    const exists = selected.some(s => String(s) === String(opt));
    const next = exists ? selected.filter(s => String(s) !== String(opt)) : [...selected, opt];
    onChange(next);
  };

  const selectAll = () => {
    if (selected.length === options.length) onChange([]);
    else onChange([...options]);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={styles.button}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{ color: '#374151' }}>{selected.length > 0 ? `${selected.length} selected` : placeholder}</span>
        <svg style={{ width: 14, height: 14, color: '#6b7280' }} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.2 8.27a.75.75 0 01.03-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && ReactDOM.createPortal(
          <div
            role="listbox"
            ref={dropdownRef}
            style={{
              ...styles.dropdown,
              position: 'absolute',
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width
            }}
          >
          <div style={styles.stickyHeader}>
            <label style={{ fontSize: 12, color: '#6b7280' }}>Options</label>
            <button type="button" onClick={selectAll} style={{ fontSize: 12, color: '#2563eb', background: 'transparent', border: 'none', cursor: 'pointer' }}>{selected.length === options.length ? 'Unselect All' : 'Select All'}</button>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {options.map((opt, idx) => (
              <li key={opt} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <div
                  role="option"
                  aria-selected={selected.some(s => String(s) === String(opt))}
                  style={{ ...styles.option, background: 'transparent' }}
                  onMouseDown={(e) => {
                    // If user clicked the native checkbox itself, let its onChange handle toggling.
                    const clickedInput = e.target && (e.target.tagName === 'INPUT' || e.target.closest && e.target.closest('input'));
                    if (clickedInput) return;
                    e.preventDefault();
                    toggleOption(opt);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selected.some(s => String(s) === String(opt))}
                    onChange={() => toggleOption(opt)}
                    style={{ width: 16, height: 16 }}
                    tabIndex={-1}
                  />
                  <span style={{ fontSize: 12, color: '#111827' }}>{opt}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>,
        document.body
      )}
    </div>
  );
}
