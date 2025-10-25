import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Feedback App',
  description: 'Submit and view feedback',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-xl font-bold mb-2 sm:mb-0">Feedback App</h1>
            <div className="space-x-0 sm:space-x-6 flex flex-col sm:flex-row text-center">
              <Link href="/feedback" className="hover:underline py-1">
                Submit Feedback
              </Link>
              <Link href="/feedback/view" className="hover:underline py-1">
                View Feedback
              </Link>
            </div>
          </div>
        </nav>
        <main className="py-8 px-4">{children}</main>
      </body>
    </html>
  );
}