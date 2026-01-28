---
slug: zephyr-blog
title: Zephyr Blog 
authors: [zephyr]
tags: [docusaurus,pl,rl,nemu]
---

## Deploy blog on my PC

1. install with   `npm` , and then config and install

Refer to the [docs](https://docusaurus.io/docs/deployment#deploying-to-github-pages). Add GitHub username and project name.

Set `USE_SSH = true`, `deploymentBranch: 'gh-pages',`, and add a branch named gh-pages for remote repo is also needed.
<!-- truncate -->
## Enable Wake On LAN

Anyway, refer to arch [wiki](https://wiki.archlinux.org/title/Wake-on-LAN)

### wired network

If you use wired network, follow this section.

`ethtool interface | grep Wake-on` **interface** is literally your device name.
Then the out put is expected as below, Wake-on `d` means disabled,
`g` means a magic pack. In other word `g` is necessary to enabled this feature.

```bash
Supports Wake-on: pumbag
Wake-on: d
```

Use `ethtool -s interface wol g` to enable `g` status.

#### Make Config persistent

With systemd.link. What's more, the default is `99-default.link`.
And if you want your custom config works, it should set behind `99` in alphabet queue.

```bash
# /etc/systemd/network/50-wired.link

[Match]
MACAddress=aa:bb:cc:dd:ee:ff

[Link]
NamePolicy=kernel database onboard slot path
MACAddressPolicy=persistent
WakeOnLan=magic
```

**How to Use**

```bash
wol -i target_IP target_MAC_address
```

### Enable in NetworkManager

I use NetworkManager. If you use it too, you can follow it.
