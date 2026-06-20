## 1. The Frustration

At Freight Tiger, I work on multiple projects at any given time. After design handoff, the small things start slipping — a color off by a shade, padding wrong by 4px, font weight not matching. These aren't dramatic failures. They're death-by-a-thousand-cuts quality problems.

I can check flows and logic quickly. But sitting with Figma and production open side-by-side, comparing every color, every spacing value, every text style across multiple projects — that takes real time. And when those small discrepancies don't get caught, they compound into a negative quality impression over time.

The feedback loop made it worse: spot an issue during design UAT, document it, communicate back to the developer, wait for the fix, re-check. Multiply that across several projects running in parallel, and the cost adds up fast.

**The core question:** Can I automate the pixel-level comparison so I can focus my time on the things that actually need design judgment?

## 2. What I Built

DesignQA is a tool that extracts design specs from Figma files, extracts implementation data from live web pages, and compares the two — surfacing every visual discrepancy so I don't have to find them manually.

GitHub: [https://github.com/chetank2/designqa](https://github.com/chetank2/designqa)

It compares:

- color token mismatches
- typography violations — font families, sizes, weights
- incorrect spacing and sizing
- layout and positioning deviations
- design system component drift
- missing elements
- screenshot-level visual differences

The output is practical: it shows all discrepancies and generates a readable HTML report and an Excel sheet that can be uploaded directly to DevRev or Linear to create issues. No fancy reports — just actionable differences in a format that fits into real team workflows.

## 3. Why This Matters for AI-Native Design Workflows

The most sophisticated work I have done with AI was not generating designs. It was redesigning the design workflow itself.

DesignQA was built for a recurring enterprise problem: production screens drift from Figma designs after handoff. Colors, typography, spacing, sizing, layout, and component usage slowly diverge, and designers end up spending hours doing manual side-by-side checks.

In many enterprise environments, sending production screens, customer data, or internal Figma files to external LLMs is restricted. So the product was designed as an LLM-free quality gate: it compares design intent against implementation using structured extraction, visual inspection, and deterministic mismatch reporting rather than relying on a language model to judge the UI.

This turned design review from a manual, subjective process into an automated quality gate. A designer, PM, QA person, developer, founder, or client could run a comparison and get concrete evidence before release.

## 4. How It Grew

The tool started as an Electron app for my MacBook — built for my own use during design UAT.

Then other people wanted to try it, so I built a web version on Vercel that anyone could access. Then teammates on Windows needed it, so I added Windows support. I also tried building a Chrome extension, but couldn't get that working successfully.

Each step was driven by a real need, not planned architecture. The tool expanded because people wanted to use it in different contexts.

## 5. My Role — Designer Building with AI

I built this using Claude, Cursor, and Codex as pair programmers. My role was product vision, design decisions, and quality judgment. AI handled the code generation, implementation, and debugging.

This is a pattern across my projects: I don't write code from scratch. I design the product, make the architectural choices, and use AI tools to execute. The judgment about what to build and why is mine. The code generation is AI-assisted.

There are two separate AI stories here:

- I used AI tools like Claude, Cursor, and Codex to build the product as a designer-builder.
- The product itself does not require an LLM to evaluate design quality, which makes it suitable for restricted enterprise environments.

## 6. Key Technical Decisions

### Dual-database approach

The tool needed to work offline on desktop (SQLite, no infrastructure needed) and in the cloud as a web app (Supabase Postgres). Instead of picking one, I designed it with an adapter pattern — the right database is selected at startup based on the environment. This let me develop locally with zero setup and deploy to production without rewriting anything.

### Figma integration via MCP

The tool communicates with Figma's desktop application through the Model Context Protocol, extracting design tokens, colors, and typography in real-time. If MCP isn't available, it falls back to the Figma REST API. This graceful degradation means the tool works in both desktop and cloud contexts.

### Cross-platform from one codebase

The same codebase runs across Electron (macOS/Windows), web browser, and Docker. Environment detection at startup determines the runtime context and configures everything automatically.

### Local-first privacy

The desktop app is designed to run locally. Figma links, website links, extracted data, and generated reports stay on the user's machine unless they choose to share them. This matters in enterprise contexts where design review data cannot casually leave the organization.

## 7. Integration Attempts

I tried connecting directly with Linear and DevRev to push issues automatically instead of going through Excel export. I couldn't complete those integrations, but the intent was to shorten the feedback loop even further — from "export sheet, upload to tracker" to "push issues directly from the tool."

## 8. What Happened Next

After I built DesignQA, Claude and Cursor released Figma integration — users could paste production screens and make changes directly. That partially solved the design UAT challenge I had been working on.

But it also revealed a deeper problem that DesignQA wasn't designed to solve, and that led to my next project: Component-first Design.

## 9. Results

- **124 commits** from concept to production
- **62+ React components** with consistent design language
- **Cross-platform** — macOS, Windows, web, Docker
- **838 components** successfully extracted from a single Figma file
- Built entirely through AI-assisted development as a designer
- Turned design QA into a repeatable quality gate that teams can run before release

## 10. Takeaway

> The goal is not to detect design gaps better. It is to make the gap between design and implementation small enough that it stops costing teams time.

The biggest lesson was that AI's highest leverage is not generating screens. It is building systems that let entire teams operate with higher quality, autonomy, and judgment.
