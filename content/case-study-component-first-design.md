## The Problem Space

In most product teams, there is a persistent disconnect between what designers think exists in code and what developers have actually built. Designers maintain Figma files that drift from implementation. Developers build component variants that designers never see. Neither side has a reliable, shared view of the truth.

This gap shows up as designers redrawing components that already exist, developers implementing variants the designer never intended, nobody being able to answer "what states does this component actually support?" without reading source code, and design system documentation that is always stale.

Existing tools fall short: Storybook is developer-maintained and often incomplete, Figma has no connection to what is actually implemented, Code Connect links components but doesn't extract real component states, and design tokens sync colors but not component structure or variant logic.

> The source code already contains the complete truth about every component variant, prop combination, and conditional branch. The problem is that this truth is locked inside TypeScript types, JSX conditionals, and runtime behavior — invisible to anyone who doesn't read code.

## The Vision

**Make implemented UI explorable like design.** If we can deterministically extract component metadata from source code and render it as a visual, inspectable surface, we can eliminate the gap between design intent and implementation reality.

Not a design tool. Not a documentation tool. A **truth layer** — one that reads the code and presents what actually exists, with honest confidence signals about what it knows for certain versus what it inferred.

**Design Principles:**
- Code is the source of truth. Everything flows from parsing real TypeScript/TSX files. No manual annotation required.
- Honest over impressive. If the system can't confidently extract something, it says so. Confidence badges (exact / inferred / placeholder) are first-class UI.
- Designer-facing, developer-powered. Surfaces should feel like design tools but be driven entirely by code data.
- Artifacts over magic. Every intermediate step produces a readable, debuggable file. No black boxes.

## Architecture Decisions

### Monorepo with Clear Package Boundaries

The project was structured as a pnpm monorepo with 6 packages: `scenario-core` (shared types, validators, prompt primitives), `scenario-extractor` (TypeScript AST parsing and metadata extraction), `ui-schema` (UI schema types and design-surface normalization), `scenario-vscode` (VS Code extension with canvases and diagnostics), `scenario-cli` (CLI entry points), and `figma-plugin` (Figma plugin for scenario editing).

The separation of parsing from rendering was non-negotiable — the extraction pipeline needs to work identically in CLI, extension, and future CI contexts. Packages communicate through generated JSON files, not function calls, making the pipeline inspectable at every stage.

### TypeScript Compiler API for Extraction

Rather than using regex or requiring manual annotations, the extractor uses the TypeScript compiler API directly. It resolves type aliases, interfaces, and generics. It understands `React.FC`, `memo()`, `forwardRef()`, and HOC patterns. It extracts enum values from union types and classifies props as discriminants, callbacks, nodes, scalars, or collections.

This means the product can extract prop schemas from any typed React component with zero manual setup — unlike tools that require developers to write metadata.

The challenge: the TypeScript compiler API is powerful but unforgiving. This led to a key design decision — the **extraction confidence system**. Every extracted value carries a confidence level, and downstream consumers display this honestly rather than pretending everything is certain.

### Two-Track Architecture

- **Track A: Scenario Authoring + AI Code Generation** — the structured scenario model, validation, and prompt generation pipeline
- **Track B: Repo Extraction + Design Surface Rendering** — the parser, schema normalization, and visual canvas pipeline

These tracks have different maturity curves. Track A could deliver value quickly while Track B required solving harder visual rendering problems. Splitting them allowed shipping Track A features while Track B was still experimental.

### Artifact-Based Pipeline

Instead of parsing source code and rendering a canvas in one pass, the system generates intermediate artifacts at every stage:

Source Code → ParsedComponent → ComponentRegistry → ScenarioSidecar → RenderSchema → UISchemaDocument → DesignSchemaDocument → Canvas

Each step produces a file that can be inspected, diffed, and debugged independently. Early prototypes that tried to do everything in-memory were impossible to debug. With artifact files, every stage is independently verifiable.

## The AI Builder Workflow

This project was built using AI coding tools not as occasional assistants but as primary implementation partners:

- **Architecture and data model were designed manually.** Package structure, type definitions, and data flow were human decisions. AI tools are good at implementing structure but unreliable at inventing it.
- **AI was used for implementation velocity.** Once types and interfaces were defined, AI tools generated validators, parsers, renderers, and UI code that conformed to those types.
- **AI evaluation was built into the product itself.** A formal scoring system measures whether scenario-driven prompts actually outperform plain-language prompting.
- **Repo-local AI skills** encode domain knowledge about the project's conventions and constraints.

There is a recursive quality to this work: it is an AI-augmented tool for improving AI-augmented development. Using AI tools to build the product revealed gaps in how AI tools understand component structure, which informed the scenario model, which improved the prompts generated for AI tools.

## Design Challenges

### Making Code Data Feel Like Design Data

The hardest design problem was presenting TypeScript type information as something designers would recognize. The design schema normalization layer translates technical metadata into designer-facing language: technical prop names become semantic labels, type classifications become visual role badges, enum values become variant options in a visual matrix, and nested structures become collapsible layer trees.

### The Variant Matrix UX

A component with 3 status values, 2 sizes, and 4 interaction states has 24 possible variants. Three complementary view modes were designed: Matrix view (2D grid for comparison), Strip view (horizontal scroll for browsing), and Detail view (single variant with full property panel for inspection).

### Confidence and Trust as First-Class UX

The most important UX decision was making honesty a visible design element. Every piece of data carries metadata about how it was derived — extraction confidence, schema source, fidelity scores, and color-coded badges throughout the UI.

A design surface that shows component variants is actively harmful if the variants don't match reality. By making confidence visible at every layer, the system tells users exactly where they can trust it and where they should verify.

## Lessons Learned

- **Type systems are underused as metadata.** TypeScript types contain enormous information about component behavior. Most tools ignore this and ask developers to re-describe their components in configuration files.
- **Confidence signals are more valuable than polish.** A rough render with an honest "inferred" badge is more useful than a polished render that might be wrong. Trust is the product.
- **AI amplifies architecture decisions.** Good package boundaries make AI-generated code consistent. Bad boundaries let AI create sprawl.
- **Artifacts beat abstractions for debugging.** Every intermediate JSON file is a debugging tool.
- **Design for the domain, not the demo.** Logistics-domain example components forced the product to handle real complexity — 20+ variant states, nested conditionals, domain-specific mock data.

## Takeaway

> The most scalable bridge between design and development is not another static handoff artifact. It is a system that makes implemented component behavior visible, inspectable, and honest about what it knows.
