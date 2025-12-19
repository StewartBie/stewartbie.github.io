---
slug: linked-list
title: Thought About Linked List
authors: [zephyr]
tags: [pl,nemu]
---

## Null page

```c
typedef struct watchpoint {
  int NO;
  char name[8];
  word_t value;
  int hit_times;
  bool enable;
  struct watchpoint *next;
} WP;

```

And `WP * head` is the head of the Using WPs, `WP *free_` is the beginning of free WPs.

## How to arrange

Single Linked List. We find a 2 certain node by traversing from the head one by one. I need these interfaces: `remove, add, print_all, check_if_changed`

- remove
  - parameter is the pointer to Node to be removed.
  - And then, we need to check whether the node exists
  - generally, we need the last node and the next node.
  - Specially, if the node to be deleted is the head or the last, we need to handle it more carefully.

- add
  - This unit is divided into tow functions. One is `new_wp()`, the other is `attach_wp(char *name)`
  - Using `new_wp` can literally create a new wp. Add a WP from the beginning of the free_ to the tail of the Using.
    - If there is no free_wp, return .
    - If there will be no more free_wp, the `free_` will be NULL. And this message will hint no more free WP in the future.
  - Using `attach_wp` with a parameter of the WP's name, and the name is the string of a expression.
  
## About WP

If we assume that only one WP can change in a time, it is accessible to
return immediately when we detect a change.

To handle multiple WPs change in one time, we can markdown all the changes both
**NO** and **new_value**. Then we return the function only when the traverse finished.

### Scan WP

With `trace-and-difftest`, We can know every watch point whenever they change.
