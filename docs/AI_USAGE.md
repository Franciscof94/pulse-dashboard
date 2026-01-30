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

**Learning:**
AI gives working solutions but doesn't always consider DRY principles or existing libraries that solve the same problem better.

-------------------------------------------------------------

### 2. Sidebar Expansion Issue

**Goal:** Sidebar that expands on hover and pushes the main content

**AI Tool Used:** Claude Sonnet 4.5

**Prompt:** Create Header and Sidebar for a music artist dashboard:

Header: fixed top, logo "Pulse" left, artist "Marcus Cole" with avatar right, h-16

Sidebar: fixed left, nav items with lucide icons: Dashboard, Releases, Analytics, Fans, Settings. On desktop: collapsed by default (w-16, icons only), expands on hover (w-64, shows labels) pushing main content. Smooth transition.

Update app/layout.tsx to include both. Use shadcn, TypeScript, Tailwind. Responsive.

**Result:** 
Sidebar animation worked but the main content stayed in place. Realized the expand state was stuck inside Sidebar component so DashboardLayout couldn't know when to adjust padding.

**What I did:** Asked AI to move the state up to DashboardLayout and pass it down. Then main could use the same state to transition its padding.

**Learning:** Should've been clearer about needing the state shared between components from the start.

-------------------------------------------------------------

### 3. Custom Hooks Implementation

**Goal:** Create data fetching hooks with loading/error states

**AI Tool Used:** Claude Opus 4.5

**Prompt:** Create custom React hooks for data fetching simulation: useReleases, useSalesData, useFanMetrics. Each with loading, error, data states, 500ms delay, AbortController for cleanup, refetch function.

**Result:**
AI created 3 separate hooks with identical structure. Each one has ~50 lines with the same logic, only changing the type and mock data source.

**What I noticed:**
- Could've been a single generic `useAsyncData<T>` hook instead of 3 duplicated ones
- For a real project I'd probably use SWR or React Query - they handle caching, revalidation, and deduplication out of the box
- The AbortController logic is repeated in each hook. In production with Axios, this would go in an interceptor so it's global

**What I kept:**
Used as-is. The duplication is fine for this scope and each hook is self-contained and readable.

**What I'd do differently:**
- Generic hook for DRY code
- Or just use SWR: `const { data, error, isLoading } = useSWR('releases', fetcher)`
- Or React Query: `const { data, error, isLoading } = useQuery({ queryKey: ['sales'], queryFn: fetchSales })`
- Move abort logic to an Axios instance with interceptors

**Learning:**
AI gives working solutions but doesn't always consider DRY principles or existing libraries that solve the same problem better.

-------------------------------------------------------------

### 4. Hydration Mismatch Bug

**Goal:** Fix React hydration error caused by randomized skeleton heights

**AI Tool Used:** Claude Sonnet 4.5

**Prompt/Approach:**
Got production error: "A tree hydrated but some attributes of the server-rendered HTML didn't match the client properties." Pasted the error message and asked AI to diagnose.

**Result:**
- AI immediately identified `Math.random()` in SalesChartSkeleton as the culprit
- Server renders one random value, client renders different value → React throws error
- AI replaced with fixed array: `const barHeights = [48, 85, 68, 55, 72, ...]`
- Fixed in <2 minutes vs 10+ minutes debugging React DevTools

**Learning:**
Classic Next.js - anything non-deterministic (Date.now(), Math.random(), browser APIs) breaks SSR hydration. Should've known this pattern, but AI caught it faster than manual debugging.

---

## Reflection

### How I used AI strategically

Used Sonnet for speed (components, configs), Opus for complexity (architecture, hooks). Started with broad prompts, refined when things broke. AI crushed boilerplate and error fixes, but needed guidance on state management patterns.

**What worked:**
- Mock data with realistic patterns (weekend multipliers I wouldn't have thought of)
- Quick error fixes (hydration bug in 2 min)
- Eliminating repetitive typing

**What didn't:**
- Sidebar state issue - my prompt didn't mention shared state, so AI made it local
- Hooks duplication - could've asked for DRY approach or just used a library

**Strategic call:** For this assignment I chose speed over perfect architecture. In a real project I'd use React Query instead of custom hooks, but building them shows I understand the patterns.

---

### Code ownership vs. AI reliance

**Stuff I barely touched:**
Mock data generators, skeleton components, config files. These are solved problems with known patterns.

**Stuff where I made the calls:**
- Custom hooks: AI wrote them, I evaluated the duplication and chose to keep it for readability
- Sidebar architecture: AI implemented the fix but I decided between lifting state, CSS `:has()`, or Context
- Component organization: moved AI's files into feature folders

**Stuff that's all me:**
Brand colors (based on logo), responsive strategy (1→2→4 grid breakpoints), README structure, scope decisions (what to skip).

**Bottom line:** Every line is my responsibility. I reviewed everything and made conscious trade-offs. The hooks are duplicated because I chose readability over DRY for a demo.

---

### Quality assurance

**What I did:**
- ✅ Reviewed every line of AI code
- ✅ Tested on mobile, tablet, desktop
- ✅ Tested error states, slow network, image failures
- ✅ Asked "why this approach?" instead of blindly accepting
- ✅ Documented trade-offs in README

**What I skipped (wouldn't in production):**
- ❌ Unit tests
- ❌ Accessibility audit  
- ❌ Performance profiling

**My rule:** If I can't explain how the code works, I don't merge it. Example: I know why AbortController is there (prevents memory leaks on unmount). If I didn't understand it, I'd either ask AI to explain or rewrite it myself.

---

## Deep Dive: Hydration Mismatch & SSR Pitfalls

### The Problem
Built a loading skeleton for the sales chart with animated bars. Looked great in dev, then deployed to Vercel and got this error:

```
Error: Hydration failed because the server rendered HTML didn't match the client.
```

React was showing me diffs like:
```diff
- height: "48.1005%"  (server)
+ height: "85.6173%"  (client)
```

### The Root Cause
My skeleton component was doing this:

```tsx
// SalesChartSkeleton.tsx
{Array.from({ length: 15 }).map((_, i) => (
  <Skeleton
    key={i}
    style={{ height: `${30 + Math.random() * 60}%` }}
  />
))}
```

Here's what was happening:
1. **Server renders** during `next build` → generates HTML with `Math.random()` → gets value like `48.1005%`
2. **Client loads** → React hydrates → runs `Math.random()` again → gets different value like `85.6173%`
3. **React freaks out** → "Server and client don't match! Abort!"

### Why I Didn't Catch This Earlier
- `npm run dev` uses client-side rendering mostly, so hydration errors don't show up
- Only saw it after `npm run build && npm start` (production mode)
- This is a classic Next.js gotcha - any non-deterministic code breaks SSR

### The Fix
AI spotted `Math.random()` immediately from the error trace and suggested:

```tsx
// Fixed version
const barHeights = [48, 85, 68, 55, 72, 41, 63, 77, 52, 66, 44, 58, 81, 39, 70];

{barHeights.map((height, i) => (
  <Skeleton
    key={i}
    style={{ height: `${height}%` }}
  />
))}
```

Now server and client render the exact same HTML. Fixed in 2 minutes.

### What I Should've Known
Never use these in SSR components:
- `Math.random()` - different every render
- `Date.now()` - different server vs client
- `window`, `document`, `localStorage` - don't exist on server
- Third-party scripts that run immediately

### Better Approaches for Production
**Option 1: Client-only rendering**
```tsx
'use client'
import dynamic from 'next/dynamic'

const Skeleton = dynamic(() => import('./Skeleton'), { ssr: false })
```

**Option 2: Sync with seed**
```tsx
// Same random values every time
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
```

**Option 3: What I did**
Just use fixed values. It's a skeleton, doesn't need to be random.

### Reflection
This took AI 2 minutes to diagnose. Would've taken me 15-20 minutes digging through React DevTools and Next.js docs. But I should've known this pattern. The fact that AI caught it faster means I need to review SSR fundamentals.

Also learned: always test production builds before deploying. `npm run dev` hides these issues.

---

## Summary

**Time spent:** ~6 hours total, AI saved maybe 3-4 hours on boilerplate  
**Biggest win:** Mock data patterns and quick error fixes  
**Biggest learning:** Need to be way more explicit about state management in prompts  
**Production readiness:** This code works for a demo, but needs tests and real data fetching

**Real talk:** AI sped things up but I still had to make all the architectural decisions. The custom hooks are duplicated, the sidebar state took iteration, and I spent time reviewing every line. It's not "AI wrote my code" - it's "AI handled the boring parts so I could focus on the hard problems."