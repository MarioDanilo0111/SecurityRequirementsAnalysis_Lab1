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
├── backend
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── SECURITY-ANALYSIS.md
│   ├── src
│   └── tsconfig.json
├── frontend
│   ├── index.html
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   └── tsconfig.json
├── LICENSE
├── README.md
└── temp.txt
```

---

## Running the Application

### Backend

```bash
cd backend
npm install
npm run dev

```

Backend runs at:
`http://localhost:3000`

---

### Frontend

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
[{ id: 1, name: "Alice", email: "alice@example.com" }];
```

# POST /users

Create a new user.

Body:

```js
{
"name": "Maria",
"email": "maria@example.com"
}
```

Response:

```js

{
"id": 2,
"name": "Maria",
"email": "maria@example.com"
}
```

# PUT /users/:id

# Updates an existing user.

# DELETE /users/:id

Deletes a user.

Responses:

- `204 No Content` — Successfully deleted
- `404 Not Found` — User not found

## Testing Strategy

This project includes three categories of tests:

# ✔ Backend Unit Tests

Covers:

- getUsers
- addUser
- deleteUser
- error handling
- validation scenarios

# ✔ API Tests

Includes:

- GET returns 200
- POST returns 201
- DELETE returns 204
- 404 for unknown ID
- invalid input tests

# ✔ Frontend E2E Tests

Covers:

- App loads
- List renders users
- Create user flow
- Delete user flow
- Error handling messages

Minimum requirement: 5 meaningful tests per category.

# CI/CD Pipeline

The pipeline will:

- Trigger on push and pull_request
- Install backend & frontend dependencies
- Run all test suites (backend, API & E2E)
- Block merge into main unless tests pass
- Uphold branch protection rules

Example workflow filename:

```bash
.github/workflows/ci.yml

```

Pipeline ensures secure, tested code reaches main.

## Security Analysis

A complete security analysis is included in:

```bash
SECURITY-ANALYSIS.md

```

The analysis includes:

- Injection attacks
- Broken Access Control
- Sensitive Data Exposure
- Security Misconfiguration
- Missing Input Validation
- Logging/Monitoring weaknesses

Each item includes:

- Description
- Relevance to the app
- Consequences
- Mitigation

Mitigation

Requirements Checklist

| Requirement              | Status                      |
| ------------------------ | --------------------------- |
| GET/POST/PUT/DELETE API  | ✔ (PUT pending if required) |
| Frontend uses API        | ⬜ Work in progress         |
| 3 CRUD operations via UI | ⬜ Pending                  |
| Backend unit tests       | ✓ Done                      |
| API tests                | ⬜ Pending                  |
| Frontend E2E tests       | ⬜ Pending                  |
| CI/CD pipeline           | ⬜ Pending                  |
| Branch protection rules  | ✓ Done                      |
| Security analysis        | ✓ Done                      |
| README                   | ✓ Done                      |

# How to Clone and Start Project

```bash
git clone <repository-url>
cd SecurityRequirementsAnalysis_Lab1
```

Backend & frontend start instructions are listed above.

---

# License

## MIT License
