---
title: "Strings in C - Working with Text Data"
date: "2026-02-10"
description: "Master text manipulation in C. Learn about character arrays, the null terminator, safe input methods, and the string.h library."
tags: ["C", "Programming", "Tutorial", "Strings"]
author: "CloudWide851"
series: "C Language"
cover: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop"
---

## Introduction

In the previous tutorial, we learned about arrays. You might have noticed that we only stored numbers. But what about text? Names, addresses, messages?

In C, there is no dedicated `string` data type like in Python or Java. Instead, strings are simply **arrays of characters** ending with a special "Null Terminator" character.

## Declaring Strings

Since a string is just an array of `char`s, we declare it like this:

```c
// A string that can hold up to 9 characters + 1 null terminator
char name[10];
```

You can initialize a string in a few ways:

```c
// Method 1: String Literal (The easy way)
char greeting[] = "Hello";

// Method 2: Character Array (The hard way)
char greeting2[] = {'H', 'e', 'l', 'l', 'o', '\0'};
```

### The Null Terminator (`\0`)

The most important concept to understand is the **Null Terminator**.

C needs to know where a string ends in memory. It uses a special character `\0` (ASCII value 0) to mark the end.

If you declare `char name[5] = "Hello";`, it will cause a bug! Why? Because "Hello" is 5 letters, but you need **6 slots** to store the `\0` at the end.

**Rule of Thumb**: Always make your array size **at least 1 larger** than the longest text you expect to store.

## Reading and Printing Strings

You've already used `printf` with `%s` to print strings. Reading them is a bit trickier.

### The Problem with `scanf`

```c
char fullName[50];
printf("Enter your full name: ");
scanf("%s", fullName);
// If you type "John Doe", it only stores "John"!
```

`scanf` stops reading at the first space. To read a full line of text, we use `fgets`.

### The Safe Way: `fgets`

:::code-runner
#include <stdio.h>
#include <string.h>

int main() {
    char name[50];

    printf("Enter your full name: ");
    // Read up to 49 chars from standard input (stdin)
    fgets(name, 50, stdin);

    // Note: fgets might include the 'enter' key (\n) at the end
    // Let's remove it for clean printing
    name[strcspn(name, "\n")] = 0;

    printf("Hello, %s! Nice to meet you.\n", name);

    return 0;
}
:::

## The String Library (`string.h`)

C provides a standard library `<string.h>` with powerful tools for manipulating text.

### Common Functions

1.  **`strlen(str)`**: Returns the length of the string (excluding `\0`).
2.  **`strcpy(dest, src)`**: Copies one string to another.
3.  **`strcat(dest, src)`**: Concatenates (joins) two strings.
4.  **`strcmp(str1, str2)`**: Compares two strings.

### Example: String Manipulation

:::code-runner
#include <stdio.h>
#include <string.h>

int main() {
    char first[20] = "Super";
    char last[20] = "Mario";
    char full[40]; // Big enough to hold both

    // 1. Copy first name to 'full'
    strcpy(full, first);

    // 2. Add a space
    strcat(full, " ");

    // 3. Add last name
    strcat(full, last);

    printf("Full Name: %s\n", full);
    printf("Length: %lu characters\n", strlen(full));

    // 4. Comparison
    if (strcmp(first, "Luigi") == 0) {
        printf("It's Luigi!\n");
    } else {
        printf("It's not Luigi.\n");
    }

    return 0;
}
:::

## Common Pitfalls

### 1. Buffer Overflow
Writing more data than the array can hold is a major security risk.
```c
char buffer[5];
strcpy(buffer, "This string is too long!"); // CRASH or HACKED
```
Always ensure your destination array is large enough!

### 2. `==` Does Not Work
You cannot compare strings with `==`.
```c
if (name == "Alice") // WRONG! Compares memory addresses
if (strcmp(name, "Alice") == 0) // RIGHT! Compares content
```

### 3. Assignment
You cannot assign strings with `=`.
```c
char str[10];
str = "Hello"; // WRONG!
strcpy(str, "Hello"); // RIGHT!
```

## Summary

| Function | Description |
|----------|-------------|
| `char s[10]` | Declares a string of max 9 chars. |
| `printf("%s", s)` | Prints a string. |
| `fgets(s, 10, stdin)` | Safely reads a line of text. |
| `strlen(s)` | Gets the length. |
| `strcpy(dst, src)` | Copies `src` to `dst`. |
| `strcmp(a, b)` | Returns 0 if strings are equal. |

## Next Steps

Now that you can handle numbers and text, you're ready to build real applications. In the next tutorial, we'll dive into **Functions** to organize your code into reusable blocks!
