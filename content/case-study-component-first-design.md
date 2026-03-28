## 1. Where This Came From

After building DesignQA, tools like Claude, Cursor, and Codex released features that let you paste production screens and edit them directly. That partially solved the design UAT problem I had been working on.

But it exposed a deeper challenge: **SaaS apps are complex. One screen can't show everything.**

The same screen has multiple elements, and each element has multiple variants. In production, not all variants are visible — some are configured for specific customers, some are edge cases, some only appear under certain conditions. A demo account won't cover them all.

If I paste a production screen into an AI tool and edit it, I can change what's visible on that screen. But I can't edit the other variations. I can't see the full picture of what a component actually supports.

## 2. How I Actually Work

After building DesignQA and thinking about this problem, I realized the answer was already in my own design process.

My workflow at Freight Tiger is:

- design all flows and hand them over to the developer
- after initial implementation, I don't redesign full screens for changes
- instead, I design **element variations** — all the states and variants of a specific component for that requirement
- this saves time and gives developers something they can directly map to code by searching for that component

Showing all variations of an element in the Figma file helps developers find and change things quickly in the codebase.

**The idea:** What if I could mimic this process in code? What if the codebase itself could show all component variations the way Figma shows them — and let you edit them visually?

## 3. What I Built

A VS Code extension (prototype stage) that:

- **scans the entire codebase** and pulls out modules and components automatically
- **shows them on a canvas** inside the same extension — no context switching
- **equips the canvas with Figma-like tools** where you can edit variants, add new variants, change colors, fonts, and other properties
- **generates prompts from your changes** that you can give to AI tools, so they can make the actual code changes

The key insight: instead of going from design → code, this goes from code → visual surface → edit → back to code. The source of truth stays in the codebase, but the editing experience feels like a design tool.

## 4. Why This Matters

### The variant visibility problem

Most tools assume you're editing what you can see on screen. But in complex SaaS products, the screen only shows one state of many. Component-first design makes all states visible and editable regardless of what's currently rendered in production.

### Code as the source of truth

Figma files drift from implementation. This tool reads the actual code — the real types, the real props, the real variants. If the code says a button has 4 variants, the canvas shows 4 variants. No manual documentation needed.

### Honest about what it knows

Not every extraction is perfect. The tool uses confidence signals — marking whether a piece of data was extracted with certainty, inferred, or is a placeholder. A rough render with an honest "inferred" badge is more useful than a polished render that might be wrong.

## 5. The Design Decisions

### Designer-facing, developer-powered

The canvas should feel like a design tool but be driven entirely by code data. Technical prop names become semantic labels. Type classifications become visual badges. Enum values become variant options in a visual matrix.

### Multiple view modes for variants

A component with 3 status values, 2 sizes, and 4 interaction states has 24 possible variants. The tool offers:

- **Matrix view** — 2D grid for comparison across variants
- **Strip view** — horizontal scroll for browsing
- **Detail view** — single variant with full property panel

### Artifact-based pipeline

Instead of parsing code and rendering in one pass, the system generates intermediate files at every stage. Each step produces something inspectable and debuggable. Early prototypes that tried to do everything in memory were impossible to debug.

## 6. Current Status

This is a working prototype. The extraction pipeline works, the canvas renders components, and the prompt generation produces usable output. It is not production-ready — it's a concept that proves the idea works.

The thesis is that the most scalable bridge between design and development is not another handoff artifact. It is making what's already implemented visible, inspectable, and editable in a way that feels natural to designers.

## 7. What I Learned

- **Your own workflow is often the best product spec.** The idea came directly from how I already work — designing element variations instead of full screens.
- **AI tools solve the editing problem but not the visibility problem.** You can paste a screen and change it, but you can't see what you can't see.
- **Confidence signals matter more than polish.** A tool that's honest about what it extracted is more trustworthy than one that looks perfect but might be wrong.
- **Type systems are underused.** TypeScript types already contain the information about what a component supports. Most tools ignore this and ask developers to re-describe their components manually.

## 8. Takeaway

> The most useful design tool for complex products isn't one that helps you draw screens. It's one that makes the implemented reality visible and editable — so you can work with what actually exists, not what you think exists.
