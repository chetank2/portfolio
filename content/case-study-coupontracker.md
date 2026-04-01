## 1. Overview

CouponTracker began as a practical attempt to solve a messy everyday problem: coupon details were trapped inside screenshots, difficult to compare, and easy to forget once they expired. What started as a screenshot-based coupon extraction idea has now evolved into a much broader system — a production-oriented coupon recognition platform with an Android app, web-based ML training interfaces, a mobile PWA for offline annotation, and a full model training and deployment pipeline.

But the project is not just about coupons. It is built on a thesis about where consumer AI is heading — and what that means for how products should be designed.

## 2. The Thesis

In early 2025, something shifted. AI tools became accessible enough that anyone could build an app. Cloud APIs made it easy to call a model, get a result, and ship a feature. But I started asking a different question:

**Why should the model live in the cloud at all?**

There are now free, capable models that can run entirely on a phone. The trajectory is clear — models are becoming a pseudo-operating-system layer on your device. If that is where things are heading, then designing products around cloud inference is designing for a dependency that will not age well.

So I made a deliberate choice: build CouponTracker as an on-device-first product.

- **No server costs** — the user's phone does the work, no cloud billing to maintain
- **No API latency** — extraction happens instantly, not after a network round-trip
- **No internet required** — the app works fully offline, which matters in real-world usage
- **No data leaving the device** — coupon screenshots stay on the user's phone, which is both a privacy and trust advantage
- **No dependency on someone else's model tokens** — no rate limits, no pricing changes, no third-party shutdown risk

This was not a technical optimization. It was a product philosophy: if the intelligence can live on the device, it should.

## 3. Why This Matters for My Role

I am a designer and builder, not a traditional developer. I do not write Kotlin or Python from scratch — I use AI tools like Claude, Cursor, and Codex to build. That is part of the point.

If someone like me can design and ship a multi-surface AI product without deep coding knowledge, then the barrier to building is already lower than most people think. The remaining challenge is not code. It is product judgment — knowing what to build, why, and how the pieces fit together.

CouponTracker is proof that design thinking, AI-assisted building, and strong product instincts can produce real systems, not just prototypes.

## 4. How It Started

The original product problem came from repeated friction in handling coupon screenshots:

- coupon codes were buried inside image-based offers
- cashback and expiry data appeared inconsistently
- there was no clean way to consolidate offers across apps
- users needed a fast way to retrieve all coupons or filter them by app
- expired offers created clutter if they were not lifecycle-managed

The earliest version of the idea was centered on a conversational workflow: ingest screenshots, extract coupon details, store them in a structured format, and retrieve them on demand.

That early thinking shaped the product direction, but the solution expanded far beyond a simple OCR utility.

## 5. What It Became

CouponTracker is now implemented as a complete coupon recognition system with multiple coordinated surfaces.

### Android mobile application

The Android app is the main end-user experience. It includes:

- on-device MiniCPM-Llama3-V2.5 Vision Model for intelligent coupon extraction
- two-stage multi-coupon detection using a YOLO-based flow with interactive boundary adjustment
- a smart fallback chain: LLM-based extraction → model-based extraction → pattern methods → ML Kit OCR with quality validation
- deferred persistence — users preview extraction results before saving
- duplicate detection and enhanced UI state handling
- offline-first architecture with local storage
- batch processing and smart capture support
- WhatsApp sharing — because coupons are inherently social, and WhatsApp is where sharing already happens in India

### Web-based training interface

A web training interface for managing the ML side of the system:

- a complete ML training pipeline with orchestration
- real-time annotation and pre-annotation services
- a model registry and automated packaging flow
- a comprehensive evaluation framework
- MLflow integration for experiment tracking

This turns CouponTracker into a continuously improvable system rather than a fixed app.

### Mobile PWA for offline annotation

A mobile Progressive Web App designed for offline training workflows:

- touch-based annotation for mobile devices
- offline storage using IndexedDB
- service worker support for full offline capability
- installable PWA behavior
- drag-and-drop upload workflows

Instead of assuming all model improvement work happens on desktop, the product adds a mobile-first annotation path that can operate offline.

## 6. Key Design Decisions

### On-device intelligence over cloud dependency

This is the central architectural decision. Rather than calling a cloud API for every extraction, the app downloads and runs models locally. This removes server costs, eliminates latency, preserves user privacy, and makes the app work without internet. As models continue to shrink and improve, this approach will only get stronger.

### Layered extraction instead of single-engine dependence

The fallback chain — LLM → model-based → pattern matching → ML Kit OCR — is the right approach for messy coupon content, where screenshot quality, visual design, and text structure vary heavily. A single engine would be fragile. A layered approach improves resilience.

### Preview-before-save workflow

The deferred persistence approach lets users preview outcomes before save, reducing incorrect records and maintaining data quality.

### WhatsApp as the sharing layer

Coupons are social — people share deals with family and friends. Rather than building a sharing system from scratch, the app uses WhatsApp, which is where most sharing already happens in India. Meet users where they are.

### Closed-loop learning system

By combining annotation tools, orchestration, evaluation, registry, and deployment flows, the project supports continuous model improvement rather than static release-based upgrades.

## 7. Architecture

The system is composed of end-user experiences, model infrastructure, and deployment tooling.

### Core pipeline

- `coupon_scraper.py` for coupon data collection
- `image_processor.py` for image preprocessing and enhancement
- `coupon_annotator.py` for field detection and annotation
- `coupon_trainer_cli.py` for training workflows
- `update_app.py` for Android app model deployment

### Technical stack

- **Android:** Kotlin, Jetpack Compose, Room DB, ML Kit
- **Backend and tooling:** Python, Flask, MLflow, PyTorch
- **Models:** YOLOv8, custom OCR models, TensorFlow Lite
- **Frontend and offline tooling:** PWA, IndexedDB, Service Workers
- **Infrastructure:** Docker, Gradle, Git LFS

## 8. Execution Evolution

### Phase 1 — Screenshot extraction concept

The project began with the basic need to extract coupon details from screenshots and organize them into a retrieval flow.

### Phase 2 — Structured coupon management

The schema became clearer: app name, coupon code, cashback, expiry date, plus query-driven retrieval.

### Phase 3 — On-device intelligence and multi-coupon handling

Recognition stopped being a simple OCR task. The app incorporated on-device models, ROI extraction, quality validation, and two-stage detection for handling multiple coupons in one flow.

### Phase 4 — Training infrastructure and feedback loop

The product expanded into tooling for annotation, model training, evaluation, packaging, and deployment. This turned it from a feature into a platform.

### Phase 5 — Production-oriented multi-surface system

CouponTracker is now production-ready, with Android, training web UI, testing workflows, and deployment pathways all represented in the system design.

## 9. Why This Project Is Strong

The strongest part of CouponTracker is not that it recognizes coupons. It is that it represents a product thesis about where AI is going — and builds accordingly.

- on-device-first intelligence instead of cloud dependency
- a designer-builder shipping a real multi-surface AI product using AI tools
- robustness through layered recognition strategies
- data quality through preview-before-save and validation
- model improvement infrastructure through annotation and training
- social sharing through WhatsApp instead of building custom infrastructure
- deployment-ready system thinking rather than prototype-only thinking

## 10. Outcome

CouponTracker now reads as a product platform rather than a narrow feature. It solves the original user problem — turning screenshot-based coupon content into usable structured information — while also establishing the training, validation, and deployment infrastructure needed to keep that system improving over time.

More importantly, it demonstrates that a designer with strong product instincts and AI-assisted building tools can ship production-grade systems. The bottleneck is not coding ability. It is knowing what to build and why.

> The strongest product work starts with a point of view about where things are heading, then builds the system that proves it.
