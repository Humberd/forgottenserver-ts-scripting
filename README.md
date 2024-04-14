# Forgotten Server TS Scripting

Allows you to write scripts in Typescript instead of Lua for the Forgotten Server.

## How to use?

1. Install [node.js](https://nodejs.org/en). Verify it's installed by running:

```bash
node --version
```

2. Copy everything from `content-to-paste` directory to your `forgottenserver` root directory.

https://github.com/Humberd/forgottenserver-ts-scripting/assets/10242142/3b442da4-f9ac-4251-8e70-3f4427b344dd

3. Install node dependencies by running in a root directory of your `forgottenserver`:

```bash
npm ci
```

4. Run the script:

```bash
npm run build-ts:watch
```

## How it works?

All the TypeScript files from `./ts-lua` directory are transpiled to Lua
and are placed in `./data/scripts/ts-lua` directory.
They are treated as normal Lua scripts by the Forgotten Server.

There is also a library generated in `./data/lib/lualib_bundle.lua`.
It contains compat functions that allow a seamless use of typescript builtin feature,
such as `Array`, `Map`, `Set`, etc.
It is placed in the `./data/lib` directory, because it needs not to be reloaded,
when you reload your scripts using `/reload scripts` GOD command.
