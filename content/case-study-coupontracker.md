## 1. Overview

CouponTracker began as a practical attempt to solve a messy everyday problem: coupon details were trapped inside screenshots, difficult to compare, and easy to forget once they expired. What started as a screenshot-based coupon extraction idea has now evolved into a much broader system — a production-oriented coupon recognition platform with an Android app, web-based ML training interfaces, a mobile PWA for offline annotation, and a full model training and deployment pipeline.

This shift matters because the project is no longer just about reading text from an image. It now represents a complete product and infrastructure layer for coupon recognition, field extraction, model training, validation, and deployment.

## 2. How It Started

The original product problem came from repeated friction in handling coupon screenshots:

- coupon codes were buried inside image-based offers
- cashback and expiry data appeared inconsistently
- there was no clean way to consolidate offers across apps
- users needed a fast way to retrieve all coupons or filter them by app
- expired offers created clutter if they were not lifecycle-managed

The earliest version of the idea was centered on a conversational workflow: ingest screenshots, extract coupon details, store them in a structured format, and show a clean table when the user typed `Show` or `Show {app_name}`.

That early thinking shaped the product direction, but the solution expanded far beyond a simple OCR utility.

## 3. What It Became

CouponTracker is now implemented as a complete coupon recognition system with multiple coordinated surfaces.

### Android mobile application

The Android app is the main end-user experience. It includes:

- on-device MiniCPM-Llama3-V2.5 Vision Model integration for intelligent coupon extraction
- two-stage multi-coupon detection using a YOLO-based detection flow with interactive boundary adjustment
- a smart fallback chain that moves through LLM-based extraction, model-based extraction, pattern methods, and ML Kit OCR with quality validation
- deferred persistence — users can preview extraction results before saving them
- duplicate detection and enhanced UI state handling
- offline-first architecture with local storage
- batch processing and smart capture support

Instead of relying on one extraction engine, the product is designed as a layered recognition system that trades off intelligence, resilience, and reliability.

### Web-based training interface

The repository also includes a web training interface for managing the ML side of the system:

- a complete ML training pipeline with orchestration
- real-time annotation and pre-annotation services
- a model registry and automated packaging flow
- a comprehensive evaluation framework
- MLflow integration for experiment tracking

This is strategically important because it turns CouponTracker into a continuously improvable system rather than a fixed app.

### Mobile PWA for offline annotation

A third layer of the product is a mobile Progressive Web App designed for offline training workflows:

- touch-based annotation for mobile devices
- offline storage using IndexedDB
- service worker support for full offline capability
- installable PWA behavior
- drag-and-drop upload workflows

Instead of assuming all model improvement work happens on desktop, the product adds a mobile-first annotation path that can operate offline.

## 4. Problem Reframed

With the full system context, the core problem is broader and more ambitious than the original idea.

The challenge is not only "How do I read coupon screenshots?" — it becomes:

**"How do I build a reliable coupon recognition system that can detect multiple coupons, extract fields intelligently, improve through training, work offline, and support deployment into a real Android product?"**

That reframing is what makes the project much stronger as a case study.

## 5. Architecture

The system is composed of end-user experiences, model infrastructure, and deployment tooling.

### Core pipeline

- `coupon_scraper.py` for coupon data collection
- `image_processor.py` for image preprocessing and enhancement
- `coupon_annotator.py` for field detection and annotation
- `coupon_trainer_cli.py` for training workflows
- `update_app.py` for Android app model deployment

### Training system

- dataset management
- pre-annotation
- a training orchestrator
- model registry and packaging
- evaluation framework with metrics tracking

### Technical stack

- **Android:** Kotlin, Jetpack Compose, Room DB, ML Kit
- **Backend and tooling:** Python, Flask, MLflow, PyTorch
- **Models:** YOLOv8, custom OCR models, TensorFlow Lite
- **Frontend and offline tooling:** PWA, IndexedDB, Service Workers
- **Infrastructure:** Docker, Gradle, Git LFS

## 6. Key Design Decisions

### Layered extraction instead of single-engine dependence

The fallback chain — LLM → model-based extraction → pattern matching → ML Kit OCR with validation — is the right approach for messy coupon content, where screenshot quality, visual design, and text structure vary heavily across sources. A single engine would create fragile behavior. A layered approach improves resilience.

### Preview-before-save workflow

The deferred persistence approach lets users preview outcomes before save, reducing incorrect records and helping maintain data quality.

### Offline-first thinking

The Android app uses offline-first local storage, and the PWA includes IndexedDB and service workers for offline capability. The product is designed for real-world usage conditions rather than assuming always-on connectivity.

### Closed-loop learning system

By combining annotation tools, orchestration, evaluation, registry, and deployment flows, the project supports continuous model improvement rather than static release-based upgrades.

## 7. Execution Evolution

### Phase 1 — Screenshot extraction concept

The project began with the basic need to extract coupon details from screenshots and organize them into a user-friendly retrieval flow.

### Phase 2 — Structured coupon management

The schema became clearer: app name, coupon code, cashback, expiry date, plus query-driven retrieval like `Show` and `Show {app_name}`.

### Phase 3 — Recognition quality and multi-coupon handling

Recognition stopped being a simple OCR task. The Android app incorporated advanced OCR, ROI extraction, quality validation, and two-stage detection for handling multiple coupons in one flow.

### Phase 4 — Training infrastructure and feedback loop

The product expanded into tooling for annotation, model training, evaluation, packaging, and deployment. This turned it from a feature into a platform.

### Phase 5 — Production-oriented multi-surface system

CouponTracker is now production-ready, with Android, training web UI, testing workflows, and deployment pathways all represented in the system design.

## 8. Why This Project Is Strong

The strongest part of CouponTracker is not that it recognizes coupons. It is that it connects multiple layers of value:

- end-user extraction experience on Android
- robustness through multiple recognition strategies
- data quality through preview-before-save and validation
- model improvement infrastructure through annotation and training
- offline workflows for both usage and dataset preparation
- deployment-ready system thinking rather than prototype-only thinking

## 9. Outcome

CouponTracker now reads as a product platform rather than a narrow feature. It solves the original user problem — turning screenshot-based coupon content into usable structured information — while also establishing the training, validation, and deployment infrastructure needed to keep that system improving over time.

> The strongest product work often starts with a small pain point, then grows into the systems required to make that experience reliable and scalable.
