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

-------------------------------------------------------------

### 2. Sidebar Expansion Issue

**Goal:** Sidebar that expands on hover and pushes the main content

**AI Tool Used:** Claude Sonnet 4

**Prompt:** Create Header and Sidebar for a music artist dashboard:

Header: fixed top, logo "Pulse" left, artist "Marcus Cole" with avatar right, h-16

Sidebar: fixed left, nav items with lucide icons: Dashboard, Releases, Analytics, Fans, Settings. On desktop: collapsed by default (w-16, icons only), expands on hover (w-64, shows labels) pushing main content. Smooth transition.

Update app/layout.tsx to include both. Use shadcn, TypeScript, Tailwind. Responsive.

**Result:** 
Sidebar animation worked but the main content stayed in place. Realized the expand state was stuck inside Sidebar component so DashboardLayout couldn't know when to adjust padding.

**What I did:** Asked AI to move the state up to DashboardLayout and pass it down. Then main could use the same state to transition its padding.

**Learning:** Should've been clearer about needing the state shared between components from the start.

-------------------------------------------------------------
