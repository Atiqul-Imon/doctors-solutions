import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  isTouchDevice: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    deviceType: 'desktop',
    isTouchDevice: false,
    isPortrait: false,
    isLandscape: true,
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isPortrait = height > width;
      const isLandscape = width > height;

      let deviceType: DeviceType = 'desktop';
      let isMobile = false;
      let isTablet = false;
      let isDesktop = false;

      // Mobile: < 768px
      if (width < 768) {
        deviceType = 'mobile';
        isMobile = true;
      }
      // Tablet: 768px - 1024px
      else if (width >= 768 && width < 1024) {
        deviceType = 'tablet';
        isTablet = true;
      }
      // Desktop: >= 1024px
      else {
        deviceType = 'desktop';
        isDesktop = true;
      }

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        isTouchDevice,
        isPortrait,
        isLandscape,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return deviceInfo;
}

// Hook for responsive values
export function useResponsiveValue<T>(
  mobileValue: T,
  tabletValue: T,
  desktopValue: T
): T {
  const { isMobile, isTablet } = useDevice();

  if (isMobile) return mobileValue;
  if (isTablet) return tabletValue;
  return desktopValue;
}
