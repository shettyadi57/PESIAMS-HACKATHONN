# Full Audit Plan

## Bugs Found
1. `"use"` stray string at top of: page.tsx, Navbar.tsx, Venue.tsx, About.tsx (before "use client")
2. Schedule section missing from Navbar nav items
3. About text says "10 specialized tracks" (should say 5)

## Missing College Branding
- No actual college logo image file (currently using SVG placeholder)
- No college photo image (user needs to provide or we use campus image)

## Plan
1. Fix "use" bug in 4 files
2. Add Schedule to Navbar
3. Fix About text
4. Add college logo prominently in Hero
5. Add college photo placeholder in About
6. Improve Schedule UI to best 2D match
