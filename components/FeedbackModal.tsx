// components/FeedbackModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import FeedbackForm from './FeedbackForm';
import { createPortal } from 'react-dom';

export default function FeedbackModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const options = [
    { value: 'very disappointed', label: 'Very Disappointed' },
    { value: 'somewhat disappointed', label: 'Somewhat Disappointed' },
    { value: 'not disappointed', label: 'Not Disappointed' },
  ];

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="relative bg-black border border-[#D6FE51] rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Submit Feedback
          </h2>

          {/* Satisfaction Prompt */}
          <p className="text-white text-center mb-6">
            Would you be disappointed if you couldn’t use <span className="font-semibold">stablejack</span> anymore?
          </p>

          {/* Satisfaction Options (Squares) */}
          <div className="flex justify-center gap-8 mb-8">
            {options.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selected === opt.value}
                  onChange={() => setSelected(opt.value)}
                  className="sr-only peer"
                />
                <div
                  className={`
                    w-6 h-6 border-2 flex items-center justify-center
                    peer-checked:bg-[#D6FE51] peer-checked:border-[#D6FE51]
                    border-white transition-all
                  `}
                >
                  {selected === opt.value && (
                    <div className="w-3 h-3 bg-black rounded-sm" />
                  )}
                </div>
                <span className="ml-2 text-white text-sm">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>

          {/* Pass selected satisfaction to form */}
          <FeedbackForm satisfaction={selected} onSuccess={onClose} />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}