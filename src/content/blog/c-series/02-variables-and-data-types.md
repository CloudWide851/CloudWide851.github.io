---
title: "Variables and Data Types in C"
date: "2026-02-09"
description: "Learn how to store and manipulate data in C programming with variables, integers, floats, characters, and constants."
tags: ["C", "Programming", "Tutorial", "Variables"]
author: "CloudWide851"
series: "C Language"
---

## Introduction to Variables

In our previous tutorial, we printed text to the screen. But useful programs need to **store** and **manipulate** data. That's where **variables** come in.

A variable is like a labeled box in your computer's memory where you can store a value. Each variable has a specific **type** that determines what kind of data it can hold (like a number, a character, etc.).

## Variable Declaration and Initialization

In C, you must declare a variable before using it. You specify the type, followed by the variable name.

```c
int age;       // Declaration
age = 25;      // Initialization (Assignment)
```

You can also do both in one line:

```c
int score = 100;
```

## Basic Data Types

C has several built-in data types. Let's look at the most common ones.

### 1. Integers (`int`)
Used for whole numbers (without decimals).
- **Format specifier**: `%d`
- **Example**: `10`, `-5`, `42`

### 2. Floating-Point Numbers (`float`, `double`)
Used for numbers with decimal points.
- **float**: Single precision (less precise, takes less memory). Format: `%f`
- **double**: Double precision (more precise, standard for decimals). Format: `%lf`

### 3. Characters (`char`)
Used for single characters. Enclosed in single quotes.
- **Format specifier**: `%c`
- **Example**: `'A'`, `'z'`, `'#'`

## Interactive Example: Working with Variables

Let's write a program that uses different variables. Run the code below to see how they work!

:::code-runner
#include <stdio.h>

int main() {
    // Integer variable
    int studentID = 12345;

    // Floating point variable
    float gpa = 3.85;

    // Character variable
    char grade = 'A';

    printf("Student ID: %d\n", studentID);
    printf("GPA: %.2f\n", gpa); // %.2f prints only 2 decimal places
    printf("Grade: %c\n", grade);

    return 0;
}
:::

## Constants

Sometimes you want a value that never changes, like the value of Pi (3.14159) or the maximum score in a game. You can use the `const` keyword.

```c
const float PI = 3.14159;
// PI = 3.15; // This would cause an error!
```

## Arithmetic Operators

You can perform math on variables using standard operators:
- `+` (Addition)
- `-` (Subtraction)
- `*` (Multiplication)
- `/` (Division)
- `%` (Modulus - remainder of division, only for integers)

### Try It Yourself

Modify the code below to calculate the area of a rectangle. Change the `width` and `height` values and see what happens.

:::code-runner
#include <stdio.h>

int main() {
    int width = 10;
    int height = 5;

    int area = width * height;
    int perimeter = 2 * (width + height);

    printf("Rectangle Dimensions: %d x %d\n", width, height);
    printf("Area: %d\n", area);
    printf("Perimeter: %d\n", perimeter);

    return 0;
}
:::

## Type Conversion (Casting)

What happens if you divide two integers like `5 / 2`? In C, integer division discards the decimal part, so the result is `2`, not `2.5`.

To get the decimal result, you need to mix in a float or "cast" one of the numbers.

```c
int a = 5;
int b = 2;
float result = (float)a / b; // Cast 'a' to float before division
```

## Next Steps

Now that you know how to store data, the next step is getting data *from* the user. In the next tutorial, we will learn about **Input and Output** using `scanf`.

Stay tuned!
