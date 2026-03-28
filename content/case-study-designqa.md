## 1. The Frustration

At Freight Tiger, I work on multiple projects at any given time. After design handoff, the small things start slipping — a color off by a shade, padding wrong by 4px, font weight not matching. These aren't dramatic failures. They're death-by-a-thousand-cuts quality problems.

I can check flows and logic quickly. But sitting with Figma and production open side-by-side, comparing every color, every spacing value, every text style across multiple projects — that takes real time. And when those small discrepancies don't get caught, they compound into a negative quality impression over time.

The feedback loop made it worse: spot an issue during design UAT, document it, communicate back to the developer, wait for the fix, re-check. Multiply that across several projects running in parallel, and the cost adds up fast.

**The core question:** Can I automate the pixel-level comparison so I can focus my time on the things that actually need design judgment?

## 2. What I Built

DesignQA is a tool that extracts design specs from Figma files, extracts implementation data from live web pages, and compares the two — surfacing every visual discrepancy so I don't have to find them manually.

It compares:

- colors and color palettes
- typography — font families, sizes, weights
- spacing values
- layout and positioning
- screenshot-level visual differences

The output is practical: it shows all discrepancies and generates an Excel sheet that can be uploaded directly to DevRev or Linear to create issues. No fancy reports — just actionable differences in a format that fits into real team workflows.

## 3. How It Grew

The tool started as an Electron app for my MacBook — built for my own use during design UAT.

Then other people wanted to try it, so I built a web version on Vercel that anyone could access. Then teammates on Windows needed it, so I added Windows support. I also tried building a Chrome extension, but couldn't get that working successfully.

Each step was driven by a real need, not planned architecture. The tool expanded because people wanted to use it in different contexts.

## 4. My Role — Designer Building with AI

I built this using Claude, Cursor, and Codex as pair programmers. My role was product vision, design decisions, and quality judgment. AI handled the code generation, implementation, and debugging.

This is a pattern across my projects: I don't write code from scratch. I design the product, make the architectural choices, and use AI tools to execute. The judgment about what to build and why is mine. The code generation is AI-assisted.

## 5. Key Technical Decisions

### Dual-database approach

The tool needed to work offline on desktop (SQLite, no infrastructure needed) and in the cloud as a web app (Supabase Postgres). Instead of picking one, I designed it with an adapter pattern — the right database is selected at startup based on the environment. This let me develop locally with zero setup and deploy to production without rewriting anything.

### Figma integration via MCP

The tool communicates with Figma's desktop application through the Model Context Protocol, extracting design tokens, colors, and typography in real-time. If MCP isn't available, it falls back to the Figma REST API. This graceful degradation means the tool works in both desktop and cloud contexts.

### Cross-platform from one codebase

The same codebase runs across Electron (macOS/Windows), web browser, and Docker. Environment detection at startup determines the runtime context and configures everything automatically.

## 6. Integration Attempts

I tried connecting directly with Linear and DevRev to push issues automatically instead of going through Excel export. I couldn't complete those integrations, but the intent was to shorten the feedback loop even further — from "export sheet, upload to tracker" to "push issues directly from the tool."

## 7. What Happened Next

After I built DesignQA, Claude and Cursor released Figma integration — users could paste production screens and make changes directly. That partially solved the design UAT challenge I had been working on.

But it also revealed a deeper problem that DesignQA wasn't designed to solve, and that led to my next project: Component-first Design.

## 8. Results

- **124 commits** from concept to production
- **62+ React components** with consistent design language
- **Cross-platform** — macOS, Windows, web, Docker
- **838 components** successfully extracted from a single Figma file
- Built entirely through AI-assisted development as a designer

## 9. Takeaway

> The goal is not to detect design gaps better. It is to make the gap between design and implementation small enough that it stops costing teams time.
