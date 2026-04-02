# Long-Form Content Guidelines

This document defines the authoring and spacing rules for all long-form content surfaces on the website.

Scope:

- case study pages
- writing and article-style pages
- any markdown-rendered long-form surface that uses the shared `.longform-content` wrapper

## Goals

- keep section hierarchy visually consistent
- maintain predictable spacing between headings, media, and body copy
- avoid one-off markdown patterns that produce uneven rhythm
- make image placement intentional instead of incidental

## Content Hierarchy

Use heading levels consistently:

- `##` for primary sections
- `###` for subsections inside a section
- `####` only for small nested labels when a third level is genuinely necessary

Do not stack empty or near-empty headings.

Bad:

```md
## Solution
### My Journeys
### The New Journey List
```

Good:

```md
## Solution

My Journeys fixed both the architecture and the interface...

### The New Journey List
```

## Image Placement

Images should appear directly under the heading they belong to, before the explanatory body copy.

Preferred pattern:

```md
### The New Journey List

![Alt text](/assets/example.png)

Body copy starts here...
```

Do not place a section image after two or three paragraphs if the image is meant to explain the heading itself.

Exceptions:

- if the image supports a later paragraph rather than the heading, place it immediately before that paragraph
- if two images explain the same section, keep them grouped before the related content block unless narrative order demands otherwise

## Spacing Rules

The `.longform-content` system expects this rhythm:

- primary sections have the largest separation
- subsections sit closer to their parent section
- images directly under headings should feel attached to the heading
- paragraph-to-paragraph spacing should remain smaller than section spacing
- lists and blockquotes should align with paragraph rhythm, not break it

Authoring implications:

- keep a blank line between every markdown block
- avoid manual `<br>` spacing
- avoid using bold text as a fake heading when a real heading level is appropriate
- avoid multiple consecutive images without a heading or explanatory sentence unless they are intentionally paired

## Section Patterns

### Standard section

```md
## 1. Overview

Opening paragraph.

Supporting paragraph.
```

### Subsection with image

```md
### Dedicated Journey Details Page

![Alt text](/assets/example.png)

Explanation paragraph.

Supporting paragraph.
```

### Section with list

```md
## Users and Context

Introductory sentence.

- point one
- point two
- point three
```

### Image-led opening

Use this only when the image is the lead artifact for the whole page.

```md
![Hero image](/assets/example.png)

## 1. Overview
```

## Writing Style Rules For Structure

- prefer short introductory sentences before bullets
- keep headings descriptive, not decorative
- title case is preferred for headings
- avoid punctuation-heavy headings unless the phrase requires it
- keep subsection names parallel within the same section

## Implementation Notes

The shared styles live in:

- `/Users/user/Documents/portfolio/src/styles/global.css`

The main wrapper currently used by case-study pages is:

- `.longform-content`

When adding new long-form templates, use the shared wrapper instead of creating new page-specific markdown spacing rules.
