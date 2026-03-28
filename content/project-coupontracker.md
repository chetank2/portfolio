# CouponTracker

*Complete coupon recognition system with on-device ML and training pipeline*

**Repo:** [github.com/chetank2/coupontracker](https://github.com/chetank2/coupontracker)
**Language:** Python, Kotlin
**Status:** Production Ready
**Built with:** AI-assisted development (AI tools used for coding)

---

## Overview

CouponTracker is a full-stack coupon recognition system — from capturing coupon images on a phone to extracting structured data using on-device ML models. It includes an Android app, a web-based ML training interface, and a mobile PWA for offline annotation.

## What It Does

- **Capture coupons** via Android app camera
- **Detect multiple coupons** in a single image using YOLO-based two-stage detection
- **Extract coupon fields** (brand, discount, expiry, code) using on-device LLM
- **Train and improve models** through a web-based training pipeline
- **Annotate data offline** via mobile PWA

## System Components

### Android Mobile App

- **MiniCPM-Llama3-V2.5 Vision Model** — On-device LLM for intelligent coupon extraction
- **Two-Stage Multi-Coupon Detection** — YOLO-based detection with interactive boundary adjustment
- **Smart Fallback Chain** — LLM → Model-Based → Pattern → ML Kit OCR with quality validation
- **Deferred Persistence** — Preview-before-save workflow with duplicate detection
- Advanced OCR with Phase 4 ROI integration
- Multi-engine text recognition (ML Kit, Tesseract, custom models)
- Offline-first architecture with local storage
- Smart capture and batch processing

### Web Training Interface

- Complete ML training pipeline with orchestration
- Real-time annotation and pre-annotation services
- Model registry and automated packaging
- Comprehensive evaluation framework
- MLflow integration for experiment tracking

### Mobile PWA for Offline Training

- Touch-based annotation system for mobile devices
- Offline functionality with IndexedDB storage
- Service Worker for complete offline capability
- Installable Progressive Web App
- Drag & drop upload interface

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Android | Kotlin, Jetpack Compose, Room DB, ML Kit |
| Backend | Python, Flask, MLflow, PyTorch |
| ML Models | YOLOv8, Custom OCR models, TensorFlow Lite |
| On-device LLM | MiniCPM-Llama3-V2.5 (vision model) |
| Frontend | Progressive Web App, IndexedDB, Service Workers |
| Infrastructure | Docker, Gradle, Git LFS |

## Architecture

### Core Training Pipeline

```
coupon_scraper.py       → Web scraping for data collection
image_processor.py      → Image preprocessing and enhancement
coupon_annotator.py     → Field detection and annotation
coupon_trainer_cli.py   → CLI for model training workflows
update_app.py           → Android app model deployment
```

### ML Training System (`coupon-training/`)

- **Dataset Management** — Version control and organization
- **Pre-annotation** — Intelligent candidate generation
- **Training Orchestrator** — Job scheduling and monitoring
- **Model Registry** — Packaging and deployment pipeline
- **Evaluation Framework** — Golden sets and metrics tracking

### OCR Pipeline

- ROI-based text extraction with confidence scoring
- Multi-engine OCR with fallback mechanisms
- Intelligent field recognition and validation
- Real-time processing with comprehensive metrics

## Extraction Architecture V2

The system's core philosophy: **LLM as locator**, **OCR as ground truth**, **fusion as field-by-field arbitrator**.

### Three Configurable Strategies (via remote config)

| Strategy | How It Works |
|----------|-------------|
| **LLM_FIRST** | Vision model locates regions → OCR extracts text → fusion reconciles |
| **OCR_FIRST** | OCR finds text → LLM validates semantics → fusion decides |
| **HYBRID** | Parallel execution with fusion arbitration |

### Per-Field Confidence Thresholds

| Field | Threshold | Validation |
|-------|-----------|------------|
| Code | 0.85 | Brand context + regex + OCR match ≤2 edits |
| Expiry | 0.70 | Parsed, not expired, near temporal tokens |
| Cashback | 0.75 | Amount/percentage near currency tokens |
| Store | 0.60 | Brand detection or prominent text |

**Aggregate rule:** Code AND (expiry OR cashback) must meet thresholds.

### Field Fusion Logic

When LLM and OCR candidates have edit distance ≤2, fusion confidence multiplies by 1.2× (capped at 1.0). Highest-scoring candidate wins.

### Safety Guardrails

Cascading timeouts prevent hangs:

- LLM tile: 2 seconds
- OCR batch: 1 second
- Fusion: 300ms
- E2E per coupon: 6 seconds

Timeout failures trigger traditional OCR fallback, logged in `RunPath.tried` and `RunPath.reasons`.

### Memory Management

Singleton `BitmapManager` enforces 3×768² pixel budget (~1.77M pixels). Operations chain with in-place recycling — only non-source, non-identical intermediate bitmaps are freed. Weak references track active buffers.

### Observability (6 Key Metrics)

1. E2E latency (P50, P95) by device bucket
2. Path distribution (LLM_FIRST %, OCR_FIRST %, fallback %)
3. Field-level F1 scores (code ≥0.96, expiry ≥0.90, cashback ≥0.92)
4. LLM–OCR disagreement rates by brand
5. User review/correction acceptance rates
6. Memory (avg max heap, native RSS)

## UX Design Decisions

- **Inline diff** — Highlights character mismatches between candidates (e.g., O vs 0)
- **Confidence chips** — Low-confidence fields shown with dotted underlines and tooltips
- **Deduplication** — Stable hash combines store name, code, expiry, and perceptual image hash
- **Preview-before-save** — Users validate extracted data before committing

## Security

- Zip-slip path traversal prevention
- Symbolic link rejection
- Executable file (.so) rejection
- SHA256 checksum verification against manifest
- File size validation to detect placeholders
- Atomic file moves with `.verified` marker

## Model Import Architecture

Five sequential phases:

1. **Read** — System reads ZIP structure, validates manifest.json
2. **Extract** — Files to staging directory (zip-slip + symlink protection)
3. **Verify** — SHA256 checksum validation against manifest values
4. **Install** — Atomic move to models directory, `.verified` marker created
5. **Self-test** — Loads test coupon image through extraction pipeline

## Feedback Loop

`ExtractionFeedback` table records extraction method, original/corrected values, per-stage signals, device info, and consent. Trains pattern databases and measures disagreement hotspots across brands and device tiers.

## Performance (Pixel 6 Pro benchmarks)

- 3.2s average inference time
- 92% store-name accuracy
- 99.2% duplicate-detection precision
- 95%+ field extraction success rate
- 500-700ms extraction via OCR-only path

## Key Technical Decisions

**1. Smart Fallback Chain**
LLM → Model-Based → Pattern → ML Kit OCR. Each stage validates quality before falling back. Ensures best possible extraction regardless of coupon complexity.

**2. On-Device LLM (MiniCPM-Llama3-V2.5)**
Vision model runs entirely on device — no server dependency. Privacy-first, works offline.

**3. Two-Stage Detection**
First stage: detect coupon boundaries (YOLO). Second stage: extract fields within boundaries. Users can adjust boundaries interactively before extraction.

**4. Separation of Localization vs Validation**
LLM/OCR handles localization. Fusion logic handles validation. Strategies are swappable per device class without rewriting core logic. Remote config gates all thresholds — rapid tuning without app releases.

**5. Offline-First Architecture**
Local Room DB storage. PWA with Service Workers for training annotation. No internet required for core functionality.

**6. Learned Patterns**
Migrated from SharedPreferences to Room with success/attempt tracking and brand-specific weighting. Enables offline learning loops.

## What Makes This Notable

- End-to-end ML system: data collection → annotation → training → deployment → on-device inference
- On-device LLM integration (not cloud API) — deep mobile ML understanding
- Three-pillar extraction architecture (LLM + OCR + Fusion) with remote-configurable strategies
- Production-grade observability with 6 key metrics and field-level F1 tracking
- Multi-engine fallback shows production thinking, not demo-level work
- Security-hardened model import with 5-phase verification
- Training pipeline with MLflow shows ML engineering maturity
- Offline-first design throughout the entire system
