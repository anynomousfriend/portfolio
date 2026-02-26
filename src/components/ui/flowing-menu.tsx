'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export interface FlowingMenuItemData {
  text: string;
  image?: string;
  coverImage?: string;
}

interface FlowingMenuProps {
  items: FlowingMenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  onHover?: (index: number | null) => void;
  onClick?: (index: number) => void;
  activeIndex?: number | null;
}

interface MenuItemProps extends FlowingMenuItemData {
  index: number;
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
  isActive: boolean;
  onHover?: (index: number | null) => void;
  onClick?: (index: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  text,
  image,
  coverImage,
  index,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
  isActive,
  onHover,
  onClick,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);
  // Track whether a touch interaction triggered the marquee so we can
  // dismiss it correctly when the row is tapped again (toggle).
  const touchActiveRef = useRef(false);
  const displayImage = coverImage || image;

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const showMarquee = (edge: 'top' | 'bottom') => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const hideMarquee = (edge: 'top' | 'bottom') => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };
    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, displayImage]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;
      if (animationRef.current) animationRef.current.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    };
    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) animationRef.current.kill();
    };
  }, [text, displayImage, repetitions, speed]);

  // Dismiss marquee highlight when this row is deactivated externally
  // (e.g. another row was tapped on mobile).
  useEffect(() => {
    if (!isActive && touchActiveRef.current) {
      touchActiveRef.current = false;
      hideMarquee('bottom');
    }
  }, [isActive]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    showMarquee(edge);
    onHover?.(index);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    hideMarquee(edge);
    onHover?.(null);
  };

  // Touch: tap to toggle. Plays the same marquee animation so it feels
  // identical to the desktop hover — just triggered by finger instead.
  const handleTouchStart = (ev: React.TouchEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const touch = ev.touches[0];
    const rect = itemRef.current.getBoundingClientRect();

    if (isActive && touchActiveRef.current) {
      // Second tap on the same active row — collapse it
      touchActiveRef.current = false;
      hideMarquee('bottom');
      onHover?.(null);
      onClick?.(index); // still fire onClick so accordion can close
    } else {
      // New tap — expand this row
      touchActiveRef.current = true;
      const edge = findClosestEdge(touch.clientX - rect.left, touch.clientY - rect.top, rect.width, rect.height);
      showMarquee(edge);
      onHover?.(index);
      onClick?.(index);
    }
  };

  return (
    <div
      className="flex-1 relative overflow-hidden text-center cursor-pointer select-none"
      ref={itemRef}
      style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={() => onClick?.(index)}
    >
      <div
        className="flex items-center justify-center h-full relative uppercase font-semibold text-[3.5vh] transition-colors duration-300"
        style={{ color: isActive ? '#6366f1' : textColor }}
      >
        {text}
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="h-full w-fit flex" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div className="marquee-part flex items-center flex-shrink-0" key={idx} style={{ color: marqueeTextColor }}>
              <span className="whitespace-nowrap uppercase font-normal text-[3.5vh] leading-[1] px-[1vw]">{text}</span>
              {displayImage && (
                <div
                  className="w-[180px] h-[7vh] my-[1.5em] mx-[2vw] rounded-[40px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${displayImage})` }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = '#a1a1aa',
  bgColor = 'transparent',
  marqueeBgColor = '#6366f1',
  marqueeTextColor = '#ffffff',
  borderColor = '#27272a',
  onHover,
  onClick,
  activeIndex = null,
}) => {
  return (
    <div className="w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            index={idx}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
            isActive={activeIndex === idx}
            onHover={onHover}
            onClick={onClick}
          />
        ))}
      </nav>
    </div>
  );
};

export default FlowingMenu;
