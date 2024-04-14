# Forgotten Server TS Scripting

Allows you to write scripts in Typescript instead of Lua for the Forgotten Server.

## How to use?

1. Install [node.js](https://nodejs.org/en). Verify it's installed by running:

```bash
node --version
```

1. Copy everything from `content-to-paste` directory to your `forgottenserver` root directory.

1. Install node dependencies by running in a root directory of your `forgottenserver`:

```bash
npm ci
```
1. Run the script:

```bash
npm run build-ts:watch
```