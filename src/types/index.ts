export type OSType = 'macos' | 'windows';
export type MobileOSType = 'ios' | 'android';

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  component: string;
  isFullScreen?: boolean;
}

export interface WindowState {
  id: string;
  appId: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: string | number; height: string | number };
}

export interface OSContextType {
  os: OSType;
  mobileOS: MobileOSType;
  toggleOS: () => void;
  toggleMobileOS: () => void;
}

export interface WindowContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (appId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  clearWindows: () => void;
  resetForNewOS: () => void;
  updateWindowPosition: (windowId: string, x: number, y: number) => void;
  updateWindowSize: (windowId: string, width: number | string, height: number | string) => void;
}
