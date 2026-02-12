# 🏭 Industrial OEE Dashboard

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_TypeScript_|_Tailwind-blue)

> **Live Demo:** [[GitHub Pages]](https://vesse00.github.io/OEE-dashboard/)

A cutting-edge, real-time industrial monitoring system designed to visualize **Overall Equipment Effectiveness (OEE)** metrics. This Single Page Application (SPA) simulates a high-frequency production environment with live data streaming, stochastic failure generation, and interactive analytics.

![Dashboard Preview](/screenshot.png)

## 🚀 Key Features

### 1. Real-Time Simulation Engine 🧠
Instead of static data, the application runs a custom-built stochastic simulator (`useStore.ts`):
* **Random Walk Algorithm:** OEE values "drift" naturally over time rather than jumping randomly, mimicking real sensor inertia.
* **"Chaos Monkey" System:** Probabilistic model randomly triggers **warnings** (e.g., overheating) and **critical failures** (e.g., stops), forcing the UI to react instantly.
* **Self-Healing:** Machines have a small probability of auto-recovery, simulating operator intervention.

### 2. Interactive Operator Dashboard 🎛️
* **Live Status Monitoring:** Instant visualization of machine states (Running/Warning/Error) with neon-glassmorphism UI.
* **Smart Filtering:** Filter production lines by status with fluid layout animations (powered by `Framer Motion`).
* **Critical Alerts:** Real-time "Toast" notifications (via `react-hot-toast`) when a machine goes down or recovers.

### 3. Deep-Dive Analytics 📊
* **Machine Drill-Down:** Click on any machine to see detailed diagnostics, including specific defect reasons (Pareto charts) and weekly output history.
* **Global Analytics:** System-wide analysis of Quality (OK/NOK ratios) and Reliability KPIs (MTBF, MTTR).
* **Dynamic Charts:** High-performance rendering of sparklines and area charts using `Recharts`.

### 4. System Configuration ⚙️
* **Settings Panel:** Toggle notifications, adjust data refresh rates, or pause the simulation entirely.
* **Global State Management:** All preferences and machine states are synchronized globally using `Zustand`.

## 🛠️ Tech Stack

Built with performance, type safety, and modern aesthetics in mind.

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Core** | ![React](https://img.shields.io/badge/-React_18-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | Component architecture & fast bundling. |
| **Language** | ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | Fully typed interfaces for robust data flow. |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) | Utility-first styling with `clsx` and responsive design. |
| **State** | **Zustand** | Lightweight state management for high-frequency updates. |
| **Charts** | **Recharts** | Composable charting library for complex data visualization. |
| **Animation** | **Framer Motion** | Layout transitions and micro-interactions. |
| **UX** | **React Hot Toast** | Non-intrusive system notifications. |
| **Icons** | **Lucide React** | Consistent and clean iconography. |

### 📂 Project Structure

```bash
src/
├── components/
│   ├── Layout.tsx        # Global shell with Sidebar & Glassmorphism BG
│   ├── MachineCard.tsx   # Real-time widget with Sparklines
│   ├── MachineDetails.tsx# Drill-down view with specific diagnostics
│   ├── Analytics.tsx     # Global KPI dashboard
│   ├── Settings.tsx      # Configuration panel
│   └── KpiStats.tsx      # Top-level metric cards
├── store/
│   └── useStore.ts       # The "Brain": Simulation logic & State
├── types/
│   └── index.ts          # TypeScript interfaces
└── App.tsx               # Routing & Main Composition
```
### 📦 Getting Started
1. Clone the repository:
   ```
   git clone [https://github.com/vesse00/oee-dashboard.git](https://github.com/vesse00/oee-dashboard.git)
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run development server:
   ```
   npm run dev
   ```

## 🎨 Design Philosophy
* The UI moves away from traditional, flat corporate dashboards to a "Dark Industrial" aesthetic:
* Palette: Deep Slate (#0f172a) background with semantic neons (Emerald, Rose, Amber).
* Hierarchy: Critical data (Status, OEE %) is prioritized visually.
* Feedback: Interactive hover states and animations provide a tactile feel.

Created by Maciej Szczypta - 2026
