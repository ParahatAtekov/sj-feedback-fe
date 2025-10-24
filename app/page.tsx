import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6">Welcome to Feedback App</h1>
      <div className="space-x-4">
        <Link href="/feedback" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Submit Feedback
        </Link>
        <Link href="/feedback/view" className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700">
          View All
        </Link>
      </div>
    </div>
  );
}