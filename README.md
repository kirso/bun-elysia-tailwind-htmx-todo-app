# A simple TODO app

## Intro

This repo is a simple CRUD todo web app for learning purposes.

Features:

- Add todo
- Toggle todo as done
- Remove todo

Based on the ![BETH stack](https://github.com/ethanniser/the-beth-stack) by
![Ethan Niser](https://github.com/ethanniser)

Live deployed version:
![CLICK ME](https://bun-elysia-tailwind-htmx-todo-app-falling-pond-2121.fly.dev)

## Tech - under the hood

- ![Bun](https://www.bun.sh) - JavaScript runtime & toolkit.
- ![Elysia](https://elysiajs.com/) - server-side, end-to-end typesafety on top
  of Bun.
- ![Typed HTML](https://github.com/nicojs/typed-html) - typesafe HTML templates.
- ![Tailwind](https://tailwindcss.com/) - utility first CSS.
- ![Turso](https://www.turso.tech) - SQLite on the edge.
- ![Drizzle ORM](https://orm.drizzle.team/)) - typesafe ORM.
- ![HTMX](https://www.htmx.org) - simple interactivity via hypermedia systems.
- ![Hyperscript](https://www.hyperscript.org/) - scripting for simple DOM
  manipulation.
- ![Fly](https://www.fly.io) - easy deployments via CLI.

## TODO

- To add authentication with ![Lucia](https://lucia-auth.com/)

## Instructions

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```
