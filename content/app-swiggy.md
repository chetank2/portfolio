# Swiggy — Meal Subscriptions Feature

**Introducing a new feature, meal subscriptions, to allow customers to save time and order food more frequently.**

## The Task

A lot of people depend on food delivery services for their meals. During open-ended research, it was revealed that regular users feel that while there are many options to order from, they don't tend to have time when they actually want to order food.

**Challenge:** Solve this disconnect by building a feature to schedule orders and extend it to create weekly and monthly subscriptions.

## Goal

Swiggy's mission is to "change the way India eats." However, the existing ordering process can be time-consuming for busy customers. The goal is to introduce meal subscriptions to save time and increase ordering frequency — aiming for 15-20 orders per month.

## Audience

Corporate employees, fitness enthusiasts, entrepreneurs, business people, and anyone busy during the day who needs to save time on food ordering.

## Context

Food delivered to offices during lunch/dinner hours, and to homes for dinner.

## Solution

Designed three user flows following Swiggy's existing information architecture to ensure minimal disruptions:

### User Flow 1 — From Box Page
User directed to new subscription page "Box" via tooltip messages. Creates first subscription by selecting food items.

Home → Box Page → Create Subscription → Checkout

### User Flow 2 — From Past Orders
Convert past orders to subscriptions from the "Past Orders" screen.

Home → Profile → Past Orders → Add to Subscription → Create Subscription → Checkout

### User Flow 3 — From Favorites
"Favorite orders" converted to subscriptions.

Home → Favorite Orders → Add to Subscription → Create Subscription → Checkout

## Subscription Page Design — 3 Steps

### Step 1: Adding Food Items
Same as ordering food — choose restaurant and add items to cart.

### Step 2: Creating Subscription
- Name the subscription
- Choose what it's for (Breakfast / Lunch / Dinner / Custom)

### Step 3: Subscription Plan
Two plan types with predefined options:
- **Weekly** or **Monthly**
- Select ordering days: Weekdays (Mon-Fri), Weekends, Daily, Custom
- Set time for automatic order placement
- Notifications sent 15 min before order placement

## Key Design Decisions

- Followed Swiggy's approach: only one CTA button, no deviations during task flow
- Mimicked existing food ordering flow for familiarity
- Split into two steps: (1) Add food items, (2) Create subscription with details + payment
- Minimized input fields, used tap gestures wherever possible

## Constraints & Special Cases

- Food items exclusively from one restaurant (Swiggy's system rule)
- No adding extra items after subscription starts (billing complexity)
- Average delivery charge from past orders incorporated into subscription fee
- No modifications once subscription has started
- System notifies user if restaurant is closed and cancels order accordingly
