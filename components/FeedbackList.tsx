import { getAllFeedback } from '@/app/actions/feedback';
import Image from 'next/image';

export default async function FeedbackList() {
  let feedback: { id: string; satisfaction: string; comment: string | null; screenshot_url: string | null; created_at: string }[] = [];
  let error: string | null = null;

  try {
    feedback = await getAllFeedback();
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return <p className="text-red-400 text-center">Error: {error}</p>;
  }

  if (feedback.length === 0) {
    return <p className="text-center text-gray-500">No feedback yet.</p>;
  }

  return (
    <div className="space-y-6">
      {feedback.map((item) => (
        <div key={item.id} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <p className="font-semibold text-[#D6FE51] capitalize">{item.satisfaction}</p>
          {item.comment && <p className="mt-2 text-gray-300">{item.comment}</p>}
          {item.screenshot_url && (
            <div className="mt-3">
              <a href={item.screenshot_url} target="_blank" rel="noopener noreferrer" className="text-[#D6FE51] hover:underline text-sm">
                View Full Screenshot
              </a>
              <div className="mt-2 relative h-48 w-full rounded overflow-hidden bg-gray-800">
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