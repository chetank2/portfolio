## The Problem

Design handoffs are broken. Every product team knows the pain: a designer crafts pixel-perfect screens in Figma, hands them to developers, and what ships is close but not right. Colors are off by a few hex values. Spacing is inconsistent. Typography doesn't match. The gap between design intent and production code is a persistent, costly problem — and catching these discrepancies manually is tedious, error-prone, and doesn't scale.

**The core question:** Can we automate the comparison between a Figma design and a live web page, and surface every visual discrepancy with actionable insights?

## The Vision

Build a full-stack, production-grade tool that:

- **Extracts design specifications** directly from Figma files (colors, typography, spacing, layout)
- **Extracts implementation data** from live web pages using browser automation
- **Compares both** at a granular level — pixel-by-pixel screenshots, color palettes, font stacks, spacing values
- **Generates AI-powered reports** that don't just list differences but explain why they matter and how to fix them
- **Runs anywhere** — as a desktop app (Electron/macOS), a web app (Vercel), or a cloud service (Railway/Docker)

This wasn't a weekend prototype. The goal was a tool I could use professionally, share with teams, and deploy to production.

## My Role: Designer + AI Builder

This project was built almost entirely through AI-assisted development — using Claude as a pair programmer, architect, and code generator. My role was that of a product designer and technical decision-maker who leveraged AI to execute at the speed and depth of a full engineering team.

**What I brought:** Product vision, design sensibility, architectural decisions, quality bar, and deployment expertise.

**What AI handled:** Code generation, architecture implementation, debugging, documentation, and refactoring at scale — including migrating 62+ React components from Material-UI to shadcn/ui.

## Key Architecture Decisions

### Dual-Database Abstraction

The tool needed to work offline on desktop (SQLite, zero dependencies) and in the cloud as a SaaS (Supabase Postgres, multi-tenant). Rather than picking one, I designed the system with the Adapter Pattern from day one — every data operation flows through Repositories → Services → Routes, with the adapter selected at startup based on environment detection.

This let me develop locally with zero infrastructure and deploy to production without rewriting a single query.

### MCP Integration — Bridging Figma Desktop

The Model Context Protocol integration allows the tool to communicate directly with Figma's desktop application — extracting design tokens, colors, typography, and component data in real-time without going through the REST API. The system gracefully degrades: if MCP is unavailable in production, it falls back to the Figma REST API.

### Cross-Platform Architecture

The same codebase runs across Electron (macOS), web browser, and Docker container. Environment detection at startup determines the runtime context, storage mode auto-selects based on available infrastructure, and API base URL dynamically resolves across platforms.

## The Build Journey

**Phase 1 — Foundation:** Core pipeline from Figma extraction → web scraping with Puppeteer → comparison logic → report output. Proved the concept with a monolithic prototype.

**Phase 2 — UI Modernization:** Complete migration from Material-UI to shadcn/ui across 62+ components in 12 methodical phases, each backward-compatible. Design token system implemented in Tailwind config with Framer Motion animations.

**Phase 3 — Database & Auth:** Moved from file-based storage to SQLite/Supabase with Row-Level Security, user authentication, credential vault with AES-256 encryption.

**Phase 4 — Desktop App:** Electron packaging with ESM/CJS conflict resolution, server lifecycle management via IPC, and macOS code signing.

**Phase 5 — Production Deployment:** 10+ commits dedicated to Railway deployment — Docker multi-stage builds, Chromium dependencies, environment detection, health checks. This is where theory meets reality.

## Technical Challenges

### Puppeteer Reliability
Headless Chrome crashes, hangs, and consumes excessive memory on complex pages. Solved with timeout cascades, fallback data structures for partial extraction, a NavigationHandler with retry strategies, and 98.4% compression on generated reports.

### Figma Data Complexity
Figma's API returns deeply nested JSON — a single component can have dozens of nested frames and variant combinations. Built a specialized extractor that recursively traverses node trees, handles 838+ components per file, normalizes color formats across MCP and API sources, and deduplicates variable metadata.

### The UI Migration
Migrating 62+ components while keeping the app functional required a phased approach with backward compatibility at each step, design tokens defined once and referenced everywhere, and visual regression testing using the tool's own comparison feature (dogfooding).

## AI-Powered Analysis

Raw comparison data is useful but not actionable. The AI layer transforms data into insights:

- **Design discrepancies** — not just "these colors differ" but "this breaks WCAG AA contrast requirements"
- **Pattern recognition** — detecting systematic issues like "all body text is 14px in design but 13px in implementation"
- **Quick wins** — fixes sorted by visual impact and implementation effort
- **Design system violations** — comparing against stored tokens to identify drift

The NLP layer extracts structured data, the LLM integration generates human-readable analysis, and a scoring system assigns severity ratings. This transforms the tool from a diff engine into a design QA assistant.

## What I Learned About AI-Assisted Building

**What works exceptionally well:** Boilerplate generation, pattern application across entities, debugging obscure issues (Electron IPC, Puppeteer flags, Docker layer caching), refactoring at scale, and documentation from existing code.

**What requires human judgment:** Architecture decisions (AI will build whatever you ask for — knowing what to ask requires experience), scope control (AI tends toward over-engineering), deployment debugging (diagnosis requires reading logs and understanding build environments), design taste, and integration testing.

## Results

- **124 commits** from concept to production
- **62+ React components** with consistent design language
- **6 deployment targets** (Electron, macOS DMG, Vercel, Railway, Docker, local dev)
- **838 components** successfully extracted from a single Figma file
- **98.4% report compression** ratio
- Clean adapter/repository/service architecture with platform-agnostic codebase and graceful degradation

## Takeaway

> The long-term goal is not only to detect design gaps better. It is to make the gap between design and implementation smaller in the first place.
