# The Forgotten Server - TypeScript scripting environment

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

## Features

### Syntax Highlighting

![TypeScript syntax highlighting](https://github.com/Humberd/forgottenserver-ts-scripting/assets/10242142/3b7d54aa-9cbe-4371-a362-22f7cac49bee)

### Code Completion

Autocompletes enums:

![TypeScript enum code completion](https://github.com/Humberd/forgottenserver-ts-scripting/assets/10242142/be0820bd-7a68-47d1-b5b5-dce70e0da06f)

Autocompletes C++ and Lua functions and methods:

![TypeScript method code completion](https://github.com/Humberd/forgottenserver-ts-scripting/assets/10242142/98e2ad4c-a419-4cc1-8ade-e1ce7b54e356)

### Compilation errors

![TypeScript compilation errors](https://github.com/Humberd/forgottenserver-ts-scripting/assets/10242142/f42d1e94-1041-42e0-9e8e-52085c6b8bd1)


## How it works?

All the TypeScript files from `./ts-lua` directory are transpiled to Lua
and are placed in `./data/scripts/ts-lua` directory.
They are treated as normal Lua scripts by the Forgotten Server.

There is also a library generated in `./data/lib/lualib_bundle.lua`.
It contains compat functions that allow a seamless use of typescript builtin feature,
such as `Array`, `Map`, `Set`, etc.
It is placed in the `./data/lib` directory, because it needs not to be reloaded,
when you reload your scripts using `/reload scripts` GOD command.

### Example code

A talkaction script that instantly kills a player

```typescript
const talkAction = TalkAction('/kill_player', '/kp');

/**
 * Kills a players by name.
 * Usage: /kill_player <player name>
 * Example: /kill_player Player1
 */
talkAction.onSay((player, words, param) => {
  const potentialPlayer = Player(param.trim());
  potentialPlayer
  if (!potentialPlayer) {
    player.sendTextMessage(MessageClasses.MESSAGE_STATUS_WARNING, `Player ${param} not found.`);
    return false;
  }
  
  potentialPlayer.addHealth(-potentialPlayer.getHealth());
  potentialPlayer.getPosition().sendMagicEffect(MagicEffectClasses.CONST_ME_MORTAREA);
  potentialPlayer.sendTextMessage(
    MessageClasses.MESSAGE_STATUS_CONSOLE_BLUE,
    `You were instantly killed by god`,
  );

  player.sendTextMessage(
    MessageClasses.MESSAGE_STATUS_CONSOLE_BLUE,
    `Killed ${potentialPlayer.getName()}`,
  );

  return false;
});

talkAction.separator(' ');
talkAction.access(true);
talkAction.accountType(AccountType.ACCOUNT_TYPE_GOD);
talkAction.register();

export {};
```

Is transpiled to:

```lua
local ____lualib = require("data/lib/lualib_bundle")
local __TS__StringTrim = ____lualib.__TS__StringTrim
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 8,["8"] = 9,["9"] = 11,["10"] = 12,["11"] = 13,["12"] = 18,["13"] = 18,["14"] = 18,["15"] = 18,["16"] = 23,["17"] = 8,["18"] = 26,["19"] = 27,["20"] = 28,["21"] = 29});
local ____exports = {}
local talkAction = TalkAction("/kill_player", "/kp")
talkAction:onSay(function(player, words, param)
    local potentialPlayer = Player(__TS__StringTrim(param))
    potentialPlayer:addHealth(-potentialPlayer:getHealth())
    potentialPlayer:getPosition():sendMagicEffect(CONST_ME_MORTAREA)
    potentialPlayer:sendTextMessage(MESSAGE_STATUS_CONSOLE_BLUE, "You were instantly killed by god")
    player:sendTextMessage(
        MESSAGE_STATUS_CONSOLE_BLUE,
        "Killed " .. potentialPlayer:getName()
    )
    return false
end)
talkAction:separator(" ")
talkAction:access(true)
talkAction:accountType(ACCOUNT_TYPE_GOD)
talkAction:register()
return ____exports
```

## Compatibility

It should work with any version of the Forgotten Server.
However, type declarations are currently written only for the 1.4 version of the Forgotten Server.
https://github.com/Humberd/forgottenserver-ts-declarations.
If you want to use it with a different version, you need to write your own type declarations
to match the API of your version of the Forgotten Server.
Contributions are welcome!
