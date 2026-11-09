RFID Event Check-In & Lucky Draw — Prototype

A three-screen event check-in prototype: an operator console, a public viewport, and a lucky-draw screen, synced via browser storage. Built to validate the scan → welcome → reset pipeline and the operational edge cases (duplicate scans, mis-scans, hardware fallback) rather than as a production system.
How to run

Open the three pages in separate browser tabs from the same origin:

    index.html — operator console

    public.html — public viewport

    draw.html — lucky-draw screen

The operator page is the only control surface. The public and draw pages are display-only and react to events written by the operator.
Screens

Operator (index.html) — attendee table, "Add walk-in" form, per-guest "Simulate Tag Entry," manual/QR fallback input, reset check-in, and "Run Lucky Draw" / "Reset Draw."

Public viewport (public.html) — idle state ("WELCOME — Please walk towards the screen to check in"), then a personalized welcome with the guest's name and routing on scan, resetting after 4 seconds.

Draw screen (draw.html) — shows the entrant count and, when the operator runs the draw, the winner. Display-only; no controls.
Architecture

Three static pages sharing one JS module. The operator writes events to localStorage (scanEvent, attendeesState, drawEvent); the public and draw pages listen for storage events and render. No backend, no database — state lives in the browser. This mirrors a decoupled ingestion → middleware → viewport pipeline in the smallest possible form.
What's implemented

    Scan → lookup → welcome → 4-second reset loop

    Duplicate-scan de-dup (same tag ignored within 3 seconds)

    Manual/QR fallback input (same pipeline as the scanner)

    Check-in reset for mis-scans

    Random lucky draw from checked-in attendees, with an operator-triggered reset

Deliberately out of scope

    No real RFID reader or camera QR decoding — inputs are simulated

    No backend, database, auth, or multi-event support

    Draw round lifecycle is operator-driven rather than fully automated

    Visual design is minimal by design — the goal was the pipeline logic

Client questions I'd ask before production

    What's the scan-to-welcome latency budget?

    What happens if the network drops mid-event — offline mode?

    Duplicate scans: block, or allow re-entry with a flag?

    Prize eligibility: all checked-in guests, or a subset (tier/seat)?

    What guest data is stored, and for how long (privacy)?

    What's the hardware fallback if the RFID reader fails?

What I'd build next

    Real reader/QR integration behind the same ingestion interface

    Offline queue + sync

    Draw round lifecycle (close entries, audit trail)

    The "Gamified Retention Pool" slot-machine module
