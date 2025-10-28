'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import FeedbackModal from './FeedbackModal';

const FeedbackContext = createContext<{
  open: () => void;
}>({ open: () => {} });

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <FeedbackContext.Provider value={{ open }}>
      {children}
      <FeedbackModal isOpen={isOpen} onClose={close} />
    </FeedbackContext.Provider>
  );
}

export const useFeedback = () => useContext(FeedbackContext);