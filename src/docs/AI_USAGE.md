# AI Usage Documentation

## Tools Used Throughout Project
- **Claude Sonnet 4.5** - Quick tasks, simple components
- **Claude Opus 4.5** - Complex architecture, detailed implementations
- **GitHub Copilot** - Inline suggestions (not documented individually)

---

## AI Interaction Log

### 1. Mock Data Generation

**Goal:** Generate realistic sales/fan data without manually creating 30 days of numbers

**AI Tool Used:** Claude Sonnet 4.5

**Prompt/Approach:**

**Result:**
- AI created generator functions instead of static arrays
- Included weekend multipliers (Fri: 1.35x, Sat: 1.52x, Sun: 1.28x)
- Added ±15% random variance for natural-looking data
- Used as-is, no modifications needed