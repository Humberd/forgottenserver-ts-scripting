#!/usr/bin/env zx

import { $ } from 'zx';

await $`pkill -9 tfs`.catch(() => {});
await $`cd cmake-build-debug && cmake --build . -- -j 30 && cd ..`;
await $`cp ./cmake-build-debug/tfs ./tfs`;
await $.spawn(`./tfs`, { stdio: 'inherit' });