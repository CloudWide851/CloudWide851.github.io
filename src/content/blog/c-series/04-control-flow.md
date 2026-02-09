---
title: "Control Flow in C - Making Decisions"
date: "2026-02-09"
description: "Learn how to control program flow with if/else statements, logical operators, and switch-case. Make your programs interactive and intelligent."
tags: ["C", "Programming", "Tutorial", "Control Flow"]
author: "CloudWide851"
series: "C Language"
cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
---

## Introduction

Up until now, our programs have been linear: they run line 1, then line 2, then line 3, and so on. But real-world programs need to make **decisions**.

- *If* the password is correct, log the user in.
- *If* the temperature is above 30°C, turn on the fan.
- *If* the game score is 0, show "Game Over".

In C, we use **Control Flow** statements to handle this logic.

## The `if` Statement

The most basic decision-making tool is the `if` statement. It executes code **only if** a condition is true.

```c
if (condition) {
    // Code to run if condition is true
}
```

### Example: Age Check

:::code-runner
#include <stdio.h>

int main() {
    int age = 20;

    if (age >= 18) {
        printf("Access Granted: You are an adult.\n");
    }

    printf("Program finished.\n");
    return 0;
}
:::

## The `if-else` Statement

What if you want to do one thing if true, and **another** thing if false? Use `if-else`.

```c
if (condition) {
    // True block
} else {
    // False block
}
```

### Example: Even or Odd?

:::code-runner
#include <stdio.h>

int main() {
    int number = 7;

    if (number % 2 == 0) {
        printf("%d is Even.\n", number);
    } else {
        printf("%d is Odd.\n", number);
    }

    return 0;
}
:::

## Multiple Choices: `else if`

For more than two possibilities, you can chain conditions using `else if`.

### Example: Grade Calculator

:::code-runner
#include <stdio.h>

int main() {
    int score = 85;

    if (score >= 90) {
        printf("Grade: A\n");
    } else if (score >= 80) {
        printf("Grade: B\n");
    } else if (score >= 70) {
        printf("Grade: C\n");
    } else {
        printf("Grade: F\n");
    }

    return 0;
}
:::

## Relational & Logical Operators

To build conditions, you need comparison operators.

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal to | `a == b` |
| `!=` | Not equal | `a != b` |
| `>` | Greater than | `a > b` |
| `<` | Less than | `a < b` |
| `>=` | Greater or equal | `a >= b` |
| `<=` | Less or equal | `a <= b` |

**⚠️ Common Pitfall**: Do not confuse `==` (comparison) with `=` (assignment).
- `if (x = 5)` sets x to 5 and returns true.
- `if (x == 5)` checks if x is 5.

### Logical Operators

Combine multiple conditions:

- `&&` (AND): Both must be true
- `||` (OR): At least one must be true
- `!` (NOT): Inverts true/false

```c
if (age > 18 && hasTicket == 1) {
    printf("Welcome to the show!\n");
}
```

## The `switch` Statement

When you are comparing a single variable against many specific values, `switch` is cleaner than many `else if`s.

### Example: Simple Menu

:::code-runner
#include <stdio.h>

int main() {
    int choice = 2;

    printf("Menu:\n1. Start Game\n2. Load Game\n3. Exit\n");
    printf("Selection: %d\n\n", choice);

    switch (choice) {
        case 1:
            printf("Starting new game...\n");
            break;
        case 2:
            printf("Loading save file...\n");
            break;
        case 3:
            printf("Exiting...\n");
            break;
        default:
            printf("Invalid selection!\n");
    }

    return 0;
}
:::

**⚠️ Important**: Always include `break;` at the end of each case. If you forget it, the code "falls through" to the next case automatically!

## The Ternary Operator

For simple if-else assignments, you can use the shorthand `? :` operator.

```c
// Syntax: condition ? value_if_true : value_if_false
int max = (a > b) ? a : b;
```

## Next Steps

Now you can write programs that think and react! In the next tutorial, we will learn about **Loops**—how to repeat code hundreds or thousands of times efficiently.

Stay tuned!
