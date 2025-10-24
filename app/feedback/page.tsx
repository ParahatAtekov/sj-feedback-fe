import FeedbackForm from '@/components/FeedbackForm';

export default function SubmitFeedback() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Submit Your Feedback</h1>
      <FeedbackForm />
    </div>
  );
}