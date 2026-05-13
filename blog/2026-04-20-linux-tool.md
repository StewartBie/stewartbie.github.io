---
slug: LinuxTool
title: Tool Usage
authors: [zephyr]
tags: [tools]
---

## SCP

### Basic Usage

```
scp [选项] 源文件/目录  用户名@主机:目标路径
scp [选项] 用户名@主机:源路径  本地目标路径
```

### Upload

From local to remote.

```bash
# A single file 
scp ./a.txt user@ipaddr:/home/user/

# To a specific file name
scp ./a.txt user@192.168.1.10:/home/user/a_new.txt

# A dir
scp -r ./mydir user@192.168.1.10:/home/user/
##################################

```

### Download

```bash
# dir
scp user@192.168.1.10:/home/user/a.txt ./
```

### Between Remote

```bash
scp userA@hostA:/path/file userB@hostB:/path/
```

### other frequently used

```bash
# specific Port
scp -P 2222 a.txt user@host:/path/
#################################
# specify a secret key
scp -i ~/.ssh/id_rsa a.txt user@host:/path/

# limit speed  Kbps
scp -l 10240 bigfile.iso user@host:/path/

# extend wildcards in remote  machine
scp 'user@host:/var/log/*.log' ./
```
