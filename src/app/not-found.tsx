import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto py-12 sm:py-16 md:py-20">
          {/* 404 Number */}
          <h1 className="text-8xl sm:text-9xl md:text-[150px] font-bold text-black mb-4 sm:mb-6">
            404
          </h1>
          
          {/* Error Message */}
          <h2 className="h2 font-semibold text-gray-900 mb-4 sm:mb-6">
            Page Not Found
          </h2>
          
          {/* Description */}
          <p className="para text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
          </p>
          
          {/* Back to Home Button */}
          <div className="flex justify-center">
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

