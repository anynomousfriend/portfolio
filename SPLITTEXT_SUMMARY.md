# GSAP SplitText 3.14.2 - Complete Documentation Summary

Based on the official GSAP SplitText source code (v3.14.2)

---

## 1. How to Import/Register SplitText

### ES Module Import (Recommended for React/Next.js)
```javascript
import SplitText from "gsap/SplitText";
import gsap from "gsap";

// Register the plugin
gsap.registerPlugin(SplitText);
```

### Alternative: Import from "all" export
```javascript
import { gsap, SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);
```

### CDN Usage
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14/dist/SplitText.min.js"></script>
```

### TypeScript Definitions Available
Type definitions are available at: `gsap/types/split-text.d.ts`

---

## 2. How to Split Text into Chars/Words

### Basic Usage - Split into Characters
```javascript
const split = new SplitText(".text-element", { type: "chars" });
// Access split characters via:
console.log(split.chars); // Array of HTMLElements
```

### Basic Usage - Split into Words
```javascript
const split = new SplitText(".text-element", { type: "words" });
// Access split words via:
console.log(split.words); // Array of HTMLElements
```

### Split into Multiple Types (Chars + Words)
```javascript
const split = new SplitText(".text-element", { type: "chars,words" });
console.log(split.chars);  // Character elements
console.log(split.words);  // Word elements
```

### Split into Lines, Words, and Chars (Default)
```javascript
const split = new SplitText(".text-element", { type: "lines,words,chars" });
console.log(split.lines);  // Line elements
console.log(split.words);  // Word elements
console.log(split.chars);  // Character elements
```

### Using the Static Create Method
```javascript
const split = SplitText.create(".text-element", { type: "chars,words" });
```

---

## 3. Key Properties and Methods

### Properties

#### Read-only Arrays
```javascript
split.chars      // HTMLElement[] - Array of character elements
split.words      // HTMLElement[] - Array of word elements
split.lines      // HTMLElement[] - Array of line elements
split.masks      // HTMLElement[] - Array of mask elements (if mask option used)
split.elements   // HTMLElement[] - Original target elements
```

#### Status
```javascript
split.isSplit    // boolean - Whether the text is currently split
```

### Methods

#### `revert()`
Reverts the innerHTML back to original content and clears all split data.
```javascript
split.revert();
// After revert:
// - Original HTML is restored
// - split.chars, split.words, split.lines are cleared
// - split.isSplit becomes false
```

**Use case**: Clean up when you're done animating or need to re-split differently.

#### `kill()`
Stops autoSplit behavior and removes internal listeners for resizes and font loading.
```javascript
split.kill();
```

**Use case**: Prevent automatic re-splitting on window resize or font load.

#### `split(config)`
Re-splits text with new configuration. Automatically calls `revert()` first if necessary.
```javascript
const split = new SplitText(".text", { type: "words" });
// Later, change to split chars instead:
split.split({ type: "chars" });
```

---

## 4. Configuration Options (SplitTextConfig)

```javascript
const split = new SplitText(".element", {
  // Core splitting type
  type: "chars,words,lines",        // Default: "chars,words,lines"
                                     // Options: "chars", "words", "lines" (comma-separated)
  
  // Masking
  mask: "chars",                     // Optional: "chars", "words", or "lines"
                                     // Creates overflow: clip containers for animation masks
  
  // Custom delimiters for word splitting
  wordDelimiter: " ",                // Default: " " (space)
                                     // Can be string, RegExp, or object:
                                     // { delimiter: RegExp|string, replaceWith?: string }
  
  // CSS Classes
  charsClass: "char",                // Class applied to each character element
  wordsClass: "word",                // Class applied to each word element
  linesClass: "line",                // Class applied to each line element
                                     // Use "char++" to auto-increment class names
  
  // HTML Wrapper Tag
  tag: "div",                        // Default: "div"
                                     // HTML tag to wrap each split element (e.g., "span")
  
  // Property Indexing
  propIndex: false,                  // Default: false
                                     // If true, adds CSS custom properties:
                                     // --char, --word, --line (containing the index)
                                     // Example: style="--char: 1" for first character
  
  // Accessibility (ARIA)
  aria: "auto",                      // Default: "auto"
                                     // "auto"   = sets aria-label to text content
                                     // "hidden" = sets aria-hidden="true"
                                     // "none"   = no ARIA modifications
  
  // Deep Slicing (for inline elements spanning multiple lines)
  deepSlice: true,                   // Default: true
                                     // Subdivides inline elements that wrap to multiple lines
  
  // Whitespace Handling
  reduceWhiteSpace: true,            // Default: true
                                     // Converts multiple spaces to single space
  
  // Smart Wrap
  smartWrap: false,                  // Adds white-space: nowrap to prevent weird wrapping
  
  // Special Character Handling
  specialChars: ["...", "—"],        // Optional: Array of strings or RegExp
                                     // Treat multi-character sequences as single units
  
  // Auto-resplitting
  autoSplit: false,                  // Default: false
                                     // If true, automatically re-splits on window resize or font load
  
  // Elements to Ignore
  ignore: ".ignore-this",            // Optional: selector or elements to skip splitting
  
  // Text Preparation Hook
  prepareText: (text, element) => {
    return text.toUpperCase();       // Modify text before splitting
  },
  
  // Callbacks
  onSplit: (splitText) => {
    // Called when split completes
    // Can return an animation for seamless handoff
    return gsap.timeline();
  },
  
  onRevert: (splitText) => {
    // Called when revert() is executed
  },
  
  // Overwrite Control
  overwrite: true                    // Default: true
                                     // Whether to overwrite if element already split
});
```

---

## 5. ScrollTrigger Integration for Scroll-Based Character Reveal

### Basic Setup with ScrollTrigger

```javascript
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Split text
const split = new SplitText(".reveal-text", { type: "chars" });

// Create scroll-triggered animation
gsap.to(split.chars, {
  scrollTrigger: {
    trigger: ".reveal-text",
    start: "top 80%",
    end: "top 20%",
    scrub: 1,                        // Smooth scrubbing (1 = 1 second delay)
    markers: true                    // Debug markers
  },
  duration: 1,
  opacity: 1,
  stagger: 0.05                      // Stagger each character by 50ms
});
```

### Character-by-Character Reveal with Blur Effect

```javascript
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const split = new SplitText(".text-blur", { type: "chars" });

// Set initial state
gsap.set(split.chars, {
  opacity: 0,
  filter: "blur(10px)"
});

// Scroll-driven animation
gsap.to(split.chars, {
  scrollTrigger: {
    trigger: ".text-blur",
    start: "top center",
    end: "bottom center",
    scrub: 1.5,
    markers: true
  },
  opacity: 1,
  filter: "blur(0px)",
  duration: 0.5,
  stagger: {
    each: 0.02,                      // 20ms between each character
    from: "start"
  }
});
```

### Advanced: Char Reveal with Y Offset + Opacity + Blur

```javascript
const split = new SplitText(".hero-text", { 
  type: "chars",
  charsClass: "char"
});

// Initial state
gsap.set(split.chars, {
  opacity: 0,
  y: 20,
  filter: "blur(8px)"
});

// Scroll animation
gsap.to(split.chars, {
  scrollTrigger: {
    trigger: ".hero-text",
    start: "top 75%",
    end: "top 25%",
    scrub: 2,
    onUpdate: (self) => {
      console.log("Progress:", self.progress);
    }
  },
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  duration: 1,
  ease: "power2.out",
  stagger: {
    each: 0.03,
    from: "start"
  }
});
```

### With Timeline Integration

```javascript
const split = new SplitText(".text", { type: "chars" });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".text",
    start: "top center",
    end: "bottom center",
    scrub: 1,
    markers: true
  }
});

tl.from(split.chars, {
  opacity: 0,
  filter: "blur(10px)",
  duration: 0.4,
  stagger: 0.02,
  ease: "back.out"
});
```

### With Mask Property (Clip-Path Animation)

```javascript
const split = new SplitText(".masked-text", {
  type: "chars",
  mask: "chars"                      // Creates overflow: clip containers
});

gsap.set(split.chars, { opacity: 0 });

gsap.to(split.chars, {
  scrollTrigger: {
    trigger: ".masked-text",
    start: "top 80%",
    end: "top 20%",
    scrub: 1
  },
  opacity: 1,
  duration: 0.3,
  stagger: 0.03
});
```

---

## 6. Code Examples: Scroll-Driven Char-by-Char Reveal Animations

### Example 1: Simple Opacity Fade-In on Scroll

```javascript
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initCharReveal() {
  const split = new SplitText(".reveal-paragraph", { type: "chars" });
  
  gsap.from(split.chars, {
    scrollTrigger: {
      trigger: ".reveal-paragraph",
      start: "top 90%",
      end: "top 50%",
      scrub: true
    },
    opacity: 0,
    stagger: 0.03,
    duration: 0.3
  });
}
```

### Example 2: Blur-to-Clear with Y Motion

```javascript
export function initBlurReveal() {
  const split = new SplitText(".blur-text", { type: "chars" });
  
  gsap.set(split.chars, { 
    opacity: 0,
    filter: "blur(12px)",
    y: 10
  });
  
  gsap.to(split.chars, {
    scrollTrigger: {
      trigger: ".blur-text",
      start: "top center",
      end: "center center",
      scrub: 1.5,
      pin: false
    },
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: {
      each: 0.04,
      from: "start"
    }
  });
}
```

### Example 3: Multi-Effect Reveal (Color + Blur + Scale)

```javascript
export function initAdvancedReveal() {
  const split = new SplitText(".advanced-text", { 
    type: "chars",
    charsClass: "char"
  });
  
  // Initial state
  gsap.set(split.chars, {
    opacity: 0,
    filter: "blur(15px)",
    scale: 0.8,
    color: "#999"
  });
  
  // Scroll animation
  gsap.to(split.chars, {
    scrollTrigger: {
      trigger: ".advanced-text",
      start: "top 80%",
      end: "top 30%",
      scrub: 1.2,
      onEnter: () => console.log("Animation started"),
      onLeave: () => console.log("Animation ended")
    },
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    color: "#000",
    duration: 0.6,
    ease: "elastic.out(1, 0.5)",
    stagger: {
      each: 0.03,
      from: "start"
    }
  });
}
```

### Example 4: Staggered Reveal with Different Eases Per Character

```javascript
export function initStaggeredReveal() {
  const split = new SplitText(".staggered-text", { type: "chars" });
  
  const eases = ["power1.out", "power2.out", "power3.out", "back.out", "elastic.out"];
  
  gsap.to(split.chars, {
    scrollTrigger: {
      trigger: ".staggered-text",
      start: "top 75%",
      end: "top 25%",
      scrub: 1
    },
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: {
      each: 0.05,
      from: "start"
    },
    onStart: function() {
      split.chars.forEach((char, i) => {
        gsap.set(char, { opacity: 0, y: 20 });
      });
    }
  });
}
```

### Example 5: React Hook Implementation

```javascript
// hooks/useSplitText.ts
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function useSplitTextReveal(selector: string, type: string = "chars") {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const split = new SplitText(ref.current, { type });
    
    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1
      },
      opacity: 0,
      filter: "blur(10px)",
      y: 10,
      duration: 0.5,
      stagger: 0.03,
      ease: "power2.out"
    });
    
    // Cleanup
    return () => {
      split.revert();
    };
  }, [selector, type]);
  
  return ref;
}

// Usage in component:
export function Hero() {
  const ref = useSplitTextReveal(".hero-title", "chars");
  return <h1 ref={ref} className="hero-title">Welcome to our site</h1>;
}
```

---

## Important Notes

### Performance Considerations
1. **Use `stagger` for large text**: Don't animate hundreds of characters individually without stagger
2. **Prefer `scrub: true` for smooth scroll**: `scrub: 1` creates a 1-second delay which can feel better
3. **Kill unused instances**: Always call `split.revert()` or `split.kill()` when done

### Browser Support
- Modern browsers with ES6 support
- Intl.Segmenter supported for proper emoji/multi-char handling
- Falls back gracefully in older browsers

### Emoji and Special Characters
- Uses Intl.Segmenter when available for proper emoji support
- Handles complex emoji like 👨‍👨‍👦‍👦 correctly
- Can customize with `specialChars` option

### Memory Management
```javascript
// Always clean up when component unmounts or animation ends
split.revert();      // Restore original HTML and reset arrays
split.kill();        // Stop autoSplit listeners
```

### Chaining with onSplit
```javascript
const split = new SplitText(".text", {
  type: "chars",
  onSplit: (splitText) => {
    // Can return a GSAP animation for seamless continuation
    return gsap.timeline().from(splitText.chars, {
      opacity: 0,
      duration: 0.3,
      stagger: 0.02
    });
  }
});
```
