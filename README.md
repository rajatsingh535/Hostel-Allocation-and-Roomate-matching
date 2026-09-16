# P03 – Policy-Driven Hostel Allocation Engine with Roommate Compatibility Matching

## Project Overview
Digitises hostel inventory and the allocation cycle: captures applications and ranked preferences, validates eligibility against approved policy, generates a draft allocation honouring capacity, quota and accessibility constraints, and routes the draft to wardens for documented review before publication.

**Tech Stack (Track J):** Node.js + MongoDB + Next.js

---

## 🎯 Scope: Week 1 to Week 5 (M0 & M1 Milestones)
As per our project roadmap, we are currently focusing *only* on the requirements up to Week 5.
* **M0 (Weeks 1-2):** Discovery and Policy Capture.
* **M1 (Weeks 3-5):** Inventory and Applications (M1 & M2 Modules).

### 👥 Team Responsibilities (Up to Week 5)

We have divided the Week 1-5 tasks among our 4 team members. 

**1. Rajat (Assigned First Week 5 Requirements)**
* **Role:** Lead / Backend & Database Setup
* **Tasks:** 
  * Initial project repository setup and architecture.
  * Define MongoDB connection and environment variables.
  * Define MongoDB Schemas for M1 (Hostel, Block, Room, Bed).
  * Document the Discovery & Policy Capture (M0).

**2. Team Member 2**
* **Role:** Backend Developer (Inventory)
* **Tasks:**
  * Implement CRUD APIs for Hostel & Room Inventory (`/inventory/*`).
  * Ensure bed-level granularity and accessibility attributes are captured.

**3. Team Member 3**
* **Role:** Backend Developer (Applications)
* **Tasks:**
  * Define MongoDB Schemas for M2 (Cycles, Applications).
  * Implement APIs for Application & Cycle Management (`/cycles/:id/applications`).

**4. Team Member 4**
* **Role:** Frontend Developer
* **Tasks:**
  * Scaffold the Next.js frontend.
  * Build the visual bed map (basic layout) and student application form UX.
  * Connect frontend to inventory APIs.

---

## ✅ Progress Checklist (Up to Week 5)

- [x] Initial Repo Setup
- [x] Create README with task distribution
- [x] Setup basic Express server & MongoDB connection template
- [x] Define basic M1 Schemas (Inventory)
- [ ] Implement Inventory APIs (CRUD)
- [ ] Define M2 Schemas (Cycles & Applications)
- [ ] Implement Application APIs
- [ ] Frontend setup and integration

---

## 🚀 Getting Started

### Prerequisites
* Node.js
* MongoDB (Local or Atlas)

### Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory.
4. **IMPORTANT - MongoDB Credentials:** You need to configure your MongoDB connection string in the `.env` file like this:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hostel_db?retryWrites=true&w=majority
   ```
   *(Please replace `<username>` and `<password>` with your actual MongoDB credentials. Do not commit the `.env` file!)*
5. Run `npm start` or `node server.js` to start the backend.

---
*Note: This repository currently contains code only for the M0 and M1 milestones (up to Week 5).*
