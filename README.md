# Hostel Allocation, Roommate Matching & Inventory System

## 📌 Project Overview
A comprehensive digital platform to manage university hostel allocations, roommate matching based on compatibility, and physical inventory tracking (furniture, maintenance). 

The project is divided into **8 core modules**, managed by a 4-member team.

---

## 👥 Team Responsibilities (8 Modules)

### 👤 Rajat Singh
* **Module 1 — Authentication & Role Management**
  * Login/Register pages, role-based routing (Student/Warden), protected routes.
* **Module 2 — Student Hostel & Room Browsing**
  * Browsing BH1–BH10, viewing room types, bed availability, and applying for rooms.

### 👤 Team Member 2
* **Module 3 — Warden Hostel & Room Management**
  * Warden interface to manage the hostel hierarchy (Hostel → Block → Floor → Room → Bed) and update bed statuses.
* **Module 4 — Room Allocation & Requests**
  * Workflow for students to request beds and wardens to approve/reject and officially allocate them.

### 👤 Team Member 3
* **Module 5 — Roommate Matching**
  * Student profiles (study habits, cleanliness, sleep schedule), compatibility scoring, and roommate requests.
* **Module 6 — Hostel Inventory**
  * Managing physical assets (beds, mattresses, tables, fans) and assigning them to rooms/students.

### 👤 Team Member 4
* **Module 7 — Maintenance & Notifications**
  * Ticketing system for plumbing/electrical issues, and system-wide notifications for allocations and requests.
* **Module 8 — Dashboard, Data, API & Documentation**
  * High-level analytical dashboards for Wardens, student homepages, mock data seeding, and API architecture.

---

## 🏗️ Technology Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose

---

## 🚀 System Architecture

```text
                    HOSTEL MANAGEMENT SYSTEM
                              |
                ┌─────────────┴─────────────┐
                |                           |
             STUDENT                     WARDEN
                |                           |
       ┌────────┼────────┐          ┌───────┼────────┐
       |        |        |          |       |        |
    Hostels  Roommate  Requests   Rooms  Allocation Inventory
       |        |        |          |       |        |
       └────────┴────────┴──────────┴───────┴────────┘
                              |
                         Backend API
                              |
                          Database
```

---

## 🛤️ Application Workflows

### Student Workflow
`Login → Student Dashboard → Browse BH1-BH10 → View Available Beds → Apply for Room → Request Pending`

### Warden Workflow
`Login → Warden Dashboard → View Pending Requests → Approve Request → Allocate Bed → Dashboard Updates`

### Roommate Matching Workflow
`Create Profile → Search Compatible Students → Send Request → Peer Accepts → Roommates Connected`

---

## ⚙️ Setup Instructions

### 1. Backend Setup
```bash
npm install
# Create a .env file with MONGODB_URI=mongodb+srv://<user>:<pass>@cluster...
npm start
# Runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```
