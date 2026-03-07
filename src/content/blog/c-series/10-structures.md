---
title: "Structures in C - Building Custom Data Types"
date: "2026-03-07"
description: "Learn how to use structs in C to group related data, access members, and pass structured data to functions."
tags: ["C", "Programming", "Tutorial", "Structures"]
author: "CloudWide851"
series: "C Language"
cover: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=2070&auto=format&fit=crop"
---

## Introduction

So far, we have worked with simple data types like `int`, `float`, and `char`. But real programs often need to store **related values together**.

For example, a student has:
- A name
- An age
- A score

Instead of using separate variables, C provides **structures (`struct`)** to bundle related data into one custom type.

## What is a Structure?

A structure is a user-defined data type that groups multiple variables (possibly of different types) under one name.

```c
struct Student {
    char name[50];
    int age;
    float score;
};
```

Here, `Student` is a custom type with three fields (called **members**).

## Declaring and Initializing Structures

After defining a struct type, you can create variables of that type.

:::code-runner
#include <stdio.h>

struct Student {
    char name[50];
    int age;
    float score;
};

int main() {
    struct Student s1 = {"Alice", 20, 91.5f};

    printf("Name: %s\n", s1.name);
    printf("Age: %d\n", s1.age);
    printf("Score: %.1f\n", s1.score);

    return 0;
}
:::

## Accessing and Updating Members

Use the dot operator (`.`) to access members.

:::code-runner
#include <stdio.h>
#include <string.h>

struct Book {
    char title[100];
    int pages;
    float price;
};

int main() {
    struct Book b1;

    strcpy(b1.title, "C Programming Guide");
    b1.pages = 320;
    b1.price = 39.99f;

    printf("Title: %s\n", b1.title);
    printf("Pages: %d\n", b1.pages);
    printf("Price: $%.2f\n", b1.price);

    return 0;
}
:::

## Array of Structures

You can create arrays of structs to store multiple records.

:::code-runner
#include <stdio.h>

struct Student {
    char name[20];
    int age;
};

int main() {
    struct Student classList[3] = {
        {"Tom", 18},
        {"Lily", 19},
        {"Ryan", 18}
    };

    for (int i = 0; i < 3; i++) {
        printf("Student %d: %s (%d years old)\n", i + 1, classList[i].name, classList[i].age);
    }

    return 0;
}
:::

## Passing Structures to Functions

Structures can be passed to functions just like other variables.

:::code-runner
#include <stdio.h>

struct Rectangle {
    float width;
    float height;
};

float area(struct Rectangle r) {
    return r.width * r.height;
}

int main() {
    struct Rectangle rect = {5.0f, 3.5f};
    printf("Area: %.2f\n", area(rect));
    return 0;
}
:::

## Summary

| Concept | Description |
|---|---|
| `struct` | Creates a custom data type with grouped members. |
| `.` operator | Accesses members of a struct variable. |
| Array of structs | Stores multiple records of the same structure type. |
| Struct in functions | Lets you pass grouped data to reusable logic. |

## Next Steps

You can now model real-world entities cleanly with `struct`.

In the next tutorial, we will learn **Dynamic Memory Allocation** (`malloc`, `calloc`, `free`) so your programs can create data at runtime.
