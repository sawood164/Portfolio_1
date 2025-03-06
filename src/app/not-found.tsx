import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="mb-4 text-2xl font-bold">404 - Page Not Found</h2>
      <p className="mb-8 text-gray-400">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Return Home
      </Link>
    </div>
  );
}
