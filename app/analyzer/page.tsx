"use client";

import { useState } from "react";
import Link from "next/link";

export default function Analyzer() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input) {
      alert("Please enter a prompt to analyze.");
      return;
    }

    try {
      setLoading(true);
      setAnalysis("");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are an elite AI prompt auditor.

Respond using this EXACT structure:

CLARITY SCORE:
Number 1-10 + short explanation.

ROLE DEFINITION:
Present or Missing + explanation.

CONSTRAINTS:
Present or Missing + explanation.

OUTPUT STRUCTURE:
Present or Missing + explanation.

AMBIGUITIES:
List clearly.

IMPROVEMENT SUGGESTIONS:
Bullet-point actionable upgrades.

Do NOT rewrite the prompt.
Only analyze it.`,
            },
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 0.3,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setAnalysis("Error: " + data.error);
      } else {
        setAnalysis(data.response);
      }
    } catch {
      setAnalysis("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysis = () => {
    if (!analysis) return null;

    const sections = analysis.split("\n\n");

    return sections.map((section, index) => {
      const [title, ...content] = section.split("\n");
      return (
        <div
          key={index}
          className="border border-gray-800 rounded-xl p-5 bg-[#0f0f10]"
        >
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">
            {title.replace(":", "")}
          </div>
          <div className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
            {content.join("\n")}
          </div>
        </div>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">

      {/* Top Navigation */}
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

      <div className="p-10">
        <h1 className="text-2xl font-medium mb-10 text-gray-300">
          Prompt Analysis Console
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT PANEL */}
          <div className="flex flex-col gap-5">
            <div className="text-xs text-gray-500 uppercase tracking-widest">
              Prompt Input
            </div>

            <textarea
              placeholder="Paste your prompt here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-[#111] border border-gray-800 rounded-xl p-5 h-72 focus:outline-none focus:border-gray-500 transition text-sm"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Run Analysis"}
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6 min-h-[450px]">

            {analysis ? (
              renderAnalysis()
            ) : (
              <div className="border border-gray-800 rounded-xl p-6 bg-[#111] text-gray-600">
                <div className="text-xs uppercase tracking-widest mb-3">
                  Prompt Audit System
                </div>
                <p>
                  Submit a prompt to receive a structured diagnostic
                  report covering clarity, structure, constraints,
                  ambiguity, and optimization readiness.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}