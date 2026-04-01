# Case Study Password Protection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one shared password gate for the requested case studies while keeping the rest of the portfolio public.

**Architecture:** Introduce one reusable client-side protection wrapper that renders a password form until the browser session is unlocked. Use shared config for the protected slugs and apply the same wrapper to the standalone My Journeys page and the dynamic markdown-backed case study route.

**Tech Stack:** Astro, React, TypeScript, browser `sessionStorage`

---

### Task 1: Add shared protection config

**Files:**
- Create: `src/lib/caseStudyProtection.ts`

- [ ] **Step 1: Write the failing test**

No existing unit-test harness is configured in this project. Use a build-level verification instead of inventing a test stack for a small UI behavior change.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: PASS before changes. This establishes the current baseline before protection logic is added.

- [ ] **Step 3: Write minimal implementation**

Create a config module that exports:

```ts
export const SHARED_CASE_STUDY_PASSWORD = "CHANGE_ME";

export const PROTECTED_CASE_STUDY_SLUGS = new Set([
  "journey-redesign",
  "control-tower",
  "freight-invoicing",
  "ptl-module-design",
]);

export function isProtectedCaseStudy(slug: string): boolean {
  return PROTECTED_CASE_STUDY_SLUGS.has(slug);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/caseStudyProtection.ts
git commit -m "feat: add case study protection config"
```

### Task 2: Build the reusable protection gate

**Files:**
- Create: `src/components/react/ProtectedCaseStudy.tsx`

- [ ] **Step 1: Write the failing test**

No automated component test setup exists. Verify by compiling the component into the Astro build after implementation.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: PASS baseline only; the component does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create a React client component that:

```tsx
import { useEffect, useState, type ReactNode, type FormEvent } from "react";

interface Props {
  password: string;
  storageKey: string;
  title: string;
  children: ReactNode;
}

export default function ProtectedCaseStudy({ password, storageKey, title, children }: Props) {
  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(storageKey) === "unlocked") {
      setUnlocked(true);
    }
  }, [storageKey]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === password) {
      window.sessionStorage.setItem(storageKey, "unlocked");
      setUnlocked(true);
      setError("");
      return;
    }
    setError("Incorrect password");
  }

  if (unlocked) return <>{children}</>;

  return (
    <section className="mt-12 rounded-2xl border border-border bg-bg-elevated/60 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent/70">Protected Case Study</p>
      <h2 className="mt-4 text-2xl font-display font-700 text-text-primary">{title}</h2>
      <p className="mt-3 text-text-secondary font-body leading-relaxed">
        Enter the shared password to view this case study.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input
          type="password"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter password"
          className="rounded-xl border border-border bg-bg-deep px-4 py-3 text-text-primary outline-none"
        />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          className="inline-flex w-fit items-center justify-center rounded-xl bg-text-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-bg-deep"
        >
          Unlock
        </button>
      </form>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/react/ProtectedCaseStudy.tsx
git commit -m "feat: add reusable protected case study gate"
```

### Task 3: Apply protection to dynamic case studies

**Files:**
- Modify: `src/data/caseStudies.ts`
- Modify: `src/pages/work/[slug].astro`

- [ ] **Step 1: Write the failing test**

Document the expected behavior:

```text
/work/control-tower should show the password gate before markdown content.
/work/ptl-module-design should show the password gate before markdown content.
Unprotected markdown-backed case studies should continue to render normally.
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: PASS baseline only; dynamic protection is not yet wired.

- [ ] **Step 3: Write minimal implementation**

Update `src/data/caseStudies.ts` to support optional protection metadata:

```ts
protected?: boolean;
```

Mark these records as protected:

```ts
slug: "control-tower", protected: true
slug: "ptl-module-design", protected: true
```

Then wrap the markdown content in `src/pages/work/[slug].astro`:

```astro
import ProtectedCaseStudy from "../../components/react/ProtectedCaseStudy.tsx";
import { SHARED_CASE_STUDY_PASSWORD } from "../../lib/caseStudyProtection";
```

```astro
{
  caseStudy.protected ? (
    <ProtectedCaseStudy
      client:load
      password={SHARED_CASE_STUDY_PASSWORD}
      storageKey={`case-study:${caseStudy.slug}`}
      title={caseStudy.title}
    >
      <ScrollReveal client:visible>
        <article class="case-study-content mb-20">
          <Content />
        </article>
      </ScrollReveal>
    </ProtectedCaseStudy>
  ) : (
    <ScrollReveal client:visible>
      <article class="case-study-content mb-20">
        <Content />
      </article>
    </ScrollReveal>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/caseStudies.ts src/pages/work/[slug].astro
git commit -m "feat: protect selected markdown case studies"
```

### Task 4: Apply protection to My Journeys

**Files:**
- Modify: `src/pages/work/journey-redesign.astro`

- [ ] **Step 1: Write the failing test**

Document the expected behavior:

```text
/work/journey-redesign should show the same password gate before the My Journeys content.
After entering the correct password once, the content should be visible for the rest of the browser session.
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: PASS baseline only; the standalone page is not yet protected.

- [ ] **Step 3: Write minimal implementation**

Import the shared gate and config:

```astro
import ProtectedCaseStudy from "../../components/react/ProtectedCaseStudy.tsx";
import { SHARED_CASE_STUDY_PASSWORD } from "../../lib/caseStudyProtection";
```

Wrap the existing case-study body:

```astro
<ProtectedCaseStudy
  client:load
  password={SHARED_CASE_STUDY_PASSWORD}
  storageKey="case-study:journey-redesign"
  title="My Journeys"
>
  <!-- existing case-study sections -->
</ProtectedCaseStudy>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/work/journey-redesign.astro
git commit -m "feat: protect my journeys case study"
```

### Task 5: Protect Freight Invoicing route

**Files:**
- Modify: `src/pages/work/freight-invoicing.astro`

- [ ] **Step 1: Write the failing test**

Document the expected behavior:

```text
/work/freight-invoicing should show the shared password gate before the case-study content.
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: PASS baseline only; this standalone page is still public.

- [ ] **Step 3: Write minimal implementation**

Import the shared gate and config and wrap the existing page content:

```astro
<ProtectedCaseStudy
  client:load
  password={SHARED_CASE_STUDY_PASSWORD}
  storageKey="case-study:freight-invoicing"
  title="Freight Invoicing & Reconciliation System"
>
  <!-- existing case-study sections -->
</ProtectedCaseStudy>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/work/freight-invoicing.astro
git commit -m "feat: protect freight invoicing case study"
```

### Task 6: Verify the protected experience end-to-end

**Files:**
- Modify: `src/lib/caseStudyProtection.ts`

- [ ] **Step 1: Write the failing test**

Document the expected production requirement:

```text
All four requested case-study URLs are gated by the same password and other pages stay public.
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: PASS baseline only; this step exists to enforce fresh verification after all edits.

- [ ] **Step 3: Write minimal implementation**

Replace the placeholder password with the real shared password value supplied by the user in:

```ts
export const SHARED_CASE_STUDY_PASSWORD = "REPLACE_WITH_USER_PASSWORD";
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm run build
```

Expected: PASS

Then manually verify in the browser:

```text
/work/journey-redesign
/work/control-tower
/work/ptl-module-design
/work/freight-invoicing
```

Expected:
- Protected pages show the gate before content.
- Correct password reveals the page.
- Reloading the same page in the same tab/session keeps it unlocked.
- Public pages like `/work/ft-design-system` remain public.

- [ ] **Step 5: Commit**

```bash
git add src/lib/caseStudyProtection.ts
git commit -m "feat: finalize shared password protection"
```
