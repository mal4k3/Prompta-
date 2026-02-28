import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">

      {/* Proper Top Navigation */}
      <div className="flex items-center justify-between px-10 py-5 border-b border-gray-800 bg-[#0f0f10]">
        <div className="text-lg font-semibold tracking-tight">
          Prompta
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/playground" className="hover:text-white transition">
            Console
          </Link>
          <Link href="/analyzer" className="hover:text-white transition">
            Analyzer
          </Link>
          <Link href="/templates" className="hover:text-white transition">
            Templates
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 py-32 max-w-5xl mx-auto">

        {/* Soft Glow */}
        <div className="absolute w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full top-10 -z-10" />

        <h1 className="text-6xl md:text-7xl font-bold tracking-[-0.02em] leading-[1.05] mb-8 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Transform rough ideas into
          <br />
          high-performance AI prompts.
        </h1>

        <p className="text-gray-500 text-xl max-w-3xl mb-12 leading-relaxed">
          Prompta is a precision prompt optimization engine built for
          engineers and technical creators. It converts vague instructions
          into structured, role-based, constraint-driven prompts engineered
          for maximum AI performance.
        </p>

        <Link
          href="/playground"
          className="bg-white text-black px-10 py-5 rounded-2xl font-semibold hover:scale-[1.03] hover:bg-gray-300 transition duration-200 shadow-lg shadow-white/10"
        >
          Launch Prompt Optimizer
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-12 pb-32 max-w-6xl mx-auto">

        <div>
          <h3 className="text-xl font-semibold mb-4 tracking-tight">
            Structured Engineering
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Automatically injects role definition, objectives,
            constraints, formatting logic, and output architecture
            into every optimized prompt.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 tracking-tight">
            Model-Agnostic
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Optimized prompts perform across GPT, Claude, Groq,
            LLaMA, and advanced AI systems without platform lock-in.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 tracking-tight">
            Developer Console
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Minimal, high-contrast interface designed for technical
            workflows and rapid iteration.
          </p>
        </div>

      </div>

    </main>
  );
}