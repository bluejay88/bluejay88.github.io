# Anchor technical audit — 8 August 2026

## Method

Local browser validation at 360, 768, 1440, and 1920 pixel viewports; production spot checks against the Netlify canonical URLs; static reference audit; navigation, motion, article, and horizontal-journey checks. This is a technical scorecard, not a substitute for real-user Core Web Vitals.

| Area | Score | Evidence | Next measured improvement |
|---|---:|---|---|
| Horizontal journey integrity | 9/10 | 9 key marketing routes: 0px document vertical overflow, 36 journey checks; Work case frames are explicitly tested against compression. | Add touch-swipe and keyboard progression assertions for every rail. |
| Navigation consistency | 9/10 | 11 shared destinations, correct active state, desktop/tablet menu behavior, 88 checks. Studio and executive shells now share the same 68px, left-origin rail. | Replace remaining legacy internal headers only after their owner/dashboard access policy is set. |
| Responsive resilience | 9/10 | 19 pages x 4 viewports, 228 checks, no failures. | Add visual-diff baselines for key 360px frames. |
| Accessibility foundations | 8/10 | Skip paths, focus-visible states, reduced-motion handling, labeled forms, semantic article landmarks, and no failed local image checks. | Run a fresh production Axe/contrast sweep after the next asset batch. |
| Motion quality & resilience | 9/10 | Monument Signal has active animation, pointer response, and reduced-motion disablement; 6 dedicated motion checks pass. | Add a short production capture to monitor animation frame stability on low-power devices. |
| Content integrity | 9/10 | 25 authored Notes entries are gated for 1,500+ words, substantive sections, and sources; legacy dummy blog renderer removed. | Editorial review each issue against a source/citation style guide before syndication. |
| Lead and conversion path | 8/10 | Netlify static forms, honeypots, inline status, direct Aurelius handoff, unified Begin a Project CTA. | Confirm a live Netlify Forms receipt and owner-only operations surface using real configured identity/auth. |
| Performance engineering | 7/10 | Below-fold Work/Studio images now lazy-load and decode asynchronously; cache headers exist; dependency audit has no production vulnerabilities. | Convert the remaining multi-megabyte PNG hero/case assets to responsive AVIF/WebP derivatives and measure LCP/INP on production. |
| SEO and share readiness | 7/10 | Distinct page titles/descriptions, route redirects, and publishable content exist. | Add per-route Open Graph image, canonical metadata, and Organization JSON-LD after confirmed organization contact data is supplied. |

## Release evidence

- `npm run test:notes`: 25/25 required articles, zero failures.
- `npm run test:motion`: 6 checks, zero failures.
- `npm run test:journey`: 9 routes, 37 checks, zero failures.
- `npm run test:navigation`: 11 routes, 88 checks, zero failures.
- `npm test`: 19 pages x 4 viewports, 228 checks, zero failures.
- `npm run audit`: 20 pages, 19 scripts, 348 checks, zero issues.

## Overall technical release score: 8.3 / 10

Anchor is now structurally strong and production-usable. The principal remaining score limiter is asset delivery, not layout or interaction: large legacy PNGs should be encoded into responsive modern formats before a performance score above 9 is claimed. Authentication-backed owner operations and a verified production form receipt are the other two remaining launch-grade items.
