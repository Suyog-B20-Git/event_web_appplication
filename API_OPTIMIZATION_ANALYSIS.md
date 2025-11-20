# API Call Optimization Analysis - GetOrganizer.jsx

## 🔍 Current Issues

### 1. **Duplicate Component Rendering**
- `CommonCalendar` is rendered **twice** in `GetOrganizer.jsx`:
  - Line 253: Mobile view (`lg:hidden`)
  - Line 427: Desktop view (`lg:flex hidden`)
- **Result**: Even though only one is visible, React mounts both, causing **8 API calls** (4 per instance)

### 2. **API Calls Per Instance**
Each `CommonCalendar` instance makes **4 API calls** on mount:
1. Today events: `/api/event/filter?startDate={today}&endDate={tomorrow}&page=1&limit=100`
2. Tomorrow events: `/api/event/filter?startDate={tomorrow}&endDate={dayAfter}&page=1&limit=100`
3. Week events: `/api/event/filter?startDate={monday}&endDate={sunday}&page=1&limit=100`
4. **All events (entire year)**: `/api/event/filter?startDate=2025-01-01&endDate=2025-12-31&page=1&limit=1000` ⚠️ **Heavy!**

### 3. **No Caching or Request Deduplication**
- Data is refetched every time the component mounts
- No shared state between multiple instances
- No memoization of date calculations

### 4. **Unnecessary Full-Year Fetch**
- Fetching all events for 2025 with `limit=1000` is expensive
- Only needed for the "Choose Date" calendar view
- Could be lazy-loaded or fetched on-demand

---

## 📊 Current API Call Pattern

```
GetOrganizer.jsx mounts
  ├─ CommonCalendar (Mobile) mounts
  │   ├─ API Call 1: Today events
  │   ├─ API Call 2: Tomorrow events
  │   ├─ API Call 3: Week events
  │   └─ API Call 4: All events (2025) ⚠️
  │
  └─ CommonCalendar (Desktop) mounts
      ├─ API Call 5: Today events (duplicate)
      ├─ API Call 6: Tomorrow events (duplicate)
      ├─ API Call 7: Week events (duplicate)
      └─ API Call 8: All events (2025) ⚠️ (duplicate)

Total: 8 API calls (4 duplicates + 1 heavy full-year fetch × 2)
```

---

## ✅ Optimization Solutions

### **Solution 1: Single Instance with Conditional Rendering** ⭐ RECOMMENDED

**Approach**: Render `CommonCalendar` only once, use CSS to show/hide sections

**Benefits**:
- Reduces API calls from 8 to 4
- Eliminates duplicate requests
- Simpler state management

**Implementation**:
```jsx
// In GetOrganizer.jsx - Replace both instances with:
<div className="lg:hidden"> {/* Mobile wrapper */}
  <CommonCalendar />
</div>
<div className="hidden lg:block"> {/* Desktop wrapper */}
  <CommonCalendar />
</div>
```

**Better**: Use a single instance with responsive styling:
```jsx
<div className="w-full">
  <CommonCalendar />
</div>
```

---

### **Solution 2: Shared State/Context for Calendar Data** ⭐⭐ BEST

**Approach**: Create a Calendar Context Provider to share data across instances

**Benefits**:
- Single source of truth
- Data fetched once, shared everywhere
- Automatic caching
- Works even if component is rendered multiple times

**Implementation**:
1. Create `CalendarContext.jsx`
2. Wrap `GetOrganizer` with `CalendarProvider`
3. Use `useCalendarContext()` in `CommonCalendar`

---

### **Solution 3: Lazy Load Full-Year Events** ⭐

**Approach**: Only fetch full-year events when "Choose Date" is clicked

**Benefits**:
- Reduces initial load from 4 to 3 API calls
- Faster page load
- Better user experience

**Implementation**:
- Move full-year fetch to a separate function
- Call it only when `showChooseDateCalendar` becomes `true`

---

### **Solution 4: Request Deduplication with React Query/SWR**

**Approach**: Use a data fetching library with built-in caching

**Benefits**:
- Automatic request deduplication
- Built-in caching
- Background refetching
- Error handling

**Libraries**:
- `react-query` / `@tanstack/react-query`
- `swr`

---

### **Solution 5: Memoize Date Calculations**

**Approach**: Use `useMemo` for date calculations

**Benefits**:
- Prevents unnecessary recalculations
- Stable references for dependencies

---

## 🎯 Recommended Implementation Plan

### **Phase 1: Quick Win (Immediate)**
1. ✅ Render `CommonCalendar` only once (Solution 1)
2. ✅ Lazy load full-year events (Solution 3)

**Expected Result**: 8 calls → 3 calls (62% reduction)

### **Phase 2: Better Architecture (Short-term)**
3. ✅ Implement Calendar Context (Solution 2)
4. ✅ Memoize date calculations (Solution 5)

**Expected Result**: 3 calls → 3 calls (but shared across all pages)

### **Phase 3: Advanced (Long-term)**
5. ✅ Add React Query for advanced caching
6. ✅ Implement request deduplication

**Expected Result**: Optimal performance with intelligent caching

---

## 📈 Expected Performance Improvements

| Solution | API Calls | Reduction | Load Time |
|---------|-----------|-----------|-----------|
| Current | 8 calls | - | ~2-3s |
| Solution 1 | 4 calls | 50% | ~1-1.5s |
| Solution 1 + 3 | 3 calls | 62% | ~0.8-1s |
| Solution 2 | 4 calls (shared) | 50% | ~1s (cached) |
| All Solutions | 3 calls (shared) | 62% | ~0.8s (cached) |

---

## 🔧 Code Changes Summary

### **Immediate Fix (GetOrganizer.jsx)**
- Remove duplicate `CommonCalendar` instances
- Use single instance with responsive wrapper

### **CommonCalendar.jsx Optimizations**
- Lazy load full-year events
- Memoize date calculations
- Add request cancellation on unmount

### **Optional: CalendarContext.jsx**
- Create context provider
- Move API calls to context
- Share data across components

---

## 📝 Notes

- The full-year fetch (`limit=1000`) is the heaviest operation
- Consider pagination or date-range queries instead
- Mobile and desktop views don't need separate instances
- React's reconciliation will handle responsive display

