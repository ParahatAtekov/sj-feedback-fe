import { getAllFeedback } from '@/app/actions/feedback';
import { Feedback } from '@/types/feedback';
import Image from 'next/image';

export default async function FeedbackList() {
  let feedback: Feedback[] = [];
  let error: string | null = null;

  try {
    feedback = await getAllFeedback();
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (feedback.length === 0) {
    return <p className="text-center text-gray-500">No feedback yet.</p>;
  }

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
                  src={item.screenshot_url}
                  alt="Feedback screenshot"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
          <p className="mt-3 text-sm text-gray-500">
            {new Date(item.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}