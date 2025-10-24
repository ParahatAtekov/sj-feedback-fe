'use client';

import { useState, useTransition } from 'react';
import { submitFeedback } from '@/app/actions/feedback';

export default function FeedbackForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ← MOVE THIS FUNCTION TO THE TOP
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitFeedback(formData);
      if ('success' in result) {
        setMessage({ type: 'success', text: 'Feedback submitted!' });
        e.currentTarget.reset();
        setPreview(null);
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Satisfaction</label>
        <select
          name="satisfaction"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select...</option>
          <option value="very disappointed">Very Disappointed</option>
          <option value="somewhat disappointed">Somewhat Disappointed</option>
          <option value="not disappointed">Not Disappointed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Comment (optional)</label>
        <textarea
          name="comment"
          rows={4}
          maxLength={500}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Share your thoughts..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Screenshot (optional)</label>
        <input
          type="file"
          name="screenshot"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}  // ← Now it's defined!
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Preview" className="max-h-48 rounded mx-auto" />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {message && (
        <p className={`text-center font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
    </form>
  );
}