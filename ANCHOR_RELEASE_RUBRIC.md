# Anchor release rubric

Adapted from the supplied design-review scorecard; assessed against Anchor's own purpose and audience, not the report's nonprofit content.

| Area | Release gate | Current action |
|---|---|---|
| Imagery & first impression | intentional desktop/mobile crops, no blurred display assets, alt text | New Studio collective asset retained; image loading and decode hints added; oversized legacy PNG conversion remains a measured next optimization. |
| Typography & scale | 12px minimum for meaningful information, balanced headings, readable controls | Eight-step token scale, explicit readability floor, balanced headings, and enlarged navigation/content copy are active. |
| Credibility & launch readiness | no dummy copy, dead links, or misleading product claims | Legacy lorem/placeholder blog renderer removed; 25 authored Notes are content-gated. |
| Technical & discoverability | per-page metadata, healthy routes, controlled cache, no failed local assets | Route checks, titles/descriptions, Netlify redirects, static-form handling, cache headers, and production route verification remain release gates. |
| Conversion path | clear primary action, concierge handoff, form validation and honest status | Unified navigation, Begin a Project, Aurelius handoff, honeypots, consent language, and accessible status messages are active. |
| Motion & resilience | motion has hierarchy value, stays smooth, honors reduced motion | Monument Signal adds a pointer-depth statue response and light pulse; all effects disable under reduced motion. |

## Required release checks

1. `npm run test:notes`
2. `npm run audit`
3. `npm test`
4. `npm run test:agent`
5. Production route, form, image, contrast, and responsive visual checks.

## Evidence boundary

This rubric does not claim a lighthouse score or fabricate Core Web Vitals. Scores are only recorded after an equivalent production measurement run.
