# Fitness Tracker API

> A small Express.js backend for tracking running and lifting activities, executions, and goals.

## Features

- User authentication (JWT via cookies)
- CRUD for activity runs and lifts
- Record executions for runs and lifts
- Create and manage run and lift goals
- Input validation using `express-validator`

## Prerequisites

- Node.js 18+ (or compatible)
- PostgreSQL database

## Quick setup

1. Install dependencies

```bash
npm install
```

2. Create a PostgreSQL database and run your migrations/schema (not included).

3. Set environment variables (examples):

```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=youruser
export DB_PASSWORD=yourpassword
export DB_NAME=fitnessdb
export JWT_SECRET=your_jwt_secret
```

4. Start the server

```bash
node app.js
```

The server listens on port `3000` by default.

## Important files

- `app.js` — application entry and route mounting
- `Routers/` — route definitions (e.g. `runEx.routes.js`, `liftEx.routes.js`, `goalsRun.routes.js`, `goalsLift.routes.js`)
- `Controllers/` — request handlers
- `DB/` — database access helpers
- `Validation/` — express-validator rules
- `utils/validate.js` — validator result middleware

## API overview (important endpoints)

- Authentication
  - `POST /auth/login` — login and set auth cookie
  - `POST /auth/logout` — clear cookie

- Users
  - `GET /users` — get user info

- Run executions
  - `GET /run-execution/:activityRunId`
  - `POST /run-execution/:activityRunId`
  - `PATCH /run-execution/:id`
  - `DELETE /run-execution/:id`

- Lift executions
  - `GET /lift-execution/:activityLiftId`
  - `POST /lift-execution/:activityLiftId`
  - `PATCH /lift-execution/:id`
  - `DELETE /lift-execution/:id`

- Run goals
  - `GET /run-goals`
  - `POST /run-goals`
  - `PATCH /run-goals/:id`
  - `DELETE /run-goals/:id`

- Lift goals
  - `GET /lift-goals`
  - `POST /lift-goals`
  - `PATCH /lift-goals/:id`
  - `DELETE /lift-goals/:id`

## Validation

All body and param validation is implemented with `express-validator`. Validation rule files are in the `Validation/` folder and the project uses `utils/validate.js` to return `422` responses with validation error arrays.

## Notes & next steps

- Add database schema/migrations and seed data.
- Add tests and CI.
- Consider adding a `.env` loader (`dotenv`) and a `npm start` script.

If you want, I can add a `start` script, sample `.env.example`, or API documentation (OpenAPI/Swagger).
