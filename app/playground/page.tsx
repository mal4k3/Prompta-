"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function Playground() {
  const [rawInput, setRawInput] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
const searchParams = useSearchParams();
  const [tone, setTone] = useState("Professional");
  const [format, setFormat] = useState("Structured");
  const [complexity, setComplexity] = useState("Advanced");
  const [temperature, setTemperature] = useState(0.7);

  const handleOptimize = async () => {
    if (!rawInput) {
      alert("Please enter your idea.");
      return;
    }

    try {
      setLoading(true);
      setOptimizedPrompt("");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a professional prompt engineer.

Tone: ${tone}
Output Format: ${format}
Complexity Level: ${complexity}

Rewrite the user's idea into a highly optimized AI prompt.
Do NOT execute the task.
Do NOT generate the final output.
Only output the improved prompt itself.
Make it structured, role-based, constraint-driven, and optimized for maximum AI performance.`,
            },
            {
              role: "user",
              content: rawInput,
            },
          ],
          temperature: temperature,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setOptimizedPrompt("Error: " + data.error);
      } else {
        setOptimizedPrompt(data.response);
      }
    } catch {
      setOptimizedPrompt("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">

      {/* Top Navigation */}
      <div className="flex items-center justify-between px-10 py-5 border-b border-gray-800 bg-[#0f0f10]">
        <div className="text-lg font-semibold tracking-tight">
          Prompta
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/playground" className="hover:text-white transition">
            Console
          </Link>
          <Link href="/analyzer" className="hover:text-white transition">
            Analyzer
          </Link>
        </div>
      </div>

      <div className="p-10">
        <h1 className="text-2xl font-medium mb-10 text-gray-300">
          Prompt Optimization Console
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT PANEL */}
          <div className="flex flex-col gap-5">
            <div className="text-xs text-gray-500 uppercase tracking-widest">
              Raw Instruction
            </div>

            {/* Advanced Controls */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="bg-[#111] border border-gray-800 rounded-lg p-2"
              >
                <option>Professional</option>
                <option>Creative</option>
                <option>Technical</option>
                <option>Persuasive</option>
              </select>

              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="bg-[#111] border border-gray-800 rounded-lg p-2"
              >
                <option>Structured</option>
                <option>Bullet Points</option>
                <option>JSON</option>
                <option>Markdown</option>
              </select>

              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className="bg-[#111] border border-gray-800 rounded-lg p-2"
              >
                <option>Basic</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>

              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) =>
                    setTemperature(parseFloat(e.target.value))
                  }
                />
              </div>
            </div>

            <textarea
              placeholder="Describe what you want the AI to do..."
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              className="bg-[#111] border border-gray-800 rounded-xl p-5 h-72 focus:outline-none focus:border-gray-500 transition text-sm"
            />

            <button
              onClick={handleOptimize}
              disabled={loading}
              className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition disabled:opacity-50"
            >
              {loading ? "Optimizing..." : "Run Optimization"}
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col gap-5">
            <div className="text-xs text-gray-500 uppercase tracking-widest">
              Engine Output
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 min-h-[450px] relative whitespace-pre-wrap text-sm">
              {optimizedPrompt && (
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(optimizedPrompt)
                  }
                  className="absolute top-4 right-4 text-xs bg-white text-black px-3 py-1 rounded-md hover:bg-gray-300 transition"
                >
                  Copy
                </button>
              )}

              {optimizedPrompt ? (
                <p className="text-gray-200 leading-relaxed">
                  {optimizedPrompt}
                </p>
              ) : (
                <p className="text-gray-600">
                  Optimized prompt will appear here.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}