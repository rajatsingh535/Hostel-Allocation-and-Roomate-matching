# P03 – Policy-Driven Hostel Allocation Engine with Roommate Compatibility Matching

## 1. Project Overview & Problem Statement
**Description:** Digitises hostel inventory and the allocation cycle: captures applications, validates eligibility against approved policy, generates a draft allocation, and routes to wardens for review.
**Problem:** Manual allocation for thousands of applicants using spreadsheets is slow, error-prone, hard to audit, and produces no reviewable record.
**Objectives:** 
- Maintain inventory (bed-level granularity).
- Manage application cycles.
- Generate constraint-respecting allocations.

**Tech Stack (Track J):** Node.js + MongoDB + Next.js (React)

---

## 2. Week 5 Foundation Architecture & Routing

As per the **Week 5 Evaluation — Foundation Review**, we have established the following React/Next.js foundation:
* **Architecture:** Component-based Next.js App Router structure. Clear separation of Server (Node/Express) and Client (Next.js/React).
* **Routing:** Implemented `/inventory` (Warden View) and `/application` (Student View).
* **Rendering & Data:** Core UIs are rendering with mock data to demonstrate state and conditional rendering.
* **Backend Integration:** MongoDB Schemas and basic Express endpoints are defined.

---

## 3. Team Responsibilities (Week 5 Focus - 2 Modules/Tasks Each)

**1. Rajat (Assigned M1 & M2)**
* **Task 1: M1 (Hostel & Room Inventory):** Implemented MongoDB schema (`models/Inventory.js`) and the React UI for the Warden Bed Map (`/inventory`).
* **Task 2: M2 (Application & Cycle Management):** Implemented MongoDB schema (`models/Application.js`) and the React UI for the Student Application form (`/application`).

**2. Team Member 2**
* **Task 1: Next.js Routing & Layout:** Scaffold the main App Router layout, navigation bar, and page routing logic.
* **Task 2: Clickable Workflow & Prototypes:** Ensure the primary user journey (Student -> Warden) is linked and demonstrable for the Week 5 review.

**3. Team Member 3**
* **Task 1: Data Fetching & State:** Set up state management and data fetching patterns (e.g., `useEffect` or React Query) to replace mock data with API calls.
* **Task 2: Error & Loading States:** Implement visual loading spinners and empty/error states across the application.

**4. Team Member 4**
* **Task 1: Project Documentation & Architecture Diagrams:** Maintain the ER diagrams, Component Trees, and this README.
* **Task 2: Milestone Backlog (W9 & W13):** Define the feature backlog for the upcoming weeks (Eligibility Validation, Preference Management, Allocation Engine).

---

## 4. Feature Backlog & Milestones
* **Week 5 (Current):** Foundation Review (M1, M2 mockups, UI layouts, DB schemas).
* **Week 9:** M3 (Eligibility), M4 (Preferences), M5 (Questionnaire). Fully connected APIs.
* **Week 13:** M6 (Allocation Engine), M7 (Warden Review), M8/M9 (Waitlist & Publication).

---

## 5. Setup & Run Instructions

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas or Local instance

### Backend Setup
1. `cd` to the root directory.
2. Run `npm install`.
3. Create a `.env` file and add: `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hostel`
4. Run `npm start` to boot the Express server.

### Frontend Setup (Next.js)
1. `cd frontend`
2. Run `npm install`
3. Run `npm run dev` to start the React application.
