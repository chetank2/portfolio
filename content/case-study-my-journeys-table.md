## Overview

Tables in logistics products often become broken dashboards over time. I redesigned the My Journeys table by fixing its mental model, reducing visual noise, and improving how operations teams scanned and acted on information.

## Problem

The table had become overloaded with columns, statuses, and secondary information. It was hard to scan, hard to prioritize, and difficult to use under operational pressure. The problem was not just clutter. The table had stopped supporting decision-making.

## Context

This table was used heavily by operations teams managing large numbers of active journeys. Their goal was not to read rows in detail. Their goal was to quickly identify issues, exceptions, and next actions.

## Goals

- improve scan speed
- reduce cognitive load
- make the table more actionable
- create clearer hierarchy between signal and noise

## Approach

I looked at the table as a decision tool rather than a data container. I identified what users actually scanned for, grouped information by intent, and rebuilt hierarchy around operational priorities instead of historical accumulation.

## Key Decisions

### Treat the table as a decision surface

The redesign focused on helping users notice what needed attention fast instead of exposing every possible data point equally.

### Group information by intent

Rather than letting each column compete equally, I organized the table around status, exceptions, and action-related information.

### Remove visual noise aggressively

Not every badge, label, or column deserved to survive. Simplifying the table improved comprehension more than adding new controls would have.

## Solution

I redesigned the table with cleaner structure, stronger hierarchy, and a more action-oriented layout. Important information became easier to scan, and secondary information stopped interrupting decision-making.

## Edge Cases

- very large datasets
- multiple filters applied at once
- ambiguous statuses across journeys
- varying levels of urgency in the same view

## Impact

The redesign improved scanability, reduced cognitive fatigue, and helped teams make faster operational decisions.

## Learnings

Tables fail when they try to become everything at once. A good table is not a dump of information. It is a structured interface for action.
