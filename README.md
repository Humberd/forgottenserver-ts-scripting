# The Forgotten Server - TypeScript Scripting environment

![GitHub license](https://img.shields.io/github/license/Humberd/forgottenserver-ts-scripting)

Allows you to write scripts in Typescript instead of Lua for the Forgotten Server.
It uses [hand-written type declarations](https://github.com/Humberd/forgottenserver-ts-declarations) to provide a
type-safe environment for scripting.

## How to install?

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

## How to use?

### Development mode

There are 2 helper scripts you can run side by side

* Transpiling Typescript to Lua:

It watches for changes in `./ts-lua` directory and transpiles them to Lua.

```bash
npm run build-ts:watch
```

* Compiling and running The Forgotten Server:

```bash
npm run build-and-run-cpp
```

### Production mode

```bash
npm run build-ts
npm run build-cpp
```

https://github.com/Humberd/forgottenserver-ts-scripting/assets/10242142/50a0abe7-d9fc-48e9-8b1a-ca3fc2ad4d19

## How it works?

All the TypeScript files from `./ts-lua` directory are transpiled to Lua
and are placed in `./data/scripts/ts-lua` directory.
They are treated as normal Lua scripts by the Forgotten Server.

There is also a library generated in `./data/lib/lualib_bundle.lua`.
It contains compat functions that allow a seamless use of typescript builtin feature,
such as `Array`, `Map`, `Set`, etc.
It is placed in the `./data/lib` directory, because it needs not to be reloaded,
when you reload your scripts using `/reload scripts` GOD command.

## Compatibility

It should work with any version of the Forgotten Server.
However, type declarations are currently written only for the 1.4 version of the Forgotten Server.
https://github.com/Humberd/forgottenserver-ts-declarations.
If you want to use it with a different version, you need to write your own type declarations
to match the API of your version of the Forgotten Server.
Contributions are welcome!