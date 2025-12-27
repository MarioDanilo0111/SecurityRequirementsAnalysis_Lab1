# SecurityRequirementsAnalysis_Lab1

A fullstack DevSecOps assignment designed to demonstrate secure software design, REST API development, frontend integration, automated testing and CI/CD pipelines.

---

## Overview

This project implements a simple **User Management Application** with full CRUD functionality.  
The goal is to meet the grading requirements for a DevSecOps assignment by building a complete fullstack solution with:

- Backend (Node.js + Express + TypeScript)
- Frontend (Vite + TypeScript)
- Security analysis (OWASP-aligned)
- Automated tests (unit, API, and E2E)
- GitHub Actions CI/CD pipeline
- Branch protection rules

---

## Project Structure

```yaml
├──.github
│   ├──workflows
│       ├── ci.yml
│       └── frontend.yml
├── backend
│   ├── package-lock.json
│   ├── package.json
│   ├── postman
│   ├── SECURITY-ANALYSIS.md
│   ├── src
│   ├── test-server.js
│   ├── tests
│   └── tsconfig.json
├── frontend
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── playwright.config.ts
│   ├── src
│   ├── tests-e2e
│   └── tsconfig.json
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

---

## Running the Application

### Recommended: Start both frontend & backend from root

    The root folder includes:

      - .nvmrc → Ensures correct Node version
      - A dev script → Runs backend + frontend simultaneously

Step 1 — Use correct Node version

```bash
nvm use
```

Step 2 — Install dependencies (root + subprojects)

```bash
npm install
```

Step 3 — Start everything

```bash
npm run dev
```

This launches:

    - Backend: http://localhost:3000
    - Frontend: http://localhost:5173

### Running Backend only

```bash
cd backend
npm install
npm run dev

```

Backend runs at:
`http://localhost:3000`

---

### Running Frontend only

```bash
cd frontend
npm install
npm run dev

```

Frontend runs on Vite’s dev server:
`http://localhost:5173`

---

## REST API Documentation

# GET /users

Fetch all users.

Response:

```js
[{ id: 1, name: "Alice", email: "alice@example.com", role: "user" }];
```

# POST /users

Create a new user.

Body:

```js
{
  "name": "Maria",
  "email": "maria@example.com",
  "role": "admin"
}

```

Response:

```js

{
{
  "id": 2,
  "name": "Maria",
  "email": "maria@example.com",
  "role": "admin"
}

}
```

---

# PUT /users/:id

Updates an existing user.

---

# DELETE /users/:id

Deletes a user.

Responses:

- `204 No Content` — Successfully deleted
- `404 Not Found` — User not found

---

## Testing Strategy

This project includes three categories of tests:

# Backend Unit Tests

Covers:

- getUsers
- addUser
- deleteUser
- updateUser
- error & validation paths

---

# API Tests (Postman + Newman)

Covers:

- GET → 200 OK
- POST → 201 Created
- PATCH → 200 Updated
- DELETE → 204 No Content
- DELETE non-exixting → 404

---

# Frontend E2E Tests (Playwright)

Covers:

- App loads with correct heading
- User list renders
- Create new user flow
- Delete user flow
- Error message show when backend is down

All tests pass.

---

# CI/CD Pipeline

GitHub Actions automatically:

- Installs BE + FE dependencies
- Run unit tests
- Runs API tests
- Runs E2E tests via Playwright
- Block merge into `main` unless tests pass
- Enforces branch protection rules

Workflow are stored in:

```bash
.github/workflows/ci.yml
.github/workflows/frontend-ci.yml

```

Pipeline ensures secure, tested code reaches main.

---

## Security Analysis

A complete OWASP-aligned analysis is included in:

```bash
backend/SECURITY-ANALYSIS.md

```

The analysis includes:

- Injection attacks
- Broken Access Control
- Sensitive Data Exposure
- Security Misconfiguration
- Input validation gaps
- Logging/Monitoring weaknesses
- Mitigation for each risk

---

Requirements Checklist

| Requirement              | Status |
| ------------------------ | ------ |
| GET/POST/PUT/DELETE API  | ✔ Done |
| Frontend uses API        | ✓ Done |
| 4 CRUD operations via UI | ✓ Done |
| Backend unit tests       | ✓ Done |
| API tests                | ✓ Done |
| Frontend E2E tests       | ✓ Done |
| CI/CD pipeline           | ✓ Done |
| Branch protection rules  | ✓ Done |
| Security analysis        | ✓ Done |
| README                   | ✓ Done |

---

# How to Clone and Start Project

```bash
git clone <repository-url>
cd SecurityRequirementsAnalysis_Lab1
nvm use
npm install
npm run dev
```

Backend & frontend start instructions are listed above.

---
