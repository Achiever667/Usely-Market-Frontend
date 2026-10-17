'use client';

import * as React from 'react';

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  /** True when the viewport is narrower than the lg breakpoint (1024 px) */
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

/** lg breakpoint — must match Tailwind's default (1024 px) */
const LG_BREAKPOINT = 1024;

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  /**
   * SSR-safe initialisation:
   *   • Server / first render → false (avoids hydration mismatch)
   *   • After mount → true on lg screens, false on smaller screens
   */
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);

    const apply = (matches: boolean) => {
      setIsMobile(!matches);
      setOpen(matches); // open on lg, closed on sm/md
    };

    // Immediately apply the correct initial state on the client
    apply(mql.matches);

    const onChange = (e: MediaQueryListEvent) => apply(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const toggle = React.useCallback(() => setOpen((v) => !v), []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within a SidebarProvider');
  return ctx;
}
