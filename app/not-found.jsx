import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-6xl md:text-8xl font-bold pt-10">404</h1>
      <div className="relative md:max-w-1/2 h-60 md:h-96 mx-auto">
        <Image
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 animation"
          fill
          className="object-cover rounded-lg"
          priority
          unoptimized
        />
      </div>

      <div className="pb-10">
        <h3 className="text-2xl font-semibold">Looks like you're lost</h3>
        <p className="mt-2 text-gray-500">
          The page you are looking for is not available!
        </p>

        <Link
          href="/"
          className="inline-block mt-5 bg-green-600 text-white py-2 px-5 rounded hover:bg-green-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
}
