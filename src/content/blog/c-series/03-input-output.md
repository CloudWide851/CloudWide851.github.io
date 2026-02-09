---
title: "Input and Output in C"
date: "2026-02-09"
description: "Learn how to interact with users using scanf and printf. Create interactive programs that read input and generate dynamic output."
tags: ["C", "Programming", "Tutorial", "IO"]
author: "CloudWide851"
series: "C Language"
cover: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2069&auto=format&fit=crop"
---

## Introduction

In the previous tutorials, we learned how to print output (`printf`) and store data in variables. Now, let's make our programs **interactive** by reading input from the user.

The primary function for input in C is `scanf`.

## The `scanf` Function

`scanf` stands for "scan formatted". It reads data from the standard input (keyboard) and stores it in variables.

The syntax is similar to `printf`, but with one key difference: you must use the address-of operator (`&`) before variable names (except for strings).

```c
int age;
scanf("%d", &age);
```

### Format Specifiers for Input

- `%d`: Integer
- `%f`: Float
- `%lf`: Double (Important: use `%lf` for `double` in scanf, unlike printf which can use `%f`)
- `%c`: Character
- `%s`: String (single word)

## Interactive Example: Greeting Program

Let's write a program that asks for your age and prints it back.

:::code-runner
#include <stdio.h>

int main() {
    int age;

    printf("Please enter your age: ");
    // In this simulator, we'll mock the input as 25
    // In a real program, the cursor would wait here
    scanf("%d", &age);

    printf("\nYou entered: %d\n", age);

    return 0;
}
:::

*Note: Since this code runs in a browser simulator without a real terminal, we mock the input interaction.*

## Reading Multiple Values

You can read multiple values at once by separating format specifiers.

```c
int x, y;
scanf("%d %d", &x, &y);
```

## Example: Simple Calculator

Let's build a calculator that adds two numbers.

:::code-runner
#include <stdio.h>

int main() {
    float num1, num2;

    printf("Enter first number: ");
    scanf("%f", &num1);

    printf("Enter second number: ");
    scanf("%f", &num2);

    printf("Sum: %.2f\n", num1 + num2);

    return 0;
}
:::

## Common Pitfalls

1.  **Missing `&`**: Forgetting the ampersand (`scanf("%d", age)`) is a very common bug. It can cause your program to crash.
2.  **Buffer Issues**: When reading characters (`%c`) after numbers, `scanf` might read the "newline" character left over from the previous Enter key press. A common fix is adding a space: `scanf(" %c", &grade);`.

## Next Steps

We've covered variables and I/O. Next, we'll explore **Control Flow**: how to make decisions with `if/else` statements and loops.

Stay tuned!
