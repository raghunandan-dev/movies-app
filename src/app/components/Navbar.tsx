import Link from "next/link";
import LoginButton from "./LoginButton";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MoviesHub
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/my-movies" className="hover:text-gray-300">
            My Movies
          </Link>
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}