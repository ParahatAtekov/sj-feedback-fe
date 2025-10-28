// components/FeedbackButton.tsx
'use client';

import { useFeedback } from './FeedbackProvider';

export default function FeedbackButton() {
  const { open } = useFeedback();

  return (
    <button
      onClick={open}
      className="bg-[#D6FE51] text-black px-6 py-2 rounded-md font-medium text-sm hover:bg-[#c0e645] transition"
    >
      Give Feedback
    </button>
  );
}