'use client';

import { Feedback } from '@/types/feedback';
import Image from 'next/image';
import { memo } from 'react';

interface FeedbackListClientProps {
  feedback: Feedback[];
}

 

export const FeedbackListClient = memo(function FeedbackListClient({ feedback }: FeedbackListClientProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {feedback.map((item) => (
        <div key={item.id} className="bg-white p-6 rounded-lg shadow">
          <p className="font-semibold capitalize">{item.satisfaction}</p>
          {item.comment && <p className="mt-2 text-gray-700">{item.comment}</p>}
          {item.screenshot_url && (
            <div className="mt-3">
              <a href={item.screenshot_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                View Full Screenshot
              </a>
              <div className="mt-2 relative h-48 w-full rounded overflow-hidden bg-gray-50">
                <Image
                  src={item.screenshot_url || ''}
                  alt="Feedback screenshot"
                  fill
                  className="object-contain"
                  loading="lazy"
                  // onError removed to avoid parser issues; image failures will simply show broken image.
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>
            </div>
          )}
          <p className="mt-3 text-sm text-gray-500">
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date(item.created_at))}
          </p>
        </div>
      ))}
    </div>
  );
});