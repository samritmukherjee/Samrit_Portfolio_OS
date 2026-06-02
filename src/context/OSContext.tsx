'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { OSType, MobileOSType, OSContextType } from '@/types';

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [os, setOs] = useState<OSType>('macos');
  const [mobileOS, setMobileOS] = useState<MobileOSType>('ios');

  useEffect(() => {
    const handleMount = async () => {
      const savedOS = localStorage.getItem('samrit-os-pref') as OSType;
      const savedMobileOS = localStorage.getItem('samrit-mobile-os-pref') as MobileOSType;
      if (savedOS) setOs(savedOS);
      if (savedMobileOS) setMobileOS(savedMobileOS);
    };
    handleMount();
  }, []);

  const toggleOS = () => {
    const newOS = os === 'macos' ? 'windows' : 'macos';
    setOs(newOS);
    localStorage.setItem('samrit-os-pref', newOS);
  };

  const toggleMobileOS = () => {
    const newMobileOS = mobileOS === 'ios' ? 'android' : 'ios';
    setMobileOS(newMobileOS);
    localStorage.setItem('samrit-mobile-os-pref', newMobileOS);
  };

  return (
    <OSContext.Provider value={{ os, mobileOS, toggleOS, toggleMobileOS }}>
      <div
        className={
          os === 'macos'
            ? mobileOS === 'ios'
              ? 'font-macos max-md:font-ios'
              : 'font-macos max-md:font-android'
            : mobileOS === 'ios'
              ? 'font-windows max-md:font-ios'
              : 'font-windows max-md:font-android'
        }
      >
        {children}
      </div>
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
}
