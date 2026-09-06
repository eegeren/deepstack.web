# DeepStack Website

Product and documentation site for **DeepStack — Your AI Infrastructure Engineer**.

The site presents the product-facing CLI workflow:

```text
deepstack setup
deepstack connect server production ...
deepstack connect windows windows-prod ...
deepstack connect aws production ...
deepstack targets
deepstack status production
deepstack audit production
deepstack ask production "What should I fix first?"
deepstack investigate production "Why is SSH insecure?"
deepstack plan inv_xxxxx
deepstack demo
```

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

The development server prints the local URL when it starts.

## Validation

```bash
npm run lint
npm test
```

`npm test` creates a production build and verifies the server-rendered product page, command surface, capability status, and safety language.

## Project structure

- `app/page.tsx` — landing page and embedded product documentation
- `app/globals.css` — responsive visual system
- `app/layout.tsx` — metadata and social sharing configuration
- `public/og.png` — DeepStack social preview
- `tests/rendered-html.test.mjs` — rendered HTML regression tests
- `.openai/hosting.json` — Sites project configuration

## Product-content rules

- Recommended commands use named targets; raw compatibility commands do not lead the documentation.
- A target may contain Linux, Windows Server, AWS, or a supported combination.
- Deterministic audit features do not require AI configuration.
- Planning is non-mutating and currently marked experimental.
- Approval-gated execution is described only as foundational and limited to explicitly supported actions.
- Telegram, WhatsApp, and the web dashboard are not presented as available.
- The site must never suggest arbitrary shell access, secret storage, or unverified rollback support.
