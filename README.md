# RAILFLOW — Railway Network Intelligence (UI Prototype)

SIH26028 — Dynamic Forecast of ETA for Coaching Trains
Demo location: Vijayawada Junction (BZA), simplified fictional network.

**This build is UI-only.** All train movement, delays, conflicts, and forecasts
are driven by local mock data and React state (`src/data/*`, `useTrainSimulation`).
There is no backend, API, or ML model yet — that comes in a later stage.

## Stack

- React 18 + Vite
- Tailwind CSS
- React Flow (network map)
- Lucide React (icons)
- Recharts (installed, ready for future chart panels)

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## What to try in the demo

- Click any train in the left **Train Monitor**, or click a moving train
  marker directly on the map — its route highlights, unrelated tracks dim,
  and the right panel fills in with live ETA + delay detail.
- Use the bottom control bar to switch between **LIVE MODE**, **DELAY
  RIPPLE**, **WHAT-IF**, and **OPTIMIZE**.
- Press **DEMO SCENARIO** to run a staged mock incident: a train picks up
  a big delay, Junction J1 goes to warning then danger, a second train
  becomes at-risk, Platform P3 flags a risk, and the delay ripple
  visualization plays out automatically.
- Open **WHAT-IF** to add mock delay to any train against a chosen resource
  and see the map/alerts react.

## Project structure

```
src/
  components/   UI building blocks (see file list below)
  hooks/        useTrainSimulation.js — the animation engine
  data/         mockNetwork.js, mockTrains.js, mockAlerts.js
  utils/        time.js
  App.jsx       layout composition + state orchestration
```

## Known limitations (by design, for this stage)

- ETA/delay math is illustrative, not a real scheduling algorithm.
- Conflict detection is scripted (demo scenario / what-if), not computed.
- No persistence — refreshing resets to the baseline mock fleet.
