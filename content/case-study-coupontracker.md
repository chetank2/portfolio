## Overview

CouponTracker started as a response to a simple consumer problem: coupon details were trapped inside screenshots, hard to compare, and easy to lose once they expired. Over time, the project evolved into a broader coupon recognition platform spanning Android, ML tooling, and offline annotation workflows.

## Problem

The initial friction was practical: screenshot-based coupon data was hard to extract, compare, consolidate, and manage across apps.

## Approach

The project grew from simple extraction into a multi-surface system with an Android app, layered recognition logic, a web-based training interface, and a mobile PWA for offline annotation.

## Key Decisions

- Layered extraction instead of a single-engine dependency
- Preview-before-save flows for quality control
- Offline-first architecture
- Closed-loop learning setup that supports continuous model improvement

## Outcome

The final system became much stronger than a basic OCR utility. It connected user-facing extraction, model quality, validation, annotation, and deployment into a more robust product platform.

## Takeaway

> The strongest product work often starts with a small pain point, then grows into the systems required to make that experience reliable.
