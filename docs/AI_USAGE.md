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
```
I need mock data for a music artist dashboard. Create:
1. Sales data for last 30 days with realistic patterns (weekends should have more streams)
2. Fan metrics: total fans, new fans this month, engagement rate, top country
3. Recent releases: 6 albums/singles with title, artist, streams, revenue, release date

Make it look realistic, not just random numbers. Use TypeScript types.
```

**Result:**
- AI created generator functions instead of static arrays
- Included weekend multipliers (Fri: 1.35x, Sat: 1.52x, Sun: 1.28x)
- Added ±15% random variance for natural-looking data
- Used as-is, no modifications needed

**Learning:**
The weekend multiplier idea was something I wouldn't have thought of. AI added domain knowledge that made the data feel real.

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
```
I'm getting this error:

"Error: A tree hydrated but some attributes of the server-rendered HTML 
didn't match the client properties."

The diff shows height values are different:
- height: "48.1005%" (server)
+ height: "85.6173%" (client)

Here's my SalesChartSkeleton component: [pasted code with Math.random()]

What's causing this and how do I fix it?
```

**Result:**
- AI immediately identified `Math.random()` in SalesChartSkeleton as the culprit
- Server renders one random value, client renders different value → React throws error
- AI replaced with fixed array: `const barHeights = [48, 85, 68, 55, 72, ...]`
- Fixed in <2 minutes vs 10+ minutes debugging React DevTools

**Learning:**
Classic Next.js - anything non-deterministic (Date.now(), Math.random(), browser APIs) breaks SSR hydration. Should've known this pattern, but AI caught it faster than manual debugging.

---

## Reflection Questions

### a) AI Strategy

**How did you decide when to use AI vs code from scratch?**

I used AI for:
- Boilerplate I've written 100 times (hooks structure, component scaffolding)
- Config files where I know what I need but forget the exact syntax
- Debugging errors faster than reading docs
- Getting domain-specific ideas (like weekend multipliers for music data)

I coded from scratch:
- Architecture decisions (folder structure, state management approach)
- Brand styling and responsive breakpoints
- Component organization and naming
- Trade-off evaluations (keeping duplicate hooks vs. making them generic)

**Were there any tasks where AI wasn't helpful? Why?**

Yes, for a few reasons:

- **Sidebar state management:** My prompt was not clear enough about the need to share state between Sidebar and main content. AI solved the sidebar itself, but not the global interaction. I learned you have to be very explicit about relationships between components, not just the behavior of one.
- **Scalability and performance:** AI didn't suggest patterns like lazy loading components or code splitting, which are key in a real, larger project. It also didn't propose using generics in hooks to avoid duplication.

In short: AI is great for concrete tasks, but for architecture, performance, and scalability decisions, human intervention is still essential.

---

### b) Code Ownership

**How did you ensure you understood all AI-generated code?**

My rule: if I can't explain a line, I don't merge it. 

For example, the AbortController in the hooks:
```tsx
controller.signal.addEventListener("abort", () => {
  clearTimeout(timeout);
  reject(new Error("Aborted"));
});
```
I know this prevents memory leaks when the component unmounts mid-fetch. If I didn't understand it, I'd either ask AI to explain or rewrite it myself.

I also ran through each component mentally: "What happens if this prop is undefined? What if the API fails? What if the user navigates away?"

**Describe one piece of AI-generated code you significantly modified and why.**

The sidebar expansion logic. AI's first version had the `isExpanded` state inside `Sidebar.tsx`:

```tsx
// AI's version - state trapped inside
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // ... rest of component
}
```

This meant `DashboardLayout` couldn't know when the sidebar expanded to adjust the main content's padding. I asked AI to lift the state:

```tsx
// My fix - state in parent, passed down
const DashboardLayout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  return (
    <>
      <Sidebar expanded={sidebarExpanded} onExpandChange={setSidebarExpanded} />
      <main className={sidebarExpanded ? 'ml-64' : 'ml-16'}>
        {children}
      </main>
    </>
  );
}
```

---

### c) Productivity Impact

**Estimate how much time AI saved you (or didn't).**

Total time: ~4.5 hours
AI saved: ~2-3 hours on boilerplate and debugging

Breakdown:
- Mock data generators: 30 min → 5 min (saved 25 min)
- Skeleton components: 20 min → 5 min (saved 15 min)  
- Hydration bug: 20 min → 2 min (saved 18 min)
- Config files (eslint, next.config, tailwind): 30 min → 10 min (saved 20 min)
- Custom hooks: 30 min → 10 min (saved 30 min)
- Component scaffolding: Would've taken 2+ hours, done in 40 min

**What would you have done differently without AI tools?**

Without AI:
- Mock data: Without AI, I wouldn’t have implemented generator functions. I would have hardcoded all values directly into static arrays instead of deriving daily, weekly, and monthly data programmatically.

- Code structure and cleanliness: Without AI assistance, the codebase would be less clean and consistent. Naming would be weaker, semantics less clear, Tailwind classes more ad-hoc, and more logic would likely live inside components instead of being properly separated into hooks, utilities, and typed modules.

---

### d) Quality Assurance

**How did you validate AI-generated code?**

1. **Read every line** - No blind copy-paste
2. **Test edge cases** - Empty data, errors, slow network (throttled in DevTools)
3. **Mobile testing** - Responsive on actual viewport sizes, not just "responsive mode"
4. **Ask "why"** - For any pattern I didn't recognize, I asked AI to explain or researched it

**Did you catch any issues or mistakes from AI suggestions?**

Yes, several:

1. **Hooks duplication** - AI created 3 identical hooks instead of a generic `useAsyncData<T>`. I noticed but kept it for readability (conscious trade-off).

2. **Sidebar state locality** - AI's first version didn't account for shared state needs. Had to iterate.

3. **TypeScript generics missing** - AI didn't suggest using generics for the data fetching pattern. For production, I'd refactor to:
```tsx
function useAsyncData<T>(fetcher: () => Promise<T>): UseAsyncReturn<T>
```
4. **Accessibility gaps** - AI-generated components were missing `aria-label` on icon-only buttons. I added them.

---

## Technical Decisions Not Made by AI

### Why No TypeScript Generics in Hooks?

AI created 3 separate hooks (`useReleases`, `useSalesData`, `useFanMetrics`) with identical structure instead of one generic hook:

```tsx
// What AI could have suggested (but didn't):
function useAsyncData<T>(
  fetcher: () => Promise<T>,
  options?: { delay?: number }
): {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
```

**Why I kept the duplication:**
1. Each hook is self-contained and readable
2. For 3 hooks, the duplication is manageable
3. Adding generics adds complexity for little benefit at this scale
4. In a real project, I'd use React Query which already handles this

**What I'd do differently in production:**
- Use React Query or SWR (built-in caching, deduplication, generics)
- Or create the generic hook if building from scratch
- The current approach is fine for a demo but wouldn't scale to 10+ data sources

---

## Deep Dive: Hydration Mismatch & SSR Pitfalls

### The Problem
Built a loading skeleton for the sales chart with animated bars. While developing locally, React started throwing this error:

```
Error: Hydration failed because the server rendered HTML didn't match the client.
```

React showed diffs like:
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
- The hydration mismatch occurred during local development; the UI still rendered correctly, so the warning was easy to overlook.
- Non-deterministic expressions (`Math.random()`, `Date.now()`, browser-only APIs) are the usual suspects and are easy to miss when sketching UI.
- Tip: when you suspect an SSR/hydration issue, reproduce with a production build to confirm:  
  ```bash
  npm run build && npm run dev


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
AI found the issue in 2 minutes. Sin AI, hubiera tardado mucho más revisando el código y la documentación. Aprendí a evitar patrones no deterministas en SSR y a revisar bien los componentes en local.

---

## Summary

**Time spent:** ~4.5 hours total, AI saved ~2 hours on boilerplate and debugging  
**Biggest win:** Mock data patterns and quick error fixes  