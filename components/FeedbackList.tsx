import { getAllFeedback } from '@/app/actions/feedback';
import { Feedback } from '@/types/feedback';
import { FeedbackListClient } from './FeedbackListClient';

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

  return <FeedbackListClient feedback={feedback} />;
}