// app/page.tsx
import FeedbackButton from '@/components/FeedbackButton';

export default function Home() {
  return (
    <div className="text-center py-20 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-6">
        Welcome to Feedback App
      </h1>
      <p className="text-gray-400 mb-8">
        Share your experience in seconds. We value your feedback!
      </p>
      <FeedbackButton />
    </div>
  );
}