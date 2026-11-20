import React, { useRef, useEffect } from 'react';

export function WheelColumn({ items, value, onChange, flex = 1 }) {
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const itemHeight = 44;

  const currentIndex = items.indexOf(value);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;

  // On mount or external value change, scroll container to active index
  useEffect(() => {
    if (containerRef.current && !isScrollingRef.current) {
      containerRef.current.scrollTop = activeIndex * itemHeight;
    }
  }, [activeIndex]);

  const handleScroll = (e) => {
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const top = e.target.scrollTop;
    const index = Math.round(top / itemHeight);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, index));

    if (items[clampedIndex] !== value) {
      onChange(items[clampedIndex]);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      // Snap to exact offset
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: clampedIndex * itemHeight,
          behavior: 'smooth'
        });
      }
    }, 120);
  };

  const handleItemClick = (item, idx) => {
    onChange(item);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: idx * itemHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ position: 'relative', flex, height: `${itemHeight * 3}px`, overflow: 'hidden' }}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: '100%',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingTop: `${itemHeight}px`,
          paddingBottom: `${itemHeight}px`,
        }}
      >
        {items.map((item, idx) => {
          const isSelected = item === value;
          return (
            <div
              key={idx}
              onClick={() => handleItemClick(item, idx)}
              style={{
                height: `${itemHeight}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scrollSnapAlign: 'center',
                cursor: 'pointer',
                fontSize: isSelected ? '16.5px' : '14px',
                fontWeight: isSelected ? '800' : '500',
                color: isSelected ? '#1E1B4B' : '#94A3B8',
                transform: isSelected ? 'scale(1.08)' : 'scale(0.92)',
                transition: 'all 0.15s ease',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DateWheelPicker({ day, month, year, onDayChange, onMonthChange, onYearChange }) {
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => String(currentYear - 10 - i));

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '35px',
        padding: '6px 12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
      }}
    >
      {/* Center Highlight Bar matching WhatsApp Image 2026-11-19 at 4.39.05 PM.jpeg */}
      <div
        style={{
          position: 'absolute',
          top: '50px',
          left: '12px',
          right: '12px',
          height: '44px',
          borderRadius: '24px',
          backgroundColor: 'rgba(200, 90, 50, 0.1)',
          border: '1.5px solid rgba(200, 90, 50, 0.35)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', zIndex: 10 }}>
        <WheelColumn items={days} value={day || '14'} onChange={onDayChange} flex={0.8} />
        <WheelColumn items={months} value={month || 'October'} onChange={onMonthChange} flex={1.4} />
        <WheelColumn items={years} value={year || '1980'} onChange={onYearChange} flex={1} />
      </div>
    </div>
  );
}

export function TimeWheelPicker({ hour, minute, ampm, onHourChange, onMinuteChange, onAmPmChange }) {
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const ampmList = ['AM', 'PM'];

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '35px',
        padding: '6px 16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
      }}
    >
      {/* Center Highlight Bar matching WhatsApp Image 2026-11-19 at 4.39.04 PM.jpeg */}
      <div
        style={{
          position: 'absolute',
          top: '50px',
          left: '16px',
          right: '16px',
          height: '44px',
          borderRadius: '24px',
          backgroundColor: 'rgba(200, 90, 50, 0.1)',
          border: '1.5px solid rgba(200, 90, 50, 0.35)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', zIndex: 10 }}>
        <WheelColumn items={hours} value={hour || '12'} onChange={onHourChange} flex={1} />
        <span style={{ fontSize: '18px', fontWeight: '800', color: '#64748B', padding: '0 4px' }}>:</span>
        <WheelColumn items={minutes} value={minute || '00'} onChange={onMinuteChange} flex={1} />
        <WheelColumn items={ampmList} value={ampm || 'AM'} onChange={onAmPmChange} flex={0.9} />
      </div>
    </div>
  );
}
