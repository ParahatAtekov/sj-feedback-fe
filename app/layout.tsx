import './globals.css';
import Link from 'next/link';
import { FeedbackProvider } from '@/components/FeedbackProvider';
import FeedbackButton from '@/components/FeedbackButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ADD THIS LINE */}
      <body className="bg-black text-white min-h-screen" suppressHydrationWarning>
        <FeedbackProvider>
          <nav className="bg-gray-900 border-b border-[#D6FE51] p-4">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-xl font-bold text-[#D6FE51] mb-2 sm:mb-0">
                Feedback App
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
                <Link href="/feedback/view" className="text-gray-300 hover:text-white transition">
                  View Feedback
                </Link>
                <FeedbackButton />
              </div>
            </div>
          </nav>
          <main className="py-8 px-4">{children}</main>
        </FeedbackProvider>
      </body>
    </html>
  );
}