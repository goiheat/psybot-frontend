# Psyboy API integration

## Goal

Replace the mocked chat workflow with the deployed Psyboy API at
`http://51.250.46.121` while keeping the existing visual design. Authentication
remains a demo: the Next.js server uses one hardcoded, well-formed JWT whose
`sub` claim contains a fixed user UUID.

## Scope

The integration covers the API capabilities exposed by the current OpenAPI
schema:

- list threads;
- create a thread;
- load a thread's message history;
- send a message;
- stream assistant output over SSE.

The phone and OTP screens remain demonstrational. Account details, screening
statistics, search, attachments, thread titles, summaries, topics, and archive
actions remain outside this change because the backend exposes no matching
contracts.

## Architecture

The browser communicates only with same-origin Next.js route handlers. Those
handlers proxy requests to the deployed backend and add the hardcoded Bearer
token on the server. This avoids the backend's missing CORS support and keeps
the temporary token out of browser bundles.

A shared server-only API module owns the backend base URL, token, request
forwarding, and upstream error normalization. Route handlers provide narrow
same-origin endpoints for thread collection, thread history/messages, and SSE.
The SSE handler forwards the upstream event stream without buffering.

Client-side API functions and contract types map backend snake_case payloads to
the existing UI models. Chat-specific state remains in the send-message feature;
the views only render loading, empty, success, and error states.

## Data flow

1. The sessions page requests the thread list from a Next.js route handler.
2. Creating a session posts through the same handler, then navigates to the new
   thread UUID.
3. The thread page loads history for that UUID and maps `user` to the existing
   user bubble and `assistant`/`system` to the agent bubble.
4. Before sending a message, the client opens the same-origin SSE stream so it
   cannot miss fast Redis publications, then posts the message.
5. `token` events append content to the streaming assistant message. `done`
   replaces it with the authoritative complete content. `system_message` is
   displayed as an agent message. `error` stops streaming and shows a retryable
   error.

The API currently returns no title or preview for threads. The UI derives a
stable label from the creation date and uses the latest loaded message only on
the thread page; it does not fabricate metadata in the sessions list.

## Authentication

The token is a hardcoded development-only JWT in a server-only module. It has a
fixed UUID in `sub`, which is the only required claim in the current Psyboy
implementation. The backend intentionally decodes without signature
verification because production validation is expected at a gateway.

No token is returned to the browser, written to local storage, or placed in a
`NEXT_PUBLIC_` variable. Replacing it with real authentication later requires
changing only the server-side token provider.

## Error handling

Proxy handlers preserve successful status codes and convert unreachable or
invalid upstream responses into a consistent JSON error with status 502.
Upstream 4xx/5xx details are passed through when safe.

The sessions and thread views show explicit loading, empty, and failure states.
The composer is disabled while a message is being submitted or streamed.
Failed optimistic user messages remain visible with an error notice so the user
does not lose typed content.

## Verification

- Unit-test payload mapping and SSE event reduction where practical.
- Run ESLint and the production Next.js build.
- Verify the proxy health and thread-list requests against the deployed backend.
- Exercise creation, history loading, message submission, and SSE completion
  manually when the backend worker and model are available.

## Constraints

The backend exposes SSE without user authentication and relies on possession of
a thread UUID. This integration does not change that backend behavior. The
hardcoded token and fixed user identity are strictly temporary and must be
replaced before production authentication is claimed to be secure.
