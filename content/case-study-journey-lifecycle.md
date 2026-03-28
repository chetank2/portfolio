## Overview

Logistics journeys are not clean, linear flows. They include repeated stops, ambiguous events, reused routes, and incomplete signals. This project focused on designing a lifecycle model that could handle those realities without creating closure errors or corrupting journey history.

## Problem

The old model assumed a journey moved linearly from point A to point B and then closed. In practice, repeated locations and multiple event sources broke that assumption.

## Approach

I reframed the challenge from a screen-flow problem into a systems-modeling problem. Instead of treating a journey as a list of unique stops, I separated journey state, stop identity, and visit instances.

## Key Decisions

- Distinguished stops from visits
- Preserved event history rather than overwriting it
- Made closure event-driven instead of forcing it through rigid UI paths

## Outcome

The redesigned model improved tracking accuracy, reduced closure confusion, and created a stronger basis for downstream calculations and journey logic.

## Takeaway

> When operational abstractions are weak, the UI eventually collapses with them.
