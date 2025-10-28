// components/FeedbackForm.tsx
'use client';

import { useState, useTransition, useRef } from 'react';
import { submitFeedback } from '@/app/actions/feedback';

export default function FeedbackForm({
  satisfaction,
  onSuccess,
}: {
  satisfaction: string;
  onSuccess?: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null); // ← ADD REF

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!satisfaction) return;

    const formData = new FormData(e.currentTarget);
    formData.set('satisfaction', satisfaction);

    startTransition(async () => {
      const result = await submitFeedback(formData);
      if ('success' in result) {
        setMessage({ type: 'success', text: 'Thank you! Feedback submitted.' });
        formRef.current?.reset(); // ← USE REF
        setPreview(null);
        onSuccess?.();
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-white text-sm font-extralight mb-2">
          Feedback
        </label>
        <textarea
          name="comment"
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 bg-zinc-800 rounded-md text-white text-xs font-extralight placeholder-gray-400 focus:ring-2 focus:ring-[#D6FE51] focus:border-[#D6FE51] transition"
          placeholder="Share your feedback to earn rewards!"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-extralight mb-2">
          Screenshot
        </label>
        <input
          type="file"
          name="screenshot"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-zinc-800 file:text-white file:font-extralight hover:file:bg-[#D6FE51] hover:file:text-black transition"
        />
        {preview && (
          <div className="mt-3">
            <img src={preview} alt="Preview" className="max-h-48 rounded mx-auto border border-gray-700" />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || !satisfaction}
        className="w-full py-3 px-4 bg-[#D6FE51] text-black font-medium rounded-md hover:bg-[#c0e645] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isPending ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {message && (
        <p className={`text-center font-medium ${message.type === 'success' ? 'text-[#D6FE51]' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}
    </form>
  );
}