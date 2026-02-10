---
title: "Loops in C - Repeating Code Efficiently"
date: "2026-02-09"
description: "Master the art of repetition in C programming. Learn how to use for, while, and do-while loops to automate repetitive tasks."
tags: ["C", "Programming", "Tutorial", "Loops"]
author: "CloudWide851"
series: "C Language"
cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
---

## Introduction

Imagine you want to print "Hello World" 100 times. You *could* write `printf("Hello World\n");` 100 times, but that's tedious and error-prone.

In programming, we use **Loops** to repeat a block of code multiple times. C provides three types of loops:
1. `while` loop
2. `do-while` loop
3. `for` loop

## The `while` Loop

The `while` loop is the simplest. It keeps running **as long as** a condition is true.

```c
while (condition) {
    // Code to repeat
}
```

### Example: Countdown

:::code-runner
#include <stdio.h>

int main() {
    int count = 5;

    while (count > 0) {
        printf("T-minus %d...\n", count);
        count = count - 1; // Decrease count
    }

    printf("Blast off!\n");
    return 0;
}
:::

**Note**: If you forget to update the variable (e.g., `count = count - 1`), the condition will *always* be true, creating an **Infinite Loop**. The program will run forever (or until you stop it).

## The `do-while` Loop

The `do-while` loop is similar, but it checks the condition **at the end**. This guarantees the code runs **at least once**, even if the condition is initially false.

```c
do {
    // Code to run
} while (condition);
```

### Example: Input Validation

This is great for asking users for input until they give a valid answer.

:::code-runner
#include <stdio.h>

int main() {
    int number;

    do {
        printf("Enter a positive number: ");
        // We'll simulate input here since this is a runner
        // In a real run, this would loop until user enters > 0
        number = 10;
        printf("%d\n", number);
    } while (number <= 0);

    printf("Thank you! You entered: %d\n", number);
    return 0;
}
:::

## The `for` Loop

The `for` loop is the most common loop in C. It groups the loop logic into one line:
1. **Initialization**: Set up a counter (run once).
2. **Condition**: Check if loop should continue.
3. **Update**: Change the counter (run after each iteration).

```c
for (initialization; condition; update) {
    // Code to repeat
}
```

### Example: Sum of Numbers

Let's calculate the sum of numbers from 1 to 10.

:::code-runner
#include <stdio.h>

int main() {
    int sum = 0;
    int i;

    // Start at 1; keep going while i <= 10; add 1 to i each time
    for (i = 1; i <= 10; i++) {
        sum = sum + i;
        printf("Adding %d, Sum is now %d\n", i, sum);
    }

    printf("Final Sum: %d\n", sum);
    return 0;
}
:::

## Nested Loops

You can put a loop *inside* another loop. This is useful for working with grids, tables, or matrices.

### Example: Multiplication Table

:::code-runner
#include <stdio.h>

int main() {
    int i, j;

    // Outer loop for rows
    for (i = 1; i <= 3; i++) {
        // Inner loop for columns
        for (j = 1; j <= 3; j++) {
            printf("%d x %d = %d\t", i, j, i * j);
        }
        printf("\n"); // New line after each row
    }

    return 0;
}
:::

## Control Statements: `break` and `continue`

- **`break`**: Immediately exits the loop.
- **`continue`**: Skips the rest of the current iteration and starts the next one.

:::code-runner
#include <stdio.h>

int main() {
    int i;

    printf("Loop with continue (skipping 3):\n");
    for (i = 1; i <= 5; i++) {
        if (i == 3) {
            continue; // Skip printing 3
        }
        printf("%d ", i);
    }

    printf("\n\nLoop with break (stopping at 3):\n");
    for (i = 1; i <= 5; i++) {
        if (i == 3) {
            break; // Stop loop entirely
        }
        printf("%d ", i);
    }
    printf("\n");

    return 0;
}
:::

## Summary

| Loop Type | When to Use |
|-----------|-------------|
| `while` | When you don't know how many times to loop beforehand. |
| `do-while`| When the code must run at least once (e.g., menu selection). |
| `for` | When you know exactly how many times to loop (e.g., arrays, fixed counts). |

## Next Steps

Now that we can control the flow of our programs, we need better ways to store data. In the next tutorial, we'll look at **Arrays**—lists of variables stored together.

Stay tuned!
