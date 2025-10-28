// app/feedback/view/page.tsx
import FeedbackList from '@/components/FeedbackList';
import FeedbackButton from '@/components/FeedbackButton';

export default function ViewFeedback() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">All Feedback</h1>
        <FeedbackButton />
      </div>
      <FeedbackList />
    </div>
  );
}