# Anchor Site Cohesion Audit — 9 August 2026

## Release verdict

**Overall: 92 / 100 — release ready.** The public experience now uses one navigation system, one executive color and type vocabulary, and one viewport contract across the principal journey. The audit covered 22 HTML documents, 20 scripts, 21 responsive routes at four viewport sizes, the complete navigation graph, horizontal movement, motion preferences, booking logic, Aurelius qualification, and all 25 long-form Notes issues.

This is an engineering and visual-cohesion score, not a certification of legal compliance or full WCAG conformance. A manual assistive-technology review and production field performance sample remain appropriate follow-up work.

## Scorecard

| Area | Score | Evidence |
| --- | ---: | --- |
| Brand and visual cohesion | 94 | Shared bronze, ivory, ink, type hierarchy, CTA language, imagery treatment, and shell geometry across the fourteen principal routes. |
| Navigation and wayfinding | 96 | 11-route navigation audit; 88 checks; zero failures. Studio desktop menu defect removed. |
| Horizontal experience | 94 | 10-route journey audit; 51 checks; zero failures. Work frames now have immutable viewport widths. |
| Responsive integrity | 93 | 21 pages × 4 viewports; 252 checks; zero failures. |
| Content integrity | 96 | 25 unique Notes issues validate at the required long-form length; no placeholder copy detected by the structural audit. |
| Conversion systems | 91 | Booking-core, Aurelius, project brief, and Netlify form registration pass. Schedule and brief now have zero desktop document overflow. |
| Motion and accessibility safeguards | 90 | Motion audit passes and reduced-motion behavior is present. Full manual screen-reader and contrast verification is still recommended. |
| Performance and dependency health | 88 | Production dependency audit reports zero vulnerabilities. Large legacy raster assets remain the clearest performance opportunity. |

## Route review

1. Home — **Healthy.** Cinematic monument treatment, clear first action, shared shell, horizontal rail.
2. Services — **Healthy.** Capability hierarchy and contrast align with the Home vocabulary.
3. Work — **Corrected.** Every case frame is now fixed to one viewport width so adjacent work cannot collapse or appear smashed together.
4. Studio — **Corrected.** Shared shell geometry is aligned with the rest of the site; the stray desktop Menu control and 68 px document overflow are removed.
5. Process — **Healthy.** Larger narrative typography, film narration, and stage hierarchy remain legible and cohesive.
6. Ecosystem — **Healthy.** The left-to-right operating-system walkthrough remains intact with consistent wayfinding.
7. AI Futures — **Healthy.** Technical copy, action hierarchy, and dark-on-gold readability are consistent.
8. Insights — **Healthy.** Editorial archive, snippets, Continue paths, and shared route shell are present.
9. Podcast — **Healthy.** Coming-soon status and twenty-program editorial slate are clearly distinguished.
10. Partners — **Healthy.** Partnership positioning uses the same premium visual and conversion vocabulary.
11. Capabilities — **Healthy.** Expanded service catalog retains readable grouping rather than presenting forty disconnected offers.
12. Meet Aurelius — **Healthy.** Guided intake, disclosure, keyboard states, and human handoff remain intact.
13. Schedule — **Corrected.** The desktop composition now fits within the viewport with zero page overflow while preserving all booking fields and double-booking protection.
14. Begin a Project — **Corrected.** The private brief now fits the executive desktop viewport with zero document overflow and retains its Aurelius handoff.

## Automated evidence

- Structural audit: **378 checks, 0 issues**
- Responsive browser suite: **252 checks, 0 failures**
- Navigation audit: **88 checks, 0 failures**
- Horizontal journey audit: **51 checks, 0 failures**
- Motion audit: **6 checks, 0 failures**
- Booking core: **7 checks passed**
- Aurelius qualification: **0 failures**
- Notes archive: **25 / 25 issues valid**
- Production dependencies: **0 known vulnerabilities**

## Remaining opportunities

1. Replace the heaviest legacy PNG previews with responsive AVIF/WebP derivatives and measured `srcset` breakpoints.
2. Run a manual VoiceOver/NVDA pass and a production Axe scan after every major content release.
3. Add real-user Core Web Vitals collection so performance decisions use field data, not only synthetic checks.
4. Connect the scheduling layer to a durable authenticated database before treating the static deployment as a full CRM.
5. Commission or capture verified natural team photography when approved source portraits are available; do not fabricate employee likenesses.

