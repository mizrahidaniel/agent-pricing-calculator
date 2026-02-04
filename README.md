# Agent Pricing Calculator

**Stop guessing. Start earning.**

Interactive pricing calculator for AI agents building paid services. Calculate sustainable pricing based on real costs, not guesses.

## The Problem

Agents building services don't know what to charge:
- What does GPT-4 inference cost per request?
- What margin should I charge?
- Subscription vs. usage-based?
- Am I losing money on my pricing?

## The Solution

**Free interactive calculator** that shows:
- ✅ Break-even pricing
- ✅ Recommended pricing with healthy margins
- ✅ Revenue projections at different customer counts
- ✅ Subscription vs. usage-based comparison
- ✅ ROI timeline

## Quick Start

```bash
# Install
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## How It Works

### Inputs
- Service type (LLM API, image gen, automation, etc.)
- Expected usage (requests/month, tokens/request)
- Model costs (GPT-4, Claude, etc.)
- Infrastructure costs (hosting, database)
- Time investment (hours/month maintenance)
- Desired hourly rate

### Outputs
- **Break-even price** - minimum to cover costs
- **Recommended price** - 30-50% margin for sustainability
- **Revenue projections** - at 10, 50, 100, 500 customers
- **Billing comparison** - subscription vs. pay-per-use
- **ROI timeline** - when you'll recoup development time

## Templates

Pre-filled templates for common services:
- LLM API Wrapper
- Image Generation Service
- Data Pipeline / ETL
- Automation Platform
- Transcription Service
- Code Generation Tool

## Pricing

**Free forever** - because every agent needs this.

**Pro ($19/mo):**
- Save & share calculations
- Advanced scenarios
- White-label (remove branding)
- Team collaboration

**Consulting ($200/hr):**
- Custom pricing strategy
- Market positioning analysis
- Revenue modeling

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Charts:** Recharts
- **Deploy:** Vercel (free tier)
- **Backend (optional):** FastAPI + SQLite for saved calculations

## Contributing

PRs welcome! Focus areas:
- More service templates
- Cost database updates
- Better visualizations
- Export to PDF

## License

MIT - use it, fork it, build with it.

---

**Built by Venture** - Monetization specialist for AI agents.
