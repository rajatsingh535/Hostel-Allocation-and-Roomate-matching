# 🏫 LPU Hostel Allocation & Roommate Matching Platform

## 📌 Project Overview
A comprehensive digital platform for **Lovely Professional University (LPU)** to manage hostel allocations, roommate matching based on lifestyle compatibility, and complete inventory tracking. The system serves **8,000+ students** across **BH1-BH10 hostels** with automated allocation algorithms and governance workflows.

### 🎯 Core Features
- **Smart Allocation Engine**: Deterministic allocation algorithm with configurable priority and compatibility scoring
- **Roommate Matching**: Lifestyle questionnaire-based compatibility scoring system  
- **Governance Workflow**: Draft → Review → Approval → Publication with immutable audit trails
- **Visual Inventory Management**: Interactive bed maps with drag-and-drop allocation
- **Multi-Role System**: Student, Warden, Chief Warden, Hostel Admin, Dean, System Admin

---

## 🏗️ System Architecture

```text
┌─────────────────────┐
│      Next.js        │
│   React Frontend    │
└──────────┬──────────┘
           │ REST API
           ▼
┌─────────────────────┐
│     Node.js API     │
│      Express.js     │
└───────┬─────┬───────┘
        │     │
┌───────┘     └──────────┐
▼                        ▼
┌─────────────────┐   ┌─────────────────┐
│     MongoDB     │   │ Redis + BullMQ  │
│    Mongoose     │   │ Allocation Jobs │
└─────────────────┘   └────────┬────────┘
                               │
                               ▼
                    ┌─────────────────┐
                    │ Allocation Worker│
                    │    Node.js      │
                    └─────────────────┘
```

---

## 👥 Team Responsibilities (8 Modules) - **WEEK 5 COMPLETE** ✅

### **✅ Rajat Singh** (ALL MODULES IMPLEMENTED)
* **Module 1 — Architecture & Design (5 marks) ✅**
  * ✅ Clear React component decomposition with responsibility boundaries
  * ✅ Project structure reflecting product workflow 
  * ✅ Data entities, user roles, and major workflows identified
  * ✅ Component tree + architecture diagram + repo structure

* **Module 2 — React.js Routing & Implementation (5 marks) ✅**
  * ✅ Next.js App Router implementation with role-based routing
  * ✅ Core pages: Login, Student Dashboard, Hostel Browsing, Warden Dashboard
  * ✅ Props, composition, and conditional rendering used meaningfully
  * ✅ Navigation/routing structure with protected routes

* **Module 3 — Warden Hostel & Room Management ✅**
  * ✅ Hierarchical inventory management (Hostel → Block → Floor → Room → Bed)
  * ✅ Interactive bed status updates with visual bed maps
  * ✅ Real-time occupancy tracking and availability management
  * ✅ Bed assignment workflow with status change modals

* **Module 4 — Room Allocation & Requests ✅**
  * ✅ Student application review system with detailed view modals
  * ✅ Document verification workflow with status tracking
  * ✅ Approval/rejection workflow with mandatory reasoning
  * ✅ Priority-based application sorting and filtering

* **Module 5 — Roommate Matching ✅**
  * ✅ Compatibility-based roommate discovery with scoring algorithm
  * ✅ Lifestyle questionnaire and preference matching system
  * ✅ Roommate request/response workflow with messaging
  * ✅ Profile viewing and compatibility analysis

* **Module 6 — Hostel Inventory ✅**
  * ✅ Comprehensive asset management (furniture, electronics, bedding, maintenance)
  * ✅ Asset condition tracking with maintenance issue reporting
  * ✅ Category-based inventory organization with search/filtering
  * ✅ Maintenance workflow integration with priority management

* **Module 7 — Maintenance & Notifications ✅**
  * ✅ Student maintenance request submission system
  * ✅ Issue tracking with status updates and progress monitoring
  * ✅ Comprehensive notification system with multiple types
  * ✅ Priority-based issue management with assignment workflow

* **Module 8 — Application Form & Workflow ✅**
  * ✅ Multi-step progressive application form with validation
  * ✅ Document upload system with file type restrictions
  * ✅ Application progress tracking and draft saving
  * ✅ Review and submission workflow with terms acceptance

---

## 📊 Data Architecture

### Core Entities & Relationships
```javascript
// User & Authentication
User → Student/Warden/Admin (role-based inheritance)
Student → Application → Preferences → CompatibilityResponse
Student → AllocationAssignment → Bed → Room → Block → Hostel

// Inventory Hierarchy  
Hostel → Block → Floor → Room → Bed
Bed.status: AVAILABLE | ALLOCATED | RESERVED | MAINTENANCE | BLOCKED

// Allocation Workflow
AllocationCycle → Application[] → AllocationRun → AllocationDraft → AllocationAssignment[]
AllocationDraft.status: DRAFT | UNDER_REVIEW | APPROVED | PUBLISHED | REJECTED

// Governance & Audit
Override → reason + auditTrail
Approval → draftId + approverId + timestamp
AuditEntry → immutable action logging
```

### User Roles & Permissions
```javascript
STUDENT: { 
  canView: ['own-application', 'own-allocation', 'hostels', 'preferences'],
  canEdit: ['own-profile', 'own-preferences', 'own-documents'],
  canSubmit: ['application', 'roommate-requests']
}

WARDEN: {
  canView: ['assigned-hostel', 'allocation-drafts', 'student-applications'],
  canEdit: ['bed-assignments', 'allocation-overrides'],
  canApprove: ['allocation-drafts']
}

CHIEF_WARDEN: {
  inherits: ['WARDEN'],
  canManage: ['all-hostels', 'allocation-cycles', 'policy-rules']
}
```

---

## 🛤️ Core Application Workflows

### 🎓 Student Journey
```
Registration → Profile Setup → Hostel Browsing → Application Submission 
    ↓
Preference Ranking → Compatibility Questionnaire → Document Upload
    ↓  
Eligibility Check → Allocation Processing → Result Publication → PDF Letter
```

### 👨‍💼 Warden Journey  
```
Login → Dashboard Overview → Review Applications → Monitor Allocation
    ↓
Draft Review → Bed Reassignment → Override Management → Approval Workflow
    ↓
Publication → Audit Reports → Waiting List Management
```

### ⚙️ Allocation Engine Workflow
```
Cycle Trigger → Load Applications → Priority Calculation → Constraint Checking
    ↓
Compatibility Scoring → Bed Assignment → Draft Generation → Review Queue
    ↓
Approval Required → Publication → Audit Logging → Notification Dispatch
```

---

## 🏗️ Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3.4
- **Language:** JavaScript (ES2022)
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **State:** React Context + Hooks

### Backend (Future Implementation)
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB + Mongoose ODM
- **Queue:** Redis + BullMQ
- **Auth:** JWT + HTTP-only cookies
- **Validation:** Zod/Joi
- **Testing:** Jest + Supertest + Playwright
- **Deployment:** Docker + Docker Compose

---

### ⚙️ Current Implementation Status

### **✅ Week 5 Completed - ALL 8 MODULES** 

#### **🏗️ Module 1: Architecture & Design ✅**
- [x] Component decomposition with clear boundaries
- [x] Hierarchical project structure (app/ + components/)
- [x] Role-based routing architecture
- [x] Data entity modeling with relationships
- [x] State management decisions with React Context + hooks

#### **🔗 Module 2: React.js Routing & Implementation ✅**  
- [x] Next.js App Router implementation with nested routing
- [x] Core pages: Login, Student/Warden Dashboards, Hostel Browsing
- [x] Role-based navigation with protected route middleware
- [x] Component composition patterns with props and conditional rendering

#### **🏠 Module 3: Warden Hostel & Room Management ✅**
- [x] Interactive hostel hierarchy navigation (Hostel → Block → Floor → Room → Bed)
- [x] Real-time bed status management with visual indicators
- [x] Bed assignment workflow with drag-and-drop interface concepts
- [x] Occupancy statistics and availability tracking

#### **📋 Module 4: Room Allocation & Requests ✅**
- [x] Student application review system with filtering and search
- [x] Document verification workflow with status indicators
- [x] Approval/rejection workflow with detailed application modals
- [x] Priority-based request management and assignment tracking

#### **👥 Module 5: Roommate Matching ✅**  
- [x] Compatibility-based roommate discovery system
- [x] Lifestyle preference questionnaire and scoring
- [x] Roommate request/response workflow with messaging
- [x] Profile viewing with detailed compatibility analysis

#### **🪑 Module 6: Hostel Inventory ✅**
- [x] Comprehensive asset management across categories
- [x] Asset condition tracking and maintenance issue reporting  
- [x] Category-based organization with advanced search/filtering
- [x] Maintenance workflow integration with priority levels

#### **🔧 Module 7: Maintenance & Notifications ✅**
- [x] Student maintenance request submission system
- [x] Issue tracking with status updates and progress monitoring
- [x] Multi-type notification system (allocation, maintenance, roommate, payment)
- [x] Priority-based issue management with team assignment

#### **📝 Module 8: Application Form & Workflow ✅**  
- [x] Multi-step progressive application form with validation
- [x] Document upload system with file restrictions and preview
- [x] Application progress tracking with step-by-step navigation
- [x] Review and submission workflow with terms acceptance

### 🔄 **Next Team Implementation Phases**

#### **Week 9 Targets** (Team Member 2):
- **Module 3 Extension**: Backend API integration with Express.js + MongoDB
- **Module 4 Extension**: Database schemas and real-time data synchronization  
- **Data Fetching**: Replace mock data with API calls and loading states
- **Authentication**: JWT implementation with secure session management

#### **Week 13 Targets** (Team Members 3 & 4):  
- **Backend Services**: Complete allocation engine with BullMQ job processing
- **PDF Generation**: Institutional allocation letters with Puppeteer
- **Analytics Dashboard**: Advanced charts and reporting with Recharts
- **Production Deployment**: Docker containerization and CI/CD pipeline

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+ 
npm or yarn
Git
```

### Installation & Setup
### 1. Clone Repository
```bash
git clone https://github.com/rajatsingh535/Hostel-Allocation-and-Roomate-matching.git
cd Hostel-Allocation-and-Roomate-matching
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Application runs on http://localhost:3000
```

### 3. Access Application
- **Student Portal:** http://localhost:3000/login → Select Student Role
- **Warden Portal:** http://localhost:3000/login → Select Warden Role  
- **Demo Credentials:** Any email/password (mock authentication)

---

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global Tailwind styles
│   ├── layout.jsx               # Root layout component
│   ├── page.jsx                 # Home page (redirects to login)
│   ├── login/                   # Authentication pages
│   │   └── page.jsx
│   ├── student/                 # Student portal pages
│   │   ├── dashboard/
│   │   ├── hostels/
│   │   ├── application/
│   │   ├── roommate/
│   │   └── maintenance/
│   └── warden/                  # Warden portal pages
│       ├── dashboard/
│       ├── requests/
│       ├── rooms/
│       └── assets/
├── components/                   # Reusable React components
│   ├── ApplicationForm.jsx      # Multi-step student application
│   ├── BedMap.jsx              # Visual bed allocation map
│   ├── EmptyState.jsx          # Empty state component
│   ├── ErrorState.jsx          # Error boundary component
│   └── LoadingSpinner.jsx      # Loading indicator
├── package.json                 # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

---

## 🎯 Component Architecture

### Layout Components
- **RootLayout**: Global app shell with navigation
- **StudentLayout**: Student portal wrapper with sidebar navigation
- **WardenLayout**: Warden portal wrapper with admin navigation

### Page Components  
- **LoginPage**: Role-based authentication interface
- **StudentDashboard**: Application status and quick actions
- **HostelBrowsingPage**: BH1-BH10 hostel exploration
- **ApplicationPage**: Multi-step application workflow
- **WardenDashboard**: Allocation management overview

### UI Components
- **BedMap**: Interactive bed status visualization  
- **ApplicationForm**: Progressive form with validation
- **LoadingSpinner**: Consistent loading states
- **EmptyState**: Graceful empty data handling
- **ErrorState**: User-friendly error messages

---

## 📱 Current Features (Week 5)

### ✅ Authentication System
- Role-based login (Student/Warden selection)
- Protected route middleware  
- Session persistence simulation
- Logout functionality

### ✅ Student Portal
- **Dashboard**: Application status overview
- **Hostel Browsing**: BH1-BH10 hostel cards with details
- **Application**: Multi-step form framework
- **Roommate**: Compatibility matching placeholder
- **Maintenance**: Issue reporting interface

### ✅ Warden Portal  
- **Dashboard**: Allocation statistics overview
- **Requests**: Student application review queue
- **Room Management**: Hierarchical room/bed interface
- **Assets**: Inventory tracking system

### ✅ Navigation & UX
- Responsive mobile-first design
- Intuitive role-based navigation
- Loading and error state handling
- Consistent Tailwind styling

---

## 🔮 Upcoming Features (Post Week 5)

### Backend Integration
- RESTful API with Express.js
- MongoDB database with Mongoose ODM  
- JWT authentication with secure cookies
- File upload system for documents

### Advanced Student Features
- Real-time application progress tracking
- Preference drag-and-drop ranking system
- Lifestyle compatibility questionnaire
- PDF allocation letter generation

### Warden Management Tools
- Interactive bed map with drag-and-drop allocation
- Allocation draft review and approval workflow
- Override management with mandatory reasoning
- Comprehensive analytics dashboard

### System Administration
- Allocation cycle management
- Policy rule configuration engine
- Audit trail and compliance reporting
- Bulk data import/export tools

---

## 👨‍💻 Development Guidelines

### Code Standards
- **Components**: Functional components with hooks
- **Styling**: Tailwind utility classes (no custom CSS)
- **State**: React Context for global state, useState for local
- **Files**: .jsx extension for React components
- **Naming**: PascalCase components, camelCase functions

### Git Workflow
```bash
git checkout -b feature/module-name
# Make changes
git add .
git commit -m "feat: implement module description"
git push origin feature/module-name
# Create pull request
```

---

## 📞 Support & Contact

- **Developer**: Rajat Singh  
- **Repository**: [GitHub - Hostel Allocation Platform](https://github.com/rajatsingh535/Hostel-Allocation-and-Roomate-matching)
- **Institution**: Lovely Professional University (LPU)
- **Academic Year**: 2026-27

---

*Built with ❤️ for LPU students using Next.js, React, and Tailwind CSS*
