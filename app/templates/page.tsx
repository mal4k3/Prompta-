"use client";

import Link from "next/link";

const templates = [
  {
    title: "Marketing Email",
    description: "High-converting promotional email structure.",
    content: `Write a persuasive marketing email for [PRODUCT].

Target Audience:
Tone:
Key Benefits:
Call To Action:
Length:
Output Format:`
  },
  {
    title: "YouTube Script",
    description: "Structured video script template.",
    content: `Create a YouTube script about [TOPIC].

Target Audience:
Hook:
Main Points:
CTA:
Tone:
Duration:
Output Format:`
  },
  {
    title: "SaaS Landing Page",
    description: "Conversion-focused landing page framework.",
    content: `Write a SaaS landing page for [PRODUCT NAME].

Target Market:
Pain Points:
Core Features:
Benefits:
Social Proof:
CTA:
Tone:
Output Structure:`
  },
  {
    title: "AI Coding Assistant",
    description: "Technical task breakdown template.",
    content: `Act as a senior software engineer.

Task:
Tech Stack:
Constraints:
Expected Output:
Edge Cases:
Format:`
  },
];

export default function Templates() {
  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">

      <div className="flex items-center justify-between px-10 py-5 border-b border-gray-800 bg-[#0f0f10]">
        <div className="text-lg font-semibold tracking-tight">
          Prompta
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/playground" className="hover:text-white transition">Console</Link>
          <Link href="/analyzer" className="hover:text-white transition">Analyzer</Link>
          <Link href="/templates" className="hover:text-white transition">Templates</Link>
        </div>
      </div>

      <div className="p-12 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-12">
          Prompt Templates
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {templates.map((template, index) => (
            <Link
              key={index}
              href={{
                pathname: "/playground",
                query: { template: template.content },
              }}
              className="border border-gray-800 bg-[#111] rounded-2xl p-8 hover:border-gray-600 transition"
            >
              <h3 className="text-xl font-medium mb-3">
                {template.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {template.description}
              </p>
            </Link>
          ))}

        </div>
      </div>
    </main>
  );
}