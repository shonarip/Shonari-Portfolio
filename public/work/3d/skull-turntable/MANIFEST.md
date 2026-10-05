# Skull turntable (homepage hero)

- **Lock:** Shonari’s skull — clockwise — homepage only (below title/subtitle, above Selected Work)
- **Craft bar:** hard-surface bone, deep sockets, cool ink rim (not soft clay)
- **BG:** transparent PNG sequence

## Files
- `skull.glb` — decimated anatomical mesh (~176k verts), cool bone material
- `frames/frame_001.png` … `frame_036.png` — 768² RGBA, clockwise full turn @ 12fps loop
- `preview.gif` / `preview.mp4` — short looping preview
- `preview-sheet.jpg` — 8-angle contact sheet
- `wip/final_*.png` — key angles for Arty punch
- `ref-sheet.jpg` — source multi-view reference

## Notes
- Rebuilt from anatomical human skull mesh (user had no GLB/blend)
- Site otherwise frozen — Coder wires hero slot only after Chief greenlight

## Arty punch
- **When:** 2026-09-18 (America/Indianapolis)
- **Backup:** `/workspace/skull-turntable-punch-backup/` (frames/ + wip/ originals, once)
- **Output:** `punched/frame_001.png` … `frame_036.png` (36) and `punched/wip/final_*.png` (8)
- **Previews:** `punched/preview-sheet.jpg` (8-angle contact, night-sky bg), `punched/preview.gif` (~1.2MB @480² 12fps)
- **Recipe:** preserve alpha (grey fringe cleaned); cool midtone cyan shift; Contrast ~1.22 + mild S-curve; deep-socket multiply; 1px cool-ink rim; UnsharpMask r1.2/75%/2
- **Not touched:** skull.glb, site.ts, Nesta wiring
