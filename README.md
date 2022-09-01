# Simpe rust web app (HAHA)

This project brings you up and running with a minimalistic setup to build any applications with TypeScript + Rust Wasm. It also supports Tailwind CSS.

## Commands
```
// installs all packages
npm install

// runs a simple server with hot reloading
npm run serve

// builds in development mode
npm run build

// builds in release/production
npm run build:release

// builds the rust library in development mode
npm run build:rust

// builds the rust library in release mode
npm run build:rust:release
```
## Folder structure
- The `app.ts` script in `src`  is the entry point of the application.
- Everything inside `src/public` will be moved in `dist/public` when built.
- Styles (SCSS) belong inside `src/styles`.
- The `index.html` is the HTML template. Styles and scripts will be attached automatically.
