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
  }
];
