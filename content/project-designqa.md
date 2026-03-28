# DesignQA

*A tool for comparing Figma designs with web implementations*

**Live:** [designqa-rho.vercel.app](https://designqa-rho.vercel.app)
**Repo:** [github.com/chetank2/designqa](https://github.com/chetank2/designqa)
**License:** MIT
**Latest Release:** v2.0.2 (January 2026)
**Built with:** AI-assisted development (AI tools used for coding)

---

## Overview

DesignQA is a Figma-to-Web comparison tool that extracts design data from Figma and compares it against live web implementations. It identifies deviations in colors, typography, spacing, shadows, border-radius, and layout — then generates detailed HTML reports.

## What It Does

- **Extract design data from Figma** via Figma REST API and Figma MCP (Model Context Protocol)
- **Extract web implementation details** from live websites using Puppeteer (headless browser)
- **Run comparative analysis** between Figma specs and actual CSS/DOM properties
- **Generate detailed HTML reports** showing deviations and discrepancies
- **Screenshot-level visual diffing** with pixel-level comparison
- **Chrome extension** for in-browser overlay comparison
- **AI-powered analysis** for design discrepancy detection

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Language | TypeScript + JavaScript (mixed, incremental migration) |
| Backend | Express.js |
| Browser Automation | Puppeteer |
| Frontend Build | Vite |
| Desktop Apps | Electron (macOS + Windows) |
| Database | SQLite (local) / Supabase (cloud) — adapter pattern |
| Storage | Local filesystem / Supabase storage — abstracted via StorageRouter |
| Package Manager | pnpm workspaces (monorepo) |
| Deployment | Docker, Vercel, Railway/Render compatible |
| CI/CD | GitHub Actions (4 workflows) |
| Extension | Chrome Manifest V3 |

## Architecture

### Monorepo Structure

```
designqa/
├── apps/
│   ├── chrome-extension/     # Manifest V3 Chrome extension
│   ├── desktop-mac/          # Electron macOS app
│   ├── desktop-win/          # Electron Windows app
│   ├── desktop-launcher/     # Standalone launcher
│   │   └── saas-backend/     # Full backend (main codebase)
│   │       ├── packages/
│   │       │   ├── compare-engine/   # TS comparison logic
│   │       │   ├── mcp-client/       # MCP protocol client
│   │       │   └── shared-types/     # Shared interfaces
│   │       └── src/
│   │           ├── ai/               # LLM-powered analysis
│   │           ├── browser/          # BrowserPool (Puppeteer management)
│   │           ├── compare/          # Comparison services
│   │           ├── core/             # Server, health checks, circuit breaker
│   │           ├── database/         # Adapters, migrations, repositories
│   │           ├── figma/            # MCP + API integration
│   │           ├── report/           # HTML report generators
│   │           ├── routes/           # Express API routes
│   │           ├── services/         # 20+ business logic services
│   │           ├── storage/          # Local + Supabase providers
│   │           └── visual/           # Visual diff engine
│   └── saas-backend/         # Cloud-deployed variant
```

### Key Architecture Patterns

**Adapter Pattern (Database & Storage)**
Runtime selection between SQLite (local) and Supabase (cloud) based on environment variables. Single factory function handles initialization, migrations, and fallback.

**MCP Protocol Integration**
Full MCP client for Figma data extraction with platform-specific discovery (macOS/Windows) and automatic fallback to standard Figma REST API.

**Circuit Breaker**
Fault tolerance for external service calls.

**Service Container**
Dependency injection-like pattern coordinating 20+ service classes with lifecycle management.

**Browser Pool**
Managed Puppeteer instances for concurrent web extraction with retry-on-timeout logic.

**Degraded Mode**
Server functions without database when persistence services are unavailable.

**Multi-strategy Reports**
Streaming, chunked, and categorized HTML report generators with CSS theme support.

## Key Features

- Figma extraction via MCP protocol + standard API (with fallback)
- Comparison engine: colors, typography, spacing, layout, border-radius, shadows
- Screenshot upload and pixel-level visual diff
- AI-powered analysis (ComparisonAnalyzer, DesignDiscrepancyAnalyzer, LLM integrator)
- Professional tabbed HTML reports
- Design system registry and token management
- Credential encryption and secure storage
- Chrome extension for in-browser overlay
- Cross-platform desktop apps (Electron)
- Health check endpoints with diagnostics

## Comparison Properties

The engine compares:

- **Colors** — hex, RGB, opacity
- **Typography** — font family, size, weight, line height, letter spacing
- **Spacing** — padding, margin, gaps
- **Layout** — flexbox/grid properties, alignment
- **Border Radius** — per-corner values
- **Shadows** — box-shadow, drop-shadow

## What Makes This Notable

- Not just a visual diff tool — it's a **system-level comparison engine**
- MCP protocol integration shows forward-thinking (AI-native design tooling)
- Adapter pattern allows local-first development with cloud deployment
- Monorepo with shared TypeScript packages shows engineering maturity
- AI layer for automated discrepancy analysis goes beyond simple pixel comparison
