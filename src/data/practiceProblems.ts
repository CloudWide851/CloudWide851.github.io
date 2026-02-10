export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PracticeProblem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  initialCode: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  hint?: string;
}

export const practiceProblems: PracticeProblem[] = [
  {
    id: 'sum-two-numbers',
    title: 'Sum of Two Numbers',
    description: 'Write a program that reads two integers from input and prints their sum.',
    difficulty: 'easy',
    category: 'Basics',
    initialCode: `#include <stdio.h>

int main() {
    int a, b;
    // Read two integers
    // scanf("%d %d", &a, &b);

    // Print their sum
    // printf("%d", a + b);

    return 0;
}`,
    testCases: [
      { input: '5 3', expectedOutput: '8' },
      { input: '10 -2', expectedOutput: '8' },
      { input: '0 0', expectedOutput: '0' }
    ]
  },
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'The classic first program. Print "Hello, World!" to the console.',
    difficulty: 'easy',
    category: 'Basics',
    initialCode: `#include <stdio.h>

int main() {
    // Write your code here

    return 0;
}`,
    testCases: [
      { input: '', expectedOutput: 'Hello, World!' }
    ]
  },
  {
    id: 'array-max',
    title: 'Find Maximum in Array',
    description: 'Read 5 integers into an array and print the largest number.',
    difficulty: 'medium',
    category: 'Arrays',
    initialCode: `#include <stdio.h>

int main() {
    int arr[5];
    int max;

    // 1. Read 5 numbers
    // 2. Find maximum
    // 3. Print result

    return 0;
}`,
    testCases: [
      { input: '1 2 3 4 5', expectedOutput: '5' },
      { input: '10 50 20 5 90', expectedOutput: '90' },
      { input: '-1 -5 -2 -10 -3', expectedOutput: '-1' }
    ]
  },
  {
    id: 'string-reverse',
    title: 'Reverse a String',
    description: 'Read a word (max 50 chars) and print it in reverse order.',
    difficulty: 'medium',
    category: 'Strings',
    initialCode: `#include <stdio.h>
#include <string.h>

int main() {
    char str[50];
    scanf("%s", str);

    // Your code here to reverse and print

    return 0;
}`,
    testCases: [
      { input: 'hello', expectedOutput: 'olleh' },
      { input: 'C', expectedOutput: 'C' },
      { input: 'racecar', expectedOutput: 'racecar' }
    ]
  },
  {
    id: 'pointer-swap',
    title: 'Swap with Pointers',
    description: 'Implement a function `swap(int *a, int *b)` to swap two variables.',
    difficulty: 'hard',
    category: 'Pointers',
    initialCode: `#include <stdio.h>

void swap(int *a, int *b) {
    // Implement swap logic
}

int main() {
    int x, y;
    if (scanf("%d %d", &x, &y) != 2) return 1;

    swap(&x, &y);

    printf("%d %d", x, y);
    return 0;
}`,
    testCases: [
      { input: '10 20', expectedOutput: '20 10' },
      { input: '-5 5', expectedOutput: '5 -5' }
    ],
    hint: 'Use a temporary variable to hold one value while swapping.'
  },
  {
    id: 'factorial',
    title: 'Factorial Calculator',
    description: 'Write a function that calculates the factorial of a number n (n!). Factorial of n is n * (n-1) * ... * 1. For n=0, factorial is 1.',
    difficulty: 'medium',
    category: 'Loops',
    initialCode: `#include <stdio.h>

long factorial(int n) {
    // Implement factorial logic
    return 0;
}

int main() {
    int n;
    scanf("%d", &n);

    printf("%ld", factorial(n));
    return 0;
}`,
    testCases: [
      { input: '5', expectedOutput: '120' },
      { input: '0', expectedOutput: '1' },
      { input: '10', expectedOutput: '3628800' }
    ]
  },
  {
    id: 'check-prime',
    title: 'Check Prime Number',
    description: 'Write a program to check if a given integer n is prime. Print 1 if prime, 0 otherwise. A prime number is only divisible by 1 and itself.',
    difficulty: 'medium',
    category: 'Algorithms',
    initialCode: `#include <stdio.h>

int isPrime(int n) {
    // Return 1 if prime, 0 if not
    return 0;
}

int main() {
    int n;
    scanf("%d", &n);

    printf("%d", isPrime(n));
    return 0;
}`,
    testCases: [
      { input: '7', expectedOutput: '1' },
      { input: '10', expectedOutput: '0' },
      { input: '23', expectedOutput: '1' },
      { input: '1', expectedOutput: '0' }
    ]
  },
  {
    id: 'palindrome-check',
    title: 'Palindrome Check',
    description: 'Check if a given string is a palindrome (reads the same forwards and backwards). Print 1 if it is, 0 otherwise.',
    difficulty: 'hard',
    category: 'Strings',
    initialCode: `#include <stdio.h>
#include <string.h>

int main() {
    char str[100];
    scanf("%s", str);

    // Check if palindrome

    return 0;
}`,
    testCases: [
      { input: 'racecar', expectedOutput: '1' },
      { input: 'hello', expectedOutput: '0' },
      { input: 'madam', expectedOutput: '1' }
    ]
  }
];
