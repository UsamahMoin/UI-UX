# Usamah Moin: UI/UX Portfolio

A personal UI/UX portfolio showcasing eleven responsive, interactive concept projects across product strategy, visual design, and interaction design.

**Live portfolio:** [usamahmoin.github.io/UI-UX](https://usamahmoin.github.io/UI-UX/)

## Project worlds

- **NOVA:** intelligence dashboard
- **SEREIN:** digital hospitality
- **FORM:** culture archive
- **AURA:** generative listening room
- **VERNACULAR:** type laboratory
- **FIELD:** trail companion
- **ATELIER:** collectible commerce
- **SIGNAL:** humane finance
- **CIVIC:** public service commons
- **LUMEN:** collaborative canvas
- **PANTRY:** food marketplace

## Run locally

```bash
npm install
npm run dev
```

Built with React, Vinext, TypeScript, Tailwind CSS, and Lucide icons.

## Signal money tracker

Open `/work/signal` for a browser-local USD ledger with transactions, searchable activity and CSV export, manual accounts, monthly category budgets, savings reserves, bill reminders, and balance history. Data starts with labeled examples; use **Data and settings → Start with my own data**, set an opening balance in **Accounts**, then record transactions. Bill reminders are one-time entries; marking paid records an expense and never sends a payment.

Changes persist in this browser on this site only. **Backup** downloads JSON; **Restore** validates and replaces data with confirmation. Use backups to move between devices or the GitHub Pages and Sites domains. No bank sync, payments, authentication for financial records, or cross-device storage is connected.

Money calculations and backup validation can be checked with `node --experimental-strip-types --test tests/signal.test.mjs`.
