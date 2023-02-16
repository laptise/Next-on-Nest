# Next-on-Nest

Next.js on Nest.js

This provides Next.js on Nest.js in single repository.

All command are available.

Next.js package is located in `client` directory.

Nest.js package is located in `server` directory.

Tests are located in `test` directory.

## Behaviour

- `/*` all routes are routed to Next.js

- `/api` is Routed to Nest.js

So if you call `/api`, then it calls `AppController.getHello`
And if you call `/`, then the `client/pages/index.tsx` will be displayed
