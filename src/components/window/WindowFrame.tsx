'use client';

import React, { useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { useWindows } from '@/context/WindowContext';
import { useOS } from '@/context/OSContext';
import { WindowState } from '@/types';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface WindowFrameProps {
  window: WindowState;
  children: React.ReactNode;
}

const WindowFrame = React.memo(({ window: win, children }: WindowFrameProps) => {
  const { 
    activeWindowId, 
    focusWindow, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    updateWindowPosition, 
    updateWindowSize 
  } = useWindows();
  const { os } = useOS();
  
  const isActive = activeWindowId === win.id;
  const isMac = os === 'macos';

  const [isMobile, setIsMobile] = React.useState(false);
  const [isInteracting, setIsInteracting] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [taskbarHeight] = React.useState(48); // Windows taskbar is 48px (h-12)
  
  // Local state for smooth interaction (Hybrid approach)
  const [localSize, setLocalSize] = React.useState({ width: win.size.width, height: win.size.height });
  const [localPos, setLocalPos] = React.useState({ x: win.position.x, y: win.position.y });

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(globalThis.window.innerWidth < 768);
    checkMobile();
    globalThis.window.addEventListener('resize', checkMobile);
    return () => globalThis.window.removeEventListener('resize', checkMobile);
  }, []);

  // Synchronize local state when global state changes (only when not interacting)
  React.useEffect(() => {
    if (!isInteracting) {
      setLocalSize({ width: win.size.width, height: win.size.height });
      setLocalPos({ x: win.position.x, y: win.position.y });
    }
  }, [win.size, win.position, isInteracting]);

  const handleDrag = useCallback((e: unknown, d: { x: number; y: number }) => {
    // Prevent window from overlapping taskbar (Windows: bottom 48px)
    const maxY = globalThis.window.innerHeight - taskbarHeight - 20; // Leave 20px margin
    const constrainedY = Math.min(d.y, maxY);
    setLocalPos({ x: d.x, y: constrainedY });
  }, [taskbarHeight]);

  const handleDragStart = useCallback(() => {
    setIsInteracting(true);
    focusWindow(win.id);
  }, [win.id, focusWindow]);

  const handleDragStop = useCallback((e: unknown, d: { x: number; y: number }) => {
    setIsInteracting(false);
    if (!win.isMaximized) {
      // Prevent window from overlapping taskbar
      const maxY = globalThis.window.innerHeight - taskbarHeight - 20;
      const constrainedY = Math.min(d.y, maxY);
      updateWindowPosition(win.id, d.x, constrainedY);
    }
  }, [win.id, win.isMaximized, updateWindowPosition, taskbarHeight]);

  const handleResize = useCallback((e: unknown, direction: string, ref: HTMLElement, delta: { height: number; width: number }, position: { x: number; y: number }) => {
    setLocalSize({ width: ref.offsetWidth, height: ref.offsetHeight });
    setLocalPos(position);
    setIsResizing(true);
  }, []);

  const handleResizeStart = useCallback(() => {
    setIsInteracting(true);
    setIsResizing(true);
    focusWindow(win.id);
  }, [win.id, focusWindow]);

  const handleResizeStop = useCallback((e: unknown, direction: string, ref: HTMLElement, delta: { height: number; width: number }, position: { x: number; y: number }) => {
    setIsInteracting(false);
    setIsResizing(false);
    if (!win.isMaximized) {
      updateWindowSize(win.id, ref.offsetWidth, ref.offsetHeight);
      updateWindowPosition(win.id, position.x, position.y);
    }
  }, [win.id, win.isMaximized, updateWindowSize, updateWindowPosition]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(win.id);
  }, [win.id, closeWindow]);

  const handleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(win.id);
  }, [win.id, minimizeWindow]);

  const handleMaximize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    maximizeWindow(win.id);
  }, [win.id, maximizeWindow]);

  if (isMobile) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed inset-0 z-[100] bg-[#121212] flex flex-col pointer-events-auto"
        onPointerDown={() => focusWindow(win.id)}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0 pt-4 bg-[#1a1a1a]">
          <span className="text-white font-black tracking-tighter text-sm uppercase opacity-40">{win.appId}</span>
          <button 
            onClick={handleClose} 
            className="p-2 bg-white/10 rounded-full active:scale-90 transition-transform"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto w-full h-full bg-[#121212]">
          {children}
        </div>
        <div className="h-10 flex items-center justify-center shrink-0">
             <div className="w-32 h-1.5 bg-white/10 rounded-full" />
        </div>
      </motion.div>
    );
  }

  const width = win.isMaximized ? '100vw' : localSize.width;
  const height = win.isMaximized ? (isMac ? 'calc(100vh - 30px)' : 'calc(100vh - 48px)') : localSize.height;
  const x = win.isMaximized ? 0 : localPos.x;
  const y = win.isMaximized ? (isMac ? 30 : 0) : localPos.y;

  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      onResizeStop={handleResizeStop}
      resizeHandleClasses={{
        bottomRight: 'resize-handle-br',
        bottomLeft: 'resize-handle-bl',
        topRight: 'resize-handle-tr',
        topLeft: 'resize-handle-tl',
        right: 'resize-handle-r',
        left: 'resize-handle-l',
        top: 'resize-handle-t',
        bottom: 'resize-handle-b',
      }}
      enableResizing={!win.isMaximized ? {
        bottom: true, bottomLeft: true, bottomRight: true,
        left: true, right: true, top: true, topLeft: true, topRight: true
      } : false}
      disableDragging={win.isMaximized}
      bounds="parent"
      dragHandleClassName="handle"
      minWidth={400}
      minHeight={300}
      maxWidth={isMac ? "100vw" : "100vw"}
      maxHeight={isMac ? "calc(100vh - 30px)" : "calc(100vh - 48px)"}
      style={{ 
        zIndex: win.zIndex,
        willChange: isResizing || isInteracting ? 'transform, width, height' : 'auto',
      }}
      className={`flex flex-col overflow-hidden pointer-events-auto relative group
        ${isInteracting ? 'select-none !transition-none' : 'transition-all duration-300'} 
        ${isActive ? 'shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] scale-[1.002]' : 'shadow-xl brightness-90'} 
        ${isMac ? 'rounded-2xl border border-white/20 bg-[#1c1c1c]/80 backdrop-blur-[40px]' : 'rounded-sm border border-white/10 bg-[#202020]/98 backdrop-blur-3xl'}`}
      onPointerDown={() => focusWindow(win.id)}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="flex flex-col h-full w-full"
      >
        {/* Title Bar */}
        <div 
          className={`handle h-11 flex items-center shrink-0 cursor-default px-4 relative select-none ${isMac ? 'justify-start' : 'justify-between bg-white/[0.02]'}`}
        >
          {isMac ? (
            <div className="flex gap-2 z-20">
              <button
                 onClick={handleClose}
                 className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-black/10 flex items-center justify-center group"
              >
                  <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                 onClick={handleMinimize}
                 className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-black/10 flex items-center justify-center group"
              >
                  <Minus size={10} className="text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                  onClick={handleMaximize}
                  className="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-black/10 flex items-center justify-center group"
              >
                  <Maximize2 size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-white/50 tracking-widest ml-1 uppercase">
                {win.appId}
              </span>
            </div>
          )}

          {isMac && (
              <div className="absolute left-1/2 -translate-x-1/2 text-[13px] font-bold text-white/40 tracking-tight pointer-events-none">
                  {win.appId.charAt(0).toUpperCase() + win.appId.slice(1)}
              </div>
          )}

          {!isMac && (
            <div className="flex h-full -mr-4">
              <button
                 onClick={handleMinimize}
                 className="w-12 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                  <Minus size={16} className="text-white/60" />
              </button>
              <button
                  onClick={handleMaximize}
                  className="w-12 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                  <Square size={11} className="text-white/60" />
              </button>
              <button
                  onClick={handleClose}
                  className="w-14 h-full flex items-center justify-center hover:bg-[#e81123] transition-colors"
              >
                  <X size={18} className="text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Content Area - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative w-full h-full bg-black/5">
          {isInteracting && (
            <div className="absolute inset-0 z-50 bg-transparent cursor-inherit" />
          )}
          {children}
        </div>

          {!win.isMaximized && !isMobile && isResizing && (
            <div className="absolute bottom-0 right-0 pointer-events-none z-30">
              <div className="relative w-6 h-6 p-1">
                <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-blue-500/60 rounded-sm opacity-75" />
              </div>
            </div>
          )}
        </motion.div>
      </Rnd>
    );
});

WindowFrame.displayName = 'WindowFrame';
export default WindowFrame;
