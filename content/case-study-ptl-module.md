## Overview

Part-truckload operations introduced a different operational model from full-truckload workflows. A single journey could involve multiple shipments, multiple drop points, and fragmented tracking states. The existing product assumptions did not hold up well under that structure.

## Problem

The product was shaped around FTL logic, but PTL required grouped shipments, split deliveries, and more complex coordination.

## Approach

I studied where PTL diverged from the current model and designed a workflow around grouped and fragmented operations instead of treating them as exceptions.

## Key Decisions

- Represented relationships across shipment units more clearly
- Supported multi-point coordination
- Preserved enough flexibility to reflect real operations without losing structure

## Outcome

The PTL module gave operators a clearer way to manage fragmented shipments and established a better foundation for supporting PTL at the system level.

## Takeaway

> Extending a product from one operational model to another usually requires rethinking assumptions, not just adding screens.
