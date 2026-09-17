# P03 – Hostel Allocation and Roommate Matching

## 🏠 Policy-Driven Hostel Allocation Engine with Roommate Compatibility Matching

**Tech Stack:** Next.js (React) + Node.js (Express) + MongoDB

---

## 📌 Problem Statement

Hostel allocation for thousands of students is currently done on spreadsheets — managing capacity, quotas, fee categories, programme conditions, and accessibility all at once. The process is:
- Slow (takes weeks)
- Hard to challenge or explain
- Produces no reviewable or auditable record

This system fixes all of that.

---

## 🗓️ Scope: Week 1 to Week 5 ONLY

This repository contains work **only up to the Week 5 Foundation Review milestone**.

| Milestone | Timeline | What we cover |
|-----------|----------|---------------|
| **M0** | Week 1–2 | Discovery, policy capture, project architecture |
| **M1** | Week 3–5 | Hostel & Room Inventory (Rajat) |
| **M2** | Week 3–5 | Application & Cycle Management (Rajat) |

---

## 👥 Team Division — Week 5 Responsibilities

> ✅ = Done by Week 5 | 🔲 = To be picked up

### 👤 Rajat — M1 & M2 (Lead + Backend & Frontend Foundation)
Responsible for the core data models and the two foundational modules that everything else depends on.

- [x] Set up project repo, folder structure, README
- [x] Set up Express + MongoDB connection (`server.js`)
- [x] M1: Hostel & Room Inventory MongoDB Schema (`models/Inventory.js`)
- [x] M2: Application & Cycle MongoDB Schema (`models/Application.js`)
- [x] M1: Inventory API routes (`/api/inventory`)
- [x] M2: Application API routes (`/api/cycles`)
- [x] M1: Warden Bed Map UI Page (`/inventory`)
- [x] M2: Student Application Form UI Page (`/application`)
- [x] `.env` setup and MongoDB credential documentation

---

### 👤 Team Member 2 — Routing & Navigation (Frontend)
Responsible for the Next.js global layout, navigation, and connecting all the pages together.

- [x] Next.js global layout and nav bar (`app/layout.jsx`)
- [x] Styled navigation with active link highlighting
- [x] Mobile-responsive header (hamburger menu)
- [x] Home/dashboard landing page with links to all modules

---

### 👤 Team Member 3 — State Management & Data Fetching
Responsible for making the UI dynamic — replacing all mock data with real API calls.

- [x] `useEffect` + `fetch` calls to connect Inventory page to `/api/inventory`
- [x] `useEffect` + `fetch` calls to connect Application form to `/api/cycles`
- [x] Loading spinner component (reusable)
- [x] Error state handling ("Something went wrong" UI)
- [x] Empty state handling ("No data yet" UI)

---

### 👤 Team Member 4 — Documentation & Architecture
Responsible for all written documentation, diagrams, and milestone tracking.

- [x] ER/data model diagram (Hostel → Block → Room → Bed)
- [x] Component tree diagram (Next.js pages and components)
- [x] User role & workflow diagram (Student → Warden → Chief Warden)
- [x] Feature backlog for Week 9 and Week 13 targets
- [x] Written policy-to-rule mapping document (M0 discovery output)

---

## ✅ Week 5 Full Checklist

### 🏗️ Architecture & Design
- [x] Component tree planned (Inventory, Application, BedMap, ApplicationForm)
- [x] Data entities identified: Hostel, Block, Room, Bed, AllocationCycle, Application
- [x] User roles documented (Student, Warden, Chief Warden, Admin, Dean, System Admin)
- [x] Architecture diagram (Component Tree image — Team Member 4)

### ⚛️ React Routing & Implementation
- [x] App starts and renders correctly at `localhost:3000`
- [x] `/` — Home page
- [x] `/inventory` — M1 Warden Bed Map (Rajat)
- [x] `/application` — M2 Student Application Form (Rajat)
- [x] Props used in `BedMap` (receives `rooms` prop)
- [x] Conditional rendering used (loading state on inventory page)

### 🔄 Rendering & Data Fetching
- [x] Mock data renders on the Inventory and Application pages
- [x] `useState` and `useEffect` used for loading simulation
- [x] Loading state shown while data "fetches"
- [x] Replace mock data with real API calls (Team Member 3)

### 🗄️ Backend & Database
- [x] Express server running (`server.js`)
- [x] MongoDB connection configured via `.env`
- [x] Inventory schema defined (`models/Inventory.js`)
- [x] Application schema defined (`models/Application.js`)
- [x] `/api/inventory` GET and POST endpoints
- [x] `/api/cycles` GET and POST endpoints

### 🛤️ Product Workflow
- [x] Student can navigate to Application page and fill/submit the form
- [x] Warden can navigate to Inventory page and see the bed map
- [x] Primary workflow end-to-end (Student applies → Warden sees) — Team Member 3

### 📝 Documentation
- [x] README with problem statement, objectives, scope
- [x] Setup/run instructions below
- [x] Team responsibilities and checklist
- [x] Architecture diagram (Team Member 4)
- [x] Feature backlog for W9 and W13 (Team Member 4)

---

## 🚀 Setup & Run Instructions

### Step 1: Clone the repository
```bash
git clone https://github.com/rajatsingh535/Hostel-Allocation-and-Roomate-matching.git
cd "Hostel Allocation and Roomate matching"
```

### Step 2: Backend Setup (Express + MongoDB)
```bash
npm install
```

Create a `.env` file in the **root folder**:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@cluster0.mongodb.net/hostel_allocation?retryWrites=true&w=majority
```

> ⚠️ **MongoDB Credentials:** You need a MongoDB Atlas account.
> 1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
> 2. Create a free cluster → Click "Connect" → "Drivers"
> 3. Copy the connection string and paste it as `MONGODB_URI` above
> 4. Replace `<YOUR_USERNAME>` and `<YOUR_PASSWORD>` with your Atlas credentials
> 5. **NEVER commit the `.env` file to GitHub** — it is already in `.gitignore`

Start the backend:
```bash
npm start
# Server runs at http://localhost:5000
```

### Step 3: Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:3000
```

---

## 📁 Project Folder Structure

```
Hostel Allocation and Roommate Matching/
├── server.js               ← Express backend entry point (Rajat)
├── .env                    ← MongoDB credentials (DO NOT COMMIT)
├── .gitignore
├── package.json
├── models/
│   ├── Inventory.js        ← M1: Hostel, Block, Room, Bed schemas (Rajat)
│   └── Application.js      ← M2: AllocationCycle, Application schemas (Rajat)
├── routes/
│   ├── inventory.js        ← M1: /api/inventory API routes (Rajat)
│   └── cycles.js           ← M2: /api/cycles API routes (Rajat)
└── frontend/
    ├── package.json
    └── app/
        ├── layout.jsx      ← Global nav layout (Team Member 2)
        ├── page.jsx        ← Home page (Team Member 2)
        ├── inventory/
        │   └── page.jsx    ← M1: Warden Bed Map page (Rajat)
        ├── application/
        │   └── page.jsx    ← M2: Student Application page (Rajat)
        └── components/
            ├── BedMap.jsx          ← M1: Visual bed map component (Rajat)
            └── ApplicationForm.jsx ← M2: Application form component (Rajat)
```
