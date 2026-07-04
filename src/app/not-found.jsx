import Link from "next/link";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Floating Blobs */}
      <div className="absolute left-20 top-20 h-40 w-40 animate-pulse rounded-full bg-cyan-500/10 blur-2xl" />
      <div className="absolute bottom-20 right-20 h-52 w-52 animate-pulse rounded-full bg-indigo-500/10 blur-2xl" />

      {/* Decorative Dots */}
      <div className="absolute left-12 top-32 h-4 w-4 animate-bounce rounded-full bg-cyan-400" />
      <div className="absolute right-16 top-48 h-3 w-3 animate-ping rounded-full bg-indigo-400" />
      <div className="absolute bottom-32 left-1/3 h-5 w-5 animate-pulse rounded-full bg-white/30" />

      <div className="relative z-10 max-w-xl text-center">
        <h1 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-8xl font-black text-transparent md:text-9xl">
          404
        </h1>

        <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
          <Compass className="h-10 w-10 text-cyan-400" />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          Lost in the Digital World
        </h2>

        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
          >
            <Home size={20} />
            Back Home
          </Link>
        
        </div>        
      </div>
    </main>
  );
}