'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// Native modal behavior contains keyboard focus, supports Escape, and restores
// focus to the opening control when the drawer is dismissed.
export function PrototypeDrawer({ label, onClose, children }: { label: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    element?.showModal();
    element?.querySelector<HTMLButtonElement>('aside button')?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="prototype-drawer" aria-label={label} onCancel={onClose}>
    <button type="button" className="prototype-drawer-scrim" aria-label={`Dismiss ${label}`} onClick={onClose} tabIndex={-1} />
    {children}
  </dialog>;
}
