# WorkBoard

A small task management dashboard built with Angular. The project demonstrates a clean component structure, routing, reactive forms, client-side state, filtering and local persistence without adding a backend or third-party UI library.

## Features

- Dashboard with task statistics and completion rate
- Create, edit and delete tasks
- Search tasks by title, description or assignee
- Filter by status and priority
- Reactive form validation
- Browser persistence using `localStorage`
- Responsive layout for desktop and mobile
- Angular Signals for lightweight application state
- Standalone components and Angular Router

## Tech stack

- Angular 22
- TypeScript
- Angular Router
- Reactive Forms
- Angular Signals
- HTML / CSS

## Project structure

```text
src/app/
├── components/
│   └── task-form/
├── core/
│   ├── models/
│   └── services/
├── pages/
│   ├── dashboard/
│   └── tasks/
├── app.component.*
└── app.routes.ts
```

## Run locally

### Requirements

Use a Node.js version supported by Angular 22. The Angular documentation currently lists Node 22.22.3 or newer as one supported option.

### Steps

```bash
npm install
npm start
```

Then open:

```text
http://localhost:4200
```

## Production build

```bash
npm run build
```

The generated production files will be placed inside the `dist` directory.

## Notes

This project intentionally uses `localStorage` instead of a backend so the frontend concepts stay easy to review. A real production version could replace the local service methods with `HttpClient` calls to a REST API while keeping the page components mostly unchanged.
