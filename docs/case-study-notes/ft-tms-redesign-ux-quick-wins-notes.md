# Redesigning Freight Tiger's TMS

## UX Quick Wins Notes

### Brief

Add pin-able filters to make the page actionable.

### Product and company overview

The product helps manufacturing plants track the movement of vehicles from plant to distributors and from vendor locations to the plant.

Freight Tiger builds a Transportation Management System helping logistics managers with logistics planning, vehicle procurement, proof of delivery, and freight invoicing.

### Context

This project started as a UX Quick Wins effort after the team observed that the page was not actionable enough. The immediate recommendation was to add pin-able filters so users could prioritize what needed attention. The broader design scope was to make the product cleaner, easier to use, and more operationally useful.

This work also sat within a larger product reset. As the first senior full-time design hire, the responsibility was not just to improve visual quality, but to increase usability and make the product feel trustworthy and efficient for daily operations.

### Core challenge

The initial challenge was twofold:

1. Develop product context: understand the product, customer, and user journey before recommending changes.
2. Understand user pain points directly: the early information was second-hand, so direct user input was necessary.

### Project overview

The project focused on the trip listing page used to monitor ongoing trips transporting goods between locations.

The existing interface made it difficult for users to decide where to start, which trips mattered most, and what they should act on first.

### How the challenges were addressed

1. The product was tested directly to understand existing workflows and identify notable UI issues.
2. A series of workshops with sales and customer success teams helped map the user journey and the customer journey.
3. Customer support calls were observed with CSMs, with time reserved to ask customers for direct feedback.

### Critical actionable insights

#### 1. Users needed help prioritizing trips

Users were monitoring large numbers of vehicles and struggled to identify what required immediate attention. Even with filters for alerts such as transit delay or long stoppage, the page did not help them decide what to focus on first.

Quotes:

- "I need to know what is burning."
- "I have 100s of trips running daily, and we are just two managers. We cannot handle 50 alerts a day."
- "My dispatch manager was pissed at me because he had to pay the contracted labourers, and the truck was delayed by a day."

#### 2. Users needed pickup-to-drop overview

The product did not help users understand where they needed to focus across the journey lifecycle.

Quotes:

- "I don't know where to start and what to look for."
- "I want to know where the vehicles are stuck so that I can call the right people and alert them in advance."

#### 3. Users needed explicit trip status

Users could not tell at a glance whether a trip was on time or delayed.

Quotes:

- "How do I find out if the trip is delayed?"
- "When my customer complains about a delay, I check the ETA to inform them of the arrival time."

#### 4. Tracking health was not meaningful

Users did not understand tracking health and mostly ignored it. No user recognized it as a useful operational signal.

Quote:

- "Just tell me the tracking method."

#### 5. Trip creation time was not useful for most users

Consignors did not use trip creation time to identify trips. They relied on their SAP or Salesforce IDs.

#### 6. IDs were primarily used for search

Users relied on invoice numbers, SAP unique feed IDs, or sales order numbers to locate trips.

Quotes:

- "When my customer enquires about an invoice, I search by the invoice number."
- "I search SAP unique feed ID, or sales order number on the Trip list to track the sales order."

### Design considerations

#### 1. Pickup-to-drop visibility

Summary tabs were introduced above the data table to guide users toward the areas requiring attention. These tabs were meant to work with filters and sorting rather than replace them.

#### 2. Status column

A dedicated status column was needed so users could know at a glance if the trip was on time or delayed.

#### 3. Highlight exceptions

Because users manage large datasets, the design principle was to draw attention only when something required intervention.

#### 4. Space optimization

Most users were working on 1366x720 screens, so space-saving decisions were necessary.

#### 5. Streamlined navigation

Actions were removed from the navigation to simplify the flow and reduce distraction.

### User testing feedback

Five customers were interviewed and tested on the redesigned direction.

#### 1. Presets were needed for the overview

Users found the overview useful, but wanted presets that covered common use cases. Most clicked into delayed or detained states.

Quotes:

- "When I click on the long stoppage will it first show me the one with the highest duration?"
- "I liked it. This will be useful."

#### 2. Info bar needed to be customizable

Different customers needed different identifiers and data points. One customer wanted temperature, another wanted container IDs, while others wanted sales IDs.

#### 3. Inbound and outbound indicators created overload

Only a small set of users, mainly admins, wanted to see them. Most users already worked within one operational slice and did not need that extra distinction.

#### 4. SIM consent was important

Users wanted to know whether driver SIM consent was available, because it was a key operational fallback metric.

#### 5. Trip creation date still mattered for transporters

Where consignors used ERP IDs, transporters still considered creation time useful as a secondary identifier.

### Usability issues found in testing

1. It was not obvious that users had to click Apply to use filters.
2. In-transit delay needed stronger prominence in the overview.
3. The design needed clearer indication that a filter was active.

### Revisiting the design

The follow-up refinements included:

1. Adding a customizable info bar to support varied customer needs.
2. Using a cleaner visual design that highlighted exceptions needing attention.
3. Making it clearer that filters only apply after the user clicks Apply.

### Final direction

The final design aimed to deliver a highly customizable and intuitive interface for logistics operations, balancing customer-specific needs with a scalable product skeleton that could later extend across modules.

This work reportedly evolved across multiple versions over more than a year, with a combination of ongoing research, design iteration, and internal refinement.

## Image inventory to use later

These are the images the user wants saved and later integrated into the case study:

1. Research matrix showing user questions, FT opportunities, and quick filter ideas.
2. Journey details / tracking page composite with desktop and mobile.
3. Legacy My Trips page before redesign.
4. Add Trip usability review screenshot with numbered annotations.
5. Early summary / pin-filter strip concept.
6. Repeated research matrix capture.
7. Redesigned My Trips listing page with summary tabs and trip rows.
8. Customise trip info bar modal.
9. Cleaner list view with top summary cards and simplified table.
10. Filter drawer / mobile-friendly filter experience.

## Suggested asset filenames

When the actual image files are available, save them under:

- `/Users/user/Documents/portfolio/public/assets/ft-tms-redesign/trip-prioritization-research.png`
- `/Users/user/Documents/portfolio/public/assets/ft-tms-redesign/journey-details-composite.png`
- `/Users/user/Documents/portfolio/public/assets/ft-tms-redesign/my-trips-before.png`
- `/Users/user/Documents/portfolio/public/assets/ft-tms-redesign/add-trip-usability-review.png`
- `/Users/user/Documents/portfolio/public/assets/ft-tms-redesign/pin-filters-concept.png`
- `/Users/user/Documents/portfolio/public/assets/ft-tms-redesign/my-trips-redesign-final.png`
- `/Users/user/Documents/portfolio/public/assets/ft-tms-redesign/customize-trip-info-bar.png`
- `/Users/user/Documents/portfolio/public/assets/ft-tms-redesign/my-trips-clean-list.png`
- `/Users/user/Documents/portfolio/public/assets/ft-tms-redesign/filter-drawer.png`

## Status

The case study itself is intentionally unchanged for now. This file exists only to preserve the research and image plan until the next editing pass.
