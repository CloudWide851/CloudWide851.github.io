---
title: "Arrays in C - Storing Multiple Values"
date: "2026-02-10"
description: "Learn how to store collections of data using Arrays in C. Master indexing, iteration, and multi-dimensional arrays."
tags: ["C", "Programming", "Tutorial", "Arrays"]
author: "CloudWide851"
series: "C Language"
cover: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop"
---

## Introduction

So far, we've used variables to store single values: `int score = 10;`. But what if you need to store the scores of 100 students? Declaring 100 variables (`score1`, `score2`, ...) is impractical.

**Arrays** allow you to store multiple values of the **same type** in a single variable. Think of an array as a row of lockers, where each locker has a number (index) and holds a value.

## Declaring and Initializing Arrays

To declare an array, you specify the data type, the name, and the size in square brackets `[]`.

```c
// Declare an array of 5 integers
int scores[5];

// Declare and initialize at the same time
int numbers[5] = {10, 20, 30, 40, 50};
```

**Key Rules:**
1.  **Fixed Size**: The size of an array in C is fixed when you create it. You can't change it later.
2.  **Same Type**: All elements must be of the same data type (e.g., all `int`).

## Accessing Elements

You access elements using their **index**. In C, indices start at **0**.

-   First element: `array[0]`
-   Second element: `array[1]`
-   Last element of size N: `array[N-1]`

:::code-runner
#include <stdio.h>

int main() {
    int primes[5] = {2, 3, 5, 7, 11};

    printf("The first prime is: %d\n", primes[0]);
    printf("The third prime is: %d\n", primes[2]);

    // Modifying an element
    primes[4] = 13;
    printf("The modified last prime is: %d\n", primes[4]);

    return 0;
}
:::

## Looping Through Arrays

Arrays and `for` loops are best friends. You can use a loop to iterate through every element in an array.

### Example: Calculating Average Score

:::code-runner
#include <stdio.h>

int main() {
    int scores[5] = {85, 92, 78, 90, 88};
    int sum = 0;
    float average;
    int i;

    // Loop from index 0 to 4
    for (i = 0; i < 5; i++) {
        printf("Score %d: %d\n", i + 1, scores[i]);
        sum = sum + scores[i];
    }

    average = (float)sum / 5;
    printf("----------------\n");
    printf("Total Sum: %d\n", sum);
    printf("Average Score: %.2f\n", average);

    return 0;
}
:::

## Multidimensional Arrays (Matrices)

C supports arrays of arrays, known as multidimensional arrays. The most common is the **2D array**, which looks like a table with rows and columns.

```c
// A 2D array with 2 rows and 3 columns
int matrix[2][3] = {
    {1, 2, 3},  // Row 0
    {4, 5, 6}   // Row 1
};
```

### Example: Printing a Matrix

:::code-runner
#include <stdio.h>

int main() {
    int grid[2][3] = {
        {10, 20, 30},
        {40, 50, 60}
    };
    int row, col;

    printf("Matrix contents:\n");

    for (row = 0; row < 2; row++) {
        for (col = 0; col < 3; col++) {
            printf("%d ", grid[row][col]);
        }
        printf("\n"); // New line after each row
    }

    return 0;
}
:::

## Common Pitfalls

### 1. Out of Bounds Access
C does **not** check if you are accessing a valid index.
```c
int arr[5];
arr[10] = 99; // DANGER! This writes to memory outside the array.
```
Accessing out of bounds can crash your program or cause weird bugs ("Undefined Behavior"). Always ensure your index is between `0` and `size - 1`.

### 2. Uninitialized Arrays
If you declare an array without initializing it, it contains **garbage values** (whatever happened to be in memory).
```c
int nums[3]; // Could be {32767, -1283, 0}
```
Always initialize your arrays or fill them before reading.

## Summary

| Concept | Syntax | Note |
|---------|--------|------|
| Declaration | `int arr[5];` | Size must be known at compile time (mostly). |
| Access | `arr[0]` | Indices start at 0. |
| Modification | `arr[2] = 10;` | Overwrites the old value. |
| 2D Array | `arr[row][col]` | Think of rows and columns. |

## Next Steps

Arrays are powerful, but they have a limitation: they can only store one type of data. In the next tutorial, we'll learn about **Strings**—which are actually just special arrays of characters!
