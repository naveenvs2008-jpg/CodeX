
import { CodingQuestion, Difficulty } from './types';

export const QUESTIONS_POOL: CodingQuestion[] = [
  {
    id: 'q1',
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    difficulty: Difficulty.EASY,
    topic: 'Arrays',
    exampleInput: 'nums = [2,7,11,15], target = 9',
    exampleOutput: '[0,1]',
    solution: 'Use a hash map to store indices of seen numbers. For each number x, check if (target - x) exists in the map.'
  },
  {
    id: 'q2',
    title: 'Reverse String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters `s`.',
    difficulty: Difficulty.EASY,
    topic: 'Strings',
    exampleInput: 's = ["h","e","l","l","o"]',
    exampleOutput: '["o","l","l","e","h"]',
    solution: 'Use a two-pointer approach, swapping characters at the left and right pointers until they meet in the middle.'
  },
  {
    id: 'q3',
    title: 'Maximum Subarray',
    description: 'Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    difficulty: Difficulty.MEDIUM,
    topic: 'Dynamic Programming',
    exampleInput: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
    exampleOutput: '6 (subarray [4,-1,2,1])',
    solution: "Use Kadane's Algorithm: current_max = max(x, current_max + x)."
  },
  {
    id: 'q4',
    title: 'Valid Palindrome',
    description: 'Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    difficulty: Difficulty.EASY,
    topic: 'Strings',
    exampleInput: '"A man, a plan, a canal: Panama"',
    exampleOutput: 'true',
    solution: 'Sanitize the string and use two pointers to compare characters from both ends.'
  }
];

export const NAV_ITEMS = [
  { label: 'Today', icon: 'zap', id: 'home' },
  { label: 'Stats', icon: 'bar-chart-2', id: 'stats' },
  { label: 'Docs', icon: 'book-open', id: 'docs' }
];
