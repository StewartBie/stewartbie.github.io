---
slug: Intall-Arch
title: Intall Arch Tips
authors: [zephyr]
tags: [tools]
---

I've installed arch several times,
this time, I tried `archinstall`
and learned a lot.

<!-- truncate -->
## Suggested Subvolume arrangement with Btrfs

| | | |
|-|-|-|
|@        |→ |/|
|@home    |→ |/home|
|@var     |→ |/var|
|@log     |→ |/var/log|
|@pkg     |→ |/var/cache/pacman/pkg|
|@.snapshots |→ |快照|

## Swap

It's wise to use `zram` to expand your RAM, and use swap device or
a swap file to enable sleep or hybernate.

If you use a swapfile on Btrfs, remember to disable Copy-on-Write
for this file.
`chattr +C /swap`
check your swap `free -m` and `swapon --show`
